import LineAlert from 'components/LineAlert'
import { ProposalEditor } from 'components/ProposalEditor'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { memoForProposal, Proposal } from 'models/proposal/proposal'
import { messageForProposal } from 'models/proposal/proposalSelectors'
import { defaultExecuteFee } from 'util/fee'
import { successNotify } from 'util/toast'
import { useRecoilState, useRecoilValue } from 'recoil'
import { proposalsCreatedAtom } from 'atoms/proposals'
import { cleanChainError } from 'util/cleanChainError'
import { daoSelector } from 'selectors/daos'
import { Breadcrumbs } from 'components/Breadcrumbs'

const ProposalCreate: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string
  const daoInfo = useRecoilValue(daoSelector(contractAddress))

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
        router.push(`/dao/${contractAddress}/proposals/${value}`)
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
            ['/starred', 'Home'],
            [`/dao/${contractAddress}`, daoInfo.config.name],
            [router.asPath, 'Create proposal'],
          ]}
        />

        <ProposalEditor
          onProposal={handleProposal}
          loading={loading}
          contractAddress={contractAddress}
          recipientAddress={walletAddress}
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
