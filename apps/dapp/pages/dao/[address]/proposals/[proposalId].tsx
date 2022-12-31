// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ComponentProps, useCallback, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { navigatingToHrefAtom } from '@dao-dao/state'
import {
  DaoPageWrapper,
  DaoProposalPageWrapperProps,
  ProfileProposalCard,
  Trans,
  useWalletProfile,
} from '@dao-dao/stateful'
import { useCoreActions } from '@dao-dao/stateful/actions'
import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapterContext,
} from '@dao-dao/stateful/proposal-module-adapter'
import { makeGetDaoProposalStaticProps } from '@dao-dao/stateful/server'
import { useVotingModuleAdapter } from '@dao-dao/stateful/voting-module-adapter'
import {
  ProfileDisconnectedCard,
  Proposal,
  ProposalNotFound,
  ProposalProps,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { ActionKey, CommonProposalInfo, CoreActionKey } from '@dao-dao/types'
import { SITE_URL } from '@dao-dao/utils'

interface InnerProposalProps {
  proposalInfo: CommonProposalInfo
}

const InnerProposal = ({ proposalInfo }: InnerProposalProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const daoInfo = useDaoInfoContext()
  const { connected } = useWallet()
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
    common: {
      hooks: { useActions: useProposalModuleActions },
    },
  } = useProposalModuleAdapterContext()
  const {
    hooks: { useActions: useVotingModuleActions },
  } = useVotingModuleAdapter()

  const votingModuleActions = useVotingModuleActions()
  const proposalModuleActions = useProposalModuleActions()
  const actions = useCoreActions(
    useMemo(
      () => [...votingModuleActions, ...proposalModuleActions],
      [proposalModuleActions, votingModuleActions]
    )
  )

  const { profile: creatorProfile } = useWalletProfile({
    walletAddress: proposalInfo.createdByAddress,
  })

  // Ensure the last two actions are execute smart contract followed by
  // custom, since a lot of actions are smart contract executions, and custom
  // is a catch-all that will display any message. Do this by assigning values
  // and sorting the actions in ascending order.
  const orderedActions = useMemo(() => {
    const keyToValue = (key: ActionKey) =>
      key === CoreActionKey.Execute ? 1 : key === CoreActionKey.Custom ? 2 : 0

    return actions.sort((a, b) => {
      const aValue = keyToValue(a.key)
      const bValue = keyToValue(b.key)
      return aValue - bValue
    })
  }, [actions])

  const { refreshProposal, refreshProposalAndAll, refreshing } =
    useProposalRefreshers()

  const onVoteSuccess = useCallback(() => {
    refreshProposalAndAll()
    toast.success(t('success.voteCast'))
  }, [refreshProposalAndAll, t])

  const onExecuteSuccess = useCallback(async () => {
    refreshProposalAndAll()
    toast.loading(t('success.proposalExecuted'))

    // Manually revalidate DAO static props. Don't await this promise since we
    // just want to tell the server to do it, and we're about to reload anyway.
    fetch(`/api/revalidate?d=${daoInfo.coreAddress}&p=${proposalInfo.id}`)

    // Refresh entire app since any DAO config may have changed.
    window.location.reload()
  }, [daoInfo.coreAddress, proposalInfo.id, refreshProposalAndAll, t])

  const onCloseSuccess = useCallback(() => {
    refreshProposalAndAll()
    toast.success(t('success.proposalClosed'))
  }, [refreshProposalAndAll, t])

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

  // Refresh proposal every 30 seconds, while voting open. Refreshes status and
  // votes.
  useEffect(() => {
    if (!proposalInfo.votingOpen) {
      return
    }

    const interval = setInterval(refreshProposal, 30 * 1000)
    return () => clearInterval(interval)
  }, [refreshProposal, proposalInfo.votingOpen])

  const duplicateUrlPrefix = `/dao/${daoInfo.coreAddress}/proposals/create?prefill=`
  const [navigatingToHref, setNavigatingToHref] =
    useRecoilState(navigatingToHrefAtom)

  return (
    <Proposal
      ProposalStatusAndInfo={CachedProposalStatusAndInfo}
      actionDisplay={
        <ProposalActionDisplay
          availableActions={orderedActions}
          duplicateLoading={!!navigatingToHref?.startsWith(duplicateUrlPrefix)}
          onDuplicate={(data) => {
            const url =
              duplicateUrlPrefix + encodeURIComponent(JSON.stringify(data))
            router.push(url)
            // Show loading on duplicate button.
            setNavigatingToHref(url)
          }}
        />
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
      daoInfo={daoInfo}
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

const ProposalPage: NextPage<DaoProposalPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    {props.proposalInfo && props.serializedInfo ? (
      <ProposalModuleAdapterProvider
        initialOptions={{
          chainId: props.serializedInfo.chainId,
          coreAddress: props.serializedInfo.coreAddress,
        }}
        proposalId={props.proposalInfo.id}
        proposalModules={props.serializedInfo.proposalModules}
      >
        <InnerProposal proposalInfo={props.proposalInfo} />
      </ProposalModuleAdapterProvider>
    ) : (
      <ProposalNotFound
        Trans={Trans}
        homeHref={
          props.serializedInfo
            ? `/dao/${props.serializedInfo.coreAddress}`
            : '/home'
        }
      />
    )}
  </DaoPageWrapper>
)

export default ProposalPage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDaoProposalStaticProps({
  getProposalUrlPrefix: ({ address }) =>
    `${SITE_URL}/dao/${address}/proposals/`,
})
