import { IVotingModuleAdapter } from './types'

const registeredAdapters: IVotingModuleAdapter[] = []

export const registerAdapters = (adapters: IVotingModuleAdapter[]) => {
  // Prevent ID duplicates.
  if (new Set(adapters.map(({ id }) => id)).size !== adapters.length) {
    throw new Error('Duplicate adapter IDs.')
  }

  // Replace all registered adapters with new adapters.
  registeredAdapters.splice(0, registeredAdapters.length, ...adapters)
}

export const matchAdapter = (contractName: string) => {
  const adapter = registeredAdapters.find((adapter) =>
    adapter.matcher(contractName)
  )

  if (!adapter) {
    throw new Error(
      `Failed to find voting module adapter matching contract "${contractName}". Registered adapters: ${registeredAdapters
        .map(({ id }) => id)
        .join(', ')}`
    )
  }

  return adapter
}
