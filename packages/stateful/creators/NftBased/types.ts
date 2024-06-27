import {
  DaoCreationVotingConfigWithActiveThreshold,
  DurationWithUnits,
} from '@dao-dao/types'

export enum GovernanceTokenType {
  New,
  Existing,
}

export type CreatorData = {
  tokenType: GovernanceTokenType
  existingGovernanceNftCollectionAddress: string
  existingGovernanceTokenInfo?: {
    name: string
    symbol: string
    total_supply?: string
    _error?: undefined
  }
  unstakingDuration: DurationWithUnits
} & DaoCreationVotingConfigWithActiveThreshold
