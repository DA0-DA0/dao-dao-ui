import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { ConnectWalletButton, StakingModal } from '@dao-dao/common'
import { useTranslation } from '@dao-dao/i18n'
import {
  CwProposalSingleHooks,
  CwProposalSingleQueryClient,
  useGovernanceTokenInfo,
  useProposalInfo,
  useProposalModule,
  useWallet,
} from '@dao-dao/state'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
import {
  Breadcrumbs,
  ProposalDetails,
  ProposalInfoCard,
  ProposalInfoVoteStatus,
  StakingMode,
  SuspenseLoader,
} from '@dao-dao/ui'
import { VotingModuleType, cleanChainError } from '@dao-dao/utils'

import {
  DAOPageWrapper,
  DAOPageWrapperProps,
  Loader,
  PageLoader,
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
  const { coreAddress, votingModuleType, name } = useDAOInfoContext()
  const { address: walletAddress, connected } = useWallet()

  const [showStaking, setShowStaking] = useState(false)
  const [loading, setLoading] = useState(false)

  const proposalIdQuery = router.query.proposalId
  const proposalId =
    typeof proposalIdQuery === 'string' && !isNaN(Number(proposalIdQuery))
      ? Number(proposalIdQuery)
      : undefined

  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  const { proposalModuleAddress, proposalModuleConfig } =
    useProposalModule(coreAddress)

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

  const { markPinnedProposalIdDone } = usePinnedDAOs()
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

  const denomConversionDecimals = useMemo(
    () =>
      votingModuleType === VotingModuleType.Cw4Voting
        ? 0
        : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
          governanceTokenInfo
        ? governanceTokenInfo.decimals
        : undefined,
    [votingModuleType, governanceTokenInfo]
  )

  if (
    !proposalResponse ||
    !proposalModuleConfig ||
    denomConversionDecimals === undefined ||
    proposalId === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

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
            allowRevoting={proposalModuleConfig.allow_revoting}
            connectWalletButton={<ConnectWalletButton />}
            connected={connected}
            coreAddress={coreAddress}
            loading={loading}
            onExecute={onExecute}
            onVote={onVote}
            proposal={proposalResponse.proposal}
            proposalId={proposalId}
            setShowStaking={setShowStaking}
            showStaking={showStaking}
            stakingModal={
              <StakingModal
                connectWalletButton={<ConnectWalletButton />}
                coreAddress={coreAddress}
                loader={<Loader />}
                mode={StakingMode.Stake}
                onClose={() => setShowStaking(false)}
              />
            }
            votingModuleType={votingModuleType}
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
              denomConversionDecimals={denomConversionDecimals}
              maxVotingSeconds={
                'time' in proposalModuleConfig.max_voting_period
                  ? proposalModuleConfig.max_voting_period.time
                  : undefined
              }
              proposal={proposalResponse.proposal}
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
          denomConversionDecimals={denomConversionDecimals}
          maxVotingSeconds={
            'time' in proposalModuleConfig.max_voting_period
              ? proposalModuleConfig.max_voting_period.time
              : undefined
          }
          proposal={proposalResponse.proposal}
        />
      </div>
    </div>
  )
}

interface ProposalPageProps extends DAOPageWrapperProps {
  exists: boolean
}

const ProposalPage: NextPage<ProposalPageProps> = ({
  children: _,
  ...props
}) => (
  <DAOPageWrapper {...props}>
    <SuspenseLoader fallback={<PageLoader />}>
      {props.exists ? <InnerProposal /> : <ProposalNotFound />}
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
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps<DAOPageWrapperProps> =
  makeGetDAOStaticProps(
    async ({
      context: { params: { proposalId: proposalIdQuery } = {} },
      t,
      cwClient,
      coreClient,
    }) => {
      // If invalid proposal ID, not found.
      if (
        typeof proposalIdQuery !== 'string' ||
        isNaN(Number(proposalIdQuery))
      ) {
        return {
          followingTitle: t('error.proposalNotFound'),
          additionalProps: {
            exists: false,
          },
        }
      }

      const proposalId = Number(proposalIdQuery)

      try {
        // Get proposal module address.
        const proposalAddress = (await coreClient.proposalModules({}))[0]
        // Get proposal.
        const proposalClient = new CwProposalSingleQueryClient(
          cwClient,
          proposalAddress
        )

        let exists = false
        try {
          exists = !!(await proposalClient.proposal({ proposalId })).proposal
        } catch (err) {
          // If proposal doesn't exist, handle 404 manually on frontend.
          // Rethrow all other errors.
          if (
            !(err instanceof Error) ||
            !err.message.includes('Proposal not found')
          ) {
            throw err
          }

          console.error(err)
        }

        return {
          followingTitle: exists
            ? `${t('title.proposal')} #${proposalId}`
            : t('error.proposalNotFound'),
          additionalProps: {
            exists,
          },
        }
      } catch (error) {
        console.error(error)
        // Throw error to trigger 500.
        throw new Error('An unexpected error occurred. Please try again later.')
      }
    }
  )
