import { fromUtf8, toUtf8 } from '@cosmjs/encoding'
import JSON5 from 'json5'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  KeyEmoji,
  Loader,
} from '@dao-dao/stateless'
import { Coin, makeStargateMessage } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { GenericAuthorization } from '@dao-dao/types/protobuf/codegen/cosmos/authz/v1beta1/authz'
import {
  MsgGrant,
  MsgRevoke,
} from '@dao-dao/types/protobuf/codegen/cosmos/authz/v1beta1/tx'
import { SendAuthorization } from '@dao-dao/types/protobuf/codegen/cosmos/bank/v1beta1/authz'
import {
  AcceptedMessageKeysFilter,
  AcceptedMessagesFilter,
  CombinedLimit,
  ContractExecutionAuthorization,
  ContractGrant,
  ContractMigrationAuthorization,
  MaxCallsLimit,
} from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/authz'
import { Any } from '@dao-dao/types/protobuf/codegen/google/protobuf/any'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  getTokenForChainIdAndDenom,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput, SuspenseLoader } from '../../../../components'
import { useTokenBalances } from '../../../hooks'
import { useActionOptions } from '../../../react'
import { AuthzGrantRevokeComponent as StatelessAuthzAuthorizationComponent } from './Component'
import {
  ACTION_TYPES,
  AUTHORIZATION_TYPES,
  AuthzGrantRevokeData,
  FILTER_TYPES,
  LIMIT_TYPES,
} from './types'

const Component: ActionComponent = (props) => {
  const balances = useTokenBalances()

  const { context } = useActionOptions()
  const { watch } = useFormContext<AuthzGrantRevokeData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      <ChainProvider chainId={chainId}>
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
      </ChainProvider>
    </>
  )
}

