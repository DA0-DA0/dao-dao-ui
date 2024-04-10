import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import {
  Claim,
  ClaimsResponse,
  GetConfigResponse,
  GetHooksResponse,
  ListStakersResponse,
  StakedBalanceAtHeightResponse,
  StakedValueResponse,
  TotalStakedAtHeightResponse,
  TotalValueResponse,
} from '@dao-dao/types/contracts/Cw20Stake'
import { ConfigResponse as OraichainCw20StakingProxySnapshotConfigResponse } from '@dao-dao/types/contracts/OraichainCw20StakingProxySnapshot'
import { ContractName } from '@dao-dao/utils'

import {
  Cw20StakeClient,
  Cw20StakeQueryClient,
} from '../../../contracts/Cw20Stake'
import {
  refreshClaimsIdAtom,
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  signingCosmWasmClientAtom,
} from '../../atoms'
import { cosmWasmClientForChainSelector } from '../chain'
import { isContractSelector } from '../contract'
import { queryContractIndexerSelector } from '../indexer'
import { allLockInfosSelector } from './OraichainCw20Staking'

type QueryClientParams = WithChainId<{
  contractAddress: string
}>

const queryClient = selectorFamily<Cw20StakeQueryClient, QueryClientParams>({
  key: 'cw20StakeQueryClient',
  get:
    ({ contractAddress, chainId }) =>
    ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      return new Cw20StakeQueryClient(client, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  Cw20StakeClient | undefined,
  ExecuteClientParams
>({
  key: 'cw20StakeExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new Cw20StakeClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})

export const stakedBalanceAtHeightSelector = selectorFamily<
  StakedBalanceAtHeightResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['stakedBalanceAtHeight']>
  }
>({
  key: 'cw20StakeStakedBalanceAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      // If Oraichain proxy, get staking token and pass to indexer query.
      let oraichainStakingToken: string | undefined
      const isOraichainProxy = get(
        isOraichainProxySnapshotContractSelector(queryClientParams)
      )
      if (isOraichainProxy) {
        oraichainStakingToken = get(
          oraichainProxySnapshotConfigSelector(queryClientParams)
        ).asset_key
      }

      const balance = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'cw20Stake/stakedBalance',
          args: {
            address: params[0].address,
            oraichainStakingToken,
          },
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
        })
      )
      if (balance && !isNaN(balance)) {
        return {
          balance,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.stakedBalanceAtHeight(...params)
    },
})
export const totalStakedAtHeightSelector = selectorFamily<
  TotalStakedAtHeightResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['totalStakedAtHeight']>
  }
>({
  key: 'cw20StakeTotalStakedAtHeight',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(undefined))

      // If Oraichain proxy, get staking token and pass to indexer query.
      let oraichainStakingToken: string | undefined
      const isOraichainProxy = get(
        isOraichainProxySnapshotContractSelector(queryClientParams)
      )
      if (isOraichainProxy) {
        oraichainStakingToken = get(
          oraichainProxySnapshotConfigSelector(queryClientParams)
        ).asset_key
      }

      const total = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'cw20Stake/totalStaked',
          block: params[0].height ? { height: params[0].height } : undefined,
          id,
          args: {
            oraichainStakingToken,
          },
        })
      )
      if (total && !isNaN(total)) {
        return {
          total,
          height: params[0].height,
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalStakedAtHeight(...params)
    },
})
export const stakedValueSelector = selectorFamily<
  StakedValueResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['stakedValue']>
  }
>({
  key: 'cw20StakeStakedValue',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(params[0].address))

      // Oraichain proxy handles passing the query through.
      const isOraichainProxy = get(
        isOraichainProxySnapshotContractSelector(queryClientParams)
      )
      if (isOraichainProxy) {
        const { balance } = get(
          stakedBalanceAtHeightSelector({
            ...queryClientParams,
            params,
          })
        )
        return {
          value: balance,
        }
      }

      const value = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'cw20Stake/stakedValue',
          args: params[0],
          id,
        })
      )
      if (value && !isNaN(value)) {
        return { value }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.stakedValue(...params)
    },
})
export const totalValueSelector = selectorFamily<
  TotalValueResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['totalValue']>
  }
>({
  key: 'cw20StakeTotalValue',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshWalletBalancesIdAtom(undefined))

      // This query does not exist on Oraichain's proxy-snapshot.
      const isOraichainProxy = get(
        isOraichainProxySnapshotContractSelector(queryClientParams)
      )
      if (isOraichainProxy) {
        const { total } = get(
          totalStakedAtHeightSelector({
            ...queryClientParams,
            params: [{}],
          })
        )
        return {
          total,
        }
      }

      const total = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'cw20Stake/totalValue',
          id,
        })
      )
      if (total && !isNaN(total)) {
        return { total }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.totalValue(...params)
    },
})
export const getConfigSelector = selectorFamily<
  GetConfigResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['getConfig']>
  }
>({
  key: 'cw20StakeGetConfig',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const isOraichainProxy = get(
        isOraichainProxySnapshotContractSelector(queryClientParams)
      )

      // Oraichain proxy handles passing the query through.
      if (!isOraichainProxy) {
        const config = get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'cw20Stake/config',
          })
        )

        if (config) {
          return config
        }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.getConfig(...params)
    },
})
export const claimsSelector = selectorFamily<
  ClaimsResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['claims']>
  }
