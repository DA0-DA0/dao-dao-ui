import { MsgWithdrawValidatorCommission } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from 'cosmjs-types/cosmos/slashing/v1beta1/tx'
import {
  MsgCreateValidator,
  MsgEditValidator,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { PickEmoji } from '@dao-dao/stateless'
import {
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_DENOM,
  isDecodedStargateMsg,
  makeStargateMessage,
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
  validatorActionType: ValidatorActionType
  createMsg: string
  editMsg: string
}

export const makeValidatorActions: ActionMaker<ValidatorActionsData> = ({
  t,
  address,
  bech32Prefix,
}) => {
  const validatorAddress = toValidatorAddress(address, bech32Prefix)

  const useTransformToCosmos: UseTransformToCosmos<ValidatorActionsData> = () =>
    useCallback(
      ({ validatorActionType, createMsg, editMsg }: ValidatorActionsData) => {
        switch (validatorActionType) {
          case ValidatorActionType.WithdrawValidatorCommission:
            return makeStargateMessage({
              stargate: {
                typeUrl: ValidatorActionType.WithdrawValidatorCommission,
                value: {
                  validatorAddress,
                } as MsgWithdrawValidatorCommission,
              },
            })
          case ValidatorActionType.CreateValidator:
            return makeStargateMessage({
              stargate: {
                typeUrl: ValidatorActionType.CreateValidator,
                value: JSON.parse(createMsg),
              },
            })
          case ValidatorActionType.EditValidator:
            return makeStargateMessage({
              stargate: {
                typeUrl: ValidatorActionType.EditValidator,
                value: JSON.parse(editMsg),
              },
            })
          case ValidatorActionType.UnjailValidator:
            return makeStargateMessage({
              stargate: {
                typeUrl: ValidatorActionType.UnjailValidator,
                value: {
                  validatorAddr: validatorAddress,
                } as MsgUnjail,
              },
            })
          default:
            throw Error('Unrecogonized validator action type')
        }
      },
      []
    )

  const useDefaults: UseDefaults<ValidatorActionsData> = () => ({
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
            key: '<the base64 public key of your node (junod tendermint show-validator)>',
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
        validatorAddress,
      },
      null,
      2
    ),
  })

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ValidatorActionsData> = (
    msg: Record<string, any>
  ) => {
    const data = useDefaults()

    return useMemo(() => {
      // Check this is a stargate message.
      if (!isDecodedStargateMsg(msg)) {
        return { match: false }
      }

      // Check that the type URL is a validator message, set data accordingly.
      switch (msg.stargate.typeUrl) {
        case ValidatorActionType.WithdrawValidatorCommission:
          if (
            (msg.stargate.value as MsgWithdrawValidatorCommission)
              .validatorAddress !== validatorAddress
          ) {
            return { match: false }
          }

          data.validatorActionType =
            ValidatorActionType.WithdrawValidatorCommission
          break

        case ValidatorActionType.CreateValidator:
          if (
            (msg.stargate.value as MsgCreateValidator).delegatorAddress !==
              address ||
            (msg.stargate.value as MsgCreateValidator).validatorAddress !==
              validatorAddress
          ) {
            return { match: false }
          }

          data.validatorActionType = ValidatorActionType.CreateValidator
          data.createMsg = JSON.stringify(msg.stargate.value, null, 2)
          break

        case ValidatorActionType.EditValidator:
          if (
            (msg.stargate.value as MsgEditValidator).validatorAddress !==
            validatorAddress
          ) {
            return { match: false }
          }

          data.validatorActionType = ValidatorActionType.EditValidator
          data.editMsg = JSON.stringify(msg.stargate.value, null, 2)
          break

        case ValidatorActionType.UnjailValidator:
          if (
            (msg.stargate.value as MsgUnjail).validatorAddr !== validatorAddress
          ) {
            return { match: false }
          }

          data.validatorActionType = ValidatorActionType.UnjailValidator
          break

        default:
          // No validator action type URL match, so return a false match.
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
