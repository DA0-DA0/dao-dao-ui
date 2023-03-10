import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode, useMemo } from 'react'
import {
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Validate,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { GenericToken, LoadingData, TokenType } from '@dao-dao/types'
import {
  getFallbackImage,
  toAccessibleImageUrl,
  validateNonNegative,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { FilterableItemPopup } from '../popup'
import { NumberInput } from './NumberInput'

export type TokenInputOption = Omit<GenericToken, 'type' | 'decimals'> & {
  type: TokenType | string
  description?: string
}

export type TokenInputProps<
  T extends TokenInputOption,
  FV extends FieldValues = FieldValues,
  FieldName extends Path<FV> = Path<FV>
> = {
  register: UseFormRegister<FV>
  watch: UseFormWatch<FV>
  setValue: UseFormSetValue<FV>
  amountFieldName: FieldName
  amountError?: FieldError
  amountMin?: number
  amountMax?: number
  amountStep?: number
  amountValidations?: Validate<FieldPathValue<FV, FieldName>>[]
  // The pair of `type` and `denomOrAddress` must be unique for each token.
  tokens: LoadingData<T[]>
  onSelectToken: (token: T) => void
  selectedToken: Pick<T, 'type' | 'denomOrAddress'> | undefined
  tokenFallback?: ReactNode
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  containerClassName?: string
}

/**
 * A component for specifying an amount and a token. This should be used
 * whenever an amount of a variable choice token is needed. See example usage in
 * the Spend action component.
 */
export const TokenInput = <
  T extends TokenInputOption,
  FV extends FieldValues = FieldValues,
  FieldName extends Path<FV> = Path<FV>
>({
  // The form fields that register the amount field and watch for changes.
  register,
  watch,
  setValue,
  amountFieldName,
  amountError,
  amountMin,
  amountMax,
  amountStep,
  amountValidations,
  // The available tokens and selection handlers for the token. Various
  // use-cases exist for this component, so the token selection is left up to
  // the caller instead of being handled internally like the amount field.
  tokens,
  onSelectToken,
  selectedToken: _selectedToken,
  // Fallback when no token is selected. If nothing is provided, a placeholder
  // text will be shown instead ("Select token").
  tokenFallback,
  // Whether or not the inputs are editable. This is different from read-only
  // below. Disabled is a more temporary input state, potentially due to a
  // dependency on some other field, for example.
  disabled,
  // If read-only, the inputs will be replaced with a nice display of the
  // selected token and amount.
  readOnly,
  // This only applies to the amount field.
  required = true,
  // Optional additional class names for the container.
  containerClassName,
}: TokenInputProps<T, FV, FieldName>) => {
  const { t } = useTranslation()

  const selectedToken =
    tokens.loading || !_selectedToken
      ? undefined
      : tokens.data.find((token) => token === _selectedToken)

  const amount = Number(watch(amountFieldName))

  const selectedTokenDisplay = useMemo(
    () =>
      selectedToken ? (
        <div className="flex flex-row items-center gap-2">
          <div
            className="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${toAccessibleImageUrl(
                selectedToken.imageUrl ||
                  getFallbackImage(selectedToken.denomOrAddress)
              )})`,
            }}
          />

          <p>
            {readOnly &&
              amount.toLocaleString(undefined, {
                // Show as many decimals as possible (max is 20).
                maximumFractionDigits: 20,
              }) + ' '}
            {selectedToken.symbol}
          </p>
        </div>
      ) : (
        tokenFallback ?? (
          <p className="text-text-secondary">
            {readOnly
              ? t('info.token', { count: amount })
              : t('button.selectToken')}
          </p>
        )
      ),
    [amount, readOnly, selectedToken, t, tokenFallback]
  )

  return (
    <div
      className={clsx(
        'flex max-w-md flex-row flex-wrap items-stretch gap-1',
        containerClassName
      )}
    >
      {readOnly ? (
        selectedTokenDisplay
      ) : (
        <>
          <NumberInput
            containerClassName="min-w-[12rem] grow basis-[12rem]"
            disabled={disabled}
            error={amountError}
            fieldName={amountFieldName}
            max={amountMax}
            min={amountMin}
            register={register}
            setValue={(fieldName, value) => setValue(fieldName, value as any)}
            step={amountStep}
            validation={[
              amountMin ? validatePositive : validateNonNegative,

              ...(required ? [validateRequired] : []),
              ...(amountValidations ?? []),
            ]}
            watch={watch}
          />

          <FilterableItemPopup
            filterableItemKeys={FILTERABLE_KEYS}
            items={
              tokens.loading
                ? []
                : tokens.data.map((token, index) => ({
                    key: index + token.denomOrAddress,
                    label: token.symbol,
                    iconUrl:
                      token.imageUrl || getFallbackImage(token.denomOrAddress),
                    ...token,
                  }))
            }
            onSelect={(token) => onSelectToken(token as T)}
            searchPlaceholder={t('info.searchForToken')}
            trigger={{
              type: 'button',
              props: {
                className: 'min-w-[10rem] grow basis-[10rem]',
                contentContainerClassName:
                  'justify-between text-icon-primary !gap-4',
                disabled: disabled,
                loading: tokens.loading,
                size: 'lg',
                variant: 'ghost_outline',
                children: (
                  <>
                    {selectedTokenDisplay}

                    <ArrowDropDown className="!h-6 !w-6" />
                  </>
                ),
              },
            }}
          />
        </>
      )}
    </div>
  )
}

const FILTERABLE_KEYS = ['key', 'label', 'description']
