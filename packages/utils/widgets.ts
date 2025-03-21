import { WidgetId } from '@dao-dao/types'

import { DAO_WIDGET_ITEM_NAMESPACE } from './constants'

/**
 * Get the key in the DAO storage items map for a widget item.
 *
 * @param id `WidgetId` of the widget item.
 * @returns The key in the DAO storage items map for the widget item.
 */
export const getWidgetStorageItemKey = (id: WidgetId | string): string =>
  DAO_WIDGET_ITEM_NAMESPACE + id
