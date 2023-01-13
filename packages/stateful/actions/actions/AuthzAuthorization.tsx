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
import { isDecodedStargateMsg, makeStargateMessage } from '@dao-dao/utils'

import { AddressInput, SuspenseLoader } from '../../components'
import { AuthzAuthorizationComponent as StatelessAuthzComponent } from '../components/AuthzAuthorization'

interface AuthzData {
  custom?: boolean
  typeUrl: string
  value: MsgGrant | MsgRevoke
}

const useDefaults: UseDefaults<AuthzData> = () => ({
  custom: false,
  typeUrl: '/cosmos.authz.v1beta1.MsgGrant',
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
      isDecodedStargateMsg(msg) &&
      (msg.stargate.typeUrl === '/cosmos.authz.v1beta1.MsgGrant' ||
        msg.stargate.typeUrl === '/cosmos.authz.v1beta1.MsgRevoke')
        ? {
            match: true,
            data: msg.stargate,
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
            typeUrl: data.typeUrl,
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
