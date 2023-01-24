import {
  IVotingModuleAdapterContext,
  IVotingModuleAdapterOptions,
  VotingModuleAdapter,
} from '@dao-dao/types'
import { normalizeContractName } from '@dao-dao/utils'

import {
  DaoVotingCw20StakedAdapter,
  DaoVotingCw4Adapter,
  DaoVotingCw721StakedAdapter,
  DaoVotingNativeStakedAdapter,
  FallbackAdapter,
} from './adapters'

// Adapters need to be loaded lazily like this, as opposed to just defining a
// global array, due to cyclic dependencies. The adapter defintion files include
// components, which include the react folder index, which includes the provider
// file, which includes the core because it uses the matching helpers below,
// which depend on this adapter list. The fix is that no internal components
// should have a dependency chain that leads back to the matching functions
// below, except the react provider, which we should only be used externally.
// This is a problem to solve later.
export const getAdapters = (): readonly VotingModuleAdapter[] => [
  DaoVotingCw4Adapter,
  DaoVotingCw20StakedAdapter,
  DaoVotingNativeStakedAdapter,
  DaoVotingCw721StakedAdapter,
  FallbackAdapter,
]

export const getAdapterById = (id: string) =>
  getAdapters().find((adapter) => adapter.id === id)

export const matchAdapter = (contractNameToMatch: string) =>
  getAdapters().find((adapter) =>
    adapter.contractNames.some((contractName) =>
      normalizeContractName(contractNameToMatch).includes(contractName)
    )
  )

export const matchAndLoadAdapter = (
  contractName: string,
  options: IVotingModuleAdapterOptions
): IVotingModuleAdapterContext => {
  const adapter = matchAdapter(contractName)

  if (!adapter) {
    throw new Error(
      `Failed to find voting module adapter matching contract "${contractName}". Available adapters: ${getAdapters()
        .map(({ id }) => id)
        .join(', ')}`
    )
  }

  return {
    id: adapter.id,
    adapter: adapter.load(options),
    options,
  }
}
