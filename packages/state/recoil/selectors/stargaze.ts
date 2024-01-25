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
  key: 'stargazeWalletUsdValue',
  get:
    ({ chainId, address }) =>
    async () => {
      if (
        chainId !== ChainId.StargazeMainnet &&
        chainId !== ChainId.StargazeTestnet
      ) {
        throw new Error('Expected Stargaze chain')
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

      if (!data?.wallet?.stats?.totalValueUsd) {
        return 0
      }

      return data.wallet.stats.totalValueUsd
    },
})
