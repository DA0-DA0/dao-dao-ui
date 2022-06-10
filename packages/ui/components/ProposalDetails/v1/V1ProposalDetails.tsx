import { EyeOffIcon, EyeIcon } from '@heroicons/react/outline'
import { FC, ReactNode, useMemo, useState } from 'react'

import {
  Proposal,
  Status,
  Vote as VoteChoice,
} from '@dao-dao/state/clients/cw-proposal-single'
import { TemplatesRenderer } from '@dao-dao/templates/components'
import {
  decodedMessagesString,
  decodeMessages,
  VotingModuleType,
} from '@dao-dao/utils'

import { Button } from '../../Button'
import { CosmosMessageDisplay } from '../../CosmosMessageDisplay'
import { Execute } from '../../Execute'
import { MarkdownPreview } from '../../MarkdownPreview'
import { Vote } from '../../Vote'
import { VoteDisplay } from './VoteDisplay'

interface V1ProposalDetailsProps {
  coreAddress: string
  votingModuleType: VotingModuleType
  proposal: Proposal
  proposalId: number
  walletVote: VoteChoice | undefined
  walletWeightPercent: number
  loading: boolean
  showStaking: boolean
  setShowStaking: (value: boolean) => void
  stakingModal?: ReactNode
  onExecute: () => void
  onVote: (choice: VoteChoice) => void
  connected: boolean
  connectWalletButton?: ReactNode
}

export const V1ProposalDetails: FC<V1ProposalDetailsProps> = ({
  coreAddress,
  votingModuleType,
  proposal,
  proposalId,
  walletVote,
  walletWeightPercent,
  loading,
  stakingModal,
  showStaking,
  setShowStaking,
  onExecute,
  onVote,
  connected,
  connectWalletButton,
}) => {
  const decodedMessages = useMemo(
    () => decodeMessages(proposal.msgs),
    [proposal.msgs]
  )
  const [showRaw, setShowRaw] = useState(false)

  return (
    <div>
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
            <TemplatesRenderer
              coreAddress={coreAddress}
              messages={decodedMessages}
              proposalId={proposalId}
              votingModuleType={votingModuleType}
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
      {proposal.status === Status.Passed && (
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

      {connected ? (
        <>
          {proposal.status === Status.Open &&
            !walletVote &&
            walletWeightPercent !== 0 && (
              <Vote
                loading={loading}
                onVote={onVote}
                voterWeight={walletWeightPercent}
              />
            )}
          {walletVote && (
            <p className="flex flex-row gap-2 items-center body-text">
              You voted <VoteDisplay vote={walletVote} /> on this proposal.
            </p>
          )}
          {proposal.status !== Status.Open && !walletVote && (
            <p className="body-text">You did not vote on this proposal.</p>
          )}
          {walletWeightPercent === 0 && (
            <p className="max-w-prose body-text">
              You must have voting power at the time of proposal creation to
              vote.{' '}
              {stakingModal && (
                <button
                  className="underline"
                  onClick={() => setShowStaking(true)}
                >
                  Stake some tokens so you can vote next time?
                </button>
              )}
              {showStaking && stakingModal}
            </p>
          )}
        </>
      ) : (
        connectWalletButton
      )}
    </div>
  )
}
