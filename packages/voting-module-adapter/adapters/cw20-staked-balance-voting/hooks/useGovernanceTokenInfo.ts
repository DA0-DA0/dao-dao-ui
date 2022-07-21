import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw20BaseSelectors,
  Cw20StakedBalanceVotingSelectors,
  tokenUSDCPriceSelector,
  useVotingModule,
} from '@dao-dao/state'
import {
  MarketingInfoResponse,
  TokenInfoResponse,
} from '@dao-dao/state/clients/cw20-base'

interface UseGovernanceTokenInfoOptions {
  fetchWalletBalance?: boolean
  fetchTreasuryBalance?: boolean
  fetchPriceWithSwapAddress?: string
}

interface UseGovernanceTokenInfoResponse {
  stakingContractAddress?: string
  governanceTokenAddress?: string
  governanceTokenInfo?: TokenInfoResponse
  governanceTokenMarketingInfo?: MarketingInfoResponse
  /// Optional
  // Wallet balance
  walletBalance?: number
  // Treasury balance
  treasuryBalance?: number
  // Price
  price?: number
}

export const useGovernanceTokenInfo = (
  coreAddress: string,
  {
    fetchWalletBalance = false,
    fetchTreasuryBalance = false,
    fetchPriceWithSwapAddress,
  }: UseGovernanceTokenInfoOptions = {}
): UseGovernanceTokenInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { votingModuleAddress } = useVotingModule(coreAddress)

  const stakingContractAddress = useRecoilValue(
    votingModuleAddress
      ? Cw20StakedBalanceVotingSelectors.stakingContractSelector({
          contractAddress: votingModuleAddress,
        })
      : constSelector(undefined)
  )

  const governanceTokenAddress = useRecoilValue(
    votingModuleAddress
      ? Cw20StakedBalanceVotingSelectors.tokenContractSelector({
          contractAddress: votingModuleAddress,
        })
      : constSelector(undefined)
  )
  const governanceTokenInfo = useRecoilValue(
    governanceTokenAddress
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: governanceTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )
  const governanceTokenMarketingInfo = useRecoilValue(
    governanceTokenAddress
      ? Cw20BaseSelectors.marketingInfoSelector({
          contractAddress: governanceTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  /// Optional

  // Wallet balance
  const walletBalance = useRecoilValue(
    fetchWalletBalance && governanceTokenAddress && walletAddress
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: governanceTokenAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.balance

  // Treasury balance
  const treasuryBalance = useRecoilValue(
    fetchTreasuryBalance && governanceTokenAddress
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: governanceTokenAddress,
          params: [{ address: coreAddress }],
        })
      : constSelector(undefined)
  )?.balance

  // Price info
  const price = useRecoilValue(
    fetchPriceWithSwapAddress && governanceTokenInfo
      ? tokenUSDCPriceSelector({
          denom: fetchPriceWithSwapAddress,
          tokenDecimals: governanceTokenInfo.decimals,
        })
      : constSelector(undefined)
  )

  return {
    stakingContractAddress,
    governanceTokenAddress,
    governanceTokenInfo,
    governanceTokenMarketingInfo,
    /// Optional
    // Wallet balance
    walletBalance: walletBalance ? Number(walletBalance) : undefined,
    // Treasury balance
    treasuryBalance: treasuryBalance ? Number(treasuryBalance) : undefined,
    // Price
    price,
  }
}
