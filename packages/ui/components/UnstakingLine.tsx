import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { formatDate, secondsToWdhms } from '@dao-dao/utils'

import { UnstakingStatus, UnstakingTaskStatus } from './UnstakingStatus'

export interface UnstakingTask {
  status: UnstakingTaskStatus
  amount: number
  tokenSymbol: string
  tokenDecimals: number
  // If unstaking or ready to claim, date it will be/was unstaked.
  // If claimed, date it was claimed.
  date: Date
}

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
  const { t } = useTranslation()

  const dateString =
    status === UnstakingTaskStatus.Unstaking
      ? t('info.timeLeft', {
          time: secondsToWdhms((date.getTime() - Date.now()) / 1000, 1),
        })
      : formatDate(date)

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

        <p className="truncate body-text">
          {amount.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })}{' '}
          ${tokenSymbol}
        </p>

        {dateReplacement || (
          <p className="pr-2 font-mono text-right break-words caption-text">
            {dateString}
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
          <p className="break-words body-text">
            {amount.toLocaleString(undefined, {
              maximumFractionDigits: tokenDecimals,
            })}{' '}
            ${tokenSymbol}
          </p>

          {dateReplacement || (
            <p className="font-mono text-right break-words caption-text">
              {dateString}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
