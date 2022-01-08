import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import LineAlert from 'components/LineAlert'
import ProposalDetails from 'components/ProposalDetails'
import Link from 'next/link'
import { cleanChainError } from 'util/cleanChainError'
import {
  useRecoilValue,
  useRecoilTransaction_UNSTABLE,
  useRecoilValueLoadable,
  useRecoilState,
  useRecoilRefresher_UNSTABLE,
} from 'recoil'
import {
  ProposalSelectorParams,
  proposalSelector,
  votesSelector,
  tallySelector,
  vote as voteFn,
} from 'selectors/proposals'
import { cosmWasmSigningClient, walletAddressSelector } from 'selectors/cosm'
import { proposalsRequestIdAtom } from 'atoms/proposals'

const Proposal: NextPage = () => {
  let router = useRouter()
  const proposalParams: ProposalSelectorParams =
    router.query as unknown as ProposalSelectorParams
  const contractAddress = router.query.contractAddress
  const proposalValue = proposalSelector(proposalParams)
  const proposal = useRecoilValue(proposalValue)
  const proposalRefresh = useRecoilRefresher_UNSTABLE(proposalValue)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const votes = useRecoilValue(votesSelector(proposalParams))
  const tally = useRecoilValue(tallySelector(proposalParams))
  const signingClient = useRecoilValueLoadable(cosmWasmSigningClient)
  const [transactionHash, setTransactionHash] = useState('')
  const [proposalsRequestId, setProposalsRequestId] = useRecoilState(
    proposalsRequestIdAtom
  )

  let vote = undefined
  if (signingClient?.state === 'hasValue') {
    const setVote = voteFn(signingClient.contents, {
      ...proposalParams,
      walletAddress,
    })
    vote = async (vote: 'yes' | 'no') => {
      const results = await setVote(vote)
      setTransactionHash(results.transactionHash)
      setProposalsRequestId(proposalsRequestId + 1)
      proposalRefresh()
    }
  }

  const error = undefined
  const execute = () => {}
  // const {
  //   walletAddress,
  //   loading,
  //   error,
  //   proposal,
  //   votes,
  //   transactionHash,
  //   vote,
  //   execute,
  //   close,
  //   tally,
  // } = useProposal(contractAddress as string, proposalId)

  if (!proposal) {
    return (
      <div className="grid bg-base-100 place-items-center">
        <div className="text-center m-8">No proposal with that ID found.</div>
      </div>
    )
  }
  return (
    <div className="flex flex-col w-full">
      <div className="grid bg-base-100 place-items-center">
        <div className="mx-auto max-w-prose w-screen text-left">
          <div className="justify-left flex">
            <Link href={`/dao/${contractAddress}/proposals`}>
              <a className="link">{'< Back'}</a>
            </Link>
          </div>

          <ProposalDetails
            proposal={proposal}
            walletAddress={walletAddress}
            votes={votes}
            vote={vote}
            execute={execute}
            close={close}
            tally={tally}
            multisig={false}
          />

          {error && (
            <LineAlert
              className="mt-2"
              variant="error"
              msg={cleanChainError(error)}
            />
          )}

          {transactionHash.length > 0 && (
            <div className="mt-8">
              <LineAlert
                variant="success"
                msg={`Success! Transaction Hash: ${transactionHash}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="flex flex-col w-full">
  //     <div className="grid bg-base-100 place-items-center">
  //       {!proposal ? (
  //         <div className="text-center m-8">No proposal with that ID found.</div>
  //       ) : (
  //         <div className="mx-auto max-w-prose w-screen text-left">
  //           <div className="justify-left flex">
  //             <Link href={`/dao/${contractAddress}/proposals`}>
  //               <a className="link">{'< Back'}</a>
  //             </Link>
  //           </div>

  //           <ProposalDetails
  //             proposal={proposal}
  //             walletAddress={walletAddress}
  //             votes={votes}
  //             vote={vote}
  //             execute={execute}
  //             close={close}
  //             tally={tally}
  //             multisig={false}
  //           />

  //           {error && (
  //             <LineAlert className="mt-2" variant="error" msg={cleanChainError(error)} />
  //           )}

  //           {transactionHash.length > 0 && (
  //             <div className="mt-8">
  //               <LineAlert
  //                 variant="success"
  //                 msg={`Success! Transaction Hash: ${transactionHash}`}
  //               />
  //             </div>
  //         )}
  //       </div>
  //       </div>
  //   </div>
  // )
}

export default Proposal
