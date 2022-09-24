// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.
import { useEffect } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { addCw721Action } from '@dao-dao/actions/actions/AddCw721'
import { useDaoInfoContext } from '@dao-dao/common'
import {
  nftCardInfosSelector,
  treasuryTokenCardInfosSelector,
  useEncodedProposalPrefill,
  useVotingModule,
} from '@dao-dao/state'
import {
  NftCard,
  TreasuryAndNftsTab as StatelessTreasuryAndNftsTab,
} from '@dao-dao/ui'
import { loadableToLoadingData } from '@dao-dao/utils'

import { TokenCard } from '@/components'

export const TreasuryAndNftsTab = () => {
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

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

  const encodedProposalPrefill = useEncodedProposalPrefill({
    action: addCw721Action,
  })

  return (
    <StatelessTreasuryAndNftsTab
      NftCard={NftCard}
      TokenCard={TokenCard}
      isMember={isMember}
      nfts={loadableToLoadingData(nftCardInfosLoadable, [])}
      registerNftCollectionHref={
        encodedProposalPrefill &&
        `/dao/${daoInfo.coreAddress}/proposals/create?prefill=${encodedProposalPrefill}`
      }
      tokens={loadableToLoadingData(treasuryTokenCardInfosLoadable, [])}
    />
  )
}
