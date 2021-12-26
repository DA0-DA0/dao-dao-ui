import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import ProposalList from 'components/ProposalList'
import { useRecoilState, useRecoilValue } from 'recoil'
import { daoSelector, isMemberSelector } from 'selectors/daos'
import { useProposals } from 'hooks/proposals'
import { onChainProposalsSelector } from 'selectors/proposals'
import { useState } from 'react'
import { proposalsRequestIdAtom, proposalsRequestStartBeforeAtom } from 'atoms/proposals'

const DaoProposals: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string
  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const [startBefore, setStartBefore] = useRecoilState(proposalsRequestStartBeforeAtom)
  const hideLoadMore = false
  const proposals = useRecoilValue(onChainProposalsSelector({contractAddress, startBefore}))
  const [proposalRequestId, setProposalRequestId] = useRecoilState(proposalsRequestIdAtom)
  // const { proposals, hideLoadMore, loading, setStartBefore } =
  //   useProposals(contractAddress)

  const member = useRecoilValue(isMemberSelector(contractAddress))

  return (
    <div>
      <div className="flex flex-col w-96 lg:w-6/12 max-w-full px-2 py-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-lg font-bold sm:text-3xl">Proposals</h1>
          {member ? (
            <button
              className="btn btn-primary btn-sm text-lg"
              onClick={() =>
                router.push(`/dao/${contractAddress}/proposals/create`)
              }
            >
              + Create
            </button>
          ) : null}
        </div>
      </div>
      <ProposalList
        proposals={proposals}
        contractAddress={contractAddress}
        hideLoadMore={hideLoadMore}
        onLoadMore={() => {
          const proposal = proposals && proposals[proposals.length - 1]
          if (proposal) {
            setStartBefore(proposal.id)
            setProposalRequestId(proposalRequestId + 1)
          }
        }}
      />
      <div></div>
    </div>
  )
}

export default DaoProposals
