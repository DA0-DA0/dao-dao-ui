import type {
  MsgExec,
  MsgGrant,
  MsgRevoke,
} from 'cosmjs-types/cosmos/authz/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { makeStargateMessage } from '@dao-dao/utils'

import {
  AuthzIcon,
  AuthzComponent as StatelessAuthzComponent,
} from '../components'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../types'

interface AuthzData {
  type_url: string
  value: MsgExec | MsgGrant | MsgRevoke
}

const useDefaults: UseDefaults<AuthzData> = () => ({
  type_url: '/cosmos.authz.v1beta1.MsgGrant',
  value: {
    grantee: '',
    granter: '',
    msgTypeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
  },
})

const Component: ActionComponent = (props) => {
  return <StatelessAuthzComponent {...props} options={{}} />
}

const useTransformToCosmos: UseTransformToCosmos<AuthzData> = (
  coreAddress: string
) =>
  useCallback(
    (data: AuthzData) =>
      makeStargateMessage({
        stargate: {
          type_url: data.type_url,
          value: {
            ...data.value,
            granter: coreAddress,
          },
        },
      }),
    [coreAddress]
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzData> = (
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

export const authzAction: Action<AuthzData> = {
  key: ActionKey.Authz,
  Icon: AuthzIcon,
  label: 'Authz',
  description:
    'Grant / revoke authorizations, or execute an action on behalf of another account.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
}
