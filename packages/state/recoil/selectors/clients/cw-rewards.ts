import { selectorFamily } from 'recoil'

import { cosmWasmClientSelector } from '../chain'

export const rewardsRateSelector = selectorFamily<string, string>({
  key: 'cwRewardsRewardsRate',
  get:
    (contractAddress: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)

      const result = await client.queryContractSmart(contractAddress, {
        info: {},
      })

      return result.config.reward_rate
    },
})
