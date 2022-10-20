import { CheckCircleIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Copy } from '@dao-dao/icons'

import { Button } from './Button'
import { Tooltip } from './Tooltip'

export const concatAddressStartEnd = (
  address: string,
  takeStart: number,
  takeEnd: number
) => {
  const first = address.substring(0, takeStart)
  const last = address.substring(address.length - takeEnd, address.length)
  return [first, last].filter(Boolean).join('..')
}

export const concatAddressBoth = (address: string, takeN = 7): string =>
  address && concatAddressStartEnd(address, takeN, takeN)

export interface CopyToClipboardProps {
  value: string
  label?: string
  success?: string
  takeN?: number
  takeStartEnd?: {
    start: number
    end: number
  }
  takeAll?: true
  loading?: boolean
  className?: string
  textClassName?: string
  onCopy?: () => void
  tooltip?: string
}

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
}: CopyToClipboardProps) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  return (
    <Tooltip title={tooltip}>
      <button
        className={clsx(
          'flex flex-row items-center gap-1 overflow-hidden',
          className
        )}
        onClick={() => {
          navigator.clipboard.writeText(value)
          setTimeout(() => setCopied(false), 2000)
          setCopied(true)
          toast.success(success || t('info.copiedToClipboard'))
          onCopy?.()
        }}
        title={value}
        type="button"
      >
        {copied ? (
          <CheckCircleIcon className="w-[18px]" />
        ) : (
          <Copy height="18px" width="18px" />
        )}

        <span
          className={clsx(
            'inline flex-1 truncate rounded-md p-1 transition hover:bg-background-button-secondary-default',
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
}: CopyToClipboardProps) => {
  const { t } = useTranslation()

  return (
    <Tooltip title={tooltip}>
      <p
        className={clsx(
          'cursor-pointer truncate font-mono text-xs text-text-body underline transition-opacity hover:opacity-80 active:opacity-70',
          className,
          textClassName
        )}
        onClick={() => {
          navigator.clipboard.writeText(value)
          toast.success(success || t('info.copiedToClipboard'))
        }}
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

export const CopyToClipboardMobile = ({
  value,
  label,
  success,
  takeN,
  takeStartEnd,
  takeAll,
}: CopyToClipboardProps) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex justify-between rounded-md border border-border-secondary p-1">
      <div className="secondary-text flex items-center gap-2 px-2 text-text-tertiary">
        {copied ? (
          <CheckCircleIcon className="w-[18px]" />
        ) : (
          <Copy height="18px" width="18px" />
        )}
        <span className="inline py-1 transition hover:bg-background-button-secondary-default">
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
      </div>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(value)
          setTimeout(() => setCopied(false), 2000)
          setCopied(true)
          toast.success(success || t('info.copiedToClipboard'))
        }}
        size="sm"
        variant="secondary"
      >
        <p className="caption-text text-text-body">{t('button.copy')}</p>
      </Button>
    </div>
  )
}
