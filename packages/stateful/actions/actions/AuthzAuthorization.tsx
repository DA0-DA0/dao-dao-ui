import type { MsgGrant, MsgRevoke } from 'cosmjs-types/cosmos/authz/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { KeyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeStargateMessage } from '@dao-dao/utils'

import { AuthzAuthorizationComponent as StatelessAuthzComponent } from '../components/AuthzAuthorization'

interface AuthzData {
  custom?: boolean
  type_url: string
  value: MsgGrant | MsgRevoke
}

const useDefaults: UseDefaults<AuthzData> = () => ({
  custom: false,
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

export const makeAuthzAuthorizationAction: ActionMaker<AuthzData> = ({ t }) => {
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

  return {
    key: CoreActionKey.AuthzAuthorization,
    Icon: KeyEmoji,
    label: 'Authz Grant / Revoke',
    description:
      'Grant / revoke authorizations that allow other accounts to perform actions on behalf of the DAO.',
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
