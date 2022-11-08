import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { ProfileDisplayProps } from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { Tooltip } from '../tooltip/Tooltip'

export const ProfileDisplay = ({
  address,
  loadingProfile,
  imageSize = 20,
  hideImage,
  copyToClipboardProps,
}: ProfileDisplayProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row items-center gap-2">
      {!hideImage && (
        <Tooltip
          title={
            !loadingProfile.loading && loadingProfile.data.name
              ? loadingProfile.data.name
              : address
          }
        >
          <div
            className="shrink-0 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                loadingProfile.loading
                  ? getFallbackImage(address)
                  : loadingProfile.data.imageUrl
              })`,
              width: imageSize,
              height: imageSize,
            }}
          ></div>
        </Tooltip>
      )}

      <CopyToClipboardUnderline
        takeStartEnd={{
          start: 6,
          end: 4,
        }}
        tooltip={
          // If displaying name, show tooltip to copy address.
          !loadingProfile.loading && loadingProfile.data.name
            ? t('button.clickToCopyAddress')
            : undefined
        }
        {...copyToClipboardProps}
        className={clsx(
          loadingProfile.loading && 'animate-pulse',
          copyToClipboardProps?.className
        )}
        label={
          (!loadingProfile.loading && loadingProfile.data.name) || undefined
        }
        // If name exists, use that. Otherwise, will fall back to truncated
        // address display.
        value={address}
      />
    </div>
  )
}
