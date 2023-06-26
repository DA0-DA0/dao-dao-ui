/* eslint-disable i18next/no-literal-string */
import { Check, CopyAllOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EntityDisplayProps, EntityType } from '@dao-dao/types'
import {
  WALLET_URL_PREFIX,
  concatAddressStartEnd,
  getFallbackImage,
  toAccessibleImageUrl,
  toBech32Hash,
} from '@dao-dao/utils'

import { useDaoNavHelpers } from '../hooks'
import { ButtonLink } from './buttons'
import { IconButton } from './icon_buttons'
import { Tooltip } from './tooltip/Tooltip'

export const EntityDisplay = ({
  address,
  loadingEntity,
  imageSize,
  hideImage,
  size = 'default',
  className,
  textClassName,
  noCopy,
  noUnderline,
  showFullAddress,
}: EntityDisplayProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()

  imageSize ??= size === 'lg' ? 28 : 24

  const [copied, setCopied] = useState(false)
  // Unset copied after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000)
    // Cleanup on unmount.
    return () => clearTimeout(timeout)
  }, [copied])

  const href = loadingEntity.loading
    ? undefined
    : loadingEntity.data.type === EntityType.Dao
    ? getDaoPath(address)
    : WALLET_URL_PREFIX + address

  return (
    <div
      className={clsx('flex min-w-0 flex-row items-center gap-2', className)}
    >
      <ButtonLink
        className={clsx(loadingEntity.loading && 'animate-pulse')}
        href={href}
        openInNewTab
        variant={noUnderline ? 'none' : 'underline'}
      >
        {!hideImage && (
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
        )}

        <p
          className={clsx(
            {
              'text-sm': size === 'default',
              'text-lg': size === 'lg',
            },
            textClassName
          )}
        >
          {
            // If name exists, use it. Otherwise, fall back to address,
            // potentially truncated.
            !loadingEntity.loading && loadingEntity.data.name
              ? loadingEntity.data.name
              : showFullAddress
              ? address
              : concatAddressStartEnd(address, 6, 4)
          }
        </p>
      </ButtonLink>

      {!noCopy && (
        <Tooltip title={t('button.copyAddress')}>
          <IconButton
            Icon={copied ? Check : CopyAllOutlined}
            iconClassName="text-icon-tertiary"
            onClick={() => {
              navigator.clipboard.writeText(address)
              setCopied(true)
            }}
            size="xs"
            variant="ghost"
          />
        </Tooltip>
      )}
    </div>
  )
}
