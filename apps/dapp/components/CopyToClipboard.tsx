import { PaperClipIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'

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
  success = 'Copied address to clipboard!',
}: CopyToClipboardProps) {
  return (
    <button
      className="btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px-1 font-mono text-xs"
      onClick={() => {
        navigator.clipboard.writeText(value)
        toast.success(success)
      }}
    >
      {concatAddress(value)}
    </button>
  )
}

export function CopyToClipboardSmall({
  value,
  success = 'Copied address to clipboard!',
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
  success = 'Copied address to clipboard!',
}: CopyToClipboardProps) {
  return (
    <button
      className="transition text-sm text-accent hover:underline"
      onClick={() => {
        navigator.clipboard.writeText(value)
        toast.success(success)
      }}
    >
      {concatAddressImpl(value, 12, 7)}
    </button>
  )
}
