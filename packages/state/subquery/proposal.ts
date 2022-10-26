import { gql, useQuery } from '@apollo/client'

// $id is {proposalModuleAddress}:{proposalNumber}
export const GET_PROPOSAL = gql`
  query GetProposal($id: String!) @api(name: proposals) {
    proposal(id: $id) {
      createdAt
      completedAt
      executedAt
      closedAt
      votes {
        nodes {
          votedAt
          walletId
        }
      }
    }
  }
`

export interface GetProposal {
  proposal: {
    createdAt: string // Serialized UTC Date
    completedAt: string | undefined // Serialized UTC Date
    executedAt: string | undefined // Serialized UTC Date
    closedAt: string | undefined // Serialized UTC Date
    votes: {
      nodes: {
        votedAt: string // Serialized UTC Date
        walletId: string
      }[]
    }
  } | null
}

export interface GetProposalOperationVariables {
  id: string
}

export const getGetProposalSubqueryId = (
  proposalModuleAddress: string,
  proposalNumber: number
) => `${proposalModuleAddress}:${proposalNumber}`

export const useGetProposalQuery = (
  ...args: Parameters<typeof getGetProposalSubqueryId>
) =>
  useQuery<GetProposal>(GET_PROPOSAL, {
    variables: {
      id: getGetProposalSubqueryId(...args),
    },
    // Refresh every 30 seconds.
    pollInterval: 30 * 1000,
  })
