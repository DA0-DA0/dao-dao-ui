import {
  DaoCreationExtensionFilterOptions,
  LoadedDaoCreationExtension,
} from '@dao-dao/types'
import { versionGte } from '@dao-dao/utils'

import { CrossChainAccountsExtension } from './CrossChainAccounts'

export const getCreationExtensions = ({
  chain,
  version,
}: DaoCreationExtensionFilterOptions): readonly LoadedDaoCreationExtension[] =>
  [
    CrossChainAccountsExtension,
    // Add extensions here.
  ]
    .filter(
      (extension) =>
        (!extension.isChainSupported || extension.isChainSupported(chain)) &&
        (!extension.minVersion || versionGte(version, extension.minVersion))
    )
    .map(
      (extension): LoadedDaoCreationExtension => ({
        ...extension,
        defaultValues: extension.getDefaultValues(chain),
        getInitialActions: (data) => extension.getInitialActions(chain, data),
      })
    )
