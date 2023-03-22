/* eslint-disable i18next/no-literal-string */
import { ArrowOutwardRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { EntityDisplayProps, EntityType } from '@dao-dao/types'
import {
  getFallbackImage,
  toAccessibleImageUrl,
  toBech32Hash,
} from '@dao-dao/utils'

import { useNavHelpers } from '../hooks'
import { CopyToClipboardUnderline } from './CopyToClipboard'
import { IconButtonLink } from './icon_buttons'
import { Tooltip } from './tooltip/Tooltip'

export const EntityDisplay = ({
  address,
  loadingEntity,
  imageSize,
  hideImage,
  copyToClipboardProps,
  size = 'default',
  className,
  noImageTooltip,
  noCopy,
}: EntityDisplayProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useNavHelpers()

  imageSize ??= size === 'lg' ? 28 : 24

  return (
    <div
      className={clsx('flex min-w-0 flex-row items-center gap-2', className)}
    >
      {!hideImage && (
        <Tooltip
          title={
            noImageTooltip
              ? undefined
              : !loadingEntity.loading && loadingEntity.data.name
              ? loadingEntity.data.name
              : address
          }
        >
          <div
            className="shrink-0 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                loadingEntity.loading
                  ? getFallbackImage(toBech32Hash(address))
                  : toAccessibleImageUrl(loadingEntity.data.imageUrl)
              })`,
              width: imageSize,
              height: imageSize,
            }}
          ></div>
        </Tooltip>
      )}

      <CopyToClipboardUnderline
        noCopy={noCopy}
        takeStartEnd={{
          start: 6,
          end: 4,
        }}
        tooltip={
          // If displaying name, show tooltip to copy address.
          !loadingEntity.loading && loadingEntity.data.name && !noCopy
            ? t('button.clickToCopyAddress')
            : undefined
        }
        {...{
          ...copyToClipboardProps,
          textClassName: clsx(
            {
              'text-sm': size === 'default',
              'text-lg': size === 'lg',
            },
            copyToClipboardProps?.textClassName
          ),
        }}
        className={clsx(
          loadingEntity.loading && 'animate-pulse',
          copyToClipboardProps?.className
        )}
        label={(!loadingEntity.loading && loadingEntity.data.name) || undefined}
        // If name exists, use that. Otherwise, will fall back to truncated
        // address display.
        value={address}
      />

      {/* If entity is a DAO, add link to page. */}
      {!loadingEntity.loading && loadingEntity.data.type === EntityType.Dao && (
        <IconButtonLink
          Icon={ArrowOutwardRounded}
          href={getDaoPath(address)}
          iconClassName="text-icon-tertiary"
          openInNewTab
          size="xs"
          variant="ghost"
        />
      )}
    </div>
  )
}
