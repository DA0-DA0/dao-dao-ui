import type { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import type {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { useCallback, useMemo } from 'react'

import { validatorsSelector } from '@dao-dao/state/recoil'
import {
  ActionCardLoader,
  LockWithKeyEmoji,
  useCachedLoadable,
} from '@dao-dao/stateless'
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
  decodeProtobuf,
  loadableToLoadingData,
  makeRawProtobufMsg,
  makeStargateMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput, SuspenseLoader } from '../../components'
import { AuthzExecComponent as StatelessAuthzComponent } from '../components'
import { useActionOptions } from '../react'

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
  const { chainId } = useActionOptions()

  const loadingValidators = loadableToLoadingData(
    useCachedLoadable(
      validatorsSelector({
        chainId,
      })
    ),
    []
  )

  return (
    <SuspenseLoader fallback={<ActionCardLoader />}>
      <StatelessAuthzComponent
        {...props}
        options={{
          AddressInput,
          validators: loadingValidators.loading ? [] : loadingValidators.data,
        }}
      />
    </SuspenseLoader>
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzExecData> = (
  msg: Record<string, any>
) => {
  let data = useDefaults()

  return useMemo(() => {
    // Check this is a stargate message.
    if (
      !objectMatchesStructure(msg, {
        stargate: {
          type_url: {},
          value: {},
        },
      })
    ) {
      return { match: false }
    }

    // Chect this is Authz MsgExec message formatted by this action
    if (
      msg.stargate.type_url !== '/cosmos.authz.v1beta1.MsgExec' ||
      !msg.stargate.value.msgs ||
      msg.stargate.value.msgs.length !== 1
    ) {
      return { match: false }
    }

    // Decode the message included with Authz MsgExec
    let decodedExecMsg = decodeProtobuf(msg.stargate.value.msgs[0])

    // Check that the type_url for default Authz messages, set data accordingly
    switch (decodedExecMsg.type_url) {
      case AuthzExecActionTypes.Delegate:
        data.authzExecActionType = AuthzExecActionTypes.Delegate
        data.delegate = decodedExecMsg.value
      case AuthzExecActionTypes.Redelegate:
        data.authzExecActionType = AuthzExecActionTypes.Redelegate
        data.redelegate = decodedExecMsg.value
      case AuthzExecActionTypes.Undelegate:
        data.authzExecActionType = AuthzExecActionTypes.Undelegate
        data.undelegate = decodedExecMsg.value
      case AuthzExecActionTypes.ClaimRewards:
        data.authzExecActionType = AuthzExecActionTypes.ClaimRewards
        data.claimRewards = decodedExecMsg.value
      default:
        data.authzExecActionType = AuthzExecActionTypes.Custom
        data.custom = decodedExecMsg.value
    }

    return {
      match: true,
      data,
    }
  }, [msg, data])
}

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
