import { useWallet } from '@noahsaso/cosmodal'

import {
  MeBalances as StatelessMeBalances,
  useCachedLoading,
} from '@dao-dao/stateless'

import {
  hiddenBalancesSelector,
  walletNativeAndStargazeNftsSelector,
  walletTokenCardInfosSelector,
} from '../../recoil'
import { NftCard } from '../NftCard'
import { WalletTokenCard } from '../WalletTokenCard'

export const MeBalances = () => {
  const { address: walletAddress, publicKey, chainInfo } = useWallet()

  const tokens = useCachedLoading(
    walletAddress
      ? walletTokenCardInfosSelector({
          walletAddress,
          chainId: chainInfo?.chainId,
        })
      : undefined,
    []
  )

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
      NftCard={NftCard}
      TokenCard={WalletTokenCard}
      hiddenTokens={hiddenTokens}
      nfts={nfts}
      tokens={tokens}
    />
  )
}
