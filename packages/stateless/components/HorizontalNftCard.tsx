import { ImageNotSupported } from '@mui/icons-material'
import clsx from 'clsx'
import Image from 'next/image'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NftCardInfo } from '@dao-dao/types'
import {
  getImageUrlForChainId,
  getNftName,
  normalizeNftImageUrl,
} from '@dao-dao/utils'

import { CopyToClipboard } from './CopyToClipboard'

export interface HorizontalNftCardProps extends NftCardInfo {
  className?: string
}

export const HorizontalNftCard = forwardRef<
  HTMLDivElement,
  HorizontalNftCardProps
>(function HorizontalNftCard(
  { collection, externalLink, imageUrl, name, tokenId, chainId, className },
  ref
) {
  const { t } = useTranslation()

  // Loading if imageUrl is present.
  const [imageLoading, setImageLoading] = useState(!!imageUrl)

  const chainImage = getImageUrlForChainId(chainId)
  const chainImageNode = chainImage && (
    <Image
      alt=""
      className="shrink-0"
      height={36}
      src={chainImage}
      width={36}
    />
  )

  return (
    <div
      className={clsx(
        'flex flex-col items-stretch overflow-hidden rounded-lg bg-background-primary sm:grid sm:grid-cols-[auto_1fr] sm:grid-rows-1',
        imageLoading && imageUrl && 'animate-pulse',
        className
      )}
      ref={ref}
    >
      {imageUrl ? (
        <div className="relative aspect-square sm:h-36 sm:w-36">
          <Image
            alt={t('info.nftImage')}
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => setImageLoading(false)}
            src={normalizeNftImageUrl(imageUrl)}
          />
        </div>
      ) : (
        <div className="flex aspect-square items-center justify-center">
          <ImageNotSupported className="!h-14 !w-14 text-icon-tertiary" />
        </div>
      )}

      <div className="flex min-w-0 grow flex-col">
        <p className="title-text border-b border-border-secondary py-4 px-6">
          {/* Don't include collection name since we show it below. */}
          {getNftName('', tokenId, name)}
        </p>

        <div className="flex grow flex-row items-center justify-between gap-8 py-4 px-6">
          {/* Collection */}
          <div className="flex flex-col items-stretch justify-between gap-1 overflow-hidden">
            <CopyToClipboard
              className="text-xs"
              label={t('title.collection')}
              textClassName="secondary-text"
              tooltip={t('button.copyAddressToClipboard')}
              value={collection.address}
            />

            <p className="primary-text truncate font-normal">
              {collection.name}
            </p>
          </div>

          {/* Source chain */}
          {chainImageNode ? (
            externalLink ? (
              <a
                className="shrink-0"
                href={externalLink?.href}
                rel="noreferrer"
                target="_blank"
              >
                {chainImageNode}
              </a>
            ) : (
              chainImageNode
            )
          ) : null}
        </div>
      </div>
    </div>
  )
})
