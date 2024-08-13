import { DAO_WIDGET_ITEM_NAMESPACE } from './constants'

/**
 * Get the DAO storage item key for a widget iD.
 */
export const getWidgetStorageItemKey = (id: string) =>
  DAO_WIDGET_ITEM_NAMESPACE + id
