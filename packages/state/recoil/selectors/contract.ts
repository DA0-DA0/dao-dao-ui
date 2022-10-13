import { selectorFamily } from 'recoil'

import { ContractVersion } from '@dao-dao/tstypes'
import {
  CHAIN_BECH32_PREFIX,
  isValidContractAddress,
  parseContractVersion,
} from '@dao-dao/utils'

import {
  blockHeightTimestampSafeSelector,
  cosmWasmClientSelector,
} from './chain'
import { CwCoreV1Selectors } from './clients'
import { infoSelector } from './clients/CwdCore.v2'

export const contractInstantiateTimeSelector = selectorFamily<
  Date | undefined,
  string
>({
  key: 'contractInstantiateTime',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)

      const events = await client.searchTx({
        tags: [{ key: 'instantiate._contract_address', value: address }],
      })
      if (events.length === 0) return

      return get(blockHeightTimestampSafeSelector(events[0].height))
    },
})

export const contractAdminSelector = selectorFamily<string | undefined, string>(
  {
    key: 'contractAdmin',
    get:
      (address: string) =>
      async ({ get }) => {
        const client = get(cosmWasmClientSelector)

        try {
          const contract = await client.getContract(address)
          return contract.admin
        } catch (_) {
          return undefined
        }
      },
  }
)

export const contractVersionSelector = selectorFamily<ContractVersion, string>({
  key: 'contractVersion',
  get:
    (contractAddress) =>
    async ({ get }) => {
      const info = get(
        CwCoreV1Selectors.infoSelector({ contractAddress: contractAddress })
      ).info

      const version = parseContractVersion(info.version)
      if (!version) {
        throw new Error(
          `Failed parsing contract (${contractAddress}) version "${info.version}".`
        )
      }

      return version
    },
})

export const isContractSelector = selectorFamily<
  boolean,
  { contractAddress: string; name: string }
>({
  key: 'isContract',
  get:
    ({ contractAddress, name }) =>
    async ({ get }) => {
      if (!isValidContractAddress(contractAddress, CHAIN_BECH32_PREFIX)) {
        return false
      }

      try {
        // All InfoResponses are the same, so just use core's.
        const {
          info: { contract },
        } = get(infoSelector({ contractAddress, params: [] }))

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
