import { draftProposalSelector } from 'selectors/proposals'
import { errorAtom, loadingAtom, transactionHashAtom } from 'atoms/status'
import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  ProposalDetails,
  ProposalDetailsSidebar,
} from 'components/ProposalDetails'
import ProposalEditor from 'components/ProposalEditor'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { cosmWasmSigningClient} from 'selectors/cosm'
import { walletAddress as walletAddressSelector } from 'selectors/treasury'
import { daoSelector } from 'selectors/daos'
import { createProposal } from 'util/proposal'
import { ProposalDraftSidebar } from 'components/ProposalDraftSidebar'

const Proposal: NextPage = () => {
  const router = useRouter()
  const proposalId = parseInt(router.query.proposalId as string)
  const contractAddress = router.query.contractAddress as string
  const sigInfo = useRecoilValue(daoSelector(contractAddress))
  const draftProposal = useRecoilValue(
    draftProposalSelector({ contractAddress, proposalId })
  )
  const walletAddress = useRecoilValue(walletAddressSelector)
  const error = useRecoilValue(errorAtom)
  const loading = useRecoilValue(loadingAtom)

  let content
  let sidebar

  if (draftProposal) {
    content = (
      <ProposalEditor
        proposalId={proposalId}
        error={error}
        loading={loading}
        contractAddress={contractAddress}
        recipientAddress={walletAddress}
      />
    )
    sidebar = (
      <ProposalDraftSidebar
        contractAddress={contractAddress}
        proposalId={proposalId}
      />
    )
  } else {
    content = (
      <ProposalDetails
        contractAddress={contractAddress}
        proposalId={Number(proposalId)}
      />
    )
    sidebar = (
      <ProposalDetailsSidebar
        contractAddress={contractAddress}
        proposalId={Number(proposalId)}
      />
    )
  }

  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/dao/list', 'DAOs'],
            [`/dao/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalId}`],
          ]}
        />
        {content}
      </div>
      <div className="col-span-2 p-6 bg-base-200 min-h-screen">{sidebar}</div>
    </div>
  )
}

export default Proposal
