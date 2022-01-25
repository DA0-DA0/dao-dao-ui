import { Breadcrumbs } from '@components/Breadcrumbs'
import { nextDraftProposalIdAtom } from 'atoms/proposals'
import Loader from 'components/Loader'
import { ProposalDraftSidebar } from 'components/ProposalDraftSidebar'
import { EmptyProposal } from 'models/proposal/proposal'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  useRecoilState,
  useRecoilTransaction_UNSTABLE,
  useRecoilValue,
} from 'recoil'
import { daoSelector } from 'selectors/daos'
import { draftProposalsSelector } from 'selectors/proposals'
import { createDraftProposalTransaction, draftProposalKey } from 'util/proposal'

const ProposalCreate: NextPage = () => {
  const router: NextRouter = useRouter()
  const contractAddress = router.query.contractAddress as string
  const [nextDraftProposalId, setNextDraftProposalId] = useRecoilState<number>(
    nextDraftProposalIdAtom
  )
  const [proposalId, setProposalId] = useState<string>('')
  const draftProposals = useRecoilValue(draftProposalsSelector(contractAddress))
  const createDraftProposal = useRecoilTransaction_UNSTABLE(
    createDraftProposalTransaction(contractAddress, draftProposals)
    // [contractAddress]
  )

  useEffect(() => {
    if (!proposalId) {
      const draftKey = draftProposalKey(nextDraftProposalId)
      const nextId = nextDraftProposalId + 1
      setNextDraftProposalId(nextId)
      console.log(`initializing proposal ${draftKey}`)
      // createDraftProposal({
      //   draftProposal: { ...EmptyProposal } as any,
      // })
      setProposalId(draftKey)
    } else {
      router.replace(`/dao/${contractAddress}/proposals/${proposalId}`)
    }
  }, [
    contractAddress,
    createDraftProposal,
    nextDraftProposalId,
    setNextDraftProposalId,
    proposalId,
    router,
  ])

  const sidebar = (
    <ProposalDraftSidebar
      contractAddress={contractAddress}
      proposalId={proposalId}
    />
  )

  const daoInfo = useRecoilValue(daoSelector(contractAddress))

  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/dao/${contractAddress}`, daoInfo.config.name],
            [router.asPath, `New proposal`],
          ]}
        />
      </div>
      <div className="col-span-2 p-6 bg-base-200 min-h-screen">{sidebar}</div>
    </div>
  )
}

export default ProposalCreate
