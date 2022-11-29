import { useCallback, useMemo } from 'react'

import { PencilEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeStargateMessage } from '@dao-dao/utils'

import { EditValidatorComponent as StatelessEditValidatorComponent } from '../components'

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

export const makeEditValidatorAction: ActionMaker<EditValidatorData> = ({
  t,
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
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

  return {
    key: CoreActionKey.EditValidator,
    Icon: PencilEmoji,
    label: 'Edit Validator',
    description: 'Edit information about a DAO controlled validator',
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
