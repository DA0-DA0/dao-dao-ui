import {
  AccountCircleOutlined,
  ArrowOutward,
  CancelOutlined,
  HourglassTopRounded,
  Key,
  Redo,
  RotateRightOutlined,
  Tag,
} from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { useVotingModule } from '@dao-dao/state'
import {
  ButtonLink,
  CopyToClipboardUnderline,
  IconButtonLink,
  Logo,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  BaseProposalStatusAndInfoProps,
  ContractVersion,
  DepositRefundPolicy,
} from '@dao-dao/types'
import { Status } from '@dao-dao/types/contracts/CwdProposalSingle.common'
import {
  CHAIN_TXN_URL_PREFIX,
  formatPercentOf100,
  processError,
} from '@dao-dao/utils'

import { ProfileDisplay } from '../../../../components/ProfileDisplay'
import { useProposalModuleAdapterOptions } from '../../../react'
import { configSelector } from '../contracts/CwdProposalSingle.common.recoil'
import {
  useClose as useCloseV2,
  useExecute as useExecuteV2,
} from '../contracts/CwdProposalSingle.v2.hooks'
import {
  useClose as useCloseV1,
  useExecute as useExecuteV1,
} from '../contracts/CwProposalSingle.v1.hooks'
import {
  useDepositInfo,
  useProposal,
  useProposalExecutionTxHash,
  useTimestampDisplay,
  useVotesInfo,
} from '../hooks'

export const ProposalStatusAndInfo = ({
  onExecuteSuccess,
  onCloseSuccess,
  ...props
}: BaseProposalStatusAndInfoProps) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const { connected, address: walletAddress = '' } = useWallet()
  const { isMember = false } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })

  const config = useRecoilValue(
    configSelector({
      contractAddress: proposalModule.address,
    })
  )

  const proposal = useProposal()
  const depositInfo = useDepositInfo()
  const executionTxHash = useProposalExecutionTxHash()
  const timestampDisplay = useTimestampDisplay()

  const info: ProposalStatusAndInfoProps['info'] = [
    {
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !h-5 !w-5', className)} />
      ),
      label: t('title.dao'),
      Value: (props) => (
        <ButtonLink href={`/dao/${coreAddress}`} variant="underline" {...props}>
          {daoName}
        </ButtonLink>
      ),
    },
    {
      Icon: AccountCircleOutlined,
      label: t('title.creator'),
      Value: (props) => (
        <ProfileDisplay
          address={proposal.proposer}
          copyToClipboardProps={{
            ...props,
            success: t('info.copiedAddressToClipboard'),
          }}
        />
      ),
    },
    {
      Icon: RotateRightOutlined,
      label: t('title.status'),
      Value: (props) => (
        <p {...props}>{t(`proposalStatusTitle.${proposal.status}`)}</p>
      ),
    },
    ...(proposal.allow_revoting
      ? ([
          {
            Icon: Redo,
            label: t('title.revoting'),
            Value: (props) => <p {...props}>{t('info.enabled')}</p>,
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(timestampDisplay
      ? ([
          {
            Icon: HourglassTopRounded,
            label: timestampDisplay.label,
            Value: (props) => <p {...props}>{timestampDisplay.content}</p>,
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(executionTxHash
      ? ([
          {
            Icon: Tag,
            label: t('info.txAbbr'),
            Value: (props) => (
              <div className="flex flex-row items-center gap-1">
                <CopyToClipboardUnderline
                  // Will truncate automatically.
                  takeAll
                  value={executionTxHash}
                  {...props}
                />
                {!!CHAIN_TXN_URL_PREFIX && (
                  <IconButtonLink
                    Icon={ArrowOutward}
                    href={CHAIN_TXN_URL_PREFIX + executionTxHash}
                    variant="ghost"
                  />
                )}
              </div>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
  ]

  const {
    quorum,
    thresholdReached,
    quorumReached,
    turnoutPercent,
    turnoutYesPercent,
  } = useVotesInfo()

  const status =
    proposal.status === Status.Open
      ? thresholdReached && (!quorum || quorumReached)
        ? t('info.proposalStatus.willPass')
        : !thresholdReached && (!quorum || quorumReached)
        ? t('info.proposalStatus.willFailBadThreshold')
        : thresholdReached && quorum && !quorumReached
        ? t('info.proposalStatus.willFailBadQuorum')
        : t('info.proposalStatus.willFail')
      : t('info.proposalStatus.notOpen', {
          turnoutPercent: formatPercentOf100(turnoutPercent),
          turnoutYesPercent: formatPercentOf100(turnoutYesPercent),
          extra:
            // Add sentence about closing to receive deposit back if it needs to
            // be closed and will refund.
            proposal.status === Status.Rejected &&
            depositInfo?.refund_policy === DepositRefundPolicy.Always
              ? ` ${t('info.proposalDepositWillBeRefunded')}`
              : '',
        })

  const executeProposal = (
    proposalModule.version === ContractVersion.V0_1_0
      ? useExecuteV1
      : useExecuteV2
  )({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })
  const closeProposal = (
    proposalModule.version === ContractVersion.V0_1_0 ? useCloseV1 : useCloseV2
  )({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })

  const [actionLoading, setActionLoading] = useState(false)

  const onExecute = useCallback(async () => {
    if (!connected) return

    setActionLoading(true)

    try {
      await executeProposal({
        proposalId: proposalNumber,
      })

      await onExecuteSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setActionLoading(false)
    }
  }, [connected, executeProposal, proposalNumber, onExecuteSuccess])

  const onClose = useCallback(async () => {
    if (!connected) return

    setActionLoading(true)

    try {
      await closeProposal({
        proposalId: proposalNumber,
      })

      await onCloseSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setActionLoading(false)
    }
  }, [connected, closeProposal, proposalNumber, onCloseSuccess])

  return (
    <StatelessProposalStatusAndInfo
      {...props}
      action={
        proposal.status === Status.Passed &&
        // Show if anyone can execute OR if the wallet is a member.
        (!config.only_members_execute || isMember)
          ? {
              label: t('button.execute'),
              Icon: Key,
              loading: actionLoading,
              doAction: onExecute,
            }
          : proposal.status === Status.Rejected
          ? {
              label: t('button.close'),
              Icon: CancelOutlined,
              loading: actionLoading,
              doAction: onClose,
            }
          : undefined
      }
      info={info}
      status={status}
    />
  )
}
