import { Tag } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { CopyToClipboardUnderline } from './CopyToClipboard'

export type CopyableAddressProps = {
  address: string
  Icon?: ComponentType<{ className: string }>
  hideIcon?: boolean
  className?: string
  iconClassName?: string
  textClassName?: string
}

export const CopyableAddress = ({
  address,
  Icon = Tag,
  hideIcon,
  className,
  iconClassName,
  textClassName,
}: CopyableAddressProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'flex w-full min-w-0 flex-row items-center justify-center gap-1',
        className
      )}
    >
      {!hideIcon && (
        <Icon className={clsx('!h-5 !w-5 text-icon-tertiary', iconClassName)} />
      )}

      <CopyToClipboardUnderline
        className={clsx('text-sm !text-text-tertiary', textClassName)}
        takeAll
        tooltip={t('button.clickToCopyAddress')}
        value={address}
      />
    </div>
  )
}
