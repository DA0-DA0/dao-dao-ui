// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.
import { useEffect } from 'react'

import { useActionForKey } from '@dao-dao/actions'
import { StargazeNftImportModal } from '@dao-dao/common'
import {
  nftCardInfosSelector,
  treasuryTokenCardInfosSelector,
  useCachedLoadable,
  useEncodedCwdProposalSinglePrefill,
  useVotingModule,
} from '@dao-dao/state'
import { ActionKey } from '@dao-dao/types'
import {
  NftCard,
  TreasuryAndNftsTab as StatelessTreasuryAndNftsTab,
  useDaoInfoContext,
} from '@dao-dao/ui'
import { loadableToLoadingData } from '@dao-dao/utils'

import { TokenCard } from '@/components'

export const TreasuryAndNftsTab = () => {
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

  const treasuryTokenCardInfosLoadable = useCachedLoadable(
    treasuryTokenCardInfosSelector({ coreAddress: daoInfo.coreAddress })
  )
  const nftCardInfosLoadable = useCachedLoadable(
    nftCardInfosSelector({ coreAddress: daoInfo.coreAddress })
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

  const addCw721Action = useActionForKey(ActionKey.AddCw721)
  // Prefill URL only valid if action exists.
  const prefillValid = !!addCw721Action
  const encodedProposalPrefill = useEncodedCwdProposalSinglePrefill({
    actions: addCw721Action
      ? [
          {
            action: addCw721Action,
            data: addCw721Action.useDefaults(),
          },
        ]
      : [],
  })

  return (
    <StatelessTreasuryAndNftsTab
      NftCard={NftCard}
      StargazeNftImportModal={StargazeNftImportModal}
      TokenCard={TokenCard}
      addCollectionHref={
        prefillValid && encodedProposalPrefill
          ? `/dao/${daoInfo.coreAddress}/proposals/create?prefill=${encodedProposalPrefill}`
          : undefined
      }
      isMember={isMember}
      nfts={loadableToLoadingData(nftCardInfosLoadable, [])}
      tokens={loadableToLoadingData(treasuryTokenCardInfosLoadable, [])}
    />
  )
}
