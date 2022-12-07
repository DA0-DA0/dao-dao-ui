import { parseCoins } from '@cosmjs/amino'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import {
  nativeBalancesSelector,
  nativeDelegationInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  transactionEventsSelector,
  validatorsSelector,
} from '@dao-dao/state'
import {
  ActionCardLoader,
  DepositEmoji,
  useCachedLoadable,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  StakeType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  loadableToLoadingData,
  makeDistributeMessage,
  makeStakingMessage,
  nativeTokenDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../components/SuspenseLoader'
import { useProposalModuleAdapterIfAvailable } from '../../proposal-module-adapter/react/context'
import {
  StakeData,
  StakeComponent as StatelessStakeComponent,
  useStakeActions,
} from '../components/Stake'

const useTransformToCosmos: UseTransformToCosmos<StakeData> = () =>
  useCallback((data: StakeData) => {
    if (data.stakeType === StakeType.WithdrawDelegatorReward) {
      return makeDistributeMessage(data.validator)
    }

    // NOTE: Does not support TOKEN staking at this point, however it could be
    // implemented here!
    const decimals = nativeTokenDecimals(data.denom)!
    const amount = convertDenomToMicroDenomWithDecimals(data.amount, decimals)
    return makeStakingMessage(
      data.stakeType,
      amount.toString(),
      data.denom,
      data.validator,
      data.toValidator
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
              ? data.src_validator
              : data.validator,
          toValidator:
            stakeType === StakeType.Redelegate ? data.dst_validator : '',
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
}

export const makeStakeAction: ActionMaker<StakeData> = ({
  t,
  chainId,
  address,
}) => {
  const useDefaults: UseDefaults<StakeData> = () => {
    const stakeActions = useStakeActions()

    const loadingNativeDelegationInfo = loadableToLoadingData(
      useCachedLoadable(
        address
          ? nativeDelegationInfoSelector({
              chainId,
              address,
            })
          : undefined
      ),
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
      denom: NATIVE_DENOM,
    }
  }

  const Component: ActionComponent<undefined, StakeData> = (props) => {
    // These need to be loaded via cached loadables to avoid displaying a loader
    // when this data updates on a schedule. Manually trigger a suspense loader
    // the first time when the initial data is still loading.

    const loadingNativeBalances = loadableToLoadingData(
      useCachedLoadable(
        address
          ? nativeBalancesSelector({
              chainId,
              address,
            })
          : undefined
      ),
      []
    )

    const loadingNativeDelegationInfo = loadableToLoadingData(
      useCachedLoadable(
        address
          ? nativeDelegationInfoSelector({
              chainId,
              address,
            })
          : undefined
      ),
      {
        delegations: [],
        unbondingDelegations: [],
      }
    )

    const loadingValidators = loadableToLoadingData(
      useCachedLoadable(
        validatorsSelector({
          chainId,
        })
      ),
      []
    )

    const nativeUnstakingDurationSeconds = useRecoilValue(
      nativeUnstakingDurationSecondsSelector({
        chainId,
      })
    )

    // If in DAO context, use proposal execution hash to find claimed rewards.
    // If in wallet context, proposal module adapter will not be available.
    const {
      hooks: { useProposalExecutionTxHash },
    } = useProposalModuleAdapterIfAvailable() ?? { hooks: {} }
    const loadingExecutionTxHash = useProposalExecutionTxHash?.()

    const txEventsLoadable = useCachedLoadable(
      loadingExecutionTxHash
        ? loadingExecutionTxHash.loading
          ? // If still loading, return undefined to indicate loading.
            undefined
          : loadingExecutionTxHash.data
          ? transactionEventsSelector({ txHash: loadingExecutionTxHash.data })
          : // If no data, return undefined.
            constSelector(undefined)
        : // If loading value undefined, return undefined.
          constSelector(undefined)
    )
    const txEvents =
      txEventsLoadable.state === 'hasValue'
        ? txEventsLoadable.contents
        : undefined
    const executed = !!txEvents

    const { watch } = useFormContext()
    let claimedRewards: number | undefined
    if (
      executed &&
      txEvents &&
      watch(props.fieldNamePrefix + 'stakeType') ===
        StakeType.WithdrawDelegatorReward
    ) {
      const validator = watch(props.fieldNamePrefix + 'validator')

      const claimValidatorRewardsEvents = txEvents.filter(
        ({ type, attributes }) =>
          type === 'withdraw_rewards' &&
          attributes.some(
            ({ key, value }) => key === 'validator' && value === validator
          )
      )

      // All action data that claims rewards from the same validator.
      const claimValidatorRewardsActionData = props.allActionsWithData
        .filter(
          ({ key, data }) =>
            key === CoreActionKey.Stake &&
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
          )?.value ?? '0' + NATIVE_DENOM
        )[0]

        if (coin) {
          claimedRewards = convertMicroDenomToDenomWithDecimals(
            coin.amount ?? 0,
            nativeTokenDecimals(coin.denom) ?? NATIVE_DECIMALS
          )
        }
      }
    }

    return (
      <SuspenseLoader
        fallback={<ActionCardLoader />}
        forceFallback={
          // Manually trigger loader.
          loadingNativeBalances.loading ||
          loadingNativeDelegationInfo.loading ||
          !loadingNativeDelegationInfo.data ||
          loadingValidators.loading ||
          txEventsLoadable.state === 'loading'
        }
      >
        <StatelessStakeComponent
          {...props}
          options={{
            nativeBalances: loadingNativeBalances.loading
              ? []
              : loadingNativeBalances.data,
            stakes:
              loadingNativeDelegationInfo.loading ||
              !loadingNativeDelegationInfo.data
                ? []
                : loadingNativeDelegationInfo.data.delegations.map(
                    ({ validator, delegated, pendingReward }) => ({
                      validator,
                      amount: convertMicroDenomToDenomWithDecimals(
                        delegated.amount,
                        NATIVE_DECIMALS
                      ),
                      rewards: convertMicroDenomToDenomWithDecimals(
                        pendingReward.amount,
                        NATIVE_DECIMALS
                      ),
                      denom: NATIVE_DENOM,
                      symbol: nativeTokenLabel(NATIVE_DENOM),
                      decimals: NATIVE_DECIMALS,
                    })
                  ),
            validators: loadingValidators.loading ? [] : loadingValidators.data,
            executed,
            claimedRewards,
            nativeUnstakingDurationSeconds,
          }}
        />
      </SuspenseLoader>
    )
  }

  return {
    key: CoreActionKey.Stake,
    Icon: DepositEmoji,
    label: t('title.stake'),
    description: t('info.stakeActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
