import { coin, parseCoins } from '@cosmjs/amino'
import { useQueryClient } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  chainQueries,
  nativeUnstakingDurationSecondsSelector,
  validatorsSelector,
} from '@dao-dao/state'
import {
  ActionBase,
  ChainProvider,
  DaoSupportedChainPickerInput,
  DepositEmoji,
  Loader,
  useActionOptions,
  useCachedLoading,
  useChainContext,
} from '@dao-dao/stateless'
import {
  Coin,
  LoadingData,
  NativeDelegationInfo,
  TokenType,
  UnifiedCosmosMsg,
  decodedStakingStargateMsgToCw,
  makeStargateMessage,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
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
  getChainAddressForActionOptions,
  getNativeTokenForChainId,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import { SuspenseLoader } from '../../../../components/SuspenseLoader'
import {
  useExecutedProposalTxLoadable,
  useQueryLoadingData,
} from '../../../../hooks'
import { useTokenBalances } from '../../../hooks'
import {
  ManageStakingData,
  ManageStakingComponent as StatelessManageStakingComponent,
  getStakeActions,
} from './Component'

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
        data: HugeDecimal.from(
          balances.data.find(
            ({ token: { chainId, denomOrAddress } }) =>
              chainId === nativeToken.chainId &&
              denomOrAddress === nativeToken.denomOrAddress
          )?.balance ?? 0
        ).toCoin(nativeToken.denomOrAddress),
      }

  const address = getChainAddressForActionOptions(options, chainId)

  const queryClient = useQueryClient()
  const loadingNativeDelegationInfo = useQueryLoadingData(
    address
      ? chainQueries.nativeDelegationInfo(queryClient, {
          chainId,
          address,
        })
      : undefined,
    {
      delegations: [],
      unbondingDelegations: [],
    } as NativeDelegationInfo
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
        claimedRewards = HugeDecimal.from(
          coin.amount ?? 0
        ).toHumanReadableNumber(nativeToken.decimals)
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
          stakes: loadingNativeDelegationInfo.loading
            ? []
            : loadingNativeDelegationInfo.data.delegations.map(
                ({ validator, delegated, pendingReward }) => ({
                  token: nativeToken,
                  validator,
                  amount: HugeDecimal.from(delegated.amount),
                  rewards: HugeDecimal.from(pendingReward.amount),
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

export class ManageStakingAction extends ActionBase<ManageStakingData> {
  public readonly key = ActionKey.ManageStaking
  public readonly Component = Component

  constructor(options: ActionOptions) {
    // x/gov cannot stake.
    if (options.context.type === ActionContextType.Gov) {
      throw new Error('Chain governance cannot stake assets')
    }

    super(options, {
      Icon: DepositEmoji,
      label: options.t('title.manageStaking'),
      description: options.t('info.manageStakingDescription'),
      keywords: [
        'stake',
        'unstake',
        'restake',
        'delegate',
        'undelegate',
        'redelegate',
      ],
    })
  }

  async setup() {
    const firstValidator =
      (this.options.address &&
        (
          await this.options.queryClient.fetchQuery(
            chainQueries.nativeDelegationInfo(this.options.queryClient, {
              chainId: this.options.chain.chain_id,
              address: this.options.address,
            })
          )
        ).delegations[0]?.validator.address) ||
      ''

    this.defaults = {
      chainId: this.options.chain.chain_id,
      type: StakingActionType.Delegate,
      // Default to first validator if exists.
      validator: firstValidator,
      toValidator: '',
      amount: 1,
      withdrawAddress: this.options.address,
    }
  }

  encode({
    chainId,
    type,
    amount: macroAmount,
    validator,
    toValidator,
    withdrawAddress,
  }: ManageStakingData): UnifiedCosmosMsg[] {
    const delegatorAddress = getChainAddressForActionOptions(
      this.options,
      chainId
    )
    const nativeToken = getNativeTokenForChainId(chainId)
    const amount = coin(
      HugeDecimal.fromHumanReadable(
        macroAmount,
        nativeToken.decimals
      ).toString(),
      nativeToken.denomOrAddress
    )

    let msg: UnifiedCosmosMsg
    switch (type) {
      case StakingActionType.Delegate:
        msg = makeStargateMessage({
          stargate: {
            typeUrl: MsgDelegate.typeUrl,
            value: MsgDelegate.fromPartial({
              delegatorAddress,
              validatorAddress: validator,
              amount,
            }),
          },
        })
        break
      case StakingActionType.Undelegate:
        msg = makeStargateMessage({
          stargate: {
            typeUrl: MsgUndelegate.typeUrl,
            value: MsgUndelegate.fromPartial({
              delegatorAddress,
              validatorAddress: validator,
              amount,
            }),
          },
        })
        break
      case StakingActionType.Redelegate:
        msg = makeStargateMessage({
          stargate: {
            typeUrl: MsgBeginRedelegate.typeUrl,
            value: MsgBeginRedelegate.fromPartial({
              delegatorAddress,
              validatorSrcAddress: validator,
              validatorDstAddress: toValidator,
              amount,
            }),
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
            value: MsgSetWithdrawAddress.fromPartial({
              delegatorAddress,
              withdrawAddress,
            }),
          },
        })
        break
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      msg
    )
  }

  match([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): ActionMatch {
    // Convert to CW msg format to use consistent logic below.
    if (isDecodedStargateMsg(decodedMessage)) {
      const cwMsg = decodedStakingStargateMsgToCw(decodedMessage.stargate)
      if (cwMsg) {
        decodedMessage = cwMsg
      }
    }

    const stakeActions = getStakeActions(this.options.t)
    const nativeToken = getNativeTokenForChainId(chainId)

    if ('distribution' in decodedMessage) {
      return (
        objectMatchesStructure(decodedMessage, {
          distribution: {
            [StakingActionType.WithdrawDelegatorReward]: {
              validator: {},
            },
          },
        }) ||
        objectMatchesStructure(decodedMessage, {
          distribution: {
            [StakingActionType.SetWithdrawAddress]: {
              address: {},
            },
          },
        })
      )
    } else if ('staking' in decodedMessage) {
      const action = stakeActions.find(
        ({ type }) => type in decodedMessage.staking
      )
      if (!action) {
        return false
      }

      const data = decodedMessage.staking[action.type]
      return (
        ((action.type === StakingActionType.Redelegate &&
          objectMatchesStructure(data, {
            src_validator: {},
            dst_validator: {},
          })) ||
          (action.type !== StakingActionType.Redelegate &&
            objectMatchesStructure(data, {
              validator: {},
            }))) &&
        objectMatchesStructure(data, {
          amount: {
            amount: {},
            denom: {},
          },
        }) &&
        data.amount.denom === nativeToken.denomOrAddress
      )
    }

    return false
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): ManageStakingData {
    // Convert to CW msg format to use consistent logic below.
    if (isDecodedStargateMsg(decodedMessage)) {
      const cwMsg = decodedStakingStargateMsgToCw(decodedMessage.stargate)
      if (cwMsg) {
        decodedMessage = cwMsg
      }
    }

    const stakeActions = getStakeActions(this.options.t)
    const nativeToken = getNativeTokenForChainId(chainId)

    if ('distribution' in decodedMessage) {
      if (
        StakingActionType.WithdrawDelegatorReward in decodedMessage.distribution
      ) {
        return {
          chainId,
          type: StakingActionType.WithdrawDelegatorReward,
          validator:
            decodedMessage.distribution.withdraw_delegator_reward.validator,
          // Default values, not needed for displaying this type of message.
          toValidator: '',
          amount: 1,
          withdrawAddress: '',
        }
      } else if (
        StakingActionType.SetWithdrawAddress in decodedMessage.distribution
      ) {
        return {
          chainId,
          type: StakingActionType.SetWithdrawAddress,
          withdrawAddress:
            decodedMessage.distribution.set_withdraw_address.address,
          validator: '',
          toValidator: '',
          amount: 1,
        }
      }
    } else if ('staking' in decodedMessage) {
      const action = stakeActions.find(
        ({ type }) => type in decodedMessage.staking
      )
      // Should never happen as this is validated in match.
      if (!action) {
        throw new Error('Invalid staking message')
      }

      const data = decodedMessage.staking[action.type]

      return {
        chainId,
        type: action.type,
        validator:
          action.type === StakingActionType.Redelegate
            ? data.src_validator
            : data.validator,
        toValidator:
          action.type === StakingActionType.Redelegate
            ? data.dst_validator
            : '',
        amount: HugeDecimal.from(data.amount.amount).toHumanReadableNumber(
          nativeToken.decimals
        ),
        withdrawAddress: '',
      }
    }

    // Should never happen as this is validated in match.
    throw new Error('Invalid staking message')
  }
}
