import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CopyToClipboard, TokenSwapStatus } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'

import { ExistingTokenSwapOptions } from './types'

// Displayed when displaying an existing token swap being withdrawn.
export const WithdrawTokenSwap: ActionComponent<ExistingTokenSwapOptions> = ({
  fieldNamePrefix,
  options: { tokenSwapStatusProps },
}) => {
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
        {t('info.actionWithdrawsTokenSwap', {
          context: tokenSwapStatusProps.selfParty.provided ? 'pending' : 'done',
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
