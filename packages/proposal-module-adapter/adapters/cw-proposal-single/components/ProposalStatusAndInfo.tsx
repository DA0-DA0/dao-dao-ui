import {
  AccountCircleOutlined,
  CancelOutlined,
  HourglassTopRounded,
  Key,
  OpenInNew,
  RotateRightOutlined,
  Tag,
} from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import {
  blockHeightSelector,
  blocksPerYearSelector,
  useCachedLoadable,
  useProfile,
  useVotingModule,
} from '@dao-dao/state'
import {
  BaseProposalStatusAndInfoProps,
  ContractVersion,
  DepositRefundPolicy,
} from '@dao-dao/tstypes'
import { Status } from '@dao-dao/tstypes/contracts/CwProposalSingle.common'
import {
  ButtonLink,
  CopyToClipboardUnderline,
  IconButtonLink,
  Logo,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
} from '@dao-dao/ui'
import {
  CHAIN_TXN_URL_PREFIX,
  convertExpirationToDate,
  dateToWdhms,
  formatDate,
  formatPercentOf100,
  processError,
} from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { configSelector } from '../contracts/CwProposalSingle.common.recoil'
import {
  useClose as useCloseV1,
  useExecute as useExecuteV1,
} from '../contracts/CwProposalSingle.v1.hooks'
import {
  useClose as useCloseV2,
  useExecute as useExecuteV2,
} from '../contracts/CwProposalSingle.v2.hooks'
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

  const { profile: proposerProfile } = useProfile({
    walletAddress: proposal.proposer,
  })

  const executionTxHash = useProposalExecutionTxHash()
  const blocksPerYear = useRecoilValue(blocksPerYearSelector)
  const blockHeightLoadable = useCachedLoadable(blockHeightSelector)
  const expirationDate = convertExpirationToDate(
    blocksPerYear,
    proposal.expiration,
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0
  )

  const info: ProposalStatusAndInfoProps['info'] = [
    {
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !w-5 !h-5', className)} />
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
      Value: ({ className, ...props }) => (
        <CopyToClipboardUnderline
          {...props}
          className={clsx(
            proposerProfile.loading && 'animate-pulse',
            className
          )}
          // If name exists, use that. Otherwise, will fall back to
          // truncated address display.
          label={
            (!proposerProfile.loading && proposerProfile.data.name) || undefined
          }
          takeStartEnd={{
            start: 6,
            end: 4,
          }}
          tooltip={
            // If displaying name, show tooltip to copy address.
            !proposerProfile.loading && proposerProfile.data.name
              ? t('button.clickToCopyAddress')
              : undefined
          }
          value={proposal.proposer}
          {...props}
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
    ...(expirationDate
      ? ([
          {
            Icon: HourglassTopRounded,
            label:
              expirationDate.getTime() > Date.now()
                ? t('title.timeLeft')
                : t('info.completed'),
            Value: (props) => (
              <p {...props}>
                {expirationDate.getTime() > Date.now()
                  ? dateToWdhms(expirationDate)
                  : formatDate(expirationDate)}
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
              <div className="flex flex-row gap-1 items-center">
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

  // TODO: i18n
  const status =
    proposal.status === Status.Open
      ? thresholdReached && (!quorum || quorumReached)
        ? 'If the current vote stands, this proposal will pass.'
        : !thresholdReached && (!quorum || quorumReached)
        ? "If the current vote stands, this proposal will fail because insufficient 'Yes' votes have been cast."
        : thresholdReached && quorum && !quorumReached
        ? 'If the current vote stands, this proposal will fail due to a lack of voter participation.'
        : 'If the current vote stands, this proposal will fail.'
      : `This proposal is no longer open for voting. ${formatPercentOf100(
          turnoutPercent
        )} of all votes were cast, and ${formatPercentOf100(
          turnoutYesPercent
        )} of them were 'Yes'.${
          // Add sentence about closing to receive deposit back if it needs to
          // be closed and will refund.
          proposal.status === Status.Rejected &&
          depositInfo?.refund_policy === DepositRefundPolicy.Always
            ? ` ${t('info.proposalDepositWillBeRefunded')}`
            : ''
        }`

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
