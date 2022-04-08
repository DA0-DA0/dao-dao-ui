import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilValue } from 'recoil'

import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  ProposalDetails,
  ProposalDetailsSidebar,
} from 'components/ProposalDetails'
import { daoSelector } from 'selectors/daos'
import { cw20TokenInfo } from 'selectors/treasury'

const Proposal: NextPage = () => {
  const router = useRouter()
  const proposalKey = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string
  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const govTokenInfo = useRecoilValue(cw20TokenInfo(daoInfo.gov_token))

  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/dao/${contractAddress}`, daoInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />
        <ProposalDetails
          contractAddress={contractAddress}
          proposalId={Number(proposalKey)}
          fromCosmosMsgProps={{
            govDecimals: govTokenInfo.decimals,
          }}
        />
      </div>
      <div className="col-span-2 p-6 bg-base-200 min-h-screen">
        <ProposalDetailsSidebar
          contractAddress={contractAddress}
          proposalId={Number(proposalKey)}
        />
      </div>
    </div>
  )
}

export default Proposal
