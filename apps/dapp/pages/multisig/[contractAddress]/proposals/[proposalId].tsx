import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilValue } from 'recoil'

import { sidebarExpandedAtom } from 'atoms/sidebar'
import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  ProposalDetails,
  ProposalDetailsSidebar,
} from 'components/ProposalDetails'
import Sidebar from 'components/Sidebar'
import { sigSelector } from 'selectors/multisigs'

const MultisigProposal: NextPage = () => {
  const router = useRouter()
  const proposalKey = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string
  const sigInfo = useRecoilValue(sigSelector(contractAddress))
  const expanded = useRecoilValue(sidebarExpandedAtom)

  return (
    <div className={expanded ? 'grid grid-cols-6' : 'grid grid-cols-1'}>
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />
        <ProposalDetails
          contractAddress={contractAddress}
          proposalId={Number(proposalKey)}
          fromCosmosMsgProps={{
            govDecimals: 0,
          }}
          multisig
        />
      </div>
      <Sidebar>
        <div className="col-span-2 p-6 bg-base-200 min-h-screen">
          <ProposalDetailsSidebar
            contractAddress={contractAddress}
            proposalId={Number(proposalKey)}
            multisig
          />
        </div>
      </Sidebar>
    </div>
  )
}

export default MultisigProposal
