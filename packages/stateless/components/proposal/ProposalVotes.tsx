import clsx from 'clsx'
import { ComponentType, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import { ProfileDisplayProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { useTranslatedTimeDeltaFormatter } from '../../hooks'
import { Button } from '../buttons'
import { Loader } from '../Loader'
import { Tooltip } from '../Tooltip'

export interface ProposalVote<Vote extends unknown = any> {
  voterAddress: string
  vote: Vote
  votingPowerPercent: number
}

export interface ProposalVotesProps<Vote extends unknown = any> {
  votes: ProposalVote<Vote>[]
  getDateVoted?: (voterAddress: string) => Date | undefined
  canLoadMore: boolean
  loadMore: () => void
  loadingMore: boolean
  ProfileDisplay: ComponentType<Omit<ProfileDisplayProps, 'loadingProfile'>>
  VoteDisplay: ComponentType<{ vote: Vote }>
}

export const ProposalVotes = <Vote extends unknown = any>({
  votes,
  getDateVoted,
  canLoadMore,
  loadMore,
  loadingMore,
  ProfileDisplay,
  VoteDisplay,
}: ProposalVotesProps<Vote>) => {
  const { t } = useTranslation()

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: true })

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
        <div className="grid-rows-auto grid grid-cols-[1fr_auto_auto] items-center gap-x-8 gap-y-6 xs:grid-cols-[auto_1fr_auto_auto]">
          {/* Titles */}
          <p className="caption-text hidden font-mono font-normal text-text-secondary xs:block">
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
