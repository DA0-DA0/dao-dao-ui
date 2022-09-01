import { useTranslation } from 'react-i18next'

import { formatDate, secondsToWdhms } from '@dao-dao/utils'

import { UnstakingStatus, UnstakingTaskStatus } from 'components'

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
}

export const UnstakingLine = ({
  task: { status, amount, tokenSymbol, tokenDecimals, date },
}: UnstakingLineProps) => {
  const { t } = useTranslation()

  const dateString =
    status === UnstakingTaskStatus.Unstaking
      ? t('info.timeLeft', {
          time: secondsToWdhms((date.getTime() - Date.now()) / 1000, 1),
        })
      : formatDate(date)

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-8 items-center py-4 px-3 bg-background-secondary rounded-md">
      <UnstakingStatus status={status} />
      <p className="truncate body-text">
        {amount.toLocaleString(undefined, {
          maximumFractionDigits: tokenDecimals,
        })}{' '}
        ${tokenSymbol}
      </p>
      <p className="font-mono text-right break-words caption-text">
        {dateString}
      </p>
    </div>
  )
}
