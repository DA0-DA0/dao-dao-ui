import { coin, parseCoins } from '@cosmjs/amino'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector } from 'recoil'

import {
  nativeDelegationInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  validatorsSelector,
} from '@dao-dao/state'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  DepositEmoji,
  Loader,
  useCachedLoading,
  useChainContext,
} from '@dao-dao/stateless'
import {
  ChainId,
  Coin,
  LoadingData,
  TokenType,
  UnifiedCosmosMsg,
  decodedStakingStargateMsgToCw,
  makeStargateMessage,
} from '@dao-dao/types'
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
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
} from '@dao-dao/types/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from '@dao-dao/types/protobuf/codegen/cosmos/staking/v1beta1/tx'
import {
  StakingActionType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  getNativeTokenForChainId,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessage,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import { SuspenseLoader } from '../../../../components/SuspenseLoader'
import { useExecutedProposalTxLoadable } from '../../../../hooks'
import { useTokenBalances } from '../../../hooks'
import { useActionOptions } from '../../../react'
import {
  ManageStakingData,
  ManageStakingComponent as StatelessManageStakingComponent,
  useStakeActions,
} from './Component'

const useTransformToCosmos: UseTransformToCosmos<ManageStakingData> = () => {
  const options = useActionOptions()
  const {
    chain: { chain_id: currentChainId },
  } = options

  return useCallback(
    ({
      chainId,
      type: stakeType,
      amount: macroAmount,
      validator,
      toValidator,
      withdrawAddress,
    }: ManageStakingData) => {
      const nativeToken = getNativeTokenForChainId(chainId)
      const microAmount = convertDenomToMicroDenomWithDecimals(
        macroAmount,
        nativeToken.decimals
      )

      const delegatorAddress = getChainAddressForActionOptions(options, chainId)
      const amount = coin(
        BigInt(microAmount).toString(),
        nativeToken.denomOrAddress
      )

      let msg: UnifiedCosmosMsg
      switch (stakeType) {
        case StakingActionType.Delegate:
          msg = makeStargateMessage({
            stargate: {
              typeUrl: MsgDelegate.typeUrl,
              value: {
                delegatorAddress,
                validatorAddress: validator,
                amount,
              } as MsgDelegate,
            },
          })
          break
        case StakingActionType.Undelegate:
          msg = makeStargateMessage({
            stargate: {
              typeUrl: MsgUndelegate.typeUrl,
              value: {
                delegatorAddress,
                validatorAddress: validator,
                amount,
              } as MsgUndelegate,
            },
          })
          break
        case StakingActionType.Redelegate:
          msg = makeStargateMessage({
            stargate: {
              typeUrl: MsgBeginRedelegate.typeUrl,
              value: {
                delegatorAddress,
                validatorSrcAddress: validator,
                validatorDstAddress: toValidator,
                amount,
              } as MsgBeginRedelegate,
            },
          })
          break
        case StakingActionType.WithdrawDelegatorReward:
          msg = makeStargateMessage({
            stargate: {
              typeUrl: MsgWithdrawDelegatorReward.typeUrl,
              value: {
                delegatorAddress,
                validatorAddress: validator,
              } as MsgWithdrawDelegatorReward,
            },
          })
          break
        case StakingActionType.SetWithdrawAddress:
          msg = makeStargateMessage({
            stargate: {
              typeUrl: MsgSetWithdrawAddress.typeUrl,
              value: {
                delegatorAddress,
                withdrawAddress,
              } as MsgSetWithdrawAddress,
            },
          })
          break
      }

      return maybeMakePolytoneExecuteMessage(currentChainId, chainId, msg)
    },
    [currentChainId, options]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageStakingData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  // Convert to CW msg format to use same matching logic below.
  if (isDecodedStargateMsg(msg)) {
    const cwMsg = decodedStakingStargateMsgToCw(msg.stargate)
    if (cwMsg) {
      msg = cwMsg
    }
  }

  const stakeActions = useStakeActions()
  const nativeToken = getNativeTokenForChainId(chainId)

  if ('distribution' in msg) {
    if (
      StakingActionType.WithdrawDelegatorReward in msg.distribution &&
      'validator' in msg.distribution.withdraw_delegator_reward
    ) {
      return {
        match: true,
        data: {
          chainId,
          type: StakingActionType.WithdrawDelegatorReward,
          validator: msg.distribution.withdraw_delegator_reward.validator,
          // Default values, not needed for displaying this type of message.
          toValidator: '',
          amount: 1,
          withdrawAddress: '',
        },
      }
    } else if (
      StakingActionType.SetWithdrawAddress in msg.distribution &&
      'address' in msg.distribution.set_withdraw_address
    ) {
      return {
        match: true,
        data: {
          chainId,
          type: StakingActionType.SetWithdrawAddress,
          withdrawAddress: msg.distribution.set_withdraw_address.address,
          validator: '',
          toValidator: '',
          amount: 1,
        },
      }
    }
  } else if ('staking' in msg) {
    const stakeType = stakeActions
      .map(({ type }) => type)
      .find((type) => type in msg.staking)
    if (!stakeType) return { match: false }

    const data = msg.staking[stakeType]
    if (
      ((stakeType === StakingActionType.Redelegate &&
        'src_validator' in data &&
        'dst_validator' in data) ||
        (stakeType !== StakingActionType.Redelegate && 'validator' in data)) &&
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
          type: stakeType,
          validator:
            stakeType === StakingActionType.Redelegate
              ? data.src_validator
              : data.validator,
          toValidator:
            stakeType === StakingActionType.Redelegate
              ? data.dst_validator
              : '',
          amount: convertMicroDenomToDenomWithDecimals(
            amount,
            nativeToken.decimals
          ),
          withdrawAddress: '',
        },
      }
    }
  }

  return { match: false }
}

