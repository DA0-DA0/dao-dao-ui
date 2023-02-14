import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { DaoCoreV2Selectors, walletAdminOfDaosSelector } from '@dao-dao/state'
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

import {
  AddressInput,
  DaoProviders,
  EntityDisplay,
  SuspenseLoader,
} from '../../components'
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
      AddressInput,
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

  const daoSubDaosLoadable = useCachedLoadable(
    context.type === ActionOptionsContextType.Dao
      ? DaoCoreV2Selectors.listAllSubDaosSelector({
          contractAddress: address,
        })
      : undefined
  )
  const walletAdminOfDaosLoadable = useCachedLoadable(
    context.type === ActionOptionsContextType.Wallet
      ? walletAdminOfDaosSelector(address)
      : undefined
  )
  const childDaosLoadable =
    context.type === ActionOptionsContextType.Dao
      ? daoSubDaosLoadable
      : walletAdminOfDaosLoadable

  const daoInfoLoadable = useRecoilValueLoadable(
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
            data: childDaosLoadable.contents.map((dao) =>
              typeof dao === 'string' ? dao : dao.addr
            ),
          }
        : { loading: true },
  }

  console.log('rerendering')

  return context.type === ActionOptionsContextType.Dao ? (
    daoInfoLoadable.state === 'hasValue' ? (
      <SuspenseLoader
        fallback={<InnerComponentLoading {...props} options={options} />}
      >
        <DaoProviders info={daoInfoLoadable.contents!}>
          <InnerComponent {...props} options={options} />
        </DaoProviders>
      </SuspenseLoader>
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
