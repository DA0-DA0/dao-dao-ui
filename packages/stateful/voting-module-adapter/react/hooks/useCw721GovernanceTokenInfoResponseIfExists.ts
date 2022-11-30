import { UseGovernanceTokenInfoResponse } from '@dao-dao/types'

import { CwdVotingCw721StakedAdapter } from '../../adapters/CwdVotingCw721Staked'
import { useVotingModuleAdapterContextIfAvailable } from '../context'

// Returns the useGovernanceTokenInfo hook response if using the cwd-voting-cw721-staked
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

  return id === CwdVotingCw721StakedAdapter.id
    ? governanceTokenInfoResponse
    : undefined
}
