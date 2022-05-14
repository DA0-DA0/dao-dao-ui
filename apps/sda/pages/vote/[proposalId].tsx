import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import {
  useWallet,
  useProposalModule,
  useGovernanceTokenInfo,
  useProposalInfo,
} from '@dao-dao/state'
import { CwCoreQueryClient } from '@dao-dao/state/clients/cw-core'
import {
  CwProposalSingleQueryClient,
  Vote,
} from '@dao-dao/state/clients/cw-proposal-single'
import {
  useCastVote,
  useExecute,
} from '@dao-dao/state/hooks/cw-proposal-single'
import { StakingMode } from '@dao-dao/ui'
import {
  V1ProposalDetails,
  V1ProposalInfoCard,
  V1ProposalInfoVoteStatus,
} from '@dao-dao/ui/components/ProposalDetails'
import { cosmWasmClientRouter, CHAIN_RPC_ENDPOINT } from '@dao-dao/utils'

import {
  makeGetStaticProps,
  PageWrapper,
  PageWrapperProps,
  StakingModal,
  TemplateRendererComponent,
  WalletConnectButton,
} from '@/components'
import { CI, cleanChainError, DAO_ADDRESS, OLD_PROPOSALS_ADDRESS } from '@/util'

const InnerProposal = () => {
  const router = useRouter()

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

  const castVote = useCastVote({
    contractAddress: proposalModuleAddress ?? '',
    sender: walletAddress ?? '',
  })
  const executeProposal = useExecute({
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
        toast.error(cleanChainError(err.message))
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
      toast.error(cleanChainError(err.message))
    }

    setLoading(false)
  }, [
    executeProposal,
    connected,
    proposalId,
    setLoading,
    refreshProposalAndAll,
  ])

  if (!proposalResponse || !governanceTokenInfo || !proposalModuleConfig) {
    throw new Error('Failed to load page data.')
  }

  const memberWhenProposalCreated =
    !!votingPowerAtHeight && Number(votingPowerAtHeight.power) > 0

  return (
    <div className="grid grid-cols-2 gap-4 mx-auto max-w-screen-md lg:grid-cols-3 lg:max-w-page">
      <div className="col-span-2">
        <div className="mb-6 lg:hidden">
          <V1ProposalInfoCard
            connected={connected}
            memberWhenProposalCreated={memberWhenProposalCreated}
            proposalExecutionTXHash={txHash}
            proposalResponse={proposalResponse}
            walletVote={voteResponse?.vote?.vote ?? undefined}
          />
        </div>

        <V1ProposalDetails
          TemplateRendererComponent={TemplateRendererComponent}
          connectWalletButton={<WalletConnectButton />}
          connected={connected}
          loading={loading}
          onExecute={onExecute}
          onVote={onVote}
          proposal={proposalResponse.proposal}
          setShowStaking={setShowStaking}
          showStaking={showStaking}
          stakingModal={
            <StakingModal
              defaultMode={StakingMode.Stake}
              onClose={() => setShowStaking(false)}
            />
          }
          walletVote={voteResponse?.vote?.vote ?? undefined}
          walletWeightPercent={
            votingPowerAtHeight
              ? (Number(votingPowerAtHeight.power) /
                  Number(proposalResponse.proposal.total_power)) *
                100
              : 0
          }
        />

        <div className="pb-6 mt-6 lg:hidden">
          <h3 className="mb-6 text-base font-medium">Referendum status</h3>

          <V1ProposalInfoVoteStatus
            maxVotingSeconds={
              'time' in proposalModuleConfig.max_voting_period
                ? proposalModuleConfig.max_voting_period.time
                : undefined
            }
            proposal={proposalResponse.proposal}
            tokenDecimals={governanceTokenInfo.decimals}
          />
        </div>
      </div>

      <div className="hidden min-h-screen lg:block bg-base-200">
        <h2 className="mb-6 text-base font-medium">Details</h2>
        <V1ProposalInfoCard
          connected={connected}
          memberWhenProposalCreated={memberWhenProposalCreated}
          proposalExecutionTXHash={txHash}
          proposalResponse={proposalResponse}
          walletVote={voteResponse?.vote?.vote ?? undefined}
        />

        <h3 className="mt-8 mb-6 text-base font-medium">Referendum status</h3>
        <V1ProposalInfoVoteStatus
          maxVotingSeconds={
            'time' in proposalModuleConfig.max_voting_period
              ? proposalModuleConfig.max_voting_period.time
              : undefined
          }
          proposal={proposalResponse.proposal}
          tokenDecimals={governanceTokenInfo.decimals}
        />
      </div>
    </div>
  )
}

const ProposalNotFound = () => (
  <div className="mx-auto mt-4 max-w-prose text-center break-words">
    <h1 className="text-3xl font-bold">Proposal Not Found</h1>
    <p className="mt-3">
      We couldn{"'"}t find a proposal with that ID. See all proposals on the{' '}
      <Link href="/vote">
        <a className="underline link-text">Vote</a>
      </Link>{' '}
      page.
    </p>
  </div>
)

interface ProposalInnerProps {
  exists: boolean
}

type ProposalPageProps = PageWrapperProps & {
  innerProps: ProposalInnerProps
}

const ProposalPage: NextPage<ProposalPageProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    {/* Need optional chaining due to static path generation.
     *  Fallback page renders without any props on the server.
     */}
    {props?.innerProps?.exists ? <InnerProposal /> : <ProposalNotFound />}
  </PageWrapper>
)

export default ProposalPage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
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
    const staticProps = await makeGetStaticProps({
      followingTitle: 'Proposal not found',
    })(...props)

    return 'props' in staticProps
      ? {
          ...staticProps,
          props: {
            ...staticProps.props,
            innerProps: {
              exists: false,
            },
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

    const staticProps = await makeGetStaticProps({
      followingTitle: `Proposal ${exists ? '#' + proposalId : 'not found'}`,
    })(...props)

    return 'props' in staticProps
      ? {
          ...staticProps,
          props: {
            ...staticProps.props,
            innerProps: {
              exists,
            },
          },
        }
      : staticProps
  } catch (error) {
    console.error(error)
    // Throw error to trigger 500.
    throw new Error('An unexpected error occurred. Please try again later.')
  }
}
