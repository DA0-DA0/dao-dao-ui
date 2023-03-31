import { MsgGrant, MsgRevoke } from 'cosmjs-types/cosmos/authz/v1beta1/tx'
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
import {
  DecodedStargateMsg,
  decodeRawProtobufMsg,
  encodeRawProtobufMsg,
  isDecodedStargateMsg,
  makeStargateMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { AuthzAuthorizationComponent as StatelessAuthzComponent } from './Component'

const TYPE_URL_MSG_GRANT = '/cosmos.authz.v1beta1.MsgGrant'
const TYPE_URL_MSG_REVOKE = '/cosmos.authz.v1beta1.MsgRevoke'
const TYPE_URL_GENERIC_AUTHORIZATION =
  '/cosmos.authz.v1beta1.GenericAuthorization'

interface AuthzData {
  custom?: boolean
  typeUrl: string
  value: {
    grantee: string
    msgTypeUrl: string
  }
}

const useDefaults: UseDefaults<AuthzData> = () => ({
  custom: false,
  typeUrl: TYPE_URL_MSG_GRANT,
  value: {
    grantee: '',
    msgTypeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
  },
})

const Component: ActionComponent = (props) => (
  <StatelessAuthzComponent
    {...props}
    options={{
      AddressInput,
    }}
  />
)

const isMsgGrantGenericAuthorization = (
  msg: DecodedStargateMsg
): msg is DecodedStargateMsg<MsgGrant> =>
  objectMatchesStructure(msg, {
    stargate: {
      typeUrl: {},
      value: {
        grant: {
          authorization: {},
        },
      },
    },
  }) &&
  !!msg.stargate.value.grant &&
  !!msg.stargate.value.grant.authorization &&
  (msg.stargate.value as MsgGrant).grant!.authorization!.typeUrl ===
    TYPE_URL_GENERIC_AUTHORIZATION

export const makeAuthzAuthorizationAction: ActionMaker<AuthzData> = ({
  t,
  address,
}) => {
  const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzData> = (
    msg: Record<string, any>
  ) =>
    useMemo(() => {
      if (
        !isDecodedStargateMsg(msg) ||
        (msg.stargate.typeUrl !== TYPE_URL_MSG_GRANT &&
          msg.stargate.typeUrl !== TYPE_URL_MSG_REVOKE) ||
        // Make sure this address is the granter.
        !('granter' in msg.stargate.value) ||
        msg.stargate.value.granter !== address
      ) {
        return { match: false }
      }

      return msg.stargate.typeUrl === TYPE_URL_MSG_GRANT &&
        isMsgGrantGenericAuthorization(msg)
        ? {
            match: true,
            data: {
              custom: false,
              typeUrl: msg.stargate.typeUrl,
              value: {
                msgTypeUrl: decodeRawProtobufMsg(
                  msg.stargate.value.grant!.authorization!
                ).value.msg,
                grantee: msg.stargate.value.grantee,
              },
            },
          }
        : msg.stargate.typeUrl === TYPE_URL_MSG_REVOKE
        ? {
            match: true,
            data: {
              custom: false,
              ...(msg as DecodedStargateMsg<MsgRevoke>).stargate,
            },
          }
        : { match: false }
    }, [msg])

  const useTransformToCosmos: UseTransformToCosmos<AuthzData> = () =>
    useCallback(
      ({ typeUrl, value: { grantee, msgTypeUrl } }: AuthzData) =>
        makeStargateMessage({
          stargate: {
            typeUrl,
            value: {
              ...(typeUrl === TYPE_URL_MSG_GRANT
                ? {
                    grant: {
                      authorization: encodeRawProtobufMsg({
                        typeUrl: TYPE_URL_GENERIC_AUTHORIZATION,
                        value: {
                          msg: msgTypeUrl,
                        },
                      }),
                    },
                  }
                : {
                    msgTypeUrl,
                  }),
              grantee,
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
