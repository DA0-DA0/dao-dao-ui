import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
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
} from '@dao-dao/proposal-module-adapter'
import {
  CwProposalSingleHooks,
  useProposalInfo,
  useProposalModule,
} from '@dao-dao/state'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
import {
  Breadcrumbs,
  Loader,
  Logo,
  PageLoader,
  ProposalInfoCard,
  ProposalInfoVoteStatus,
  SuspenseLoader,
} from '@dao-dao/ui'
import { cleanChainError } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import {
  DAOPageWrapper,
  DAOPageWrapperProps,
  ProposalNotFound,
  ProposalVotes,
  SmallScreenNav,
  useDAOInfoContext,
} from '@/components'
import { usePinnedDAOs } from '@/hooks'
import { makeGetDAOStaticProps } from '@/server/makeGetDAOStaticProps'

const InnerProposal: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, name } = useDAOInfoContext()
  const { address: walletAddress, connected } = useWallet()

  const [showStaking, setShowStaking] = useState(false)
  const [loading, setLoading] = useState(false)

  const proposalIdQuery = router.query.proposalId
  const proposalId =
    typeof proposalIdQuery === 'string' && !isNaN(Number(proposalIdQuery))
      ? Number(proposalIdQuery)
      : undefined

  const { proposalModuleAddress, proposalModuleConfig } =
    useProposalModule(coreAddress)

  const {
    fields: { disabledActionKeys },
    hooks: { useVoteConversionDecimals },
    ui: { ProposalDetails },
  } = useVotingModuleAdapter()
  const actions = useActionsWithoutDisabledKeys(disabledActionKeys)
  const voteConversionDecimals = useVoteConversionDecimals()

  const {
    proposalResponse,
    voteResponse,
    votingPowerAtHeight,
    txHash,
    refreshProposalAndAll,
  } = useProposalInfo(coreAddress, proposalId)

  const castVote = CwProposalSingleHooks.useCastVote({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })
  const executeProposal = CwProposalSingleHooks.useExecute({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })
  const closeProposal = CwProposalSingleHooks.useClose({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })

  const { markPinnedProposalIdDone } = usePinnedDAOs()

  if (!proposalResponse || !proposalModuleConfig || proposalId === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const onVote = useCallback(
    async (vote: Vote) => {
      if (!connected || proposalId === undefined) return

      setLoading(true)

      try {
        await castVote({
          proposalId,
          vote,
        })

        // Mark this proposal done so it doesn't show on homepage.
        markPinnedProposalIdDone(coreAddress, proposalId)

        refreshProposalAndAll()
        toast.success(t('success.voteCast'))
      } catch (err) {
        console.error(err)
        toast.error(
          cleanChainError(err instanceof Error ? err.message : `${err}`)
        )
      }

      setLoading(false)
    },
    [
      connected,
      proposalId,
      castVote,
      markPinnedProposalIdDone,
      coreAddress,
      refreshProposalAndAll,
      t,
    ]
  )

  const onExecute = useCallback(async () => {
    if (!connected || proposalId === undefined) return

    setLoading(true)

    try {
      await executeProposal({
        proposalId,
      })

      refreshProposalAndAll()
      toast.success(t('success.proposalExecuted'))
    } catch (err) {
      console.error(err)
      toast.error(
        cleanChainError(err instanceof Error ? err.message : `${err}`)
      )
    }

    setLoading(false)
  }, [connected, proposalId, executeProposal, refreshProposalAndAll, t])

  const onClose = useCallback(async () => {
    if (!connected || proposalId === undefined) return

    setLoading(true)

    try {
      await closeProposal({
        proposalId,
      })

      refreshProposalAndAll()
      toast.success(t('success.proposalClosed'))
    } catch (err) {
      console.error(err)
      toast.error(
        cleanChainError(err instanceof Error ? err.message : `${err}`)
      )
    }

    setLoading(false)
  }, [connected, proposalId, closeProposal, refreshProposalAndAll, t])

  const onDuplicate = useCallback(
    (actionData) => {
      const duplicateFormData: FormProposalData = {
        title: proposalResponse.proposal.title,
        description: proposalResponse.proposal.description,
        actionData: actionData.map(({ action: { key }, data }) => ({
          key,
          data,
        })),
      }

      router.push(
        `/dao/${coreAddress}/proposals/create?prefill=${encodeURIComponent(
          JSON.stringify(duplicateFormData)
        )}`
      )
    },
    [
      coreAddress,
      proposalResponse.proposal.description,
      proposalResponse.proposal.title,
      router,
    ]
  )

  const memberWhenProposalCreated =
    !!votingPowerAtHeight && Number(votingPowerAtHeight.power) > 0

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
              memberWhenProposalCreated={memberWhenProposalCreated}
              proposalExecutionTXHash={txHash}
              proposalResponse={proposalResponse}
              walletVote={voteResponse?.vote?.vote ?? undefined}
            />
          </div>

          <ProposalDetails
            actions={actions}
            allowRevoting={proposalModuleConfig.allow_revoting}
            connectWalletButton={<ConnectWalletButton />}
            connected={connected}
            loading={loading}
            onClose={onClose}
            onDuplicate={onDuplicate}
            onExecute={onExecute}
            onVote={onVote}
            proposal={proposalResponse.proposal}
            proposalId={proposalId}
            setShowStaking={setShowStaking}
            showStaking={showStaking}
            walletVote={voteResponse?.vote?.vote ?? undefined}
            walletWeightPercent={
              votingPowerAtHeight
                ? (Number(votingPowerAtHeight.power) /
                    Number(proposalResponse.proposal.total_power)) *
                  100
                : 0
            }
          />

          <div className="lg:hidden">
            <h3 className="mb-6 text-base font-medium">
              {t('title.voteStatus')}
            </h3>

            <ProposalInfoVoteStatus
              maxVotingSeconds={
                'time' in proposalModuleConfig.max_voting_period
                  ? proposalModuleConfig.max_voting_period.time
                  : undefined
              }
              proposal={proposalResponse.proposal}
              voteConversionDecimals={voteConversionDecimals}
            />
          </div>
        </div>

        <div className="mx-6 mt-8 max-w-3xl lg:mx-0">
          <ProposalVotes coreAddress={coreAddress} proposalId={proposalId} />
        </div>
      </div>
      <div className="hidden col-span-2 p-6 min-h-screen lg:block bg-base-200">
        <h2 className="mb-6 text-base font-medium">{t('title.details')}</h2>
        <ProposalInfoCard
          connected={connected}
          memberWhenProposalCreated={memberWhenProposalCreated}
          proposalExecutionTXHash={txHash}
          proposalResponse={proposalResponse}
          walletVote={voteResponse?.vote?.vote ?? undefined}
        />

        <h3 className="mt-8 mb-6 text-base font-medium">
          {t('title.voteStatus')}
        </h3>
        <ProposalInfoVoteStatus
          maxVotingSeconds={
            'time' in proposalModuleConfig.max_voting_period
              ? proposalModuleConfig.max_voting_period.time
              : undefined
          }
          proposal={proposalResponse.proposal}
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
