import { selectorFamily } from 'recoil'

import { ChainId, WithChainId } from '@dao-dao/types'

import {
  stargazeIndexerClient,
  stargazeWalletTotalValueUsdQuery,
} from '../../graphql'

export const stargazeWalletUsdValueSelector = selectorFamily<
  number,
  WithChainId<{ address: string }>
>({
  key: 'commonNftStargazeWalletUsdValue',
  get:
    ({ chainId, address }) =>
    async () => {
      if (
        chainId !== ChainId.StargazeMainnet &&
        chainId !== ChainId.StargazeTestnet
      ) {
        throw new Error('Expected Stargaze mainnet chain')
      }

      const { error, data } = await stargazeIndexerClient.query({
        query: stargazeWalletTotalValueUsdQuery,
        variables: {
          address,
        },
      })

      if (error) {
        throw error
      }

      if (
        data.wallet?.stats?.totalValueUsd === null ||
        data.wallet?.stats?.totalValueUsd === undefined
      )
        throw new Error('Unexpected response from Stargaze indexer')

      return data.wallet.stats.totalValueUsd
    },
})
