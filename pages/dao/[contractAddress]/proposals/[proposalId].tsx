import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import LineAlert from 'components/LineAlert'
import { useProposal } from 'hooks/proposals'
import ProposalDetails from 'components/ProposalDetails'
import Link from 'next/link'

const Proposal: NextPage = () => {
  let router = useRouter()
  let { contractAddress } = router.query

  const proposalId = router.query.proposalId as string

  const {
    walletAddress,
    loading,
    error,
    proposal,
    votes,
    transactionHash,
    vote,
    execute,
    close,
    tally,
  } = useProposal(contractAddress as string, proposalId)

  return (
    <WalletLoader loading={loading}>
      <div className="flex flex-col w-full">
        <div className="grid bg-base-100 place-items-center">
          {!proposal ? (
            <div className="text-center m-8">
              No proposal with that ID found.
            </div>
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
    </WalletLoader>
  )
}

export default Proposal
