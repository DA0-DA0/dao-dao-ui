import { useState } from 'react'
import toast from 'react-hot-toast'
// import JunoLogo from './JunoLogo'
//

function concatAddress(address: string) {
  const takeN = 7
  const strLen = address.length
  const first = address.substring(0, takeN)
  const last = address.substring(strLen - takeN, strLen)
  return first + '...' + last
}

export default function Address({
  address,
  description,
}: {
  address: string
  description: string
}) {
  const [clicked, setClicked] = useState(false)

  return (
    <button
      className="btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px-1 font-mono text-xs"
      onClick={() => {
        navigator.clipboard.writeText(address)
        toast.success('Copied address to clipboard!')
        // setClicked((cur) => !cur)
      }}
    >
      {concatAddress(address)}
    </button>
  )
}
