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
import { sidebarExpandedAtom } from 'atoms/sidebar'
import { Sidebar } from 'components/Sidebar'

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
  const expanded = useRecoilValue(sidebarExpandedAtom)

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

  const sidebarClassName = `w-full col-span-${expanded ? 4 : 6} p-6}`

  return (
    <div className="grid grid-cols-6">
      <div className={sidebarClassName}>
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/dao/${contractAddress}`, daoInfo.config.name],
            [router.asPath, `New proposal`],
          ]}
        />
      </div>
      <Sidebar>
        <div className="col-span-2 p-6 bg-base-200 min-h-screen">{sidebar}</div>
      </Sidebar>
    </div>
  )
}

export default ProposalCreate
