import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import {
  useWallet,
  useGovernanceTokenInfo,
  useProposalModule,
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
import {
  Breadcrumbs,
  StakingMode,
  V1ProposalDetails,
  V1ProposalInfoCard,
  V1ProposalInfoVoteStatus,
} from '@dao-dao/ui'
import { CHAIN_RPC_ENDPOINT, CI, cosmWasmClientRouter } from '@dao-dao/utils'

import ConnectWalletButton from '@/components/ConnectWalletButton'
import { PageLoader } from '@/components/Loader'
import { ProposalNotFound } from '@/components/org/NotFound'
import {
  makeGetOrgStaticProps,
  OrgPageWrapper,
  OrgPageWrapperProps,
  useOrgInfoContext,
} from '@/components/OrgPageWrapper'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { StakingModal } from '@/components/StakingModal'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import { TemplateRendererComponent } from '@/components/templates'
import { cleanChainError } from '@/util/cleanChainError'

// TODO: Add cw4-voting support.
const InnerProposal: FC = () => {
  const router = useRouter()
  const { coreAddress, name: orgName } = useOrgInfoContext()
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
    <div className="grid grid-cols-4 lg:grid-cols-6">
      <div className="col-span-4 w-full md:p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/org/${coreAddress}`, orgName],
            [router.asPath, `Proposal ${proposalId}`],
          ]}
        />

        <SmallScreenNav className="md:!px-0" />

        <div className="flex flex-col gap-6 p-6 md:p-0 md:mt-6">
          <div className="lg:hidden">
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
            connectWalletButton={<ConnectWalletButton />}
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

          <div className="lg:hidden">
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
      </div>
      <div className="hidden col-span-2 p-6 min-h-screen lg:block bg-base-200">
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

interface ProposalPageProps extends OrgPageWrapperProps {
  exists: boolean
}

const ProposalPage: NextPage<ProposalPageProps> = ({
  children: _,
  ...props
}) => (
  <OrgPageWrapper {...props}>
    <SuspenseLoader fallback={<PageLoader />}>
      {props.exists ? <InnerProposal /> : <ProposalNotFound />}
    </SuspenseLoader>
  </OrgPageWrapper>
)

export default ProposalPage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps<OrgPageWrapperProps> = async (
  ...props
) => {
  // Don't query chain if running in CI.
  if (CI) {
    return { notFound: true }
  }

  // If invalid address, fallback to default handler.
  const coreAddress = props[0].params?.address
  if (typeof coreAddress !== 'string' || !coreAddress) {
    return await makeGetOrgStaticProps()(...props)
  }

  const proposalIdQuery = props[0].params?.proposalId
  if (typeof proposalIdQuery !== 'string' || isNaN(Number(proposalIdQuery))) {
    return await makeGetOrgStaticProps({
      followingTitle: 'Proposal not found',
      getAdditionalProps: () => ({
        exists: false,
      }),
    })(...props)
  }

  const proposalId = Number(proposalIdQuery)

  try {
    // Verify proposal exists.
    const rpcClient = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
    // Get proposal module address.
    const coreClient = new CwCoreQueryClient(rpcClient, coreAddress)
    const proposalAddress = (await coreClient.proposalModules({}))[0]
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

    const staticProps = await makeGetOrgStaticProps({
      followingTitle: `Proposal ${exists ? '#' + proposalId : 'not found'}`,
    })(...props)

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
