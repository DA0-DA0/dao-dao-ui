import { gql, useQuery } from '@apollo/client'

// $id is {proposalModuleAddress}:{proposalNumber}
const GET_PROPOSAL_VOTES = gql`
  query GetProposalVotes($id: String!) {
    proposal(id: $id) {
      votes {
        nodes {
          votedAt
          walletId
        }
      }
    }
  }
`

interface GetProposalVotes {
  proposal: {
    votes: {
      nodes: {
        votedAt: string
        walletId: string
      }[]
    }
  } | null
}

export const useProposalVotesQuery = (
  proposalModuleAddress: string,
  proposalNumber: number
) =>
  useQuery<GetProposalVotes>(GET_PROPOSAL_VOTES, {
    variables: {
      id: `${proposalModuleAddress}:${proposalNumber}`,
    },
    // Refresh every 30 seconds.
    pollInterval: 30 * 1000,
  })
