import { Add, Close } from '@mui/icons-material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  IconButton,
  InputErrorMessage,
  NumberInput,
  SelectInput,
  TextInput,
} from '@dao-dao/stateless'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import {
  NATIVE_DENOM,
  nativeTokenDecimals,
  nativeTokenLabel,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { NewSurveyFormData } from '../../types'

export interface NewAttributeProps {
  index: number
  onRemove: () => void
  nativeDenoms: string[]
  cw20TokenInfos: {
    address: string
    info: TokenInfoResponse
  }[]
}

export const NewAttribute = ({
  index: attributeIndex,
  onRemove,
  nativeDenoms,
  cw20TokenInfos,
}: NewAttributeProps) => {
  const { t } = useTranslation()
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
    cw20TokenInfos.find(({ address }) => address === denomOrAddress)?.info
      ?.decimals ??
    nativeTokenDecimals(denomOrAddress) ??
    0
  // Returns a label for the given native denom or CW20 address.
  const getLabelForDenomOrAddress = (denomOrAddress: string) =>
    cw20TokenInfos.find(({ address }) => address === denomOrAddress)?.info
      .symbol ?? nativeTokenLabel(denomOrAddress)

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
      <div className="flex flex-col gap-y-2 gap-x-4 py-4 pl-6 pr-6 sm:flex-row sm:items-center sm:pr-4">
        <div className="flex flex-row items-center justify-between">
          <p className="primary-text text-text-body">
            {t('form.attributeName')}
          </p>

          <IconButton
            Icon={Close}
            className="xs:hidden"
            onClick={onRemove}
            size="sm"
            variant="ghost"
          />
        </div>

        <div className="flex grow flex-row items-center gap-4">
          <div className="flex grow flex-col">
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

          <IconButton
            Icon={Close}
            className="hidden xs:block"
            onClick={onRemove}
            size="sm"
            variant="ghost"
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

            const decimals = getDecimalsForDenomOrAddress(denomOrAddress)

            return (
              <div
                key={token.id}
                className="flex flex-row gap-2 rounded-lg bg-background-tertiary p-4"
              >
                <NumberInput
                  containerClassName="grow"
                  error={
                    errors?.attributes?.[attributeIndex]?.tokens?.[tokenIndex]
                      ?.amount
                  }
                  fieldName={`attributes.${attributeIndex}.tokens.${tokenIndex}.amount`}
                  onMinus={() =>
                    setValue(
                      `attributes.${attributeIndex}.tokens.${tokenIndex}.amount`,
                      Math.max(
                        (Number(
                          watch(
                            `attributes.${attributeIndex}.tokens.${tokenIndex}.amount`
                          )
                        ) || 0) - 1,
                        Math.pow(10, -decimals)
                      ).toString()
                    )
                  }
                  onPlus={() =>
                    setValue(
                      `attributes.${attributeIndex}.tokens.${tokenIndex}.amount`,
                      Math.max(
                        (Number(
                          watch(
                            `attributes.${attributeIndex}.tokens.${tokenIndex}.amount`
                          )
                        ) || 0) + 1,
                        Math.pow(10, -decimals)
                      ).toString()
                    )
                  }
                  register={register}
                  sizing="auto"
                  step={Math.pow(10, -decimals)}
                  validation={[validateRequired, validatePositive]}
                />

                <SelectInput
                  defaultValue={NATIVE_DENOM}
                  error={
                    errors?.attributes?.[attributeIndex]?.tokens?.[tokenIndex]
                      ?.denomOrAddress
                  }
                  fieldName={denomOrAddressFieldName}
                  register={register}
                >
                  {nativeDenoms.map((denom) => (
                    <option key={denom} value={denom}>
                      ${nativeTokenLabel(denom)}
                    </option>
                  ))}
                  {cw20TokenInfos.map(({ address, info: { symbol } }) => (
                    <option key={address} value={address}>
                      ${symbol}
                    </option>
                  ))}
                </SelectInput>

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
              denomOrAddress: nativeDenoms[0],
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
