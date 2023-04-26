import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { ChainEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  ActionOptions,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  POLYTONE_EAR,
  POLYTONE_NOTES,
  encodeMessageAsBase64,
  getChainForChainId,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import {
  getCoreActionCategoryMakers,
  makeActionCategoriesWithLabel,
} from '../../../core'
import {
  ActionsContext,
  useActionOptions,
  useActionsForMatching,
  useLoadedActionsAndCategories,
} from '../../../react'
import {
  CrossChainExecData,
  CrossChainExecComponent as StatelessCrossChainExecComponent,
} from './Component'

const useDefaults: UseDefaults<CrossChainExecData> = () => ({
  chainId: Object.keys(POLYTONE_NOTES)[0],
  msgs: [],
})

const InnerComponentLoading: ActionComponent = (props) => (
  <StatelessCrossChainExecComponent
    {...props}
    options={{
      categories: [],
      loadedActions: {},
      actionsForMatching: [],
      SuspenseLoader,
    }}
  />
)

const InnerComponent: ActionComponent = (props) => {
  const { categories, loadedActions } = useLoadedActionsAndCategories({
    isCreating: props.isCreating,
  })
  const actionsForMatching = useActionsForMatching({
    isCreating: props.isCreating,
  })

  return (
    <StatelessCrossChainExecComponent
      {...props}
      options={{
        categories,
        loadedActions,
        actionsForMatching,
        SuspenseLoader,
      }}
    />
  )
}

const Component: ActionComponent = (props) => {
  const { t, context } = useActionOptions()
  if (context.type !== ActionContextType.Dao) {
    throw new Error('Invalid context for this action.')
  }

  // Load DAO info for chosen DAO.
  const { watch, setValue, clearErrors } = useFormContext<CrossChainExecData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  // Reset actions when chain ID changes during creation.
  useEffect(() => {
    if (props.isCreating) {
      setValue((props.fieldNamePrefix + 'msgs') as 'msgs', [])
      clearErrors((props.fieldNamePrefix + 'msgs') as 'msgs')
      setValue(
        (props.fieldNamePrefix + '_actionData') as '_actionData',
        undefined
      )
      clearErrors((props.fieldNamePrefix + '_actionData') as '_actionData')
    }
  }, [clearErrors, chainId, props.fieldNamePrefix, props.isCreating, setValue])

  const chain = getChainForChainId(chainId)
  const polytoneProxy = context.info.polytoneProxies[chainId]
  if (!polytoneProxy) {
    throw new Error('Invalid chain ID.')
  }

  const options: ActionOptions = {
    t,
    chain,
    address: polytoneProxy,
    context: {
      type: ActionContextType.Wallet,
    },
  }

  const categories = makeActionCategoriesWithLabel(
    getCoreActionCategoryMakers(),
    options
  )

  return (
    <SuspenseLoader fallback={<InnerComponentLoading {...props} />}>
      <ActionsContext.Provider
        value={{
          options,
          categories,
        }}
      >
        <InnerComponent {...props} />
      </ActionsContext.Provider>
    </SuspenseLoader>
  )
}

const useTransformToCosmos: UseTransformToCosmos<CrossChainExecData> = () =>
  useCallback(
    ({ chainId, msgs }) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: POLYTONE_NOTES[chainId],
            funds: [],
            msg: {
              execute: {
                msgs,
                // 10 minutes
                timeout_seconds: '600',
                callback: {
                  msg: encodeMessageAsBase64(uuidv4()),
                  receiver: POLYTONE_EAR,
                },
              },
            },
          },
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<CrossChainExecData> = (
  msg: Record<string, any>
) =>
  objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          execute: {
            msgs: {},
            timeout_seconds: {},
            callback: {
              msg: {},
              receiver: {},
            },
          },
        },
      },
    },
  }) &&
  Object.entries(POLYTONE_NOTES).some(
    ([, note]) => note === msg.wasm.execute.contract_addr
  )
    ? {
        match: true,
        data: {
          chainId: Object.entries(POLYTONE_NOTES).find(
            ([, note]) => note === msg.wasm.execute.contract_addr
          )![0],
          msgs: msg.wasm.execute.msg.execute.msgs,
        },
      }
    : {
        match: false,
      }

export const makeCrossChainExecAction: ActionMaker<CrossChainExecData> = ({
  t,
  context,
}) =>
  // Only allow using this action in DAOs.
  context.type === ActionContextType.Dao
    ? {
        key: ActionKey.CrossChainExec,
        Icon: ChainEmoji,
        label: t('title.crossChainExec'),
        description: t('info.crossChainExecDescription'),
        Component,
        useDefaults,
        useTransformToCosmos,
        useDecodedCosmosMsg,
      }
    : null
