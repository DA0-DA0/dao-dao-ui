import { DaoVotingCw721StakedAdapterId } from '@dao-dao/utils'

import { useDaoGovernanceToken } from '../../../hooks'
import { useVotingModuleAdapterContextIfAvailable } from '../context'

// Returns the useDaoGovernanceToken hook response if using the cw721-staked
// voting module adapter and within a voting module context. This will not error
// if the adapter is unavailable.
export const useCw721CommonGovernanceTokenInfoIfExists = () => {
  const { id } = useVotingModuleAdapterContextIfAvailable() ?? {
    id: undefined,
  }

  const token = useDaoGovernanceToken() ?? undefined

  return id === DaoVotingCw721StakedAdapterId ? token : undefined
}
