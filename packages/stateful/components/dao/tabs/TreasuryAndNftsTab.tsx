import { useEffect } from 'react'

import {
  TreasuryAndNftsTab as StatelessTreasuryAndNftsTab,
  useCachedLoadable,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { CoreActionKey } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useCoreActionForKey } from '../../../actions'
import {
  useEncodedDaoProposalSinglePrefill,
  useMembership,
} from '../../../hooks'
import {
  nftCardInfosForDaoSelector,
  treasuryTokenCardInfosSelector,
} from '../../../recoil'
import {
  useCw20GovernanceTokenInfoResponseIfExists,
  useCw721GovernanceTokenInfoResponseIfExists,
  useNativeGovernanceTokenInfoResponseIfExists,
} from '../../../voting-module-adapter'
import { NftCard } from '../../NftCard'
import { StargazeNftImportModal } from '../../StargazeNftImportModal'
import { TokenCard } from '../TokenCard'

export const TreasuryAndNftsTab = () => {
  const daoInfo = useDaoInfoContext()
  const { getDaoProposalPath } = useNavHelpers()
  const { isMember = false } = useMembership(daoInfo)
  const { governanceTokenAddress: cw20GovernanceTokenAddress } =
    useCw20GovernanceTokenInfoResponseIfExists() ?? {}
  const { governanceTokenAddress: nativeGovernanceTokenDenom } =
    useNativeGovernanceTokenInfoResponseIfExists() ?? {}
  const { governanceTokenAddress: cw721GovernanceCollectionAddress } =
    useCw721GovernanceTokenInfoResponseIfExists() ?? {}

  const treasuryTokenCardInfosLoadable = useCachedLoadable(
    treasuryTokenCardInfosSelector({
      coreAddress: daoInfo.coreAddress,
      chainId: daoInfo.chainId,
      cw20GovernanceTokenAddress,
      nativeGovernanceTokenDenom,
    })
  )
  const nftCardInfosLoadable = useCachedLoadable(
    nftCardInfosForDaoSelector({
      coreAddress: daoInfo.coreAddress,
      chainId: daoInfo.chainId,
      governanceCollectionAddress: cw721GovernanceCollectionAddress,
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

  // ManageCw721 action defaults to adding
  const addCw721Action = useCoreActionForKey(CoreActionKey.ManageCw721)
  // Prefill URL only valid if action exists.
  const prefillValid = !!addCw721Action
  const encodedProposalPrefill = useEncodedDaoProposalSinglePrefill({
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
          ? getDaoProposalPath(daoInfo.coreAddress, 'create', {
              prefill: encodedProposalPrefill,
            })
          : undefined
      }
      isMember={isMember}
      nfts={loadableToLoadingData(nftCardInfosLoadable, [])}
      tokens={loadableToLoadingData(treasuryTokenCardInfosLoadable, [])}
    />
  )
}
