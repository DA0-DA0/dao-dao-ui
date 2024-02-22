import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingDataWithError } from '@dao-dao/types'

import { useInfiniteScroll } from '../../hooks'
import { GridCardContainer } from '../GridCardContainer'
import { Loader } from '../logo'
import { NoContent } from '../NoContent'
import { PAGINATION_MIN_PAGE } from '../Pagination'
import { NftCardLoader } from './NftCard'

export type NftSectionProps<N extends object> = {
  /**
   * The NFTs to display.
   */
  nfts: LoadingDataWithError<N[]>
  /**
   * The NFT card component.
   */
  NftCard: ComponentType<N>
  /**
   * Optional container class name.
   */
  className?: string
}

const NFTS_PER_PAGE = 18

export const NftSection = <N extends object>({
  nfts,
  NftCard,
  className,
}: NftSectionProps<N>) => {
  const { t } = useTranslation()

  const [_nftPage, setNftPage] = useState(PAGINATION_MIN_PAGE)
  const maxNftPage = Math.ceil(
    nfts.loading || nfts.errored ? 0 : nfts.data.length / NFTS_PER_PAGE
  )
  const nftPage = Math.min(_nftPage, maxNftPage)

  const { infiniteScrollRef } = useInfiniteScroll({
    loadMore: () => setNftPage((p) => p + 1),
    disabled: nfts.loading || nfts.errored || _nftPage >= maxNftPage,
  })

  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <div className="flex flex-row items-center justify-between gap-4">
        <p className="title-text">
          {nfts.loading || nfts.errored
            ? t('title.nfts')
            : t('title.numNfts', {
                count: nfts.data.length,
              })}
        </p>

        {nfts.loading ||
          (!nfts.errored && nfts.updating && <Loader fill={false} size={22} />)}
      </div>

      {!nfts.loading && !nfts.errored && nfts.data.length > 0 ? (
        <GridCardContainer
          className="animate-fade-in pb-6"
          ref={infiniteScrollRef}
        >
          {nfts.data.slice(0, nftPage * NFTS_PER_PAGE).map((props, index) => (
            <NftCard {...(props as N)} key={index} />
          ))}

          {/* Show NFT loading cards at the bottom when not at the max page yet to indicate more are loading. */}
          {(nftPage < maxNftPage || nfts.updating) &&
            [...Array(3)].map((_, i) => <NftCardLoader key={i} />)}
        </GridCardContainer>
      ) : (
        <NoContent Icon={Image} body={t('info.noNftsFound')} />
      )}
    </div>
  )
}
