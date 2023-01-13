import { MsgWithdrawValidatorCommission } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from 'cosmjs-types/cosmos/slashing/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { PickEmoji } from '@dao-dao/stateless'
import {
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_DENOM,
  makeStargateMessage,
  objectMatchesStructure,
  toValidatorAddress,
} from '@dao-dao/utils'

import { ValidatorActionsComponent as Component } from '../components'

export enum ValidatorActionType {
  CreateValidator = '/cosmos.staking.v1beta1.MsgCreateValidator',
  EditValidator = '/cosmos.staking.v1beta1.MsgEditValidator',
  UnjailValidator = '/cosmos.slashing.v1beta1.MsgUnjail',
  WithdrawValidatorCommission = '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
}

interface ValidatorActionsData {
  createMsg: string
  editMsg: string
  unjailMsg: MsgUnjail
  validatorActionType: ValidatorActionType
  withdrawCommissionMsg: MsgWithdrawValidatorCommission
}

const useTransformToCosmos: UseTransformToCosmos<ValidatorActionsData> = () =>
  useCallback((data: ValidatorActionsData) => {
    switch (data.validatorActionType) {
      case ValidatorActionType.WithdrawValidatorCommission:
        return makeStargateMessage({
          stargate: {
            type_url: ValidatorActionType.WithdrawValidatorCommission,
            value: data.withdrawCommissionMsg,
          },
        })
      case ValidatorActionType.CreateValidator:
        return makeStargateMessage({
          stargate: {
            type_url: ValidatorActionType.CreateValidator,
            value: JSON.parse(data.createMsg),
          },
        })
      case ValidatorActionType.EditValidator:
        return makeStargateMessage({
          stargate: {
            type_url: ValidatorActionType.EditValidator,
            value: JSON.parse(data.editMsg),
          },
        })
      case ValidatorActionType.UnjailValidator:
        return makeStargateMessage({
          stargate: {
            type_url: ValidatorActionType.UnjailValidator,
            value: data.unjailMsg,
          },
        })
      default:
        throw Error('Unrecogonized validator action type')
    }
  }, [])

export const makeValidatorActions: ActionMaker<ValidatorActionsData> = ({
  t,
  context,
  address,
  bech32Prefix,
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const useDefaults: UseDefaults<ValidatorActionsData> = () => {
    const validatorAddress = toValidatorAddress(address, bech32Prefix)

    return {
      validatorActionType: ValidatorActionType.WithdrawValidatorCommission,
      createMsg: JSON.stringify(
        {
          description: {
            moniker: '<validator name>',
            identity: '<optional identity signature (ex. UPort or Keybase)>',
            website: '<your validator website>',
            securityContact: '<optional security contact email>',
            details: '<description of your validator>',
          },
          commission: {
            rate: '50000000000000000',
            maxRate: '200000000000000000',
            maxChangeRate: '100000000000000000',
          },
          minSelfDelegation: '1',
          delegatorAddress: address,
          validatorAddress,
          pubkey: {
            typeUrl: '/cosmos.crypto.ed25519.PubKey',
            value: {
              '@type': '/cosmos.crypto.ed25519.PubKey',
              key: '<the public key of your node (junod tendermint show-validator)>',
            },
          },
          value: {
            denom: NATIVE_DENOM,
            amount: '1000000',
          },
        },
        null,
        2
      ),
      editMsg: JSON.stringify(
        {
          description: {
            moniker: '<validator name>',
            identity: '<optional identity signature (ex. UPort or Keybase)>',
            website: '<your validator website>',
            securityContact: '<optional security contact email>',
            details: '<description of your validator>',
          },
          commissionRate: '50000000000000000',
          minSelfDelegation: '1',
          validatorAddress: validatorAddress,
        },
        null,
        2
      ),
      unjailMsg: {
        validatorAddr: validatorAddress,
      },
      withdrawCommissionMsg: {
        validatorAddress: validatorAddress,
      },
    }
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ValidatorActionsData> = (
    msg: Record<string, any>
  ) => {
    let data = useDefaults()

    return useMemo(() => {
      // Check this is a stargate message.
      if (
        !objectMatchesStructure(msg, {
          stargate: {
            type_url: {},
            value: {},
          },
        })
      ) {
        return { match: false }
      }

      // Check that the type_url is a validator message, set data accordingly
      switch (msg.stargate.type_url) {
        case ValidatorActionType.WithdrawValidatorCommission:
          data.validatorActionType =
            ValidatorActionType.WithdrawValidatorCommission
          data.withdrawCommissionMsg = msg.stargate.value
          break
        case ValidatorActionType.CreateValidator:
          data.validatorActionType = ValidatorActionType.CreateValidator
          data.createMsg = JSON.stringify(msg.stargate.value, null, 2)
          break
        case ValidatorActionType.EditValidator:
          data.validatorActionType = ValidatorActionType.EditValidator
          data.editMsg = JSON.stringify(msg.stargate.value, null, 2)
          break
        case ValidatorActionType.UnjailValidator:
          data.validatorActionType = ValidatorActionType.UnjailValidator
          data.unjailMsg = msg.stargate.value
          break
        default:
          // No validator action typeUrls so we return a false match
          return { match: false }
      }

      return {
        match: true,
        data,
      }
    }, [msg, data])
  }

  return {
    key: CoreActionKey.ValidatorActions,
    Icon: PickEmoji,
    label: t('title.validatorActions'),
    description: t('info.validatorActionsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
