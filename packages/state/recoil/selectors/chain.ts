import { Coin } from '@cosmjs/stargate'
import { cosmos } from 'interchain-lcd'
import JSON5 from 'json5'
import { selector, selectorFamily } from 'recoil'

import { Delegation, UnbondingDelegation, Validator } from '@dao-dao/tstypes'
import {
  CHAIN_REST_ENDPOINT,
  CHAIN_RPC_ENDPOINT,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  cosmWasmClientRouter,
  getAllLcdResponse,
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

export const lcdClientSelector = selector({
  key: 'lcdClient',
  get: async () =>
    (
      await cosmos.ClientFactory.createLCDClient({
        restEndpoint: CHAIN_REST_ENDPOINT,
      })
    ).cosmos,
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
      const client = get(lcdClientSelector)

      return (
        await client.bank.v1beta1.supplyOf({
          denom,
        })
      ).amount.amount
    },
})

export const validatorSelector = selectorFamily<Validator, string>({
  key: 'validator',
  get:
    (validatorAddr: string) =>
    async ({ get }) => {
      const client = get(lcdClientSelector)
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
    const client = get(lcdClientSelector)
    const { params } = await client.staking.v1beta1.params()
    // Incorrectly typed.
    // `unbonding_time` is serialized with an `s` suffix indicating seconds.
    return parseInt(
      (params.unbonding_time as unknown as string).split('s')[0],
      10
    )
  },
})

export const nativeStakingInfoSelector = selectorFamily<
  {
    delegations: Delegation[]
    unbondingDelegations: UnbondingDelegation[]
  },
  string
>({
  key: 'nativeStakingInfo',
  get:
    (delegatorAddr: string) =>
    async ({ get }) => {
      const client = get(lcdClientSelector)

      const delegations = await getAllLcdResponse(
        client.staking.v1beta1.delegatorDelegations,
        {
          delegatorAddr,
        },
        'delegation_responses'
      )
      const validators = await getAllLcdResponse(
        client.staking.v1beta1.delegatorValidators,
        {
          delegatorAddr,
        },
        'validators'
      )
      const { rewards } =
        await client.distribution.v1beta1.delegationTotalRewards({
          delegatorAddress: delegatorAddr,
        })
      const unbondingDelegations = await getAllLcdResponse(
        client.staking.v1beta1.delegatorUnbondingDelegations,
        {
          delegatorAddr,
        },
        'unbonding_responses'
      )

      return {
        delegations: delegations
          .map(
            ({
              delegation: { validator_address: address },
              balance: delegationBalance,
            }): Delegation | undefined => {
              // Only allow NATIVE_DENOM.
              if (delegationBalance.denom !== NATIVE_DENOM) {
                return
              }

              const { description } =
                validators.find(
                  ({ operator_address }) => operator_address === address
                ) ?? {}
              const pendingReward = rewards
                .find(({ validator_address }) => validator_address === address)
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
          ({ validator_address, entries }) => {
            const validator = get(validatorSelector(validator_address))

            return entries.map(
              ({
                creation_height,
                completion_time,
                balance,
              }): UnbondingDelegation => ({
                validator,
                balance: {
                  amount: balance,
                  denom: NATIVE_DENOM,
                },
                startedAtHeight: creation_height.toNumber(),
                finishesAt: completion_time,
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
