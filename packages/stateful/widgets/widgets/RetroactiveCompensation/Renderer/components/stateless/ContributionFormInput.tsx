import { useMemo } from 'react'
import {
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Checkbox,
  InputErrorMessage,
  InputLabel,
  RangeInput,
  TextAreaInput,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import { GenericTokenWithUsdPrice } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  validateRequired,
} from '@dao-dao/utils'

import { Survey } from '../../types'

export type ContributionFormData = {
  contribution: string
  ratings: (number | null)[]
}

export type ContributionFormInputProps = {
  survey: Survey
  register: UseFormRegister<ContributionFormData>
  watch: UseFormWatch<ContributionFormData>
  setValue: UseFormSetValue<ContributionFormData>
  errors: FormState<ContributionFormData>['errors']
  tokenPrices: GenericTokenWithUsdPrice[]
  thirdPerson?: boolean
}

export const ContributionFormInput = ({
  survey,
  register,
  watch,
  setValue,
  errors,
  tokenPrices,
  thirdPerson,
}: ContributionFormInputProps) => {
  const { t } = useTranslation()

  const ratings = watch('ratings', [])
  const allRatingsAbstain = ratings.every((rating) => rating === null)
  const toggleAbstain = () =>
    allRatingsAbstain
      ? setValue(
          'ratings',
          [...Array(survey.attributes.length)].map(() => 0)
        )
      : setValue(
          'ratings',
          [...Array(survey.attributes.length)].map(() => null)
        )

  // Map token denom to price info.
  const tokenMap = useMemo(
    () =>
      tokenPrices.reduce(
        (acc, tokenInfo) => ({
          ...acc,
          [tokenInfo.token.denomOrAddress]: tokenInfo,
        }),
        {} as Record<string, GenericTokenWithUsdPrice>
      ),
    [tokenPrices]
  )

  return (
    <>
      <div className="flex flex-col">
        <TextAreaInput
          error={errors.contribution}
          fieldName="contribution"
          placeholder={t('form.iContributedPlaceholder')}
          register={register}
          rows={10}
          validation={[validateRequired]}
        />
        <InputErrorMessage error={errors.contribution} />
      </div>

      <div className="mt-2 flex flex-col gap-4">
        <div className="flex flex-row flex-wrap items-center gap-6">
          <p className="primary-text text-text-body">
            {thirdPerson
              ? t('info.howWouldTheyLikeToBeCompensated')
              : t('info.howWouldYouLikeToBeCompensated')}
          </p>

          <div className="flex flex-row items-center gap-2">
            <Checkbox
              checked={allRatingsAbstain}
              onClick={toggleAbstain}
              size="sm"
            />

            <p
              className="body-text cursor-pointer text-xs"
              onClick={toggleAbstain}
            >
              {t('info.dontKnowNotSure')}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-stretch gap-4">
          {survey.attributes.map(
            ({ name, nativeTokens, cw20Tokens }, attributeIndex) => {
              // Map token denom or address to amount to distribute.
              const tokens =
                [...nativeTokens, ...cw20Tokens].reduce(
                  (acc, nativeOrCw20Token) => {
                    const denomOrAddress =
                      'denom' in nativeOrCw20Token
                        ? nativeOrCw20Token.denom
                        : nativeOrCw20Token.address

                    return {
                      ...acc,
                      [denomOrAddress]:
                        (acc[denomOrAddress] ?? 0) +
                        convertMicroDenomToDenomWithDecimals(
                          nativeOrCw20Token.amount,
                          tokenMap[denomOrAddress]?.token.decimals ?? 0
                        ) *
                          // Multiply by the proportion of the rating they
                          // set.
                          ((ratings[attributeIndex] ?? 0) / 100),
                    }
                  },
                  {} as Record<string, number>
                ) ?? []

              const totalUsdc = Object.entries(tokens)
                .map(
                  ([denomOrAddress, amount]) =>
                    (tokenMap[denomOrAddress]?.usdPrice ?? 0) * amount
                )
                .reduce((acc, amount) => acc + amount, 0)

              return (
                <div key={attributeIndex}>
                  <InputLabel name={name} />

                  <RangeInput
                    className="mt-1 !h-20 w-40"
                    fieldName={`ratings.${attributeIndex}`}
                    max={100}
                    min={0}
                    onStartChange={
                      // If starting to change, unset abstaining for
                      // all.
                      allRatingsAbstain ? toggleAbstain : undefined
                    }
                    setValue={setValue}
                    watch={watch}
                  />

                  {!allRatingsAbstain && (
                    <div className="mt-4">
                      {Object.entries(tokens).map(
                        ([denomOrAddress, amount], index) => (
                          <TokenAmountDisplay
                            key={index}
                            amount={amount}
                            className="text-right"
                            dateFetched={tokenMap[denomOrAddress]?.timestamp}
                            decimals={
                              tokenMap[denomOrAddress]?.token.decimals ?? 0
                            }
                            iconUrl={tokenMap[denomOrAddress]?.token.imageUrl}
                            symbol={
                              tokenMap[denomOrAddress]?.token.symbol ??
                              denomOrAddress
                            }
                          />
                        )
                      )}

                      <div className="mt-2">
                        <TokenAmountDisplay
                          amount={totalUsdc}
                          className="caption-text text-right"
                          dateFetched={tokenPrices[0]?.timestamp}
                          estimatedUsdValue
                          hideApprox
                          prefix="= "
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            }
          )}
        </div>
      </div>
    </>
  )
}
