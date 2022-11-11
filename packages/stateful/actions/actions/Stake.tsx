import { useCallback, useMemo } from 'react'

import {
  nativeBalancesSelector,
  nativeDelegationInfoSelector,
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
import {
  CUSTOM_VALIDATOR,
  StakeData,
  StakeComponent as StatelessStakeComponent,
  stakeActions,
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
      data.validator === CUSTOM_VALIDATOR
        ? data.customValidator
        : data.validator,
      data.toValidator === CUSTOM_VALIDATOR
        ? data.customToValidator
        : data.toValidator
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
          // The validator info may or may not be loaded, so force display
          // custom validator input instead for now.
          validator: CUSTOM_VALIDATOR,
          customValidator: msg.distribution.withdraw_delegator_reward.validator,
          // Default values, not needed for displaying this type of message.
          toValidator: CUSTOM_VALIDATOR,
          customToValidator: '',
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
            // The validator info may or may not be loaded, so force display
            // custom validator input instead for now.
            validator: CUSTOM_VALIDATOR,
            customValidator:
              stakeType === StakeType.Redelegate
                ? data.src_validator
                : data.validator,
            // The validator info may or may not be loaded, so force display
            // custom validator input instead for now.
            toValidator: CUSTOM_VALIDATOR,
            customToValidator:
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
  }, [msg])

export const makeStakeAction: ActionMaker<StakeData> = ({
  t,
  chainId,
  address,
}) => {
  const useDefaults: UseDefaults<StakeData> = () => {
    const nativeDelegationInfoLoadable = loadableToLoadingData(
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
        (!nativeDelegationInfoLoadable.loading &&
          nativeDelegationInfoLoadable.data?.delegations[0]?.validator
            .address) ||
        CUSTOM_VALIDATOR,
      customValidator: '',
      toValidator: CUSTOM_VALIDATOR,
      customToValidator: '',
      amount: 1,
      denom: NATIVE_DENOM,
    }
  }

  const Component: ActionComponent<undefined, StakeData> = (props) => {
    // These need to be loaded via cached loadables to avoid displaying a loader
    // when this data updates on a schedule. Manually trigger a suspense loader
    // the first time when the initial data is still loading.

    const nativeBalancesLoadable = loadableToLoadingData(
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

    const nativeDelegationInfoLoadable = loadableToLoadingData(
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

    return (
      <SuspenseLoader
        fallback={<ActionCardLoader />}
        forceFallback={
          // Manually trigger loader.
          nativeBalancesLoadable.loading ||
          nativeDelegationInfoLoadable.loading ||
          !nativeDelegationInfoLoadable.data
        }
      >
        <StatelessStakeComponent
          {...props}
          options={{
            nativeBalances: nativeBalancesLoadable.loading
              ? []
              : nativeBalancesLoadable.data,
            stakes:
              nativeDelegationInfoLoadable.loading ||
              !nativeDelegationInfoLoadable.data
                ? []
                : nativeDelegationInfoLoadable.data.delegations.map(
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
