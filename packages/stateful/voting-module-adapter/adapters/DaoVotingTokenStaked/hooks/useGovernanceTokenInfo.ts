import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  DaoVotingNativeStakedSelectors,
  DaoVotingTokenStakedSelectors,
  genericTokenSelector,
  nativeDenomBalanceSelector,
  nativeSupplySelector,
  usdPriceSelector,
} from '@dao-dao/state'
import { useCachedLoading } from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'

import { TokenStakedVotingModule } from '../../../../clients'
import { useWallet } from '../../../../hooks/useWallet'
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
  const { chainId, coreAddress, votingModule } = useVotingModuleAdapterOptions()
  const { address: walletAddress } = useWallet({
    chainId,
  })

  const isTokenStaked = votingModule instanceof TokenStakedVotingModule

  const { denom } = useRecoilValue(
    isTokenStaked
      ? DaoVotingTokenStakedSelectors.denomSelector({
          chainId,
          contractAddress: votingModule.address,
          params: [],
        })
      : DaoVotingNativeStakedSelectors.getConfigSelector({
          chainId,
          contractAddress: votingModule.address,
          params: [],
        })
  )

  const [governanceToken, supply, tokenFactoryIssuerAddress] = useRecoilValue(
    waitForAll([
      genericTokenSelector({
        chainId,
        type: TokenType.Native,
        denomOrAddress: denom,
      }),
      nativeSupplySelector({
        chainId,
        denom,
      }),
      isTokenStaked
        ? DaoVotingTokenStakedSelectors.validatedTokenfactoryIssuerContractSelector(
            {
              chainId,
              contractAddress: votingModule.address,
            }
          )
        : constSelector(undefined),
    ])
  )

  /// Optional

  // Wallet balance
  const loadingWalletBalance = useCachedLoading(
    fetchWalletBalance && walletAddress
      ? nativeDenomBalanceSelector({
          chainId,
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
          chainId,
          walletAddress: coreAddress,
          denom,
        })
      : constSelector(undefined),
    undefined
  )

  // Price info
  const loadingPrice = useCachedLoading(
    fetchUsdcPrice
      ? usdPriceSelector({
          type: TokenType.Native,
          chainId,
          denomOrAddress: denom,
        })
      : constSelector(undefined),
    undefined
  )

  return {
    tokenFactoryIssuerAddress,
    governanceToken,
    supply: HugeDecimal.from(supply),
    /// Optional
    // Wallet balance
    loadingWalletBalance: loadingWalletBalance.loading
      ? { loading: true }
      : !loadingWalletBalance.data
      ? undefined
      : {
          loading: false,
          data: HugeDecimal.from(loadingWalletBalance.data.amount),
        },
    // Treasury balance
    loadingTreasuryBalance: loadingTreasuryBalance.loading
      ? { loading: true }
      : !loadingTreasuryBalance.data
      ? undefined
      : {
          loading: false,
          data: HugeDecimal.from(loadingTreasuryBalance.data.amount),
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
