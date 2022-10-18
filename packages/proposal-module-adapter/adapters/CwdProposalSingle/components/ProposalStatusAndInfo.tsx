import {
  AccountCircleOutlined,
  CancelOutlined,
  HourglassTopRounded,
  Key,
  OpenInNew,
  Redo,
  RotateRightOutlined,
  Tag,
} from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'
import { useRecoilValue } from 'recoil'

import { ProfileDisplay } from '@dao-dao/common'
import {
  blockHeightSelector,
  blocksPerYearSelector,
  useCachedLoadable,
  useVotingModule,
} from '@dao-dao/state'
import {
  BaseProposalStatusAndInfoProps,
  ContractVersion,
  DepositRefundPolicy,
} from '@dao-dao/tstypes'
import { Status } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'
import {
  ButtonLink,
  CopyToClipboardUnderline,
  IconButtonLink,
  Logo,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  useDaoInfoContext,
} from '@dao-dao/ui'
import { useTranslatedTimeDeltaFormatter } from '@dao-dao/ui/hooks'
import {
  CHAIN_TXN_URL_PREFIX,
  convertExpirationToDate,
  formatDate,
  formatPercentOf100,
  processError,
} from '@dao-dao/utils'

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
  const blocksPerYear = useRecoilValue(blocksPerYearSelector({}))
  const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const expirationDate = convertExpirationToDate(
    blocksPerYear,
    proposal.expiration,
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0
  )

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: false })

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
          copyToClipboardProps={props}
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
    ...(config.allow_revoting
      ? ([
          {
            Icon: Redo,
            label: t('title.revoting'),
            Value: (props) => <p {...props}>{t('info.enabled')}</p>,
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(expirationDate
      ? ([
          {
            Icon: HourglassTopRounded,
            label:
              proposal.status === Status.Open &&
              expirationDate.getTime() > Date.now()
                ? t('title.timeLeft')
                : t('info.completed'),
            Value: (props) => (
              <p {...props}>
                {proposal.status === Status.Open &&
                expirationDate.getTime() > Date.now() ? (
                  <TimeAgo date={expirationDate} formatter={timeAgoFormatter} />
                ) : (
                  formatDate(expirationDate)
                )}
              </p>
            ),
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
                    Icon={OpenInNew}
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
