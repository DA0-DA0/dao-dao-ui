import { CodeDetails } from '@cosmjs/cosmwasm-stargate'
import { fromUtf8, toUtf8 } from '@cosmjs/encoding'
import { selectorFamily } from 'recoil'

import { ContractVersion, InfoResponse, WithChainId } from '@dao-dao/types'
import { parseContractVersion } from '@dao-dao/utils'

import {
  blockHeightTimestampSafeSelector,
  cosmWasmClientForChainSelector,
} from './chain'
import { queryContractIndexerSelector } from './indexer'

export const contractInstantiateTimeSelector = selectorFamily<
  Date | undefined,
  WithChainId<{ address: string }>
>({
  key: 'contractInstantiateTime',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const instantiatedAt = get(
        queryContractIndexerSelector({
          contractAddress: address,
          chainId,
          formula: 'instantiatedAt',
          required: true,
        })
      )
      // Null when indexer fails.
      if (instantiatedAt) {
        return new Date(instantiatedAt)
      }

      // If indexer fails, fallback to querying chain.

      const client = get(cosmWasmClientForChainSelector(chainId))
      const events = await client.searchTx([
        { key: 'instantiate._contract_address', value: address },
      ])

      if (events.length === 0) {
        return
      }

      return get(
        blockHeightTimestampSafeSelector({
          blockHeight: events[0].height,
          chainId,
        })
      )
    },
})

export const contractAdminSelector = selectorFamily<
  string | undefined,
  WithChainId<{ contractAddress: string }>
>({
  key: 'contractAdmin',
  get:
    ({ contractAddress, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))

      try {
        const contract = await client.getContract(contractAddress)
        return contract.admin
      } catch (_) {
        return undefined
      }
    },
})

export const codeDetailsSelector = selectorFamily<
  CodeDetails,
  WithChainId<{ codeId: number }>
>({
  key: 'contractAdmin',
  get:
    ({ codeId, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return await client.getCodeDetails(codeId)
    },
})

export const contractVersionSelector = selectorFamily<
  ContractVersion,
  WithChainId<{ contractAddress: string }>
>({
  key: 'contractVersion',
  get:
    ({ contractAddress, chainId }) =>
    async ({ get }) => {
      const { info } = get(
        contractInfoSelector({
          contractAddress,
          chainId,
        })
      )

      const version = parseContractVersion(info.version)
      if (!version) {
        throw new Error(
          `Failed parsing contract (${contractAddress}, chain: ${chainId}) version "${info.version}".`
        )
      }

      return version
    },
})

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
          required: true,
        })
      )
      if (info) {
        return { info }
      }

      // If indexer fails, fallback to querying chain.
      const client = get(cosmWasmClientForChainSelector(chainId))
      const contractInfo = await client.queryContractRaw(
        contractAddress,
        toUtf8('contract_info')
      )
      if (contractInfo) {
        const info: InfoResponse = {
          info: JSON.parse(fromUtf8(contractInfo)),
        }
        return info
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
    async ({ get }) => {
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

        return 'name' in nameOrNames
          ? contract.includes(nameOrNames.name)
          : nameOrNames.names.some((name) => contract.includes(name))
      } catch (err) {
        // Invalid query enum info variant, different contract.
        if (
          err instanceof Error &&
          err.message.includes('Error parsing into type')
        ) {
          return false
        }

        // If contract does not exist, not the desired contract.
        if (
          err instanceof Error &&
          err.message.includes('contract: not found: invalid request')
        ) {
          console.error(err)
          return false
        }

        // Rethrow other errors because it should not have failed.
        throw err
      }
    },
})
