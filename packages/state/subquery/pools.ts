import { gql, useQuery } from '@apollo/client'

const GET_POOL_AND_SNAPSHOT_AT_BLOCK_HEIGHT = gql`
  query GetPoolAndSnapshotAtBlockHeight(
    $swapContractAddress: String!
    $blockHeight: BigFloat!
  ) @api(name: wasmswap) {
    current: pool(id: $swapContractAddress) {
      token1Amount
      token2Amount
    }
    snapshots(
      first: 1
      filter: {
        contract: { equalTo: $swapContractAddress }
        blockHeight: { lessThan: $blockHeight }
      }
    ) {
      nodes {
        token1Amount
        token2Amount
      }
    }
  }
`

interface GetPoolAndSnapshotAtBlockHeight {
  current: {
    token1Amount: string
    token2Amount: string
  }
  snapshots: {
    nodes: {
      token1Amount: string
      token2Amount: string
    }[]
  }
}

export interface GetPoolAndSnapshotAtBlockHeightOperationVariables {
  swapContractAddress: string
  blockHeight: number
}

export const usePoolAndSnapshotAtBlockHeight = (
  variables: GetPoolAndSnapshotAtBlockHeightOperationVariables
) =>
  useQuery<
    GetPoolAndSnapshotAtBlockHeight,
    GetPoolAndSnapshotAtBlockHeightOperationVariables
  >(GET_POOL_AND_SNAPSHOT_AT_BLOCK_HEIGHT, {
    variables,
  })
