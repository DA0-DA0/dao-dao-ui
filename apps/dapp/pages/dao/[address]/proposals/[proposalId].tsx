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
  ConnectWalletButton,
  DaoPageWrapper,
  DaoProposalPageWrapperProps,
  SuspenseLoader,
  useDaoInfoContext,
} from '@dao-dao/common'
import { makeGetDaoProposalStaticProps } from '@dao-dao/common/server'
import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
  useProposalModuleAdapterCommon,
  useProposalModuleAdapterOptions,
} from '@dao-dao/proposal-module-adapter'
import {
  Breadcrumbs,
  Loader,
  Logo,
  PageLoader,
  ProposalNotFound,
} from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { SmallScreenNav } from '@/components'

const InnerProposal = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, name } = useDaoInfoContext()
  const { address: walletAddress, connected } = useWallet()

  const {
    components: {
      ProposalVotes,
      ProposalVoteDecisionStatus,
      ProposalInfoCard,
      ProposalDetails,
    },
    hooks: { useProposalRefreshers },
  } = useProposalModuleAdapter()
  const {
    hooks: { useActions: useProposalModuleActions },
  } = useProposalModuleAdapterCommon()
  const { proposalId, proposalModule, proposalNumber } =
    useProposalModuleAdapterOptions()

  const {
    hooks: { useGovernanceTokenInfo, useActions: useVotingModuleActions },
    components: { ProposalDetailsVotingPowerWidget },
  } = useVotingModuleAdapter()
  const voteConversionDecimals =
    useGovernanceTokenInfo?.().governanceTokenInfo.decimals ?? 0

  const votingModuleActions = useVotingModuleActions()
  const proposalModuleActions = useProposalModuleActions()
  const actions = useActions(
    useMemo(
      () => [...votingModuleActions, ...proposalModuleActions],
      [proposalModuleActions, votingModuleActions]
    )
  )

  const { refreshProposalAndAll } = useProposalRefreshers()
  const { markPinnedProposalDone } = usePinnedDaos()

  const onVoteSuccess = useCallback(async () => {
    refreshProposalAndAll()
    toast.success(t('success.voteCast'))

    // Mark pinned proposal as done when voted on.
    markPinnedProposalDone(coreAddress, proposalModule.address, proposalNumber)
  }, [
    coreAddress,
    markPinnedProposalDone,
    proposalModule.address,
    proposalNumber,
    refreshProposalAndAll,
    t,
  ])

  const onExecuteSuccess = useCallback(async () => {
    refreshProposalAndAll()
    toast.success(t('success.proposalExecuted'))
    // Manually revalidate DAO static props.
    await fetch(`/api/revalidate?d=${coreAddress}&p=${proposalId}`)
  }, [coreAddress, proposalId, refreshProposalAndAll, t])

  const onCloseSuccess = useCallback(async () => {
    refreshProposalAndAll()
    toast.success(t('success.proposalClosed'))
  }, [refreshProposalAndAll, t])

  const duplicate = (data: any) =>
    router.push(
      `/dao/${coreAddress}/proposals/create?prefill=${encodeURIComponent(
        JSON.stringify({
          proposalModuleAddress: proposalModule.address,
          data,
        })
      )}`
    )

  return (
    <div className="grid grid-cols-4 lg:grid-cols-6">
      <div className="col-span-4 w-full lg:p-6">
        <Breadcrumbs
          crumbs={[
            ['/home', t('title.home')],
            [`/dao/${coreAddress}`, name],
            [router.asPath, `Proposal ${proposalId}`],
          ]}
        />

        <SmallScreenNav />

        <div className="flex flex-col gap-6 p-6 max-w-3xl lg:p-0 lg:mt-6">
          <div className="lg:hidden">
            <ProposalInfoCard
              connected={connected}
              walletAddress={walletAddress}
            />
          </div>

          <ProposalDetails
            ConnectWalletButton={ConnectWalletButton}
            VotingPowerWidget={ProposalDetailsVotingPowerWidget}
            actions={actions}
            connected={connected}
            duplicate={duplicate}
            onCloseSuccess={onCloseSuccess}
            onExecuteSuccess={onExecuteSuccess}
            onVoteSuccess={onVoteSuccess}
            walletAddress={walletAddress}
          />

          <div className="lg:hidden">
            <h3 className="mb-6 text-base font-medium">
              {t('title.voteStatus')}
            </h3>

            <ProposalVoteDecisionStatus
              voteConversionDecimals={voteConversionDecimals}
            />
          </div>
        </div>

        <ProposalVotes className="mx-6 mt-8 max-w-3xl lg:mx-0" />
      </div>
      <div className="hidden col-span-2 p-6 min-h-screen lg:block bg-base-200">
        <h2 className="mb-6 text-base font-medium">{t('title.details')}</h2>
        <ProposalInfoCard connected={connected} walletAddress={walletAddress} />

        <h3 className="mt-8 mb-6 text-base font-medium">
          {t('title.voteStatus')}
        </h3>
        <ProposalVoteDecisionStatus
          voteConversionDecimals={voteConversionDecimals}
        />
      </div>
    </div>
  )
}

const ProposalPage: NextPage<DaoProposalPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    <SuspenseLoader fallback={<PageLoader />}>
      {props.proposalId && props.info ? (
        <ProposalModuleAdapterProvider
          initialOptions={{
            coreAddress: props.info.coreAddress,
            Logo,
            Loader,
          }}
          proposalId={props.proposalId}
          proposalModules={props.info.proposalModules}
        >
          <InnerProposal />
        </ProposalModuleAdapterProvider>
      ) : (
        <ProposalNotFound
          homeHref={props.info ? `/dao/${props.info.coreAddress}` : '/home'}
        />
      )}
    </SuspenseLoader>
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
