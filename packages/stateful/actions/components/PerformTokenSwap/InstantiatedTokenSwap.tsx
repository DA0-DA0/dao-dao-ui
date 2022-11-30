import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CopyToClipboard, TokenSwapStatus } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'

import { InstantiatedTokenSwapOptions } from './types'

// Displayed when displaying an existing token swap.
export const InstantiatedTokenSwap: ActionComponent<
  InstantiatedTokenSwapOptions
> = ({ fieldNamePrefix, options: { tokenSwapStatusProps } }) => {
  const { t } = useTranslation()
  const { watch } = useFormContext()

  const tokenSwapContractAddress = watch(
    fieldNamePrefix + 'tokenSwapContractAddress'
  )

  return (
    <>
      <TokenSwapStatus
        {...tokenSwapStatusProps}
        className={clsx(tokenSwapStatusProps.className, 'my-4')}
      />

      <p className="caption-text mt-4 text-center">
        {t('info.actionPaysTokenSwap', {
          context: tokenSwapStatusProps.selfParty.provided ? 'paid' : 'unpaid',
          amount: tokenSwapStatusProps.selfParty.amount.toLocaleString(
            undefined,
            {
              maximumFractionDigits: tokenSwapStatusProps.selfParty.decimals,
            }
          ),
          tokenSymbol: tokenSwapStatusProps.selfParty.symbol,
        })}
      </p>

      <CopyToClipboard
        className="max-w-full self-center"
        takeAll
        value={tokenSwapContractAddress}
      />
    </>
  )
}
