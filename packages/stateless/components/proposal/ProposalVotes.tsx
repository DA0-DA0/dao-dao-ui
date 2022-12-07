import clsx from 'clsx'
import { ComponentType, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import { StatefulProfileDisplayProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { useTranslatedTimeDeltaFormatter } from '../../hooks'
import { Button } from '../buttons'
import { Loader } from '../logo/Loader'
import { Tooltip } from '../tooltip/Tooltip'

export interface ProposalVote<Vote extends unknown = any> {
  voterAddress: string
  vote: Vote
  votingPowerPercent: number
  rationale?: string | null
  votedAt?: Date
}

export interface ProposalVotesProps<Vote extends unknown = any> {
  votes: ProposalVote<Vote>[]
  canLoadMore: boolean
  loadMore: () => void
  loadingMore: boolean
  ProfileDisplay: ComponentType<StatefulProfileDisplayProps>
  VoteDisplay: ComponentType<{ vote: Vote }>
}

export const ProposalVotes = <Vote extends unknown = any>({
  votes,
  canLoadMore,
  loadMore,
  loadingMore,
  ProfileDisplay,
  VoteDisplay,
}: ProposalVotesProps<Vote>) => {
  const { t } = useTranslation()

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: true })

  const dateSortedVotes = votes.sort(
    (a, b) =>
      // Sort those without a date last.
      (b.votedAt?.getTime() ?? -Infinity) - (a.votedAt?.getTime() ?? -Infinity)
  )

  return (
    <>
      {votes.length > 0 && (
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
          {dateSortedVotes.map(
            (
              { votedAt, rationale, voterAddress, vote, votingPowerPercent },
              index
            ) => (
              <Fragment key={index}>
                <p
                  className={clsx(
                    'caption-text hidden sm:block',
                    votedAt ? 'text-text-body' : 'text-text-tertiary'
                  )}
                >
                  {votedAt ? (
                    <TimeAgo date={votedAt} formatter={timeAgoFormatter} />
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
                <Tooltip title={rationale || undefined}>
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
      )}

      {/* If no votes but loading, just display loader. */}
      {votes.length === 0 && loadingMore ? (
        <Loader fill={false} />
      ) : (
        (canLoadMore || loadingMore) && (
          <div className="mt-4 flex flex-row justify-end">
            <Button
              className="secondary"
              loading={loadingMore}
              onClick={() => loadMore()}
            >
              {t('button.loadMore')}
            </Button>
          </div>
        )
      )}
    </>
  )
}
