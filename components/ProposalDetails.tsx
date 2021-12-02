import Markdown from 'rich-markdown-editor'
import VoteButtons from 'components/VoteButtons'
import { useThemeContext } from 'contexts/theme'
import { VoteInfo, ProposalResponse } from '@dao_dao/types/contracts/cw3-dao'

function ProposalDetails({
  proposal,
  walletAddress,
  votes,
  vote,
  execute,
  close,
}: {
  proposal: ProposalResponse
  walletAddress: string
  votes: VoteInfo[]
  vote: (arg0: string) => Promise<void>
  execute: () => void
  close: () => void
}) {
  const themeContext = useThemeContext()

  const proposalMessageContent = proposal?.msgs?.length ? (
    <code className="mb-12 break-all whitespace-pre">
      {JSON.stringify(proposal.msgs, undefined, 2)}
    </code>
  ) : null

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">{proposal.title}</h1>
      <Markdown
        className="mb-8"
        readOnly={true}
        dark={themeContext.theme === 'junoDark'}
        value={proposal.description}
      />

      {proposalMessageContent}

      <VoteButtons
        onVoteYes={vote.bind(null, 'yes')}
        onVoteNo={vote.bind(null, 'no')}
        votes={votes}
        walletAddress={walletAddress}
        status={proposal.status}
      />
      {proposal.status !== 'open' && (
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
    </>
  )
}

export default ProposalDetails
