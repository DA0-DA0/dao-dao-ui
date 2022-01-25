import { useState } from 'react'
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
import { walletAddress as walletAddressSelector } from 'selectors/treasury'
import { useThemeContext } from 'contexts/theme'

function getEditorTheme(appTheme: string): string {
  return appTheme !== 'junoDark' ? 'black' : 'white'
}

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
  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const themeContext = useThemeContext()
  const backgroundArrowColor = getEditorTheme(themeContext.theme)

  const collapsedArrowClass = isExpanded ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  )

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
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />
        {content}
      </div>
      {isExpanded ? (
        <div className="col-span-2 p-6 border-l border-base-300 bg-base-200 min-h-screen">
          <i
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              backgroundColor: backgroundArrowColor,
              margin: '-21px 0 0 -48px',
              padding: '10px 0 10px 0',
              borderRadius: '15px 0 0 15px',
              color: 'grey',
              cursor: 'pointer',
              fontSize: '25px',
              lineHeight: '1',
              position: 'absolute',
              top: '50%',
            }}
          >
            {collapsedArrowClass}
          </i>
          {sidebar}
        </div>
      ) : (
        <div className="flex items-center justify-end col-span-2">
          <i
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              backgroundColor: backgroundArrowColor,
              margin: '-21px 0 0 -48px',
              padding: '10px 0 10px 0',
              borderRadius: '15px 0 0 15px',
              color: 'grey',
              cursor: 'pointer',
              fontSize: '25px',
              lineHeight: '1',
              position: 'absolute',
              top: '50%',
            }}
          >
            {collapsedArrowClass}
          </i>
        </div>
      )}
    </div>
  )
}

export default MultisigProposal
