import JSON5 from 'json5'
import { useCallback, useMemo } from 'react'

import { HammerAndWrenchEmoji, Loader } from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  DAO_WIDGET_ITEM_NAMESPACE,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../components'
import { getWidgets, useWidgets } from '../../../widgets'
import { ManageWidgetsData } from '../../components'
import { ManageWidgetsComponent as StatelessManageWidgetsComponent } from '../../components/ManageWidgets'

const useDefaults: UseDefaults<ManageWidgetsData> = () => ({
  mode: 'set',
  id: '',
  values: '{}',
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
                        [valueKey]: JSON.stringify(JSON5.parse(values)),
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
      ('set_item' in msg.wasm.execute.msg ||
        'remove_item' in msg.wasm.execute.msg)
    ) {
      const mode = 'set_item' in msg.wasm.execute.msg ? 'set' : 'delete'

      return {
        match: true,
        data: {
          mode,
          id: (mode === 'set'
            ? msg.wasm.execute.msg.set_item.key
            : msg.wasm.execute.msg.remove_item.key
          ).replace(new RegExp(`^${DAO_WIDGET_ITEM_NAMESPACE}`), ''),
          values:
            mode === 'set'
              ? JSON.stringify(
                  JSON.parse(msg.wasm.execute.msg.set_item[valueKey]),
                  null,
                  2
                )
              : '{}',
        },
      }
    }

    return { match: false }
  }

  return {
    key: CoreActionKey.ManageWidgets,
    Icon: HammerAndWrenchEmoji,
    label: t('title.manageWidgets'),
    description: t('info.manageWidgetsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
