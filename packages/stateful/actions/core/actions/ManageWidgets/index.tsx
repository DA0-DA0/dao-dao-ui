import { useMemo } from 'react'

import {
  ActionBase,
  HammerAndWrenchEmoji,
  Loader,
  useActionOptions,
} from '@dao-dao/stateless'
import { DaoWidget, UnifiedCosmosMsg } from '@dao-dao/types'
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
  getDaoWidgets,
  getWidgetStorageItemKey,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { getWidgets, useWidgets } from '../../../../widgets'
import { ManageStorageItemsAction } from '../ManageStorageItems'
import {
  ManageWidgetsData,
  ManageWidgetsComponent as StatelessManageWidgetsComponent,
} from './Component'

const Component: ActionComponent = (props) => {
  const {
    chain: { chainId },
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

export class ManageWidgetsAction extends ActionBase<ManageWidgetsData> {
  public readonly key = ActionKey.ManageWidgets
  public readonly Component = Component

  protected _defaults: ManageWidgetsData = {
    mode: 'set',
    id: '',
    values: {},
  }

  public readonly availableWidgets: DaoWidget[]
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

    this.manageStorageItemsAction = manageStorageItemsAction
    this.availableWidgets = getDaoWidgets(options.context.dao.info.items)
  }

  setup() {
    return this.manageStorageItemsAction.setup()
  }

  encode({ mode, id, values }: ManageWidgetsData): UnifiedCosmosMsg {
    return this.manageStorageItemsAction.encode({
      setting: mode === 'set',
      key: getWidgetStorageItemKey(id),
      value: JSON.stringify(values),
    })
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    const manageStorageItemsMatch =
      this.manageStorageItemsAction.match(messages)
    if (!manageStorageItemsMatch) {
      return manageStorageItemsMatch
    }

    // Ensure this is setting or removing a widget item.
    const { key } = this.manageStorageItemsAction.decode(messages)
    return key.startsWith(getWidgetStorageItemKey(''))
  }

  decode(messages: ProcessedMessage[]): ManageWidgetsData {
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

    return {
      mode: manageStorageItemsData.setting ? 'set' : 'delete',
      id: manageStorageItemsData.key.substring(
        DAO_WIDGET_ITEM_NAMESPACE.length
      ),
      values,
    }
  }
}
