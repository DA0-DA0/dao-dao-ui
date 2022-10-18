import { DurationWithUnits, NewDaoTier } from '@dao-dao/tstypes'

export enum GovernanceTokenType {
  New,
  Existing,
}

export interface DaoCreationConfig {
  tiers: NewDaoTier[]
  // For custom errors.
  _tiersError?: undefined
  tokenType: GovernanceTokenType
  newInfo: {
    initialSupply: number
    initialTreasuryPercent: number
    imageUrl?: string
    symbol: string
    name: string
  }
  existingGovernanceTokenAddress: string
  // TokenInfoResponse
  existingGovernanceTokenInfo?: {
    decimals: number
    name: string
    symbol: string
    total_supply: string
    _error?: undefined
  }
  unstakingDuration: DurationWithUnits
}
