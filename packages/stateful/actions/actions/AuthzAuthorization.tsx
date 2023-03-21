import { fromUtf8, toUtf8 } from '@cosmjs/encoding'
import Long from 'long'
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
  decodeRawProtobufMsg,
  encodeRawProtobufMsg,
  isDecodedStargateMsg,
  makeStargateMessage,
} from '@dao-dao/utils'

import { AddressInput, SuspenseLoader } from '../../components'
import { AuthzAuthorizationComponent as StatelessAuthzComponent } from '../components/AuthzAuthorization'
import { useTokenBalances } from '../hooks'

const TYPE_URL_MSG_GRANT = '/cosmos.authz.v1beta1.MsgGrant'
const TYPE_URL_MSG_REVOKE = '/cosmos.authz.v1beta1.MsgRevoke'

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

export enum LimitTypes {
  Combined = '/cosmwasm.wasm.v1.CombinedLimit',
  Calls = '/cosmwasm.wasm.v1.MaxCallsLimit',
  Funds = '/cosmwasm.wasm.v1.MaxFundsLimit',
}

export interface AuthzData {
  authorizationTypeUrl?: AuthorizationTypeUrl
  customTypeUrl?: boolean
  typeUrl: string
  grantee: string
  contract?: string
  funds?: { denom: string; amount: number }[]
  msgTypeUrl?: string
  filterType?: FilterTypes
  filterKeys?: string
  filterMsg?: string
  limitType?: LimitTypes
  calls?: number
}

const useDefaults: UseDefaults<AuthzData> = () => ({
  authorizationTypeUrl: AuthorizationTypeUrl.Generic,
  customTypeUrl: false,
  typeUrl: TYPE_URL_MSG_GRANT,
  grantee: '',
  filterType: FilterTypes.All,
  filterKeys: '',
  filterMsg: '{}',
  funds: [],
  contract: '',
  calls: 10,
  limitType: LimitTypes.Calls,
  msgTypeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
})

