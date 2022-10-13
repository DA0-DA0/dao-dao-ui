import { useCallback, useMemo } from 'react'

import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'

import { NATIVE_DENOM, makeStargateMessage } from '@dao-dao/utils'

import {
  CreateValidatorIcon,
  CreateValidatorComponent as StatelessCreateValidatorComponent,
} from '../components'

interface CreateValidatorData {
  type_url: string
  value: string
}

const useDefaults: UseDefaults<CreateValidatorData> = () => ({
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
      'stargate' in msg &&
      msg.stargate.type_url === '/cosmos.staking.v1beta1.MsgCreateValidator' &&
      msg.stargate.value
        ? {
            match: true,
            data: {
              type_url: msg.stargate.type_url,
              value: JSON.stringify(msg.stargate.value, null, 2),
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
