import { NewDaoTier } from '@dao-dao/types'

export interface DaoCreationConfig {
  tiers: NewDaoTier[]
  // For custom errors.
  _tiersError?: undefined
}
