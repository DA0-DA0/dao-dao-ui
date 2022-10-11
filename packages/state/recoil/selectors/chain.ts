import { Coin } from '@cosmjs/stargate'
import { cosmos, juno } from 'interchain-rpc'
import { DelegationDelegatorReward } from 'interchain-rpc/types/codegen/cosmos/distribution/v1beta1/distribution'
import {
  DelegationResponse,
  UnbondingDelegation as RpcUnbondingDelegation,
  Validator as RpcValidator,
} from 'interchain-rpc/types/codegen/cosmos/staking/v1beta1/staking'
import JSON5 from 'json5'
import { selector, selectorFamily } from 'recoil'

import { Delegation, UnbondingDelegation, Validator } from '@dao-dao/tstypes'
import {
  CHAIN_BECH32_PREFIX,
  CHAIN_RPC_ENDPOINT,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  STARGAZE_RPC_ENDPOINT,
  cosmWasmClientRouter,
  getAllRpcResponse,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
  stargateClientRouter,
} from '@dao-dao/utils'

import {
  refreshBlockHeightAtom,
  refreshWalletBalancesIdAtom,
} from '../atoms/refresh'

export const stargateClientSelector = selector({
  key: 'stargateClient',
  get: () => stargateClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const cosmWasmClientSelector = selector({
  key: 'cosmWasmClient',
  get: () => cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT),
})

export const stargazeCosmWasmClientSelector = selector({
  key: 'stargazeCosmWasmClient',
  get: () => cosmWasmClientRouter.connect(STARGAZE_RPC_ENDPOINT),
})

export const cosmosRpcClientSelector = selector({
  key: 'cosmosRpcClient',
  get: async () =>
    (
      await cosmos.ClientFactory.createRPCQueryClient({
        rpcEndpoint: CHAIN_RPC_ENDPOINT,
      })
    ).cosmos,
})

export const junoRpcClientSelector = selector({
  key: 'junoRpcClient',
  get: async () =>
    (
      await juno.ClientFactory.createRPCQueryClient({
        rpcEndpoint: CHAIN_RPC_ENDPOINT,
      })
    ).juno,
})

export const blockHeightSelector = selector({
  key: 'blockHeight',
  get: async ({ get }) => {
    const client = get(cosmWasmClientSelector)
    get(refreshBlockHeightAtom)
    return await client.getHeight()
  },
})

export const blockHeightTimestampSelector = selectorFamily<Date, number>({
  key: 'blockHeightTimestamp',
  get:
    (blockHeight) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      const block = await client.getBlock(blockHeight)
      return new Date(Date.parse(block.header.time))
    },
})

export const blockHeightTimestampSafeSelector = selectorFamily<
  Date | undefined,
  number
>({
  key: 'blockHeightTimestamp',
  get:
    (blockHeight) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)
      try {
        const block = await client.getBlock(blockHeight)
        return new Date(Date.parse(block.header.time))
      } catch (error) {
        console.error(error)
      }
    },
})

export const nativeBalancesSelector = selectorFamily<
  {
    denom: string
    amount: string
    decimals: number
    label: string
    imageUrl: string | undefined
  }[],
  string
>({
  key: 'nativeBalances',
  get:
    (address) =>
    async ({ get }) => {
      const client = get(stargateClientSelector)

      get(refreshWalletBalancesIdAtom(address))

      const balances = [...(await client.getAllBalances(address))]
      // Add native denom if not present.
      if (!balances.some(({ denom }) => denom === NATIVE_DENOM)) {
        balances.push({
          amount: '0',
          denom: NATIVE_DENOM,
        })
      }

      return balances.map(({ amount, denom }) => ({
        amount,
        denom,
        decimals: nativeTokenDecimals(denom) || NATIVE_DECIMALS,
        label: nativeTokenLabel(denom),
        imageUrl: nativeTokenLogoURI(denom),
      }))
    },
})

export const nativeBalanceSelector = selectorFamily({
  key: 'nativeBalance',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(stargateClientSelector)

      get(refreshWalletBalancesIdAtom(address))

      return await client.getBalance(address, NATIVE_DENOM)
    },
})

export const nativeDenomBalanceSelector = selectorFamily<
  Coin | undefined,
  { walletAddress: string; denom: string }
>({
  key: 'nativeDenomBalance',
  get:
    ({ walletAddress, denom }) =>
    async ({ get }) => {
      const client = get(stargateClientSelector)
      if (!client) return

      get(refreshWalletBalancesIdAtom(walletAddress))

      return await client.getBalance(walletAddress, denom)
    },
})

