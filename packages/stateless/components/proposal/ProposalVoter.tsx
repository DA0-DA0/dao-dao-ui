import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ProposalVoterProps } from '@dao-dao/types'

import { Button } from '../buttons'
import { StatusCard } from '../StatusCard'
import { ProposalVoteButton } from './ProposalVoteButton'

export const ProposalVoter = <Vote extends unknown = unknown>({
  loading,
  currentVote,
  onCastVote,
  options,
  proposalOpen,
  className,
}: ProposalVoterProps<Vote>) => {
  const { t } = useTranslation()

  const [selectedVote, setSelectedVote] = useState<Vote | undefined>(
    currentVote
  )
  // If currentVote changes, reset selected vote to it.
  useEffect(() => {
    setSelectedVote(currentVote)
  }, [currentVote])

  const currentVoteOption = currentVote
    ? options.find((option) => option.value === currentVote)
    : undefined

  // If the wallet's current vote is the selected vote. This means revoting is
  // allowed, and the current vote selected is the same vote as before.
  const currentVoteSelected =
    !!currentVoteOption && selectedVote === currentVoteOption.value

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      {/* If proposal no longer open but voting is allowed, explain why. */}
      {!proposalOpen && (
        <StatusCard
          content={t('info.voteUntilExpirationExplanation')}
          size="xs"
          style="info"
        />
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
          currentVoteSelected
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

export const ProposalVoterLoading = (
  props: Omit<ProposalVoterProps<any>, 'loading' | 'currentVote' | 'onCastVote'>
) => <ProposalVoter loading onCastVote={() => {}} {...props} />
