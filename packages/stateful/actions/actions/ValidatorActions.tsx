import { MsgWithdrawValidatorCommission } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import { MsgUnjail } from 'cosmjs-types/cosmos/slashing/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { PickEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { NATIVE_DENOM, makeStargateMessage } from '@dao-dao/utils'

import { ValidatorActionsComponent as StatelessValidatorActionsComponent } from '../components'

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

const useDefaults: UseDefaults<ValidatorActionsData> = () => {
  return {
    validatorActionType: ValidatorActionType.WithdrawValidatorCommission,
    createMsg: `{
   "description": {
     "moniker": "<validator name>",
     "identity": "<optional identity signature (ex. UPort or Keybase)>",
     "website": "<your validator website>",
     "securityContact": "<optional security contact email>",
     "details": "<description of your validator>"
   },
   "commission": {
     "rate": "50000000000000000",
     "maxRate": "200000000000000000",
     "maxChangeRate": "100000000000000000"
   },
   "minSelfDelegation": "1",
   "delegatorAddress": "<your DAO address>",
   "validatorAddress": "<your DAO validator address>",
   "pubkey": {
     "typeUrl": "/cosmos.crypto.ed25519.PubKey",
     "value": {
       "@type":"/cosmos.crypto.ed25519.PubKey",
       "key":"<the public key of your node (junod tendermint show-validator)>"}
   },
   "value": {
     "denom": "${NATIVE_DENOM}",
     "amount": "1000000"
   }
 }`,
    editMsg: `{
   "description": {
     "moniker": "<validator name>",
     "identity": "<optional identity signature (ex. UPort or Keybase)>",
     "website": "<your validator website>",
     "securityContact": "<optional security contact email>",
     "details": "<description of your validator>"
   },
   "commissionRate": "50000000000000000",
   "minSelfDelegation": "1",
   "validatorAddress": "<your validator address>"
 }`,
    unjailMsg: {
      validatorAddr: '',
    },
    withdrawCommissionMsg: {
      validatorAddress: '',
    },
  }
}

const Component: ActionComponent = (props) => {
  return <StatelessValidatorActionsComponent {...props} options={{}} />
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ValidatorActionsData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      msg &&
      msg.validatorActionType &&
      msg.createMsg &&
      msg.editMsg &&
      msg.unjailMsg &&
      msg.withdrawCommissionMsg
        ? {
            match: true,
            data: msg as ValidatorActionsData,
          }
        : { match: false },
    [msg]
  )

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
            value: data.createMsg,
          },
        })
      case ValidatorActionType.EditValidator:
        return makeStargateMessage({
          stargate: {
            type_url: ValidatorActionType.EditValidator,
            value: data.editMsg,
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
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
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
