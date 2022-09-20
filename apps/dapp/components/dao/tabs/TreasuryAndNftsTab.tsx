// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.
import { useEffect } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import {
  nftCardInfosSelector,
  treasuryTokenCardInfosSelector,
} from '@dao-dao/state'
import {
  NftCard,
  TreasuryAndNftsTab as StatelessTreasuryAndNftsTab,
} from '@dao-dao/ui'
import { loadableToLoadingData } from '@dao-dao/utils'

import { TokenCard } from '@/components'

export const TreasuryAndNftsTab = () => {
  const daoInfo = useDaoInfoContext()

  const treasuryTokenCardInfosLoadable = useRecoilValueLoadable(
    treasuryTokenCardInfosSelector(daoInfo.coreAddress)
  )
  const nftCardInfosLoadable = useRecoilValueLoadable(
    nftCardInfosSelector(daoInfo.coreAddress)
  )

  //! Loadable errors.
  useEffect(() => {
    if (treasuryTokenCardInfosLoadable.state === 'hasError') {
      console.error(treasuryTokenCardInfosLoadable.contents)
    }
    if (nftCardInfosLoadable.state === 'hasError') {
      console.error(nftCardInfosLoadable.contents)
    }
  }, [
    nftCardInfosLoadable.contents,
    nftCardInfosLoadable.state,
    treasuryTokenCardInfosLoadable.contents,
    treasuryTokenCardInfosLoadable.state,
  ])

  return (
    <StatelessTreasuryAndNftsTab
      NftCard={NftCard}
      TokenCard={TokenCard}
      nfts={loadableToLoadingData(nftCardInfosLoadable, [])}
      tokens={loadableToLoadingData(treasuryTokenCardInfosLoadable, [])}
    />
  )
}
