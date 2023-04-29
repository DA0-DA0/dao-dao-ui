import {
  AccountCircleOutlined,
  ArrowOutwardRounded,
  CancelOutlined,
  HourglassTopRounded,
  Key,
  Redo,
  RotateRightOutlined,
  Send,
  Tag,
} from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import uniq from 'lodash.uniq'
import { ComponentType, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, waitForAllSettled } from 'recoil'

import { PolytoneListenerSelectors } from '@dao-dao/state/recoil'
import {
  CopyToClipboardUnderline,
  IconButtonLink,
  Logo,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  Tooltip,
  useCachedLoading,
  useChain,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import {
  BaseProposalStatusAndInfoProps,
  CheckedDepositInfo,
  ContractVersion,
  DepositRefundPolicy,
  ProposalStatus,
} from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  CHAIN_TXN_URL_PREFIX,
  decodeMessages,
  decodePolytoneExecuteMsg,
  formatPercentOf100,
  makeWasmMessage,
  processError,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { ButtonLink } from '../../../../components/ButtonLink'
import { EntityDisplay } from '../../../../components/EntityDisplay'
import { useAwaitNextBlock, useMembership } from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import {
  useClose as useCloseV1,
  useExecute as useExecuteV1,
} from '../contracts/CwProposalSingle.v1.hooks'
import { configSelector } from '../contracts/DaoProposalSingle.common.recoil'
import {
  useClose as useCloseV2,
  useExecute as useExecuteV2,
} from '../contracts/DaoProposalSingle.v2.hooks'
import {
  useCastVote,
  useLoadingDepositInfo,
  useLoadingProposal,
  useLoadingProposalExecutionTxHash,
  useLoadingVoteOptions,
  useLoadingVotesInfo,
  useLoadingWalletVoteInfo,
  useProposalRefreshers,
} from '../hooks'
import { ProposalWithMetadata, VotesInfo } from '../types'

export const ProposalStatusAndInfo = (
  props: BaseProposalStatusAndInfoProps
) => {
  const loadingProposal = useLoadingProposal()
  const loadingVotesInfo = useLoadingVotesInfo()
  const loadingDepositInfo = useLoadingDepositInfo()

  return (
    <SuspenseLoader
      fallback={<InnerProposalStatusAndInfoLoader {...props} />}
      forceFallback={
        loadingProposal.loading ||
        loadingVotesInfo.loading ||
        loadingDepositInfo.loading
      }
    >
      {!loadingProposal.loading &&
        !loadingVotesInfo.loading &&
        !loadingDepositInfo.loading && (
          <InnerProposalStatusAndInfo
            {...props}
            depositInfo={loadingDepositInfo.data}
            proposal={loadingProposal.data}
            votesInfo={loadingVotesInfo.data}
          />
        )}
    </SuspenseLoader>
  )
}

const InnerProposalStatusAndInfo = ({
  proposal: { timestampInfo, votingOpen, ...proposal },
  votesInfo: {
    quorum,
    thresholdReached,
    quorumReached,
    turnoutPercent,
    turnoutYesPercent,
  },
  depositInfo,
  onVoteSuccess,
  onExecuteSuccess,
  onCloseSuccess,
  openSelfRelayExecute,
  ...props
}: BaseProposalStatusAndInfoProps & {
  proposal: ProposalWithMetadata
  votesInfo: VotesInfo
  depositInfo: CheckedDepositInfo | undefined
}) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useNavHelpers()
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const { connected, address: walletAddress = '' } = useWallet()
  const { isMember = false } = useMembership({
    coreAddress,
  })

  const config = useRecoilValue(
    configSelector({
      chainId,
      contractAddress: proposalModule.address,
    })
  )

  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()
  const loadingExecutionTxHash = useLoadingProposalExecutionTxHash()
  const { refreshProposal, refreshProposalAndAll } = useProposalRefreshers()

  const info: ProposalStatusAndInfoProps<Vote>['info'] = [
    {
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !h-5 !w-5', className)} />
      ),
      label: t('title.dao'),
      Value: (props) => (
        <ButtonLink
          href={getDaoPath(coreAddress)}
          variant="underline"
          {...props}
        >
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
        ] as ProposalStatusAndInfoProps<Vote>['info'])
      : []),
    ...(timestampInfo?.display
      ? ([
          {
            Icon: HourglassTopRounded,
            label: timestampInfo.display.label,
            Value: (props) => (
              <Tooltip title={timestampInfo.display!.tooltip}>
                <p {...props}>{timestampInfo.display!.content}</p>
              </Tooltip>
            ),
          },
        ] as ProposalStatusAndInfoProps<Vote>['info'])
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
                      Icon={ArrowOutwardRounded}
                      href={CHAIN_TXN_URL_PREFIX + loadingExecutionTxHash.data}
                      variant="ghost"
                    />
                  )}
                </div>
              ) : null,
          },
        ] as ProposalStatusAndInfoProps<Vote>['info'])
      : []),
  ]

  const status =
    proposal.status === ProposalStatus.Open
      ? thresholdReached && (!quorum || quorumReached)
        ? t('info.proposalStatus.willPass')
        : !thresholdReached && (!quorum || quorumReached)
        ? t('info.proposalStatus.willFailBadThreshold')
        : thresholdReached && quorum && !quorumReached
        ? t('info.proposalStatus.willFailBadQuorum')
        : t('info.proposalStatus.willFail')
      : votingOpen
      ? t('info.proposalStatus.completedAndOpen')
      : t('info.proposalStatus.notOpen', {
          turnoutPercent: formatPercentOf100(turnoutPercent),
          turnoutYesPercent: formatPercentOf100(turnoutYesPercent),
          extra:
            // Add sentence about closing to receive deposit back if it needs to
            // be closed and will refund.
            proposal.status === ProposalStatus.Rejected &&
            depositInfo?.refund_policy === DepositRefundPolicy.Always
              ? ` ${t('info.proposalDepositWillBeRefunded')}`
              : '',
        })

  const voteOptions = useLoadingVoteOptions()
  const { castVote, castingVote } = useCastVote(onVoteSuccess)

  const executeProposal = (
    proposalModule.version === ContractVersion.V1 ? useExecuteV1 : useExecuteV2
  )({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })
  const closeProposal = (
    proposalModule.version === ContractVersion.V1 ? useCloseV1 : useCloseV2
  )({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })

  const [actionLoading, setActionLoading] = useState(false)
  // On proposal status update, stop loading. This ensures the action button
  // doesn't stop loading too early, before the status has refreshed.
  useEffect(() => {
    setActionLoading(false)
  }, [proposal.status])

  // Decoded polytone execute messages.
  const polytoneMessages = useMemo(
    () =>
      proposal.msgs
        .map((msg) =>
          decodePolytoneExecuteMsg(decodeMessages([msg])[0], 'oneOrZero')
        )
        .map((decoded) => (decoded.match ? decoded : null))
        .filter((decoded) => decoded !== null)
        .map((decoded) => decoded!),
    [proposal.msgs]
  )
  const hasPolytoneMessages = polytoneMessages.length > 0
  // Callback results.
  const polytoneResults = useCachedLoading(
    waitForAllSettled(
      polytoneMessages.map(({ polytoneNote: { listener }, initiatorMsg }) =>
        PolytoneListenerSelectors.resultSelector({
          chainId,
          contractAddress: listener,
          params: [
            {
              initiator: coreAddress,
              initiatorMsg,
            },
          ],
        })
      )
    ),
    []
  )
  const openPolytoneRelay = (transactionHash?: string) =>
    hasPolytoneMessages &&
    openSelfRelayExecute({
      uniqueId: `${chainId}:${proposalModule.address}:${proposalNumber}`,
      transaction: transactionHash
        ? {
            type: 'exists',
            hash: transactionHash,
          }
        : {
            type: 'execute',
            msgs: [
              makeWasmMessage({
                wasm: {
                  execute: {
                    contract_addr: proposalModule.address,
                    funds: [],
                    msg: {
                      execute: {
                        proposal_id: proposalNumber,
                      },
                    },
                  },
                },
              }),
            ],
          },
      chainIds: uniq(polytoneMessages.map(({ chainId }) => chainId)),
    })

  const onExecute = useCallback(async () => {
    if (!connected) {
      return
    }

    setActionLoading(true)
    try {
      await executeProposal({ proposalId: proposalNumber })

      await onExecuteSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setActionLoading(false)
    }

    // Loading will stop on success when status refreshes.
  }, [connected, executeProposal, proposalNumber, onExecuteSuccess])

  const onClose = useCallback(async () => {
    if (!connected) {
      return
    }

    setActionLoading(true)

    try {
      await closeProposal({
        proposalId: proposalNumber,
      })

      await onCloseSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setActionLoading(false)
    }

    // Loading will stop on success when status refreshes.
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
              doAction: hasPolytoneMessages
                ? () => openPolytoneRelay()
                : onExecute,
            }
          : proposal.status === ProposalStatus.Rejected
          ? {
              label: t('button.close'),
              Icon: CancelOutlined,
              loading: actionLoading,
              doAction: onClose,
            }
          : // If executed and has polytone messages that have not been relayed and has loaded TX hash.
          proposal.status === ProposalStatus.Executed &&
            polytoneMessages.length > 0 &&
            !polytoneResults.loading &&
            polytoneResults.data.some(
              (loadable) => loadable.state === 'hasError'
            ) &&
            !loadingExecutionTxHash.loading &&
            loadingExecutionTxHash.data
          ? {
              label: t('button.relay'),
              Icon: Send,
              loading: actionLoading,
              doAction: () => openPolytoneRelay(loadingExecutionTxHash.data),
              description:
                // TODO(polytone): i18n
                'The proposal was executed, but some or all of the cross-chain messages have not yet been relayed. You must relay them to complete the execution.',
            }
          : undefined
      }
      info={info}
      status={status}
      vote={
        loadingWalletVoteInfo &&
        !loadingWalletVoteInfo.loading &&
        loadingWalletVoteInfo.data.canVote &&
        !voteOptions.loading
          ? {
              loading: castingVote,
              currentVote: loadingWalletVoteInfo.data.vote,
              onCastVote: castVote,
              options: voteOptions.data,
              proposalOpen: proposal.status === ProposalStatus.Open,
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
  const { getDaoPath } = useNavHelpers()

  const LoaderP: ComponentType<{ className: string }> = ({ className }) => (
    <p className={clsx('animate-pulse', className)}>...</p>
  )
  const info: ProposalStatusAndInfoProps<Vote>['info'] = [
    {
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !h-5 !w-5', className)} />
      ),
      label: t('title.dao'),
      Value: (props) => (
        <ButtonLink
          href={getDaoPath(coreAddress)}
          variant="underline"
          {...props}
        >
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
