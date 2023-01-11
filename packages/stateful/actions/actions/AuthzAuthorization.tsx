import type { MsgGrant, MsgRevoke } from 'cosmjs-types/cosmos/authz/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { ActionCardLoader, KeyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeStargateMessage } from '@dao-dao/utils'

import { AddressInput, SuspenseLoader } from '../../components'
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
  return (
    <SuspenseLoader fallback={<ActionCardLoader />}>
      <StatelessAuthzComponent
        {...props}
        options={{
          AddressInput,
        }}
      />
    </SuspenseLoader>
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'stargate' in msg &&
      msg.stargate.value &&
      (msg.stargate.type_url === '/cosmos.authz.v1beta1.MsgGrant' ||
        msg.stargate.type_url === '/cosmos.authz.v1beta1.MsgRevoke')
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

export const makeAuthzAuthorizationAction: ActionMaker<AuthzData> = ({
  t,
  address,
}) => {
  const useTransformToCosmos: UseTransformToCosmos<AuthzData> = () =>
    useCallback(
      (data: AuthzData) =>
        makeStargateMessage({
          stargate: {
            type_url: data.type_url,
            value: {
              ...data.value,
              granter: address,
            },
          },
        }),
      []
    )

  return {
    key: CoreActionKey.AuthzAuthorization,
    Icon: KeyEmoji,
    label: t('title.authzAuthorization'),
    description: t('info.authzAuthorizationDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
