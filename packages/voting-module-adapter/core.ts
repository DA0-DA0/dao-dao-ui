import { VotingModuleAdapter } from './types'

const registeredAdapters: VotingModuleAdapter[] = []

// Lazy loading adapters instead of defining objects reduces memory usage
// and avoids cyclic dependencies when enums or other objects are stored in
// the adapter object.
export const registerAdapters = async (adapters: VotingModuleAdapter[]) =>
  registeredAdapters.push(...adapters)

export const matchAdapter = async (contractName: string) => {
  const adapter = registeredAdapters.find(({ matcher }) =>
    matcher(contractName)
  )

  if (!adapter) {
    throw new Error(
      `Failed to find voting module adapter matching contract "${contractName}". Registered adapters: ${registeredAdapters
        .map(({ id }) => id)
        .join(', ')}`
    )
  }

  return {
    id: adapter.id,
    adapter: await adapter.load(),
  }
}
