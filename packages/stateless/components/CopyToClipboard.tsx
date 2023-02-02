import { Check, CopyAll } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CopyToClipboardProps } from '@dao-dao/types/stateless/CopyToClipboard'
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
  onCopy,
  tooltip,
  noCopy,
}: CopyToClipboardProps) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const Icon = copied ? Check : CopyAll

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
                setTimeout(() => setCopied(false), 2000)
                setCopied(true)
                toast.success(success || t('info.copiedToClipboard'))
                onCopy?.()
              }
        }
        type="button"
      >
        <Icon className="!h-[18px] !w-[18px]" />

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
          'truncate font-mono text-xs text-text-body underline transition-opacity hover:opacity-80 active:opacity-70',
          !noCopy && 'cursor-pointer',
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
