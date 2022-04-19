import { FC, ReactNode, useState } from 'react'

import { ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import { decodedMessagesString, decodeMessages } from '@dao-dao/utils'
import { EyeOffIcon, EyeIcon } from '@heroicons/react/outline'

import { Button } from '../Button'
import { CosmosMessageDisplay } from '../CosmosMessageDisplay'
import { Execute } from '../Execute'
import { MarkdownPreview } from '../MarkdownPreview'
import { Vote, VoteChoice } from '../Vote'
import { ProposalMessageTemplateList } from './ProposalMessageTemplateList'

export interface ProposalDetailsProps {
  proposal: ProposalResponse
  walletVote: string | undefined
  walletWeightPercent: number
  loading: boolean
  showStaking: boolean
  setShowStaking: (value: boolean) => void
  stakingModal?: ReactNode
  // Transformer to convert a decoded message into a displayable ReactNode. The
  // caller will likely use this to transform these messages into template
  // components. Once we have a state package we will want to move
  // templates into their own package and then this can likely be removed.
  messageToDisplay: (message: { [key: string]: any }) => ReactNode
  onExecute: () => void
  onVote: (choice: VoteChoice) => void
}

export const ProposalDetails: FC<ProposalDetailsProps> = ({
  proposal,
  walletVote,
  walletWeightPercent,
  loading,
  stakingModal,
  showStaking,
  setShowStaking,
  messageToDisplay,
  onExecute,
  onVote,
}) => {
  const decodedMessages = decodeMessages(proposal.msgs)
  const [showRaw, setShowRaw] = useState(false)

  return (
    <div className="p-6">
      <div className="max-w-prose">
        <h1 className="header-text">{proposal.title}</h1>
      </div>
      <div className="mt-6">
        <MarkdownPreview markdown={proposal.description} />
      </div>
      <div className="mt-9 mb-3 font-mono caption-text">Messages</div>
      <div className="max-w-3xl">
        {decodedMessages?.length ? (
          showRaw ? (
            <CosmosMessageDisplay
              value={decodedMessagesString(proposal.msgs)}
            />
          ) : (
            <ProposalMessageTemplateList
              messageToDisplay={messageToDisplay}
              msgs={proposal.msgs}
            />
          )
        ) : (
          <pre>[]</pre>
        )}
      </div>
      {!!decodedMessages.length && (
        <div className="mt-4">
          <Button
            onClick={() => setShowRaw((s) => !s)}
            size="sm"
            variant="secondary"
          >
            {showRaw ? (
              <>
                Hide raw data
                <EyeOffIcon className="inline ml-1 h-4 stroke-current" />
              </>
            ) : (
              <>
                Show raw data
                <EyeIcon className="inline ml-1 h-4 stroke-current" />
              </>
            )}
          </Button>
        </div>
      )}
      {proposal.status === 'passed' && (
        <>
          <p className="mt-[30px] mb-[12px] font-mono caption-text">Status</p>
          <Execute
            loading={loading}
            messages={proposal.msgs.length}
            onExecute={onExecute}
          />
        </>
      )}
      <p className="mt-[30px] mb-[12px] font-mono caption-text">Vote</p>
      {proposal.status === 'open' &&
        !walletVote &&
        walletWeightPercent !== 0 && (
          <Vote
            loading={loading}
            onVote={onVote}
            voterWeight={walletWeightPercent}
          />
        )}
      {walletVote && (
        <p className="body-text">You voted {walletVote} on this proposal.</p>
      )}
      {proposal.status !== 'open' && !walletVote && (
        <p className="body-text">You did not vote on this proposal.</p>
      )}
      {walletWeightPercent === 0 && (
        <p className="max-w-prose body-text">
          You must have voting power at the time of proposal creation to vote.{' '}
          {stakingModal && (
            <button className="underline" onClick={() => setShowStaking(true)}>
              Stake some tokens?
            </button>
          )}
          {stakingModal && showStaking && stakingModal}
        </p>
      )}
    </div>
  )
}
