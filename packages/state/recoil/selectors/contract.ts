import { fromUtf8, toUtf8 } from '@cosmjs/encoding'
import { selectorFamily } from 'recoil'

import { InfoResponse, WithChainId } from '@dao-dao/types'
import {
  contractNameMatches,
  getChainForChainId,
  isInvalidContractError,
  isSecretNetwork,
  isValidBech32Address,
} from '@dao-dao/utils'

import { cosmWasmClientForChainSelector } from './chain'
import { queryContractIndexerSelector } from './indexer'

export const contractInfoSelector = selectorFamily<
  InfoResponse,
  WithChainId<{ contractAddress: string }>
>({
  key: 'contractInfo',
  get:
    ({ contractAddress, chainId }) =>
    async ({ get }) => {
      const info = get(
        queryContractIndexerSelector({
          contractAddress,
          chainId,
          formula: 'info',
        })
      )
      if (info) {
        return { info }
      }

      // If indexer fails, fallback to querying chain.
      const client = get(cosmWasmClientForChainSelector(chainId))

      if (isSecretNetwork(chainId)) {
        // Secret Network does not allow accessing raw state directly, so this
        // will only work if the contract has an `info` query, which all our DAO
        // contracts do, but not all DAO contracts do.
        return await client.queryContractSmart(contractAddress, {
          info: {},
        })
      } else {
        const { data: contractInfo } = await client[
          'forceGetQueryClient'
        ]().wasm.queryContractRaw(contractAddress, toUtf8('contract_info'))
        if (contractInfo) {
          const info: InfoResponse = {
            info: JSON.parse(fromUtf8(contractInfo)),
          }
          return info
        }
      }

      throw new Error(
        'Failed to query contract info for contract: ' + contractAddress
      )
    },
})

export const isContractSelector = selectorFamily<
  boolean,
  WithChainId<
    { contractAddress: string } & ({ name: string } | { names: string[] })
  >
>({
  key: 'isContract',
  get:
    ({ contractAddress, chainId, ...nameOrNames }) =>
    ({ get }) => {
      if (
        !isValidBech32Address(
          contractAddress,
          getChainForChainId(chainId).bech32Prefix
        )
      ) {
        return false
      }

      try {
        // All InfoResponses are the same, so just use core's.
        const {
          info: { contract },
        } = get(
          contractInfoSelector({
            contractAddress,
            chainId,
          })
        )

        return contractNameMatches(contract, nameOrNames)
      } catch (err) {
        if (isInvalidContractError(err)) {
          console.error(err)
          return false
        }

        // Rethrow other errors because it should not have failed.
        throw err
      }
    },
})
