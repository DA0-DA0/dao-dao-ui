import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  TokenAmountDisplay,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import { StatefulEntityDisplayProps } from '@dao-dao/types'
import { formatDate } from '@dao-dao/utils'

import { VestingInfo } from '../types'
import {
  getTotalVestedAmount,
  getTotalVestingAndVestedAmount,
  getWithdrawableAmount,
} from '../utils'

export type VestingPaymentLineProps = VestingInfo & {
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  onClick: () => void
  transparentBackground?: boolean
}

export const VestingPaymentLine = ({
  EntityDisplay,
  onClick,
  transparentBackground,
  ...vestingInfo
}: VestingPaymentLineProps) => {
  const { t } = useTranslation()
  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: true })

  const { vestingPayment, token } = vestingInfo

  const completed =
    vestingPayment.status !== 'active' && vestingPayment.status !== 'unfunded'

  const startDate =
    'saturating_linear' in vestingPayment.vesting_schedule
      ? new Date(vestingPayment.vesting_schedule.saturating_linear.min_x * 1000)
      : undefined
  const endDate =
    'saturating_linear' in vestingPayment.vesting_schedule
      ? new Date(vestingPayment.vesting_schedule.saturating_linear.max_x * 1000)
      : undefined

  console.log(vestingPayment)

  return (
    <div
      className={clsx(
        'box-content grid h-8 cursor-pointer grid-cols-2 items-center gap-4 rounded-lg py-3 px-4 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed md:grid-cols-[2fr_3fr_3fr_4fr]',
        !transparentBackground && 'bg-background-tertiary'
      )}
      onClick={onClick}
    >
      <EntityDisplay
        address={vestingPayment.recipient}
        copyToClipboardProps={{
          textClassName: '!no-underline',
        }}
      />

      {completed ? (
        <>
          <p className="hidden md:block">
            {endDate ? formatDate(endDate, true) : t('info.unknown')}
          </p>

          <div className="hidden md:block">
            {/* Only show balance available to withdraw if nonzero. */}
            {getWithdrawableAmount(vestingInfo) > 0 && (
              <TokenAmountDisplay
                amount={getWithdrawableAmount(vestingInfo)}
                className="body-text truncate font-mono"
                decimals={token.decimals}
                symbol={token.symbol}
              />
            )}
          </div>

          <TokenAmountDisplay
            amount={getTotalVestingAndVestedAmount(vestingInfo)}
            className="body-text truncate text-right font-mono"
            decimals={token.decimals}
            symbol={token.symbol}
          />
        </>
      ) : (
        <>
          <div className="hidden md:block">
            {startDate ? (
              <TimeAgo date={startDate} formatter={timeAgoFormatter} />
            ) : (
              <p>{t('info.unknown')}</p>
            )}
          </div>

          <p className="hidden md:block">
            {endDate ? formatDate(endDate, true) : t('info.unknown')}
          </p>

          <div className="body-text flex flex-row items-center justify-end gap-1 justify-self-end text-right font-mono">
            <TokenAmountDisplay
              amount={getTotalVestedAmount(vestingInfo)}
              className="truncate"
              decimals={token.decimals}
              hideSymbol
            />

            <p>/</p>

            <TokenAmountDisplay
              amount={getTotalVestingAndVestedAmount(vestingInfo)}
              className="truncate"
              decimals={token.decimals}
              symbol={token.symbol}
            />
          </div>
        </>
      )}
    </div>
  )
}
