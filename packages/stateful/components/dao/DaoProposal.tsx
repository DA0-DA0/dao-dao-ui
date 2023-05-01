import { useWallet } from '@noahsaso/cosmodal'
import { ComponentProps, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  DaoProposalPageWrapperProps,
  IconButtonLink,
  ProfileDisconnectedCard,
  ProfileProposalCard,
  SelfRelayExecuteModal,
  SuspenseLoader,
  useOnDaoWebSocketMessage,
  walletProfileDataSelector,
} from '@dao-dao/stateful'
import { useActionsForMatching } from '@dao-dao/stateful/actions'
import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapterContext,
} from '@dao-dao/stateful/proposal-module-adapter'
import {
  Loader,
  Proposal,
  ProposalNotFound,
  ProposalProps,
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  CommonProposalInfo,
  ProposalPrefill,
  ProposalStatus,
  SelfRelayExecuteModalProps,
} from '@dao-dao/types'

interface InnerDaoProposalProps {
  proposalInfo: CommonProposalInfo
}

const InnerDaoProposal = ({ proposalInfo }: InnerDaoProposalProps) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const daoInfo = useDaoInfoContext()
  const actionsForMatching = useActionsForMatching({ isCreating: false })
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { connected, address } = useWallet()
  const {
    id,
    adapter: {
      components: {
        ProposalStatusAndInfo,
        ProposalInnerContentDisplay,
        ProposalVoteTally,
        ProposalVotes,
      },
      hooks: { useProposalRefreshers, useLoadingWalletVoteInfo },
    },
  } = useProposalModuleAdapterContext()

  const { profile: creatorProfile, loading: creatorProfileLoading } =
    useRecoilValue(
      walletProfileDataSelector({
        chainId,
        address: proposalInfo.createdByAddress,
      })
    )

  const { refreshProposal, refreshProposalAndAll, refreshing } =
    useProposalRefreshers()
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
        if (status === ProposalStatus.Executed) {
          // Manually revalidate DAO static props.
          await fetch(
            `/api/revalidate?d=${daoInfo.coreAddress}&p=${proposalInfo.id}`
          )

          // Show loading since page will reload shortly.
          toast.loading(t('success.proposalExecuted'))

          // Refresh entire app since any DAO config may have changed.
          window.location.reload()
        }
        // On close, show success toast.
        else if (status === ProposalStatus.Closed) {
          toast.success(t('success.proposalClosed'))
        }
      }
    }
  )

  // Fallback if the listener above is not listening.
  const onExecuteSuccess = useCallback(
    () =>
      onProposalUpdateFallback({
        status: ProposalStatus.Executed,
        proposalId: proposalInfo.id,
      }),
    [onProposalUpdateFallback, proposalInfo.id]
  )

  // Fallback if the listener above is not listening.
  const onCloseSuccess = useCallback(
    () =>
      onProposalUpdateFallback({
        status: ProposalStatus.Closed,
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
  const [seenAllActionPages, setSeenAllActionPages] = useState(false)

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

  // This gets passed down to the proposal module adapter's
  // ProposalInnerContentDisplay which is responsible for setting the duplicate
  // form data once it's loaded.
  const [duplicateFormData, setDuplicateFormData] =
    useState<ProposalPrefill<any>>()
  const prefill: ProposalPrefill<any> = {
    id,
    data: duplicateFormData,
  }
  // Don't set duplicate URL until form data is present. This ensures the
  // duplicate button remains hidden until the form data is loaded.
  const duplicateUrl = duplicateFormData
    ? getDaoProposalPath(daoInfo.coreAddress, 'create', {
        prefill: JSON.stringify(prefill),
      })
    : undefined

  return (
    <>
      <Proposal
        IconButtonLink={IconButtonLink}
        ProposalStatusAndInfo={CachedProposalStatusAndInfo}
        creator={{
          name: creatorProfileLoading
            ? { loading: true }
            : {
                loading: false,
                data: creatorProfile.name,
              },
          address: proposalInfo.createdByAddress,
        }}
        duplicateUrl={duplicateUrl}
        onRefresh={refreshProposal}
        proposalInfo={proposalInfo}
        proposalInnerContentDisplay={
          <SuspenseLoader fallback={<Loader />}>
            <ProposalInnerContentDisplay
              actionsForMatching={actionsForMatching}
              setDuplicateFormData={setDuplicateFormData}
              setSeenAllActionPages={
                // Only set seen all action pages if the user can vote. This
                // prevents the warning from appearing if the user can't vote.
                loadingWalletVoteInfo &&
                !loadingWalletVoteInfo.loading &&
                loadingWalletVoteInfo.data.canVote
                  ? () => setSeenAllActionPages(true)
                  : undefined
              }
            />
          </SuspenseLoader>
        }
        refreshing={refreshing}
        rightSidebarContent={
          connected ? (
            <SuspenseLoader
              fallback={<ProfileDisconnectedCard className="animate-pulse" />}
            >
              <ProfileProposalCard />
            </SuspenseLoader>
          ) : (
            <ProfileDisconnectedCard />
          )
        }
        voteTally={<ProposalVoteTally />}
        votesCast={<ProposalVotes />}
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
              status: ProposalStatus.Executed,
              proposalId: proposalInfo.id,
            },
            // Force call the fallback.
            {
              onlyIfNotListening: false,
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
