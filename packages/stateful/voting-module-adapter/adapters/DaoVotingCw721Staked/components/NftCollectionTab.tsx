import { useTranslation } from 'react-i18next'

import { CommonNftSelectors } from '@dao-dao/state/recoil'
import {
  NftsTab,
  PAGINATION_MIN_PAGE,
  useCachedLoading,
  useChain,
  useQuerySyncedState,
} from '@dao-dao/stateless'
import { LazyNftCardInfo } from '@dao-dao/types'
import { getNftKey } from '@dao-dao/utils'

import { LazyNftCard } from '../../../../components'
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

  const numNfts = useCachedLoading(
    CommonNftSelectors.numTokensSelector({
      chainId,
      contractAddress: collectionAddress,
      params: [],
    }),
    { count: 0 }
  )

  const allTokens = useCachedLoading(
    CommonNftSelectors.paginatedAllTokensSelector({
      chainId,
      contractAddress: collectionAddress,
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
                (tokenId): LazyNftCardInfo => ({
                  key: getNftKey(chainId, collectionAddress, tokenId),
                  chainId,
                  collectionAddress,
                  tokenId,
                  stakingContractAddress,
                  type: 'owner',
                })
              ),
            }
      }
      numNfts={
        numNfts.loading
          ? { loading: true }
          : { loading: false, data: numNfts.data.count }
      }
      page={page}
      pageSize={NFTS_PER_PAGE}
      setPage={setPage}
    />
  )
}
