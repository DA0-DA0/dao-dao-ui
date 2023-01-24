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
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import {
  loadableToLoadingData,
  nativeTokenDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'

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
  const loadingWalletBalance = loadableToLoadingData(
    useCachedLoadable(
      fetchWalletBalance && walletAddress
        ? nativeDenomBalanceSelector({
            walletAddress,
            denom,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  // Treasury balance
  const loadingTreasuryBalance = loadableToLoadingData(
    useCachedLoadable(
      fetchTreasuryBalance
        ? nativeDenomBalanceSelector({
            walletAddress: coreAddress,
            denom,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  // Price info
  const loadingPrice = loadableToLoadingData(
    useCachedLoadable(
      fetchUsdcPrice && governanceTokenInfo
        ? usdcPerMacroTokenSelector({
            denom,
            decimals: governanceTokenInfo.decimals,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  return {
    stakingContractAddress: '',
    governanceTokenAddress: denom,
    governanceTokenInfo,
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
