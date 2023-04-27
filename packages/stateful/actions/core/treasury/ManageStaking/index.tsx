import { coin, parseCoins } from '@cosmjs/amino'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  nativeBalanceSelector,
  nativeDelegationInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  validatorsSelector,
} from '@dao-dao/state'
import {
  ChainProvider,
  DepositEmoji,
  Loader,
  RadioInput,
  useCachedLoading,
  useChainContext,
} from '@dao-dao/stateless'
import { CosmosMsgForEmpty } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  POLYTONE_NOTES,
  StakeType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  getNativeTokenForChainId,
  makeDistributeMessage,
  makePolytoneExecuteMessage,
  makeStakingMessage,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components/SuspenseLoader'
import { useExecutedProposalTxLoadable } from '../../../../hooks'
import { useActionOptions } from '../../../react'
import {
  ManageStakingData,
  ManageStakingComponent as StatelessManageStakingComponent,
  useStakeActions,
} from './Component'

const useTransformToCosmos: UseTransformToCosmos<ManageStakingData> = () => {
  const currentChainId = useActionOptions().chain.chain_id

  return useCallback(
    ({
      chainId,
      stakeType,
      amount,
      validator,
      toValidator,
    }: ManageStakingData) => {
      let msg: CosmosMsgForEmpty | undefined
      if (stakeType === StakeType.WithdrawDelegatorReward) {
        msg = makeDistributeMessage(validator)
      } else {
        const nativeToken = getNativeTokenForChainId(chainId)
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          nativeToken.decimals
        )
        msg = makeStakingMessage(
          stakeType,
          microAmount.toString(),
          nativeToken.denomOrAddress,
          validator,
          toValidator
        )
      }

      if (chainId === currentChainId) {
        return msg
      } else {
        return makePolytoneExecuteMessage(chainId, msg)
      }
    },
    [currentChainId]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageStakingData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  const stakeActions = useStakeActions()
  const nativeToken = getNativeTokenForChainId(chainId)

  if (
    'distribution' in msg &&
    StakeType.WithdrawDelegatorReward in msg.distribution &&
    'validator' in msg.distribution.withdraw_delegator_reward
  ) {
    return {
      match: true,
      data: {
        chainId,
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
      data.amount.denom === nativeToken.denomOrAddress
    ) {
      const { amount } = data.amount

      return {
        match: true,
        data: {
          chainId,
          stakeType,
          validator:
            stakeType === StakeType.Redelegate
              ? data.src_validator
              : data.validator,
          toValidator:
            stakeType === StakeType.Redelegate ? data.dst_validator : '',
          amount: convertMicroDenomToDenomWithDecimals(
            amount,
            nativeToken.decimals
          ),
        },
      }
    }
  }

  return { match: false }
}

const InnerComponent: ActionComponent = (props) => {
  const { address: _address, context, chain } = useActionOptions()
  const { watch } = useFormContext()

  const {
    chain: { chain_id: chainId },
    nativeToken,
  } = useChainContext()

  const address =
    context.type === ActionContextType.Dao && chainId !== chain.chain_id
      ? context.info.polytoneProxies[chainId] || ''
      : _address

  // These need to be loaded via cached loadables to avoid displaying a loader
  // when this data updates on a schedule. Manually trigger a suspense loader
  // the first time when the initial data is still loading.

  const loadingNativeBalance = useCachedLoading(
    nativeBalanceSelector({
      chainId,
      address,
    }),
    coin(0, nativeToken.denomOrAddress)
  )

  const loadingNativeDelegationInfo = useCachedLoading(
    nativeDelegationInfoSelector({
      chainId,
      address,
    }),
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

  const nativeUnstakingDurationSeconds = useCachedLoading(
    nativeUnstakingDurationSecondsSelector({
      chainId,
    }),
    -1
  )

  // If in DAO context, use executed proposal TX events to find claimed
  // rewards. If in wallet context, will be undefined.
  const executedTxLoadable = useExecutedProposalTxLoadable()

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
          actionKey === ActionKey.ManageStaking &&
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
        )?.value ?? '0' + nativeToken.denomOrAddress
      )[0]

      if (coin) {
        claimedRewards = convertMicroDenomToDenomWithDecimals(
          coin.amount ?? 0,
          nativeToken.decimals
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
        loadingNativeDelegationInfo.loading ||
        loadingValidators.loading ||
        nativeUnstakingDurationSeconds.loading
      }
    >
      <StatelessManageStakingComponent
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
                    token: nativeToken,
                    validator,
                    amount: convertMicroDenomToDenomWithDecimals(
                      delegated.amount,
                      nativeToken.decimals
                    ),
                    rewards: convertMicroDenomToDenomWithDecimals(
                      pendingReward.amount,
                      nativeToken.decimals
                    ),
                  })
                ),
          validators: loadingValidators.loading ? [] : loadingValidators.data,
          executed:
            executedTxLoadable.state === 'hasValue' &&
            !!executedTxLoadable.contents,
          claimedRewards,
          nativeUnstakingDurationSeconds: nativeUnstakingDurationSeconds.loading
            ? 0
            : nativeUnstakingDurationSeconds.data,
        }}
      />
    </SuspenseLoader>
  )
}

const Component: ActionComponent<undefined, ManageStakingData> = (props) => {
  const { context, chain } = useActionOptions()
  const { watch, setValue } = useFormContext()

  const chainId = watch(props.fieldNamePrefix + 'chainId')

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <div className="mb-4">
          <RadioInput
            disabled={!props.isCreating}
            fieldName={(props.fieldNamePrefix + 'chainId') as 'chainId'}
            onChange={() => {
              // Reset validator when switching chain.
              setValue((props.fieldNamePrefix + 'validator') as 'validator', '')
              setValue(
                (props.fieldNamePrefix + 'toValidator') as 'toValidator',
                ''
              )
            }}
            options={[
              // Current chain
              {
                label: getNativeTokenForChainId(chain.chain_id).symbol,
                value: chain.chain_id,
              },
              // Other chains
              ...Object.keys(POLYTONE_NOTES).map((chainId) => ({
                label: getNativeTokenForChainId(chainId).symbol,
                value: chainId,
              })),
            ]}
            setValue={setValue}
            watch={watch}
          />
        </div>
      )}

      <ChainProvider chainId={chainId}>
        <InnerComponent key={chainId} {...props} />
      </ChainProvider>
    </>
  )
}

export const makeManageStakingAction: ActionMaker<ManageStakingData> = ({
  t,
  chain: { chain_id: chainId },
  address,
}) => {
  const useDefaults: UseDefaults<ManageStakingData> = () => {
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
      chainId,
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
    key: ActionKey.ManageStaking,
    Icon: DepositEmoji,
    label: t('title.manageStaking'),
    description: t('info.manageStakingDescription'),
    keywords: [
      'stake',
      'unstake',
      'restake',
      'delegate',
      'undelegate',
      'redelegate',
    ],
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
