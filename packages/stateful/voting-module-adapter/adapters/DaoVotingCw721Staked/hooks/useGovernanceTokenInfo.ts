import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw721BaseSelectors,
  DaoVotingCw721StakedSelectors,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  UseGovernanceTokenInfoOptions,
  UseGovernanceTokenInfoResponse,
} from '@dao-dao/types'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useGovernanceTokenInfo = ({
  fetchWalletBalance = false,
  fetchTreasuryBalance = false,
}: UseGovernanceTokenInfoOptions = {}): UseGovernanceTokenInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { coreAddress, votingModuleAddress } = useVotingModuleAdapterOptions()

  const { nft_address: governanceTokenAddress } = useRecoilValue(
    DaoVotingCw721StakedSelectors.configSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const contractInfo = useRecoilValue(
    Cw721BaseSelectors.contractInfoSelector({
      contractAddress: governanceTokenAddress,
      params: [],
    })
  )

  const tokenSupplyInfo = useRecoilValue(
    Cw721BaseSelectors.numTokensSelector({
      contractAddress: governanceTokenAddress,
      params: [],
    })
  )

  const governanceTokenInfo: TokenInfoResponse = {
    decimals: 0,
    name: contractInfo.name,
    symbol: contractInfo.symbol,
    total_supply: tokenSupplyInfo.count.toString(),
  }

  /// Optional

  // Wallet balance
  const loadingWalletBalance = loadableToLoadingData(
    useCachedLoadable(
      fetchWalletBalance && walletAddress
        ? Cw721BaseSelectors.allTokensForOwnerSelector({
            contractAddress: governanceTokenAddress,
            owner: walletAddress,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  // Treasury balance
  const loadingTreasuryBalance = loadableToLoadingData(
    useCachedLoadable(
      fetchTreasuryBalance
        ? Cw721BaseSelectors.allTokensForOwnerSelector({
            contractAddress: governanceTokenAddress,
            owner: coreAddress,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  // TODO(ICS721): get floor info from marketplace
  /*
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
  */

  return {
    stakingContractAddress: votingModuleAddress,
    governanceTokenAddress,
    governanceTokenInfo,
    /// Optional
    // Wallet balance
    loadingWalletBalance: loadingWalletBalance.loading
      ? { loading: true }
      : !loadingWalletBalance.data
      ? undefined
      : {
          loading: false,
          data: Number(loadingWalletBalance.data?.length),
        },
    // Treasury balance
    loadingTreasuryBalance: loadingTreasuryBalance.loading
      ? { loading: true }
      : !loadingTreasuryBalance.data
      ? undefined
      : {
          loading: false,
          data: loadingTreasuryBalance.data.length,
        },
    // Price
    // loadingPrice: loadingPrice.loading
    //   ? { loading: true }
    //   : !loadingPrice.data
    //   ? undefined
    //   : {
    //       loading: false,
    //       data: loadingPrice.data,
    //     },
  }
}
