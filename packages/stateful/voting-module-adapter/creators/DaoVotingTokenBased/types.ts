import {
  DurationWithUnits,
  GenericToken,
  NewDaoTier,
  TokenType,
} from '@dao-dao/types'

export enum GovernanceTokenType {
  NewCw20,
  // CW20, native, or native token factory
  Existing,
}

export type VotingModuleCreatorConfig = {
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
  existingTokenType: TokenType.Cw20 | TokenType.Native
  existingTokenDenomOrAddress: string
  existingToken?: GenericToken & {
    _error?: undefined
  }
  existingTokenSupply?: string
  unstakingDuration: DurationWithUnits
}
