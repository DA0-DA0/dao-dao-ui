import { UseGovernanceTokenInfoResponse } from '@dao-dao/types'

import { DaoVotingCw20StakedAdapter } from '../../adapters/DaoVotingCw20Staked'
import { useVotingModuleAdapterContextIfAvailable } from '../context'

// Returns the useGovernanceTokenInfo hook response if using the cw20-staked
// voting module adapter and within a voting module context. This will not error
// if the adapter is unavailable.
export const useCw20GovernanceTokenInfoResponseIfExists = ():
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

  return id === DaoVotingCw20StakedAdapter.id
    ? governanceTokenInfoResponse
    : undefined
}
