import { Refresh } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import { LoadingData, StatefulProfileDisplayProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { useTranslatedTimeDeltaFormatter } from '../../hooks'
import { IconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { Tooltip } from '../tooltip/Tooltip'

export interface ProposalVote<Vote extends unknown = any> {
  voterAddress: string
  vote: Vote
  votingPowerPercent: number
}

export interface ProposalVotesProps<Vote extends unknown = any> {
  votes: LoadingData<ProposalVote<Vote>[]>
  getDateVoted?: (voterAddress: string) => Date | undefined
  ProfileDisplay: ComponentType<StatefulProfileDisplayProps>
  VoteDisplay: ComponentType<{ vote: Vote }>
  onRefresh: () => void
  refreshing: boolean
}

export const ProposalVotes = <Vote extends unknown = any>({
  votes,
  getDateVoted,
  ProfileDisplay,
  VoteDisplay,
  onRefresh,
  refreshing,
}: ProposalVotesProps<Vote>) => {
  const { t } = useTranslation()

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: true })

  const votesWithDate = votes.loading
    ? []
    : votes.data
        .map((vote) => ({
          ...vote,
          when: getDateVoted?.(vote.voterAddress),
        }))
        .sort(
          (a, b) =>
            // Sort descending by date, and those without a date last.
            (b.when?.getTime() ?? -Infinity) - (a.when?.getTime() ?? -Infinity)
        )

  const [refreshSpinning, setRefreshSpinning] = useState(false)
  // Start spinning refresh icon if refreshing sets to true. Turn off once the
  // iteration completes (in `onAnimationIteration` below).
  useEffect(() => {
    refreshing && setRefreshSpinning(true)
  }, [refreshing])

  // Refresh votes every 30 seconds.
  useEffect(() => {
    const interval = setInterval(onRefresh, 30 * 1000)
    return () => clearInterval(interval)
  }, [onRefresh])

  // If a new vote is added and the window is scrolled to the bottom, scroll to
  // the bottom again to show the new vote.
  const [prevVoteCount, setPrevVoteCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const newVoteCount = votes.loading ? 0 : votes.data.length
    if (
      votes.loading ||
      !containerRef.current ||
      prevVoteCount === newVoteCount
    ) {
      return
    }

    const getScrollParent = (node: HTMLElement): HTMLElement | null => {
      if (node.scrollHeight > node.clientHeight) {
        return node
      }
      return node.parentElement ? getScrollParent(node.parentElement) : null
    }

    const parent = getScrollParent(containerRef.current)
    if (!parent) {
      return
    }

    const wasScrolledToBottom =
      parent.scrollHeight - parent.scrollTop === parent.clientHeight
    if (wasScrolledToBottom && newVoteCount > prevVoteCount) {
      parent.scrollTop = parent.scrollHeight
    }

    setPrevVoteCount(newVoteCount)
  }, [prevVoteCount, votes])

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <div className="mb-4 flex flex-row items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="primary-text">{t('title.votesCast')}</p>

          <p className="caption-text italic">
            {t('info.refreshesEveryNumSeconds', { seconds: 30 })}
          </p>
        </div>

        {/* Refresh button that shows up after votes load. */}
        <IconButton
          Icon={Refresh}
          circular
          className={clsx(
            'transition-opacity',
            votes.loading ? 'pointer-events-none opacity-0' : 'opacity-100',
            refreshSpinning && 'animate-spin-medium'
          )}
          // If spinning but no longer refreshing, stop after iteration.
          onAnimationIteration={
            refreshSpinning && !refreshing
              ? () => setRefreshSpinning(false)
              : undefined
          }
          onClick={() => {
            // Perform one spin even if refresh completes immediately. It will
            // stop after 1 iteration if `refreshing` does not become true.
            setRefreshSpinning(true)
            onRefresh()
          }}
          variant="ghost"
        />
      </div>

      <div className="grid-rows-auto grid grid-cols-[minmax(5rem,1fr)_auto_auto] items-center gap-x-8 gap-y-6 overflow-x-auto sm:grid-cols-[auto_minmax(5rem,1fr)_auto_auto]">
        {/* Titles */}
        <p className="caption-text hidden font-mono font-normal text-text-secondary sm:block">
          {t('title.when')}
        </p>
        <p className="caption-text font-mono font-normal text-text-secondary">
          {t('title.voter')}
        </p>
        <p className="caption-text font-mono font-normal text-text-secondary">
          {t('title.vote')}
        </p>
        <p className="caption-text font-mono font-normal text-text-secondary">
          {t('title.votingPower')}
        </p>

        {/* Votes */}
        {votesWithDate.map(
          ({ when, voterAddress, vote, votingPowerPercent }, index) => (
            <Fragment key={index}>
              <p
                className={clsx(
                  'caption-text hidden sm:block',
                  when ? 'text-text-body' : 'text-text-tertiary'
                )}
              >
                {when ? (
                  <TimeAgo date={when} formatter={timeAgoFormatter} />
                ) : (
                  '?'
                )}
              </p>
              <ProfileDisplay
                address={voterAddress}
                copyToClipboardProps={{
                  className: 'caption-text font-mono text-text-body',
                  takeAll: true,
                  takeStartEnd: undefined,
                }}
              />
              <Tooltip
                title={
                  when ? (
                    <TimeAgo date={when} formatter={timeAgoFormatter} />
                  ) : undefined
                }
              >
                <div>
                  <VoteDisplay vote={vote} />
                </div>
              </Tooltip>
              <p className="caption-text justify-self-right text-right font-mono text-text-body">
                {formatPercentOf100(votingPowerPercent)}
              </p>
            </Fragment>
          )
        )}
      </div>

      {/* If loading votes, display loader. */}
      {votes.loading && <Loader fill={false} />}
    </div>
  )
}
