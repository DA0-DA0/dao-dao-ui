import { useRecoilValue, constSelector } from 'recoil'

import { govTokenInfoSelector, useWallet } from '@dao-dao/state'
import { votingModuleSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { balanceSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import {
  stakingContractSelector,
  tokenContractSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'
import { tokenUSDPriceSelector } from '@dao-dao/state/recoil/selectors/price'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'

interface UseGovernanceTokenInfoOptions {
  fetchWalletBalance?: boolean
  fetchTreasuryBalance?: boolean
  fetchPriceWithSwapAddress?: string
}

interface UseGovernanceTokenInfoResponse {
  votingModuleAddress?: string
  stakingContractAddress?: string
  governanceTokenAddress?: string
  governanceTokenInfo?: TokenInfoResponse
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

  const votingModuleAddress = useRecoilValue(
    votingModuleSelector({ contractAddress: coreAddress })
  )
  const stakingContractAddress = useRecoilValue(
    votingModuleAddress
      ? stakingContractSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )

  const governanceTokenAddress = useRecoilValue(
    votingModuleAddress
      ? tokenContractSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )
  const governanceTokenInfo = useRecoilValue(
    governanceTokenAddress
      ? govTokenInfoSelector(governanceTokenAddress)
      : constSelector(undefined)
  )

  /// Optional

  // Wallet balance
  const walletBalance = useRecoilValue(
    fetchWalletBalance && governanceTokenAddress && walletAddress
      ? balanceSelector({
          contractAddress: governanceTokenAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.balance

  // Treasury balance
  const treasuryBalance = useRecoilValue(
    fetchTreasuryBalance && governanceTokenAddress
      ? balanceSelector({
          contractAddress: governanceTokenAddress,
          params: [{ address: coreAddress }],
        })
      : constSelector(undefined)
  )?.balance

  // Price info
  const price = useRecoilValue(
    fetchPriceWithSwapAddress
      ? tokenUSDPriceSelector({
          tokenSwapAddress: fetchPriceWithSwapAddress,
          tokenDecimals: governanceTokenInfo?.decimals || 6,
        })
      : constSelector(undefined)
  )

  return {
    votingModuleAddress,
    stakingContractAddress,
    governanceTokenAddress,
    governanceTokenInfo,
    /// Optional
    // Wallet balance
    walletBalance: walletBalance ? Number(walletBalance) : undefined,
    // Treasury balance
    treasuryBalance: treasuryBalance ? Number(treasuryBalance) : undefined,
    // Price
    price,
  }
}
