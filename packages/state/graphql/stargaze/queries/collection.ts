import { gql } from '../../__generated__/gql'

export const stargazeCollectionTokensQuery = gql(`
  query collectionTokensQuery(
    $collectionAddr: String!
    $limit: Int
    $offset: Int
  ) {
    tokens(collectionAddr: $collectionAddr, limit: $limit, offset: $offset) {
      pageInfo {
        limit
        offset
        total
      }
      tokens {
        tokenId
      }
    }
  }
`)

export const stargazeCollectionTokensForOwnerQuery = gql(`
  query collectionTokensForOwnerQuery(
    $collectionAddr: String!
    $ownerAddrOrName: String!
    $limit: Int
    $offset: Int
  ) {
    tokens(
      collectionAddr: $collectionAddr,
      ownerAddrOrName: $ownerAddrOrName,
      limit: $limit,
      offset: $offset
    ) {
      pageInfo {
        limit
        offset
        total
      }
      tokens {
        tokenId
      }
    }
  }
`)
