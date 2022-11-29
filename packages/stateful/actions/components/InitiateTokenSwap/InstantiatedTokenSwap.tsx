import { useTranslation } from 'react-i18next'

import { TokenSwapStatus } from '@dao-dao/stateless'

import { InstantiatedTokenSwapProps } from './types'

// Displayed when displaying an existing token swap.
export const InstantiatedTokenSwap = ({
  tokenSwapStatusProps,
}: InstantiatedTokenSwapProps) => {
  const { t } = useTranslation()

  return (
    <>
      <TokenSwapStatus {...tokenSwapStatusProps} />

      <p className="caption-text mt-10 text-center">
        {t('info.actionPaysTokenSwap', {
          amount: tokenSwapStatusProps.selfParty.amount.toLocaleString(
            undefined,
            {
              maximumFractionDigits: tokenSwapStatusProps.selfParty.decimals,
            }
          ),
          tokenSymbol: tokenSwapStatusProps.selfParty.symbol,
        })}
      </p>
    </>
  )
}
