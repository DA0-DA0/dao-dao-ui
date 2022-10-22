import { UseGovernanceTokenInfoResponse } from '@dao-dao/types'

import { CwdVotingCw20StakedAdapter } from '../../adapters/CwdVotingCw20Staked'
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

  return id === CwdVotingCw20StakedAdapter.id
    ? governanceTokenInfoResponse
    : undefined
}
