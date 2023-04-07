import { fromUtf8, toUtf8 } from '@cosmjs/encoding'
import JSON5 from 'json5'
import Long from 'long'
import { useCallback } from 'react'

import { KeyEmoji, Loader } from '@dao-dao/stateless'
import { Coin, DecodedStargateMsg } from '@dao-dao/types'
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
import { AuthzGrantRevokeComponent as StatelessAuthzAuthorizationComponent } from './Component'
import {
  AuthorizationTypeUrl,
  AuthzGrantRevokeData,
  FilterTypes,
  LimitTypes,
} from './types'

const TYPE_URL_MSG_GRANT = '/cosmos.authz.v1beta1.MsgGrant'
const TYPE_URL_MSG_REVOKE = '/cosmos.authz.v1beta1.MsgRevoke'

const useDefaults: UseDefaults<AuthzGrantRevokeData> = () => ({
  mode: 'grant',
  authorizationTypeUrl: AuthorizationTypeUrl.Generic,
  customTypeUrl: false,
  grantee: '',
  filterType: FilterTypes.All,
  filterKeys: '',
  filterMsgs: '{}',
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

export const makeAuthzGrantRevokeAction: ActionMaker<AuthzGrantRevokeData> = ({
  t,
  address,
}) => {
  const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzGrantRevokeData> = (
    msg: Record<string, any>
  ) => {
    const defaults = useDefaults()

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
      const authorizationTypeUrl =
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
              ...defaults,
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
              ...defaults,
              mode: 'grant',
              authorizationTypeUrl,
              customTypeUrl: false,
              grantee: msg.stargate.value.grantee,
              funds: spendLimit.map(({ denom, amount }: Coin) => ({
                amount: convertMicroDenomToDenomWithDecimals(
                  amount,
                  nativeTokenDecimals(denom) ?? NATIVE_TOKEN.decimals
                ),
                denom,
              })),
            },
          }
        }

        case AuthorizationTypeUrl.ContractExecution:
        case AuthorizationTypeUrl.ContractMigration: {
          const { contract, filter, limit } = decodeRawProtobufMsg(
            msg.stargate.value.grant!.authorization!
          ).value.grants[0]

          const decodedLimit = decodeRawProtobufMsg(limit)
          const limitType = decodedLimit.typeUrl as LimitTypes

          const decodedFilter = decodeRawProtobufMsg(filter)
          const filterType = decodedFilter.typeUrl as FilterTypes

          // Type guard, should always pass until new types are added.
          if (
            !Object.values(LimitTypes).includes(limitType) ||
            !Object.values(FilterTypes).includes(filterType)
          ) {
            return { match: false }
          }

          const filterMsgs =
            filterType === FilterTypes.Msgs
              ? (decodedFilter.value.messages as Uint8Array[]).map((msg) =>
                  JSON.parse(fromUtf8(msg))
                )
              : []

          return {
            match: true,
            data: {
              ...defaults,
              mode: 'grant',
              authorizationTypeUrl,
              customTypeUrl: false,
              grantee: msg.stargate.value.grantee,
              funds:
                decodedLimit.value.amounts?.map(({ denom, amount }: Coin) => ({
                  amount: convertMicroDenomToDenomWithDecimals(
                    amount,
                    nativeTokenDecimals(denom) ?? NATIVE_TOKEN.decimals
                  ),
                  denom,
                })) ?? [],
              contract,
              filterType,
              filterKeys:
                filterType === FilterTypes.Keys
                  ? decodedFilter.value.keys.join()
                  : '',
              filterMsgs: JSON.stringify(
                filterMsgs.length === 0
                  ? {}
                  : filterMsgs.length === 1
                  ? filterMsgs[0]
                  : filterMsgs,
                null,
                2
              ),
              limitType,
              calls:
                limitType === LimitTypes.Calls
                  ? (decodedLimit.value.remaining as Long).toNumber()
                  : limitType === LimitTypes.Combined
                  ? (decodedLimit.value.callsRemaining as Long).toNumber()
                  : 0,
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
          ...defaults,
          mode: 'revoke',
          customTypeUrl: false,
          grantee: msg.stargate.value.grantee,
          msgTypeUrl: msg.stargate.value.msgTypeUrl,
        },
      }
    }

    return { match: false }
  }

  const useTransformToCosmos: UseTransformToCosmos<AuthzGrantRevokeData> = () =>
    useCallback(
      ({
        mode,
        authorizationTypeUrl,
        grantee,
        msgTypeUrl,
        filterKeys,
        filterMsgs,
        filterType,
        funds,
        contract,
        limitType,
        calls,
      }: AuthzGrantRevokeData) => {
        let filter: DecodedStargateMsg['stargate'] = {
          typeUrl: FilterTypes.All,
          value: {},
        }
        switch (filterType) {
          case FilterTypes.Keys:
            filter = {
              typeUrl: filterType,
              value: {
                keys: filterKeys.split(',').map((k) => k.trim()),
              },
            }
            break
          case FilterTypes.Msgs:
            const parsed = JSON5.parse(filterMsgs)
            filter = {
              typeUrl: filterType,
              value: {
                messages: Array.isArray(parsed)
                  ? parsed
                  : [parsed].map((m: unknown) => toUtf8(JSON.stringify(m))),
              },
            }
            break
        }

        let limit: DecodedStargateMsg['stargate']
        switch (limitType) {
          case LimitTypes.Combined:
            limit = {
              typeUrl: limitType,
              value: {
                callsRemaining: Long.fromInt(calls as number),
                amounts: funds.map(({ denom, amount }) => ({
                  amount: convertDenomToMicroDenomWithDecimals(
                    amount,
                    nativeTokenDecimals(denom) ?? NATIVE_TOKEN.decimals
                  ).toString(),
                  denom,
                })),
              },
            }
            break
          case LimitTypes.Calls:
            limit = {
              typeUrl: limitType,
              value: {
                remaining: Long.fromInt(calls as number),
              },
            }
            break
          case LimitTypes.Funds:
            limit = {
              typeUrl: limitType,
              value: {
                amounts: funds.map(({ denom, amount }) => ({
                  amount: convertDenomToMicroDenomWithDecimals(
                    amount,
                    nativeTokenDecimals(denom) ?? NATIVE_TOKEN.decimals
                  ).toString(),
                  denom,
                })),
              },
            }
            break
        }

        let authorization: DecodedStargateMsg['stargate'] | undefined
        if (mode === 'grant') {
          switch (authorizationTypeUrl) {
            case AuthorizationTypeUrl.Generic:
              authorization = {
                typeUrl: authorizationTypeUrl,
                value: {
                  msg: msgTypeUrl,
                },
              }
              break
            case AuthorizationTypeUrl.Spend:
              authorization = {
                typeUrl: authorizationTypeUrl,
                value: {
                  spendLimit: funds.map(({ denom, amount }) => ({
                    amount: convertDenomToMicroDenomWithDecimals(
                      amount,
                      nativeTokenDecimals(denom) ?? NATIVE_TOKEN.decimals
                    ).toString(),
                    denom,
                  })),
                },
              }
              break
            case AuthorizationTypeUrl.ContractExecution:
              authorization = {
                typeUrl: authorizationTypeUrl,
                value: {
                  grants: [
                    {
                      contract,
                      filter: encodeRawProtobufMsg(filter),
                      limit: encodeRawProtobufMsg(limit),
                    },
                  ],
                },
              }
              break
            case AuthorizationTypeUrl.ContractMigration:
              authorization = {
                typeUrl: authorizationTypeUrl,
                value: {
                  grants: [
                    {
                      contract,
                      filter: encodeRawProtobufMsg(filter),
                      limit: encodeRawProtobufMsg(limit),
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
        const date = new Date()
        date.setFullYear(date.getFullYear() + 10)
        const seconds = Long.fromInt(Math.round(date.getTime() / 1000))

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
    key: ActionKey.AuthzGrantRevoke,
    Icon: KeyEmoji,
    label: t('title.authzAuthorization'),
    description: t('info.authzAuthorizationDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
