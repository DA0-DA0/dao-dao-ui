import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import { ComponentType, useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputErrorMessage,
  MoneyEmoji,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import { AddressInputProps, GenericTokenBalance } from '@dao-dao/types'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../react'
import { ActionCard } from './ActionCard'

export interface SpendData {
  to: string
  amount: number
  denom: string
}

export interface SpendOptions {
  tokens: GenericTokenBalance[]
  // Used to render pfpk or DAO profiles when selecting addresses.
  AddressInput: ComponentType<AddressInputProps>
}

export const SpendComponent: ActionComponent<SpendOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { tokens, AddressInput },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue, setError, clearErrors } = useFormContext()
  const { context } = useActionOptions()

  const spendAmount = watch(fieldNamePrefix + 'amount')
  const spendDenom = watch(fieldNamePrefix + 'denom')

  const validatePossibleSpend = useCallback(
    (id: string, amount: string): string | boolean => {
      const insufficientBalanceI18nKey =
        context.type === ActionContextType.Dao
          ? 'error.cantSpendMoreThanTreasury'
          : 'error.insufficientWalletBalance'

      const tokenBalance = tokens.find(
        ({ token: { denomOrAddress } }) => denomOrAddress === id
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

      // Just in case native denom not in list.
      if (id === NATIVE_DENOM) {
        return t(insufficientBalanceI18nKey, {
          amount: 0,
          tokenSymbol: nativeTokenLabel(NATIVE_DENOM),
        })
      }

      return t('error.unknownDenom', { denom: id })
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

    const validation = validatePossibleSpend(spendDenom, spendAmount)
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
  ])

  const amountDecimals =
    tokens.find(({ token }) => token.symbol === spendDenom)?.token.decimals ??
    NATIVE_DECIMALS

  return (
    <ActionCard Icon={MoneyEmoji} onRemove={onRemove} title={t('title.spend')}>
      <div className="flex min-w-0 flex-col flex-wrap gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
        <div className="flex grow flex-row items-stretch gap-2">
          <NumberInput
            containerClassName="grow"
            disabled={!isCreating}
            error={errors?.amount}
            fieldName={fieldNamePrefix + 'amount'}
            min={1 / 10 ** amountDecimals}
            register={register}
            setValue={setValue}
            sizing="auto"
            step={1 / 10 ** amountDecimals}
            validation={[validateRequired, validatePositive]}
            watch={watch}
          />

          <SelectInput
            defaultValue={NATIVE_DENOM}
            disabled={!isCreating}
            error={errors?.denom}
            fieldName={fieldNamePrefix + 'denom'}
            register={register}
            style={{ maxWidth: '8.2rem' }}
          >
            {tokens.map(({ token: { denomOrAddress, symbol } }) => (
              <option key={denomOrAddress} value={denomOrAddress}>
                ${symbol}
              </option>
            ))}
          </SelectInput>
        </div>

        <div className="flex min-w-0 grow flex-row items-stretch gap-2 sm:gap-3">
          <div className="flex flex-row items-center pl-1 sm:pl-0">
            <ArrowRightAltRounded className="!hidden !h-6 !w-6 text-text-secondary sm:!block" />
            <SubdirectoryArrowRightRounded className="!h-4 !w-4 text-text-secondary sm:!hidden" />
          </div>

          <AddressInput
            containerClassName="grow"
            disabled={!isCreating}
            error={errors?.to}
            fieldName={fieldNamePrefix + 'to'}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
        </div>
      </div>

      {(errors?.amount || errors?.denom || errors?.to || errors?._error) && (
        <div className="-mt-2 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={errors?.denom} />
          <InputErrorMessage error={errors?.to} />
          <InputErrorMessage error={errors?._error} />
        </div>
      )}
    </ActionCard>
  )
}
