import { ProposalModuleAdapter } from './types'

const registeredAdapters: ProposalModuleAdapter[] = []

// Lazy loading adapters instead of defining objects reduces memory usage
// and avoids cyclic dependencies when enums or other objects are stored in
// the adapter object.
export const registerAdapters = async (adapters: ProposalModuleAdapter[]) =>
  registeredAdapters.push(...adapters)

export const matchAdapter = (contractName: string) =>
  registeredAdapters.find(({ matcher }) => matcher(contractName))

export const matchAndLoadAdapter = async (contractName: string) => {
  const adapter = matchAdapter(contractName)

  if (!adapter) {
    throw new Error(
      `Failed to find proposal module adapter matching contract "${contractName}". Registered adapters: ${registeredAdapters
        .map(({ id }) => id)
        .join(', ')}`
    )
  }

  return {
    id: adapter.id,
    adapter: await adapter.load(),
  }
}
