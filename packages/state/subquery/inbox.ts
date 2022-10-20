import { gql, useQuery } from '@apollo/client'

// A proposal is open if all of the following cases are true:
//   - `open` is true
//   - `expiresAtDate` is empty OR after the current date
//   - `expiresAtHeight` is empty OR after the current height

// The `open` field gets updated upon proposal execution, close, or a deciding
// vote being cast. When no deciding vote is cast (i.e. revoting is allowed and
// the proposal waits to expire, or a proposal fails by expiring before it could
// pass), and the proposal is not executed or closed after voting ends, there is
// no event to trigger a state change, so the indexer does not know it has
// closed. Thus, a proposal may be open but still expired, so we have to check
// the expiration condition.
const GET_OPEN_PROPOSALS_WITH_WALLET_VOTES = gql`
  query GetOpenProposalsWithWalletVotes(
    $proposalModuleAddresses: [String!]
    $walletAddress: String = ""
    $currentDate: Datetime
    $currentHeight: Int!
  ) @api(name: proposals) {
    proposalModules(filter: { id: { in: $proposalModuleAddresses } }) {
      nodes {
        id
        proposals(
          filter: {
            and: [
              { open: { equalTo: true } }
              {
                or: [
                  { expiresAtDate: { isNull: true } }
                  { expiresAtDate: { greaterThan: $currentDate } }
                ]
              }
              {
                or: [
                  { expiresAtHeight: { isNull: true } }
                  { expiresAtHeight: { greaterThan: $currentHeight } }
                ]
              }
            ]
          }
        ) {
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

export interface GetOpenProposalsWithWalletVotes {
  proposalModules: {
    nodes: {
      id: string
      proposals: {
        nodes: {
          id: string
          num: number
          votes: {
            nodes: {
              id: string
            }[]
          }
        }[]
      }
    }[]
  }
}

export interface GetOpenProposalsWithWalletVotesVariables {
  proposalModuleAddresses: string[]
  walletAddress?: string
  currentDate: Date
  currentHeight: number
}

export const useGetOpenProposalsWithWalletVotesVariables = (
  variables: GetOpenProposalsWithWalletVotesVariables
) =>
  useQuery<
    GetOpenProposalsWithWalletVotes,
    GetOpenProposalsWithWalletVotesVariables
  >(GET_OPEN_PROPOSALS_WITH_WALLET_VOTES, {
    variables,
  })
