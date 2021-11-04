import type { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import { StargateClient, IndexedTx } from '@cosmjs/stargate'
import Transfers from 'components/Transfers'

const DAO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || ''
const CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''

const Home: NextPage = () => {
  const { walletAddress, signingClient } = useSigningClient()
  const [txs, setTxs] = useState<IndexedTx[]>([])

  useEffect(() => {
    if (!signingClient) {
      return
    }

    signingClient
      ?.searchTx({ sentFromOrTo: DAO_CONTRACT_ADDRESS })
      .then((response) => {
        setTxs(response as IndexedTx[])
      })
      .catch((error) => console.log(error))
  }, [signingClient])

  return (
    <WalletLoader>
      <h1 className="text-6xl font-bold">
        Welcome to {process.env.NEXT_PUBLIC_SITE_TITLE} !
      </h1>

      {process.env.NEXT_PUBLIC_SITE_DESCRIPTION && (
        <h3 className="mt-3 text-3xl">
          {process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        </h3>
      )}

      <div className="my-3 text-xl">
        Your wallet address is:{' '}
        <pre className="font-mono break-all whitespace-pre-wrap">
          {walletAddress}
        </pre>
      </div>
      <div className="text-left w-full">
        <Transfers txs={txs} />
      </div>
    </WalletLoader>
  )
}

export default Home
