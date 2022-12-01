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
import {
  NATIVE_DENOM,
  ValidatorActionType,
  makeStargateMessage,
} from '@dao-dao/utils'

import { ValidatorActionsComponent as StatelessValidatorActionsComponent } from '../components'

interface GenericUnencodedProtbuf {
  type_url: string
  value: string | MsgUnjail | MsgWithdrawValidatorCommission
}

interface ValidatorActionsData {
  createMsg: GenericUnencodedProtbuf
  editMsg: GenericUnencodedProtbuf
  unjailMsg: GenericUnencodedProtbuf
  validatorActionType: ValidatorActionType
  withdrawCommissionMsg: GenericUnencodedProtbuf
}

const useDefaults: UseDefaults<ValidatorActionsData> = () => {
  return {
    validatorActionType: ValidatorActionType.WithdrawValidatorCommission,
    createMsg: {
      type_url: '/cosmos.staking.v1beta1.MsgCreateValidator',
      value: `{
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
    },
    editMsg: {
      type_url: '/cosmos.staking.v1beta1.MsgEditValidator',
      value: `{
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
    },
    unjailMsg: {
      type_url: '/cosmos.slashing.v1beta1.MsgUnjail',
      value: {
        validatorAddr: '',
      },
    },
    withdrawCommissionMsg: {
      type_url: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
      value: {
        validatorAddress: '',
      },
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
      msg
        ? {
            match: true,
            data: msg as ValidatorActionsData,
          }
        : { match: false },
    [msg]
  )

export const makeValidatorActions: ActionMaker<ValidatorActionsData> = ({
  t,
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<ValidatorActionsData> = () =>
    useCallback((data: ValidatorActionsData) => {
      switch (data.validatorActionType) {
        case ValidatorActionType.WithdrawValidatorCommission:
          return makeStargateMessage({
            stargate: {
              type_url: data.withdrawCommissionMsg.type_url,
              value: data.withdrawCommissionMsg.value,
            },
          })
        case ValidatorActionType.CreateValidator:
          return makeStargateMessage({
            stargate: {
              type_url: data.createMsg.type_url,
              value: data.createMsg.value,
            },
          })
        case ValidatorActionType.EditValidator:
          return makeStargateMessage({
            stargate: {
              type_url: data.editMsg.type_url,
              value: data.editMsg.value,
            },
          })
        case ValidatorActionType.UnjailValidator:
          return makeStargateMessage({
            stargate: {
              type_url: data.unjailMsg.type_url,
              value: data.unjailMsg.value,
            },
          })
        default:
          throw Error('Unrecogonized validator action type')
      }
    }, [])

  return {
    key: CoreActionKey.ValidatorActions,
    Icon: PickEmoji,
    label: 'Validator actions',
    description: 'Make transactions related to DAO run validators.',
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
