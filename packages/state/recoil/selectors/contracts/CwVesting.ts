import { selectorFamily } from 'recoil'

import { Uint128, Uint64, WithChainId } from '@dao-dao/types'
import { OwnershipForAddr, Vest } from '@dao-dao/types/contracts/CwVesting'

import {
  CwVestingClient,
  CwVestingQueryClient,
} from '../../../contracts/CwVesting'
import { refreshVestingAtom, signingCosmWasmClientAtom } from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { QueryIndexerParams, queryContractIndexerSelector } from '../indexer'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<CwVestingQueryClient, QueryClientParams>({
  key: 'cwVestingQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new CwVestingQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  CwVestingClient | undefined,
  ExecuteClientParams
>({
  key: 'cwVestingExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return
      return new CwVestingClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const infoSelector = selectorFamily<
  Vest,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['info']>
  }
>({
  key: 'cwVestingInfo',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const anyId = get(refreshVestingAtom(''))
      const thisId = get(refreshVestingAtom(queryClientParams.contractAddress))

      const info = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'cwVesting/info',
          id: anyId + thisId,
        })
      )
      if (info) {
        return info
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.info(...params)
    },
})
export const ownershipSelector = selectorFamily<
  OwnershipForAddr,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['ownership']>
  }
>({
  key: 'cwVestingOwnership',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(queryClientParams.contractAddress))
      const client = get(queryClient(queryClientParams))
      return await client.ownership(...params)
    },
})
export const distributableSelector = selectorFamily<
  Uint128,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['distributable']>
  }
>({
  key: 'cwVestingDistributable',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(queryClientParams.contractAddress))
      const client = get(queryClient(queryClientParams))
      return await client.distributable(...params)
    },
})
export const vestedSelector = selectorFamily<
  Uint128,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['vested']>
  }
>({
  key: 'cwVestingVested',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(queryClientParams.contractAddress))
      const client = get(queryClient(queryClientParams))
      return await client.vested(...params)
    },
})
export const totalToVestSelector = selectorFamily<
  Uint128,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['totalToVest']>
  }
>({
  key: 'cwVestingTotalToVest',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.totalToVest(...params)
    },
})
export const vestDurationSelector = selectorFamily<
  Uint64,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['vestDuration']>
  }
>({
  key: 'cwVestingVestDuration',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.vestDuration(...params)
    },
})
export const stakeSelector = selectorFamily<
  Uint128,
  QueryClientParams & {
    params: Parameters<CwVestingQueryClient['stake']>
  }
>({
  key: 'cwVestingStake',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(queryClientParams.contractAddress))
      const client = get(queryClient(queryClientParams))
      return await client.stake(...params)
    },
})

//! Custom selectors

export type CwVestingStakeEvent = {
  blockHeight: string
  blockTimeUnixMs: string
} & (
  | {
      type: 'delegate'
      validator: string
      amount: string
    }
  | {
      type: 'undelegate'
      validator: string
      amount: string
    }
  | {
      type: 'redelegate'
      fromValidator: string
      toValidator: string
      amount: string
    }
)

export type CwVestingSlashRegistration = {
  validator: string
  time: string
  amount: string
  duringUnbonding: boolean
}

export const stakeHistorySelector = selectorFamily<
  {
    stakeEvents: CwVestingStakeEvent[]
    slashRegistrations: CwVestingSlashRegistration[]
  } | null,
  QueryClientParams & Pick<QueryIndexerParams, 'block'>
>({
  key: 'cwVestingValidatorStakeHistory',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const anyId = get(refreshVestingAtom(''))
      const thisId = get(refreshVestingAtom(contractAddress))

      return get(
        queryContractIndexerSelector({
          contractAddress,
          formula: 'cwVesting/stakeHistory',
          chainId,
          id: anyId + thisId,
        })
      )
    },
})

export const unbondingDurationSecondsSelector = selectorFamily<
  number | null,
  QueryClientParams
>({
  key: 'cwVestingValidatorUnbondingDurationSeconds',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) =>
      get(
        queryContractIndexerSelector({
          contractAddress,
          formula: 'cwVesting/unbondingDurationSeconds',
          chainId,
        })
      ),
})
