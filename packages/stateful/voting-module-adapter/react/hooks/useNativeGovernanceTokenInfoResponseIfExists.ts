import { UseGovernanceTokenInfoResponse } from '@dao-dao/types'

import { DaoVotingNativeStakedAdapter } from '../../adapters/DaoVotingNativeStaked'
import { useVotingModuleAdapterContextIfAvailable } from '../context'

// Returns the useGovernanceTokenInfo hook response if using the native-staked
// voting module adapter and within a voting module context. This will not error
// if the adapter is unavailable.
export const useNativeGovernanceTokenInfoResponseIfExists = ():
  | UseGovernanceTokenInfoResponse
  | undefined => {
  const {
    id,
    adapter: {
      hooks: { useGovernanceTokenInfo },
    },
  } = useVotingModuleAdapterContextIfAvailable() ?? {
    id: undefined,
    adapter: { hooks: {} },
  }

  const governanceTokenInfoResponse = useGovernanceTokenInfo?.()

  return id === DaoVotingNativeStakedAdapter.id
    ? governanceTokenInfoResponse
    : undefined
}
