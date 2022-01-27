import { errorAtom, loadingAtom } from 'atoms/status'
import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  ProposalDetails,
  ProposalDetailsSidebar,
} from 'components/ProposalDetails'
import { ProposalDraftSidebar } from 'components/ProposalDraftSidebar'
import ProposalEditor from 'components/ProposalEditor'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { sigSelector } from 'selectors/multisigs'
import { draftProposalSelector } from 'selectors/proposals'
import { walletAddress as walletAddressSelector } from 'selectors/cosm'
import { sidebarExpandedAtom } from 'atoms/sidebar'
import { Sidebar } from 'components/Sidebar'

const MultisigProposal: NextPage = () => {
  const router = useRouter()
  const proposalKey = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string
  const sigInfo = useRecoilValue(sigSelector(contractAddress))
  const draftProposal = useRecoilValue(
    draftProposalSelector({ contractAddress, proposalId: proposalKey })
  )
  const walletAddress = useRecoilValue(walletAddressSelector)
  const error = useRecoilValue(errorAtom)
  const loading = useRecoilValue(loadingAtom)
  const expanded = useRecoilValue(sidebarExpandedAtom)

  let content
  let sidebar

  const sidebarClassName = `w-full col-span-${expanded ? 4 : 6} p-6`

  if (draftProposal || proposalKey.startsWith('draft:')) {
    content = (
      <ProposalEditor
        proposalId={proposalKey}
        error={error}
        loading={loading}
        contractAddress={contractAddress}
        recipientAddress={walletAddress}
        multisig={true}
      />
    )
    sidebar = (
      <ProposalDraftSidebar
        contractAddress={contractAddress}
        proposalId={proposalKey}
      />
    )
  } else {
    content = (
      <ProposalDetails
        contractAddress={contractAddress}
        proposalId={Number(proposalKey)}
      />
    )
    sidebar = (
      <ProposalDetailsSidebar
        contractAddress={contractAddress}
        proposalId={Number(proposalKey)}
      />
    )
  }

  return (
    <div className="grid grid-cols-6">
      <div className={sidebarClassName}>
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />
        {content}
      </div>
      <Sidebar>
        <div className="col-span-2 p-6 bg-base-200 min-h-screen">{sidebar}</div>
      </Sidebar>
    </div>
  )
}

export default MultisigProposal
