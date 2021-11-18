import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProposalListResponse, ProposalResponse, Timestamp } from 'types/cw3'
import ProposalList from 'components/ProposalList'

const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || ''

const Home: NextPage = () => {
  const router = useRouter()
  const { walletAddress, signingClient } = useSigningClient()
  const [proposals, setProposals] = useState<ProposalResponse[]>([])
  const [hideLoadMore, setHideLoadMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [startBefore, setStartBefore] = useState<number | null>(null)

  useEffect(() => {
    if (walletAddress.length === 0 || !signingClient) {
      setProposals([])
      setHideLoadMore(false)
      return
    }

    setLoading(true)
    async function sign(signingClient: SigningCosmWasmClient) {
      try {
        const response: ProposalListResponse =
          await signingClient.queryContractSmart(contractAddress, {
            reverse_proposals: {
              ...(startBefore && { start_before: startBefore }),
              limit: 10,
            },
          })
        setLoading(false)
        if (response.proposals.length < 10) {
          setHideLoadMore(true)
        }
        setProposals((p) => p.concat(response.proposals))
      } catch (err) {
        setLoading(false)
      }
    }
    sign(signingClient)
  }, [walletAddress, signingClient, startBefore])

  return (
    <WalletLoader loading={!proposals || (proposals.length === 0 && loading)}>
      <div className="flex flex-col w-96 lg:w-6/12 max-w-full px-2 py-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-lg font-bold sm:text-3xl">Proposals</h1>
          <button
            className="btn btn-primary btn-sm text-lg"
            onClick={() => router.push(`/proposals/create`)}
          >
            + Create
          </button>
        </div>
      </div>
      <ProposalList
        proposals={proposals}
        contractAddress={contractAddress}
        hideLoadMore={hideLoadMore}
        onLoadMore={() => {
          const proposal = proposals && proposals[proposals.length - 1]
          if (proposal) {
            setStartBefore(proposal.id)
          }
        }}
      />
      <div></div>
    </WalletLoader>
  )
}

export default Home
