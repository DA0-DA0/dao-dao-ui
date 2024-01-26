import { gql } from '../../__generated__/gql'

export const stargazeTokenQuery = gql(`
  query tokenQuery($collectionAddr: String!, $tokenId: String!) {
    token(collectionAddr: $collectionAddr, tokenId: $tokenId) {
      tokenId
      collection {
        contractAddress
        name
      }
      highestOffer {
        offerPrice {
          amount
          amountUsd
          denom
        }
      }
      media {
        url
        visualAssets {
          lg {
            url
          }
        }
      }
      name
      description
    }
  }
`)

export const stargazeTokensForOwnerQuery = gql(`
  query tokensForOwnerQuery(
    $ownerAddrOrName: String!
    $limit: Int
    $offset: Int
  ) {
    tokens(
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
        collection {
          contractAddress
          name
        }
        highestOffer {
          offerPrice {
            amount
            amountUsd
            denom
          }
        }
        media {
          url
          visualAssets {
            lg {
              url
            }
          }
        }
        name
        description
      }
    }
  }
`)
