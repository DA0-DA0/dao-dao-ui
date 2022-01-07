import {
  cosmWasmClient,
  walletAddressSelector,
  voterInfoSelector,
} from 'selectors/cosm'
import { contractsByCodeId } from 'selectors/contracts'
import { selector, selectorFamily } from 'recoil'
import { DAO_CODE_ID } from 'util/constants'
import { ConfigResponse } from '@dao-dao/types/contracts/cw3-dao'

export interface MemberStatus {
  member: boolean
  weight: number
}

export interface DaoListType {
  address: string
  member: boolean
  dao: any
  weight: number
}

export const isMemberSelector = selectorFamily<MemberStatus, string>({
  key: 'isMember',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const walletAddress = get(walletAddressSelector)
      const voterInfo = get(
        voterInfoSelector({ contractAddress, walletAddress })
      )
      return {
        member: voterInfo.weight && voterInfo.weight !== '0',
        weight: voterInfo.weight,
      }
    },
})

export const daosSelector = selector<DaoListType[]>({
  key: 'daos',
  get: async ({ get }) => {
    const daoAddresses = get(contractsByCodeId(DAO_CODE_ID))
    return daoAddresses.map((contractAddress) => {
      const daoResponse = get(daoSelector(contractAddress))
      const { member, weight } = get(isMemberSelector(contractAddress))
      return {
        dao: daoResponse.config,
        address: contractAddress,
        member,
        weight,
      }
    })
  },
})

export const daoSelector = selectorFamily<ConfigResponse, string>({
  key: 'dao',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const response = await client.queryContractSmart(address, {
        get_config: {},
      })
      return response
    },
})
