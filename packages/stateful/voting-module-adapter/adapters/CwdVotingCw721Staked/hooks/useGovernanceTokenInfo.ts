import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw721BaseSelectors,
  CwdVotingCw721StakedSelectors,
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
import { loadableToLoadingData } from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useGovernanceTokenInfo = ({
  fetchWalletBalance = false,
  fetchLoadingWalletBalance = false,
  fetchTreasuryBalance = false,
}: UseGovernanceTokenInfoOptions = {}): UseGovernanceTokenInfoResponse => {
  const { address: walletAddress } = useWallet()
  const { coreAddress, votingModuleAddress } = useVotingModuleAdapterOptions()

  const { nft_address: governanceTokenAddress } = useRecoilValue(
    CwdVotingCw721StakedSelectors.configSelector({
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

  const governanceTokenMarketingInfo: MarketingInfoResponse = {
    description: null,
    logo: null,
    marketing: null,
    project: null,
  }

  /// Optional

  // Wallet balance
  const walletBalance = useRecoilValue(
    fetchWalletBalance && walletAddress
      ? Cw721BaseSelectors.tokensSelector({
          contractAddress: governanceTokenAddress,
          params: [{ owner: walletAddress }],
        })
      : constSelector(undefined)
  )

  const loadingWalletBalance = loadableToLoadingData(
    useCachedLoadable(
      fetchLoadingWalletBalance && walletAddress
        ? Cw721BaseSelectors.tokensSelector({
            contractAddress: governanceTokenAddress,
            params: [{ owner: walletAddress }],
          })
        : constSelector(undefined)
    ),
    undefined
  )

  // Treasury balance
  const treasuryBalance = useRecoilValue(
    fetchTreasuryBalance
      ? Cw721BaseSelectors.tokensSelector({
          contractAddress: governanceTokenAddress,
          params: [{ owner: coreAddress }],
        })
      : constSelector(undefined)
  )

  /*
  TODO: get floor info from marketplace?
  // Price info
  const price = useRecoilValue(
    fetchUsdcPrice && governanceTokenInfo
      ? usdcPerMacroTokenSelector({
          denom,
          decimals: governanceTokenInfo.decimals,
        })
      : constSelector(undefined)
  )?.amount
  */

  return {
    stakingContractAddress: votingModuleAddress,
    governanceTokenAddress,
    governanceTokenInfo,
    governanceTokenMarketingInfo,
    /// Optional
    // Wallet balance
    walletBalance: walletBalance?.tokens
      ? Number(walletBalance?.tokens.length)
      : undefined,
    loadingWalletBalance: loadingWalletBalance.loading
      ? { loading: true }
      : !loadingWalletBalance.data?.tokens
      ? undefined
      : {
          loading: false,
          data: Number(loadingWalletBalance.data?.tokens?.length),
        },
    // Treasury balance
    treasuryBalance: treasuryBalance?.tokens
      ? Number(treasuryBalance?.tokens.length)
      : undefined,
    // Price
    //price,
  }
}
