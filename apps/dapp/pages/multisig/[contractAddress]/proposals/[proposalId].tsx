import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilValue } from 'recoil'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { ProposalDetails } from 'components/ProposalDetails'
import { ProposalDetailsSidebar } from 'components/ProposalDetailsSidebar'
import { sigSelector } from 'selectors/multisigs'

const MultisigProposal: NextPage = () => {
  const router = useRouter()
  const proposalKey = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string
  const sigInfo = useRecoilValue(sigSelector(contractAddress))

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />
        <ProposalDetails
          contractAddress={contractAddress}
          fromCosmosMsgProps={{
            govDecimals: 0,
          }}
          multisig
          proposalId={Number(proposalKey)}
        />
      </div>
      <div className="col-span-2 p-6 min-h-screen bg-base-200">
        <ProposalDetailsSidebar
          contractAddress={contractAddress}
          multisig
          proposalId={Number(proposalKey)}
        />
      </div>
    </div>
  )
}

export default MultisigProposal
