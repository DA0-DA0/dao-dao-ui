import { gql, useQuery } from '@apollo/client'

const GET_WALLET_PROPOSALS = gql`
  query GetWalletProposals($walletAddress: String!) @api(name: proposals) {
    proposalsCreated: proposals(
      filter: { proposerId: { equalTo: $walletAddress } }
    ) {
      totalCount
    }
    proposalVotes(filter: { walletId: { equalTo: $walletAddress } }) {
      totalCount
    }
  }
`

interface GetWalletProposals {
  proposalsCreated: {
    totalCount: number
  }
  proposalVotes: {
    totalCount: number
  }
}

export const useWalletProposalsQuery = (walletAddress: string) =>
  useQuery<GetWalletProposals>(GET_WALLET_PROPOSALS, {
    variables: {
      walletAddress,
    },
    // Refresh every 30 seconds.
    pollInterval: 30 * 1000,
  })
