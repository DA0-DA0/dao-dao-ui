import { ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import {
  proposalListAtom,
  proposalsCreatedAtom,
  proposalsRequestIdAtom,
  proposalsRequestStartBeforeAtom,
} from 'atoms/proposals'
import ProposalList from 'components/ProposalList'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isMemberSelector } from 'selectors/daos'
import { onChainProposalsSelector } from 'selectors/proposals'

const PROP_LOAD_LIMIT = 10

const getOldestLoadedProposal = (props: ProposalResponse[]) => {
  if (!props.length) {
    return Infinity
  }
  return props[props.length - 1].id
}

const getNewestLoadedProposal = (props: ProposalResponse[]) => {
  if (!props.length) {
    return 0
  }
  return props[0].id
}

const DaoProposals: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string
  const [startBefore, setStartBefore] = useRecoilState(
    proposalsRequestStartBeforeAtom
  )

  // const [proposalList, setProposalList] = useRecoilState(proposalListAtom)

  // Update the proposal list with any proposals that were created
  // since we were last here.
  // const [propsCreated, setPropsCreated] = useRecoilState(proposalsCreatedAtom)
  // const newProposals = useRecoilValue(
  //   onChainProposalsSelector({
  //     contractAddress,
  //     startBefore: getNewestLoadedProposal(proposalList) + propsCreated + 1,
  //     limit: propsCreated,
  //   })
  // )

  // Update the proposal list with any proposals that have been
  // requested by a load more press or first load of this page.
  const proposalList = useRecoilValue(
    onChainProposalsSelector({
      contractAddress,
      startBefore,
      limit: PROP_LOAD_LIMIT,
    })
  )

  // setProposalList((p) => {
  //   // Need to check this condition here instead of outside as
  //   // `setPropsCreated` will race against the next reflow of this
  //   // page which may cause a duplicate to be appended.
  //   if (getOldestLoadedProposal(newProposals) > getNewestLoadedProposal(p)) {
  //     return newProposals.concat(p)
  //   }
  //   return p
  // })
  // setPropsCreated(0)

  // We query proposals in reverse showing the most recent (highest
  // ID) ones first. If a new query starts with a proposal with an ID
  // that is smaller than the smallest one that we have seen we can
  // safely add the new proposals to our list without worrying about
  // duplicates.
  // if (existingProposals.length) {
  //   setProposalList((p) => {
  //     // Can't check this condition in the enclosing if statement
  //     // becasue setState operations don't happen
  //     // syncronously. Doing in above if can result in a race
  //     // condition where a reflow occurs before setting completes.
  //     if (existingProposals[0].id < getOldestLoadedProposal(p)) {
  //       return p.concat(existingProposals)
  //     }
  //     return p
  //   })
  // }

  // If we are displaying fewer proposals than the limit for proposals
  // in one query this implies that the DAO has fewer proposals than
  // the limit and we don't need to prompt to load more.
  const hideLoadMore = proposalList.length < PROP_LOAD_LIMIT

  const [_pri, setProposalRequestId] = useRecoilState(proposalsRequestIdAtom)

  const member = useRecoilValue(isMemberSelector(contractAddress))

  return (
    <>
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
        proposals={proposalList}
        contractAddress={contractAddress}
        hideLoadMore={hideLoadMore}
        onLoadMore={() => {
          const proposal = proposalList && proposalList[proposalList.length - 1]
          if (proposal) {
            setStartBefore(proposal.id)
            setProposalRequestId((i) => i + 1)
          }
        }}
        member={member}
      />
    </>
  )
}

export default DaoProposals