// Get the SUM of native tokens delegated across all validators
export const nativeDelegatedBalanceSelector = selectorFamily({
  key: 'nativeDelegatedBalance',
  get:
    (address: string) =>
    async ({ get }) => {
      const client = get(stargateClientSelector)

      get(refreshWalletBalancesIdAtom(address))

      const balance = await client.getBalanceStaked(address)

      // Only allow native denom
      if (!balance || balance.denom !== NATIVE_DENOM) {
        return {
          amount: '0',
          denom: NATIVE_DENOM,
        }
      }

      return balance
    },
})

export const nativeSupplySelector = selectorFamily({
  key: 'nativeSupply',
  get:
    (denom: string) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientSelector)

      return (
        await client.bank.v1beta1.supplyOf({
          denom,
        })
      ).amount.amount
    },
})

export const blocksPerYearSelector = selector({
  key: 'blocksPerYear',
  get: async ({ get }) => {
    if (CHAIN_BECH32_PREFIX === 'juno') {
      const client = get(junoRpcClientSelector)
      return (await client.mint.params()).params.blocksPerYear.toNumber()
    }

    const client = get(cosmosRpcClientSelector)
    try {
      return (
        await client.mint.v1beta1.params()
      ).params.blocksPerYear.toNumber()
    } catch (err) {
      console.error(err)
      return 0
    }
  },
})

export const validatorSelector = selectorFamily<Validator, string>({
  key: 'validator',
  get:
    (validatorAddr: string) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientSelector)
      const {
        validator: {
          description: { moniker, website, details },
        },
      } = await client.staking.v1beta1.validator({
        validatorAddr,
      })

      return {
        address: validatorAddr,
        moniker,
        website,
        details,
      }
    },
})

export const nativeUnstakingDurationSecondsSelector = selector({
  key: 'nativeUnstakingDurationSeconds',
  get: async ({ get }) => {
    const client = get(cosmosRpcClientSelector)
    const { params } = await client.staking.v1beta1.params()
    return params.unbondingTime.seconds.toNumber()
  },
})

export const nativeStakingInfoSelector = selectorFamily<
  | {
      delegations: Delegation[]
      unbondingDelegations: UnbondingDelegation[]
    }
  | undefined,
  string
>({
  key: 'nativeStakingInfo',
  get:
    (delegatorAddr: string) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientSelector)

      let delegations: DelegationResponse[]
      let validators: RpcValidator[]
      let rewards: DelegationDelegatorReward[]
      let unbondingDelegations: RpcUnbondingDelegation[]
      try {
        delegations = await getAllRpcResponse(
          client.staking.v1beta1.delegatorDelegations,
          {
            delegatorAddr,
          },
          'delegationResponses'
        )
        validators = await getAllRpcResponse(
          client.staking.v1beta1.delegatorValidators,
          {
            delegatorAddr,
          },
          'validators'
        )
        rewards = (
          await client.distribution.v1beta1.delegationTotalRewards({
            delegatorAddress: delegatorAddr,
          })
        ).rewards
        unbondingDelegations = await getAllRpcResponse(
          client.staking.v1beta1.delegatorUnbondingDelegations,
          {
            delegatorAddr,
          },
          'unbondingResponses'
        )
      } catch (error) {
        console.error(error)
        return undefined
      }

      return {
        delegations: delegations
          .map(
            ({
              delegation: { validatorAddress: address },
              balance: delegationBalance,
            }): Delegation | undefined => {
              // Only allow NATIVE_DENOM.
              if (delegationBalance.denom !== NATIVE_DENOM) {
                return
              }

              const { description } =
                validators.find(
                  ({ operatorAddress }) => operatorAddress === address
                ) ?? {}
              const pendingReward = rewards
                .find(({ validatorAddress }) => validatorAddress === address)
                ?.reward.find(({ denom }) => denom === NATIVE_DENOM)

              if (!description || !pendingReward) {
                return
              }

              const { moniker, website, details } = description

              return {
                validator: {
                  address,
                  moniker,
                  website,
                  details,
                },
                delegated: delegationBalance,
                pendingReward,
              }
            }
          )
          .filter(Boolean) as Delegation[],

        // Only returns native token unbondings, no need to check.
        unbondingDelegations: unbondingDelegations.flatMap(
          ({ validatorAddress, entries }) => {
            const validator = get(validatorSelector(validatorAddress))

            return entries.map(
              ({
                creationHeight,
                completionTime,
                balance,
              }): UnbondingDelegation => ({
                validator,
                balance: {
                  amount: balance,
                  denom: NATIVE_DENOM,
                },
                startedAtHeight: creationHeight.toNumber(),
                finishesAt: completionTime,
              })
            )
          }
        ),
      }
    },
})

export const transactionEventsSelector = selectorFamily<
  Record<string, any>[],
  string
>({
  key: 'transactionEvents',
  get:
    (hash: string) =>
    async ({ get }) => {
      const client = get(cosmWasmClientSelector)

      const tx = await client.getTx(hash)
      return tx?.rawLog ? JSON5.parse(tx.rawLog)[0].events : undefined
    },
})
