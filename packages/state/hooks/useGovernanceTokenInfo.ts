import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw20BaseSelectors,
  Cw20StakedBalanceVotingSelectors,
  tokenUSDPriceSelector,
  useWallet,
} from '@dao-dao/state'
import { VotingModuleType } from '@dao-dao/utils'

import { MarketingInfoResponse, TokenInfoResponse } from '../clients/cw20-base'
import { useVotingModule } from './useVotingModule'

interface UseGovernanceTokenInfoOptions {
  fetchWalletBalance?: boolean
  fetchTreasuryBalance?: boolean
  fetchPriceWithSwapAddress?: string
}

interface UseGovernanceTokenInfoResponse {
  votingModuleType?: VotingModuleType
  stakingContractAddress?: string
  governanceTokenShouldExist: boolean
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
  const { votingModuleAddress, votingModuleType } = useVotingModule(coreAddress)
  const governanceTokenShouldExist =
    votingModuleType === VotingModuleType.Cw20StakedBalanceVoting

  const stakingContractAddress = useRecoilValue(
    votingModuleAddress && governanceTokenShouldExist
      ? Cw20StakedBalanceVotingSelectors.stakingContractSelector({
          contractAddress: votingModuleAddress,
        })
      : constSelector(undefined)
  )

  const governanceTokenAddress = useRecoilValue(
    votingModuleAddress && governanceTokenShouldExist
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
      ? tokenUSDPriceSelector({
          tokenSwapAddress: fetchPriceWithSwapAddress,
          tokenDecimals: governanceTokenInfo.decimals,
        })
      : constSelector(undefined)
  )

  return {
    votingModuleType,
    stakingContractAddress,
    governanceTokenShouldExist,
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