const Component: ActionComponent = (props) => {
  const balances = useTokenBalances()

  return (
    <SuspenseLoader
      fallback={<ActionCardLoader />}
      forceFallback={
        // Manually trigger loader.
        balances.loading
      }
    >
      <StatelessAuthzComponent
        {...props}
        options={{
          AddressInput,
          balances,
        }}
      />
    </SuspenseLoader>
  )
}

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

      if (msg.stargate.typeUrl === TYPE_URL_MSG_GRANT) {
        let authorizationTypeUrl =
          msg.stargate.value.grant!.authorization!.typeUrl

        // If no authorization type, this is not a match
        if (!authorizationTypeUrl) {
          return { match: false }
        }

        switch (authorizationTypeUrl) {
          case AuthorizationTypeUrl.Generic: {
            return {
              match: true,
              data: {
                authorizationTypeUrl,
                customTypeUrl: false,
                typeUrl: msg.stargate.typeUrl,
                msgTypeUrl: decodeRawProtobufMsg(
                  msg.stargate.value.grant!.authorization!
                ).value.msg,
                grantee: msg.stargate.value.grantee,
              },
            }
          }

          case AuthorizationTypeUrl.Spend: {
            let { spendLimit } = decodeRawProtobufMsg(
              msg.stargate.value.grant!.authorization!
            ).value
            return {
              match: true,
              data: {
                authorizationTypeUrl,
                customTypeUrl: false,
                typeUrl: msg.stargate.typeUrl,
                grantee: msg.stargate.value.grantee,
                funds: spendLimit,
              },
            }
          }

          case AuthorizationTypeUrl.ContractExecution: {
            let { contract, filter, limit } = decodeRawProtobufMsg(
              msg.stargate.value.grant!.authorization!
            ).value.grants[0]
            let decodedLimit = decodeRawProtobufMsg(limit)
            let decodedFilter = decodeRawProtobufMsg(filter)
            return {
              match: true,
              data: {
                authorizationTypeUrl,
                customTypeUrl: false,
                typeUrl: msg.stargate.typeUrl,
                grantee: msg.stargate.value.grantee,
                funds: decodedLimit.value.amounts,
                contract,
                filterType: decodedFilter?.typeUrl as FilterTypes,
                filterKeys: decodedFilter.value?.keys?.join() || '',
                filterMsg: fromUtf8(decodedFilter?.value?.messages) || '{}',
                limitType: decodedLimit?.typeUrl as LimitTypes,
                calls:
                  decodedLimit?.value?.remaining ||
                  decodedLimit?.value?.callsRemaining ||
                  0,
              },
            }
          }

          case AuthorizationTypeUrl.ContractMigration: {
            let { contract, filter, limit } = decodeRawProtobufMsg(
              msg.stargate.value.grant!.authorization!
            ).value.grants[0]
            let decodedLimit = decodeRawProtobufMsg(limit)
            let decodedFilter = decodeRawProtobufMsg(filter)
            return {
              match: true,
              data: {
                authorizationTypeUrl,
                customTypeUrl: false,
                typeUrl: msg.stargate.typeUrl,
                grantee: msg.stargate.value.grantee,
                funds: decodedLimit.value.amounts,
                contract,
                filterType: decodedFilter?.typeUrl as FilterTypes,
                filterKeys: decodedFilter.value?.keys?.join() || '',
                filterMsg: fromUtf8(decodedFilter?.value?.messages) || '{}',
                limitType: decodedLimit?.typeUrl as LimitTypes,
                calls:
                  decodedLimit?.value?.remaining ||
                  decodedLimit?.value?.callsRemaining ||
                  0,
              },
            }
          }

          default:
            return { match: false }
        }
      } else if (msg.stargate.typeUrl === TYPE_URL_MSG_REVOKE) {
        return {
          match: true,
          data: {
            customTypeUrl: false,
            typeUrl: msg.stargate.typeUrl,
            grantee: msg.stargate.value.grantee,
            msgTypeUrl: msg.stargate.value.msgTypeUrl,
          },
        }
      } else {
        return { match: false }
      }
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
        limitType,
        calls,
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
                keys: filterKeys?.split(','),
              },
            }
            break
          case FilterTypes.Msg:
            filter = {
              typeUrl: filterType as string,
              value: {
                messages: [toUtf8(filterMsg as string)],
              },
            }
            break
        }

        let limit
        switch (limitType) {
          case LimitTypes.Combined:
            limit = {
              typeUrl: limitType as string,
              value: {
                callsRemaining: Long.fromInt(calls as number),
                amounts: funds?.map((c) => {
                  return {
                    amount: c.amount.toString(),
                    denom: c.denom,
                  }
                }),
              },
            }
            break
          case LimitTypes.Calls:
            limit = {
              typeUrl: limitType as string,
              value: {
                remaining: Long.fromInt(calls as number),
              },
            }
            break
          case LimitTypes.Funds:
            limit = {
              typeUrl: limitType as string,
              value: {
                amounts: funds?.map((c) => {
                  return {
                    amount: c.amount.toString(),
                    denom: c.denom,
                  }
                }),
              },
            }
            break
        }

        let authorization
        if (typeUrl === TYPE_URL_MSG_GRANT) {
          switch (authorizationTypeUrl) {
            case AuthorizationTypeUrl.Generic:
              authorization = {
                typeUrl: authorizationTypeUrl as string,
                value: {
                  msg: msgTypeUrl,
                },
              }
              break
            case AuthorizationTypeUrl.Spend:
              authorization = {
                typeUrl: authorizationTypeUrl as string,
                value: {
                  spendLimit: funds?.map((c) => {
                    return {
                      amount: c.amount.toString(),
                      denom: c.denom,
                    }
                  }),
                },
              }
              break
            case AuthorizationTypeUrl.ContractExecution:
              authorization = {
                typeUrl: authorizationTypeUrl as string,
                value: {
                  grants: [
                    {
                      contract,
                      filter: encodeRawProtobufMsg(filter as any),
                      limit: encodeRawProtobufMsg(limit as any),
                    },
                  ],
                },
              }
              break
            case AuthorizationTypeUrl.ContractMigration:
              authorization = {
                typeUrl: authorizationTypeUrl as string,
                value: {
                  grants: [
                    {
                      contract,
                      filter: encodeRawProtobufMsg(filter as any),
                      limit: encodeRawProtobufMsg(limit as any),
                    },
                  ],
                },
              }
              break

            default:
              console.error('Unrecognized type')
          }
        }

        return makeStargateMessage({
          stargate: {
            typeUrl,
            value: {
              ...(typeUrl === TYPE_URL_MSG_GRANT
                ? {
                    grant: {
                      authorization: encodeRawProtobufMsg(authorization as any),
                    },
                  }
                : {
                    msgTypeUrl,
                  }),
              grantee,
              granter: address,
            },
          },
        })
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
