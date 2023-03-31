import { parseCoins } from '@cosmjs/amino'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import {
  nativeBalanceSelector,
  nativeDelegationInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  validatorsSelector,
} from '@dao-dao/state'
import { DepositEmoji, Loader, useCachedLoading } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_TOKEN,
  StakeType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeDistributeMessage,
  makeStakingMessage,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../components/SuspenseLoader'
import { useExecutedProposalTxLoadable } from '../../../hooks'
import {
  StakeData,
  StakeComponent as StatelessStakeComponent,
  useStakeActions,
} from '../../components/StakingActions'
import { useActionOptions } from '../../react'

const useTransformToCosmos: UseTransformToCosmos<StakeData> = () =>
  useCallback(({ stakeType, amount, validator, toValidator }: StakeData) => {
    if (stakeType === StakeType.WithdrawDelegatorReward) {
      return makeDistributeMessage(validator)
    }

    const microAmount = convertDenomToMicroDenomWithDecimals(
      amount,
      NATIVE_TOKEN.decimals
    )
    return makeStakingMessage(
      stakeType,
      microAmount.toString(),
      NATIVE_TOKEN.denomOrAddress,
      validator,
      toValidator
    )
  }, [])

const useDecodedCosmosMsg: UseDecodedCosmosMsg<StakeData> = (
  msg: Record<string, any>
) => {
  const stakeActions = useStakeActions()

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
        toValidator: '',
        amount: 1,
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
      'denom' in data.amount &&
      data.amount.denom === NATIVE_TOKEN.denomOrAddress
    ) {
      const { amount } = data.amount

      return {
        match: true,
        data: {
          stakeType,
          validator:
            stakeType === StakeType.Redelegate
              ? data.src_validator
              : data.validator,
          toValidator:
            stakeType === StakeType.Redelegate ? data.dst_validator : '',
          amount: convertMicroDenomToDenomWithDecimals(
            amount,
            NATIVE_TOKEN.decimals
          ),
        },
      }
    }
  }

  return { match: false }
}

const Component: ActionComponent<undefined, StakeData> = (props) => {
  const { chainId, address } = useActionOptions()

  // These need to be loaded via cached loadables to avoid displaying a loader
  // when this data updates on a schedule. Manually trigger a suspense loader
  // the first time when the initial data is still loading.

  const loadingNativeBalance = useCachedLoading(
    address
      ? nativeBalanceSelector({
          chainId,
          address,
        })
      : undefined,
    undefined
  )

  const loadingNativeDelegationInfo = useCachedLoading(
    address
      ? nativeDelegationInfoSelector({
          chainId,
          address,
        })
      : undefined,
    {
      delegations: [],
      unbondingDelegations: [],
    }
  )

  const loadingValidators = useCachedLoading(
    validatorsSelector({
      chainId,
    }),
    []
  )

  const nativeUnstakingDurationSeconds = useRecoilValue(
    nativeUnstakingDurationSecondsSelector({
      chainId,
    })
  )

  // If in DAO context, use executed proposal TX events to find claimed
  // rewards. If in wallet context, will be undefined.
  const executedTxLoadable = useExecutedProposalTxLoadable()

  const { watch } = useFormContext()
  let claimedRewards: number | undefined
  if (
    executedTxLoadable.state === 'hasValue' &&
    executedTxLoadable.contents &&
    watch(props.fieldNamePrefix + 'stakeType') ===
      StakeType.WithdrawDelegatorReward
  ) {
    const validator = watch(props.fieldNamePrefix + 'validator')

    const claimValidatorRewardsEvents =
      executedTxLoadable.contents.events.filter(
        ({ type, attributes }) =>
          type === 'withdraw_rewards' &&
          attributes.some(
            ({ key, value }) => key === 'validator' && value === validator
          )
      )

    // All action data that claims rewards from the same validator.
    const claimValidatorRewardsActionData = props.allActionsWithData
      .filter(
        ({ actionKey, data }) =>
          actionKey === CoreActionKey.StakingActions &&
          'stakeType' in data &&
          data.stakeType === StakeType.WithdrawDelegatorReward &&
          'validator' in data &&
          data.validator === validator
      )
      .map(({ data }) => data)
    // Index of this action in the list of all claim rewards actions.
    const innerIndex = claimValidatorRewardsActionData.indexOf(
      props.allActionsWithData[props.index].data
    )
    // Should never happen since this action is part of all actions.
    if (innerIndex === -1) {
      throw new Error(
        'internal error: could not find inner claim rewards action index'
      )
    }

    // If the claim rewards action length does not match the actual claim
    // rewards events from the chain, then another message must've claimed
    // some rewards, so we cannot definitively locate the claimed rewards from
    // this action.
    if (
      claimValidatorRewardsActionData.length ===
      claimValidatorRewardsEvents.length
    ) {
      const coin = parseCoins(
        claimValidatorRewardsEvents[innerIndex].attributes.find(
          ({ key }) => key === 'amount'
        )?.value ?? '0' + NATIVE_TOKEN.denomOrAddress
      )[0]

      if (coin) {
        claimedRewards = convertMicroDenomToDenomWithDecimals(
          coin.amount ?? 0,
          NATIVE_TOKEN.decimals
        )
      }
    }
  }

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        // Manually trigger loader.
        loadingNativeBalance.loading ||
        !loadingNativeBalance.data ||
        loadingNativeDelegationInfo.loading ||
        !loadingNativeDelegationInfo.data ||
        loadingValidators.loading
      }
    >
      <StatelessStakeComponent
        {...props}
        options={{
          nativeBalance:
            loadingNativeBalance.loading || !loadingNativeBalance.data
              ? '0'
              : loadingNativeBalance.data.amount,
          stakes:
            loadingNativeDelegationInfo.loading ||
            !loadingNativeDelegationInfo.data
              ? []
              : loadingNativeDelegationInfo.data.delegations.map(
                  ({ validator, delegated, pendingReward }) => ({
                    token: NATIVE_TOKEN,
                    validator,
                    amount: convertMicroDenomToDenomWithDecimals(
                      delegated.amount,
                      NATIVE_TOKEN.decimals
                    ),
                    rewards: convertMicroDenomToDenomWithDecimals(
                      pendingReward.amount,
                      NATIVE_TOKEN.decimals
                    ),
                  })
                ),
          validators: loadingValidators.loading ? [] : loadingValidators.data,
          executed:
            executedTxLoadable.state === 'hasValue' &&
            !!executedTxLoadable.contents,
          claimedRewards,
          nativeUnstakingDurationSeconds,
        }}
      />
    </SuspenseLoader>
  )
}

export const makeStakingActionsAction: ActionMaker<StakeData> = ({
  t,
  chainId,
  address,
}) => {
  const useDefaults: UseDefaults<StakeData> = () => {
    const stakeActions = useStakeActions()

    const loadingNativeDelegationInfo = useCachedLoading(
      address
        ? nativeDelegationInfoSelector({
            chainId,
            address,
          })
        : undefined,
      {
        delegations: [],
        unbondingDelegations: [],
      }
    )

    return {
      stakeType: stakeActions[0].type,
      // Default to first validator if exists.
      validator:
        (!loadingNativeDelegationInfo.loading &&
          loadingNativeDelegationInfo.data?.delegations[0]?.validator
            .address) ||
        '',
      toValidator: '',
      amount: 1,
    }
  }

  return {
    key: CoreActionKey.StakingActions,
    Icon: DepositEmoji,
    label: t('title.stakingActions'),
    description: t('info.stakingActionsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
