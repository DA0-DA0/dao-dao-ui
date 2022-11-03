import { Check, CopyAll } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CopyToClipboardProps } from '@dao-dao/types/components/CopyToClipboard'

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

  const Icon = copied ? Check : CopyAll

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
        <Icon className="!h-[18px] !w-[18px]" />

        <span
          className={clsx(
            'hover:bg-background-button-secondary-default flex-1 truncate rounded-md p-1 transition',
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
          'text-text-body cursor-pointer truncate font-mono text-xs underline transition-opacity hover:opacity-80 active:opacity-70',
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
