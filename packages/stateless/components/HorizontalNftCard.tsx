import { ImageNotSupported } from '@mui/icons-material'
import clsx from 'clsx'
import NextImage from 'next/image'
import { forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NftCardInfo } from '@dao-dao/types'
import {
  getImageUrlForChainId,
  getNftName,
  normalizeImageUrl,
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

  const chainImage = getImageUrlForChainId(chainId)
  const chainImageNode = chainImage && (
    <NextImage
      alt=""
      className="shrink-0"
      height={36}
      src={chainImage}
      width={36}
    />
  )

  const [imageLoading, setImageLoading] = useState(!!imageUrl)
  const [imageLoadErrored, setImageLoadErrored] = useState(false)
  // Load image in background so we can listen for loading complete.
  const [loadedImageSrc, setLoadedImgSrc] = useState<string>()
  useEffect(() => {
    if (!imageUrl || loadedImageSrc === normalizeImageUrl(imageUrl)) {
      return
    }

    setImageLoading(true)

    const img = new Image()
    img.onload = () => {
      setLoadedImgSrc(img.src)
      setImageLoading(false)
      setImageLoadErrored(false)
    }
    img.onerror = () => {
      setLoadedImgSrc(undefined)
      setImageLoading(false)
      setImageLoadErrored(true)
    }
    img.src = normalizeImageUrl(imageUrl)
  }, [imageUrl, loadedImageSrc])

  return (
    <div
      className={clsx(
        'flex flex-col items-stretch overflow-hidden rounded-lg bg-background-primary sm:grid sm:grid-cols-[auto_1fr] sm:grid-rows-1',
        imageLoading && 'animate-pulse',
        className
      )}
      ref={ref}
    >
      {imageUrl && !imageLoadErrored ? (
        <div
          className={clsx(
            'relative aspect-square bg-cover bg-center transition-opacity sm:h-36 sm:w-36',
            loadedImageSrc ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: loadedImageSrc && `url(${loadedImageSrc})`,
          }}
        ></div>
      ) : (
        <div className="flex aspect-square items-center justify-center sm:h-36 sm:w-36">
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
