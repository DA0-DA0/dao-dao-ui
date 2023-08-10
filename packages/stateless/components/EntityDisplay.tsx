/* eslint-disable i18next/no-literal-string */
import { fromBech32 } from '@cosmjs/encoding'
import { Check, CopyAllOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EntityDisplayProps, EntityType } from '@dao-dao/types'
import {
  concatAddressStartEnd,
  getFallbackImage,
  toAccessibleImageUrl,
  toBech32Hash,
} from '@dao-dao/utils'

import { useChainContext, useDaoNavHelpers, useDetectTruncate } from '../hooks'
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
  noLink,
}: EntityDisplayProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()
  const { config } = useChainContext()

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
    ? getDaoPath(loadingEntity.data.address)
    : loadingEntity.data.type === EntityType.Wallet
    ? config?.explorerUrlTemplates.wallet.replace(
        'REPLACE',
        loadingEntity.data.address
      )
    : undefined

  const { textRef, truncated } = useDetectTruncate()

  // Use bech32 prefix length to determine how much to truncate from beginning.
  let prefixLength
  try {
    prefixLength = fromBech32(address).prefix.length
  } catch (e) {
    // Conservative estimate.
    prefixLength = 6
  }

  // If name exists, use it. Otherwise, fallback to address, potentially
  // truncated.
  const textDisplay =
    !loadingEntity.loading && loadingEntity.data.name
      ? loadingEntity.data.type === EntityType.Module
        ? t('title.chainModule.' + loadingEntity.data.name)
        : loadingEntity.data.name
      : showFullAddress
      ? address
      : concatAddressStartEnd(address, prefixLength + 3, 3)

  return (
    <div
      className={clsx('flex min-w-0 flex-row items-center gap-2', className)}
    >
      <Tooltip
        title={
          // Show text display tooltip if text is truncated.
          truncated ? textDisplay : undefined
        }
      >
        <ButtonLink
          className={clsx(loadingEntity.loading && 'animate-pulse')}
          containerClassName="min-w-0"
          href={noLink ? undefined : href}
          onClick={(e) => !noLink && e.stopPropagation()}
          openInNewTab
          variant={noUnderline || noLink || !href ? 'none' : 'underline'}
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
              'min-w-0 truncate',
              {
                'text-sm': size === 'default',
                'text-lg': size === 'lg',
              },
              textClassName
            )}
            ref={textRef}
          >
            {textDisplay}
          </p>
        </ButtonLink>
      </Tooltip>

      {!noCopy && (
        <Tooltip title={t('button.copyAddress')}>
          <IconButton
            Icon={copied ? Check : CopyAllOutlined}
            iconClassName="text-icon-tertiary"
            onClick={(e) => {
              e.stopPropagation()
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
