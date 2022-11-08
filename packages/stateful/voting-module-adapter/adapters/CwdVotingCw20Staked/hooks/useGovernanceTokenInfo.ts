import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw20BaseSelectors,
  CwdVotingCw20StakedSelectors,
  usdcPerMacroTokenSelector,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  UseGovernanceTokenInfoOptions,
  UseGovernanceTokenInfoResponse,
} from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useGovernanceTokenInfo = ({
  fetchWalletBalance = false,
  fetchLoadingWalletBalance = false,
  fetchTreasuryBalance = false,
  fetchUsdcPrice = false,
}: UseGovernanceTokenInfoOptions = {}): UseGovernanceTokenInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { coreAddress, votingModuleAddress } = useVotingModuleAdapterOptions()

  const stakingContractAddress = useRecoilValue(
    CwdVotingCw20StakedSelectors.stakingContractSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const governanceTokenAddress = useRecoilValue(
    CwdVotingCw20StakedSelectors.tokenContractSelector({
      contractAddress: votingModuleAddress,
      params: [],
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
  const loadingWalletBalance = loadableToLoadingData(
    useCachedLoadable(
      fetchLoadingWalletBalance && walletAddress
        ? Cw20BaseSelectors.balanceSelector({
            contractAddress: governanceTokenAddress,
            params: [{ address: walletAddress }],
          })
        : constSelector(undefined)
    ),
    undefined
  )

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
  )?.amount

  return {
    stakingContractAddress,
    governanceTokenAddress,
    governanceTokenInfo,
    governanceTokenMarketingInfo,
    /// Optional
    // Wallet balance
    walletBalance: walletBalance ? Number(walletBalance) : undefined,
    loadingWalletBalance: loadingWalletBalance.loading
      ? { loading: true }
      : !loadingWalletBalance.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingWalletBalance.data.balance),
        },
    // Treasury balance
    treasuryBalance: treasuryBalance ? Number(treasuryBalance) : undefined,
    // Price
    price,
  }
}
