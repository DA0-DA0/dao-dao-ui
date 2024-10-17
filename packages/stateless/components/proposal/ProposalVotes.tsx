import clsx from 'clsx'
import {
  ComponentType,
  Fragment,
  ReactNode,
  RefCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { CSVLink } from 'react-csv'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  LoadingDataWithError,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import {
  formatDateTimeTz,
  formatPercentOf100,
  getScrollableAncestor,
  processError,
} from '@dao-dao/utils'

import { useTranslatedTimeDeltaFormatter } from '../../hooks'
import { Button } from '../buttons'
import { Loader } from '../logo'
import { Tooltip } from '../tooltip/Tooltip'

export interface ProposalVote<Vote extends unknown = any> {
  voterAddress: string
  vote: Vote
  votingPowerPercent: number
  rationale?: string | null
  votedAt?: Date
}

export interface ProposalVotesProps<Vote extends unknown = any> {
  votes: LoadingDataWithError<ProposalVote<Vote>[]>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  VoteDisplay: ComponentType<{ vote: Vote }>
  // Only allows refreshing when voting is open.
  votingOpen: boolean
  footer?: ReactNode
  hideVotedAt?: boolean
  /**
   * Function to fetch all votes (non-paginated) for downloading the CSV. If
   * undefined, download link is hidden.
   */
  getAllVotes?: () => Promise<ProposalVote<Vote>[]>
  /**
   * A function to convert the vote type into a string for the CSV.
   */
  exportVoteTransformer: (vote: Vote) => string
  /**
   * Optional class names to apply to the container.
   */
  className?: string
  /**
   * Optional ref to apply to the container.
   */
  containerRef?: RefCallback<HTMLDivElement>
}

export const ProposalVotes = <Vote extends unknown = any>({
  votes,
  EntityDisplay,
  VoteDisplay,
  votingOpen,
  footer,
  hideVotedAt,
  getAllVotes,
  exportVoteTransformer,
  className,
  containerRef,
}: ProposalVotesProps<Vote>) => {
  const { t } = useTranslation()

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ words: true })

  const votesLoadingOrUpdating = votes.loading || !!votes.updating

  const [loadingAllVotes, setLoadingAllVotes] = useState(false)
  const [allVotes, setAllVotes] = useState<ProposalVote<Vote>[]>()
  const downloadVotes = async () => {
    if (!getAllVotes) {
      return
    }

    setLoadingAllVotes(true)

    try {
      const allVotes = (await getAllVotes()).sort(
        (a, b) =>
          // Sort descending by date, and those without a date last.
          (b.votedAt?.getTime() ?? -Infinity) -
          (a.votedAt?.getTime() ?? -Infinity)
      )

      setAllVotes(allVotes)
    } catch (err) {
      console.error(err)
      toast.error(processError(err, { forceCapture: false }))
    } finally {
      setLoadingAllVotes(false)
    }
  }

  // If a new vote is added to existing votes and the window is scrolled to the
  // bottom, scroll to the bottom again to show the new vote.
  const [prevVoteCount, setPrevVoteCount] = useState(0)
  const ourContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const newVoteCount = votes.loading || votes.errored ? 0 : votes.data.length
    if (
      votes.loading ||
      !ourContainerRef.current ||
      prevVoteCount === newVoteCount
    ) {
      return
    }

    const parent = getScrollableAncestor(ourContainerRef.current)
    if (!parent) {
      return
    }

    const wasScrolledNearBottom =
      parent.scrollHeight - parent.scrollTop - parent.clientHeight < 100
    if (
      wasScrolledNearBottom &&
      prevVoteCount > 0 &&
      newVoteCount > prevVoteCount
    ) {
      parent.scrollTo({
        top: parent.scrollHeight,
        behavior: 'smooth',
      })
    }

    setPrevVoteCount(newVoteCount)
  }, [prevVoteCount, votes])

  return (
    <>
      <div
        className={clsx('flex flex-col gap-2', className)}
        ref={(ref) => {
          ourContainerRef.current = ref
          containerRef?.(ref)
        }}
      >
        <div className="mb-4 flex flex-col gap-1">
          <p className="primary-text">{t('title.votesCast')}</p>

          {votingOpen && (
            <p className="caption-text italic">
              {t('info.votesRefreshAutomatically')}
            </p>
          )}

          {!!getAllVotes && (
            <Button
              className="caption-text mt-1 italic"
              loading={loadingAllVotes}
              onClick={downloadVotes}
              variant="none"
            >
              {t('button.downloadVotesCsv')}
            </Button>
          )}
        </div>

        <div
          className={clsx(
            'grid-rows-auto grid grid-cols-[minmax(5rem,1fr)_auto_auto] items-center gap-x-8 gap-y-6 overflow-x-auto',
            !hideVotedAt && 'sm:grid-cols-[auto_minmax(5rem,1fr)_auto_auto]'
          )}
        >
          {/* Titles */}
          {!hideVotedAt && (
            <p className="caption-text hidden font-mono font-normal text-text-secondary sm:block">
              {t('title.when')}
            </p>
          )}
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
          {(votes.loading || votes.errored ? [] : votes.data).map(
            (
              { votedAt, voterAddress, vote, votingPowerPercent, rationale },
              index
            ) => (
              <Fragment key={index}>
                {!hideVotedAt && (
                  <Tooltip
                    title={votedAt ? formatDateTimeTz(votedAt) : undefined}
                  >
                    <p
                      className={clsx(
                        'caption-text hidden sm:block',
                        votedAt ? 'text-text-body' : 'text-text-tertiary'
                      )}
                    >
                      {votedAt ? (
                        <TimeAgo
                          date={votedAt}
                          formatter={timeAgoFormatter}
                          // @ts-ignore
                          title={
                            // Disable tooltip since we have our own.
                            null
                          }
                        />
                      ) : (
                        '?'
                      )}
                    </p>
                  </Tooltip>
                )}
                <EntityDisplay
                  address={voterAddress}
                  showFullAddress
                  textClassName={clsx(
                    'caption-text font-mono text-text-body',
                    votesLoadingOrUpdating && 'animate-pulse'
                  )}
                />
                <Tooltip title={rationale || undefined}>
                  <div
                    className={clsx(votesLoadingOrUpdating && 'animate-pulse')}
                  >
                    <VoteDisplay vote={vote} />
                  </div>
                </Tooltip>
                <p
                  className={clsx(
                    'caption-text justify-self-right text-right font-mono text-text-body',
                    votesLoadingOrUpdating && 'animate-pulse'
                  )}
                >
                  {formatPercentOf100(votingPowerPercent)}
                </p>
              </Fragment>
            )
          )}
        </div>

        {votes.loading ? (
          <Loader size={32} />
        ) : votes.updating ? (
          <Loader className="mt-4" size={20} />
        ) : null}

        {footer}
      </div>

      {!!getAllVotes && allVotes && (
        <CSVLink
          className="hidden"
          data={[
            ['Timestamp', 'Voter', 'Voting Power', 'Vote', 'Rationale'],
            ...allVotes.map(
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
                exportVoteTransformer(vote),
                rationale,
              ]
            ),
          ]}
          filename="votes.csv"
          ref={(ref: any) => {
            // Download right away and clear.
            ;(ref?.link as HTMLAnchorElement | undefined)?.click()
            setAllVotes(undefined)
          }}
        />
      )}
    </>
  )
}
