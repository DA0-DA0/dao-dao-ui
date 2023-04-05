import { Publish } from '@mui/icons-material'
import { ComponentType, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Checkbox,
  InputErrorMessage,
  InputLabel,
  MarkdownRenderer,
  RangeInput,
  TextAreaInput,
  TokenAmountDisplay,
  Tooltip,
} from '@dao-dao/stateless'
import { Entity, GenericTokenWithUsdPrice } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  formatDateTimeTz,
  validateRequired,
} from '@dao-dao/utils'

import { Status, SurveyStatus } from '../../types'

export type ContributionFormData = {
  contribution: string
  ratings: (number | null)[]
}

export interface ContributionFormProps {
  status: Status
  onSubmit: (data: ContributionFormData) => Promise<void>
  loading: boolean
  entity: Entity
  EntityDisplay: ComponentType
  tokenPrices: GenericTokenWithUsdPrice[]
}

export const ContributionForm = ({
  status: {
    survey,
    contribution: existingContribution,
    contributionSelfRatings,
  },
  onSubmit,
  loading,
  entity,
  EntityDisplay,
  tokenPrices,
}: ContributionFormProps) => {
  const { t } = useTranslation()

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ContributionFormData>({
    defaultValues: {
      contribution: existingContribution || '',
      ratings: contributionSelfRatings || survey.attributes.map(() => null),
    },
  })

  const contributed = !!existingContribution

  const ratings = watch('ratings')
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

  const dateText =
    survey.status === SurveyStatus.Inactive
      ? t('info.intakeOpensAtAndClosesAt', {
          openDate: formatDateTimeTz(new Date(survey.contributionsOpenAt)),
          closeDate: formatDateTimeTz(
            new Date(survey.contributionsCloseRatingsOpenAt)
          ),
        })
      : t('info.intakeClosesAt', {
          date: formatDateTimeTz(
            new Date(survey.contributionsCloseRatingsOpenAt)
          ),
        })

  return (
    <form
      className="flex grow flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Hidden on small screens. Moves below so it is centered with the column. */}
      <div className="hidden max-w-prose space-y-1 break-words lg:block">
        <p className="hero-text">{survey.name}</p>
        <p className="caption-text italic">{dateText}</p>
      </div>

      <div className="mx-auto flex max-w-prose flex-col gap-6 lg:mx-0 lg:max-w-full lg:flex-row">
        {/* Hidden on large screens. Moves to top so it is above both the markdown and the contribution form. */}
        <div className="space-y-1 break-words lg:hidden">
          <p className="hero-text">{survey.name}</p>
          <p className="caption-text italic">{dateText}</p>
        </div>

        <MarkdownRenderer
          className="min-w-0"
          markdown={survey.contributionInstructions}
        />

        <div className="flex min-w-[18rem] grow flex-col gap-4 pb-10">
          <div className="flex flex-col gap-2">
            <p className="primary-text text-text-body">
              {t('title.yourSubmission')}
            </p>

            <EntityDisplay />

            {!entity.name && (
              <p className="caption-text text-text-interactive-error">
                {t('error.compensationCycleNeedsProfileName')}
              </p>
            )}
          </div>

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
                {t('info.howWouldYouLikeToBeCompensated')}
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
                                dateFetched={
                                  tokenMap[denomOrAddress]?.timestamp
                                }
                                decimals={
                                  tokenMap[denomOrAddress]?.token.decimals ?? 0
                                }
                                iconUrl={
                                  tokenMap[denomOrAddress]?.token.imageUrl
                                }
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

          {contributed && (
            <p className="caption-text self-end text-right text-text-interactive-valid">
              {t('form.contributionSubmitted')}
            </p>
          )}

          {survey.status === SurveyStatus.Inactive && (
            <p className="caption-text self-end text-right text-text-interactive-error">
              {t('info.intakeOpensAt', {
                date: formatDateTimeTz(new Date(survey.contributionsOpenAt)),
              })}
            </p>
          )}

          <Tooltip
            title={
              survey.status === SurveyStatus.Inactive
                ? t('info.intakeOpensAt', {
                    date: formatDateTimeTz(
                      new Date(survey.contributionsOpenAt)
                    ),
                  })
                : !entity.name
                ? t('error.compensationCycleNeedsProfileName')
                : undefined
            }
          >
            <Button
              className="self-end"
              disabled={survey.status === SurveyStatus.Inactive || !entity.name}
              loading={loading}
              type="submit"
            >
              <p>{contributed ? t('button.update') : t('button.submit')}</p>
              <Publish className="!h-4 !w-4" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
