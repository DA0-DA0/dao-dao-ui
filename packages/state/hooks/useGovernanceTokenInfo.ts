import { useRecoilValue, constSelector } from 'recoil'

import { useWallet } from '@dao-dao/state'
import {
  balanceSelector,
  tokenInfoSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import {
  stakingContractSelector,
  tokenContractSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'
import { tokenUSDPriceSelector } from '@dao-dao/state/recoil/selectors/price'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { VotingModuleType } from '@dao-dao/utils'

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
      ? stakingContractSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )

  const governanceTokenAddress = useRecoilValue(
    votingModuleAddress && governanceTokenShouldExist
      ? tokenContractSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )
  const governanceTokenInfo = useRecoilValue(
    governanceTokenAddress
      ? tokenInfoSelector({
          contractAddress: governanceTokenAddress,
          params: [],
        })
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
    /// Optional
    // Wallet balance
    walletBalance: walletBalance ? Number(walletBalance) : undefined,
    // Treasury balance
    treasuryBalance: treasuryBalance ? Number(treasuryBalance) : undefined,
    // Price
    price,
  }
}
