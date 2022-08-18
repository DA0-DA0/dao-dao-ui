/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { ArrowOutward } from '@dao-dao/icons'

import { TooltipDisplay } from 'components/TooltipDisplay'

import { CopyToClipboardUnderline } from '../CopyToClipboard'

export interface NftCardProps {
  href?: string
  hrefDestinationName?: string
  imageUrl?: string
  createdBy: string
  floorPrice?: string
  name: string
  className?: string
}

export const NftCard = ({
  href,
  hrefDestinationName,
  imageUrl,
  createdBy,
  floorPrice,
  name,
  className,
}: NftCardProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'group flex overflow-hidden flex-col items-stretch max-w-xs bg-primary rounded-lg ring-2 ring-inset ring-[transparent] transition',
        {
          'hover:bg-card hover:ring-focus': href,
        },
        className
      )}
    >
      <a
        className="flex relative flex-col items-stretch"
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {imageUrl ? (
          <img
            alt={t('info.nftImage')}
            className="aspect-square"
            src={imageUrl}
          />
        ) : (
          <div className="aspect-square"></div>
        )}

        {!!href && !!hrefDestinationName && (
          <TooltipDisplay
            className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 hover:!opacity-90 transition-opacity shadow-dp4"
            icon={<ArrowOutward color="currentColor" />}
            label={t('button.openInDestination', {
              destination: hrefDestinationName,
            })}
          />
        )}
      </a>

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
          <p className="secondary-text">{t('info.createdBy')}</p>
          <CopyToClipboardUnderline
            takeStartEnd={{ start: 7, end: 5 }}
            value={createdBy}
          />
        </div>

        {floorPrice && (
          <>
            {/* Separator */}
            <div className="w-[1px] h-6 bg-primary"></div>

            {/* Floor price */}
            <div className="flex flex-col gap-1 items-end">
              <p className="text-right secondary-text">
                {t('info.floorPrice')}
              </p>
              <p className="font-mono body-text">{floorPrice}</p>
            </div>
          </>
        )}
      </div>

      <p className="py-4 px-6 min-h-[5.5rem] primary-text">{name}</p>
    </div>
  )
}
