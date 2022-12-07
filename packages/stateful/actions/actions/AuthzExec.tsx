import type { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import type {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { LockWithKeyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_DENOM,
  makeRawProtobufMsg,
  makeStargateMessage,
} from '@dao-dao/utils'

import { AuthzExecComponent as StatelessAuthzComponent } from '../components'

export enum AuthzExecActionTypes {
  Delegate = '/cosmos.staking.v1beta1.MsgDelegate',
  Undelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
  Redelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  ClaimRewards = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  Custom = 'custom',
}

interface AuthzExecData {
  authzExecActionType: AuthzExecActionTypes
  claimRewards: MsgWithdrawDelegatorReward
  custom: string
  delegate: MsgDelegate
  redelegate: MsgBeginRedelegate
  undelegate: MsgUndelegate
}

const useDefaults: UseDefaults<AuthzExecData> = () => ({
  authzExecActionType: AuthzExecActionTypes.Delegate,
  grantee: '',
  claimRewards: {
    delegatorAddress: '',
    validatorAddress: '',
  },
  custom: '[]',
  delegate: {
    amount: { denom: NATIVE_DENOM, amount: '0' },
    delegatorAddress: '',
    validatorAddress: '',
  },
  undelegate: {
    amount: {
      denom: NATIVE_DENOM,
      amount: '0',
    },
    delegatorAddress: '',
    validatorAddress: '',
  },
  redelegate: {
    delegatorAddress: '',
    validatorSrcAddress: '',
    validatorDstAddress: '',
    amount: {
      denom: NATIVE_DENOM,
      amount: '0',
    },
  },
})

const Component: ActionComponent = (props) => {
  return <StatelessAuthzComponent {...props} options={{}} />
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzExecData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'stargate' in msg && msg.stargate.typeUrl && msg.stargate.value
        ? {
            match: true,
            data: msg as AuthzExecData,
          }
        : { match: false },
    [msg]
  )

export const makeAuthzExecAction: ActionMaker<AuthzExecData> = ({
  t,
  address,
}) => {
  const useTransformToCosmos: UseTransformToCosmos<AuthzExecData> = () =>
    useCallback((data: AuthzExecData) => {
      switch (data.authzExecActionType) {
        case AuthzExecActionTypes.Delegate:
          return makeStargateMessage({
            stargate: {
              type_url: '/cosmos.authz.v1beta1.MsgExec',
              value: {
                grantee: address,
                msgs: [
                  makeRawProtobufMsg({
                    typeUrl: AuthzExecActionTypes.Delegate,
                    value: data.delegate,
                  }),
                ],
              },
            },
          })
        case AuthzExecActionTypes.Redelegate:
          return makeStargateMessage({
            stargate: {
              type_url: '/cosmos.authz.v1beta1.MsgExec',
              value: {
                grantee: address,
                msgs: [
                  makeRawProtobufMsg({
                    typeUrl: AuthzExecActionTypes.Redelegate,
                    value: data.redelegate,
                  }),
                ],
              },
            },
          })
        case AuthzExecActionTypes.Undelegate:
          return makeStargateMessage({
            stargate: {
              type_url: '/cosmos.authz.v1beta1.MsgExec',
              value: {
                grantee: address,
                msgs: [
                  makeRawProtobufMsg({
                    typeUrl: AuthzExecActionTypes.Undelegate,
                    value: data.undelegate,
                  }),
                ],
              },
            },
          })
        case AuthzExecActionTypes.ClaimRewards:
          return makeStargateMessage({
            stargate: {
              type_url: '/cosmos.authz.v1beta1.MsgExec',
              value: {
                grantee: address,
                msgs: [
                  makeRawProtobufMsg({
                    typeUrl: AuthzExecActionTypes.ClaimRewards,
                    value: data.claimRewards,
                  }),
                ],
              },
            },
          })
        default:
          return makeStargateMessage({
            stargate: {
              type_url: '/cosmos.authz.v1beta1.MsgExec',
              value: {
                grantee: address,
                msgs: JSON.parse(data.custom),
              },
            },
          })
      }
    }, [])

  return {
    key: CoreActionKey.AuthzExec,
    Icon: LockWithKeyEmoji,
    label: t('title.authzExec'),
    description: t('info.authzExecDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
