import { Add, Close } from '@mui/icons-material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  IconButton,
  InputErrorMessage,
  InputLabel,
  TextInput,
  TokenInput,
  useChainContext,
} from '@dao-dao/stateless'
import { GenericToken } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  validateRequired,
} from '@dao-dao/utils'

import { NewSurveyFormData } from '../../types'

export interface NewAttributeProps {
  index: number
  onRemove: () => void
  availableTokens: GenericToken[]
}

export const NewAttribute = ({
  index: attributeIndex,
  onRemove,
  availableTokens,
}: NewAttributeProps) => {
  const { t } = useTranslation()
  const { nativeToken } = useChainContext()
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<NewSurveyFormData>()

  const {
    append: appendToken,
    remove: removeToken,
    fields: tokens,
  } = useFieldArray({
    control,
    name: `attributes.${attributeIndex}.tokens`,
  })

  // Returns the decimals for the given native denom or CW20 address.
  const getDecimalsForDenomOrAddress = (denomOrAddress: string) =>
    availableTokens.find((token) => token.denomOrAddress === denomOrAddress)
      ?.decimals ?? 0
  // Returns a label for the given native denom or CW20 address.
  const getLabelForDenomOrAddress = (denomOrAddress: string) =>
    availableTokens.find((token) => token.denomOrAddress === denomOrAddress)
      ?.symbol ?? t('info.token')

  // Combine tokens into readable list.
  const stringifiedTokens = (watch(`attributes.${attributeIndex}.tokens`) || [])
    .filter(({ amount }) => amount && !isNaN(Number(amount)))
    .map(
      ({ amount, denomOrAddress }) =>
        `${Number(amount).toLocaleString(undefined, {
          maximumFractionDigits: getDecimalsForDenomOrAddress(denomOrAddress),
        })} $${getLabelForDenomOrAddress(denomOrAddress)}`
    )
  const stringifiedTokensList =
    stringifiedTokens.length > 2
      ? stringifiedTokens.slice(0, -2).join(', ') +
        ', ' +
        stringifiedTokens.slice(-2).join(', and ')
      : stringifiedTokens.join(' and ')

  return (
    <div className="flex flex-col rounded-lg bg-background-tertiary">
      <div className="flex flex-col gap-y-2 gap-x-4 py-4 px-6">
        <div className="flex flex-row items-center justify-between">
          <InputLabel name={t('form.attributeName')} />

          <IconButton
            Icon={Close}
            onClick={onRemove}
            size="sm"
            variant="ghost"
          />
        </div>

        <div className="grow">
          <TextInput
            error={errors.attributes?.[attributeIndex]?.name}
            fieldName={`attributes.${attributeIndex}.name`}
            placeholder={t('form.attributeNamePlaceholder')}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage
            error={errors.attributes?.[attributeIndex]?.name}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border-secondary py-4 px-6">
        <p className="primary-text text-text-body">
          {t('form.whatDoWeDistributeQuestion')}
        </p>

        <div className="space-y-1">
          {tokens.map((token, tokenIndex) => {
            const denomOrAddressFieldName =
              `attributes.${attributeIndex}.tokens.${tokenIndex}.denomOrAddress` as const
            const denomOrAddress = watch(denomOrAddressFieldName)

            const selectedToken = availableTokens.find(
              (token) => token.denomOrAddress === denomOrAddress
            )

            return (
              <div
                key={token.id}
                className="flex flex-row gap-2 rounded-lg bg-background-tertiary p-4"
              >
                <TokenInput
                  amountError={
                    errors?.attributes?.[attributeIndex]?.tokens?.[tokenIndex]
                      ?.amount
                  }
                  amountFieldName={`attributes.${attributeIndex}.tokens.${tokenIndex}.amount`}
                  amountStep={convertMicroDenomToDenomWithDecimals(
                    1,
                    selectedToken?.decimals ?? 0
                  )}
                  onSelectToken={({ denomOrAddress }) =>
                    setValue(denomOrAddressFieldName, denomOrAddress)
                  }
                  register={register}
                  required={false}
                  selectedToken={selectedToken}
                  setValue={setValue}
                  tokens={{ loading: false, data: availableTokens }}
                  watch={watch}
                />

                <div className="flex flex-row items-center">
                  <IconButton
                    Icon={Close}
                    onClick={() => removeToken(tokenIndex)}
                    size="sm"
                    variant="ghost"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {stringifiedTokens.length > 0 && (
          <p className="legend-text">
            {t('info.tokensWillBeSplitAmongContributors', {
              tokens: stringifiedTokensList,
            })}
          </p>
        )}

        <Button
          className="self-start"
          onClick={() =>
            appendToken({
              denomOrAddress: nativeToken.denomOrAddress,
            })
          }
          variant="ghost"
        >
          <Add className="!h-4 !w-4" />
          {t('button.addToken')}
        </Button>
      </div>
    </div>
  )
}
