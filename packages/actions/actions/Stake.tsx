import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { SuspenseLoader } from '@dao-dao/common'
import {
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
} from '@dao-dao/state'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { ActionCardLoader, StakeEmoji } from '@dao-dao/ui'
import {
  NATIVE_DENOM,
  StakeType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeDistributeMessage,
  makeStakingMessage,
  nativeTokenDecimals,
} from '@dao-dao/utils'

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
    if (
      data.stakeType === StakeType.WithdrawDelegatorReward ||
      data.stakeType === StakeType.WithdrawValidatorCommission
    ) {
      return makeDistributeMessage(data.stakeType, data.validator)
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
    } else if ('stargate' in msg) {
      if (
        'stargate' in msg &&
        msg.stargate.type_url ===
          '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission'
      ) {
        return {
          match: true,
          data: {
            stakeType: StakeType.WithdrawValidatorCommission,
            validator: msg.stargate.value.validatorAddress,
            // Default values, not needed for displaying this type of message.
            amount: 1,
            denom: NATIVE_DENOM,
          },
        }
      }
    }

    return { match: false }
  }, [msg])

const InnerStakeComponent: ActionComponent = (props) => {
  const nativeBalances = useRecoilValue(
    nativeBalancesSelector(props.coreAddress)
  )
  const nativeDelegatedBalance = useRecoilValue(
    nativeDelegatedBalanceSelector(props.coreAddress)
  )

  return (
    <StatelessStakeComponent
      {...props}
      options={{
        nativeBalances,
        nativeDelegatedBalance,
      }}
    />
  )
}

const Component: ActionComponent = (props) => (
  <SuspenseLoader fallback={<ActionCardLoader Loader={props.Loader} />}>
    <InnerStakeComponent {...props} />
  </SuspenseLoader>
)

export const stakeAction: Action<StakeData> = {
  key: ActionKey.Stake,
  Icon: StakeEmoji,
  label: 'Stake',
  description: 'Manage native token staking.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
