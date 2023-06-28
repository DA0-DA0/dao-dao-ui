import { NewDaoTier } from '@dao-dao/types'

export type CreatorData = {
  tiers: NewDaoTier[]
  // For custom errors.
  _tiersError?: undefined
}
