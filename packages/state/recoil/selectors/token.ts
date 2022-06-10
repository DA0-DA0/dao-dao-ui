import { selectorFamily } from 'recoil'

import { Cw20BalanceResponse } from '../../clients/cw-core'
import { cosmWasmClientSelector } from './chain'
import { walletAddressSelector } from './wallet'

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
