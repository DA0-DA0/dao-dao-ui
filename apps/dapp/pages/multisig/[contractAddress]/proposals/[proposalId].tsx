import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilValue } from 'recoil'

import { Breadcrumbs } from 'components/Breadcrumbs'
import { ProposalDetails } from 'components/ProposalDetails'
import {
  ProposalDetailsSidebar,
  ProposalDetailsCard,
  ProposalDetailsVoteStatus,
} from 'components/ProposalDetailsSidebar'
import { sigSelector } from 'selectors/multisigs'

const MultisigProposal: NextPage = () => {
  const router = useRouter()
  const proposalKey = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string
  const sigInfo = useRecoilValue(sigSelector(contractAddress))

  const proposalDetailsProps = {
    contractAddress,
    multisig: true,
    proposalId: Number(proposalKey),
  }

  return (
    <div className="grid grid-cols-4 lg:grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />

        <div className="px-6 mt-6 lg:hidden">
          <ProposalDetailsCard {...proposalDetailsProps} />
        </div>

        <ProposalDetails
          contractAddress={contractAddress}
          fromCosmosMsgProps={{
            govDecimals: 0,
          }}
          multisig
          proposalId={Number(proposalKey)}
        />

        <div className="px-6 pb-6 mt-6 lg:hidden">
          <h3 className="mb-6 text-base font-medium">Referendum status</h3>

          <ProposalDetailsVoteStatus {...proposalDetailsProps} />
        </div>
      </div>
      <div className="hidden col-span-2 p-6 min-h-screen lg:block bg-base-200">
        <ProposalDetailsSidebar {...proposalDetailsProps} />
      </div>
    </div>
  )
}

export default MultisigProposal
