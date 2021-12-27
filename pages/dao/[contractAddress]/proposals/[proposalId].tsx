import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import LineAlert from 'components/LineAlert'
import ProposalDetails from 'components/ProposalDetails'
import Link from 'next/link'
import {
  useRecoilValue,
  useRecoilTransaction_UNSTABLE,
  useRecoilValueLoadable,
} from 'recoil'
import {
  ProposalSelectorParams,
  proposalSelector,
  votesSelector,
  tallySelector,
  voteSelector,
  voteTransactionFn,
} from 'selectors/proposals'
import { cosmWasmSigningClient, walletAddressSelector } from 'selectors/cosm'

const Proposal: NextPage = () => {
  let router = useRouter()
  const proposalParams: ProposalSelectorParams =
    router.query as unknown as ProposalSelectorParams
  const proposal = useRecoilValue(proposalSelector(proposalParams))
  const contractAddress = router.query.contractAddress
  const walletAddress = useRecoilValue(walletAddressSelector)

  const votes = useRecoilValue(votesSelector(proposalParams))
  const tally = useRecoilValue(tallySelector(proposalParams))
  const setVote = useRecoilTransaction_UNSTABLE((transactionInterface) =>
    voteTransactionFn(transactionInterface, setTransactionHash, {
      ...proposalParams,
      walletAddress,
    })
  )
  //    voteSelector({...proposalParams, walletAddress}))
  const signingClient = useRecoilValueLoadable(cosmWasmSigningClient)
  const [transactionHash, setTransactionHash] = useState('')

  const vote =
    signingClient?.state === 'hasValue'
      ? async (voteValue: 'yes' | 'no') => {
          setVote(signingClient.contents, voteValue)
        }
      : () => {}

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

  return (
    <div className="flex flex-col w-full">
      <div className="grid bg-base-100 place-items-center">
        {!proposal ? (
          <div className="text-center m-8">No proposal with that ID found.</div>
        ) : (
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
              <LineAlert className="mt-2" variant="error" msg={error} />
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
        )}
      </div>
    </div>
  )
}

export default Proposal
