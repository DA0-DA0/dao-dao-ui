import {
  Duration,
  DurationWithUnits,
  LoadingData,
  LoadingDataWithError,
  NftCardInfo,
} from '@dao-dao/types'
import { NftClaim } from '@dao-dao/types/contracts/DaoVotingCw721Staked'

export enum GovernanceTokenType {
  New,
  Existing,
}

export interface DaoCreationConfig {
  tokenType: GovernanceTokenType
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

export interface UseStakingInfoOptions {
  fetchClaims?: boolean
  fetchTotalStakedValue?: boolean
  fetchWalletStakedValue?: boolean
  fetchWalletUnstakedValue?: boolean
}

export interface UseStakingInfoResponse {
  stakingContractAddress: string
  unstakingDuration?: Duration
  refreshTotals: () => void
  /// Optional
  // Claims
  blockHeight?: number
  refreshClaims?: () => void
  claims?: NftClaim[]
  claimsPending?: NftClaim[]
  claimsAvailable?: NftClaim[]
  sumClaimsAvailable?: number
  // Total staked value
  loadingTotalStakedValue?: LoadingData<number>
  // Wallet staked value
  loadingWalletStakedValue?: LoadingData<number>
  loadingWalletStakedNfts?: LoadingDataWithError<NftCardInfo[]>
  loadingWalletUnstakedNfts?: LoadingDataWithError<NftCardInfo[]>
}
