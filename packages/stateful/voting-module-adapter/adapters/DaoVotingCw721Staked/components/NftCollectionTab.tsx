import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CommonNftSelectors } from '@dao-dao/state/recoil'
import {
  NftsTab,
  PAGINATION_MIN_PAGE,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { LazyNftCardInfo } from '@dao-dao/types'
import { getNftKey } from '@dao-dao/utils'

import { LazyNftCard } from '../../../../components'
import { useGovernanceCollectionInfo } from '../hooks'

const NFTS_PER_PAGE = 30

export const NftCollectionTab = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { chain_id: chainId } = useChain()
  const { collectionAddress, stakingContractAddress } =
    useGovernanceCollectionInfo()

  const [page, setPage] = useState(PAGINATION_MIN_PAGE)

  // On site load, set initial page from query parameter if set.
  const pageInitialized = useRef(false)
  useEffect(() => {
    if (pageInitialized.current) {
      return
    }
    pageInitialized.current = true

    const queryPage = router.query.page
    if (typeof queryPage === 'string' && !isNaN(Number(queryPage))) {
      setPage(Number(queryPage))
    }
  }, [router.query.page])

  // On page change, store in query parameter.
  useEffect(() => {
    router.query.page = BigInt(page).toString()
    router.push(router, undefined, { shallow: true })
  }, [page, router])

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
