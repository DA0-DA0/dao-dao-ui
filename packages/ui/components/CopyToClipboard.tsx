import { CheckCircleIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useState, FC } from 'react'
import toast from 'react-hot-toast'

import { Copy } from '@dao-dao/icons'
import { useThemeContext, Button } from '@dao-dao/ui'

function concatAddressImpl(
  address: string,
  takeStart: number,
  takeEnd: number
) {
  const strLen = address.length
  const first = address.substring(0, takeStart)
  const last = address.substring(strLen - takeEnd, strLen)
  return first + '...' + last
}

function concatAddress(address: string, takeN = 7): string {
  if (!address) {
    return ''
  }
  return concatAddressImpl(address, takeN, takeN)
}

interface CopyToClipboardProps {
  value: string
  success?: string
  takeN?: number
  loading?: boolean
}

export function CopyToClipboard({
  value,
  success = 'Copied to clipboard!',
  takeN,
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      className="flex flex-row gap-1 items-center font-mono text-xs"
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
      <span className="inline py-1 hover:bg-btn-secondary-hover transition">
        {concatAddress(value, takeN)}
      </span>
    </button>
  )
}

export function CopyToClipboardAccent({
  value,
  success = 'Copied to clipboard!',
  loading,
}: CopyToClipboardProps) {
  const { accentColor } = useThemeContext()

  return (
    <button
      className={clsx(
        'text-sm text-brand underline hover:no-underline transition',
        loading && 'rounded-sm animate-pulse'
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
      type="button"
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
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex justify-between p-1 rounded-md border border-inactive">
      <div className="flex gap-2 items-center px-2 text-tertiary secondary-text">
        {copied ? (
          <CheckCircleIcon className="w-[18px]" />
        ) : (
          <Copy color="currentColor" height="18px" width="18px" />
        )}
        <span className="inline py-1 hover:bg-btn-secondary-hover transition">
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
        type="button"
        variant="secondary"
      >
        <p className="text-body caption-text">Copy</p>
      </Button>
    </div>
  )
}
