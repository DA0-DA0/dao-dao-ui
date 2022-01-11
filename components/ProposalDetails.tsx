import VoteButtons from 'components/VoteButtons'
import { useThemeContext } from 'contexts/theme'
import {
  VoteInfo,
  ProposalResponse,
  ProposalTallyResponse,
  ThresholdResponse,
} from '@dao-dao/types/contracts/cw3-dao'
import ProposalVotes from 'components/ProposalVotes'
import ProposalTally from 'components/ProposalTally'
import ProposalStatus from './ProposalStatus'
import { useRecoilValue } from 'recoil'
import {
  proposalSelector,
  proposalTallySelector,
  proposalVotesSelector,
} from 'selectors/proposals'
import { ReactNode } from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/outline'
import { getEnd } from './ProposalList'
import { isMemberSelector } from 'selectors/daos'
import { convertMicroDenomToDenom } from 'util/conversion'
import toast from 'react-hot-toast'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { defaultExecuteFee } from 'util/fee'
import { useSigningClient } from 'contexts/cosmwasm'
import { cleanChainError } from 'util/cleanChainError'
import { walletAddress } from 'selectors/treasury'

function executeProposalVote(
  vote: 'yes' | 'no',
  id: number,
  contractAddress: string,
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string
) {
  if (!signingClient || !walletAddress) {
    toast.error('Please connect your wallet')
    return
  }
  signingClient
    .execute(
      walletAddress,
      contractAddress,
      {
        vote: { proposal_id: id, vote },
      },
      defaultExecuteFee
    )
    .catch((err) => {
      toast.error(cleanChainError(err.message))
    })
}

function executeProposalExecute(
  id: number,
  contractAddress: string,
  signingClient: SigningCosmWasmClient | null,
  walletAddress: string
) {
  if (!signingClient || !walletAddress) {
    toast.error('Please connect your wallet')
    return
  }
  signingClient
    .execute(
      walletAddress,
      contractAddress,
      {
        execute: { proposal_id: id },
      },
      defaultExecuteFee
    )
    .catch((err) => {
      toast.error(cleanChainError(err.message))
    })
}

function ProposalVoteButtons({
  yesCount,
  noCount,
  proposalId,
  contractAddress,
}: {
  yesCount: string
  noCount: string
  proposalId: number
  contractAddress: string
}) {
  const { signingClient, walletAddress } = useSigningClient()
  const ready = walletAddress && signingClient

  const VoteButton = ({
    position,
    children,
  }: {
    position: 'yes' | 'no'
    children: ReactNode
  }) => (
    <button
      className={
        'btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px-1' +
        (ready ? '' : ' btn-disabled bg-base-300')
      }
      onClick={() =>
        executeProposalVote(
          position,
          proposalId,
          contractAddress,
          signingClient,
          walletAddress
        )
      }
    >
      {children}
    </button>
  )
  return (
    <div
      className={!ready ? 'tooltip tooltip-right' : ''}
      data-tip="Connect your wallet to vote"
    >
      <div className="flex gap-3">
        <VoteButton position="yes">
          <ChevronUpIcon className="w-4 h-4 inline mr-2" />
          Approve
          <p className="text-secondary ml-2">{yesCount}</p>
        </VoteButton>
        <VoteButton position="no">
          <ChevronDownIcon className="w-4 h-4 inline mr-2" />
          Reject
          <p className="text-secondary ml-2">{noCount}</p>
        </VoteButton>
      </div>
    </div>
  )
}

function ProposalExecuteButton({
  proposalId,
  contractAddress,
}: {
  proposalId: number
  contractAddress: string
}) {
  const { signingClient, walletAddress } = useSigningClient()
  const ready = walletAddress && signingClient

  const VoteButton = ({ children }: { children: ReactNode }) => (
    <button
      className={
        'btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px-1' +
        (ready ? '' : ' btn-disabled bg-base-300')
      }
      onClick={() =>
        executeProposalExecute(
          proposalId,
          contractAddress,
          signingClient,
          walletAddress
        )
      }
    >
      {children}
    </button>
  )
  return (
    <div
      className={!ready ? 'tooltip tooltip-right' : ''}
      data-tip="Connect your wallet to vote"
    >
      <div className="flex gap-3">
        <VoteButton>
          <SparklesIcon className="w-4 h-4 inline mr-2" />
          Execute
        </VoteButton>
      </div>
    </div>
  )
}

const thresholdString = (t: ThresholdResponse, multisig: boolean) => {
  if ('absolute_count' in t) {
    const count = t.absolute_count.weight
    return `${multisig ? count : convertMicroDenomToDenom(count)} votes`
  } else if ('absolute_percentage' in t) {
    const threshold = t.absolute_percentage.percentage
    return `${threshold}%`
  } else if ('threshold_quorum' in t) {
    const quorum = t.threshold_quorum.quorum
    const threshold = t.threshold_quorum.threshold
    return `${quorum}% quorum; ${threshold}% threshold`
  } else {
    return 'unknown'
  }
}

