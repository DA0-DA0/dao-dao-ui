import { proposalsRequestIdAtom } from 'atoms/proposals'
import LineAlert from 'components/LineAlert'
import ProposalDetails from 'components/ProposalDetails'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from 'recoil'
import { cosmWasmSigningClient, walletAddressSelector } from 'selectors/cosm'
import {
  proposalSelector,
  ProposalSelectorParams,
  tallySelector,
  vote as voteFn,
  votesSelector,
} from 'selectors/proposals'
import { cleanChainError } from 'util/cleanChainError'
import { defaultExecuteFee } from 'util/fee'

const Proposal: NextPage = () => {
  let router = useRouter()
  const proposalParams: ProposalSelectorParams =
    router.query as unknown as ProposalSelectorParams
  const contractAddress = router.query.contractAddress as string
  const proposalValue = proposalSelector(proposalParams)
  const proposal = useRecoilValue(proposalValue)
  const proposalRefresh = useRecoilRefresher_UNSTABLE(proposalValue)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const votes = useRecoilValue(votesSelector(proposalParams))
  const tally = useRecoilValue(tallySelector(proposalParams))
  const signingClient = useRecoilValueLoadable(cosmWasmSigningClient)
  const [transactionHash, setTransactionHash] = useState('')
  const [error, setError] = useState(undefined)
  const [proposalsRequestId, setProposalsRequestId] = useRecoilState(
    proposalsRequestIdAtom
  )

  let execute = () => {}
  let vote = undefined
  if (signingClient?.state === 'hasValue') {
    const setVote = voteFn(signingClient.contents, {
      ...proposalParams,
      walletAddress,
    })
    vote = async (vote: 'yes' | 'no') => {
      const results = await setVote(vote)
      setProposalsRequestId(proposalsRequestId + 1)
      proposalRefresh()
      setTransactionHash(results.transactionHash)
    }

    if (contractAddress) {
      execute = async () => {
        try {
          const results = await signingClient.contents.execute(
            walletAddress,
            contractAddress,
            {
              execute: { proposal_id: proposal.id },
            },
            defaultExecuteFee
          )
          setTransactionHash(results.transactionHash)
          setProposalsRequestId(proposalsRequestId + 1)
          proposalRefresh()
        } catch (err: any) {
          setError(err.message)
        }
      }
    }
  }

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
}

export default Proposal
