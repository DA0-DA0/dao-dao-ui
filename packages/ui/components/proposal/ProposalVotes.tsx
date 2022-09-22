import { Fragment, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo, { Formatter } from 'react-timeago'

import { formatPercentOf100 } from '@dao-dao/utils'

import { Button } from '../Button'
import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { Loader } from '../Loader'
import { Tooltip } from '../Tooltip'

export interface ProposalVote {
  when: Date
  voterAddress: string
  vote: ReactNode
  votingPowerPercent: number
}

export interface ProposalVotesProps {
  votes: ProposalVote[]
  canLoadMore: boolean
  loadMore: () => void
  loadingMore: boolean
}

export const ProposalVotes = ({
  votes,
  canLoadMore,
  loadMore,
  loadingMore,
}: ProposalVotesProps) => {
  const { t } = useTranslation()

  const timeAgoFormatter: Formatter = (value, unit) =>
    t('info.timeAgo', {
      value,
      unit: t(`unit.${unit}s`, { count: value }).toLocaleLowerCase(),
    })

  return (
    <>
      {votes.length > 0 && (
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-8 gap-y-6 xs:grid-cols-[auto_1fr_auto_auto] grid-rows-auto">
          {/* Titles */}
          <p className="hidden font-mono font-normal text-text-secondary xs:block caption-text">
            {t('title.when')}
          </p>
          <p className="font-mono font-normal text-text-secondary caption-text">
            {t('title.votersAddress')}
          </p>
          <p className="font-mono font-normal text-text-secondary caption-text">
            {t('title.vote')}
          </p>
          <p className="font-mono font-normal text-text-secondary caption-text">
            {t('title.votingPower')}
          </p>

          {/* Votes */}
          {votes.map(
            ({ when, voterAddress, vote, votingPowerPercent }, index) => (
              <Fragment key={index}>
                <p className="hidden text-text-body xs:block caption-text">
                  <TimeAgo date={when} formatter={timeAgoFormatter} />
                </p>
                <CopyToClipboardUnderline
                  className="font-mono text-text-body caption-text"
                  takeAll
                  value={voterAddress}
                />
                <Tooltip
                  title={<TimeAgo date={when} formatter={timeAgoFormatter} />}
                >
                  <div>{vote}</div>
                </Tooltip>
                <p className="font-mono text-right text-text-body caption-text justify-self-right">
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
          <div className="flex flex-row justify-end mt-4">
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
