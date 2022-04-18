import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilValue } from 'recoil'

import { Breadcrumbs } from '@dao-dao/ui'

import { ProposalDetails } from 'components/ProposalDetails'
import {
  ProposalDetailsSidebar,
  ProposalDetailsVoteStatus,
  ProposalDetailsCard,
} from 'components/ProposalDetailsSidebar'
import { daoSelector } from 'selectors/daos'
import { cw20TokenInfo } from 'selectors/treasury'

const Proposal: NextPage = () => {
  const router = useRouter()
  const proposalKey = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string
  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const govTokenInfo = useRecoilValue(cw20TokenInfo(daoInfo.gov_token))

  const proposalDetailsProps = {
    contractAddress,
    multisig: false,
    proposalId: Number(proposalKey),
  }

  return (
    <div className="grid grid-cols-4 lg:grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/dao/${contractAddress}`, daoInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />

        <div className="px-6 mt-6 lg:hidden">
          <ProposalDetailsCard {...proposalDetailsProps} />
        </div>

        <ProposalDetails
          contractAddress={contractAddress}
          fromCosmosMsgProps={{
            govDecimals: govTokenInfo.decimals,
          }}
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

export default Proposal
