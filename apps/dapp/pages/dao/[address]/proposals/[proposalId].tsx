import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  FormProposalData,
  useActionsWithoutDisabledKeys,
} from '@dao-dao/actions'
import { ConnectWalletButton } from '@dao-dao/common'
import {
  CommonProposalInfo,
  ProposalModuleAdapterError,
  ProposalModuleAdapterProvider,
  matchAndLoadAdapter,
  useProposalModuleAdapter,
  useProposalModuleAdapterOptions,
} from '@dao-dao/proposal-module-adapter'
import {
  Breadcrumbs,
  Loader,
  Logo,
  PageLoader,
  SuspenseLoader,
} from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import {
  DAOPageWrapper,
  DAOPageWrapperProps,
  ProposalNotFound,
  SmallScreenNav,
  useDAOInfoContext,
} from '@/components'
import { makeGetDAOStaticProps } from '@/server/makeGetDAOStaticProps'

const InnerProposal = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, name } = useDAOInfoContext()
  const { address: walletAddress, connected } = useWallet()

  const {
    fields: { disabledActionKeys },
    hooks: { useVoteConversionDecimals },
    components: { ProposalDetailsVotingPowerWidget },
  } = useVotingModuleAdapter()
  const actions = useActionsWithoutDisabledKeys(disabledActionKeys)
  const voteConversionDecimals = useVoteConversionDecimals()

  const {
    components: {
      ProposalVotes,
      ProposalVoteDecisionStatus,
      ProposalInfoCard,
      ProposalDetails,
    },
    hooks: { useProposalRefreshers },
  } = useProposalModuleAdapter()
  const { proposalId } = useProposalModuleAdapterOptions()

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
    router.push(
      `/dao/${coreAddress}/proposals/create?prefill=${encodeURIComponent(
        JSON.stringify(data)
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

interface ProposalPageProps extends DAOPageWrapperProps {
  proposalId: string | undefined
}

const ProposalPage: NextPage<ProposalPageProps> = ({
  children: _,
  ...props
}) => (
  <DAOPageWrapper {...props}>
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
        <ProposalNotFound />
      )}
    </SuspenseLoader>
  </DAOPageWrapper>
)

export default ProposalPage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  // Need to block until i18n translations are ready, since i18n depends
  // on server side translations being loaded.
  fallback: true,
})

export const getStaticProps: GetStaticProps<DAOPageWrapperProps> =
  makeGetDAOStaticProps(
    async ({
      context: { params: { proposalId } = {} },
      t,
      cwClient,
      coreAddress,
      proposalModules,
    }) => {
      // If invalid proposal ID, not found.
      if (typeof proposalId !== 'string') {
        return {
          followingTitle: t('error.proposalNotFound'),
          additionalProps: {
            proposalId: undefined,
          },
        }
      }

      let proposalInfo: CommonProposalInfo | undefined
      try {
        const {
          adapter: {
            functions: { getProposalInfo },
          },
        } = await matchAndLoadAdapter(proposalModules, proposalId, {
          coreAddress,
          Logo,
          Loader,
        })

        // undefined if proposal does not exist.
        proposalInfo = await getProposalInfo(cwClient)
      } catch (error) {
        // If ProposalModuleAdapterError, treat as 404 below.
        // Otherwise display 500.
        if (!(error instanceof ProposalModuleAdapterError)) {
          console.error(error)
          // Throw error to trigger 500.
          throw new Error(
            'An unexpected error occurred. Please try again later.'
          )
        }
      }

      return {
        followingTitle: proposalInfo
          ? `${t('title.proposal')} ${proposalId}`
          : t('error.proposalNotFound'),
        overrideDescription: proposalInfo ? proposalInfo.title : undefined,
        additionalProps: {
          // If proposal does not exist, pass undefined to indicate 404.
          proposalId: proposalInfo ? proposalId : undefined,
        },
      }
    }
  )
