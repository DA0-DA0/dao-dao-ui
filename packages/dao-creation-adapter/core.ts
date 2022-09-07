import { MembershipAdapter } from './adapters'
import { DaoCreationAdapter, IDaoCreationAdapter } from './types'

// Able to include readonly version of adapters. Likely used for reading
// `displayInfo`.
export const adapters: readonly DaoCreationAdapter[] = [MembershipAdapter]

export const matchAdapter = (id: string) =>
  adapters.find((adapter) => adapter.id === id)

export const matchAndLoadAdapter = (id: string): IDaoCreationAdapter => {
  const adapter = matchAdapter(id)

  if (!adapter) {
    throw new Error(
      `Failed to find DAO creation adapter matching ID "${id}". Available adapters: ${adapters
        .map(({ id }) => id)
        .join(', ')}`
    )
  }

  return adapter.load()
}
