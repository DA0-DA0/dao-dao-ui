import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { Breadcrumbs, LoadingScreen } from '@dao-dao/ui'

import ErrorBoundary from '@/components/ErrorBoundary'
import { ProposalDetails } from '@/components/ProposalDetails'
import {
  ProposalDetailsSidebar,
  ProposalDetailsCard,
  ProposalDetailsVoteStatus,
} from '@/components/ProposalDetailsSidebar'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import { sigSelector } from '@/selectors/multisigs'

const InnerMultisigProposal: FC = () => {
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
      <div className="col-span-4 w-full md:p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />

        <div className="mb-4 md:hidden">
          <SmallScreenNav />
        </div>

        <div className="px-6 md:mt-6 lg:hidden">
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

const MultisigProposalPage: NextPage = () => (
  <ErrorBoundary title="Proposal Not Found">
    <SuspenseLoader fallback={<LoadingScreen />}>
      <InnerMultisigProposal />
    </SuspenseLoader>
  </ErrorBoundary>
)

export default MultisigProposalPage
