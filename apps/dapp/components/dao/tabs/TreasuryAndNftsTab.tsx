// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { makeAddCw721Action } from '@dao-dao/actions/actions/AddCw721'
import { StargazeNftImportModal } from '@dao-dao/common'
import {
  nftCardInfosSelector,
  treasuryTokenCardInfosSelector,
  useCachedLoadable,
  useEncodedCwdProposalSinglePrefill,
  useVotingModule,
} from '@dao-dao/state'
import { ActionContextType } from '@dao-dao/tstypes'
import {
  NftCard,
  TreasuryAndNftsTab as StatelessTreasuryAndNftsTab,
  useDaoInfoContext,
} from '@dao-dao/ui'
import { loadableToLoadingData } from '@dao-dao/utils'

import { TokenCard } from '@/components'

export const TreasuryAndNftsTab = () => {
  const { t } = useTranslation()
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

  // Only make the action once.
  // TODO: Get from Actions provider once made.
  const [addCw721Action] = useState(
    () =>
      makeAddCw721Action({
        t,
        address: daoInfo.coreAddress,
        context: {
          type: ActionContextType.Dao,
          coreVersion: daoInfo.coreVersion,
        },
      })!
  )
  const encodedProposalPrefill = useEncodedCwdProposalSinglePrefill({
    actions: [
      {
        action: addCw721Action,
        data: addCw721Action.useDefaults(),
      },
    ],
  })

  return (
    <StatelessTreasuryAndNftsTab
      NftCard={NftCard}
      StargazeNftImportModal={StargazeNftImportModal}
      TokenCard={TokenCard}
      addCollectionHref={
        encodedProposalPrefill &&
        `/dao/${daoInfo.coreAddress}/proposals/create?prefill=${encodedProposalPrefill}`
      }
      isMember={isMember}
      nfts={loadableToLoadingData(nftCardInfosLoadable, [])}
      tokens={loadableToLoadingData(treasuryTokenCardInfosLoadable, [])}
    />
  )
}
