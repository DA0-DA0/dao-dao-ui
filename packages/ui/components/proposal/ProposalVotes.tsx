import clsx from 'clsx'
import { Fragment, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import { formatPercentOf100 } from '@dao-dao/utils'

import { useTranslatedTimeDeltaFormatter } from '../../hooks'
import { Button } from '../Button'
import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { Loader } from '../Loader'
import { Tooltip } from '../Tooltip'

export interface ProposalVote {
  voterAddress: string
  vote: ReactNode
  votingPowerPercent: number
}

export interface ProposalVotesProps {
  votes: ProposalVote[]
  getDateVoted?: (voterAddress: string) => Date | undefined
  canLoadMore: boolean
  loadMore: () => void
  loadingMore: boolean
}

export const ProposalVotes = ({
  votes,
  getDateVoted,
  canLoadMore,
  loadMore,
  loadingMore,
}: ProposalVotesProps) => {
  const { t } = useTranslation()

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter()

  const votesWithDate = votes
    .map((vote) => ({
      ...vote,
      when: getDateVoted?.(vote.voterAddress),
    }))
    .sort(
      (a, b) =>
        // Sort those without a date last.
        (b.when?.getTime() ?? -Infinity) - (a.when?.getTime() ?? -Infinity)
    )

  return (
    <>
      {votes.length > 0 && (
        <div className="grid-rows-auto grid grid-cols-[1fr_auto_auto] gap-x-8 gap-y-6 xs:grid-cols-[auto_1fr_auto_auto]">
          {/* Titles */}
          <p className="caption-text hidden font-mono font-normal text-text-secondary xs:block">
            {t('title.when')}
          </p>
          <p className="caption-text font-mono font-normal text-text-secondary">
            {t('title.votersAddress')}
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
                    'caption-text hidden xs:block',
                    when ? 'text-text-body' : 'text-text-tertiary'
                  )}
                >
                  {when ? (
                    <TimeAgo date={when} formatter={timeAgoFormatter} />
                  ) : (
                    '?'
                  )}
                </p>
                <CopyToClipboardUnderline
                  className="caption-text font-mono text-text-body"
                  takeAll
                  value={voterAddress}
                />
                <Tooltip
                  title={
                    when ? (
                      <TimeAgo date={when} formatter={timeAgoFormatter} />
                    ) : undefined
                  }
                >
                  <div>{vote}</div>
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
              onClick={loadMore}
            >
              {t('button.loadMore')}
            </Button>
          </div>
        )
      )}
    </>
  )
}
