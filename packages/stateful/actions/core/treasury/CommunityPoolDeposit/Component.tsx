import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputErrorMessage,
  TokenAmountDisplay,
  TokenInput,
} from '@dao-dao/stateless'
import { GenericTokenBalance, LoadingData } from '@dao-dao/types'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { useActionOptions } from '../../../react/context'

export type CommunityPoolDepositData = {
  chainId: string
  amount: number
  denom: string
  _error?: string
}

export type CommunityPoolDepositOptions = {
  tokens: LoadingData<GenericTokenBalance[]>
}

export const CommunityPoolDepositComponent: ActionComponent<
  CommunityPoolDepositOptions
> = ({ fieldNamePrefix, isCreating, errors, options: { tokens } }) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()

  const { register, watch, setValue, setError, clearErrors } =
    useFormContext<CommunityPoolDepositData>()

  const spendChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const spendAmount = watch((fieldNamePrefix + 'amount') as 'amount')
  const spendDenom = watch((fieldNamePrefix + 'denom') as 'denom')

  const validatePossibleSpend = useCallback(
    (chainId: string, denom: string, amount: number): string | boolean => {
      if (tokens.loading) {
        return true
      }

      const insufficientBalanceI18nKey =
        context.type === ActionContextType.Wallet
          ? 'error.insufficientWalletBalance'
          : 'error.cantSpendMoreThanTreasury'

      const tokenBalance = tokens.data.find(
        ({ token }) =>
          token.chainId === chainId && token.denomOrAddress === denom
      )
      if (tokenBalance) {
        return (
          amount <= Number(tokenBalance.balance) ||
          t(insufficientBalanceI18nKey, {
            amount: convertMicroDenomToDenomWithDecimals(
              tokenBalance.balance,
              tokenBalance.token.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: tokenBalance.token.decimals,
            }),
            tokenSymbol: tokenBalance.token.symbol,
          })
        )
      }

      return t('error.unknownDenom', { denom })
    },
    [context.type, t, tokens]
  )

  // Update amount+denom combo error each time either field is updated
  // instead of setting errors individually on each field. Since we only
  // show one or the other and can't detect which error is newer, this
  // would lead to the error not updating if amount set an error and then
  // denom was changed.
  useEffect(() => {
    // Prevent infinite loops by not setting errors if already set, and only
    // clearing errors unless already set.
    const currentError = errors?._error

    if (!spendDenom || !spendAmount) {
      if (currentError) {
        clearErrors((fieldNamePrefix + '_error') as '_error')
      }
      return
    }

    const validation = validatePossibleSpend(
      spendChainId,
      spendDenom,
      spendAmount
    )
    if (validation === true) {
      if (currentError) {
        clearErrors((fieldNamePrefix + '_error') as '_error')
      }
    } else if (typeof validation === 'string') {
      if (!currentError || currentError.message !== validation) {
        setError((fieldNamePrefix + '_error') as '_error', {
          type: 'custom',
          message: validation,
        })
      }
    }
  }, [
    spendAmount,
    spendDenom,
    setError,
    clearErrors,
    validatePossibleSpend,
    fieldNamePrefix,
    errors?._error,
    spendChainId,
  ])

  const selectedToken = tokens.loading
    ? undefined
    : tokens.data.find(
        ({ token }) =>
          token.chainId === spendChainId && token.denomOrAddress === spendDenom
      )
  const balance = convertMicroDenomToDenomWithDecimals(
    selectedToken?.balance ?? 0,
    selectedToken?.token.decimals ?? 0
  )

  return (
    <>
      <div className="flex min-w-0 flex-row flex-wrap items-stretch justify-between gap-x-3 gap-y-1">
        <TokenInput
          amount={{
            watch,
            setValue,
            register,
            fieldName: (fieldNamePrefix + 'amount') as 'amount',
            error: errors?.amount,
            min: convertMicroDenomToDenomWithDecimals(
              1,
              selectedToken?.token.decimals ?? 0
            ),
            max: balance,
            step: convertMicroDenomToDenomWithDecimals(
              1,
              selectedToken?.token.decimals ?? 0
            ),
          }}
          onSelectToken={({ chainId, denomOrAddress }) => {
            setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
            setValue((fieldNamePrefix + 'denom') as 'denom', denomOrAddress)
          }}
          readOnly={!isCreating}
          selectedToken={selectedToken?.token}
          tokens={
            tokens.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: tokens.data.map(({ balance, token }) => ({
                    ...token,
                    description:
                      t('title.balance') +
                      ': ' +
                      convertMicroDenomToDenomWithDecimals(
                        balance,
                        token.decimals
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: token.decimals,
                      }),
                  })),
                }
          }
        />
      </div>

      {(errors?.amount || errors?.denom || errors?._error) && (
        <div className="-mt-4 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={errors?.denom} />
          <InputErrorMessage error={errors?._error} />
        </div>
      )}

      {selectedToken && isCreating && (
        <div className="-mt-2 flex flex-row items-center gap-2">
          <p className="secondary-text">{t('title.balance')}:</p>

          <TokenAmountDisplay
            amount={balance}
            decimals={selectedToken.token.decimals}
            iconUrl={selectedToken.token.imageUrl}
            showFullAmount
            symbol={selectedToken.token.symbol}
          />
        </div>
      )}
    </>
  )
}
