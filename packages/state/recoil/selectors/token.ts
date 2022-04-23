import { selectorFamily } from 'recoil'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'

import { cosmWasmClientSelector } from './chain'

export const govTokenInfoSelector = selectorFamily<TokenInfoResponse, string>({
  key: 'govTokenInfo',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      if (!client) return

      return await client.queryContractSmart(contractAddress, {
        token_info: {},
      })
    },
})
