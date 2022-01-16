import { cosmWasmClient } from 'selectors/cosm'
import { contractsByCodeId } from 'selectors/contracts'
import { selector, selectorFamily } from 'recoil'
import { MULTISIG_CODE_ID } from 'util/constants'
import { ConfigResponse } from '@dao-dao/types/contracts/cw3-flex-multisig'
import { isMemberSelector } from './daos'
import { walletAddress } from './treasury'

export interface MultisigListType {
  address: string
  name: string
  description: string
  member: boolean
  weight: number
}

export interface MultisigMemberInfo {
  addr: string
  weight: number
}

export const sigsSelector = selector<MultisigListType[]>({
  key: 'multisigs',
  get: async ({ get }) => {
    const addresses = get(contractsByCodeId(MULTISIG_CODE_ID))
    return addresses.map((address) => {
      const config = get(sigSelector(address))
      const { member, weight } = get(isMemberSelector(address))
      return {
        address,
        name: config.config.name,
        description: config.config.description,
        member,
        weight,
      }
    })
  },
})

export const sigSelector = selectorFamily<ConfigResponse, string>({
  key: 'multisig',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const config = await client.queryContractSmart(address, {
        get_config: {},
      })
      return config
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
      console.log(members)
      return members.members
    },
})
