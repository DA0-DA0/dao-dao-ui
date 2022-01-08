import VoteButtons from 'components/VoteButtons'
import { useThemeContext } from 'contexts/theme'
import {
  VoteInfo,
  ProposalResponse,
  ProposalTallyResponse,
} from '@dao-dao/types/contracts/cw3-dao'
import ProposalVotes from 'components/ProposalVotes'
import ProposalTally from 'components/ProposalTally'
import ProposalStatus from './ProposalStatus'

function ProposalDetails({
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
      <div className="mt-2 mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold inline align-middle">
          {proposal.title}
        </h1>
        <ProposalStatus status={proposal.status} />
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

export default ProposalDetails
