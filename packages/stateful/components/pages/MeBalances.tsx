import { fromBech32, toBech32 } from '@cosmjs/encoding'
import { useWallet } from '@noahsaso/cosmodal'
import { waitForAll, waitForAllSettled } from 'recoil'

import {
  MeBalances as StatelessMeBalances,
  useCachedLoading,
} from '@dao-dao/stateless'
import { LoadingData, TokenCardInfo } from '@dao-dao/types'
import { getSupportedChains, loadableToLoadingData } from '@dao-dao/utils'

import {
  allWalletNftsSelector,
  hiddenBalancesSelector,
  tokenCardLazyInfoSelector,
  walletTokenCardInfosSelector,
} from '../../recoil'
import { WalletNftCard } from '../WalletNftCard'
import { WalletTokenLine } from '../WalletTokenLine'

export const MeBalances = () => {
  const { address: walletAddress, publicKey } = useWallet()

  const tokensWithoutLazyInfo = useCachedLoading(
    walletAddress
      ? waitForAll(
          getSupportedChains().map(({ chain }) =>
            walletTokenCardInfosSelector({
              chainId: chain.chain_id,
              walletAddress: toBech32(
                chain.bech32_prefix,
                fromBech32(walletAddress).data
              ),
            })
          )
        )
      : undefined,
    []
  )

  // Load separately so they cache separately.
  const tokenLazyInfos = useCachedLoading(
    !tokensWithoutLazyInfo.loading && walletAddress
      ? waitForAllSettled(
          tokensWithoutLazyInfo.data.flat().map(({ token, unstakedBalance }) =>
            tokenCardLazyInfoSelector({
              owner: walletAddress,
              token,
              unstakedBalance,
            })
          )
        )
      : undefined,
    []
  )

  const tokens: LoadingData<TokenCardInfo[]> =
    tokensWithoutLazyInfo.loading ||
    tokenLazyInfos.loading ||
    tokensWithoutLazyInfo.data.length !== tokenLazyInfos.data.length
      ? {
          loading: true,
        }
      : {
          loading: false,
          data: tokensWithoutLazyInfo.data.flat().map((token, i) => ({
            ...token,
            lazyInfo: loadableToLoadingData(tokenLazyInfos.data[i], {
              usdUnitPrice: undefined,
              stakingInfo: undefined,
              totalBalance: token.unstakedBalance,
            }),
          })),
        }

  const nfts = useCachedLoading(
    walletAddress
      ? allWalletNftsSelector({
          walletAddress,
        })
      : undefined,
    []
  )

  const hiddenTokens = useCachedLoading(
    publicKey?.hex ? hiddenBalancesSelector(publicKey.hex) : undefined,
    []
  )

  return (
    <StatelessMeBalances
      NftCard={WalletNftCard}
      TokenLine={WalletTokenLine}
      hiddenTokens={hiddenTokens}
      nfts={nfts}
      tokens={tokens}
    />
  )
}
