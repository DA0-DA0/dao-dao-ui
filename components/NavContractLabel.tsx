import { useState, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ContractLabel() {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string
  const { signingClient } = useSigningClient()
  const [label, setLabel] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    if (!contractAddress || !signingClient) {
      setLabel('')
      return
    } else {
      signingClient.getContract(contractAddress).then((response) => {
        setLabel(response.label)
      })

      if (router.pathname.includes('/dao/[contractAddress]')) {
        setLink(`/dao/${contractAddress}/`)
      } else {
        setLink(`/multisig/${contractAddress}/`)
      }
    }
  }, [signingClient, contractAddress, router])

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
      <Link href={link}>
        <a className="capitalize hover:underline text-2xl">{label}</a>
      </Link>
    </div>
  )
}

export default ContractLabel
