import { selectorFamily } from 'recoil'

import { cosmWasmClientSelector, walletAddressSelector } from '@dao-dao/state'
import { ConfigResponse } from '@dao-dao/types/contracts/cw3-multisig'
import { MULTISIG_CODE_ID } from '@dao-dao/utils'

import { contractsByCodeId } from 'selectors/contracts'
import { isMemberSelector } from 'selectors/cosm'

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
      const client = get(cosmWasmClientSelector)
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
      const client = get(cosmWasmClientSelector)
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
      const client = get(cosmWasmClientSelector)
      const memberAddress = get(walletAddressSelector)
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
      const client = get(cosmWasmClientSelector)

      const members: MultisigMemberInfo[] = []
      let more = true
      while (more) {
        const start_after =
          members.length > 0 ? members[members.length - 1] : undefined
        const newMembers = await client.queryContractSmart(
          sigInfo.group_address,
          {
            list_members: {
              limit: 30,
              ...(start_after && { start_after }),
            },
          }
        )
        members.push(...newMembers.members)
        if (newMembers.members.length < 30) {
          more = false
        }
      }
      return members
    },
})
