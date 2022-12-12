import { useWallet } from '@noahsaso/cosmodal'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import {
  DaoVotingNativeStakedSelectors,
  nativeDenomBalanceSelector,
  nativeSupplySelector,
  usdcPerMacroTokenSelector,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  UseGovernanceTokenInfoOptions,
  UseGovernanceTokenInfoResponse,
} from '@dao-dao/types'
import {
  MarketingInfoResponse,
  TokenInfoResponse,
} from '@dao-dao/types/contracts/Cw20Base'
import {
  loadableToLoadingData,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useGovernanceTokenInfo = ({
  fetchWalletBalance = false,
  fetchLoadingWalletBalance = false,
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

  const tokenUri = nativeTokenLogoURI(denom)
  const governanceTokenMarketingInfo: MarketingInfoResponse = {
    description: null,
    logo: tokenUri ? { url: tokenUri } : null,
    marketing: null,
    project: null,
  }

  /// Optional

  // Wallet balance
  const walletBalance = useRecoilValue(
    fetchWalletBalance && walletAddress
      ? nativeDenomBalanceSelector({
          walletAddress,
          denom,
        })
      : constSelector(undefined)
  )?.amount
  const loadingWalletBalance = loadableToLoadingData(
    useCachedLoadable(
      fetchLoadingWalletBalance && walletAddress
        ? nativeDenomBalanceSelector({
            walletAddress,
            denom,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  // Treasury balance
  const treasuryBalance = useRecoilValue(
    fetchTreasuryBalance
      ? nativeDenomBalanceSelector({
          walletAddress: coreAddress,
          denom,
        })
      : constSelector(undefined)
  )?.amount

  // Price info
  const price = useRecoilValue(
    fetchUsdcPrice && governanceTokenInfo
      ? usdcPerMacroTokenSelector({
          denom,
          decimals: governanceTokenInfo.decimals,
        })
      : constSelector(undefined)
  )?.amount

  return {
    stakingContractAddress: '',
    governanceTokenAddress: denom,
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
          data: Number(loadingWalletBalance.data.amount),
        },
    // Treasury balance
    treasuryBalance: treasuryBalance ? Number(treasuryBalance) : undefined,
    // Price
    price,
  }
}
