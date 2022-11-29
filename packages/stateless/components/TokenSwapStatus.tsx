import {
  Check,
  Close,
  SwapHorizRounded,
  SwapVertRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { TokenAmountDisplay } from '@dao-dao/stateless'
import { TokenSwapStatusProps } from '@dao-dao/types/stateless/TokenSwapStatus'

export const TokenSwapStatus = ({
  selfParty,
  counterparty,
  ProfileDisplay,
  className,
}: TokenSwapStatusProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-x-6 gap-y-4 sm:flex-row',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <ProfileDisplay address={selfParty.address} size="lg" />
        <TokenAmountDisplay
          amount={selfParty.amount}
          decimals={selfParty.decimals}
          iconUrl={selfParty.tokenLogoUrl}
          symbol={selfParty.symbol}
        />
        <div className="flex flex-row items-center gap-2">
          {selfParty.provided ? (
            <Check className="!h-4 !w-4 text-icon-interactive-valid" />
          ) : (
            <Close className="!h-4 !w-4 text-icon-interactive-error" />
          )}

          <p
            className={clsx(
              selfParty.provided
                ? 'text-text-interactive-valid'
                : 'text-text-interactive-error'
            )}
          >
            {selfParty.provided ? t('info.paid') : t('info.unpaid')}
          </p>
        </div>
      </div>

      <SwapVertRounded className="!h-10 !w-10 sm:!hidden" />
      <SwapHorizRounded className="!hidden !h-8 !w-8 sm:!block" />

      <div className="flex flex-col items-center gap-2">
        <ProfileDisplay address={counterparty.address} size="lg" />
        <TokenAmountDisplay
          amount={counterparty.amount}
          decimals={counterparty.decimals}
          iconUrl={counterparty.tokenLogoUrl}
          symbol={counterparty.symbol}
        />
        <div className="flex flex-row items-center gap-2">
          {counterparty.provided ? (
            <Check className="!h-4 !w-4 text-icon-interactive-valid" />
          ) : (
            <Close className="!h-4 !w-4 text-icon-interactive-error" />
          )}

          <p
            className={clsx(
              counterparty.provided
                ? 'text-text-interactive-valid'
                : 'text-text-interactive-error'
            )}
          >
            {counterparty.provided ? t('info.paid') : t('info.unpaid')}
          </p>
        </div>
      </div>
    </div>
  )
}
