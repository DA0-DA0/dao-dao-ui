// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useActions } from '@dao-dao/actions'
import {
  DaoPageWrapper,
  DaoProposalPageWrapperProps,
  Trans,
} from '@dao-dao/common'
import { makeGetDaoProposalStaticProps } from '@dao-dao/common/server'
import {
  CommonProposalInfo,
  ProposalModuleAdapterProvider,
  useProposalModuleAdapterContext,
} from '@dao-dao/proposal-module-adapter'
import { useProfile } from '@dao-dao/state'
import { ActionKey } from '@dao-dao/types'
import {
  Loader,
  Logo,
  ProfileDisconnectedCard,
  Proposal,
  ProposalNotFound,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { SITE_URL } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { ProfileProposalCard } from '@/components'

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
  const actions = useActions(
    useMemo(
      () => [...votingModuleActions, ...proposalModuleActions],
      [proposalModuleActions, votingModuleActions]
    )
  )

  const { profile: creatorProfile } = useProfile({
    walletAddress: proposalInfo.createdByAddress,
  })

  // Ensure the last two actions are execute smart contract followed by
  // custom, since a lot of actions are smart contract executions, and custom
  // is a catch-all that will display any message. Do this by assigning values
  // and sorting the actions in ascending order.
  const orderedActions = useMemo(() => {
    const keyToValue = (key: ActionKey) =>
      key === ActionKey.Execute ? 1 : key === ActionKey.Custom ? 2 : 0

    return actions.sort((a, b) => {
      const aValue = keyToValue(a.key)
      const bValue = keyToValue(b.key)
      return aValue - bValue
    })
  }, [actions])

  const { refreshProposalAndAll } = useProposalRefreshers()

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

  return (
    <Proposal
      ProposalStatusAndInfo={(props) => (
        <ProposalStatusAndInfo
          {...props}
          onCloseSuccess={onCloseSuccess}
          onExecuteSuccess={onExecuteSuccess}
        />
      )}
      actionDisplay={
        <ProposalActionDisplay
          availableActions={orderedActions}
          onDuplicate={(data) =>
            router.push(
              `/dao/${
                daoInfo.coreAddress
              }/proposals/create?prefill=${encodeURIComponent(
                JSON.stringify(data)
              )}`
            )
          }
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
      proposalInfo={proposalInfo}
      rightSidebarContent={
        connected ? (
          <ProfileProposalCard onVoteSuccess={onVoteSuccess} />
        ) : (
          <ProfileDisconnectedCard />
        )
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
          Logo,
          Loader,
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
