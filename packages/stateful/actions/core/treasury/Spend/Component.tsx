import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
  InputErrorMessage,
  TokenAmountDisplay,
  TokenInput,
  useDetectWrap,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  GenericTokenBalance,
  LoadingData,
} from '@dao-dao/types'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  getChainForChainId,
  makeValidateAddress,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export interface SpendData {
  chainId: string
  to: string
  amount: number
  denom: string
}

export interface SpendOptions {
  tokens: LoadingData<GenericTokenBalance[]>
  // Used to render pfpk or DAO profiles when selecting addresses.
  AddressInput: ComponentType<AddressInputProps>
}

export const SpendComponent: ActionComponent<SpendOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { tokens, AddressInput },
}) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()

  const { register, watch, setValue, setError, clearErrors } = useFormContext()

  const spendChainId = watch(fieldNamePrefix + 'chainId')
  const spendAmount = watch(fieldNamePrefix + 'amount')
  const spendDenom = watch(fieldNamePrefix + 'denom')

  const { bech32_prefix: bech32Prefix } = getChainForChainId(spendChainId)

  const validatePossibleSpend = useCallback(
    (chainId: string, denom: string, amount: string): string | boolean => {
      if (tokens.loading) {
        return true
      }

      const insufficientBalanceI18nKey =
        context.type === ActionContextType.Dao
          ? 'error.cantSpendMoreThanTreasury'
          : 'error.insufficientWalletBalance'

      const tokenBalance = tokens.data.find(
        ({ token }) =>
          token.chainId === chainId && token.denomOrAddress === denom
      )
      if (tokenBalance) {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          tokenBalance.token.decimals
        )

        return (
          microAmount <= Number(tokenBalance.balance) ||
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
        clearErrors(fieldNamePrefix + '_error')
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
        clearErrors(fieldNamePrefix + '_error')
      }
    } else if (typeof validation === 'string') {
      if (!currentError || currentError.message !== validation) {
        setError(fieldNamePrefix + '_error', {
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

  const { containerRef, childRef, wrapped } = useDetectWrap()
  const Icon = wrapped ? SubdirectoryArrowRightRounded : ArrowRightAltRounded

  return (
    <>
      <div
        className="flex min-w-0 flex-row flex-wrap items-stretch justify-between gap-x-3 gap-y-2"
        ref={containerRef}
      >
        <TokenInput
          amountError={errors?.amount}
          amountFieldName={fieldNamePrefix + 'amount'}
          amountMax={balance}
          amountMin={convertMicroDenomToDenomWithDecimals(
            1,
            selectedToken?.token.decimals ?? 0
          )}
          amountStep={convertMicroDenomToDenomWithDecimals(
            1,
            selectedToken?.token.decimals ?? 0
          )}
          onSelectToken={({ chainId, denomOrAddress }) => {
            setValue(fieldNamePrefix + 'chainId', chainId)
            setValue(fieldNamePrefix + 'denom', denomOrAddress)
          }}
          readOnly={!isCreating}
          register={register}
          selectedToken={selectedToken?.token}
          setValue={setValue}
          tokens={
            tokens.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: tokens.data.map(({ token }) => token),
                }
          }
          watch={watch}
        />

        <div
          className="flex min-w-0 grow flex-row items-stretch gap-2 sm:gap-3"
          ref={childRef}
        >
          <div
            className={clsx('flex flex-row items-center', wrapped && 'pl-1')}
          >
            <Icon className="!h-6 !w-6 text-text-secondary" />
          </div>

          {/* Change search address and placeholder based on chain. */}
          <ChainProvider chainId={spendChainId}>
            <AddressInput
              containerClassName="grow"
              disabled={!isCreating}
              error={errors?.to}
              fieldName={fieldNamePrefix + 'to'}
              register={register}
              validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
            />
          </ChainProvider>
        </div>
      </div>

      {(errors?.amount || errors?.denom || errors?.to || errors?._error) && (
        <div className="-mt-4 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={errors?.denom} />
          <InputErrorMessage error={errors?.to} />
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
