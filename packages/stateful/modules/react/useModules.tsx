// External API

import { useMemo } from 'react'

import { useDao } from '@dao-dao/stateless'
import {
  LoadedModule,
  LoadingData,
  ModuleDisplayLocation,
  ModuleVisibilityContext,
} from '@dao-dao/types'

import { useMembership } from '../../hooks'
import { getDaoModules } from '../core'

type UseModulesOptions = {
  // If passed, will only return the modules in this location.
  location?: ModuleDisplayLocation
}

type UseModulesResult = LoadingData<LoadedModule[]>

// Get modules for the DAO.
export const useModules = ({
  location,
}: UseModulesOptions = {}): UseModulesResult => {
  const dao = useDao()
  const { isMember = false } = useMembership()

  const loadingModules = useMemo(
    (): LoadingData<LoadedModule[]> => ({
      loading: false,
      data: getDaoModules(dao).flatMap(
        ({ module, daoModule }): LoadedModule | [] => {
          if (location && module.location !== location) {
            return []
          }

          // Enforce visibility context.
          switch (module.visibilityContext) {
            case ModuleVisibilityContext.OnlyMembers:
              if (!isMember) {
                return []
              }
              break
            case ModuleVisibilityContext.OnlyNonMembers:
              if (isMember) {
                return []
              }
              break
          }

          // Fill component with loaded values.
          const ModuleComponent = () =>
            module.Renderer ? (
              <module.Renderer variables={(daoModule.values || {}) as any} />
            ) : null

          return {
            module,
            daoModule,
            ModuleComponent,
          }
        }
      ),
    }),
    [dao, isMember, location]
  )

  return loadingModules
}
