import { LoadedModule, ModuleId } from '@dao-dao/types'

import { useModules } from './useModules'

/**
 * Return the loaded module for the current DAO if it exists.
 */
export const useModule = <Data extends Record<string, unknown> = any>(
  moduleId: ModuleId
): LoadedModule<Data> | undefined => {
  const modules = useModules()

  return modules.loading
    ? undefined
    : modules.data.find(({ module }) => module.id === moduleId)
}
