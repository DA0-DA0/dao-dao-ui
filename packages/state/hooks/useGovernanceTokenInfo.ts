import { useMemo } from 'react'
import { useRecoilValue, constSelector } from 'recoil'

import { govTokenInfoSelector, useWallet } from '@dao-dao/state'
import {
  infoSelector,
  votingModuleSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { balanceSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import {
  stakingContractSelector,
  tokenContractSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'
import { tokenUSDPriceSelector } from '@dao-dao/state/recoil/selectors/price'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { parseVotingModuleContractName, VotingModuleType } from '@dao-dao/utils'

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
  // All `info` queries are the same, so just use cw-core's info query.
  const votingModuleInfo = useRecoilValue(
    votingModuleAddress
      ? infoSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )
  // Ensure using the cw20 voting module.
  const governanceTokenExists = useMemo(
    () =>
      votingModuleInfo?.info.contract
        ? parseVotingModuleContractName(votingModuleInfo.info.contract) ===
          VotingModuleType.Cw20StakedBalanceVoting
        : false,
    [votingModuleInfo]
  )

  const stakingContractAddress = useRecoilValue(
    votingModuleAddress && governanceTokenExists
      ? stakingContractSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )

  const governanceTokenAddress = useRecoilValue(
    votingModuleAddress && governanceTokenExists
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
    fetchPriceWithSwapAddress && governanceTokenInfo
      ? tokenUSDPriceSelector({
          tokenSwapAddress: fetchPriceWithSwapAddress,
          tokenDecimals: governanceTokenInfo.decimals,
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
