import { ClipboardCheckIcon, ClipboardCopyIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import JunoLogo from './JunoLogo'

export default function ClipboardText({
  address,
  description,
}: {
  address: string
  description: string
}) {
  const [clicked, setClicked] = useState(false)

  return (
    <div className="mt-2 text-left">
      <h3 className="p-1 font-semibold">{description}</h3>
      <div className="w-full flex items-center justify-center">
        <a
          className="border rounded-md mr-2 w-14"
          href={`https://www.mintscan.io/juno/account/${address}`}
          target="_blank"
          rel="noreferrer"
        >
          <JunoLogo />
        </a>
        <input
          readOnly
          type="text"
          value={address}
          className="border rounded-md p-2 w-full"
        />
        <button
          className="border rounded-md p-2 mx-2"
          onClick={() => {
            navigator.clipboard.writeText(address)
            setClicked((cur) => !cur)
          }}
        >
          {clicked ? (
            <ClipboardCheckIcon className="h-6 w-6" />
          ) : (
            <ClipboardCopyIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  )
}
