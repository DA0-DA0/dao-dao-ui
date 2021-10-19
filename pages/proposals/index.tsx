import type { NextPage } from 'next'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ProposalCard from 'components/ProposalCard'
import { ProposalListResponse, ProposalResponse, Timestamp } from 'types/cw3'

// TODO: review union Expiration from types/cw3
type Expiration = {
  at_time: Timestamp
}

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
    signingClient
      .queryContractSmart(contractAddress, {
        reverse_proposals: {
          ...(startBefore && { start_before: startBefore }),
          limit: 10,
        },
      })
      .then((response: ProposalListResponse) => {
        if (response.proposals.length < 10) {
          setHideLoadMore(true)
        }
        setProposals((p) => p.concat(response.proposals))
      })
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false)
      })
  }, [walletAddress, signingClient, startBefore])

  return (
    <WalletLoader loading={proposals.length === 0 && loading}>
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
      <div className="w-96 lg:w-6/12 max-w-full">
        {proposals.length === 0 && (
          <div className="text-center">
            No proposals found, please create a proposal.
          </div>
        )}
        {proposals.map((proposal, idx) => {
          const { title, id, status } = proposal
          const expires = proposal.expires as Expiration

          return (
            <ProposalCard
              key={id}
              title={title}
              id={`${id}`}
              status={status}
              expires_at={parseInt(expires.at_time)}
              contractAddress={contractAddress}
            />
          )
        })}
        {!hideLoadMore && (
          <button
            className="btn btn-primary btn-outline text-lg w-full mt-2"
            onClick={() => {
              const proposal = proposals[proposals.length - 1]
              setStartBefore(proposal.id)
            }}
          >
            Load More
          </button>
        )}
      </div>
      <div></div>
    </WalletLoader>
  )
}

export default Home
