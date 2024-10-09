import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { omniflixQueries } from '@dao-dao/state/query'
import {
  NftsTab,
  PAGINATION_MIN_PAGE,
  useChain,
  useQuerySyncedState,
} from '@dao-dao/stateless'
import { LazyNftCardInfo } from '@dao-dao/types'
import { getNftKey } from '@dao-dao/utils'

import { LazyNftCard } from '../../../../components'
import { useQueryLoadingData } from '../../../../hooks'
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

  const numNfts = useQueryLoadingData(
    omniflixQueries.onftCollectionSupply({
      chainId,
      id: collectionAddress,
    }),
    0
  )

  const queryClient = useQueryClient()
  const allTokens = useQueryLoadingData(
    omniflixQueries.paginatedOnfts(queryClient, {
      chainId,
      id: collectionAddress,
      page,
      pageSize: NFTS_PER_PAGE,
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
                ({ id }): LazyNftCardInfo => ({
                  key: getNftKey(chainId, collectionAddress, id),
                  chainId,
                  collectionAddress,
                  tokenId: id,
                  stakingContractAddress,
                  type: 'owner',
                })
              ),
            }
      }
      numNfts={numNfts}
      page={page}
      pageSize={NFTS_PER_PAGE}
      setPage={setPage}
    />
  )
}
