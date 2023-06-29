import { useTranslation } from 'react-i18next'

import { Cw721BaseSelectors } from '@dao-dao/state/recoil'
import { NftsTab, useCachedLoading } from '@dao-dao/stateless'

import { LazyNftCard } from '../../../../components'
import { useGovernanceCollectionInfo } from '../hooks'

export const NftCollectionTab = () => {
  const { t } = useTranslation()
  const { collectionAddress, stakingContractAddress } =
    useGovernanceCollectionInfo()

  const allTokens = useCachedLoading(
    Cw721BaseSelectors.allTokensSelector({
      contractAddress: collectionAddress,
    }),
    []
  )

  return (
    <NftsTab
      NftCard={LazyNftCard}
      description={t('info.nftCollectionExplanation', { context: 'all' })}
      nfts={
        allTokens.loading
          ? { loading: true }
          : {
              loading: false,
              data: allTokens.data.map((tokenId) => ({
                collectionAddress,
                tokenId,
                stakingContractAddress,
                key: collectionAddress + tokenId,
              })),
            }
      }
    />
  )
}
