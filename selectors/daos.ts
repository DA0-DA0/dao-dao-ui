import {
  cosmWasmClient,
  walletAddressSelector,
  voterInfoSelector,
} from 'selectors/cosm'
import { contractsByCodeId } from 'selectors/contracts'
import { selector, selectorFamily } from 'recoil'
import { DAO_CODE_ID } from 'util/constants'
import { ConfigResponse } from '@dao-dao/types/contracts/cw3-dao'
import { DaoListType } from 'hooks/dao'

export const isMemberSelector = selectorFamily<
  boolean,
  string
>({
  key: 'isMember',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const walletAddress = get(walletAddressSelector)
      const voterInfo = get(
        voterInfoSelector({ contractAddress, walletAddress })
      )
      return voterInfo.weight !== '0'
    },
})

export const daosSelector = selector<DaoListType[]>({
  key: 'daos',
  get: async ({ get }) => {
    const daoAddresses = get(contractsByCodeId(DAO_CODE_ID))
    return daoAddresses.map((contractAddress) => {
      const daoResponse = get(daoSelector(contractAddress))
      const member = get(isMemberSelector(contractAddress))
      return {
        dao: daoResponse.config,
        address: contractAddress,
        member,
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
