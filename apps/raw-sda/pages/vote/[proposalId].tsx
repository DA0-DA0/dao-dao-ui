import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { FormProposalData, useActions } from '@dao-dao/actions'
import {
  ConnectWalletButton,
  DaoProposalPageWrapperProps,
} from '@dao-dao/common'
import { makeGetDaoProposalStaticProps } from '@dao-dao/common/server'
import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
  useProposalModuleAdapterCommon,
} from '@dao-dao/proposal-module-adapter'
import { ErrorPage, LinkText, SuspenseLoader, Trans } from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { Loader, Logo, PageLoader, PageWrapper } from '@/components'
import { DAO_ADDRESS } from '@/util'

const InnerProposal: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
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

  const {
    hooks: { useGovernanceTokenInfo, useActions: useVotingModuleActions },
    components: { ProposalDetailsVotingPowerWidget },
  } = useVotingModuleAdapter()
  const voteConversionDecimals =
    useGovernanceTokenInfo?.().governanceTokenInfo?.decimals ?? 0

  const votingModuleActions = useVotingModuleActions()
  const proposalModuleActions = useProposalModuleActions()
  const actions = useActions(
    useMemo(
      () => [...votingModuleActions, ...proposalModuleActions],
      [proposalModuleActions, votingModuleActions]
    )
  )

  const { refreshProposalAndAll } = useProposalRefreshers()

  const onVoteSuccess = useCallback(async () => {
    refreshProposalAndAll()
    toast.success(t('success.voteCast'))
  }, [refreshProposalAndAll, t])

  const onExecuteSuccess = useCallback(async () => {
    refreshProposalAndAll()
    toast.success(t('success.proposalExecuted'))
  }, [refreshProposalAndAll, t])

  const onCloseSuccess = useCallback(async () => {
    refreshProposalAndAll()
    toast.success(t('success.proposalClosed'))
  }, [refreshProposalAndAll, t])

  const duplicate = (data: FormProposalData) =>
    router.push(`/propose?prefill=${encodeURIComponent(JSON.stringify(data))}`)

  return (
    <div className="grid grid-cols-2 gap-4 mx-auto max-w-screen-md lg:grid-cols-3 lg:max-w-page">
      <div className="col-span-2">
        <div className="mb-6 lg:hidden">
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

        <div className="pb-6 mt-6 lg:hidden">
          <h3 className="mb-6 text-base font-medium">
            {t('title.voteStatus')}
          </h3>

          <ProposalVoteDecisionStatus
            voteConversionDecimals={voteConversionDecimals}
          />
        </div>

        <ProposalVotes className="mt-8 max-w-3xl" />
      </div>

      <div className="hidden min-h-screen lg:block bg-base-200">
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

const ProposalNotFound = () => {
  const { t } = useTranslation()

  return (
    <ErrorPage title={t('error.proposalNotFound')}>
      <p>
        <Trans i18nKey="error.couldntFindProposal">
          We couldn&apos;t find a proposal with that ID. See all proposals on
          the{' '}
          <LinkText aProps={{ className: 'underline link-text' }} href="/vote">
            Vote page
          </LinkText>
          .
        </Trans>
      </p>
    </ErrorPage>
  )
}

const ProposalPage: NextPage<DaoProposalPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    <SuspenseLoader fallback={<PageLoader />}>
      {props.proposalId && props.info ? (
        <ProposalModuleAdapterProvider
          initialOptions={{
            coreAddress: DAO_ADDRESS,
            Logo,
            Loader,
          }}
          proposalId={props.proposalId}
          proposalModules={props.info.proposalModules}
        >
          <InnerProposal />
        </ProposalModuleAdapterProvider>
      ) : (
        <ProposalNotFound />
      )}
    </SuspenseLoader>
  </PageWrapper>
)

export default ProposalPage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDaoProposalStaticProps({
  coreAddress: DAO_ADDRESS,
  getProposalUrlPrefix: () => `${SITE_URL}/vote/`,
})
