import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { JoystickEmoji, useCachedLoadable } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { DaoProviders, EntityDisplay } from '../../components'
import { daoInfoSelector } from '../../recoil'
import {
  DaoAdminExecData,
  DaoAdminExecOptions,
  DaoAdminExecComponent as StatelessDaoAdminExecComponent,
} from '../components/DaoAdminExec'
import {
  WalletActionsProvider,
  useActionOptions,
  useActions,
  useLoadActions,
  useOrderedActionsToMatch,
} from '../react'

const useDefaults: UseDefaults<DaoAdminExecData> = () => ({
  coreAddress: '',
  msgs: [],
})

type InnerOptions = Pick<DaoAdminExecOptions, 'childDaos'>

const InnerComponentLoading: ActionComponent<InnerOptions> = (props) => (
  <StatelessDaoAdminExecComponent
    {...props}
    options={{
      actions: [],
      loadedActions: {},
      orderedActions: [],
      childDaos: props.options.childDaos,
      EntityDisplay,
    }}
  />
)

const InnerComponent: ActionComponent<InnerOptions> = (props) => {
  const actions = useActions()
  const loadedActions = useLoadActions(actions)
  const orderedActions = useOrderedActionsToMatch(actions)

  return (
    <StatelessDaoAdminExecComponent
      {...props}
      options={{
        actions,
        loadedActions,
        orderedActions,
        childDaos: props.options.childDaos,
        EntityDisplay,
      }}
    />
  )
}

const Component: ActionComponent = (props) => {
  const { context, address } = useActionOptions()

  // Load DAO info for chosen DAO.
  const { watch } = useFormContext()
  const coreAddress = watch(props.fieldNamePrefix + 'coreAddress')

  const childDaosLoadable = useCachedLoadable(
    context.type === ActionOptionsContextType.Dao
      ? DaoCoreV2Selectors.listAllSubDaosSelector({
          contractAddress: address,
        })
      : // TODO: Get DAOs where wallet is admin.
        constSelector([])
  )

  const daoInfoLoadable = useCachedLoadable(
    context.type === ActionOptionsContextType.Dao
      ? daoInfoSelector({
          coreAddress,
        })
      : constSelector(undefined)
  )

  const options: InnerOptions = {
    childDaos:
      childDaosLoadable.state === 'hasValue'
        ? {
            loading: false,
            data: childDaosLoadable.contents.map(({ addr }) => addr),
          }
        : { loading: true },
  }

  return context.type === ActionOptionsContextType.Dao ? (
    daoInfoLoadable.state === 'hasValue' ? (
      <DaoProviders info={daoInfoLoadable.contents!}>
        <InnerComponent {...props} options={options} />
      </DaoProviders>
    ) : (
      <InnerComponentLoading {...props} options={options} />
    )
  ) : (
    <WalletActionsProvider>
      <InnerComponent {...props} options={options} />
    </WalletActionsProvider>
  )
}

const useTransformToCosmos: UseTransformToCosmos<DaoAdminExecData> = () =>
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<DaoAdminExecData> = (
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

export const makeDaoAdminExecAction: ActionMaker<DaoAdminExecData> = ({
  t,
}) => ({
  key: CoreActionKey.DaoAdminExec,
  Icon: JoystickEmoji,
  label: t('title.daoAdminExec'),
  description: t('info.daoAdminExecDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
