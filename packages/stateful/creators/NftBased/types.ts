import { DurationWithUnits } from '@dao-dao/types'
import { NftMintMsg } from '@dao-dao/types/contracts/DaoVotingCw721Staked'

export enum GovernanceTokenType {
  New,
  Existing,
}

export type CreatorData = {
  tokenType: GovernanceTokenType
  newInfo: {
    initialNfts: Pick<NftMintMsg, 'owner' | 'token_uri'>[]
    label: string
    name: string
    symbol: string
  }
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
