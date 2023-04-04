import { useCallback, useMemo } from 'react'

import { HammerAndWrenchEmoji, Loader } from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
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
  DAO_WIDGET_ITEM_NAMESPACE,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { getWidgets, useWidgets } from '../../../../widgets'
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
  const availableWidgets = useMemo(() => getWidgets(), [])
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

  // V1 DAOs and V2-alpha DAOs use a value key of `addr`, the rest use `value`.
  const valueKey =
    context.info.coreVersion === ContractVersion.V1 ||
    context.info.coreVersion === ContractVersion.V2Alpha
      ? 'addr'
      : 'value'

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
                        key: DAO_WIDGET_ITEM_NAMESPACE + id,
                        [valueKey]: JSON.stringify(values),
                      },
                    }
                  : {
                      remove_item: {
                        key: DAO_WIDGET_ITEM_NAMESPACE + id,
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
          DAO_WIDGET_ITEM_NAMESPACE
        )) ||
        ('remove_item' in msg.wasm.execute.msg &&
          msg.wasm.execute.msg.remove_item.key.startsWith(
            DAO_WIDGET_ITEM_NAMESPACE
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
          ).replace(new RegExp(`^${DAO_WIDGET_ITEM_NAMESPACE}`), ''),
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
