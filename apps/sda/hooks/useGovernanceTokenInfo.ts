import { useRecoilValue, constSelector } from 'recoil'

import { govTokenInfoSelector, useWallet } from '@dao-dao/state'
import { votingModuleSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { tokenUSDPriceSelector } from '@dao-dao/state/recoil/selectors/price'
import { balanceSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import { tokenContractSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'

import { DAO_ADDRESS, TOKEN_SWAP_ADDRESS } from '@/util'

interface UseGovernanceTokenInfoOptions {
  fetchWalletBalance?: boolean
  fetchTreasuryBalance?: boolean
  fetchPriceInfo?: boolean
}

interface UseGovernanceTokenInfoResponse {
  votingModuleAddress?: string
  governanceTokenAddress?: string
  governanceTokenInfo?: TokenInfoResponse
  /// Optional
  // Wallet balance
  walletBalance?: number
  // Treasury balance
  treasuryBalance?: number
  // Price info
  price?: number
  apr?: number
}

export const useGovernanceTokenInfo = ({
  fetchWalletBalance = false,
  fetchTreasuryBalance = false,
  fetchPriceInfo = false,
}: UseGovernanceTokenInfoOptions = {}): UseGovernanceTokenInfoResponse => {
  const { address: walletAddress } = useWallet()

  const votingModuleAddress = useRecoilValue(
    votingModuleSelector({ contractAddress: DAO_ADDRESS })
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
          params: [{ address: DAO_ADDRESS }],
        })
      : constSelector(undefined)
  )?.balance

  const price = useRecoilValue(
    fetchPriceInfo
      ? tokenUSDPriceSelector({
          tokenSwapAddress: TOKEN_SWAP_ADDRESS,
          tokenDecimals: governanceTokenInfo?.decimals || 6,
        })
      : constSelector(undefined)
  )
  // const price = fetchPriceInfo ? 42.2 : undefined

  // Price info
  // TODO: Retrieve APR.
  const apr = fetchPriceInfo ? 103 : undefined

  return {
    votingModuleAddress,
    governanceTokenAddress,
    governanceTokenInfo,
    /// Optional
    // Wallet balance
    walletBalance: walletBalance ? Number(walletBalance) : undefined,
    // Treasury balance
    treasuryBalance: treasuryBalance ? Number(treasuryBalance) : undefined,
    // Price info
    price,
    apr,
  }
}
