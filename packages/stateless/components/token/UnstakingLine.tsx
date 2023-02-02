import clsx from 'clsx'
import { ReactNode } from 'react'
import TimeAgo from 'react-timeago'

import { UnstakingTask, UnstakingTaskStatus } from '@dao-dao/types'
import { formatDate, formatDateTimeTz } from '@dao-dao/utils'

import { useTranslatedTimeDeltaFormatter } from '../../hooks'
import { Tooltip } from '../tooltip'
import { TokenAmountDisplay } from './TokenAmountDisplay'
import { UnstakingStatus } from './UnstakingStatus'

export interface UnstakingLineProps {
  task: UnstakingTask
  // If present, replace date with this node. This may be used to add a claim
  // button to the claim task status.
  dateReplacement?: ReactNode
}

const sharedClassNames = 'bg-background-secondary rounded-md'

export const UnstakingLine = ({
  task: { status, amount, token, date },
  dateReplacement,
}: UnstakingLineProps) => {
  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: true })

  const dateDisplay = date ? (
    status === UnstakingTaskStatus.Unstaking ? (
      <TimeAgo date={date} formatter={timeAgoFormatter} />
    ) : (
      formatDate(date)
    )
  ) : undefined

  return (
    <>
      {/* Desktop */}
      <div
        className={clsx(
          sharedClassNames,
          'box-content hidden h-8 grid-cols-[auto_1fr_auto] items-center gap-8 py-3 px-4 md:grid'
        )}
      >
        <UnstakingStatus status={status} />

        <TokenAmountDisplay
          amount={amount}
          className="body-text truncate"
          decimals={token.decimals}
          symbol={token.symbol}
        />

        {dateReplacement || (
          <Tooltip title={date && formatDateTimeTz(date)}>
            <p className="caption-text break-words pr-2 text-right font-mono">
              {dateDisplay}
            </p>
          </Tooltip>
        )}
      </div>

      {/* Mobile */}
      <div
        className={clsx(
          sharedClassNames,
          'box-content flex flex-col gap-2 p-4 md:hidden'
        )}
      >
        <UnstakingStatus status={status} />

        <div className="flex flex-row items-end justify-between gap-4">
          <TokenAmountDisplay
            amount={amount}
            className="body-text break-words"
            decimals={token.decimals}
            symbol={token.symbol}
          />

          {dateReplacement ||
            (dateDisplay && (
              <Tooltip title={date && formatDateTimeTz(date)}>
                <p className="caption-text break-words text-right font-mono">
                  {dateDisplay}
                </p>
              </Tooltip>
            ))}
        </div>
      </div>
    </>
  )
}
