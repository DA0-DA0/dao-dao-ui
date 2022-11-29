import { useCallback, useMemo } from 'react'

import { UnlockEmoji } from '@dao-dao/stateless'
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

import { UnjailValidatorComponent as StatelessUnjailValidatorComponent } from '../components'

interface UnjailValidatorData {
  type_url: string
  value: string
}

const useDefaults: UseDefaults<UnjailValidatorData> = () => ({
  type_url: '/cosmos.slashing.v1beta1.MsgUnjail',
  value: `{
    "validator_addr": "<your validator address>"
  }`,
})

const Component: ActionComponent = (props) => {
  return <StatelessUnjailValidatorComponent {...props} options={{}} />
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UnjailValidatorData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'stargate' in msg &&
      msg.stargate.type_url === '/cosmos.slashing.v1beta1.MsgUnjail' &&
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

export const makeUnjailValidatorAction: ActionMaker<UnjailValidatorData> = ({
  t,
  context,
}) => {
  // Only DAOs.
  if (context.type !== ActionOptionsContextType.Dao) {
    return null
  }

  const useTransformToCosmos: UseTransformToCosmos<UnjailValidatorData> = () =>
    useCallback(
      (data: UnjailValidatorData) =>
        makeStargateMessage({
          stargate: {
            type_url: data.type_url,
            value: JSON.parse(data.value),
          },
        }),
      []
    )

  return {
    key: CoreActionKey.UnjailValidator,
    Icon: UnlockEmoji,
    label: 'Unjail Validator',
    description:
      'A transaction to allow a DAO controlled validator to rejoin the validation process.',
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
