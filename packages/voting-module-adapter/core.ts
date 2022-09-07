import {
  Cw20StakedBalanceVotingAdapter,
  Cw4VotingAdapter,
  CwNativeStakedBalanceVotingAdapter,
  FallbackVotingAdapter,
} from './adapters'
import {
  IVotingModuleAdapterContext,
  IVotingModuleAdapterOptions,
  VotingModuleAdapter,
} from './types'

export const adapters: readonly VotingModuleAdapter[] = [
  Cw4VotingAdapter,
  Cw20StakedBalanceVotingAdapter,
  CwNativeStakedBalanceVotingAdapter,

  // Include fallback voting adapter last since it matches all voting modules,
  // in case there is no adapter for the DAO's voting module.
  FallbackVotingAdapter,
]

export const matchAdapter = (contractName: string) =>
  adapters.find(({ matcher }) => matcher(contractName))

export const matchAndLoadAdapter = (
  contractName: string,
  options: IVotingModuleAdapterOptions
): IVotingModuleAdapterContext => {
  const adapter = matchAdapter(contractName)

  if (!adapter) {
    throw new Error(
      `Failed to find voting module adapter matching contract "${contractName}". Available adapters: ${adapters
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
