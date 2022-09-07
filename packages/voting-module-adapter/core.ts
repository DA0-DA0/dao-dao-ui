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

export const getAdapters = (): readonly VotingModuleAdapter[] => [
  Cw4VotingAdapter,
  Cw20StakedBalanceVotingAdapter,
  CwNativeStakedBalanceVotingAdapter,

  FallbackVotingAdapter,
]

export const matchAdapter = (contractName: string) =>
  getAdapters().find(({ matcher }) => matcher(contractName))

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
