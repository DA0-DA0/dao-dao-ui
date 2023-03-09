import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
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

import { Button } from '../buttons'
import { FilterableItemPopup } from '../popup'
import { InputThemedText } from './InputThemedText'
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
  // The pair of `type` and `denomOrAddress` must be unique for each token.
  tokens: LoadingData<T[]>
  onSelectToken: (token: T) => void
  selectedToken: Pick<T, 'type' | 'denomOrAddress'> | undefined
  tokenFallback?: ReactNode
  readOnly?: boolean
  containerClassName?: string
}

export const TokenInput = <
  T extends TokenInputOption,
  FV extends FieldValues = FieldValues,
  FieldName extends Path<FV> = Path<FV>
>({
  register,
  watch,
  setValue,
  amountFieldName,
  amountError,
  amountMin,
  amountMax,
  amountStep,
  tokens,
  onSelectToken,
  selectedToken: _selectedToken,
  tokenFallback,
  readOnly,
  containerClassName,
}: TokenInputProps<T, FV, FieldName>) => {
  const { t } = useTranslation()

  const selectedToken =
    tokens.loading || !_selectedToken
      ? undefined
      : tokens.data.find((token) => token === _selectedToken)

  const amount = Number(watch(amountFieldName))

  const selectedTokenDisplay = selectedToken ? (
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

      <p>{selectedToken.symbol}</p>
    </div>
  ) : (
    tokenFallback ?? (
      <p className="text-text-secondary">
        {readOnly
          ? t('info.token', { count: amount })
          : t('button.selectToken')}
      </p>
    )
  )

  return (
    <div
      className={clsx(
        'flex max-w-md flex-row flex-wrap items-stretch gap-1',
        containerClassName
      )}
    >
      {readOnly ? (
        <>
          <InputThemedText>
            <p>
              {amount.toLocaleString(undefined, {
                // Show as many decimals as possible (max is 20).
                maximumFractionDigits: 20,
              })}
            </p>

            {selectedTokenDisplay}
          </InputThemedText>
        </>
      ) : (
        <>
          <NumberInput
            containerClassName="min-w-[12rem] grow basis-[12rem]"
            error={amountError}
            fieldName={amountFieldName}
            max={amountMax}
            min={amountMin}
            register={register}
            setValue={(fieldName, value) => setValue(fieldName, value as any)}
            step={amountStep}
            validation={[
              validateRequired,
              amountMin === 0 ? validateNonNegative : validatePositive,
            ]}
            watch={watch}
          />

          <FilterableItemPopup
            Trigger={({ open, ...props }) => (
              <Button
                className="min-w-[10rem] grow basis-[10rem]"
                contentContainerClassName="justify-between text-icon-primary !gap-4"
                loading={tokens.loading}
                pressed={open}
                size="lg"
                variant="secondary"
                {...props}
              >
                {selectedTokenDisplay}

                <ArrowDropDown className="!h-6 !w-6" />
              </Button>
            )}
            filterableItemKeys={FILTERABLE_KEYS}
            items={
              tokens.loading
                ? []
                : tokens.data.map((token, index) => ({
                    key: index + token.denomOrAddress,
                    label: token.symbol,
                    Icon: token.imageUrl
                      ? () => (
                          <div
                            className="h-8 w-8 rounded-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${token.imageUrl})`,
                            }}
                          />
                        )
                      : undefined,
                    ...token,
                  }))
            }
            onSelect={onSelectToken}
            searchPlaceholder={t('info.searchForToken')}
          />
        </>
      )}
    </div>
  )
}

const FILTERABLE_KEYS = ['key', 'label', 'description']
