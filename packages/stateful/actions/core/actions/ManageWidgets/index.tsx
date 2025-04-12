import { useMemo } from 'react'

import {
  ActionBase,
  HammerAndWrenchEmoji,
  Loader,
  useDao,
} from '@dao-dao/stateless'
import { IDaoBase, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  DAO_WIDGET_ITEM_NAMESPACE,
  getWidgetStorageItemKey,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { getWidgetById, getWidgets, useWidgets } from '../../../../widgets'
import { ManageStorageItemsAction } from '../ManageStorageItems'
import {
  ManageWidgetsData,
  ManageWidgetsComponent as StatelessManageWidgetsComponent,
} from './Component'

const Component: ActionComponent = (props) => {
  const dao = useDao()
  const availableWidgets = useMemo(
    () =>
      getWidgets({
        chainId: dao.chainId,
        version: dao.coreVersion,
      }),
    [dao]
  )
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

export class ManageWidgetsAction extends ActionBase<ManageWidgetsData> {
  public readonly key = ActionKey.ManageWidgets
  public readonly Component = Component

  protected _defaults: ManageWidgetsData = {
    mode: 'set',
    id: '',
    values: {},
    extra: {},
  }

  public readonly dao: IDaoBase
  private manageStorageItemsAction: ManageStorageItemsAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const manageStorageItemsAction = new ManageStorageItemsAction(options)

    super(options, {
      Icon: HammerAndWrenchEmoji,
      label: options.t('title.manageWidgets'),
      description: options.t('info.manageWidgetsDescription'),
      // match just before manage storage items, but still after other more
      // individual widget actions, like enable vesting payments and enable
      // retroactive compensation
      matchPriority: manageStorageItemsAction.metadata.matchPriority! + 1,
    })

    this.dao = options.context.dao
    this.manageStorageItemsAction = manageStorageItemsAction
  }

  setup() {
    return this.manageStorageItemsAction.setup()
  }

  async encode({
    mode,
    id,
    values,
    extra,
  }: ManageWidgetsData): Promise<UnifiedCosmosMsg[]> {
    const setting = mode === 'set'
    const msgs = [
      this.manageStorageItemsAction.encode({
        setting,
        key: getWidgetStorageItemKey(id),
        value: JSON.stringify(values),
      }),
    ]

    // Optionally add additional widget messages when updating a widget.
    if (setting) {
      const widget = getWidgets({
        chainId: this.dao.chainId,
        version: this.dao.coreVersion,
      }).find((w) => w.id === id)
      if (widget?.editAction) {
        msgs.push(
          ...[
            await widget.editAction.encode({
              data: values,
              options: this.options,
              extra,
            }),
          ].flat()
        )
      }
    }

    return msgs
  }

  async match(messages: ProcessedMessage[]): Promise<ActionMatch> {
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const manageStorageItemsMatch =
      this.manageStorageItemsAction.match(messages)
    if (!manageStorageItemsMatch) {
      return manageStorageItemsMatch
    }

    const { setting, key, value } =
      this.manageStorageItemsAction.decode(messages)

    // Ensure this is setting or removing a widget item.
    if (!key.startsWith(getWidgetStorageItemKey(''))) {
      return false
    }

    // Optionally match additional widget messages when updating a widget.
    if (setting) {
      const widgetId = key.substring(DAO_WIDGET_ITEM_NAMESPACE.length)
      const widget = getWidgetById(
        {
          chainId: this.dao.chainId,
          version: this.dao.coreVersion,
        },
        widgetId
      )
      if (widget?.editAction && messages.length > 1) {
        const values = JSON.parse(value)
        const widgetMatch = await widget.editAction.match({
          data: values,
          messages: messages.slice(1),
          options: this.options,
        })
        if (widgetMatch) {
          // Match the first ManageWidgets message, and then match the number of
          // additional messages encoded by the widget's edit action.
          return 1 + (widgetMatch === true ? 1 : widgetMatch)
        }
      }
    }

    return true
  }

  async decode(messages: ProcessedMessage[]): Promise<ManageWidgetsData> {
    const manageStorageItemsData =
      this.manageStorageItemsAction.decode(messages)

    let values = {}
    if (manageStorageItemsData.setting) {
      try {
        values = JSON.parse(manageStorageItemsData.value)
      } catch (err) {
        console.error(err)
      }
    }

    const mode = manageStorageItemsData.setting ? 'set' : 'delete'
    const id = manageStorageItemsData.key.substring(
      DAO_WIDGET_ITEM_NAMESPACE.length
    )
    let extra = {}

    // Decode additional widget data if necessary.
    if (mode === 'set') {
      const widget = getWidgetById(
        {
          chainId: this.dao.chainId,
          version: this.dao.coreVersion,
        },
        id
      )
      if (widget?.editAction?.decode && messages.length > 1) {
        extra = await widget.editAction.decode({
          data: values,
          messages: messages.slice(1),
          options: this.options,
        })
      }
    }

    return {
      mode,
      id,
      values,
      extra,
    }
  }
}
