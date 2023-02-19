import { useWallet } from '@noahsaso/cosmodal'
import { ComponentProps, useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { navigatingToHrefAtom } from '@dao-dao/state'
import {
  DaoProposalPageWrapperProps,
  ProfileDisconnectedCard,
  ProfileProposalCard,
  SuspenseLoader,
  useOnDaoWebSocketMessage,
  useWalletProfile,
} from '@dao-dao/stateful'
import { useActions, useOrderedActionsToMatch } from '@dao-dao/stateful/actions'
import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapterContext,
} from '@dao-dao/stateful/proposal-module-adapter'
import {
  Loader,
  Proposal,
  ProposalNotFound,
  ProposalProps,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { CommonProposalInfo } from '@dao-dao/types'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'

interface InnerDaoProposalProps {
  proposalInfo: CommonProposalInfo
}

const InnerDaoProposal = ({ proposalInfo }: InnerDaoProposalProps) => {
  const { t } = useTranslation()
  const daoInfo = useDaoInfoContext()
  const orderedActions = useOrderedActionsToMatch(useActions())
  const { getDaoProposalPath, router } = useNavHelpers()
  const { connected, address } = useWallet()
  const {
    adapter: {
      components: {
        ProposalStatusAndInfo,
        ProposalActionDisplay,
        ProposalVoteTally,
        ProposalVotes,
      },
      hooks: { useProposalRefreshers },
    },
  } = useProposalModuleAdapterContext()

  const { profile: creatorProfile } = useWalletProfile({
    walletAddress: proposalInfo.createdByAddress,
  })

  const { refreshProposal, refreshProposalAndAll, refreshing } =
    useProposalRefreshers()

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
  } = useOnDaoWebSocketMessage('proposal', async ({ status, proposalId }) => {
    // If the current proposal updated...
    if (proposalId === proposalInfo.id) {
      refreshProposalAndAll()

      // On execute, revalidate and refresh page.
      if (status === Status.Executed) {
        // Show loading since page will reload shortly.
        toast.loading(t('success.proposalExecuted'))

        // Manually revalidate DAO static props.
        await fetch(
          `/api/revalidate?d=${daoInfo.coreAddress}&p=${proposalInfo.id}`
        )

        // Refresh entire app since any DAO config may have changed.
        window.location.reload()
      }
      // On close, show success toast.
      else if (status === Status.Closed) {
        toast.success(t('success.proposalClosed'))
      }
    }
  })

  // Fallback if the listener above is not listening.
  const onExecuteSuccess = useCallback(
    () =>
      onProposalUpdateFallback({
        status: Status.Executed,
        proposalId: proposalInfo.id,
      }),
    [onProposalUpdateFallback, proposalInfo.id]
  )

  // Fallback if the listener above is not listening.
  const onCloseSuccess = useCallback(
    () =>
      onProposalUpdateFallback({
        status: Status.Closed,
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
      />
    ),
    [ProposalStatusAndInfo, onCloseSuccess, onExecuteSuccess, onVoteSuccess]
  )

  const duplicateUrlPrefix = getDaoProposalPath(daoInfo.coreAddress, 'create', {
    prefill: '',
  })
  const [navigatingToHref, setNavigatingToHref] =
    useRecoilState(navigatingToHrefAtom)

  return (
    <Proposal
      ProposalStatusAndInfo={CachedProposalStatusAndInfo}
      actionDisplay={
        <SuspenseLoader fallback={<Loader />}>
          <ProposalActionDisplay
            availableActions={orderedActions}
            duplicateLoading={
              !!navigatingToHref?.startsWith(duplicateUrlPrefix)
            }
            onDuplicate={(data) => {
              const url =
                duplicateUrlPrefix + encodeURIComponent(JSON.stringify(data))
              router.push(url)
              // Show loading on duplicate button.
              setNavigatingToHref(url)
            }}
          />
        </SuspenseLoader>
      }
      creator={{
        name: creatorProfile.loading
          ? creatorProfile
          : {
              ...creatorProfile,
              data: creatorProfile.data.name,
            },
        address: proposalInfo.createdByAddress,
      }}
      onRefresh={refreshProposal}
      proposalInfo={proposalInfo}
      refreshing={refreshing}
      rightSidebarContent={
        connected ? <ProfileProposalCard /> : <ProfileDisconnectedCard />
      }
      voteTally={<ProposalVoteTally />}
      votesCast={<ProposalVotes />}
    />
  )
}

export const DaoProposal = ({
  proposalInfo,
  serializedInfo,
}: Pick<DaoProposalPageWrapperProps, 'proposalInfo' | 'serializedInfo'>) =>
  proposalInfo && serializedInfo ? (
    <ProposalModuleAdapterProvider
      initialOptions={{
        chainId: serializedInfo.chainId,
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
