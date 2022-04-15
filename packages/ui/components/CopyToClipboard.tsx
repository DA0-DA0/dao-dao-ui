import { useState } from 'react'

import { useThemeContext } from '@dao-dao/ui'
import { CheckCircleIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'

import SvgCopy from './icons/Copy'

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
  return concatAddressImpl(address, takeN, takeN)
}

interface CopyToClipboardProps {
  value: string
  success?: string
  takeN?: number
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
    >
      {copied ? (
        <CheckCircleIcon className="w-[18px]" />
      ) : (
        <Copy color="currentColor" height="18px" width="18px" />
      )}
      {concatAddress(value, takeN)}
    </button>
  )
}

export function CopyToClipboardAccent({
  value,
  success = 'Copied to clipboard!',
}: CopyToClipboardProps) {
  const { accentColor } = useThemeContext()

  return (
    <button
      className="text-sm text-brand underline hover:no-underline transition"
      onClick={() => {
        navigator.clipboard.writeText(value)
        toast.success(success)
      }}
      style={accentColor ? { color: accentColor } : {}}
    >
      {concatAddressImpl(value, 12, 7)}
    </button>
  )
}
