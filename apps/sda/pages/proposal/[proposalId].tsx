import { useCallback, useState } from 'react'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useWallet } from '@dao-dao/state'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
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
import toast from 'react-hot-toast'

import {
  makeGetStaticProps,
  PageWrapper,
  PageWrapperProps,
  StakingModal,
  TemplateRendererComponent,
  WalletConnectButton,
} from '@/components'
import {
  useGovernanceModule,
  useGovernanceTokenInfo,
  useProposalInfo,
} from '@/hooks'
import { cleanChainError } from '@/util'

const InnerProposal = () => {
  const router = useRouter()
  const { address: walletAddress, connected } = useWallet()

  const [showStaking, setShowStaking] = useState(false)
  const [loading, setLoading] = useState(false)

  const proposalIdQuery = router.query.proposalId
  const proposalId =
    typeof proposalIdQuery === 'string' && !isNaN(Number(proposalIdQuery))
      ? Number(proposalIdQuery)
      : undefined

  const { governanceTokenInfo } = useGovernanceTokenInfo()
  const { governanceModuleAddress, governanceModuleConfig } =
    useGovernanceModule()

  const {
    proposalResponse,
    voteResponse,
    votingPowerAtHeight,
    txHash,
    refreshProposalAndAll,
  } = useProposalInfo(proposalId)

  const castVote = useCastVote({
    contractAddress: governanceModuleAddress ?? '',
    sender: walletAddress ?? '',
  })
  const executeProposal = useExecute({
    contractAddress: governanceModuleAddress ?? '',
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

  if (!proposalResponse || !governanceTokenInfo || !governanceModuleConfig) {
    throw new Error('Failed to load page data.')
  }

  const memberWhenProposalCreated =
    !!votingPowerAtHeight && Number(votingPowerAtHeight.power) > 0

  return (
    <div className="grid grid-cols-2 gap-4 p-4 mx-auto max-w-screen-md lg:grid-cols-3 lg:p-8 lg:max-w-page">
      <div className="col-span-2">
        <div className="px-6 lg:hidden">
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

        <div className="px-6 pb-6 mt-6 lg:hidden">
          <h3 className="mb-6 text-base font-medium">Referendum status</h3>

          <V1ProposalInfoVoteStatus
            maxVotingSeconds={
              'time' in governanceModuleConfig.max_voting_period
                ? governanceModuleConfig.max_voting_period.time
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
            'time' in governanceModuleConfig.max_voting_period
              ? governanceModuleConfig.max_voting_period.time
              : undefined
          }
          proposal={proposalResponse.proposal}
          tokenDecimals={governanceTokenInfo.decimals}
        />
      </div>
    </div>
  )
}

const ProposalPage: NextPage<PageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerProposal />
  </PageWrapper>
)

export default ProposalPage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps = async (...props) => {
  const proposalIdQuery = props[0].params?.proposalId
  if (typeof proposalIdQuery !== 'string' || isNaN(Number(proposalIdQuery))) {
    return { notFound: true }
  }

  const proposalId = Number(proposalIdQuery)
  return await makeGetStaticProps({
    followingTitle: `Proposal #${proposalId}`,
  })(...props)
}
