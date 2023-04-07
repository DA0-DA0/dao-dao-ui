import { fromUtf8, toUtf8 } from '@cosmjs/encoding'
import Long from 'long'
import { useCallback, useMemo } from 'react'

import { KeyEmoji, Loader } from '@dao-dao/stateless'
import { Coin } from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_TOKEN,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodeRawProtobufMsg,
  encodeRawProtobufMsg,
  isDecodedStargateMsg,
  makeStargateMessage,
  nativeTokenDecimals,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput, SuspenseLoader } from '../../../../components'
import { useTokenBalances } from '../../../hooks'
import { AuthzAuthorizationComponent as StatelessAuthzAuthorizationComponent } from './Component'

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
  mode: 'grant' | 'revoke'
  authorizationTypeUrl?: AuthorizationTypeUrl
  customTypeUrl?: boolean
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
  mode: 'grant',
  authorizationTypeUrl: AuthorizationTypeUrl.Generic,
  customTypeUrl: false,
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
      fallback={<Loader />}
      forceFallback={
        // Manually trigger loader.
        balances.loading
      }
    >
      <StatelessAuthzAuthorizationComponent
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
        !objectMatchesStructure(msg.stargate.value, {
          grantee: {},
          granter: {},
        }) ||
        // Make sure this address is the granter.
        msg.stargate.value.granter !== address
      ) {
        return { match: false }
      }

      if (msg.stargate.typeUrl === TYPE_URL_MSG_GRANT) {
        let authorizationTypeUrl =
          msg.stargate.value.grant?.authorization?.typeUrl

        // If no authorization type, this is not a match
        if (!authorizationTypeUrl) {
          return { match: false }
        }

        switch (authorizationTypeUrl) {
          case AuthorizationTypeUrl.Generic: {
            return {
              match: true,
              data: {
                mode: 'grant',
                authorizationTypeUrl,
                customTypeUrl: false,
                msgTypeUrl: decodeRawProtobufMsg(
                  msg.stargate.value.grant!.authorization!
                ).value.msg,
                grantee: msg.stargate.value.grantee,
              },
            }
          }

          case AuthorizationTypeUrl.Spend: {
            const { spendLimit } = decodeRawProtobufMsg(
              msg.stargate.value.grant!.authorization!
            ).value

            return {
              match: true,
              data: {
                mode: 'grant',
                authorizationTypeUrl,
                customTypeUrl: false,
                grantee: msg.stargate.value.grantee,
                funds: spendLimit.map((c: Coin) => {
                  return {
                    amount: convertMicroDenomToDenomWithDecimals(
                      c.amount,
                      nativeTokenDecimals(c.denom) ?? NATIVE_TOKEN.decimals
                    ),
                    denom: c.denom,
                  }
                }),
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
                mode: 'grant',
                authorizationTypeUrl,
                customTypeUrl: false,
                grantee: msg.stargate.value.grantee,
                funds: decodedLimit.value.amounts.map((c: Coin) => {
                  return {
                    amount: convertMicroDenomToDenomWithDecimals(
                      c.amount,
                      nativeTokenDecimals(c.denom) ?? NATIVE_TOKEN.decimals
                    ),
                    denom: c.denom,
                  }
                }),
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
                mode: 'grant',
                authorizationTypeUrl,
                customTypeUrl: false,
                grantee: msg.stargate.value.grantee,
                funds: decodedLimit.value.amounts.map((c: Coin) => {
                  return {
                    amount: convertMicroDenomToDenomWithDecimals(
                      c.amount,
                      nativeTokenDecimals(c.denom) ?? NATIVE_TOKEN.decimals
                    ),
                    denom: c.denom,
                  }
                }),
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
            mode: 'revoke',
            customTypeUrl: false,
            grantee: msg.stargate.value.grantee,
            msgTypeUrl: msg.stargate.value.msgTypeUrl,
          },
        }
      }

      return { match: false }
    }, [msg])

  const useTransformToCosmos: UseTransformToCosmos<AuthzData> = () =>
    useCallback(
      ({
        mode,
        authorizationTypeUrl,
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
                    amount: convertDenomToMicroDenomWithDecimals(
                      c.amount,
                      nativeTokenDecimals(c.denom) ?? NATIVE_TOKEN.decimals
                    ).toString(),
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
                    amount: convertDenomToMicroDenomWithDecimals(
                      c.amount,
                      nativeTokenDecimals(c.denom) ?? NATIVE_TOKEN.decimals
                    ).toString(),
                    denom: c.denom,
                  }
                }),
              },
            }
            break
        }

        let authorization
        if (mode === 'grant') {
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
                      amount: convertDenomToMicroDenomWithDecimals(
                        c.amount,
                        nativeTokenDecimals(c.denom) ?? NATIVE_TOKEN.decimals
                      ).toString(),
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
              throw new Error('Unknown authorization type')
          }
        }

        // Expiration set to 10 years
        let date = new Date()
        date.setFullYear(date.getFullYear() + 10)
        let seconds = Long.fromInt(Math.round(date.getTime() / 1000))

        return makeStargateMessage({
          stargate: {
            typeUrl:
              mode === 'grant' ? TYPE_URL_MSG_GRANT : TYPE_URL_MSG_REVOKE,
            value: {
              ...(mode === 'grant' && authorization
                ? {
                    grant: {
                      authorization: encodeRawProtobufMsg(authorization),
                      expiration: {
                        seconds,
                      },
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
    key: ActionKey.AuthzAuthorization,
    Icon: KeyEmoji,
    label: t('title.authzAuthorization'),
    description: t('info.authzAuthorizationDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
