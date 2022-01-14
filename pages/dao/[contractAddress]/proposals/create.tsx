import ProposalEditor from 'components/ProposalEditor'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { EmptyProposal, memoForProposal } from 'models/proposal/proposal'
import { defaultExecuteFee } from 'util/fee'
import Link from 'next/link'
import { Proposal } from '@dao-dao/types/contracts/cw3-dao'
import { createDraftProposalTransaction, createProposal } from 'util/proposal'
import {
  useRecoilState,
  useRecoilTransaction_UNSTABLE,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil'
import {
  nextDraftProposalIdAtom,
} from 'atoms/proposals'
import { draftProposalsSelector } from 'selectors/proposals'

import {
  cosmWasmSigningClient,
  walletAddressSelector
} from 'selectors/cosm'

import {
  transactionHashAtom,
  loadingAtom,
  errorAtom,
} from 'atoms/status'

const ProposalCreate: NextPage = () => {
  const router: NextRouter = useRouter()
  const contractAddress = router.query.contractAddress as string
  const [nextDraftProposalId, setNextDraftProposalId] = useRecoilState<number>(
    nextDraftProposalIdAtom
  )
  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const walletAddress = useRecoilValue(walletAddressSelector)
  const [error, setError] = useRecoilState(errorAtom)
  const [loading, setLoading] = useRecoilState(loadingAtom)
  const [proposalId, setProposalId] = useState<number>(-1)
  const draftProposals = useRecoilValue(draftProposalsSelector(contractAddress))
  const createDraftProposal = useRecoilTransaction_UNSTABLE(
    createDraftProposalTransaction(contractAddress, draftProposals),
    [contractAddress]
  )
  const [transactionHash, setTransactionHash] = useRecoilState(transactionHashAtom)


  useEffect(() => {
    if (proposalId < 0) {
      const nextId = nextDraftProposalId + 1
      // setNextDraftProposalId(nextId)
      createDraftProposal(contractAddress, {
        draftProposal: { ...EmptyProposal } as any,
      })
      setProposalId(nextId)
    }
  }, [contractAddress, createDraftProposal, nextDraftProposalId, proposalId])

  const handleProposal = createProposal({
    contractAddress,
    router,
    walletAddress,
    signingClient,
    setTransactionHash,
    setError,
    setLoading,
    // resetOnChainProposals
  })

  return (
    <>
      <div className="flex flex-col w-full">
        <ProposalEditor
          onProposal={handleProposal}
          proposalId={proposalId}
          error={error}
          loading={loading}
          contractAddress={contractAddress}
          recipientAddress={walletAddress}
        />
      </div>
    </>
  )
}

export default ProposalCreate
