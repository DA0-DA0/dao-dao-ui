import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Coin, StargateClient } from '@cosmjs/stargate'
import { ChainInfoID } from '@noahsaso/cosmodal'
import { cosmos, juno } from 'interchain-rpc'
import { DelegationDelegatorReward } from 'interchain-rpc/types/codegen/cosmos/distribution/v1beta1/distribution'
import {
  DelegationResponse,
  UnbondingDelegation as RpcUnbondingDelegation,
  Validator as RpcValidator,
} from 'interchain-rpc/types/codegen/cosmos/staking/v1beta1/staking'
import JSON5 from 'json5'
import { selector, selectorFamily } from 'recoil'

import {
  Delegation,
  UnbondingDelegation,
  Validator,
  WithChainId,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  CHAIN_ID,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  cosmWasmClientRouter,
  getAllRpcResponse,
  getRpcForChainId,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
  stargateClientRouter,
} from '@dao-dao/utils'

import {
  refreshBlockHeightAtom,
  refreshNativeTokenStakingInfoAtom,
  refreshWalletBalancesIdAtom,
} from '../atoms/refresh'

export const stargateClientForChainSelector = selectorFamily<
  StargateClient,
  string | undefined
>({
  key: 'stargateClientForChain',
  get: (chainId) => async () =>
    await stargateClientRouter.connect(
      chainId ? getRpcForChainId(chainId) : getRpcForChainId(CHAIN_ID)
    ),
})

export const cosmWasmClientForChainSelector = selectorFamily<
  CosmWasmClient,
  string | undefined
>({
  key: 'cosmWasmClientForChain',
  get: (chainId) => async () =>
    await cosmWasmClientRouter.connect(
      chainId ? getRpcForChainId(chainId) : getRpcForChainId(CHAIN_ID)
    ),
})

export const cosmosRpcClientForChainSelector = selectorFamily({
  key: 'cosmosRpcClientForChain',
  get: (chainId?: string) => async () =>
    (
      await cosmos.ClientFactory.createRPCQueryClient({
        rpcEndpoint: chainId
          ? getRpcForChainId(chainId)
          : getRpcForChainId(CHAIN_ID),
      })
    ).cosmos,
})

export const junoRpcClientSelector = selector({
  key: 'junoRpcClient',
  get: async () =>
    (
      await juno.ClientFactory.createRPCQueryClient({
        rpcEndpoint: getRpcForChainId(ChainInfoID.Juno1),
      })
    ).juno,
})

export const blockHeightSelector = selectorFamily<number, WithChainId<{}>>({
  key: 'blockHeight',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      get(refreshBlockHeightAtom)
      return await client.getHeight()
    },
})

export const blockHeightTimestampSelector = selectorFamily<
  Date,
  WithChainId<{ blockHeight: number }>
>({
  key: 'blockHeightTimestamp',
  get:
    ({ blockHeight, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
      const block = await client.getBlock(blockHeight)
      return new Date(Date.parse(block.header.time))
    },
})

export const blockHeightTimestampSafeSelector = selectorFamily<
  Date | undefined,
  WithChainId<{ blockHeight: number }>
>({
  key: 'blockHeightTimestamp',
  get:
    ({ blockHeight, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))
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
  WithChainId<{ address: string }>
>({
  key: 'nativeBalances',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const client = get(stargateClientForChainSelector(chainId))

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

export const nativeBalanceSelector = selectorFamily<
  Coin,
  WithChainId<{ address: string }>
>({
  key: 'nativeBalance',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const client = get(stargateClientForChainSelector(chainId))

      get(refreshWalletBalancesIdAtom(address))

      return await client.getBalance(address, NATIVE_DENOM)
    },
})

export const nativeDenomBalanceSelector = selectorFamily<
  Coin,
  WithChainId<{ walletAddress: string; denom: string }>
>({
  key: 'nativeDenomBalance',
  get:
    ({ walletAddress, denom, chainId }) =>
    async ({ get }) => {
      const client = get(stargateClientForChainSelector(chainId))

      get(refreshWalletBalancesIdAtom(walletAddress))

      return await client.getBalance(walletAddress, denom)
    },
})

// Get the SUM of native tokens delegated across all validators
export const nativeDelegatedBalanceSelector = selectorFamily<
  Coin,
  WithChainId<{ address: string }>
>({
  key: 'nativeDelegatedBalance',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const client = get(stargateClientForChainSelector(chainId))

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

export const nativeSupplySelector = selectorFamily<
  number,
  WithChainId<{ denom: string }>
>({
  key: 'nativeSupply',
  get:
    ({ denom, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      return Number(
        (
          await client.bank.v1beta1.supplyOf({
            denom,
          })
        ).amount.amount
      )
    },
})

export const blocksPerYearSelector = selectorFamily<number, WithChainId<{}>>({
  key: 'blocksPerYear',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      // If on juno mainnet or testnet, use juno RPC.
      if (CHAIN_BECH32_PREFIX === 'juno') {
        const client = get(junoRpcClientSelector)
        return (await client.mint.params()).params.blocksPerYear.toNumber()
      }

      const client = get(cosmosRpcClientForChainSelector(chainId))
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

export const validatorSelector = selectorFamily<
  Validator,
  WithChainId<{ address: string }>
>({
  key: 'validator',
  get:
    ({ address: validatorAddr, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

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

export const nativeUnstakingDurationSecondsSelector = selectorFamily<
  number,
  WithChainId<{}>
>({
  key: 'nativeUnstakingDurationSeconds',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))
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
  WithChainId<{ address: string }>
>({
  key: 'nativeStakingInfo',
  get:
    ({ address: delegatorAddr, chainId }) =>
    async ({ get }) => {
      const client = get(cosmosRpcClientForChainSelector(chainId))

      get(refreshNativeTokenStakingInfoAtom(delegatorAddr))

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
              let pendingReward = rewards
                .find(({ validatorAddress }) => validatorAddress === address)
                ?.reward.find(({ denom }) => denom === NATIVE_DENOM)

              if (!description || !pendingReward) {
                return
              }

              // All balances in the SDK are represented in the native denom
              // (for example, ujuno) through Coin types. For some reason, some
              // balances are considered shares instead, and shares are
              // represented as the native denom with 18 decimals. Additionally,
              // the string representations of those decimal values don't even
              // include decimal points. Knowing that they use 18 decimals, we
              // can just adjust that value here so that it is in terms of
              // native denom with no decimals, since they are supposed to be
              // integers.
              pendingReward.amount = Math.round(
                Number(pendingReward.amount) / Math.pow(10, 18)
              ).toString()

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
            const validator = get(
              validatorSelector({
                address: validatorAddress,
                chainId,
              })
            )

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
  WithChainId<{ txHash: string }>
>({
  key: 'transactionEvents',
  get:
    ({ txHash, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))

      const tx = await client.getTx(txHash)
      return tx?.rawLog ? JSON5.parse(tx.rawLog)[0].events : undefined
    },
})
