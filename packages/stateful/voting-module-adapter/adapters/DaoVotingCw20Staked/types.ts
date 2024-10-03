import { HugeDecimal } from '@dao-dao/math'
import {
  Duration,
  GenericToken,
  GenericTokenWithUsdPrice,
  LoadingData,
} from '@dao-dao/types'
import { Claim } from '@dao-dao/types/contracts/Cw20Stake'

export interface UseStakingInfoOptions {
  fetchClaims?: boolean
  fetchTotalStakedValue?: boolean
  fetchWalletStakedValue?: boolean
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
  sumClaimsAvailable?: HugeDecimal
  // Total staked value
  loadingTotalStakedValue?: LoadingData<HugeDecimal>
  // Wallet staked value
  loadingWalletStakedValue?: LoadingData<HugeDecimal>
}

export type UseGovernanceTokenInfoOptions = {
  /**
   * Optionally fetch wallet balance. Defaults to false.
   */
  fetchWalletBalance?: boolean
  /**
   * Optionally fetch treasury balance. Defaults to false.
   */
  fetchTreasuryBalance?: boolean
  /**
   * Optionally fetch USDC price. Defaults to false.
   */
  fetchUsdcPrice?: boolean
}

export type UseGovernanceTokenInfoResponse = {
  /**
   * The generic governance token.
   */
  governanceToken: GenericToken
  /**
   * The supply of the governance token converted to the appropriate decimals.
   */
  supply: HugeDecimal
  /**
   * The staking contract address for the governance token.
   */
  stakingContractAddress: string

  // Optional, defined if options are set to true.

  /**
   * Unstaked governance token balance. Only defined if a wallet is connected
   * and the option to fetch this is true.
   */
  loadingWalletBalance?: LoadingData<HugeDecimal>
  /**
   * The treasury balance of the governance token. Only defined if the option to
   * fetch this is true.
   */
  loadingTreasuryBalance?: LoadingData<HugeDecimal>
  /**
   * The price of the governance token. Only defined if the option to fetch this
   * is true.
   */
  loadingPrice?: LoadingData<GenericTokenWithUsdPrice>
}
