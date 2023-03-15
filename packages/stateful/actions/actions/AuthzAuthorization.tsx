import type { MsgGrant, MsgRevoke } from 'cosmjs-types/cosmos/authz/v1beta1/tx'
import {
  GenericAuthorization,
  GrantAuthorization,
} from 'cosmjs-types/cosmos/authz/v1beta1/authz'
import { SendAuthorization } from 'cosmjs-types/cosmos/bank/v1beta1/authz'
import {
  ContractExecutionAuthorization,
  ContractGrant,
  ContractMigrationAuthorization,
  MaxCallsLimit,
  MaxFundsLimit,
  AllowAllMessagesFilter,
  AcceptedMessageKeysFilter,
  AcceptedMessagesFilter,
} from 'cosmjs-types/cosmwasm/wasm/v1/authz'
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

const TYPE_URL_MSG_GRANT = '/cosmos.authz.v1beta1.MsgGrant'
const TYPE_URL_MSG_REVOKE = '/cosmos.authz.v1beta1.MsgRevoke'
const TYPE_URL_GENERIC_AUTHORIZATION =
  '/cosmos.authz.v1beta1.GenericAuthorization'

// TODO fix me, maybe rename?
export enum AuthorizationTypeUrl {
  Generic = '/cosmos.authz.v1beta1.GenericAuthorization',
  ContractExecution = '/cosmwasm.wasm.v1.ContractExecutitonAuthorization',
  ContractMigration = '/cosmwasm.wasm.v1.ContractMigrationAuthorization',
  Spend = '/cosmos.bank.v1beta1.SendAuthorization',
}

export enum FilterTypes {
  All = '/cosmwasm.wasm.v1.AllowAllMessagesFilter',
  Keys = '/cosmwasm.wasm.v1.AcceptedMessageKeysFilter',
  Msg = '/cosmwasm.wasm.v1.AcceptedMessagesFilter',
}

export enum LimitOptions {}

export interface AuthzData {
  funds?: { denom: string; amount: number }[]
  authorizationTypeUrl: AuthorizationTypeUrl
  custom?: boolean
  typeUrl: string
  // TODO maybe this doesn't actually make sense?
  value: MsgGrant | MsgRevoke
  msgTypeUrl?: string
  filterType: FilterTypes
  filterKeys?: string[]
  filterMsg?: string
}

const useDefaults: UseDefaults<AuthzData> = () => ({
  funds: [],
  authorizationTypeUrl: AuthorizationTypeUrl.Generic,
  custom: false,
  typeUrl: TYPE_URL_MSG_GRANT,
  value: {
    grantee: '',
    granter: '',
    grant: {
      authorization: {
        typeUrl: TYPE_URL_GENERIC_AUTHORIZATION,
        value: {
          msg: '/cosmos.staking.v1beta1.MsgDelegate',
        },
      },
    },
    msgTypeUrl: '',
  },
  filterType: FilterTypes.All,
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

      return msg.stargate.typeUrl === TYPE_URL_MSG_GRANT &&
        isMsgGrantGenericAuthorization(msg)
        ? {
            match: true,
            data: {
              custom: false,
              typeUrl: msg.stargate.typeUrl,
              value: {
                authorization: {
                  typeUrl: msg.stargate.value.grant!.authorization!.typeUrl,
                  value: decodeRawProtobufMsg(
                    msg.stargate.value.grant!.authorization!
                  ).value,
                },
                grantee: msg.stargate.value.grantee,
                granter: msg.stargate.value.granter,
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
      ({ typeUrl, value: { grantee, grant, msgTypeUrl } }: AuthzData) =>
        makeStargateMessage({
          stargate: {
            typeUrl,
            value: {
              ...(typeUrl === TYPE_URL_MSG_GRANT
                ? {
                    grant: {
                      // TODO switch accordingly?
                      authorization: encodeRawProtobufMsg(grant.authorization),
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