const InnerComponent: ActionComponent = (props) => {
  const { t } = useTranslation()
  const options = useActionOptions()
  const { watch } = useFormContext()

  const {
    chain: { chain_id: chainId },
    nativeToken,
  } = useChainContext()

  if (!nativeToken) {
    throw new Error(t('error.missingNativeToken'))
  }

  // These need to be loaded via cached loadables to avoid displaying a loader
  // when this data updates on a schedule. Manually trigger a suspense loader
  // the first time when the initial data is still loading.

  const balances = useTokenBalances({
    filter: TokenType.Native,
  })
  const loadingNativeBalance: LoadingData<Coin> = balances.loading
    ? { loading: true }
    : {
        loading: false,
        data: coin(
          BigInt(
            balances.data.find(
              ({ token: { chainId, denomOrAddress } }) =>
                chainId === nativeToken.chainId &&
                denomOrAddress === nativeToken.denomOrAddress
            )?.balance ?? 0
          ).toString(),
          nativeToken.denomOrAddress
        ),
      }

  const address = getChainAddressForActionOptions(options, chainId)
  const loadingNativeDelegationInfo = useCachedLoading(
    address
      ? nativeDelegationInfoSelector({
          chainId,
          address,
        })
      : constSelector(undefined),
    undefined
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
      StakingActionType.WithdrawDelegatorReward
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
          data.stakeType === StakingActionType.WithdrawDelegatorReward &&
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
          AddressInput,
        }}
      />
    </SuspenseLoader>
  )
}

const Component: ActionComponent<undefined, ManageStakingData> = (props) => {
  const { context } = useActionOptions()
  const { watch, setValue } = useFormContext()

  const chainId = watch(props.fieldNamePrefix + 'chainId')

  return (
    <>
      {context.type === ActionContextType.Dao && props.isCreating && (
        <DaoSupportedChainPickerInput
          fieldName={props.fieldNamePrefix + 'chainId'}
          labelMode="token"
          onChange={() => {
            // Reset validator when switching chain.
            setValue((props.fieldNamePrefix + 'validator') as 'validator', '')
            setValue(
              (props.fieldNamePrefix + 'toValidator') as 'toValidator',
              ''
            )
          }}
          onlyDaoChainIds
        />
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
  context,
}) => {
  if (
    // x/gov cannot stake.
    context.type === ActionContextType.Gov ||
    // Neutron does not support staking.
    chainId === ChainId.NeutronMainnet ||
    chainId === ChainId.NeutronTestnet
  ) {
    return null
  }

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
      type: stakeActions[0].type,
      // Default to first validator if exists.
      validator:
        (!loadingNativeDelegationInfo.loading &&
          loadingNativeDelegationInfo.data?.delegations[0]?.validator
            .address) ||
        '',
      toValidator: '',
      amount: 1,
      withdrawAddress: address,
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
