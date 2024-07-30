import { Coin } from '@cosmjs/amino'

import {
  DaoCreationVotingConfigWithActiveThreshold,
  DurationWithUnits,
  GenericToken,
  NewDaoTier,
} from '@dao-dao/types'

export enum GovernanceTokenType {
  New,
  // CW20 or native/token factory
  Existing,
}

export type CreatorData = {
  tiers: NewDaoTier[]
  // For custom errors.
  _tiersError?: undefined
  tokenType: GovernanceTokenType
  newInfo: {
    initialSupply: number
    initialTreasuryPercent: number
    // For BitSong which needs an up front max.
    maxSupply?: number
    imageUrl?: string
    symbol: string
    name: string
  }
  existingTokenDenomOrAddress: string
  existingToken?: GenericToken & {
    _error?: undefined
  }
  existingTokenSupply?: string
  unstakingDuration: DurationWithUnits
  /**
   * If defined, use a custom cw20 staking contract instead of creating a new
   * one with the specified unstaking duration. Does not work for native.
   */
  customStakingAddress?: string
  /**
   * On Secret Network, load the code hash of the custom staking contract.
   */
  customStakingCodeHash?: string
  // If token factory denom requires a creation fee, this should be set.
  tokenFactoryDenomCreationFee?: Coin[]
} & DaoCreationVotingConfigWithActiveThreshold
