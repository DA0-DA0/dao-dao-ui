import { CheckCircleIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'

import { useTranslation } from '@dao-dao/i18n'
import { Copy } from '@dao-dao/icons'
import { Button, useThemeContext } from '@dao-dao/ui'

const concatAddressImpl = (
  address: string,
  takeStart: number,
  takeEnd: number
) => {
  const first = address.substring(0, takeStart)
  const last = address.substring(address.length - takeEnd, address.length)
  return [first, last].filter(Boolean).join('...')
}

const concatAddress = (address: string, takeN = 7): string =>
  address && concatAddressImpl(address, takeN, takeN)

interface CopyToClipboardProps {
  value: string
  success?: string
  takeN?: number
  takeStartEnd?: {
    start: number
    end: number
  }
  loading?: boolean
}

export const CopyToClipboard: FC<CopyToClipboardProps> = ({
  value,
  success = 'Copied to clipboard!',
  takeN,
  takeStartEnd,
}) => {
  const [copied, setCopied] = useState(false)

  return (
    <button
      className="flex flex-row items-center gap-1 overflow-hidden font-mono text-xs"
      onClick={() => {
        navigator.clipboard.writeText(value)
        setTimeout(() => setCopied(false), 2000)
        setCopied(true)
        toast.success(success)
      }}
      type="button"
    >
      {copied ? (
        <CheckCircleIcon className="w-[18px]" />
      ) : (
        <Copy color="currentColor" height="18px" width="18px" />
      )}

      <span className="inline flex-1 truncate rounded-md p-1 transition hover:bg-btn-secondary-hover">
        {takeStartEnd
          ? concatAddressImpl(value, takeStartEnd.start, takeStartEnd.end)
          : concatAddress(value, takeN)}
      </span>
    </button>
  )
}

export const CopyToClipboardAccent: FC<CopyToClipboardProps> = ({
  value,
  success = 'Copied to clipboard!',
  loading,
}) => {
  const { accentColor } = useThemeContext()

  return (
    <button
      className={clsx(
        'text-sm text-brand underline transition hover:no-underline',
        loading && 'animate-pulse rounded-sm'
      )}
      onClick={() => {
        navigator.clipboard.writeText(value)
        toast.success(success)
      }}
      style={
        loading
          ? { backgroundColor: accentColor, color: accentColor }
          : { color: accentColor }
      }
    >
      {concatAddressImpl(value, 12, 7)}
    </button>
  )
}

export const CopyToClipboardMobile: FC<CopyToClipboardProps> = ({
  value,
  success = 'Copied to clipboard',
  takeN = 7,
}) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex justify-between rounded-md border border-inactive p-1">
      <div className="secondary-text flex items-center gap-2 px-2 text-tertiary">
        {copied ? (
          <CheckCircleIcon className="w-[18px]" />
        ) : (
          <Copy color="currentColor" height="18px" width="18px" />
        )}
        <span className="inline py-1 transition hover:bg-btn-secondary-hover">
          {concatAddress(value, takeN)}
        </span>
      </div>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(value)
          setTimeout(() => setCopied(false), 2000)
          setCopied(true)
          toast.success(success)
        }}
        size="sm"
        variant="secondary"
      >
        <p className="caption-text text-body">{t('button.copy')}</p>
      </Button>
    </div>
  )
}
