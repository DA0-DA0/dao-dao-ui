import { cosmWasmClient, voterInfoSelector } from 'selectors/cosm'
import { contractsByCodeId } from 'selectors/contracts'
import { selector, selectorFamily } from 'recoil'
import { DAO_CODE_ID } from 'util/constants'
import { ConfigResponse, Duration } from '@dao-dao/types/contracts/cw3-dao'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { walletAddress, walletTokenBalanceUpdateCountAtom } from './treasury'

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

export const tokenConfig = selectorFamily<TokenInfoResponse, string>({
  key: 'govTokenConfig',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const response = await client.queryContractSmart(contractAddress, {
        token_info: {},
      })
      return response
    },
})

export const totalStaked = selectorFamily<number, string>({
  key: 'totalStaked',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const wallet = get(walletAddress)
      const client = get(cosmWasmClient)

      // Refresh this value when the visitor stakes / unstakes tokens.
      get(walletTokenBalanceUpdateCountAtom(wallet))

      if (!client) {
        return 0
      }
      const response = await client.queryContractSmart(contractAddress, {
        total_staked_at_height: {},
      })
      return Number(response.total)
    },
})

export const proposalCount = selectorFamily<number, string>({
  key: 'daoProposalCount',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const response = await client.queryContractSmart(contractAddress, {
        proposal_count: {},
      })
      return response
    },
})

export const isMemberSelector = selectorFamily<MemberStatus, string>({
  key: 'isMember',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const wallet = get(walletAddress)
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

export const memberDaoSelector = selectorFamily<DaoListType, string>({
  key: 'memberDaosSelector',
  get:
    (contractAddress: string) =>
    async ({ get }) => {
      const daoResponse = get(daoSelector(contractAddress))
      const { member, weight } = get(isMemberSelector(contractAddress))
      return {
        dao: daoResponse.config,
        address: contractAddress,
        member,
        weight,
      }
    },
})

export const daoAddressesSelector = contractsByCodeId(DAO_CODE_ID)

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

export const unstakingDuration = selectorFamily<Duration, string>({
  key: 'govTokenUnstakingDuration',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClient)
      const response = await client.queryContractSmart(address, {
        unstaking_duration: {},
      })
      // Returns null of there is no unstaking duration.
      return response.duration || { time: 0 }
    },
})
