// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.
import { useEffect } from 'react'

import {
  StargazeNftImportModal,
  useEncodedCwdProposalSinglePrefill,
} from '@dao-dao/common'
import { useActionForKey } from '@dao-dao/common/actions'
import {
  nftCardInfosSelector,
  treasuryTokenCardInfosSelector,
  useVotingModule,
} from '@dao-dao/state'
import {
  NftCard,
  TreasuryAndNftsTab as StatelessTreasuryAndNftsTab,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { ActionKey } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'
import {
  useCw20GovernanceTokenInfoResponseIfExists,
  useNativeGovernanceTokenInfoResponseIfExists,
} from '@dao-dao/voting-module-adapter'

import { TokenCard } from '@/components'

export const TreasuryAndNftsTab = () => {
  const daoInfo = useDaoInfoContext()
  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    chainId: daoInfo.chainId,
    fetchMembership: true,
  })
  const { governanceTokenAddress: cw20GovernanceTokenAddress } =
    useCw20GovernanceTokenInfoResponseIfExists() ?? {}
  const { governanceTokenAddress: nativeGovernanceTokenDenom } =
    useNativeGovernanceTokenInfoResponseIfExists() ?? {}

  const treasuryTokenCardInfosLoadable = useCachedLoadable(
    treasuryTokenCardInfosSelector({
      coreAddress: daoInfo.coreAddress,
      chainId: daoInfo.chainId,
      cw20GovernanceTokenAddress,
      nativeGovernanceTokenDenom,
    })
  )
  const nftCardInfosLoadable = useCachedLoadable(
    nftCardInfosSelector({
      coreAddress: daoInfo.coreAddress,
      chainId: daoInfo.chainId,
    })
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
