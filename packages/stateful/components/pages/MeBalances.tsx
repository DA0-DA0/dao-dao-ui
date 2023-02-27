import { useWallet } from '@noahsaso/cosmodal'

import {
  MeBalances as StatelessMeBalances,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { loadableToLoadingData } from '@dao-dao/utils'

import {
  hiddenBalancesSelector,
  walletNativeAndStargazeNftsSelector,
  walletTokenCardInfosSelector,
} from '../../recoil'
import { NftCard } from '../NftCard'
import { TokenLine } from '../TokenLine'
import { WalletTokenCard } from '../WalletTokenCard'

export const MeBalances = () => {
  const { address: walletAddress, publicKey, chainInfo } = useWallet()

  const tokens = loadableToLoadingData(
    useCachedLoadable(
      walletAddress
        ? walletTokenCardInfosSelector({
            walletAddress,
            chainId: chainInfo?.chainId,
          })
        : undefined
    ),
    []
  )

  const nfts = loadableToLoadingData(
    useCachedLoadable(
      walletAddress
        ? walletNativeAndStargazeNftsSelector(walletAddress)
        : undefined
    ),
    []
  )

  const hiddenTokens = loadableToLoadingData(
    useCachedLoadable(
      publicKey?.hex ? hiddenBalancesSelector(publicKey.hex) : undefined
    ),
    []
  )

  return (
    <StatelessMeBalances
      NftCard={NftCard}
      TokenCard={WalletTokenCard}
      TokenLine={TokenLine}
      hiddenTokens={hiddenTokens}
      nfts={nfts}
      tokens={tokens}
    />
  )
}
