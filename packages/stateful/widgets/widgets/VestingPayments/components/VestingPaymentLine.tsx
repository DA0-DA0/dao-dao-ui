import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  TokenAmountDisplay,
  Tooltip,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import { StatefulEntityDisplayProps } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  formatDate,
  formatDateTimeTz,
} from '@dao-dao/utils'

import { VestingInfo } from '../types'

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
  const startTimeAgoFormatter = useTranslatedTimeDeltaFormatter({
    words: true,
    futureMode: 'in',
  })
  const endTimeAgoFormatter = useTranslatedTimeDeltaFormatter({
    words: true,
    futureMode: 'left',
  })

  const {
    vest,
    token,
    vested,
    distributable,
    total,
    completed,
    startDate,
    endDate,
  } = vestingInfo

  return (
    <div
      className={clsx(
        'box-content grid h-8 cursor-pointer grid-cols-2 items-center gap-4 rounded-lg py-3 px-4 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed md:grid-cols-[2fr_3fr_3fr_4fr]',
        !transparentBackground && 'bg-background-tertiary'
      )}
      onClick={onClick}
    >
      <EntityDisplay
        address={vest.recipient}
        copyToClipboardProps={{
          textClassName: '!no-underline',
        }}
      />

      {completed ? (
        <>
          <div className="hidden md:block">
            {endDate ? (
              <Tooltip title={endDate && formatDateTimeTz(endDate)}>
                <p className="inline-block">{formatDate(endDate, true)}</p>
              </Tooltip>
            ) : (
              <p>{t('info.unknown')}</p>
            )}
          </div>

          <div className="hidden md:block">
            {/* Only show balance available to withdraw if nonzero. */}
            {distributable !== '0' && (
              <TokenAmountDisplay
                amount={convertMicroDenomToDenomWithDecimals(
                  distributable,
                  token.decimals
                )}
                className="body-text truncate font-mono"
                decimals={token.decimals}
                symbol={token.symbol}
              />
            )}
          </div>

          <TokenAmountDisplay
            amount={convertMicroDenomToDenomWithDecimals(total, token.decimals)}
            className="body-text truncate text-right font-mono"
            decimals={token.decimals}
            symbol={token.symbol}
          />
        </>
      ) : (
        <>
          <div className="hidden md:block">
            {startDate ? (
              <Tooltip title={startDate && formatDateTimeTz(startDate)}>
                <div className="inline-block">
                  <TimeAgo date={startDate} formatter={startTimeAgoFormatter} />
                </div>
              </Tooltip>
            ) : (
              <p>{t('info.unknown')}</p>
            )}
          </div>

          <div className="hidden md:block">
            {endDate ? (
              <Tooltip title={endDate && formatDateTimeTz(endDate)}>
                <div className="inline-block">
                  <TimeAgo date={endDate} formatter={endTimeAgoFormatter} />
                </div>
              </Tooltip>
            ) : (
              <p>{t('info.unknown')}</p>
            )}
          </div>

          <div className="body-text flex flex-row items-center justify-end gap-1 justify-self-end text-right font-mono">
            <TokenAmountDisplay
              amount={convertMicroDenomToDenomWithDecimals(
                vested,
                token.decimals
              )}
              className="truncate"
              decimals={token.decimals}
              hideSymbol
            />

            <p>/</p>

            <TokenAmountDisplay
              amount={convertMicroDenomToDenomWithDecimals(
                total,
                token.decimals
              )}
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
