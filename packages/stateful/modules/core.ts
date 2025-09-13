import { CreatingDaoPlaceholder } from '@dao-dao/state/clients/dao'
import {
  DaoModule,
  IDaoBase,
  Module,
  ModuleFilterOptions,
  ModuleType,
} from '@dao-dao/types'
import { versionGte } from '@dao-dao/utils'

import {
  MultipleChoiceProposalModule,
  PressModule,
  RetroactiveCompensationModule,
  RoleBasedAuthorizationModule,
  SingleChoiceProposalModule,
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
    SingleChoiceProposalModule,
    MultipleChoiceProposalModule,
    RoleBasedAuthorizationModule,
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

  const existingModule = getModuleById(id, {
    chainId: dao.chainId,
    version: dao.coreVersion,
    isDaoCreation: dao instanceof CreatingDaoPlaceholder,
  })

  if (!existingModule) {
    return null
  }

  return {
    module: existingModule,
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
    const existingModule = modules.find((module) =>
      daoModule.type === ModuleType.External
        ? module.type === ModuleType.External && module.id === daoModule.id
        : daoModule.type === ModuleType.Proposal
          ? module.type === ModuleType.Proposal &&
            [module.contractName].flat().includes(daoModule.id)
          : false
    )
    if (!existingModule) {
      return []
    }

    return {
      module: existingModule,
      daoModule,
    }
  })
}
