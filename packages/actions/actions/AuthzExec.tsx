import { useCallback, useMemo } from 'react'

import { makeStargateMessage } from '@dao-dao/utils'

import {
  AuthzExecIcon,
  AuthzExecComponent as StatelessAuthzComponent,
} from '../components'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../types'

interface AuthzExecData {
  type_url: string
  value: {
    typeUrl: string
    value: any
  }
}

const useDefaults: UseDefaults<AuthzExecData> = () => ({
  type_url: '/cosmos.authz.v1beta1.MsgExec',
  value: {
    typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
    value: '',
  },
})

const Component: ActionComponent = (props) => {
  console.log(props)

  return <StatelessAuthzComponent {...props} options={{}} />
}

const useTransformToCosmos: UseTransformToCosmos<AuthzExecData> = (
  coreAddress: string
) =>
  useCallback(
    (data: AuthzExecData) =>
      makeStargateMessage({
        stargate: {
          type_url: data.type_url,
          value: {
            grantee: coreAddress,
            msgs: [
              {
                typeUrl: data.value.typeUrl,
                value: data.value.value,
              },
            ],
          },
        },
      }),
    [coreAddress]
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzExecData> = (
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

export const authzExecAction: Action<AuthzExecData> = {
  key: ActionKey.AuthzExec,
  Icon: AuthzExecIcon,
  label: 'Authz Exec',
  description: 'Perform an action on behalf of another account.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
