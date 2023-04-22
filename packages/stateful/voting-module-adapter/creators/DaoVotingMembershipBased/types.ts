import { NewDaoTier } from '@dao-dao/types'

export type VotingModuleCreatorConfig = {
  tiers: NewDaoTier[]
  // For custom errors.
  _tiersError?: undefined
}
