import { CheckCircleIcon, PaperClipIcon } from '@heroicons/react/outline'
import { useState } from 'react'
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

function concatAddress(address: string) {
  const takeN = 7
  return concatAddressImpl(address, takeN, takeN)
}

interface CopyToClipboardProps {
  value: string
  success?: string
}

export function CopyToClipboard({
  value,
  success = 'Copied to clipboard!',
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
        <SvgCopy color="currentColor" height="18px" width="18px" />
      )}
      {concatAddress(value)}
    </button>
  )
}

export function CopyToClipboardSmall({
  value,
  success = 'Copied to clipboard!',
}: CopyToClipboardProps) {
  return (
    <button
      className="transition font-sm font-mono text-sm text-secondary hover:text-primary"
      onClick={() => {
        navigator.clipboard.writeText(value)
        toast.success(success)
      }}
    >
      <PaperClipIcon className="w-4 h-4 inline mr-1" />
      {concatAddressImpl(value, 12, 7)}
    </button>
  )
}

export function CopyToClipboardAccent({
  value,
  success = 'Copied to clipboard!',
}: CopyToClipboardProps) {
  return (
    <button
      className="transition text-sm underline hover:no-underline text-brand transition"
      onClick={() => {
        navigator.clipboard.writeText(value)
        toast.success(success)
      }}
    >
      {concatAddressImpl(value, 12, 7)}
    </button>
  )
}
