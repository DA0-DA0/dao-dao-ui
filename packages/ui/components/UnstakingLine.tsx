import clsx from 'clsx'
import { ReactNode } from 'react'
import TimeAgo from 'react-timeago'

import { UnstakingTask, UnstakingTaskStatus } from '@dao-dao/tstypes'
import { formatDate } from '@dao-dao/utils'

import { useTranslatedTimeDeltaFormatter } from '../hooks'
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
  task: { status, amount, tokenSymbol, tokenDecimals, date },
  dateReplacement,
}: UnstakingLineProps) => {
  const timeAgoFormatter = useTranslatedTimeDeltaFormatter()

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
          'box-content hidden grid-cols-[auto_1fr_auto] gap-8 items-center py-3 px-4 h-8 md:grid'
        )}
      >
        <UnstakingStatus status={status} />

        <TokenAmountDisplay
          amount={amount}
          className="truncate body-text"
          maxDecimals={tokenDecimals}
          symbol={tokenSymbol}
        />

        {dateReplacement || (
          <p className="pr-2 font-mono text-right break-words caption-text">
            {dateDisplay}
          </p>
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

        <div className="flex flex-row gap-4 justify-between items-end">
          <TokenAmountDisplay
            amount={amount}
            className="break-words body-text"
            maxDecimals={tokenDecimals}
            symbol={tokenSymbol}
          />

          {dateReplacement ||
            (dateDisplay && (
              <p className="font-mono text-right break-words caption-text">
                {dateDisplay}
              </p>
            ))}
        </div>
      </div>
    </>
  )
}
