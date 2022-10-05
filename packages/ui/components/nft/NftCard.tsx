import { ImageNotSupported } from '@mui/icons-material'
import clsx from 'clsx'
import Image from 'next/image'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ArrowOutward } from '@dao-dao/icons'
import { NftCardInfo } from '@dao-dao/tstypes'
import { normalizeNftImageUrl } from '@dao-dao/utils'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { Checkbox } from '../input'
import { TooltipLikeDisplay } from '../TooltipLikeDisplay'

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
          'group flex overflow-hidden relative flex-col items-stretch bg-primary rounded-lg outline-2 outline ring-2 ring-inset ring-[transparent] transition-all',
          {
            'hover:bg-card hover:ring-focus': externalLink || checkbox,
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
            'flex relative flex-col items-stretch',
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
            <div className="aspect-square flex justify-center items-center">
              <ImageNotSupported className="!w-14 !h-14 text-icon-tertiary" />
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
                className="absolute bottom-4 left-4 shadow-dp4 opacity-0 group-hover:opacity-100 hover:!opacity-90 transition-opacity"
                icon={<ArrowOutward color="currentColor" />}
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
            'grid gap-x-4 items-center py-4 px-6 border-b border-inactive',
            {
              'grid-cols-1': !floorPrice,
              'grid-cols-[1fr_1px_1fr]': floorPrice,
            }
          )}
        >
          {/* Created by */}
          <div className="flex flex-col gap-1 items-start">
            <p className="secondary-text">{t('title.collection')}</p>
            <CopyToClipboardUnderline
              takeStartEnd={{ start: 7, end: 5 }}
              value={collection.address}
            />
          </div>

          {floorPrice && (
            <>
              {/* Separator */}
              <div className="w-[1px] h-6 bg-primary"></div>

              {/* Floor price */}
              <div className="flex flex-col gap-1 items-end">
                <p className="text-right secondary-text">
                  {t('title.floorPrice')}
                </p>
                <p className="font-mono text-right body-text">
                  {floorPrice.amount.toLocaleString(undefined, {
                    maximumSignificantDigits: 3,
                  })}{' '}
                  ${floorPrice.denom}
                </p>
              </div>
            </>
          )}
        </div>

        <p className="py-4 px-6 min-h-[5.5rem] primary-text">{name}</p>
      </div>
    )
  }
)
