import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { MushroomEmoji, useCachedLoadable } from '@dao-dao/stateless'
import {
  Action,
  ActionComponent,
  ActionKeyAndData,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  CosmosMsgFor_Empty,
  LoadedActions,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  decodeMessages,
  makeWasmMessage,
  objectMatchesStructure,
  processError,
} from '@dao-dao/utils'

import { DaoProviders, EntityDisplay } from '../../components'
import { daoInfoSelector } from '../../recoil'
import {
  DaoAdminExecData,
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
  actions: [],
})

const InnerComponent: ActionComponent<{ daoInfoLoaded: boolean }> = (props) => {
  const { address, context } = useActionOptions()

  const childDaosLoadable = useCachedLoadable(
    context.type === ActionOptionsContextType.Dao
      ? DaoCoreV2Selectors.listAllSubDaosSelector({
          contractAddress: address,
        })
      : // TODO: Get DAOs where wallet is admin.
        constSelector([])
  )

  let actions: Action[] = []
  let loadedActions: LoadedActions = {}
  if (
    context.type !== ActionOptionsContextType.Dao ||
    props.options.daoInfoLoaded
  ) {
    actions = useActions()
    loadedActions = useLoadActions(actions)
  }

  return (
    <StatelessDaoAdminExecComponent
      {...props}
      options={{
        actions,
        loadedActions,
        childDaos:
          childDaosLoadable.state === 'hasValue'
            ? {
                loading: false,
                data: childDaosLoadable.contents.map(({ addr }) => addr),
              }
            : { loading: true },
        EntityDisplay,
      }}
    />
  )
}

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()

  // Load DAO info for chosen DAO.
  const { watch } = useFormContext()
  const coreAddress = watch(props.fieldNamePrefix + 'coreAddress')

  const daoInfoLoadable = useCachedLoadable(
    context.type === ActionOptionsContextType.Dao
      ? daoInfoSelector({
          coreAddress,
        })
      : constSelector(undefined)
  )

  return context.type === ActionOptionsContextType.Dao ? (
    daoInfoLoadable.state === 'hasValue' ? (
      <DaoProviders info={daoInfoLoadable.contents!}>
        <InnerComponent {...props} options={{ daoInfoLoaded: true }} />
      </DaoProviders>
    ) : (
      <InnerComponent {...props} options={{ daoInfoLoaded: false }} />
    )
  ) : (
    <WalletActionsProvider>
      <InnerComponent {...props} options={{ daoInfoLoaded: false }} />
    </WalletActionsProvider>
  )
}

const useTransformToCosmos: UseTransformToCosmos<DaoAdminExecData> = () => {
  const loadedActions = useLoadActions(useActions())

  return ({ coreAddress, actions }) => {
    let msgs
    try {
      msgs = actions
        .map(({ key, data }) => loadedActions[key]?.transform(data))
        // Filter out undefined messages.
        .filter(Boolean) as CosmosMsgFor_Empty[]
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: false,
        })
      )
      return
    }

    return makeWasmMessage({
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
    })
  }
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<DaoAdminExecData> = (
  msg: Record<string, any>
) => {
  const { t } = useTranslation()
  const orderedActions = useOrderedActionsToMatch(useActions())

  const isDaoAdminExec = objectMatchesStructure(msg, {
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

  const decodedMessages = useMemo(
    () =>
      isDaoAdminExec
        ? decodeMessages(msg.wasm.execute.msg.execute_admin_msgs.msgs)
        : [],
    [isDaoAdminExec, msg.wasm.execute.msg.execute_admin_msgs.msgs]
  )

  // Call relevant action hooks in the same order every time.
  const actionData: ActionKeyAndData[] = decodedMessages.map((message) => {
    const actionMatch = orderedActions
      .map((action) => ({
        key: action.key,
        ...action.useDecodedCosmosMsg(message),
      }))
      .find(({ match }) => match)

    // There should always be a match since custom matches all. This should
    // never happen as long as the Custom action exists.
    if (!actionMatch?.match) {
      throw new Error(t('error.loadingData'))
    }

    return actionMatch
  })

  return isDaoAdminExec
    ? {
        match: true,
        data: {
          coreAddress: msg.wasm.execute.contract_addr,
          actions: actionData,
        },
      }
    : {
        match: false,
      }
}

export const makeDaoAdminExecAction: ActionMaker<DaoAdminExecData> = ({
  t,
}) => ({
  key: CoreActionKey.DaoAdminExec,
  Icon: MushroomEmoji,
  label: t('title.daoAdminExec'),
  description: t('info.daoAdminExecDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
