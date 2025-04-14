import { ModuleId } from '@dao-dao/types'

import { DAO_MODULE_ITEM_PREFIX } from './constants'

/**
 * Get the key in the DAO storage items map for a module item.
 *
 * @param id `ModuleId` of the module item.
 * @returns The key in the DAO storage items map for the module item.
 */
export const getModuleStorageItemKey = (id: ModuleId | string): string =>
  DAO_MODULE_ITEM_PREFIX + id
