import { DaoVotingCw721StakedAdapterId } from '@dao-dao/utils'

import { useVotingModuleAdapterContextIfAvailable } from '../context'

// Returns the useGovernanceTokenInfo hook response if using the cw721-staked
// voting module adapter and within a voting module context. This will not error
// if the adapter is unavailable.
export const useCw721CommonGovernanceTokenInfoIfExists = () => {
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

  return id === DaoVotingCw721StakedAdapterId ? info : undefined
}
