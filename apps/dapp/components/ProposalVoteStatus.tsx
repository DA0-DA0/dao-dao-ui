import { Suspense } from 'react'

import { useRecoilValue } from 'recoil'

import { CheckIcon, XIcon } from '@heroicons/react/outline'

import { walletVotedSelector } from 'selectors/proposals'

import { LogoNoBorder } from './Logo'

const VoteStatusLoading = () => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-1">
      <div className="animate-spin-medium inline-block">
        <LogoNoBorder />
      </div>
      <p className="text-secondary text-sm">Loading vote status.</p>
    </div>
  )
}

const VoteStatusLoaded = ({
  contractAddress,
  proposalId,
}: {
  contractAddress: string
  proposalId: number
}) => {
  const voted = useRecoilValue(
    walletVotedSelector({
      contractAddress,
      proposalId,
    })
  )
  if (voted) {
    return (
      <div className="flex items-center flex-row flex-wrap gap-1">
        <CheckIcon className="text-success w-4" />
        <p className="text-secondary text-sm">You have voted.</p>
      </div>
    )
  }
  return (
    <div className="flex items-center flex-row flex-wrap gap-1">
      <XIcon className="w-4" />
      <p className="text-secondary text-sm">You have not voted.</p>
    </div>
  )
}

const ProposalVoteStatus = ({
  contractAddress,
  proposalId,
}: {
  contractAddress: string
  proposalId: number
}) => {
  return (
    <Suspense fallback={<VoteStatusLoading />}>
      <VoteStatusLoaded
        contractAddress={contractAddress}
        proposalId={proposalId}
      />
    </Suspense>
  )
}

export default ProposalVoteStatus
