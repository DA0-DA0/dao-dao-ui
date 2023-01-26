import { UseGovernanceTokenInfoResponse } from '@dao-dao/types'

import { DaoVotingCw721StakedAdapter } from '../../adapters/DaoVotingCw721Staked'
import { useVotingModuleAdapterContextIfAvailable } from '../context'

// Returns the useGovernanceTokenInfo hook response if using the cw721-staked
// voting module adapter and within a voting module context. This will not error
// if the adapter is unavailable.
export const useCw721GovernanceTokenInfoResponseIfExists = ():
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

  return id === DaoVotingCw721StakedAdapter.id
    ? governanceTokenInfoResponse
    : undefined
}
