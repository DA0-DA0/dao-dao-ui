import { useWallet } from '@noahsaso/cosmodal'
import { waitForAllSettled } from 'recoil'

import {
  MeBalances as StatelessMeBalances,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { LoadingData, TokenCardInfo } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import {
  hiddenBalancesSelector,
  tokenCardLazyInfoSelector,
  walletNativeAndStargazeNftsSelector,
  walletTokenCardInfosSelector,
} from '../../recoil'
import { WalletNftCard } from '../WalletNftCard'
import { WalletTokenLine } from '../WalletTokenLine'

export const MeBalances = () => {
  const { chain_id: chainId } = useChain()
  const { address: walletAddress, publicKey } = useWallet()

  const tokensWithoutLazyInfo = useCachedLoading(
    walletAddress
      ? walletTokenCardInfosSelector({
          walletAddress,
          chainId,
        })
      : undefined,
    []
  )

  // Load separately so they cache separately.
  const tokenLazyInfos = useCachedLoading(
    !tokensWithoutLazyInfo.loading && walletAddress
      ? waitForAllSettled(
          tokensWithoutLazyInfo.data.map(({ token, unstakedBalance }) =>
            tokenCardLazyInfoSelector({
              owner: walletAddress,
              chainId,
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
          data: tokensWithoutLazyInfo.data.map((token, i) => ({
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
      ? walletNativeAndStargazeNftsSelector(walletAddress)
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
