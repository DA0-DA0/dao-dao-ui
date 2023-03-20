import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { DaoCoreV2Selectors, walletAdminOfDaosSelector } from '@dao-dao/state'
import { JoystickEmoji, useCachedLoadable } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionMaker,
  Coin,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import {
  AddressInput,
  DaoProviders,
  EntityDisplay,
  SuspenseLoader,
} from '../../components'
import { daoInfoSelector } from '../../recoil'
import {
  AuthzExecData,
  AuthzExecOptions,
  AuthzExecComponent as StatelessAuthzExecComponent,
} from '../components/AuthzExec'
import {
  WalletActionsProvider,
  useActionOptions,
  useActions,
  useLoadActions,
  useOrderedActionsToMatch,
} from '../react'
/* import {
 *   MsgBeginRedelegate,
 *   MsgDelegate,
 *   MsgUndelegate,
 * } from 'interchain-rpc/types/codegen/cosmos/staking/v1beta1/tx'
 * import { MsgWithdrawDelegatorReward } from 'interchain-rpc/types/codegen/cosmos/distribution/v1beta1/tx'
 *  */
const useDefaults: UseDefaults<AuthzExecData> = () => ({
  coreAddress: '',
  msgs: [],
})

/* type InnerOptions = Pick<AuthzExecOptions, 'childDaos'> */

/* interface AuthzExecData {
 *   authzExecActionType: AuthzExecActionTypes
 *   delegate: MsgDelegate
 *   undelegate: MsgUndelegate
 *   redelegate: MsgBeginRedelegate
 *   claimRewards: MsgWithdrawDelegatorReward
 *   vote: MsgVote
 *   execute: {
 *     sender: string
 *     contract: string
 *     msg: string
 *     funds: Coin[]
 *   }
 *   migrate: {
 *     sender: string
 *     contract: string
 *     codeId: string
 *     msg: string
 *   }
 *   custom: string
 * }
 *  */
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

const InnerComponentLoading: ActionComponent<AuthzExecOptions> = (props) => (
  <StatelessAuthzExecComponent
    {...props}
    options={{
      actions: [],
      loadedActions: {},
      orderedActions: [],
      AddressInput,
      EntityDisplay,
    }}
  />
)

const InnerComponent: ActionComponent<AuthzExecOptions> = (props) => {
  const actions = useActions()
  const loadedActions = useLoadActions(actions)
  const orderedActions = useOrderedActionsToMatch(actions)

  return (
    <StatelessAuthzExecComponent
      {...props}
      options={{
        actions,
        loadedActions,
        orderedActions,
        AddressInput,
        EntityDisplay,
      }}
    />
  )
}

const Component: ActionComponent = (props) => {
  const { context, address } = useActionOptions()

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

  // TODO don't need?
  const daoInfoLoadable = useRecoilValueLoadable(
    context.type === ActionContextType.Dao
      ? daoInfoSelector({
          coreAddress,
        })
      : constSelector(undefined)
  )

  // TODO query authz authorzations for this address?

  const options = {}

  return context.type === ActionContextType.Dao ? (
    daoInfoLoadable.state === 'hasValue' ? (
      <SuspenseLoader
        fallback={<InnerComponentLoading {...props} />}
      >
        <DaoProviders info={daoInfoLoadable.contents!}>
          <InnerComponent {...props} />
        </DaoProviders>
      </SuspenseLoader>
    ) : (
      <InnerComponentLoading {...props} />
    )
  ) : (
    <WalletActionsProvider   <InnerComponent {...props} options={options} />
    </WalletActionsProvider>
  )
}

const useTransformToCosmos: UseTransformToCosmos<AuthzExecData> = () =>
  // TODO wrap msgs in AuthzExec

  useCallback(
    ({ coreAddress, msgs }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: coreAddress,
            funds: [],
            msg: {
              execute_admin_msgs: {
                msgs,
              },
            },
          },
        },
      }),
    []
  )

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
  Icon: JoystickEmoji,
  label: t('title.daoAdminExec'),
  description: t('info.daoAdminExecDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
