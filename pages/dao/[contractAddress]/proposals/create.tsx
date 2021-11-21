import LineAlert from 'components/LineAlert'
import ProposalEditor from 'components/ProposalEditor'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { memoForProposal, Proposal } from 'models/proposal/proposal'
import { messageForProposal } from 'models/proposal/proposalSelectors'
import { defaultExecuteFee } from 'util/fee'

const ProposalCreate: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const { walletAddress, signingClient } = useSigningClient()
  const [transactionHash, setTransactionHash] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [proposalID, setProposalID] = useState('')

  const handleProposal = async (proposal: Proposal) => {
    setLoading(true)
    setError('')
    const propose = messageForProposal(proposal)
    const memo = memoForProposal(proposal)
    try {
      const response = await signingClient?.execute(
        walletAddress,
        contractAddress,
        { propose },
        defaultExecuteFee,
        memo
      )
      setLoading(false)
      if (response) {
        setTransactionHash(response.transactionHash)
        const [{ events }] = response.logs
        const [wasm] = events.filter((e) => e.type === 'wasm')
        const [{ value }] = wasm.attributes.filter(
          (w) => w.key === 'proposal_id'
        )
        setProposalID(value)
        const initialMessage = `Saved Proposal "${proposal.title}"`
        const paramStr = `initialMessage=${initialMessage}&initialMessageStatus=success`

        router.push(`/dao/${contractAddress}/proposals/${value}?${paramStr}`)
      }
    } catch (e: any) {
      console.error(
        `Error submitting proposal ${JSON.stringify(proposal, undefined, 2)}`
      )
      console.dir(e)
      console.error(e.message)
      setLoading(false)
      setError(e.message)
    }
  }

  const content = proposalID ? (
    <div>
      <a
        href={`/dao/${contractAddress}/proposals/${proposalID}`}
      >{`${proposalID} saved`}</a>
      <LineAlert className="mt-2" variant="success" msg="Proposal Saved" />
    </div>
  ) : (
    <ProposalEditor
      onProposal={handleProposal}
      error={error}
      loading={loading}
      contractAddress={contractAddress}
      recipientAddress={walletAddress}
    />
  )

  return (
    <WalletLoader>
      <div className="flex flex-col w-full">{content}</div>
    </WalletLoader>
  )
}

export default ProposalCreate
