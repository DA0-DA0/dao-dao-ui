import { useCallback, useMemo } from 'react'

import { HammerAndWrenchEmoji, Loader } from '@dao-dao/stateless'
import { Feature } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  getWidgetStorageItemKey,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { getWidgets, useWidgets } from '../../../../widgets'
import { useActionOptions } from '../../../react'
import {
  ManageWidgetsData,
  ManageWidgetsComponent as StatelessManageWidgetsComponent,
} from './Component'

const useDefaults: UseDefaults<ManageWidgetsData> = () => ({
  mode: 'set',
  id: '',
  values: {},
})

const Component: ActionComponent = (props) => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()
  const availableWidgets = useMemo(() => getWidgets(chainId), [chainId])
  const loadingExistingWidgets = useWidgets()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingExistingWidgets.loading}
    >
      {!loadingExistingWidgets.loading && (
        <StatelessManageWidgetsComponent
          {...props}
          options={{
            availableWidgets,
            existingWidgets: loadingExistingWidgets.data.map(
              ({ daoWidget }) => daoWidget
            ),
            SuspenseLoader,
          }}
        />
      )}
    </SuspenseLoader>
  )
}

export const makeManageWidgetsAction: ActionMaker<ManageWidgetsData> = ({
  t,
  context,
  address,
}) => {
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const valueKey = context.dao.info.supportedFeatures[
    Feature.StorageItemValueKey
  ]
    ? 'value'
    : 'addr'

  const useTransformToCosmos: UseTransformToCosmos<ManageWidgetsData> = () =>
    useCallback(
      ({ mode, id, values }) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg:
                mode === 'set'
                  ? {
                      set_item: {
                        key: getWidgetStorageItemKey(id),
                        [valueKey]: JSON.stringify(values),
                      },
                    }
                  : {
                      remove_item: {
                        key: getWidgetStorageItemKey(id),
                      },
                    },
            },
          },
        }),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageWidgetsData> = (
    msg: Record<string, any>
  ) => {
    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {},
          },
        },
      }) &&
      msg.wasm.execute.contract_addr === address &&
      (('set_item' in msg.wasm.execute.msg &&
        msg.wasm.execute.msg.set_item.key.startsWith(
          getWidgetStorageItemKey('')
        )) ||
        ('remove_item' in msg.wasm.execute.msg &&
          msg.wasm.execute.msg.remove_item.key.startsWith(
            getWidgetStorageItemKey('')
          )))
    ) {
      const mode = 'set_item' in msg.wasm.execute.msg ? 'set' : 'delete'

      let values = {}
      if (mode === 'set') {
        try {
          values = JSON.parse(msg.wasm.execute.msg.set_item[valueKey])
        } catch (err) {
          console.error(err)
        }
      }

      return {
        match: true,
        data: {
          mode,
          id: (mode === 'set'
            ? msg.wasm.execute.msg.set_item.key
            : msg.wasm.execute.msg.remove_item.key
          ).replace(new RegExp(`^${getWidgetStorageItemKey('')}`), ''),
          values,
        },
      }
    }

    return { match: false }
  }

  return {
    key: ActionKey.ManageWidgets,
    Icon: HammerAndWrenchEmoji,
    label: t('title.manageWidgets'),
    description: t('info.manageWidgetsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
