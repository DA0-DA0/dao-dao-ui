import { useSuspenseQuery } from '@tanstack/react-query'

import { useDaoIfAvailable } from '@dao-dao/stateless'
import { GenericToken } from '@dao-dao/types'

/**
 * Get the DAO governance token from the voting module. Returns null if the
 * current voting module does not have a governance token or if not in a DAO
 * context. Should never error.
 */
export const useDaoGovernanceToken = () => {
  const dao = useDaoIfAvailable()
  return useSuspenseQuery<GenericToken | null>(
    dao?.maybeVotingModule?.getGovernanceTokenQuery?.() || {
      queryKey: ['null'],
      queryFn: () => null,
    }
  ).data
}
