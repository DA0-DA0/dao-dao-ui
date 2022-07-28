import { useWallet } from '@noahsaso/cosmodal'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import {
  CwNativeStakedBalanceVotingSelectors,
  nativeDenomBalanceSelector,
  tokenUSDCPriceSelector,
} from '@dao-dao/state'
import {
  MarketingInfoResponse,
  TokenInfoResponse,
} from '@dao-dao/state/clients/cw20-base'
import {
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'
import {
  UseGovernanceTokenInfoOptions,
  UseGovernanceTokenInfoResponse,
} from '../../../types'

export const useGovernanceTokenInfo = ({
  fetchWalletBalance = false,
  fetchTreasuryBalance = false,
  fetchPriceWithSwapAddress,
}: UseGovernanceTokenInfoOptions = {}): UseGovernanceTokenInfoResponse => {
  const { t } = useTranslation()
  const { address: walletAddress } = useWallet()
  const { coreAddress, votingModuleAddress } = useVotingModuleAdapterOptions()

  const denom = useRecoilValue(
    CwNativeStakedBalanceVotingSelectors.getConfigSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )?.denom

  const decimals = denom && nativeTokenDecimals(denom)

  if (!denom || !decimals) {
    throw new Error(t('error.loadingData'))
  }

  const governanceTokenInfo: TokenInfoResponse = {
    decimals,
    name: nativeTokenLabel(denom),
    symbol: nativeTokenLabel(denom),
    total_supply: '',
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
    fetchPriceWithSwapAddress && governanceTokenInfo
      ? tokenUSDCPriceSelector({
          denom: fetchPriceWithSwapAddress,
          tokenDecimals: governanceTokenInfo.decimals,
        })
      : constSelector(undefined)
  )

  return {
    governanceTokenAddress: denom,
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
