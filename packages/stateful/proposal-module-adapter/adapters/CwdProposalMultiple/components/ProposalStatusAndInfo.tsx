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
import { ComponentType, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  CopyToClipboardUnderline,
  IconButtonLink,
  Logo,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  BaseProposalStatusAndInfoProps,
  CheckedDepositInfo,
  DepositRefundPolicy,
  ProposalStatus,
} from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/CwdProposalMultiple'
import {
  CHAIN_TXN_URL_PREFIX,
  formatPercentOf100,
  processError,
} from '@dao-dao/utils'

import { EntityDisplay, SuspenseLoader } from '../../../../components'
import { ButtonLink } from '../../../../components/ButtonLink'
import { useAwaitNextBlock, useMembership } from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useClose, useExecute } from '../contracts/CwdProposalMultiple.hooks'
import { configSelector } from '../contracts/CwdProposalMultiple.recoil'
import {
  useCastVote,
  useLoadingDepositInfo,
  useLoadingProposal,
  useLoadingProposalExecutionTxHash,
  useLoadingVotesInfo,
  useLoadingWalletVoteInfo,
  useProposalRefreshers,
  useVoteOptions,
} from '../hooks'
import { ProposalWithMetadata, VotesInfo } from '../types'

export const ProposalStatusAndInfo = (
  props: BaseProposalStatusAndInfoProps
) => {
  const loadingProposal = useLoadingProposal()
  const loadingMultipleChoiceVotesInfo = useLoadingVotesInfo()
  const loadingDepositInfo = useLoadingDepositInfo()

  return (
    <SuspenseLoader
      fallback={<InnerProposalStatusAndInfoLoader {...props} />}
      forceFallback={
        loadingProposal.loading ||
        loadingMultipleChoiceVotesInfo.loading ||
        loadingDepositInfo.loading
      }
    >
      {!loadingProposal.loading &&
        !loadingMultipleChoiceVotesInfo.loading &&
        !loadingDepositInfo.loading && (
          <InnerProposalStatusAndInfo
            {...props}
            depositInfo={loadingDepositInfo.data}
            proposal={loadingProposal.data}
            votesInfo={loadingMultipleChoiceVotesInfo.data}
          />
        )}
    </SuspenseLoader>
  )
}

