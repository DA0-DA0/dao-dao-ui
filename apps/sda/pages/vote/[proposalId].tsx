import { useWallet } from '@noahsaso/cosmodal'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { ConnectWalletButton, StakingModal } from '@dao-dao/common'
import { Trans, useTranslation } from '@dao-dao/i18n'
import {
  CwCoreQueryClient,
  CwProposalSingleHooks,
  CwProposalSingleQueryClient,
  useGovernanceTokenInfo,
  useProposalInfo,
  useProposalModule,
} from '@dao-dao/state'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
import {
  ErrorPage,
  LinkText,
  ProposalDetails,
  ProposalInfoCard,
  ProposalInfoVoteStatus,
  StakingMode,
} from '@dao-dao/ui'
import {
  CHAIN_RPC_ENDPOINT,
  CI,
  VotingModuleType,
  cleanChainError,
  cosmWasmClientRouter,
} from '@dao-dao/utils'

import {
  Loader,
  PageWrapper,
  PageWrapperProps,
  useDAOInfoContext,
} from '@/components'
import { makeGetStaticProps } from '@/server/makeGetStaticProps'
import { DAO_ADDRESS, OLD_PROPOSALS_ADDRESS } from '@/util'

const InnerProposal: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { votingModuleType } = useDAOInfoContext()
  const { address: walletAddress, connected } = useWallet()

  const [showStaking, setShowStaking] = useState(false)
  const [loading, setLoading] = useState(false)

  const oldQuery = router.query.old
  const proposalIdQuery = router.query.proposalId
  const proposalId =
    typeof proposalIdQuery === 'string' && !isNaN(Number(proposalIdQuery))
      ? Number(proposalIdQuery)
      : undefined

  const { governanceTokenInfo } = useGovernanceTokenInfo(DAO_ADDRESS)
  const { proposalModuleAddress, proposalModuleConfig } = useProposalModule(
    DAO_ADDRESS,
    {
      oldProposalsAddress: oldQuery ? OLD_PROPOSALS_ADDRESS : undefined,
    }
  )

  const {
    proposalResponse,
    voteResponse,
    votingPowerAtHeight,
    txHash,
    refreshProposalAndAll,
  } = useProposalInfo(DAO_ADDRESS, proposalId, {
    oldProposalsAddress: oldQuery ? OLD_PROPOSALS_ADDRESS : undefined,
  })

  const castVote = CwProposalSingleHooks.useCastVote({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })
  const executeProposal = CwProposalSingleHooks.useExecute({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })

  const onVote = useCallback(
    async (vote: Vote) => {
      if (!connected || proposalId === undefined) return

      setLoading(true)

      try {
        await castVote({
          proposalId,
          vote,
        })

        refreshProposalAndAll()
        toast.success('Vote successfully cast.')
      } catch (err) {
        console.error(err)
        toast.error(
          cleanChainError(err instanceof Error ? err.message : `${err}`)
        )
      }

      setLoading(false)
    },
    [castVote, connected, proposalId, setLoading, refreshProposalAndAll]
  )

  const onExecute = useCallback(async () => {
    if (!connected || proposalId === undefined) return

    setLoading(true)

    try {
      const response = await executeProposal({
        proposalId,
      })

      refreshProposalAndAll()
      toast.success(
        `Executed successfully. Transaction hash (${response.transactionHash}) can be found in the proposal details.`
      )
    } catch (err) {
      console.error(err)
      toast.error(
        cleanChainError(err instanceof Error ? err.message : `${err}`)
      )
    }

    setLoading(false)
  }, [
    executeProposal,
    connected,
    proposalId,
    setLoading,
    refreshProposalAndAll,
  ])

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
    throw new Error('Failed to load page data.')
  }

  const memberWhenProposalCreated =
    !!votingPowerAtHeight && Number(votingPowerAtHeight.power) > 0

  return (
    <div className="mx-auto grid max-w-screen-md grid-cols-2 gap-4 lg:max-w-page lg:grid-cols-3">
      <div className="col-span-2">
        <div className="mb-6 lg:hidden">
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
          connectWalletButton={<ConnectWalletButton className="!w-auto" />}
          connected={connected}
          coreAddress={DAO_ADDRESS}
          loading={loading}
          onExecute={onExecute}
          onVote={onVote}
          proposal={proposalResponse.proposal}
          proposalId={proposalId}
          setShowStaking={setShowStaking}
          showStaking={showStaking}
          stakingModal={
            <StakingModal
              connectWalletButton={<ConnectWalletButton className="!w-auto" />}
              coreAddress={DAO_ADDRESS}
              loader={Loader}
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

        <div className="mt-6 pb-6 lg:hidden">
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

      <div className="bg-base-200 hidden min-h-screen lg:block">
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

interface ProposalPageProps extends PageWrapperProps {
  exists: boolean
}

const ProposalPage: NextPage<ProposalPageProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    {/* Need optional chaining due to static path generation.
     *  Fallback page renders without any props on the server.
     */}
    {props?.exists ? <InnerProposal /> : <ProposalNotFound />}
  </PageWrapper>
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

export const getStaticProps: GetStaticProps<ProposalPageProps> = async (
  ...props
) => {
  // Don't query chain if running in CI.
  if (CI) {
    return { notFound: true }
  }

  const proposalIdQuery = props[0].params?.proposalId
  if (typeof proposalIdQuery !== 'string' || isNaN(Number(proposalIdQuery))) {
    const staticProps = await makeGetStaticProps((t) => ({
      followingTitle: t('error.proposalNotFound'),
    }))(...props)

    return 'props' in staticProps
      ? {
          ...staticProps,
          props: {
            ...staticProps.props,
            exists: false,
          },
        }
      : staticProps
  }

  const proposalId = Number(proposalIdQuery)

  try {
    // Verify proposal exists.
    const rpcClient = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
    // Get proposal module address.
    const daoClient = new CwCoreQueryClient(rpcClient, DAO_ADDRESS)
    const proposalAddress = (await daoClient.proposalModules({}))[0]
    // Get proposal.
    const proposalClient = new CwProposalSingleQueryClient(
      rpcClient,
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

    const staticProps = await makeGetStaticProps((t) => ({
      followingTitle: exists
        ? `${t('title.proposal')} #${proposalId}`
        : t('error.proposalNotFound'),
    }))(...props)

    return 'props' in staticProps
      ? {
          ...staticProps,
          props: {
            ...staticProps.props,
            exists,
          },
        }
      : staticProps
  } catch (error) {
    console.error(error)
    // Throw error to trigger 500.
    throw new Error('An unexpected error occurred. Please try again later.')
  }
}
