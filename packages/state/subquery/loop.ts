import { gql, useQuery } from '@apollo/client'

export const GET_LOOP_NFTS = gql`
  query GetLoopNfts($walletAddress: String!) @api(name: loop) {
    nfts(
      filter: { owner: { equalTo: $walletAddress }, image: { isNull: false } }
    ) {
      nodes {
        tokenID
        image
        name
        contract {
          id
          name
        }
      }
    }
  }
`

export interface GetLoopNfts {
  nfts: {
    nodes: {
      tokenID: string
      image: string
      name: string | null
      contract: {
        id: string
        name: string
      }
    }[]
  }
}

export interface GetLoopNftsOperationVariables {
  walletAddress: string
}

export const useGetLoopNftsQuery = (variables: GetLoopNftsOperationVariables) =>
  useQuery<GetLoopNfts, GetLoopNftsOperationVariables>(GET_LOOP_NFTS, {
    variables,
  })
