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
  self,
  counterparty,
  ProfileDisplay,
}: TokenSwapStatusProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center gap-x-6 gap-y-4 sm:flex-row">
      <div className="flex flex-col items-center gap-2">
        <ProfileDisplay address={self.address} size="lg" />
        <TokenAmountDisplay
          amount={self.amount}
          decimals={self.decimals}
          iconUrl={self.tokenLogoUrl}
          symbol={self.symbol}
        />
        <div className="flex flex-row items-center gap-2">
          {self.provided ? (
            <Check className="!h-4 !w-4 text-icon-interactive-valid" />
          ) : (
            <Close className="!h-4 !w-4 text-icon-interactive-error" />
          )}

          <p
            className={clsx(
              self.provided
                ? 'text-text-interactive-valid'
                : 'text-text-interactive-error'
            )}
          >
            {self.provided ? t('info.paid') : t('info.unpaid')}
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
