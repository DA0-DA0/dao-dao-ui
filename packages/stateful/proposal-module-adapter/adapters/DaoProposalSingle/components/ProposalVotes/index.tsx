import { useProposalVotesQuery } from '@dao-dao/state'
import {
  ProposalVote,
  ProposalVotes as StatelessProposalVotes,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { ProfileDisplay } from '../../../../../components/ProfileDisplay'
import { useProposalModuleAdapterOptions } from '../../../../react/context'
import { listAllVotesSelector } from '../../contracts/DaoProposalSingle.common.recoil'
import { useLoadingProposal } from '../../hooks'
import { VoteDisplay } from './VoteDisplay'

export const ProposalVotes = () => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
    chainId,
  } = useProposalModuleAdapterOptions()

  const loadingProposal = useLoadingProposal()

  // Get proposal vote timestamps from subquery.
  const proposalVotesSubquery = useProposalVotesQuery(
    proposalModuleAddress,
    proposalNumber
  )

  const totalPower = loadingProposal.loading
    ? 0
    : Number(loadingProposal.data.total_power)
  const votesLoadable = useCachedLoadable(
    listAllVotesSelector({
      contractAddress: proposalModuleAddress,
      chainId,
      proposalId: proposalNumber,
    })
  )

  return (
    <StatelessProposalVotes
      ProfileDisplay={ProfileDisplay}
      VoteDisplay={VoteDisplay}
      getDateVoted={
        proposalVotesSubquery.loading || !proposalVotesSubquery.data?.proposal
          ? undefined
          : (voterAddress) => {
              const votedAt =
                proposalVotesSubquery.data?.proposal?.votes.nodes.find(
                  ({ walletId }) => walletId === voterAddress
                )?.votedAt
              return votedAt
                ? // Interpret as UTC.
                  new Date(votedAt + 'Z')
                : undefined
            }
      }
      votes={
        votesLoadable.state !== 'hasValue'
          ? { loading: true }
          : {
              loading: false,
              data: votesLoadable.contents.map(
                ({ vote, voter, power }): ProposalVote => ({
                  voterAddress: voter,
                  vote,
                  votingPowerPercent:
                    totalPower === 0 ? 0 : (Number(power) / totalPower) * 100,
                })
              ),
            }
      }
      votingOpen={
        !loadingProposal.loading && loadingProposal.data.status === Status.Open
      }
    />
  )
}
