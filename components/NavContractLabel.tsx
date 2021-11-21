import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ContractLabel() {
  let router = useRouter()
  let contractAddress = router.query.contractAddress as string
  const { signingClient } = useSigningClient()
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (contractAddress.length === 0 || !signingClient) {
      setLabel('')
      return
    }

    signingClient.getContract(contractAddress).then((response) => {
      setLabel(response.label)
    })
  }, [signingClient, contractAddress])

  if (label.length === 0) {
    return null
  }

  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-6 h-6 mx-2 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
      <Link href={`/proposals`}>
        <a className="capitalize hover:underline text-2xl">{label}</a>
      </Link>
    </div>
  )
}

export default ContractLabel