const InnerProposalStatusAndInfo = ({
  proposal: { timestampInfo, votingOpen, ...proposal },
  votesInfo: { quorumReached, turnoutPercent, isTie },
  depositInfo,
  onVoteSuccess,
  onExecuteSuccess,
  onCloseSuccess,
  ...props
}: BaseProposalStatusAndInfoProps & {
  proposal: ProposalWithMetadata
  votesInfo: VotesInfo
  depositInfo: CheckedDepositInfo | undefined
}) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress, chainId } = useDaoInfoContext()
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const { connected, address: walletAddress = '' } = useWallet()
  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
  })

  const config = useRecoilValue(
    configSelector({
      contractAddress: proposalModule.address,
    })
  )

  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()
  const loadingExecutionTxHash = useLoadingProposalExecutionTxHash()
  const { refreshProposal, refreshProposalAndAll } = useProposalRefreshers()

  const info: ProposalStatusAndInfoProps<MultipleChoiceVote>['info'] = [
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
        <EntityDisplay
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
        ] as ProposalStatusAndInfoProps<MultipleChoiceVote>['info'])
      : []),
    ...(timestampInfo?.display
      ? ([
          {
            Icon: HourglassTopRounded,
            label: timestampInfo.display.label,
            Value: (props) => (
              <p {...props}>{timestampInfo.display!.content}</p>
            ),
          },
        ] as ProposalStatusAndInfoProps<MultipleChoiceVote>['info'])
      : []),
    ...(loadingExecutionTxHash.loading || loadingExecutionTxHash.data
      ? ([
          {
            Icon: Tag,
            label: t('info.txAbbr'),
            Value: (props) =>
              loadingExecutionTxHash.loading ? (
                <p className={clsx('animate-pulse', props.className)}>...</p>
              ) : loadingExecutionTxHash.data ? (
                <div className="flex flex-row items-center gap-1">
                  <CopyToClipboardUnderline
                    // Will truncate automatically.
                    takeAll
                    value={loadingExecutionTxHash.data}
                    {...props}
                  />
                  {!!CHAIN_TXN_URL_PREFIX && (
                    <IconButtonLink
                      Icon={ArrowOutward}
                      href={CHAIN_TXN_URL_PREFIX + loadingExecutionTxHash.data}
                      variant="ghost"
                    />
                  )}
                </div>
              ) : null,
          },
        ] as ProposalStatusAndInfoProps<MultipleChoiceVote>['info'])
      : []),
  ]

  let status: string
  if (proposal.status === ProposalStatus.Open) {
    if (quorumReached) {
      if (isTie) {
        status = t('info.proposalStatus.willFailTiedMultipleChoiceVote')
      } else {
        // Will pass
        status = t('info.proposalStatus.willPass')
      }
    } else {
      // Quorum not reached
      status = t('info.proposalStatus.willFailBadQuorum')
    }
  } else {
    if (votingOpen) {
      // Proposal status is determined but voting is still open
      status = t('info.proposalStatus.completedAndOpen')
    } else {
      status = t('info.proposalStatus.notOpenMultipleChoice', {
        turnoutPercent: formatPercentOf100(turnoutPercent),
        extra:
          // Add sentence about closing to receive deposit back if it needs to
          // be closed and will refund.
          proposal.status === ProposalStatus.Rejected &&
          depositInfo?.refund_policy === DepositRefundPolicy.Always
            ? ` ${t('info.proposalDepositWillBeRefunded')}`
            : '',
      })
    }
  }

  const voteOptions = useVoteOptions(proposal)
  const { castVote, castingVote } = useCastVote(onVoteSuccess)

  const executeProposal = useExecute({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })
  const closeProposal = useClose({
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

  const awaitNextBlock = useAwaitNextBlock()
  // Refresh proposal and list of proposals (for list status) once voting ends.
  useEffect(() => {
    if (
      proposal.status !== ProposalStatus.Open ||
      !timestampInfo?.expirationDate
    ) {
      return
    }

    const msRemaining = timestampInfo?.expirationDate.getTime() - Date.now()
    if (msRemaining < 0) {
      return
    }

    const timeout = setTimeout(() => {
      // Refresh immediately so that the timestamp countdown re-renders and
      // hides itself.
      refreshProposal()
      // Refresh again after a block to make sure the status has been updated,
      // and refresh the list of all proposals so the status gets updated there
      // as well.
      awaitNextBlock().then(refreshProposalAndAll)
    }, msRemaining)
    return () => clearTimeout(timeout)
  }, [
    timestampInfo?.expirationDate,
    proposal.status,
    refreshProposal,
    refreshProposalAndAll,
    awaitNextBlock,
  ])

  // Refresh proposal every 30 seconds, while voting open. Refreshes status and
  // votes.
  useEffect(() => {
    if (!proposal.votingOpen) {
      return
    }

    const interval = setInterval(refreshProposal, 30 * 1000)
    return () => clearInterval(interval)
  }, [refreshProposal, proposal.votingOpen])

  return (
    <StatelessProposalStatusAndInfo
      {...props}
      action={
        proposal.status === ProposalStatus.Passed &&
        // Show if anyone can execute OR if the wallet is a member.
        (!config.only_members_execute || isMember)
          ? {
              label: t('button.execute'),
              Icon: Key,
              loading: actionLoading,
              doAction: onExecute,
            }
          : proposal.status === ProposalStatus.Rejected
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
      vote={
        loadingWalletVoteInfo &&
        !loadingWalletVoteInfo.loading &&
        loadingWalletVoteInfo.data.canVote
          ? {
              loading: castingVote,
              currentVote: loadingWalletVoteInfo.data.vote,
              onCastVote: castVote,
              options: voteOptions,
            }
          : undefined
      }
    />
  )
}

const InnerProposalStatusAndInfoLoader = (
  props: BaseProposalStatusAndInfoProps
) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress } = useDaoInfoContext()

  const LoaderP: ComponentType<{ className: string }> = ({ className }) => (
    <p className={clsx('animate-pulse', className)}>...</p>
  )
  const info: ProposalStatusAndInfoProps<MultipleChoiceVote>['info'] = [
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
      Value: LoaderP,
    },
    {
      Icon: RotateRightOutlined,
      label: t('title.status'),
      Value: LoaderP,
    },
    {
      Icon: HourglassTopRounded,
      label: t('title.date'),
      Value: LoaderP,
    },
  ]

  return (
    <StatelessProposalStatusAndInfo
      {...props}
      info={info}
      status={t('info.loading')}
    />
  )
}
