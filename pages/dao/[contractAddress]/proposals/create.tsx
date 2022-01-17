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
  useSetRecoilState,
} from 'recoil'
import {
  nextDraftProposalIdAtom,
} from 'atoms/proposals'
import { draftProposalsSelector } from 'selectors/proposals'
import { daoSelector } from 'selectors/daos'
import {
  cosmWasmSigningClient,
} from 'selectors/cosm'

import { walletAddress as walletAddressSelector} from 'selectors/treasury'

import {
  transactionHashAtom,
  loadingAtom,
  errorAtom,
} from 'atoms/status'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { ProposalDraftSidebar } from 'components/ProposalDraftSidebar'

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
  const sigInfo = useRecoilValue(daoSelector(contractAddress))

  useEffect(() => {
    if (proposalId < 0) {
      const nextId = nextDraftProposalId + 1
      createDraftProposal(contractAddress, {
        draftProposal: { ...EmptyProposal } as any,
      })
      setProposalId(nextId)
      setNextDraftProposalId(nextId)
    }
  }, [contractAddress, createDraftProposal, nextDraftProposalId, setNextDraftProposalId, proposalId])

  const sidebar = <ProposalDraftSidebar contractAddress={contractAddress} proposalId={proposalId} />
  
  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/dao/list', 'DAOs'],
            [`/dao/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Create Proposal`],
          ]}
        />
        <ProposalEditor
          proposalId={proposalId}
          error={error}
          loading={loading}
          contractAddress={contractAddress}
          recipientAddress={walletAddress}
          multisig={false}
        />
      </div>
      <div className="col-span-2 p-6 bg-base-200 min-h-screen">{sidebar}</div>
    </div>
  )
}

export default ProposalCreate
