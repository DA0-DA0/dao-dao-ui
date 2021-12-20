import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import LineAlert from 'components/LineAlert'
import { useProposal } from 'hooks/proposals'
import ProposalDetails from 'components/ProposalDetails'
import Link from 'next/link'

const Proposal: NextPage = () => {
  const router = useRouter()
  const proposalId = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string

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
  } = useProposal(contractAddress, proposalId)

  return (
    <WalletLoader loading={loading}>
      <div className="flex flex-col w-full">
        <div className="grid bg-base-100 place-items-center mt-8">
          {!proposal ? (
            <div className="text-center mb-8">
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
                multisig={true}
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
