import { coin } from '@cosmjs/stargate'
import { useCallback, useMemo } from 'react'

import {
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
} from '@dao-dao/state'
import {
  ActionCardLoader,
  Loader,
  StakeEmoji,
  useCachedLoadable,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_DENOM,
  StakeType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  loadableToLoadingData,
  makeDistributeMessage,
  makeStakingMessage,
  nativeTokenDecimals,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../components/SuspenseLoader'
import {
  StakeComponent as StatelessStakeComponent,
  stakeActions,
} from '../components/Stake'

interface StakeData {
  stakeType: StakeType
  validator: string
  fromValidator?: string
  amount: number
  denom: string
}

const useDefaults: UseDefaults<StakeData> = () => ({
  stakeType: stakeActions[0].type,
  validator: '',
  amount: 1,
  denom: NATIVE_DENOM,
})

const useTransformToCosmos: UseTransformToCosmos<StakeData> = () =>
  useCallback((data: StakeData) => {
    if (data.stakeType === StakeType.WithdrawDelegatorReward) {
      return makeDistributeMessage(data.validator)
    }

    // NOTE: Does not support TOKEN staking at this point, however it could be implemented here!
    const decimals = nativeTokenDecimals(data.denom)!
    const amount = convertDenomToMicroDenomWithDecimals(data.amount, decimals)
    return makeStakingMessage(
      data.stakeType,
      amount.toString(),
      data.denom,
      data.validator,
      data.fromValidator
    )
  }, [])

const useDecodedCosmosMsg: UseDecodedCosmosMsg<StakeData> = (
  msg: Record<string, any>
) =>
  useMemo(() => {
    if (
      'distribution' in msg &&
      StakeType.WithdrawDelegatorReward in msg.distribution &&
      'validator' in msg.distribution.withdraw_delegator_reward
    ) {
      return {
        match: true,
        data: {
          stakeType: StakeType.WithdrawDelegatorReward,
          validator: msg.distribution.withdraw_delegator_reward.validator,
          // Default values, not needed for displaying this type of message.
          amount: 1,
          denom: NATIVE_DENOM,
        },
      }
    } else if ('staking' in msg) {
      const stakeType = stakeActions
        .map(({ type }) => type)
        .find((type) => type in msg.staking)
      if (!stakeType) return { match: false }

      const data = msg.staking[stakeType]
      if (
        ((stakeType === StakeType.Redelegate &&
          'src_validator' in data &&
          'dst_validator' in data) ||
          (stakeType !== StakeType.Redelegate && 'validator' in data)) &&
        'amount' in data &&
        'amount' in data.amount &&
        'denom' in data.amount
      ) {
        const { amount, denom } = data.amount

        return {
          match: true,
          data: {
            stakeType,
            validator:
              stakeType === StakeType.Redelegate
                ? data.dst_validator
                : data.validator,
            fromValidator:
              stakeType === StakeType.Redelegate
                ? data.src_validator
                : undefined,
            amount: convertMicroDenomToDenomWithDecimals(
              amount,
              nativeTokenDecimals(denom)!
            ),
            denom,
          },
        }
      }
    }

    return { match: false }
  }, [msg])

export const makeStakeAction: ActionMaker<StakeData> = ({ t, address }) => {
  const Component: ActionComponent<undefined, StakeData> = (props) => {
    const nativeBalancesLoadable = loadableToLoadingData(
      useCachedLoadable(
        address ? nativeBalancesSelector({ address }) : undefined
      ),
      []
    )

    const nativeDelegatedBalanceLoadable = loadableToLoadingData(
      useCachedLoadable(
        address ? nativeDelegatedBalanceSelector({ address }) : undefined
      ),
      coin(0, '')
    )

    return (
      <SuspenseLoader
        fallback={<ActionCardLoader Loader={Loader} />}
        forceFallback={
          nativeBalancesLoadable.loading ||
          nativeDelegatedBalanceLoadable.loading
        }
      >
        <StatelessStakeComponent
          {...props}
          options={{
            nativeBalances: nativeBalancesLoadable.loading
              ? []
              : nativeBalancesLoadable.data,
            nativeDelegatedBalance: nativeDelegatedBalanceLoadable.loading
              ? coin(0, '')
              : nativeDelegatedBalanceLoadable.data,
          }}
        />
      </SuspenseLoader>
    )
  }

  return {
    key: ActionKey.Stake,
    Icon: StakeEmoji,
    label: t('title.stake'),
    description: t('info.stakeActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
