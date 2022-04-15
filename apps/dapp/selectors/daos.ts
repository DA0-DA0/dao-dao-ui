import { selectorFamily } from 'recoil'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import {
  Config,
  ConfigResponse,
  Duration,
} from '@dao-dao/types/contracts/cw3-dao'
import { DAO_CODE_ID, NATIVE_DENOM } from '@dao-dao/utils'

import { contractsByCodeId } from 'selectors/contracts'
import { cosmWasmClient, isMemberSelector } from 'selectors/cosm'

import {
  nativeBalance,
  walletAddress,
  walletTokenBalanceUpdateCountAtom,
} from './treasury'

export interface DaoListType {
  address: string
  member: boolean
  gov_token: string
  dao: Config
  weight: number
  proposals: number
  balance: string
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

export const memberDaoSelector = selectorFamily<DaoListType, string>({
  key: 'memberDaosSelector',
  get:
    (contractAddress: string) =>
    async ({ get }) => {
      const daoResponse = get(daoSelector(contractAddress))
      const { member, weight } = get(isMemberSelector(contractAddress))
      const proposals = get(proposalCount(contractAddress))
      const balance = get(nativeBalance(contractAddress))
      const chainBalance = balance.find((coin) => coin.denom == NATIVE_DENOM)
      const chainNativeBalance = chainBalance?.amount || '0'
      return {
        dao: daoResponse.config,
        gov_token: daoResponse.gov_token,
        address: contractAddress,
        member,
        weight,
        proposals,
        balance: chainNativeBalance,
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
        get_config: {},
      })
      // Returns null of there is no unstaking duration.
      return response.unstaking_duration || { time: 0 }
    },
})
