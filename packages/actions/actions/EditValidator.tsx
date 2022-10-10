import { useCallback, useMemo } from 'react'

import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'

import { makeStargateMessage } from '@dao-dao/utils'

import {
  EditValidatorIcon,
  EditValidatorComponent as StatelessEditValidatorComponent,
} from '../components'

interface EditValidatorData {
  type_url: string
  value: string
}

const useDefaults: UseDefaults<EditValidatorData> = () => ({
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
})

const Component: ActionComponent = (props) => {
  return <StatelessEditValidatorComponent {...props} options={{}} />
}

const useTransformToCosmos: UseTransformToCosmos<EditValidatorData> = () =>
  useCallback(
    (data: EditValidatorData) =>
      makeStargateMessage({
        stargate: {
          type_url: data.type_url,
          value: JSON.parse(data.value),
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<EditValidatorData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'stargate' in msg &&
      msg.stargate.type_url === '/cosmos.staking.v1beta1.MsgEditValidator' &&
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

export const editValidatorAction: Action<EditValidatorData> = {
  key: ActionKey.EditValidator,
  Icon: EditValidatorIcon,
  label: 'Edit Validator',
  description: 'Edit information about a DAO controlled validator',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
