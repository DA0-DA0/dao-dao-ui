import { ProposalEditor } from 'components/ProposalEditor'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { memoForProposal } from 'models/proposal/proposal'
import { successNotify } from 'util/toast'
import LineAlert from 'components/LineAlert'
import { cleanChainError } from 'util/cleanChainError'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { useRecoilState, useRecoilValue } from 'recoil'
import { sigSelector } from 'selectors/multisigs'
import { useState } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import { proposalsCreatedAtom } from 'atoms/proposals'
// import { messageForProposal } from 'models/proposal/proposalSelectors'
import { defaultExecuteFee } from 'util/fee'

const ProposalCreate: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string
  const sigInfo = useRecoilValue(sigSelector(contractAddress))

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { walletAddress, signingClient } = useSigningClient()

  // Used to notify the proposal list that it needs to update to
  // include the newly created proposal.
  const [_pca, setProposalsCreatedAtom] = useRecoilState(
    proposalsCreatedAtom(contractAddress)
  )

  const handleProposal = async (
    proposal: Proposal,
    contractAddress: string,
    govTokenAddress?: string
  ) => {
    setLoading(true)
    setError('')
    if (!signingClient || !walletAddress) {
      setError('Wallet is not connected')
    }
    const propose = messageForProposal(proposal, govTokenAddress)
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
        const [{ events }] = response.logs
        const [wasm] = events.filter((e) => e.type === 'wasm')
        const [{ value }] = wasm.attributes.filter(
          (w) => w.key === 'proposal_id'
        )
        successNotify('New Proposal Created')
        setProposalsCreatedAtom((n) => n + 1)
        router.push(`/multisig/${contractAddress}/proposals/${value}`)
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

  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/multisig/list', 'Multisigs'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, 'Create proposal'],
          ]}
        />

        <ProposalEditor
          loading={loading}
          contractAddress={contractAddress}
          recipientAddress={walletAddress}
          proposalId={proposalId}
          multisig={true}
        />
        {error && (
          <div className="mt-8">
            <LineAlert variant="error" msg={cleanChainError(error)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProposalCreate
