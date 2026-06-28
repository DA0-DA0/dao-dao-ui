import {
  DaoCreationVotingConfigWithActiveThreshold,
  DurationWithUnits,
} from '@dao-dao/types'

export enum GovernanceTokenType {
  New,
  Existing,
}

export enum NftVotingModuleType {
  Staked = 'staked',
  Roles = 'roles',
}

export type CreatorData = {
  votingModuleType: NftVotingModuleType
  tokenType: GovernanceTokenType
  existingGovernanceNftCollectionAddress: string
  existingCollectionInfo?: {
    symbol: string
  }
  newInfo: {
    name: string
    symbol: string
  }
  initialNfts: {
    owner: string
    tokenId: string
    tokenUri?: string
    role?: string
    weight: number
  }[]
  // Must be loaded on Secret Network.
  secretCodeHash?: string
  unstakingDuration: DurationWithUnits
} & DaoCreationVotingConfigWithActiveThreshold
