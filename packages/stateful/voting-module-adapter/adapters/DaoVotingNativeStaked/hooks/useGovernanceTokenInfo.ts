import { useWallet } from '@noahsaso/cosmodal'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import {
  DaoVotingNativeStakedSelectors,
  nativeDenomBalanceSelector,
  nativeSupplySelector,
  wyndUsdPriceSelector,
} from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import {
  getFallbackImage,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

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
  const { t } = useTranslation()
  const { address: walletAddress } = useWallet()
  const { coreAddress, votingModuleAddress } = useVotingModuleAdapterOptions()

  const { denom } = useRecoilValue(
    DaoVotingNativeStakedSelectors.getConfigSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const decimals = nativeTokenDecimals(denom)
  if (decimals === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const supply = useRecoilValue(nativeSupplySelector({ denom }))
  const governanceTokenInfo: TokenInfoResponse = {
    decimals,
    name: nativeTokenLabel(denom),
    symbol: nativeTokenLabel(denom),
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
    token: {
      type: TokenType.Native,
      denomOrAddress: denom,
      symbol: governanceTokenInfo.symbol,
      decimals,
      imageUrl: nativeTokenLogoURI(denom) || getFallbackImage(denom),
    },
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
