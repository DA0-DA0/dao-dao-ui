import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ProposalVoterProps } from '@dao-dao/types'

import { Button } from '../buttons'
import { InfoCard } from '../InfoCard'
import { WarningCard } from '../WarningCard'
import { ProposalVoteButton } from './ProposalVoteButton'

export const ProposalVoter = <Vote extends unknown = unknown>({
  loading,
  currentVote,
  onCastVote,
  options,
  proposalOpen,
  // If undefined, assume the user has seen all action pages.
  seenAllActionPages = true,
  className,
}: ProposalVoterProps<Vote>) => {
  const { t } = useTranslation()

  const [selectedVote, setSelectedVote] = useState<Vote | undefined>(
    currentVote
  )

  const currentVoteOption = currentVote
    ? options.find((option) => option.value === currentVote)
    : undefined

  // If the wallet's current vote is the selected vote. This means revoting is
  // allowed, and the current vote selected is the same vote as before.
  const currentVoteSelected =
    !!currentVoteOption && selectedVote === currentVoteOption.value

  // Give actions a few seconds to render before showing unseen action pages
  // warning. Actions take a moment to load state, match, and group accordingly,
  // so the pages are not immediately available.
  const [showUnseenActionPagesWarning, setShowUnseenActionPagesWarning] =
    useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowUnseenActionPagesWarning(true)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      {/* If has not seen all action pages, and has not yet cast a vote, show warning. */}
      {showUnseenActionPagesWarning && !seenAllActionPages && !currentVote && (
        <WarningCard
          className="animate-fade-in"
          content={t('info.mustViewAllActionPagesBeforeVoting')}
        />
      )}

      {/* If proposal no longer open but voting is allowed, explain why. */}
      {!proposalOpen && (
        <InfoCard content={t('info.voteUntilExpirationExplanation')} />
      )}

      <div className="flex flex-col gap-1">
        {options.map((option, index) => (
          <ProposalVoteButton
            key={index}
            disabled={loading}
            onClick={() => setSelectedVote(option.value)}
            option={option}
            pressed={option.value === selectedVote}
          />
        ))}
      </div>

      <Button
        center
        disabled={
          // Disable when...
          //
          // ...no vote selected,
          !selectedVote ||
          // ...selected vote is already the current vote (possible when
          // revoting is allowed),
          currentVoteSelected ||
          // ...or the user has not seen all action pages and has not yet voted.
          (!seenAllActionPages && !currentVote)
        }
        loading={loading}
        onClick={() => selectedVote && onCastVote(selectedVote)}
        size="lg"
        variant={
          // If already voted, show dimmer secondary variant. If needs to vote,
          // show primary to draw attention to it.
          currentVote ? 'secondary' : 'primary'
        }
      >
        {currentVote ? t('button.changeYourVote') : t('button.castYourVote')}
      </Button>
    </div>
  )
}
