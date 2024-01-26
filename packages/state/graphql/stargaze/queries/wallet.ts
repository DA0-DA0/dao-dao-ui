import { gql } from '@apollo/client'

export const stargazeWalletTotalValueUsdQuery = gql(`
  query walletStatsTotalValueUsdQuery($address: String!) {
    wallet(address: $address) {
      stats {
        totalValueUsd
      }
    }
  }
  `)
