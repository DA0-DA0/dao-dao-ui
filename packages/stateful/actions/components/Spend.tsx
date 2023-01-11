import { Coin } from '@cosmjs/stargate'
import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import { ComponentType, useCallback, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputErrorMessage,
  MoneyEmoji,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import {
  ActionComponent,
  ActionOptionsContextType,
} from '@dao-dao/types/actions'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
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
  nativeBalances: readonly Coin[]
  cw20Balances: {
    address: string
    balance: string
    info: TokenInfoResponse
  }[]
  // Used to render pfpk or DAO profiles when selecting addresses.
  AddressInput: ComponentType<AddressInputProps>
}

export const SpendComponent: ActionComponent<SpendOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { nativeBalances, cw20Balances, AddressInput },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue, setError, clearErrors } = useFormContext()
  const { context } = useActionOptions()

  const spendAmount = watch(fieldNamePrefix + 'amount')
  const spendDenom = watch(fieldNamePrefix + 'denom')

  const validatePossibleSpend = useCallback(
    (id: string, amount: string): string | boolean => {
      const insufficientBalanceI18nKey =
        context.type === ActionOptionsContextType.Dao
          ? 'error.cantSpendMoreThanTreasury'
          : 'error.insufficientWalletBalance'

      const native = nativeBalances.find(({ denom }) => denom === id)
      if (native) {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          NATIVE_DECIMALS
        )
        return (
          microAmount <= Number(native.amount) ||
          t(insufficientBalanceI18nKey, {
            amount: convertMicroDenomToDenomWithDecimals(
              native.amount,
              NATIVE_DECIMALS
            ).toLocaleString(undefined, {
              maximumFractionDigits: NATIVE_DECIMALS,
            }),
            tokenSymbol: nativeTokenLabel(id),
          })
        )
      }
      const cw20 = cw20Balances.find(({ address }) => address === id)
      if (cw20) {
        const microAmount = convertDenomToMicroDenomWithDecimals(
          amount,
          cw20.info.decimals
        )
        return (
          microAmount <= Number(cw20.balance) ||
          t(insufficientBalanceI18nKey, {
            amount: convertMicroDenomToDenomWithDecimals(
              cw20.balance,
              cw20.info.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: cw20.info.decimals,
            }),
            tokenSymbol: cw20.info.symbol,
          })
        )
      }
      // If there are no native tokens in the treasury the native balances
      // query will return an empty list.
      if (id === NATIVE_DENOM) {
        return t(insufficientBalanceI18nKey, {
          amount: 0,
          tokenSymbol: nativeTokenLabel(NATIVE_DENOM),
        })
      }
      return 'Unrecognized denom.'
    },
    [context.type, cw20Balances, nativeBalances, t]
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

  const amountDecimals = useMemo(
    () =>
      cw20Balances.find(({ info }) => info.symbol === spendDenom)?.info
        ?.decimals ?? NATIVE_DECIMALS,
    [spendDenom, cw20Balances]
  )

  return (
    <ActionCard Icon={MoneyEmoji} onRemove={onRemove} title={t('title.spend')}>
      <div className="flex flex-col gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
        <div className="flex grow flex-row items-stretch gap-2">
          <NumberInput
            containerClassName="grow"
            disabled={!isCreating}
            error={errors?.amount}
            fieldName={fieldNamePrefix + 'amount'}
            onMinus={() =>
              setValue(
                fieldNamePrefix + 'amount',
                Math.max(
                  Number(spendAmount) - 1,
                  1 / 10 ** amountDecimals
                ).toString()
              )
            }
            onPlus={() =>
              setValue(
                fieldNamePrefix + 'amount',
                Math.max(
                  Number(spendAmount) + 1,
                  1 / 10 ** amountDecimals
                ).toString()
              )
            }
            register={register}
            sizing="auto"
            step={1 / 10 ** amountDecimals}
            validation={[validateRequired, validatePositive]}
          />

          <SelectInput
            defaultValue={NATIVE_DENOM}
            disabled={!isCreating}
            error={errors?.denom}
            fieldName={fieldNamePrefix + 'denom'}
            register={register}
            style={{ maxWidth: '8.2rem' }}
          >
            {nativeBalances.map(({ denom }) => (
              <option key={denom} value={denom}>
                ${nativeTokenLabel(denom)}
              </option>
            ))}
            {cw20Balances.map(({ address, info: { symbol } }) => (
              <option key={address} value={address}>
                ${symbol}
              </option>
            ))}
          </SelectInput>
        </div>

        <div className="flex grow flex-row items-stretch gap-2 sm:gap-3">
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

      <InputErrorMessage error={errors?.amount} />
      <InputErrorMessage error={errors?.denom} />
      <InputErrorMessage error={errors?.to} />
      <InputErrorMessage error={errors?._error} />
    </ActionCard>
  )
}
