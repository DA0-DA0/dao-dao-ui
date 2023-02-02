import {
  AmountWithTimestampAndDenom,
  Duration,
  DurationWithUnits,
  GenericToken,
  LoadingData,
  NewDaoTier,
} from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import { Claim } from '@dao-dao/types/contracts/Cw20Stake'

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
  claims?: Claim[]
  claimsPending?: Claim[]
  claimsAvailable?: Claim[]
  sumClaimsAvailable?: number
  // Total staked value
  loadingTotalStakedValue?: LoadingData<number>
  // Wallet staked value
  loadingWalletStakedValue?: LoadingData<number>
}

export interface UseGovernanceTokenInfoOptions {
  fetchWalletBalance?: boolean
  fetchTreasuryBalance?: boolean
  fetchUsdcPrice?: boolean
}

export interface UseGovernanceTokenInfoResponse {
  stakingContractAddress: string
  governanceTokenAddress: string
  governanceTokenInfo: TokenInfoResponse
  token: GenericToken
  /// Optional
  // Wallet balance
  loadingWalletBalance?: LoadingData<number>
  // Treasury balance
  loadingTreasuryBalance?: LoadingData<number>
  // Price
  loadingPrice?: LoadingData<AmountWithTimestampAndDenom>
}
