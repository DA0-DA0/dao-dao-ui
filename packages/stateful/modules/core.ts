import { CreatingDaoPlaceholder } from '@dao-dao/state/clients/dao'
import {
  DaoModule,
  IDaoBase,
  Module,
  ModuleFilterOptions,
} from '@dao-dao/types'
import { versionGte } from '@dao-dao/utils'

import {
  PressModule,
  RetroactiveCompensationModule,
  VestingPaymentsModule,
  VoteDelegationModule,
} from './modules'

/**
 * Get active modules for the context.
 */
export const getModules = (options?: ModuleFilterOptions): readonly Module[] =>
  [
    // MintNftModule,
    VestingPaymentsModule,
    RetroactiveCompensationModule,
    VoteDelegationModule,
    PressModule,
    // Add modules here.
  ].filter(
    (module) =>
      !options ||
      ((!module.isChainSupported || module.isChainSupported(options.chainId)) &&
        (!module.minVersion ||
          versionGte(options.version, module.minVersion)) &&
        (!options.isDaoCreation || module.supportsDaoCreation))
  )

/**
 * Get module by ID.
 */
export const getModuleById = <Variables extends Record<string, unknown> = any>(
  id: string,
  options?: ModuleFilterOptions
): Module<Variables> | undefined =>
  getModules(options).find((module) => module.id === id)

/**
 * Get module in a DAO. Returns null if the module is not found.
 */
export const getDaoModule = <Variables extends Record<string, unknown> = any>(
  dao: IDaoBase,
  id: string
): {
  module: Module<Variables>
  daoModule: DaoModule<Variables>
} | null => {
  const daoModule = dao.getModule(id)
  if (!daoModule) {
    return null
  }

  const module = getModuleById(id, {
    chainId: dao.chainId,
    version: dao.coreVersion,
    isDaoCreation: dao instanceof CreatingDaoPlaceholder,
  })

  if (!module) {
    return null
  }

  return {
    module,
    daoModule,
  }
}

/**
 * Get all modules in DAO.
 */
export const getDaoModules = (
  dao: IDaoBase
): {
  module: Module
  daoModule: DaoModule
}[] => {
  const modules = getModules({
    chainId: dao.chainId,
    version: dao.coreVersion,
    isDaoCreation: dao instanceof CreatingDaoPlaceholder,
  })

  return dao.modules.flatMap((daoModule) => {
    const module = modules.find((module) => module.id === daoModule.id)
    if (!module) {
      return []
    }

    return { module, daoModule }
  })
}
