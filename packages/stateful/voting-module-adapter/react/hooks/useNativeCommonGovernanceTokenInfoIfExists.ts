import { DaoVotingNativeStakedAdapterId } from '@dao-dao/utils'

import { useDaoGovernanceToken } from '../../../hooks'
import { useVotingModuleAdapterContextIfAvailable } from '../context'

// Returns the useDaoGovernanceToken hook response if using the native-staked
// voting module adapter and within a voting module context. This will not error
// if the adapter is unavailable.
export const useNativeCommonGovernanceTokenInfoIfExists = () => {
  const { id } = useVotingModuleAdapterContextIfAvailable() ?? {
    id: undefined,
  }

  const token = useDaoGovernanceToken()

  return id === DaoVotingNativeStakedAdapterId ? token : undefined
}
