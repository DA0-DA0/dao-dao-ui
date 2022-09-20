import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw20BaseSelectors,
  Cw20StakedBalanceVotingSelectors,
  usdcPerMacroTokenSelector,
} from '@dao-dao/state'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import {
  UseGovernanceTokenInfoOptions,
  UseGovernanceTokenInfoResponse,
} from '../../../types'

export const useGovernanceTokenInfo = ({
  fetchWalletBalance = false,
  fetchTreasuryBalance = false,
  fetchUsdcPrice = false,
}: UseGovernanceTokenInfoOptions = {}): UseGovernanceTokenInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { coreAddress, votingModuleAddress } = useVotingModuleAdapterOptions()

  const stakingContractAddress = useRecoilValue(
    Cw20StakedBalanceVotingSelectors.stakingContractSelector({
      contractAddress: votingModuleAddress,
    })
  )

  const governanceTokenAddress = useRecoilValue(
    Cw20StakedBalanceVotingSelectors.tokenContractSelector({
      contractAddress: votingModuleAddress,
    })
  )
  const governanceTokenInfo = useRecoilValue(
    Cw20BaseSelectors.tokenInfoSelector({
      contractAddress: governanceTokenAddress,
      params: [],
    })
  )
  const governanceTokenMarketingInfo = useRecoilValue(
    Cw20BaseSelectors.marketingInfoSelector({
      contractAddress: governanceTokenAddress,
      params: [],
    })
  )

  /// Optional

  // Wallet balance
  const walletBalance = useRecoilValue(
    fetchWalletBalance && walletAddress
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: governanceTokenAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.balance

  // Treasury balance
  const treasuryBalance = useRecoilValue(
    fetchTreasuryBalance
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: governanceTokenAddress,
          params: [{ address: coreAddress }],
        })
      : constSelector(undefined)
  )?.balance

  // Price info
  const price = useRecoilValue(
    fetchUsdcPrice
      ? usdcPerMacroTokenSelector({
          denom: governanceTokenAddress,
          decimals: governanceTokenInfo.decimals,
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
