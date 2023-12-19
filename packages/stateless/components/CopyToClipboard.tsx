import { Check, CopyAll } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CopyToClipboardProps } from '@dao-dao/types/components/CopyToClipboard'
import { concatAddressBoth, concatAddressStartEnd } from '@dao-dao/utils'

import { Tooltip } from './tooltip/Tooltip'

export const CopyToClipboard = ({
  value,
  label,
  success,
  takeN,
  takeStartEnd,
  takeAll,
  className = 'font-mono text-xs',
  textClassName,
  iconClassName,
  onCopy,
  tooltip,
  noCopy,
}: CopyToClipboardProps) => {
  const { t } = useTranslation()

  // Unset copied after 2 seconds unless it gets clicked again, then reset.
  const [copied, setCopied] = useState(0)
  useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = setTimeout(() => setCopied(0), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const Icon = copied > 0 ? Check : CopyAll

  return (
    <Tooltip title={tooltip}>
      <button
        className={clsx(
          'flex flex-row items-center justify-start gap-1 overflow-hidden',
          noCopy && 'cursor-default',
          className
        )}
        onClick={
          noCopy
            ? undefined
            : () => {
                navigator.clipboard.writeText(value)
                setCopied((copied) => copied + 1)
                toast.success(success || t('info.copiedToClipboard'))
                onCopy?.()
              }
        }
        type="button"
      >
        <Icon className={clsx('!h-[18px] !w-[18px]', iconClassName)} />

        <span
          className={clsx(
            'flex-1 truncate rounded-md p-1 text-left transition hover:bg-background-button-secondary-default',
            textClassName
          )}
        >
          {label ??
            (takeStartEnd
              ? concatAddressStartEnd(
                  value,
                  takeStartEnd.start,
                  takeStartEnd.end
                )
              : takeAll
              ? value
              : concatAddressBoth(value, takeN))}
        </span>
      </button>
    </Tooltip>
  )
}

export const CopyToClipboardUnderline = ({
  value,
  label,
  success,
  takeN,
  takeStartEnd,
  takeAll,
  className,
  textClassName,
  tooltip,
  onCopy,
  noCopy,
}: CopyToClipboardProps) => {
  const { t } = useTranslation()

  return (
    <Tooltip title={tooltip}>
      <p
        className={clsx(
          'truncate font-mono text-xs text-text-body transition-opacity hover:opacity-80 active:opacity-70',
          !noCopy && 'cursor-pointer underline',
          className,
          textClassName
        )}
        onClick={
          noCopy
            ? undefined
            : () => {
                navigator.clipboard.writeText(value)
                toast.success(success || t('info.copiedToClipboard'))
                onCopy?.()
              }
        }
      >
        {label ??
          (takeStartEnd
            ? concatAddressStartEnd(value, takeStartEnd.start, takeStartEnd.end)
            : takeAll
            ? value
            : concatAddressBoth(value, takeN))}
      </p>
    </Tooltip>
  )
}
