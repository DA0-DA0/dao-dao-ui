import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilValue } from 'recoil'

import { LoadingScreen } from '@/components/LoadingScreen'
import { daoSelector } from '@/selectors/daos'
import { cw20TokenInfo } from '@/selectors/treasury'
import { DAO_ADDRESS } from '@/util/constants'

const Proposal: NextPage = () => {
  const router = useRouter()

  const proposalKey = Number(router.query.proposalId as string)

  const daoInfo = useRecoilValue(daoSelector(DAO_ADDRESS))
  const govTokenInfo = useRecoilValue(cw20TokenInfo(daoInfo.gov_token))

  if (!router.isReady) return <LoadingScreen />

  const proposalDetailsProps = {
    proposalId: proposalKey,
  }

  return (
    <div className="grid grid-cols-4 lg:grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        {/* <Breadcrumbs
          crumbs={[
            ['/', 'Home'],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        /> */}

        <div className="px-6 mt-6 lg:hidden">
          {/* <ProposalDetailsCard {...proposalDetailsProps} /> */}
        </div>

        {/* <ProposalDetails
          contractAddress={contractAddress}
          fromCosmosMsgProps={{
            govDecimals: govTokenInfo.decimals,
          }}
          proposalId={proposalKey}
        /> */}

        <div className="px-6 pb-6 mt-6 lg:hidden">
          <h3 className="mb-6 text-base font-medium">Referendum status</h3>

          {/* <ProposalDetailsVoteStatus {...proposalDetailsProps} /> */}
        </div>
      </div>
      <div className="hidden col-span-2 p-6 min-h-screen lg:block bg-base-200">
        {/* <ProposalDetailsSidebar {...proposalDetailsProps} /> */}
      </div>
    </div>
  )
}

export default Proposal
