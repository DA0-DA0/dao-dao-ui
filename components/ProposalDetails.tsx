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
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { getEnd } from './ProposalList'
import { isMemberSelector } from 'selectors/daos'
import { convertMicroDenomToDenom } from 'util/conversion'

function ProposalVoteButtons({
  yesCount,
  noCount,
}: {
  yesCount: string
  noCount: string
}) {
  const VoteButton = ({ children }: { children: ReactNode }) => (
    <button className="btn btn-sm btn-outline normal-case border-base-300 shadow w-36 font-normal rounded-md px-1">
      {children}
    </button>
  )
  return (
    <div className="flex gap-3">
      <VoteButton>
        <ChevronUpIcon className="w-4 h-4 inline mr-2" />
        Approve
        <p className="text-secondary ml-2">{yesCount}</p>
      </VoteButton>
      <VoteButton>
        <ChevronDownIcon className="w-4 h-4 inline mr-2" />
        Reject
        <p className="text-secondary ml-2">{noCount}</p>
      </VoteButton>
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

  return (
    <div className="p-6">
      <h1 className="text-4xl font-medium font-semibold">{proposal.title}</h1>
      {proposal.status === 'open' && member.member && (
        <div className="mt-3">
          <ProposalVoteButtons
            yesCount={yesVotes.toString()}
            noCount={noVotes.toString()}
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

function OldProposalDetails({
  proposal,
  walletAddress,
  votes,
  vote,
  execute,
  close,
  tally,
  multisig, // Needed to determine if denom or microdenom should be shown.
}: {
  proposal: ProposalResponse
  walletAddress: string
  votes: VoteInfo[]
  vote?: (arg0: 'yes' | 'no') => Promise<void>
  execute: () => void
  close: () => void
  tally: ProposalTallyResponse | undefined
  multisig: boolean
}) {
  const themeContext = useThemeContext()

  const proposalMessageContent = proposal?.msgs?.length ? (
    <code className="mb-12 break-all whitespace-pre">
      {JSON.stringify(proposal.msgs, undefined, 2)}
    </code>
  ) : null

  return (
    <>
      <div className="mb-6 flex items-center">
        <div className="text-2xl mr-2 mb-1">
          <ProposalStatus status={proposal.status} />
        </div>
        <h1 className="text-2xl font-medium inline align-middle">
          {proposal.title}
        </h1>
      </div>

      {/* TODO(gavin.doughtie): re-implement markdown */}
      <pre>{proposal.description}</pre>
      {/* <Markdown
        className="mb-8"
        readOnly={true}
        dark={themeContext.theme === 'junoDark'}
        value={proposal.description}
      /> */}

      {proposalMessageContent}

      <VoteButtons
        onVoteYes={vote?.bind(null, 'yes')}
        onVoteNo={vote?.bind(null, 'no')}
        votes={votes}
        walletAddress={walletAddress}
        status={proposal.status}
      />
      {proposal.status !== 'open' && proposal.msgs.length > 0 && (
        <div className="flex justify-between items-center content-center my-8">
          {proposal.status === 'passed' && proposal?.msgs?.length > 0 && (
            <button
              className="box-border px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
              onClick={execute}
            >
              Execute
            </button>
          )}
          {proposal.status === 'rejected' && (
            <button
              className="box-border px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              onClick={close}
            >
              Close
            </button>
          )}
        </div>
      )}
      {tally ? <ProposalTally tally={tally} multisig={multisig} /> : null}
      <ProposalVotes votes={votes} walletAddress={walletAddress} />
    </>
  )
}
