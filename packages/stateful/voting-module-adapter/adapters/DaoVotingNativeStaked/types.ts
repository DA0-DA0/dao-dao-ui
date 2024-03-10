import {
  Duration,
  DurationWithUnits,
  GenericToken,
  GenericTokenWithUsdPrice,
  LoadingData,
} from '@dao-dao/types'
import { Claim } from '@dao-dao/types/contracts/DaoVotingNativeStaked'

export interface DaoCreationConfig {
  denom: string
  _tokenError?: string
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
  supply: number

  // Optional, defined if options are set to true.

  /**
   * Unstaked governance token balance. Only defined if a wallet is connected
   * and the option to fetch this is true.
   */
  loadingWalletBalance?: LoadingData<number>
  /**
   * The treasury balance of the governance token. Only defined if the option to
   * fetch this is true.
   */
  loadingTreasuryBalance?: LoadingData<number>
  /**
   * The price of the governance token. Only defined if the option to fetch this
   * is true.
   */
  loadingPrice?: LoadingData<GenericTokenWithUsdPrice>
}
