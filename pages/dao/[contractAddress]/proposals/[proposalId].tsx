import { errorAtom, loadingAtom } from '../../../../atoms/status'
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
import { daoSelector } from 'selectors/daos'
import { draftProposalSelector } from 'selectors/proposals'
import { walletAddress as walletAddressSelector } from 'selectors/treasury'

const Proposal: NextPage = () => {
  const router = useRouter()
  const proposalKey = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string
  const sigInfo = useRecoilValue(daoSelector(contractAddress))
  const draftProposal = useRecoilValue(
    draftProposalSelector({ contractAddress, proposalId: proposalKey })
  )
  const walletAddress = useRecoilValue(walletAddressSelector)
  const error = useRecoilValue(errorAtom)
  const loading = useRecoilValue(loadingAtom)

  let content
  let sidebar

  if (draftProposal || proposalKey.startsWith('draft:')) {
    content = (
      <ProposalEditor
        proposalId={proposalKey}
        error={error}
        loading={loading}
        contractAddress={contractAddress}
        recipientAddress={walletAddress}
        multisig={false}
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
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/dao/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />
        {content}
      </div>
      <div className="col-span-2 p-6 bg-base-200 min-h-screen">{sidebar}</div>
    </div>
  )
}

export default Proposal
