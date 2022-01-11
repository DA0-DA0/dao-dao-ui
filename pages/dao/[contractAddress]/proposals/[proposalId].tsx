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
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { useRecoilValue } from 'recoil'
import { daoSelector } from 'selectors/daos'
import { Breadcrumbs } from 'components/Breadcrumbs'

const Proposal: NextPage = () => {
  let router = useRouter()
  let contractAddress = router.query.contractAddress as string
  const daoInfo = useRecoilValue(daoSelector(contractAddress))

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
    <WalletLoader loading={loading}>
      <div className="grid grid-cols-6">
        <div className="w-full col-span-4 p-6">
          <Breadcrumbs crumbs={[["/dao/list", "DAOs"], [`/dao/${contractAddress}`, daoInfo.config.name], [router.asPath, `Proposal #${proposalId}`]]} />

          {!proposal ? (
            <div className="text-center m-8">
              No proposal with that ID found.
            </div>
          ) : (
            <div>
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
    </WalletLoader >
  )
}

export default Proposal
