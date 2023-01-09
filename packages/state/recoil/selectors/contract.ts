import { selectorFamily } from 'recoil'

import { ContractVersion, WithChainId } from '@dao-dao/types'
import { parseContractVersion } from '@dao-dao/utils'

import {
  blockHeightTimestampSafeSelector,
  cosmWasmClientForChainSelector,
} from './chain'
import { DaoCoreV2Selectors } from './contracts'
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
          formulaName: 'instantiatedAt',
        })
      )
      // Null when indexer fails.
      if (instantiatedAt) {
        return new Date(instantiatedAt)
      }

      // If indexer fails, fallback to querying chain.

      const client = get(cosmWasmClientForChainSelector(chainId))
      const events = await client.searchTx({
        tags: [{ key: 'instantiate._contract_address', value: address }],
      })

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

export const contractVersionSelector = selectorFamily<
  ContractVersion,
  WithChainId<{ contractAddress: string }>
>({
  key: 'contractVersion',
  get:
    ({ contractAddress, chainId }) =>
    async ({ get }) => {
      const info = get(
        DaoCoreV2Selectors.infoSelector({
          contractAddress,
          chainId,
          params: [],
        })
      ).info

      const version = parseContractVersion(info.version)
      if (!version) {
        throw new Error(
          `Failed parsing contract (${contractAddress}, chain: ${chainId}) version "${info.version}".`
        )
      }

      return version
    },
})

export const isContractSelector = selectorFamily<
  boolean,
  WithChainId<{ contractAddress: string; name: string }>
>({
  key: 'isContract',
  get:
    ({ contractAddress, name, chainId }) =>
    async ({ get }) => {
      try {
        // All InfoResponses are the same, so just use core's.
        const {
          info: { contract },
        } = get(
          DaoCoreV2Selectors.infoSelector({
            contractAddress,
            chainId,
            params: [],
          })
        )

        return contract.includes(name)
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
