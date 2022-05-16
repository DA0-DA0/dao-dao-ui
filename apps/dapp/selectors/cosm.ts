import { selectorFamily, atom } from 'recoil'

import { cosmWasmClientSelector } from '@dao-dao/state'

import { walletTokenBalanceUpdateCountAtom } from './treasury'

export interface MemberStatus {
  member: boolean
  weight: number
}

export const installWarningVisibleAtom = atom<boolean>({
  key: 'installWarningVisible',
  default: false,
})

export const noKeplrAccountAtom = atom<boolean>({
  key: 'noKeplrAccountAtom',
  default: false,
})

export const voterInfoSelector = selectorFamily({
  key: 'voterInfo',
  get:
    ({
      contractAddress,
      walletAddress,
    }: {
      contractAddress: string
      walletAddress: string
    }) =>
    async ({ get }) => {
      if (!walletAddress) {
        return {
          weight: 0,
        }
      }

      get(walletTokenBalanceUpdateCountAtom(walletAddress))
      const client = get(cosmWasmClientSelector)
      const response = await client?.queryContractSmart(contractAddress, {
        voter: {
          address: walletAddress,
        },
      })

      return {
        weight: Number(response?.weight || 0),
      }
    },
})
