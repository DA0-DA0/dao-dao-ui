import { selectorFamily } from 'recoil'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'

import { Cw20BalanceResponse } from '../../clients/cw-core'
import { cosmWasmClientSelector } from './chain'
import { walletAddressSelector } from './wallet'

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

export const walletCw20BalanceSelector = selectorFamily<
  Cw20BalanceResponse,
  string
>({
  key: 'walletCw20BalanceSelector',
  get:
    (contractAddress: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      const wallet = get(walletAddressSelector)

      if (!client || !wallet) {
        return { addr: '', balance: '0' }
      }

      return await client.queryContractSmart(contractAddress, {
        balance: {
          address: wallet,
        },
      })
    },
})
