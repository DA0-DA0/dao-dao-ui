import type { MsgExec } from 'cosmjs-types/cosmos/authz/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { LockWithKeyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeStargateMessage } from '@dao-dao/utils'

import { AuthzExecComponent as StatelessAuthzComponent } from '../components'

interface AuthzExecData {
  type_url: string
  value: MsgExec
}

const useDefaults: UseDefaults<AuthzExecData> = () => ({
  type_url: '/cosmos.authz.v1beta1.MsgExec',
  value: {
    grantee: '',
    msgs: [],
  },
})

const Component: ActionComponent = (props) => {
  return <StatelessAuthzComponent {...props} options={{}} />
}

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

export const makeAuthzExecAction: ActionMaker<AuthzExecData> = ({
  t,
  address,
}) => {
  const useTransformToCosmos: UseTransformToCosmos<AuthzExecData> = () =>
    useCallback(
      (data: AuthzExecData) =>
        makeStargateMessage({
          stargate: {
            type_url: data.type_url,
            value: {
              grantee: address,
              msgs: data.value.msgs,
            },
          },
        }),
      [address]
    )

  return {
    key: CoreActionKey.AuthzExec,
    Icon: LockWithKeyEmoji,
    label: t('title.authzExec'),
    description: t('info.authzExecDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
