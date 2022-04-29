import { selectorFamily } from 'recoil'

import { NATIVE_DECIMALS } from '@dao-dao/utils'

import { cosmWasmClientSelector } from './chain'

export const tokenUSDPriceSelector = selectorFamily<
  number | undefined,
  { tokenSwapAddress: string; tokenDecimals: number }
>({
  key: 'tokenUSDPriceSelector',
  get:
    ({ tokenSwapAddress, tokenDecimals }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) return 0

      // Likely means we're on the testnet. Just make up a number.
      if (!tokenSwapAddress.length) return undefined

      const junoUSD = (
        await client.queryContractSmart(
          // Juno UST pool on Junoswap.
          'juno1hue3dnrtgf9ly2frnnvf8z5u7e224ctc4hk7wks2xumeu3arj6rs9vgzec',
          { token1_for_token2_price: { token1_amount: '1000000' } }
        )
      ).token2_amount

      const junoToken = (
        await client.queryContractSmart(tokenSwapAddress, {
          token2_for_token1_price: { token2_amount: '1000000' },
        })
      ).token1_amount

      const price =
        Number(junoToken) *
        Number(junoUSD) *
        Math.pow(10, -(NATIVE_DECIMALS + tokenDecimals))
      return price
    },
})
