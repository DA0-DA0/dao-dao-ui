import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import {
  DaoVotingNativeStakedSelectors,
  genericTokenSelector,
  nativeDenomBalanceSelector,
  nativeSupplySelector,
  wyndUsdPriceSelector,
} from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'

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

  const { denom } = useRecoilValue(
    DaoVotingNativeStakedSelectors.getConfigSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const token = useRecoilValue(
    genericTokenSelector({
      type: TokenType.Native,
      denomOrAddress: denom,
    })
  )

  const supply = useRecoilValue(nativeSupplySelector({ denom }))
  const governanceTokenInfo: TokenInfoResponse = {
    decimals: token.decimals,
    name: token.symbol,
    symbol: token.symbol,
    total_supply: supply.toString(),
  }

  /// Optional

  // Wallet balance
  const loadingWalletBalance = useCachedLoading(
    fetchWalletBalance && walletAddress
      ? nativeDenomBalanceSelector({
          walletAddress,
          denom,
        })
      : constSelector(undefined),
    undefined
  )

  // Treasury balance
  const loadingTreasuryBalance = useCachedLoading(
    fetchTreasuryBalance
      ? nativeDenomBalanceSelector({
          walletAddress: coreAddress,
          denom,
        })
      : constSelector(undefined),
    undefined
  )

  // Price info
  const loadingPrice = useCachedLoading(
    fetchUsdcPrice && governanceTokenInfo
      ? wyndUsdPriceSelector(denom)
      : constSelector(undefined),
    undefined
  )

  return {
    stakingContractAddress: '',
    governanceTokenAddress: denom,
    governanceTokenInfo,
    token,
    /// Optional
    // Wallet balance
    loadingWalletBalance: loadingWalletBalance.loading
      ? { loading: true }
      : !loadingWalletBalance.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingWalletBalance.data.amount),
        },
    // Treasury balance
    loadingTreasuryBalance: loadingTreasuryBalance.loading
      ? { loading: true }
      : !loadingTreasuryBalance.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingTreasuryBalance.data.amount),
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
