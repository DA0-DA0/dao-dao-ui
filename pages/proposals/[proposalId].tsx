import LineAlert from 'components/LineAlert'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProposalResponse, VoteInfo } from 'types/cw3'
import { defaultExecuteFee } from 'util/fee'

const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || ''

function VoteButtons({
  onVoteYes = () => {},
  onVoteNo = () => {},
  onBack = (e: any) => {},
  votes = [],
  walletAddress = '',
  status = '',
}) {
  const [vote]: VoteInfo[] = votes.filter(
    (v: VoteInfo) => v.voter === walletAddress
  )

  if (vote) {
    const variant =
      vote.vote === 'yes' ? 'success' : vote.vote === 'no' ? 'error' : 'error'
    const msg = `You voted ${vote.vote}`
    return (
      <>
        <LineAlert className="mt-2" variant={variant} msg={msg} />
        {status === 'open' && (
          <button
            className="box-border px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white my-4"
            onClick={onBack}
          >
            {'< Proposals'}
          </button>
        )}
      </>
    )
  }
  if (status !== 'open') {
    return null
  }
  return (
    <div className="flex justify-between content-center mt-2">
      <button
        className="box-border px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
        onClick={onBack}
      >
        {'< Proposals'}
      </button>

      <button
        className="box-border px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
        onClick={onVoteYes}
      >
        Sign
      </button>
      <button
        className="box-border px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
        onClick={onVoteNo}
      >
        Reject
      </button>
    </div>
  )
}

const Proposal: NextPage = () => {
  const router = useRouter()
  const proposalId = router.query.proposalId as string

  const { walletAddress, signingClient } = useSigningClient()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [proposal, setProposal] = useState<ProposalResponse | null>(null)
  const [votes, setVotes] = useState([])
  const [timestamp, setTimestamp] = useState(new Date())
  const [transactionHash, setTransactionHash] = useState('')

  const initialMessage: string | undefined = router.query.initialMessage as any
  const initialMessageStatus: 'success' | 'error' | undefined = router.query
    .initialMessageStatus as any

  useEffect(() => {
    if (walletAddress.length === 0 || !signingClient) {
      return
    }
    setLoading(true)
    Promise.all([
      signingClient.queryContractSmart(contractAddress, {
        proposal: { proposal_id: parseInt(proposalId) },
      }),
      signingClient.queryContractSmart(contractAddress, {
        list_votes: { proposal_id: parseInt(proposalId) },
      }),
    ])
      .then((values) => {
        const [proposal, { votes }] = values
        setProposal(proposal)
        setVotes(votes)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }, [walletAddress, signingClient, proposalId, timestamp])

  const handleVote = async (vote: string) => {
    signingClient
      ?.execute(
        walletAddress,
        contractAddress,
        {
          vote: { proposal_id: parseInt(proposalId), vote },
        },
        defaultExecuteFee
      )
      .then((response) => {
        setTimestamp(new Date())
        setTransactionHash(response.transactionHash)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }

  const handleExecute = async () => {
    setError('')
    signingClient
      ?.execute(
        walletAddress,
        contractAddress,
        {
          execute: { proposal_id: parseInt(proposalId) },
        },
        defaultExecuteFee
      )
      .then((response) => {
        setTimestamp(new Date())
        setTransactionHash(response.transactionHash)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }

  const handleClose = async () => {
    setError('')
    signingClient
      ?.execute(
        walletAddress,
        contractAddress,
        {
          close: { proposal_id: parseInt(proposalId) },
        },
        defaultExecuteFee
      )
      .then((response) => {
        setTimestamp(new Date())
        setTransactionHash(response.transactionHash)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.message)
      })
  }

  const initialMessageComponent =
    initialMessage && initialMessageStatus ? (
      <LineAlert msg={initialMessage} variant={initialMessageStatus} />
    ) : null

  let proposalMessageContent = null
  if (proposal?.msgs?.length) {
    proposalMessageContent = (
      <code className="break-all whitespace-pre">
        {JSON.stringify(proposal.msgs, undefined, 2)}
      </code>
    )
  }

  return (
    <WalletLoader loading={loading}>
      <div className="flex flex-col w-full">
        <div className="grid bg-base-100 place-items-center">
          {initialMessageComponent}
          {!proposal ? (
            <div className="text-center m-8">
              No proposal with that ID found.
            </div>
          ) : (
            <div className="container mx-auto max-w-lg text-left">
              <h1 className="text-3xl font-bold mb-8">{proposal.title}</h1>
              <p className="mb-8">{proposal.description}</p>
              {proposalMessageContent}

              <VoteButtons
                onVoteYes={handleVote.bind(null, 'yes')}
                onVoteNo={handleVote.bind(null, 'no')}
                onBack={(e) => {
                  e.preventDefault()
                  router.push(`/proposals`)
                }}
                votes={votes}
                walletAddress={walletAddress}
                status={proposal.status}
              />

              {error && (
                <LineAlert className="mt-2" variant="error" msg={error} />
              )}

              {transactionHash.length > 0 && (
                <div className="mt-8">
                  <LineAlert
                    variant="success"
                    msg={`Success! Transaction Hash: ${transactionHash}`}
                  />
                </div>
              )}

              {proposal.status !== 'open' && (
                <div className="flex justify-between content-center my-8">
                  <button
                    className="box-border px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(`/proposals`)
                    }}
                  >
                    {'< Proposals'}
                  </button>
                  {proposal.status === 'passed' && (
                    <button
                      className="box-border px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
                      onClick={handleExecute}
                    >
                      Execute
                    </button>
                  )}
                  {proposal.status === 'rejected' && (
                    <button
                      className="box-border px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </WalletLoader>
  )
}

export default Proposal
