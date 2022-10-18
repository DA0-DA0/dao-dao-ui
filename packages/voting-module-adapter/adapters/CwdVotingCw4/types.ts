import { NewDaoTier } from '@dao-dao/tstypes'

export interface DaoCreationConfig {
  tiers: NewDaoTier[]
  // For custom errors.
  _tiersError?: undefined
}
