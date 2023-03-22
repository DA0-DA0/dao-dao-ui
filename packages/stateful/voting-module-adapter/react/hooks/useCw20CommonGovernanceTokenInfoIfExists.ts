import { DaoVotingCw20StakedAdapterId } from '@dao-dao/utils'

import { useVotingModuleAdapterContextIfAvailable } from '../context'

// Returns the useCommonGovernanceTokenInfo hook response if using the
// cw20-staked voting module adapter and within a voting module context. This
// will not error if the adapter is unavailable.
export const useCw20CommonGovernanceTokenInfoIfExists = () => {
  const {
    id,
    adapter: {
      hooks: { useCommonGovernanceTokenInfo },
    },
  } = useVotingModuleAdapterContextIfAvailable() ?? {
    id: undefined,
    adapter: { hooks: {} },
  }

  const info = useCommonGovernanceTokenInfo?.()

  return id === DaoVotingCw20StakedAdapterId ? info : undefined
}
