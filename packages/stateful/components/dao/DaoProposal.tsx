import { ComponentProps, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapterContext,
} from '@dao-dao/stateful/proposal-module-adapter'
import {
  Proposal,
  ProposalNotFound,
  ProposalProps,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  CommonProposalInfo,
  PreProposeModuleType,
  ProposalStatusEnum,
  SelfRelayExecuteModalProps,
} from '@dao-dao/types'

import { useOnDaoWebSocketMessage, useWallet } from '../../hooks'
import { ProfileDisconnectedCard, ProfileProposalCard } from '../profile'
import { SelfRelayExecuteModal } from '../SelfRelayExecuteModal'
import { SuspenseLoader } from '../SuspenseLoader'
import { DaoApproverProposalContentDisplay } from './DaoApproverProposalContentDisplay'
import { DaoProposalPageWrapperProps } from './DaoPageWrapper'
import { DaoPreProposeApprovalProposalContentDisplay } from './DaoPreProposeApprovalProposalContentDisplay'
import { DaoProposalContentDisplay } from './DaoProposalContentDisplay'

interface InnerDaoProposalProps {
  proposalInfo: CommonProposalInfo
}

const InnerDaoProposal = ({ proposalInfo }: InnerDaoProposalProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { isWalletConnected, address } = useWallet()
  const {
    options: { proposalModule, isPreProposeApprovalProposal },
    adapter: {
      components: {
        ProposalStatusAndInfo,
        PreProposeApprovalProposalStatusAndInfo,
        ProposalVoteTally,
        ProposalVotes,
      },
      hooks: { useProposalRefreshers, useLoadingWalletVoteInfo },
    },
  } = useProposalModuleAdapterContext()

  const { refreshProposalAndAll } = useProposalRefreshers()
  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()

  const [selfRelayExecuteProps, setSelfRelayExecuteProps] =
    useState<
      Pick<SelfRelayExecuteModalProps, 'uniqueId' | 'chainIds' | 'transaction'>
    >()

  // Vote listener. Show alerts and refresh accordingly.
  const { listening: listeningForVote, fallback: onVoteSuccess } =
    useOnDaoWebSocketMessage(
      'vote',
      ({ proposalId, voter }) => {
        // If vote made on current proposal...
        if (proposalId === proposalInfo.id) {
          refreshProposalAndAll()

          // If the current user voted on current proposal, show a success
          // toast.
          if (voter === address) {
            toast.success(t('success.voteCast'))
          }
        }
      },
      {
        proposalId: proposalInfo.id,
        voter: address,
      }
    )

  // Proposal status listener. Show alerts and refresh accordingly.
  const {
    listening: listeningForProposal,
    fallback: onProposalUpdateFallback,
  } = useOnDaoWebSocketMessage(
    'proposal',
    async ({ status, proposalId }, fallback) => {
      // If using self-relay execute, don't show toast or reload page until
      // manually called via fallback. Once the self-relay is complete, this
      // will be called manually to show the toast and reload the page.
      if (selfRelayExecuteProps && !fallback) {
        return
      }

      // If the current proposal updated...
      if (proposalId === proposalInfo.id) {
        refreshProposalAndAll()

        // On execute, revalidate and refresh page.
        if (status === ProposalStatusEnum.Executed) {
          // Manually revalidate DAO static props.
          await fetch(`/api/revalidate?d=${coreAddress}&p=${proposalInfo.id}`)

          // Show loading since page will reload shortly.
          toast.loading(t('success.proposalExecuted'))

          // Refresh entire app since any DAO config may have changed.
          window.location.reload()
        }
        // On close, show success toast.
        else if (status === ProposalStatusEnum.Closed) {
          toast.success(t('success.proposalClosed'))
        }
      }
    }
  )

  // Fallback if the listener above is not listening.
  const onExecuteSuccess = useCallback(
    () =>
      onProposalUpdateFallback({
        status: ProposalStatusEnum.Executed,
        proposalId: proposalInfo.id,
      }),
    [onProposalUpdateFallback, proposalInfo.id]
  )

  // Fallback if the listener above is not listening.
  const onCloseSuccess = useCallback(
    () =>
      onProposalUpdateFallback({
        status: ProposalStatusEnum.Closed,
        proposalId: proposalInfo.id,
      }),
    [onProposalUpdateFallback, proposalInfo.id]
  )

  // Fallback if both listeners above are offline, refresh every 30 seconds.
  useEffect(() => {
    if (listeningForVote || listeningForProposal) {
      return
    }

    const interval = setInterval(refreshProposalAndAll, 30 * 1000)
    return () => clearInterval(interval)
  }, [listeningForProposal, listeningForVote, refreshProposalAndAll])

  // Whether or not the user has seen all the action pages.
  const [seenAllActionPages, __setSeenAllActionPages] = useState(false)
  const _setSeenAllActionPages = useCallback(
    () => __setSeenAllActionPages(true),
    []
  )
  const setSeenAllActionPages =
    // Only set seen all action pages if the user can vote. This prevents the
    // warning from appearing if the user can't vote.
    loadingWalletVoteInfo &&
    !loadingWalletVoteInfo.loading &&
    loadingWalletVoteInfo.data.canVote
      ? _setSeenAllActionPages
      : undefined

  // Memoize ProposalStatusAndInfo so it doesn't re-render when the proposal
  // refreshes. The cached loadable it uses internally depends on the
  // component's consistency. If we inline the component definition in the props
  // below, it gets redefined on every render, and the hook cache is reset.
  const CachedProposalStatusAndInfo = useCallback(
    (props: ComponentProps<ProposalProps['ProposalStatusAndInfo']>) => (
      <ProposalStatusAndInfo
        {...props}
        onCloseSuccess={onCloseSuccess}
        onExecuteSuccess={onExecuteSuccess}
        onVoteSuccess={onVoteSuccess}
        openSelfRelayExecute={setSelfRelayExecuteProps}
        seenAllActionPages={seenAllActionPages}
      />
    ),
    [
      ProposalStatusAndInfo,
      onCloseSuccess,
      onExecuteSuccess,
      onVoteSuccess,
      seenAllActionPages,
    ]
  )

  return (
    <>
      <Proposal
        ProposalStatusAndInfo={
          isPreProposeApprovalProposal &&
          PreProposeApprovalProposalStatusAndInfo
            ? PreProposeApprovalProposalStatusAndInfo
            : CachedProposalStatusAndInfo
        }
        contentDisplay={
          proposalModule.prePropose?.type === PreProposeModuleType.Approver ? (
            <DaoApproverProposalContentDisplay
              proposalInfo={proposalInfo}
              setSeenAllActionPages={setSeenAllActionPages}
            />
          ) : isPreProposeApprovalProposal ? (
            <DaoPreProposeApprovalProposalContentDisplay
              proposalInfo={proposalInfo}
            />
          ) : (
            <DaoProposalContentDisplay
              proposalInfo={proposalInfo}
              setSeenAllActionPages={setSeenAllActionPages}
            />
          )
        }
        id={proposalInfo.id}
        rightSidebarContent={
          isWalletConnected ? (
            <SuspenseLoader
              fallback={<ProfileDisconnectedCard className="animate-pulse" />}
            >
              <ProfileProposalCard />
            </SuspenseLoader>
          ) : (
            <ProfileDisconnectedCard />
          )
        }
        voteTally={
          isPreProposeApprovalProposal ? undefined : <ProposalVoteTally />
        }
        votesCast={isPreProposeApprovalProposal ? undefined : <ProposalVotes />}
      />

      <SelfRelayExecuteModal
        // Placeholders that get overridden when the modal is opened.
        chainIds={[]}
        transaction={{
          type: 'execute',
          msgs: [],
        }}
        uniqueId=""
        {...selfRelayExecuteProps}
        onClose={() => setSelfRelayExecuteProps(undefined)}
        onSuccess={() =>
          onProposalUpdateFallback(
            {
              status: ProposalStatusEnum.Executed,
              proposalId: proposalInfo.id,
            },
            // Force call the fallback, and don't wait for a block to pass.
            {
              onlyIfNotListening: false,
              skipWait: true,
            }
          )
        }
        visible={!!selfRelayExecuteProps}
      />
    </>
  )
}

export const DaoProposal = ({
  proposalInfo,
  serializedInfo,
}: Pick<DaoProposalPageWrapperProps, 'proposalInfo' | 'serializedInfo'>) =>
  proposalInfo && serializedInfo ? (
    <ProposalModuleAdapterProvider
      key={
        // Make sure to refresh when the DAO or proposal ID changes. In case we
        // redirect to a proposal in the same DAO, this is necessary to refresh
        // for some reason.
        serializedInfo.coreAddress + proposalInfo.id
      }
      initialOptions={{
        coreAddress: serializedInfo.coreAddress,
      }}
      proposalId={proposalInfo.id}
      proposalModules={serializedInfo.proposalModules}
    >
      <InnerDaoProposal proposalInfo={proposalInfo} />
    </ProposalModuleAdapterProvider>
  ) : (
    <ProposalNotFound />
  )
