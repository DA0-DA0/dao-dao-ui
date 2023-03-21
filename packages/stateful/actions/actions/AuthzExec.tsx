import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { LockWithKeyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  cosmwasmToProtobuf,
  makeStargateMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../components'
import {
  AuthzExecData,
  AuthzExecComponent as StatelessAuthzExecComponent,
} from '../components/AuthzExec'
import {
  WalletActionsProvider,
  useActionOptions,
  useActions,
  useLoadActions,
  useOrderedActionsToMatch,
} from '../react'

const useDefaults: UseDefaults<AuthzExecData> = () => ({
  coreAddress: '',
  msgs: [],
})

export enum AuthzExecActionTypes {
  Delegate = '/cosmos.staking.v1beta1.MsgDelegate',
  Undelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
  Redelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  ClaimRewards = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  Vote = '/cosmos.gov.v1beta1.MsgVote',
  Spend = '/cosmos.bank.v1beta1.MsgSend',
  Execute = '/cosmwasm.wasm.v1.MsgExecuteContract',
  Migrate = '/cosmwasm.wasm.v1.MsgMigrateContract',
  Custom = 'custom',
}

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()
  const actions = useActions()
  const loadedActions = useLoadActions(actions)
  const orderedActions = useOrderedActionsToMatch(actions)

  // Load DAO info for chosen DAO.
  const { watch, setValue, clearErrors } = useFormContext()
  const coreAddress = watch(props.fieldNamePrefix + 'coreAddress')

  // Reset actions when core address changes during creation.
  useEffect(() => {
    if (props.isCreating) {
      setValue(props.fieldNamePrefix + 'msgs', [])
      clearErrors(props.fieldNamePrefix + 'msgs')
      setValue(props.fieldNamePrefix + '_actions', undefined)
      clearErrors(props.fieldNamePrefix + '_actions')
    }
  }, [
    clearErrors,
    coreAddress,
    props.fieldNamePrefix,
    props.isCreating,
    setValue,
  ])

  return context.type === ActionContextType.Dao ? (
    <StatelessAuthzExecComponent
      {...props}
      options={{
        actions: [],
        loadedActions: {},
        orderedActions: [],
        AddressInput,
      }}
    />
  ) : (
    <WalletActionsProvider>
      <StatelessAuthzExecComponent
        {...props}
        options={{
          actions,
          loadedActions,
          orderedActions,
          AddressInput,
        }}
      />
    </WalletActionsProvider>
  )
}

const useTransformToCosmos: UseTransformToCosmos<AuthzExecData> = () =>
  useCallback(({ coreAddress, msgs }) => {
    return makeStargateMessage({
      stargate: {
        typeUrl: '/cosmos.authz.v1beta1.MsgExec',
        value: {
          grantee: coreAddress,
          msgs: msgs.map((msg) => cosmwasmToProtobuf(msg, coreAddress)),
        },
      },
    })
  }, [])

const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzExecData> = (
  msg: Record<string, any>
) =>
  objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          execute_admin_msgs: {
            msgs: {},
          },
        },
      },
    },
  })
    ? {
        match: true,
        data: {
          coreAddress: msg.wasm.execute.contract_addr,
          msgs: msg.wasm.execute.msg.execute_admin_msgs.msgs,
        },
      }
    : {
        match: false,
      }

export const makeAuthzExecAction: ActionMaker<AuthzExecData> = ({ t }) => ({
  key: CoreActionKey.AuthzExec,
  Icon: LockWithKeyEmoji,
  label: t('title.authzExec'),
  description: t('info.authzExecDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
