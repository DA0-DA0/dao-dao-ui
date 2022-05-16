import { selectorFamily, atom } from 'recoil'

import { cosmWasmClientSelector, walletAddressSelector } from '@dao-dao/state'

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

export const isMemberSelector = selectorFamily<MemberStatus, string>({
  key: 'isMember',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const wallet = get(walletAddressSelector)
      if (!wallet) {
        return {
          member: false,
          weight: 0,
        }
      }
      const voterInfo = get(
        voterInfoSelector({ contractAddress, walletAddress: wallet })
      )
      return {
        member: voterInfo.weight !== 0,
        weight: voterInfo.weight,
      }
    },
})
