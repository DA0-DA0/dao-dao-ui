import { useTranslation } from 'react-i18next'

import { omniflixQueries } from '@dao-dao/state/query'
import {
  NftsTab,
  PAGINATION_MIN_PAGE,
  useChain,
  useQuerySyncedState,
} from '@dao-dao/stateless'
import { getNftKey } from '@dao-dao/utils'

import { LazyNftCard } from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useGovernanceCollectionInfo } from '../hooks'

const NFTS_PER_PAGE = 30

export const NftCollectionTab = () => {
  const { t } = useTranslation()
  const { chainId } = useChain()
  const { collectionAddress, stakingContractAddress } =
    useGovernanceCollectionInfo()

  const [page, setPage] = useQuerySyncedState({
    param: 'np',
    defaultValue: PAGINATION_MIN_PAGE,
  })

  const numNfts = useQueryLoadingDataWithError(
    omniflixQueries.onftCollectionSupply({
      chainId,
      id: collectionAddress,
    })
  )

  const nfts = useQueryLoadingDataWithError(
    omniflixQueries.paginatedOnfts({
      chainId,
      id: collectionAddress,
      page,
      pageSize: NFTS_PER_PAGE,
    }),
    (data) =>
      data.map(({ id }) => ({
        key: getNftKey(chainId, collectionAddress, id),
        chainId,
        collectionAddress,
        tokenId: id,
        stakingContractAddress,
        type: 'owner' as const,
      }))
  )

  return (
    <NftsTab
      NftCard={LazyNftCard}
      description={t('info.nftCollectionExplanation', { context: 'all' })}
      nfts={nfts}
      numNfts={numNfts}
      page={page}
      pageSize={NFTS_PER_PAGE}
      setPage={setPage}
    />
  )
}
