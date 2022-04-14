import { selectorFamily } from 'recoil'

import { ConfigResponse } from '@dao-dao/types/contracts/cw3-multisig'

import { contractsByCodeId } from 'selectors/contracts'
import { cosmWasmClient, isMemberSelector } from 'selectors/cosm'
import { MULTISIG_CODE_ID } from 'util/constants'

import { walletAddress } from './treasury'

export interface MultisigListType {
  address: string
  name: string
  description: string
  member: boolean
  weight: number
  imgUrl?: string
}

export interface MultisigMemberInfo {
  addr: string
  weight: number
}

export const sigMemberSelector = selectorFamily<MultisigListType, string>({
  key: 'multisigWithMember',
  get:
    (address: string) =>
    async ({ get }) => {
      const config = get(sigSelector(address))
      const { member, weight } = get(isMemberSelector(address))
      return {
        address,
        name: config.config.name,
        description: config.config.description,
        member,
        weight,
        imgUrl: config.config.image_url!,
      }
    },
})

export const sigAddressesSelector = contractsByCodeId(MULTISIG_CODE_ID)

export const sigSelector = selectorFamily<ConfigResponse, string>({
  key: 'multisig',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      return await client?.queryContractSmart(address, {
        get_config: {},
      })
    },
})

export const totalWeight = selectorFamily<number, string>({
  key: 'multisigTotalWeight',
  get:
    (address: string) =>
    async ({ get }) => {
      const sigInfo = get(sigSelector(address))
      const client = get(cosmWasmClient)
      const total_votes = await client.queryContractSmart(
        sigInfo.group_address,
        { total_weight: {} }
      )
      return total_votes.weight
    },
})

export const memberWeight = selectorFamily<number, string>({
  key: 'multisigMemberWeight',
  get:
    (address: string) =>
    async ({ get }) => {
      const sigInfo = get(sigSelector(address))
      const client = get(cosmWasmClient)
      const memberAddress = get(walletAddress)
      if (!memberAddress) {
        return 0
      }
      const member = await client.queryContractSmart(sigInfo.group_address, {
        member: { addr: memberAddress },
      })
      return member.weight
    },
})

export const listMembers = selectorFamily<MultisigMemberInfo[], string>({
  key: 'multisigMemberList',
  get:
    (address: string) =>
    async ({ get }) => {
      const sigInfo = get(sigSelector(address))
      const client = get(cosmWasmClient)
      const members = await client.queryContractSmart(sigInfo.group_address, {
        list_members: {},
      })
      return members.members
    },
})
