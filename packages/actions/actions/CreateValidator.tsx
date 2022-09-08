import type { MsgCreateValidator } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { NATIVE_DENOM, makeStargateMessage } from '@dao-dao/utils'

import {
  CreateValidatorIcon,
  CreateValidatorComponent as StatelessCreateValidatorComponent,
} from '../components'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../types'

interface CreateValidatorData {
  type_url: string
  value: string
}

const useDefaults: UseDefaults<CreateValidatorData> = () => ({
  type_url: '/cosmos.staking.v1beta1.MsgCreateValidator',
  /* value: `{
   *   "description": {
   *     "moniker": "<Validator name>",
   *     "identity": "<optional identity signature (ex. UPort or Keybase)>",
   *     "website": "<Your validator website>",
   *     "securityContact": "<optional security contact email>",
   *     "details": "<Description of your validator>"
   *   },
   *   "commission": {
   *     "rate": "0.05",
   *     "maxRate": "0.1",
   *     "maxChangeRate": "0.1"
   *   },
   *   "minSelfDelegation": "1",
   *   "delegatorAddress": "<YOUR DAO ADDRESS>",
   *   "validatorAddress": "<YOUR DAO ADDRESS>",
   *   "pubkey": {
   *     "typeUrl": "/cosmos.crypto.secp256k1.PubKey",
   *     "value": "<junovaloper address of the node (run: junod tendermint show)>"
   *   },
   *   "value": {
   *     "denom": "${NATIVE_DENOM}",
   *     "amount": "1"
   *   }
   * }`, */
  value: `{
    "description": {
      "moniker": "DAO Validator",
      "identity": "40DE997A35620049",
      "website": "https://daodao.zone",
      "securityContact": "noreply@noreply.com",
      "details": "A validator created and run by a DAO on DAO DAO."
    },
    "commission": {
      "rate": "0.100000000000000000",
      "maxRate": "0.200000000000000000",
      "maxChangeRate": "0.100000000000000000"
    },
    "minSelfDelegation": "1",
    "delegatorAddress": "juno1wthwv7wq7sgw5fu7u3qrtfxss8d2q2jx8wztzwagad4w20azdquseal8ph",
    "validatorAddress": "junovaloper1wthwv7wq7sgw5fu7u3qrtfxss8d2q2jx8wztzwagad4w20azdqus7q3dz8",
    "pubkey": {
      "typeUrl": "/cosmos.crypto.ed25519.PubKey",
      "value": {"@type":"/cosmos.crypto.ed25519.PubKey","key":"3w7URQLq21V9PcNZxLu0RkRFanaXB975uIUxnI+b/BU="}
    },
    "value": {
      "denom": "${NATIVE_DENOM}",
      "amount": "1000000"
    }
  }`,
})

const Component: ActionComponent = (props) => {
  return <StatelessCreateValidatorComponent {...props} options={{}} />
}

const useTransformToCosmos: UseTransformToCosmos<CreateValidatorData> = () =>
  useCallback(
    (data: CreateValidatorData) =>
      makeStargateMessage({
        stargate: {
          type_url: data.type_url,
          value: JSON.parse(data.value),
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<CreateValidatorData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'stargate' in msg && msg.stargate.typeUrl && msg.stargate.value
        ? {
            match: true,
            data: {
              type_url: msg.stargate.type_url,
              value: msg.stargate.value,
            },
          }
        : { match: false },
    [msg]
  )

export const createValidatorAction: Action<CreateValidatorData> = {
  key: ActionKey.CreateValidator,
  Icon: CreateValidatorIcon,
  label: 'Create Validator',
  description: 'Create validator transaction',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
