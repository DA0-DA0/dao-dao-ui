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
  existingCollectionInfo?: {
    symbol: string
  }
  // Must be loaded on Secret Network.
  secretCodeHash?: string
  unstakingDuration: DurationWithUnits
} & DaoCreationVotingConfigWithActiveThreshold
