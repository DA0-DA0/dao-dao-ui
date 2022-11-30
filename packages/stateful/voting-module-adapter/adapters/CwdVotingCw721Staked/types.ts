import { DurationWithUnits } from '@dao-dao/types'

export enum GovernanceTokenType {
  New,
  Existing,
}

export interface DaoCreationConfig {
  tokenType: GovernanceTokenType
  newInfo?: {
    initialSupply: number
    initialTreasuryPercent: number
    imageUrl?: string
    symbol: string
    name: string
  }
  existingGovernanceTokenAddress: string
  // TokenInfoResponse
  existingGovernanceTokenInfo?: {
    name: string
    symbol: string
    total_supply?: string
    _error?: undefined
  }
  unstakingDuration: DurationWithUnits
}
