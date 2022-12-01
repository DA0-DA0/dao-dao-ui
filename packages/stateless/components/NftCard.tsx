import { ArrowOutward, ImageNotSupported } from '@mui/icons-material'
import clsx from 'clsx'
import Image from 'next/image'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NftCardInfo } from '@dao-dao/types'
import { normalizeNftImageUrl } from '@dao-dao/utils'

import { CopyToClipboardUnderline } from './CopyToClipboard'
import { Checkbox } from './inputs'
import { TooltipLikeDisplay } from './tooltip/TooltipLikeDisplay'

export interface NftCardProps extends NftCardInfo {
  checkbox?: {
    checked: boolean
    onClick: () => void
  }
  className?: string
}

export const NftCard = forwardRef<HTMLDivElement, NftCardProps>(
  function NftCard(
    {
      collection,
      externalLink,
      checkbox,
      imageUrl,
      floorPrice,
      name,
      tokenId,
      className,
    },
    ref
  ) {
    const { t } = useTranslation()

    // Loading if imageUrl is present.
    const [imageLoading, setImageLoading] = useState(!!imageUrl)

    return (
      <div
        className={clsx(
          'group relative flex flex-col items-stretch overflow-hidden rounded-lg bg-background-primary outline outline-2 ring-2 ring-inset ring-[transparent] transition-all',
          {
            'hover:bg-background-secondary hover:ring-border-interactive-focus':
              externalLink || checkbox,
            'outline-[transparent]': !checkbox?.checked,
            'outline-border-interactive-active': checkbox?.checked,
          },
          imageLoading && imageUrl && 'animate-pulse',
          className
        )}
        ref={ref}
      >
        <div
          className={clsx(
            'relative flex flex-col items-stretch',
            // Make entire image clickable checkbox if present.
            checkbox && 'cursor-pointer'
          )}
          onClick={checkbox?.onClick}
        >
          {imageUrl ? (
            <Image
              alt={t('info.nftImage')}
              className="aspect-square object-cover"
              height={500}
              onLoadingComplete={() => setImageLoading(false)}
              src={normalizeNftImageUrl(imageUrl)}
              width={500}
            />
          ) : (
            <div className="flex aspect-square items-center justify-center">
              <ImageNotSupported className="!h-14 !w-14 text-icon-tertiary" />
            </div>
          )}

          {externalLink && (
            <a
              href={externalLink.href}
              // Don't click on anything else, such as the checkbox.
              onClick={(e) => e.stopPropagation()}
              rel="noreferrer"
              target="_blank"
            >
              <TooltipLikeDisplay
                className="absolute bottom-4 left-4 opacity-0 shadow-dp4 transition-opacity hover:!opacity-90 group-hover:opacity-100"
                icon={<ArrowOutward className="!h-5 !w-5" />}
                label={t('button.openInDestination', {
                  destination: externalLink.name,
                })}
              />
            </a>
          )}
        </div>

        {checkbox && (
          <Checkbox
            {...checkbox}
            className="absolute top-3 left-3 shadow-dp4"
          />
        )}

        <div
          className={clsx(
            'grid items-center gap-x-4 border-b border-border-secondary py-4 px-6',
            {
              'grid-cols-1': !floorPrice,
              'grid-cols-[1fr_1px_1fr]': floorPrice,
            }
          )}
        >
          {/* Created by */}
          <div className="flex flex-col items-start gap-1">
            <p className="secondary-text">{t('title.collection')}</p>
            <CopyToClipboardUnderline
              takeStartEnd={{ start: 7, end: 5 }}
              value={collection.address}
            />
          </div>

          {floorPrice && (
            <>
              {/* Separator */}
              <div className="h-6 w-[1px] bg-background-primary"></div>

              {/* Floor price */}
              <div className="flex flex-col items-end gap-1">
                <p className="secondary-text text-right">
                  {t('title.floorPrice')}
                </p>
                <p className="body-text text-right font-mono">
                  {floorPrice.amount.toLocaleString(undefined, {
                    maximumSignificantDigits: 3,
                  })}{' '}
                  ${floorPrice.denom}
                </p>
              </div>
            </>
          )}
        </div>

        <p className="primary-text min-h-[5.5rem] py-4 px-6">
          {name || tokenId}
        </p>
      </div>
    )
  }
)
