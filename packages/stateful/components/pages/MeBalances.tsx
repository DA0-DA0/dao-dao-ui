import { useWallet } from '@noahsaso/cosmodal'
import { useEffect } from 'react'

import {
  MeBalances as StatelessMeBalances,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { loadableToLoadingData } from '@dao-dao/utils'

import { walletNftCardInfos, walletTokenCardInfosSelector } from '../../recoil'
import { NftCard } from '../NftCard'
import { WalletTokenCard } from '../WalletTokenCard'

export const MeBalances = () => {
  const { address: walletAddress = '', chainInfo } = useWallet()

  const tokenCardInfosLoadable = useCachedLoadable(
    walletTokenCardInfosSelector({
      walletAddress,
      chainId: chainInfo?.chainId,
    })
  )
  const nftCardInfosLoadable = useCachedLoadable(
    walletNftCardInfos({
      walletAddress,
      chainId: chainInfo?.chainId,
    })
  )

  //! Loadable errors.
  useEffect(() => {
    if (tokenCardInfosLoadable.state === 'hasError') {
      console.error(tokenCardInfosLoadable.contents)
    }
    if (nftCardInfosLoadable.state === 'hasError') {
      console.error(nftCardInfosLoadable.contents)
    }
  }, [
    nftCardInfosLoadable.contents,
    nftCardInfosLoadable.state,
    tokenCardInfosLoadable.contents,
    tokenCardInfosLoadable.state,
  ])

  return (
    <StatelessMeBalances
      NftCard={NftCard}
      TokenCard={WalletTokenCard}
      nfts={loadableToLoadingData(nftCardInfosLoadable, [])}
      tokens={loadableToLoadingData(tokenCardInfosLoadable, [])}
    />
  )
}