export const makeAuthzGrantRevokeAction: ActionMaker<AuthzGrantRevokeData> = (
  options
) => {
  const {
    t,
    chain: { chain_id: currentChainId },
  } = options

  const useDefaults: UseDefaults<AuthzGrantRevokeData> = () => ({
    chainId: currentChainId,
    mode: 'grant',
    authorizationTypeUrl: AUTHORIZATION_TYPES[0].type.typeUrl,
    customTypeUrl: false,
    grantee: '',
    filterTypeUrl: FILTER_TYPES[0].type.typeUrl,
    filterKeys: '',
    filterMsgs: '{}',
    funds: [],
    contract: '',
    calls: 10,
    limitTypeUrl: LIMIT_TYPES[0].type.typeUrl,
    msgTypeUrl: ACTION_TYPES[0].type.typeUrl,
  })

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzGrantRevokeData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    const defaults = useDefaults() as AuthzGrantRevokeData

    if (
      !isDecodedStargateMsg(msg) ||
      (msg.stargate.typeUrl !== MsgGrant.typeUrl &&
        msg.stargate.typeUrl !== MsgRevoke.typeUrl) ||
      !objectMatchesStructure(msg.stargate.value, {
        grantee: {},
        granter: {},
      })
    ) {
      return { match: false }
    }

    if (msg.stargate.typeUrl === MsgGrant.typeUrl) {
      const grantMsg = msg.stargate.value as MsgGrant
      const authorizationTypeUrl =
        // If not auto-decoded, will be Any. This should be the case for the
        // CosmWasm contract authorizations. $typeUrl will be Any which is
        // unhelpful.
        grantMsg.grant?.authorization?.typeUrl ||
        // If auto-decoded, such as Generic or Send, this will be set instead.
        grantMsg.grant?.authorization?.$typeUrl

      // If no authorization type, this is not a match
      if (!authorizationTypeUrl) {
        return { match: false }
      }

      switch (authorizationTypeUrl) {
        case GenericAuthorization.typeUrl: {
          const msgTypeUrl = (
            grantMsg.grant!.authorization as GenericAuthorization
          ).msg
          return {
            match: true,
            data: {
              ...defaults,
              chainId,
              mode: 'grant',
              authorizationTypeUrl,
              customTypeUrl: !ACTION_TYPES.some(
                ({ type: { typeUrl } }) => typeUrl === msgTypeUrl
              ),
              msgTypeUrl,
              grantee: grantMsg.grantee,
            },
          }
        }

        case SendAuthorization.typeUrl: {
          const { spendLimit } = grantMsg.grant!
            .authorization as SendAuthorization

          return {
            match: true,
            data: {
              ...defaults,
              chainId,
              mode: 'grant',
              authorizationTypeUrl,
              customTypeUrl: false,
              grantee: grantMsg.grantee,
              funds: spendLimit.map(({ denom, amount }: Coin) => ({
                amount: convertMicroDenomToDenomWithDecimals(
                  amount,
                  getTokenForChainIdAndDenom(chainId, denom).decimals
                ),
                denom,
              })),
            },
          }
        }

        case ContractExecutionAuthorization.typeUrl:
        case ContractMigrationAuthorization.typeUrl: {
          const grants: ContractGrant[] = (
            grantMsg.grant!.authorization as
              | ContractExecutionAuthorization
              | ContractMigrationAuthorization
          ).grants

          if (grants.length !== 1) {
            return { match: false }
          }

          const { contract, filter, limit } = grants[0]

          // Type guard, should always pass until new types are added.
          if (
            !limit?.$typeUrl ||
            !filter?.$typeUrl ||
            !LIMIT_TYPES.some(
              ({ type: { typeUrl } }) => typeUrl === limit.$typeUrl
            ) ||
            !FILTER_TYPES.some(
              ({ type: { typeUrl } }) => typeUrl === filter.$typeUrl
            )
          ) {
            return { match: false }
          }

          const filterMsgs =
            filter.$typeUrl === AcceptedMessagesFilter.typeUrl
              ? (filter.messages as Uint8Array[]).map((msg) =>
                  JSON.parse(fromUtf8(msg))
                )
              : []

          return {
            match: true,
            data: {
              ...defaults,
              chainId,
              mode: 'grant',
              authorizationTypeUrl,
              customTypeUrl: false,
              grantee: msg.stargate.value.grantee,
              funds:
                limit.amounts?.map(({ denom, amount }: Coin) => ({
                  amount: convertMicroDenomToDenomWithDecimals(
                    amount,
                    getTokenForChainIdAndDenom(chainId, denom).decimals
                  ),
                  denom,
                })) ?? [],
              contract,
              filterTypeUrl: filter.$typeUrl,
              filterKeys:
                filter.$typeUrl === AcceptedMessageKeysFilter.typeUrl
                  ? filter.keys.join()
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
              limitTypeUrl: limit.$typeUrl,
              calls:
                limit.$typeUrl === MaxCallsLimit.typeUrl
                  ? Number(limit.remaining)
                  : limit.$typeUrl === CombinedLimit.typeUrl
                  ? Number(limit.callsRemaining)
                  : 0,
            },
          }
        }

        default:
          return { match: false }
      }
    } else if (msg.stargate.typeUrl === MsgRevoke.typeUrl) {
      const msgTypeUrl = msg.stargate.value.msgTypeUrl

      return {
        match: true,
        data: {
          ...defaults,
          chainId,
          mode: 'revoke',
          customTypeUrl: !ACTION_TYPES.some(
            ({ type: { typeUrl } }) => typeUrl === msgTypeUrl
          ),
          grantee: msg.stargate.value.grantee,
          msgTypeUrl,
        },
      }
    }

    return { match: false }
  }

  const useTransformToCosmos: UseTransformToCosmos<AuthzGrantRevokeData> = () =>
    useCallback(
      ({
        chainId,
        mode,
        authorizationTypeUrl,
        grantee,
        msgTypeUrl,
        filterKeys,
        filterMsgs,
        filterTypeUrl,
        funds,
        contract,
        limitTypeUrl,
        calls,
      }: AuthzGrantRevokeData) => {
        const parsedFilterMsgs = JSON5.parse(filterMsgs)
        const filter: Any | undefined = FILTER_TYPES.find(
          ({ type: { typeUrl } }) => typeUrl === filterTypeUrl
        )?.type.toProtoMsg({
          // AcceptedMessageKeysFilter
          keys: filterKeys.split(',').map((k) => k.trim()),
          // AcceptedMessagesFilter
          messages: (Array.isArray(parsedFilterMsgs)
            ? parsedFilterMsgs
            : [parsedFilterMsgs]
          ).map((m: unknown) => toUtf8(JSON.stringify(m))),
        })

        const limit: Any | undefined = LIMIT_TYPES.find(
          ({ type: { typeUrl } }) => typeUrl === limitTypeUrl
        )?.type.toProtoMsg({
          // MaxCallsLimit
          remaining: BigInt(calls),
          // CombinedLimit
          callsRemaining: BigInt(calls),
          // MaxFundsLimit
          // CombinedLimit
          amounts: funds.map(({ denom, amount }) => ({
            amount: convertDenomToMicroDenomStringWithDecimals(
              amount,
              getTokenForChainIdAndDenom(chainId, denom).decimals
            ),
            denom,
          })),
        })

        let authorization: Any | undefined
        if (mode === 'grant') {
          authorization = AUTHORIZATION_TYPES.find(
            ({ type: { typeUrl } }) => typeUrl === authorizationTypeUrl
          )?.type.toProtoMsg({
            // GenericAuthorization
            msg: msgTypeUrl,
            // SendAuthorization
            spendLimit: funds.map(({ denom, amount }) => ({
              amount: convertDenomToMicroDenomStringWithDecimals(
                amount,
                getTokenForChainIdAndDenom(chainId, denom).decimals
              ),
              denom,
            })),
            allowList: [],
            // ContractExecutionAuthorization
            // ContractMigrationAuthorization
            grants: [
              {
                contract,
                filter: filter as any,
                limit: limit as any,
              },
            ],
          })

          if (!authorization) {
            throw new Error('Unknown authorization type')
          }
        }

        // Expiration set to 10 years.
        const expiration = new Date()
        expiration.setFullYear(expiration.getFullYear() + 10)
        // Encoder needs a whole number of seconds.
        expiration.setMilliseconds(0)

        return maybeMakePolytoneExecuteMessage(
          currentChainId,
          chainId,
          makeStargateMessage({
            stargate: {
              typeUrl: mode === 'grant' ? MsgGrant.typeUrl : MsgRevoke.typeUrl,
              value: {
                ...(mode === 'grant' && authorization
                  ? {
                      grant: {
                        authorization,
                        expiration,
                      },
                    }
                  : {
                      msgTypeUrl,
                    }),
                grantee,
                granter: getChainAddressForActionOptions(options, chainId),
              },
            },
          })
        )
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
