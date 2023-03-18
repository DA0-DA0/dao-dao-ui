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
import {
  DecodedStargateMsg,
  decodeRawProtobufMsg,
  encodeRawProtobufMsg,
  isDecodedStargateMsg,
  makeStargateMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput, SuspenseLoader } from '../../components'
import { AuthzAuthorizationComponent as StatelessAuthzComponent } from '../components/AuthzAuthorization'
import { useTokenBalances } from '../hooks'

import { SendAuthorization } from 'juno-network/main/codegen/cosmos/bank/v1beta1/authz'

const TYPE_URL_MSG_GRANT = '/cosmos.authz.v1beta1.MsgGrant'
const TYPE_URL_MSG_REVOKE = '/cosmos.authz.v1beta1.MsgRevoke'
const TYPE_URL_GENERIC_AUTHORIZATION =
  '/cosmos.authz.v1beta1.GenericAuthorization'

export enum AuthorizationTypeUrl {
  Generic = '/cosmos.authz.v1beta1.GenericAuthorization',
  ContractExecution = '/cosmwasm.wasm.v1.ContractExecutionAuthorization',
  ContractMigration = '/cosmwasm.wasm.v1.ContractMigrationAuthorization',
  Spend = '/cosmos.bank.v1beta1.SendAuthorization',
}

export enum FilterTypes {
  All = '/cosmwasm.wasm.v1.AllowAllMessagesFilter',
  Keys = '/cosmwasm.wasm.v1.AcceptedMessageKeysFilter',
  Msg = '/cosmwasm.wasm.v1.AcceptedMessagesFilter',
}

// TODO?
/* export enum LimitOptions {} */

export interface AuthzData {
  authorizationTypeUrl?: AuthorizationTypeUrl
  customTypeUrl?: boolean
  typeUrl: string
  grantee: string
  contract?: string
  funds?: { denom: string; amount: number }[]
  msgTypeUrl?: string
  filterType?: FilterTypes
  filterKeys?: string[]
  filterMsg?: string
}

const useDefaults: UseDefaults<AuthzData> = () => ({
  authorizationTypeUrl: AuthorizationTypeUrl.Generic,
  customTypeUrl: false,
  typeUrl: TYPE_URL_MSG_GRANT,
  grantee: '',
  filterType: FilterTypes.All,
  filterKeys: [],
  filterMsg: '[]',
  funds: [],
  contract: '',
  msgTypeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
})

const Component: ActionComponent = (props) => {
  const tokenBalances = useTokenBalances()

  return (
    <SuspenseLoader
      fallback={<ActionCardLoader />}
      forceFallback={
        // Manually trigger loader.
        tokenBalances.loading
      }
    >
      <StatelessAuthzComponent
        {...props}
        options={{
          AddressInput,
          balances: tokenBalances.loading ? [] : tokenBalances.data,
        }}
      />
    </SuspenseLoader>
  )
}

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

      console.log('decoded: ' + msg)

      // TODO check other authorization types

      return msg.stargate.typeUrl === TYPE_URL_MSG_GRANT &&
        isMsgGrantGenericAuthorization(msg)
        ? {
            match: true,
            data: {
              // TODO check this
              authorizationTypeUrl:
                msg.stargate.value.grant!.authorization!.typeUrl,
              customTypeUrl: false,
              typeUrl: msg.stargate.typeUrl,
              // TODO check
              msgTypeUrl: decodeRawProtobufMsg(
                msg.stargate.value.grant!.authorization!
              ).value.msg,
              grantee: msg.stargate.value.grantee,
              // granter: msg.stargate.value.granter,
            },
          }
        : msg.stargate.typeUrl === TYPE_URL_MSG_REVOKE
        ? {
            match: true,
            data: {
              customTypeUrl: false,
              ...(msg as DecodedStargateMsg<MsgRevoke>).stargate,
            },
          }
        : { match: false }
    }, [msg])

  const useTransformToCosmos: UseTransformToCosmos<AuthzData> = () =>
    useCallback(
      ({
        authorizationTypeUrl,
        typeUrl,
        grantee,
        msgTypeUrl,
        filterKeys,
        filterMsg,
        filterType,
        funds,
        contract,
      }: AuthzData) => {
        let filter
        switch (filterType) {
          case FilterTypes.All:
            filter = {
              typeUrl: filterType as string,
              value: {},
            }
            break
          case FilterTypes.Keys:
            filter = {
              typeUrl: filterType as string,
              value: {
                keys: filterKeys,
              },
            }
            break
          // TODO this probably won't work?
          case FilterTypes.Msg:
            filter = {
              typeUrl: filterType as string,
              value: {
                msg: filterMsg,
              },
            }
            break
        }

        let authorization
        if (typeUrl === TYPE_URL_MSG_GRANT) {
          switch (authorizationTypeUrl) {
            // WORKS
            case AuthorizationTypeUrl.Generic:
              authorization = {
                typeUrl: authorizationTypeUrl as string,
                value: {
                  msg: msgTypeUrl,
                },
              }
              break
            // BROKEN
            case AuthorizationTypeUrl.Spend:
              authorization = {
                typeUrl: authorizationTypeUrl as string,
                value: {
                  // BROKEN
                  spendLimit: funds?.map((c) => {
                    return encodeRawProtobufMsg({
                      typeUrl: '/cosmos.base.v1beta1.Coin',
                      value: {
                        amount: c.amount.toString(),
                        denom: c.denom,
                      },
                    })
                  }),
                  // BROKEN
                  /* spendLimit: funds?.map((c) => {
                   *   return {
                   *     typeUrl: '/cosmos.base.v1beta1.Coin',
                   *     value: {
                   *       amount: c.amount.toString(),
                   *       denom: c.denom,
                   *     },
                   *   }
                   * }), */
                  // BROKEN
                  /* spendLimit: funds, */
                  // BROKEN
                  /* spendLimit: [], */
                },
              }
              // BROKEN
              /* authorization = {
               *   typeUrl: authorizationTypeUrl,
               *   value: SendAuthorization.encode({
               *     spendLimit: funds,
               *   }).finish(),
               * } */
              break
            // BROKEN
            case AuthorizationTypeUrl.ContractExecution:
              authorization = {
                typeUrl: authorizationTypeUrl as string,
                value: {
                  grants: [
                    {
                      contract,
                      // WORKS
                      filter: encodeRawProtobufMsg(filter),
                      // BROKEN
                      limit: encodeRawProtobufMsg({
                        typeUrl: '/cosmwasm.wasm.v1.MaxFundsLimit',
                        value: {
                          // BROKEN
                          /* amounts: funds, */
                          // BROKEN
                          amounts: funds?.map((c) => {
                            return encodeRawProtobufMsg({
                              typeUrl: '/cosmos.base.v1beta1.Coin',
                              value: {
                                amount: c.amount.toString(),
                                denom: c.denom,
                              },
                            })
                          }),
                        },
                      }),
                    },
                  ],
                },
              }
              break
            default:
              console.error('Unrecognized type')
          }
        }

        console.log(authorization)

        let unencoded = {
          stargate: {
            typeUrl,
            value: {
              ...(typeUrl === TYPE_URL_MSG_GRANT
                ? {
                    grant: {
                      /* authorization: encodeRawProtobufMsg(authorization), */
                      authorization,
                    },
                  }
                : {
                    msgTypeUrl,
                  }),
              grantee,
              granter: address,
            },
          },
        }

        console.log(unencoded)

        let msg = makeStargateMessage(unencoded)

        console.log(msg)

        return msg
      },
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
