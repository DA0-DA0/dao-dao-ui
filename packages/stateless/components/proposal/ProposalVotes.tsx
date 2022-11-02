import clsx from 'clsx'
import { ComponentType, Fragment, useEffect, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import { LoadingData, StatefulEntityDisplayProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { useTranslatedTimeDeltaFormatter } from '../../hooks'
import { Button } from '../buttons'
import { Tooltip } from '../tooltip/Tooltip'

export interface ProposalVote<Vote extends unknown = any> {
  voterAddress: string
  vote: Vote
  votingPowerPercent: number
  rationale?: string | null
  votedAt?: Date
}

export interface ProposalVotesProps<Vote extends unknown = any> {
  votes: LoadingData<ProposalVote<Vote>[]>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  VoteDisplay: ComponentType<{ vote: Vote; proposal?: any }>
  // Only allows refreshing when voting is open.
  votingOpen: boolean
}

export const ProposalVotes = <Vote extends unknown = any>({
  votes,
  EntityDisplay,
  VoteDisplay,
  votingOpen,
}: ProposalVotesProps<Vote>) => {
  const { t } = useTranslation()

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: true })

  const votesWithDate = votes.loading
    ? []
    : votes.data.sort(
        (a, b) =>
          // Sort descending by date, and those without a date last.
          (b.votedAt?.getTime() ?? -Infinity) -
          (a.votedAt?.getTime() ?? -Infinity)
      )

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

    const wasScrolledNearBottom =
      parent.scrollHeight - parent.scrollTop - parent.clientHeight < 100
    if (wasScrolledNearBottom && newVoteCount > prevVoteCount) {
      parent.scrollTo({
        top: parent.scrollHeight,
        behavior: 'smooth',
      })
    }

    setPrevVoteCount(newVoteCount)
  }, [prevVoteCount, votes])

  const csvLinkRef = useRef<HTMLAnchorElement>()

  return (
    <>
      <div className="flex flex-col gap-2" ref={containerRef}>
        <div className="mb-4 flex flex-col gap-1">
          <p className="primary-text">{t('title.votesCast')}</p>

          {votingOpen && (
            <p className="caption-text italic">
              {t('info.voteTallyRefreshesSeconds', { seconds: 30 })}
            </p>
          )}
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
            (
              { votedAt, voterAddress, vote, votingPowerPercent, rationale },
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
                <EntityDisplay
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

        <Button
          className="caption-text mt-6 self-end pr-1 text-right italic"
          disabled={!csvLinkRef.current || votes.loading}
          onClick={() => csvLinkRef.current?.click()}
          variant="none"
        >
          {t('button.downloadVotesCsv')}
        </Button>
      </div>

      <CSVLink
        className="hidden"
        data={[
          ['Timestamp', 'Voter', 'Voting Power', 'Vote', 'Rationale'],
          ...votesWithDate.map(
            ({
              votedAt,
              voterAddress,
              votingPowerPercent,
              vote,
              rationale,
            }) => [
              votedAt?.toISOString() ?? '',
              voterAddress,
              votingPowerPercent,
              vote,
              rationale,
            ]
          ),
        ]}
        filename="votes.csv"
        ref={(ref: any) => (csvLinkRef.current = ref?.link ?? undefined)}
      />
    </>
  )
}
