import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw20BaseSelectors,
  DaoVotingCw20StakedSelectors,
  wyndUsdPriceSelector,
} from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import {
  UseGovernanceTokenInfoOptions,
  UseGovernanceTokenInfoResponse,
} from '../types'

export const useGovernanceTokenInfo = ({
  fetchWalletBalance = false,
  fetchTreasuryBalance = false,
  fetchUsdcPrice = false,
}: UseGovernanceTokenInfoOptions = {}): UseGovernanceTokenInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { coreAddress, votingModuleAddress } = useVotingModuleAdapterOptions()

  const stakingContractAddress = useRecoilValue(
    DaoVotingCw20StakedSelectors.stakingContractSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const governanceTokenAddress = useRecoilValue(
    DaoVotingCw20StakedSelectors.tokenContractSelector({
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

  /// Optional

  // Wallet balance
  const loadingWalletBalance = useCachedLoading(
    fetchWalletBalance && walletAddress
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: governanceTokenAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined),
    undefined
  )

  // Treasury balance
  const loadingTreasuryBalance = useCachedLoading(
    fetchTreasuryBalance
      ? Cw20BaseSelectors.balanceSelector({
          contractAddress: governanceTokenAddress,
          params: [{ address: coreAddress }],
        })
      : constSelector(undefined),
    undefined
  )

  // Price info
  const loadingPrice = useCachedLoading(
    fetchUsdcPrice
      ? wyndUsdPriceSelector(governanceTokenAddress)
      : constSelector(undefined),
    undefined
  )

  return {
    stakingContractAddress,
    governanceTokenAddress,
    governanceTokenInfo,
    token: {
      type: TokenType.Cw20,
      denomOrAddress: governanceTokenAddress,
      symbol: governanceTokenInfo.symbol,
      decimals: governanceTokenInfo.decimals,
      imageUrl: undefined,
    },
    /// Optional
    // Wallet balance
    loadingWalletBalance: loadingWalletBalance.loading
      ? { loading: true }
      : !loadingWalletBalance.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingWalletBalance.data.balance),
        },
    // Treasury balance
    loadingTreasuryBalance: loadingTreasuryBalance.loading
      ? { loading: true }
      : !loadingTreasuryBalance.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingTreasuryBalance.data.balance),
        },
    // Price
    loadingPrice: loadingPrice.loading
      ? { loading: true }
      : !loadingPrice.data
      ? undefined
      : {
          loading: false,
          data: loadingPrice.data,
        },
  }
}
