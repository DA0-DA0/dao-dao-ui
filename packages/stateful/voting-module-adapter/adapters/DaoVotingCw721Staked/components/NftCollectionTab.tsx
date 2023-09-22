import { useTranslation } from 'react-i18next'

import { CommonNftSelectors } from '@dao-dao/state/recoil'
import { NftsTab, useCachedLoading, useChain } from '@dao-dao/stateless'
import { LazyNftCardProps } from '@dao-dao/types'

import { LazyNftCard } from '../../../../components'
import { useGovernanceCollectionInfo } from '../hooks'

export const NftCollectionTab = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { collectionAddress, stakingContractAddress } =
    useGovernanceCollectionInfo()

  const allTokens = useCachedLoading(
    CommonNftSelectors.allTokensSelector({
      chainId,
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
              data: allTokens.data.map(
                (tokenId): LazyNftCardProps & { key: string } => ({
                  chainId,
                  collectionAddress,
                  tokenId,
                  stakingContractAddress,
                  key: chainId + collectionAddress + tokenId,
                  type: 'owner',
                })
              ),
            }
      }
    />
  )
}