>({
  key: 'cw20StakeClaims',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const id = get(refreshClaimsIdAtom(params[0].address))

      // Convert Oraichain lock infos to claims.
      const isOraichainProxy = get(
        isOraichainProxySnapshotContractSelector(queryClientParams)
      )
      if (isOraichainProxy) {
        const { asset_key, staking_contract } = get(
          oraichainProxySnapshotConfigSelector(queryClientParams)
        )
        const { lock_infos } = get(
          allLockInfosSelector({
            chainId: queryClientParams.chainId,
            contractAddress: staking_contract,
            stakerAddr: params[0].address,
            stakingToken: asset_key,
          })
        )

        return {
          claims: lock_infos.map(
            ({ amount, unlock_time }): Claim => ({
              amount,
              release_at: {
                // Convert seconds to nanoseconds.
                at_time: (BigInt(unlock_time) * BigInt(1e9)).toString(),
              },
            })
          ),
        }
      }

      const claims = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'cw20Stake/claims',
          args: params[0],
          id,
        })
      )
      if (claims) {
        return { claims }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.claims(...params)
    },
})
export const getHooksSelector = selectorFamily<
  GetHooksResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['getHooks']>
  }
>({
  key: 'cw20StakeGetHooks',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      const client = get(queryClient(queryClientParams))
      return await client.getHooks(...params)
    },
})
export const listStakersSelector = selectorFamily<
  ListStakersResponse,
  QueryClientParams & {
    params: Parameters<Cw20StakeQueryClient['listStakers']>
  }
>({
  key: 'cw20StakeListStakers',
  get:
    ({ params, ...queryClientParams }) =>
    async ({ get }) => {
      // Oraichain has their own interface.
      const isOraichainProxy = get(
        isOraichainProxySnapshotContractSelector(queryClientParams)
      )
      if (isOraichainProxy) {
        return { stakers: [] }
      }

      const list = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'cw20Stake/listStakers',
          args: params[0],
        })
      )
      if (list) {
        return { stakers: list }
      }

      // If indexer query fails, fallback to contract query.
      const client = get(queryClient(queryClientParams))
      return await client.listStakers(...params)
    },
})

///! Custom selectors

export const topStakersSelector = selectorFamily<
  | {
      address: string
      balance: string
    }[]
  | undefined,
  QueryClientParams & { limit?: number }
>({
  key: 'cw20StakeTopStakers',
  get:
    ({ limit, ...queryClientParams }) =>
    ({ get }) => {
      const id =
        get(refreshWalletBalancesIdAtom(undefined)) +
        get(refreshDaoVotingPowerAtom(queryClientParams.contractAddress))

      // If Oraichain proxy, get staking token and pass to indexer query.
      let oraichainStakingToken: string | undefined
      const isOraichainProxy = get(
        isOraichainProxySnapshotContractSelector(queryClientParams)
      )
      if (isOraichainProxy) {
        oraichainStakingToken = get(
          oraichainProxySnapshotConfigSelector(queryClientParams)
        ).asset_key
      }

      return (
        get(
          queryContractIndexerSelector({
            ...queryClientParams,
            formula: 'cw20Stake/topStakers',
            args: {
              limit,
              oraichainStakingToken,
            },
            id,
            noFallback: true,
          })
        ) ?? undefined
      )
    },
})

/**
 * The Oraichain cw20-staking-proxy-snapshot contract is used as the staking
 * contract for their custom staking solution. This selector returns whether or
 * not this is a cw20-staking-proxy-snapshot contract.
 */
export const isOraichainProxySnapshotContractSelector = selectorFamily<
  boolean,
  QueryClientParams
>({
  key: 'cw20StakeIsOraichainProxySnapshotContract',
  get:
    (queryClientParams) =>
    ({ get }) =>
      get(
        isContractSelector({
          ...queryClientParams,
          name: ContractName.OraichainCw20StakingProxySnapshot,
        })
      ),
})

/**
 * Get config for Oraichain's cw20-staking-proxy-snapshot contract.
 */
export const oraichainProxySnapshotConfigSelector = selectorFamily<
  OraichainCw20StakingProxySnapshotConfigResponse,
  QueryClientParams
>({
  key: 'cw20StakeOraichainProxySnapshotConfig',
  get:
    (queryClientParams) =>
    async ({ get }) => {
      if (!get(isOraichainProxySnapshotContractSelector(queryClientParams))) {
        throw new Error(
          'Contract is not an Oraichain cw20-staking proxy-snapshot contract'
        )
      }

      let config = get(
        queryContractIndexerSelector({
          ...queryClientParams,
          formula: 'item',
          args: {
            key: 'config',
          },
        })
      )
      if (config) {
        return config
      }

      // If indexer fails, fallback to querying chain.
      const client = get(
        cosmWasmClientForChainSelector(queryClientParams.chainId)
      )
      return await client.queryContractSmart(
        queryClientParams.contractAddress,
        { config: {} }
      )
    },
})
