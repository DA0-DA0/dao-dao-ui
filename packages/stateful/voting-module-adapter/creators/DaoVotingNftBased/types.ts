import { DurationWithUnits } from '@dao-dao/types'

export enum GovernanceTokenType {
  New,
  Existing,
}

export interface VotingModuleCreatorConfig {
  tokenType: GovernanceTokenType
  existingGovernanceTokenDenomOrAddress: string
  // TokenInfoResponse
  existingGovernanceTokenInfo?: {
    name: string
    symbol: string
    total_supply?: string
    _error?: undefined
  }
  unstakingDuration: DurationWithUnits
}