export function ProposalDetailsSidebar({
  contractAddress,
  proposalId,
  multisig,
}: {
  contractAddress: string
  proposalId: number
  multisig?: boolean
}) {
  const proposal = useRecoilValue(
    proposalSelector({ contractAddress, proposalId })
  )
  const proposalTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )

  const localeOptions = { maximumSignificantDigits: 3 }

  const yesVotes = Number(
    multisig
      ? proposalTally.votes.yes
      : convertMicroDenomToDenom(proposalTally.votes.yes)
  )
  const noVotes = Number(
    multisig
      ? proposalTally.votes.no
      : convertMicroDenomToDenom(proposalTally.votes.no)
  )
  const totalWeight = Number(
    multisig
      ? proposalTally.total_weight
      : convertMicroDenomToDenom(proposalTally.total_weight)
  )

  const turnoutPercent = (
    ((yesVotes + noVotes) / totalWeight) *
    100
  ).toLocaleString(undefined, localeOptions)
  const yesPercent = ((yesVotes / totalWeight) * 100).toLocaleString(
    undefined,
    localeOptions
  )
  const noPercent = ((noVotes / totalWeight) * 100).toLocaleString(
    undefined,
    localeOptions
  )

  return (
    <div>
      <h2 className="font-medium text-sm font-mono mb-8 text-secondary">
        Proposal {proposal.id}
      </h2>
      <div className="grid grid-cols-3">
        <p className="text-secondary">Status</p>
        <div className="col-span-2">
          <ProposalStatus status={proposal.status} />
        </div>
        {!multisig && (
          // https://github.com/DA0-DA0/dao-contracts/issues/136
          <>
            <p className="text-secondary">Proposer</p>
            <p className="col-span-2 overflow-x-auto">{proposal.proposer}</p>
          </>
        )}
        {proposal.status === 'open' && (
          <>
            <p className="text-secondary">Expires</p>
            <p className="col-span-2">{getEnd(proposal.expires)}</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 mt-6">
        <p className="text-secondary">Yes votes</p>
        <div className="col-span-2">
          {yesVotes} <p className="text-secondary inline">({yesPercent}%)</p>
        </div>
        <p className="text-secondary">No votes</p>
        <div className="col-span-2">
          {noVotes} <p className="text-secondary inline">({noPercent}%)</p>
        </div>
        <p className="text-secondary">Turnout</p>
        <div className="col-span-2">{turnoutPercent}%</div>
      </div>

      <div className="grid grid-cols-3 mt-6">
        <p className="text-secondary">Threshold</p>
        <div className="col-span-2">
          {thresholdString(proposal.threshold, !!multisig)}
        </div>
      </div>
    </div>
  )
}

export function ProposalDetails({
  contractAddress,
  proposalId,
  multisig,
}: {
  contractAddress: string
  proposalId: number
  multisig?: boolean
}) {
  const proposal = useRecoilValue(
    proposalSelector({ contractAddress, proposalId })
  )
  const proposalVotes = useRecoilValue(
    proposalVotesSelector({ contractAddress, proposalId })
  )
  const proposalTally = useRecoilValue(
    proposalTallySelector({ contractAddress, proposalId })
  )

  const yesVotes = Number(
    multisig
      ? proposalTally.votes.yes
      : convertMicroDenomToDenom(proposalTally.votes.yes)
  )
  const noVotes = Number(
    multisig
      ? proposalTally.votes.no
      : convertMicroDenomToDenom(proposalTally.votes.no)
  )

  const member = useRecoilValue(isMemberSelector(contractAddress))
  const visitorAddress = useRecoilValue(walletAddress)
  const voted = proposalVotes.some((v) => v.voter === visitorAddress)

  return (
    <div className="p-6">
      <h1 className="text-4xl font-medium font-semibold">{proposal.title}</h1>
      {proposal.status === 'open' && member.member && !voted && (
        <div className="mt-3">
          <ProposalVoteButtons
            yesCount={yesVotes.toString()}
            noCount={noVotes.toString()}
            proposalId={proposalId}
            contractAddress={contractAddress}
          />
        </div>
      )}
      {proposal.status === 'passed' && member.member && (
        <div className="mt-3">
          <ProposalExecuteButton
            proposalId={proposalId}
            contractAddress={contractAddress}
          />
        </div>
      )}
      <p className="text-medium mt-6">{proposal.description}</p>
      <pre className="overflow-auto mt-6 border rounded-lg p-3 text-secondary border-secondary">
        {JSON.stringify(proposal.msgs, undefined, 2)}
      </pre>

      <div className="mt-6">
        <ProposalVotes votes={proposalVotes} />
      </div>
    </div>
  )
}
