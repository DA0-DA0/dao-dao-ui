import { gql, useQuery } from '@apollo/client'

const GET_OPEN_PROPOSALS_WITH_WALLET_VOTES = gql`
  query GetOpenProposalsWithWalletVotes(
    $proposalModuleAddresses: [String!]
    $walletAddress: String!
  ) {
    proposalModules(filter: { id: { in: $proposalModuleAddresses } }) {
      nodes {
        id
        proposals(filter: { open: { equalTo: true } }) {
          nodes {
            id
            num
            votes(filter: { walletId: { equalTo: $walletAddress } }) {
              nodes {
                id
              }
            }
          }
        }
      }
    }
  }
`

interface GetOpenProposalsWithWalletVotes {
  proposalModules: {
    id: string
    proposals: {
      id: string
      num: number
      votes: {
        wallet: {
          id: string
        }
      }[]
    }[]
  }[]
}

export const useOpenProposalsWithWalletVotesQuery = (
  proposalModuleAddresses: string[],
  walletAddress: string
) =>
  useQuery<GetOpenProposalsWithWalletVotes>(
    GET_OPEN_PROPOSALS_WITH_WALLET_VOTES,
    {
      variables: {
        proposalModuleAddresses,
        walletAddress,
      },
      // Refresh every 30 seconds.
      pollInterval: 30 * 1000,
    }
  )
