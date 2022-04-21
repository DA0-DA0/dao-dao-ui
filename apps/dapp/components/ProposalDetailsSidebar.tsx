import { useRecoilValue, useRecoilValueLoadable } from 'recoil'

import {
  ProposalDetailsVoteStatus as StatelessProposalDetailsVoteStatus,
  ProposalDetailsCard as StatelessProposalDetailsCard,
  WalletVote as StatelessWalletVote,
} from '@dao-dao/ui'

import {
  proposalSelector,
  proposalTallySelector,
  proposalExecutionTXHashSelector,
  walletVoteSelector,
  proposalStartBlockSelector,
  votingPowerAtHeightSelector,
} from 'selectors/proposals'
import {
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'
import { useThresholdQuorum } from 'util/proposal'

interface ProposalDetailsProps {
  contractAddress: string
  multisig: boolean
  proposalId: number
}

export const ProposalDetailsCard = ({
  contractAddress,
  proposalId,
  multisig,
}: ProposalDetailsProps) => {
  const proposal = useRecoilValue(
    proposalSelector({ contractAddress, proposalId })
  )

  const walletVote = useRecoilValue(
    walletVoteSelector({ contractAddress, proposalId })
  )

  const height = useRecoilValue(
    proposalStartBlockSelector({ proposalId, contractAddress })
  )
  const votingPower = useRecoilValue(
    votingPowerAtHeightSelector({
      contractAddress,
      multisig,
      height,
    })
  )
  const memberWhenProposalCreated = votingPower > 0

  const { state: proposalExecutionTXHashState, contents: txHashContents } =
    useRecoilValueLoadable(
      proposalExecutionTXHashSelector({ contractAddress, proposalId })
    )
  const proposalExecutionTXHash: string | undefined =
    proposalExecutionTXHashState === 'hasValue' ? txHashContents : undefined

  if (!proposal) {
    return (
      <div className="prose dark:prose-invert">
        <p>Could not find proposal.</p>
      </div>
    )
  }

  return (
    <StatelessProposalDetailsCard
      memberWhenProposalCreated={memberWhenProposalCreated}
      proposal={proposal}
      proposalExecutionTXHash={proposalExecutionTXHash}
      walletVote={walletVote as StatelessWalletVote}
    />
  )
}

export const ProposalDetailsVoteStatus = ({
  contractAddress,
  proposalId,
  multisig,
}: ProposalDetailsProps) => {
  const proposal = useRecoilValue(
    proposalSelector({ contractAddress, proposalId })
  )
  const proposalTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )

  const config = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig })
  )

  const { threshold, quorum } = useThresholdQuorum(
    contractAddress,
    proposalId,
    multisig
  )

  const configWrapper = new ContractConfigWrapper(config)
  const tokenDecimals = configWrapper.gov_token_decimals

  const maxVotingSeconds =
    'time' in config.config.max_voting_period
      ? config.config.max_voting_period.time
      : undefined

  if (!proposal) {
    return null
  }

  return (
    <StatelessProposalDetailsVoteStatus
      maxVotingSeconds={maxVotingSeconds}
      proposal={proposal}
      quorum={quorum}
      tally={proposalTally}
      threshold={threshold}
      tokenDecimals={tokenDecimals}
    />
  )
}

export const ProposalDetailsSidebar = (props: ProposalDetailsProps) => (
  <div>
    <h2 className="mb-6 text-base font-medium">Details</h2>
    <ProposalDetailsCard {...props} />

    <h3 className="mt-8 mb-6 text-base font-medium">Referendum status</h3>
    <ProposalDetailsVoteStatus {...props} />
  </div>
)
