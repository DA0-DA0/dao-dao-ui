import { Publish } from '@mui/icons-material'
import { ComponentType, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  Button,
  Checkbox,
  InputErrorMessage,
  InputLabel,
  MarkdownRenderer,
  RangeInput,
  TokenAmountDisplay,
  useChain,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  GenericTokenWithUsdPrice,
  LoadingDataWithError,
  StatefulEntityDisplayProps,
  TransProps,
} from '@dao-dao/types'
import {
  formatDateTimeTz,
  makeValidateAddress,
  transformIpfsUrlToHttpsIfNecessary,
  validateRequired,
} from '@dao-dao/utils'

import {
  Contribution,
  ContributionCompensation,
  ContributionFormData,
  ContributionRating,
  RatingsFormData,
  SurveyWithMetadata,
} from '../../../../types'
import {
  computeCompensation,
  extractContributionFormDataFromSurvey,
} from '../../../../utils'
import { ContributionFormInput } from '../../ContributionFormInput'

export type SurveyContributionRatingState = {
  contributions: Contribution[]
  existingRatings: ContributionRating[]
}

export type NominationForm = ContributionFormData & {
  contributor: string
}

export type RateProps = {
  /**
   * The active survey.
   */
  status: SurveyWithMetadata
  /**
   * The survey contributions and existing ratings. If undefined, info has not
   * yet been loaded.
   */
  state: SurveyContributionRatingState | undefined
  /**
   * Whether or not the state is loading.
   */
  loadingState: boolean
  /**
   * Function to load the state.
   */
  loadState: () => void
  /**
   * Whether or not the current wallet can rate.
   */
  canRate: LoadingDataWithError<boolean>
  /**
   * Callback to submit form data.
   */
  onSubmit: (data: RatingsFormData) => Promise<void>
  /**
   * Whether or not the form is being submitted.
   */
  loadingSubmit: boolean
  /**
   * The prices for tokens distributed in this survey.
   */
  tokenPrices: GenericTokenWithUsdPrice[]
  /**
   * Callback to nominate a new contributor.
   */
  onNominate: (data: NominationForm) => Promise<void>
  /**
   * Whether or not the nominate form is being submitted.
   */
  loadingNominate: boolean
  /**
   * Stateful entity display component.
   */
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  /**
   * Stateful address input component.
   */
  AddressInput: ComponentType<AddressInputProps<NominationForm>>
  /**
   * Stateful i18n translation component.
   */
  Trans: ComponentType<TransProps>
}

export const Rate = ({
  status,
  state,
  loadingState,
  loadState,
  canRate,
  onSubmit,
  loadingSubmit,
  EntityDisplay,
  AddressInput,
  Trans,
  tokenPrices,
  onNominate,
  loadingNominate,
}: RateProps) => {
  const { survey } = status

  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix } = useChain()

  const { watch, setValue, handleSubmit, reset } = useForm<RatingsFormData>({
    defaultValues: {
      ratings: [],
    },
  })

  // When contributions load, set the default form values.
  const ratings = watch('ratings')
  useEffect(() => {
    if (state && ratings.length !== state.contributions.length) {
      reset({
        ratings: state.contributions.map(({ id }) => ({
          contributionId: id,
          // Weight doesn't matter since it's a projection based on one rating.
          weight: 1,
          attributes: [
            // Try to find existing rating.
            ...(state.existingRatings.find(
              ({ contributionId }) => contributionId === id
            )?.attributes ??
              // Default to abstain.
              survey.attributes.map(() => null)),
          ],
        })),
      })
    }
  }, [state, ratings, reset, survey.attributes])

  // Compute compensation for each contribution to display projection.
  const compensation: ContributionCompensation[] = state
    ? computeCompensation(
        state.contributions.map(({ id }) => id),
        ratings,
        survey.attributes
      )
    : []

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

  const nominationFormMethods = useForm<NominationForm>({
    defaultValues: {
      contribution: '',
      files: [],
      ratings: survey.attributes.map(() => null),
    },
  })

  // Form used to display submission.
  const submissionFormMethods = useForm<ContributionFormData>({
    defaultValues: extractContributionFormDataFromSurvey(status),
  })

  return (
    <div className="grow flex flex-col gap-6">
      <div className="max-w-prose space-y-1 break-words">
        <p className="hero-text">{survey.name}</p>
        <p className="caption-text italic">
          {t('info.ratingClosesAt', {
            date: formatDateTimeTz(new Date(survey.ratingsCloseAt)),
          })}
        </p>
      </div>

      {/* Match style of submit and rate forms with markdown instructions at the top under the title. */}
      <MarkdownRenderer
        className="-mt-2"
        markdown={t('info.compensationCycleAwaitingRating', {
          context:
            canRate.loading || canRate.errored || !canRate.data
              ? 'notMember'
              : 'member',
        })}
      />

      {!state ? (
        <>
          {!canRate.loading &&
            (canRate.errored ? (
              <p className="primary-text text-text-interactive-error">
                {t('error.failedToLoadMembershipRefreshPage')}
              </p>
            ) : (
              canRate.data && (
                <Button
                  className="self-start"
                  loading={loadingState}
                  onClick={loadState}
                  variant="primary"
                >
                  {t('button.beginRating')}
                </Button>
              )
            ))}

          <p className="title-text -mb-4">{t('title.yourSubmission')}</p>
          <div className="flex flex-col gap-2 bg-background-tertiary rounded-md p-4">
            {status.contribution ? (
              <div className="flex flex-col gap-2">
                <FormProvider {...submissionFormMethods}>
                  <ContributionFormInput
                    Trans={Trans}
                    readOnly
                    survey={survey}
                  />
                </FormProvider>
              </div>
            ) : (
              <p className="secondary-text">
                {t('info.retroactiveDidNotSubmit')}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="header-text -mb-2">{t('title.rate')}</p>

          <MarkdownRenderer markdown={survey.ratingInstructions} />

          <form
            className="flex flex-col gap-4 pb-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              className="flex flex-col gap-2 rounded-md"
              // Column for contributor, each attribute, what they would like,
              // and projected compenstaion.
              style={{
                gridTemplateColumns: `1fr auto ${survey.attributes
                  .map(() => 'auto')
                  .join(' ')} auto`,
              }}
            >
              {state.contributions.map((contribution, contributionIndex) => {
                const compensationForContribution =
                  compensation[contributionIndex].compensationPerAttribute
                const projectedTokens = compensationForContribution
                  .flatMap(({ cw20Tokens, nativeTokens }) => [
                    ...nativeTokens,
                    ...cw20Tokens,
                  ])
                  .reduce(
                    (acc, { denomOrAddress, amount }) => ({
                      ...acc,
                      [denomOrAddress]: (
                        acc[denomOrAddress] ?? HugeDecimal.zero
                      ).plus(amount),
                    }),
                    {} as Record<string, HugeDecimal>
                  )
                const projectedTotalUsdc = Object.entries(projectedTokens)
                  .map(([denomOrAddress, amount]) =>
                    amount
                      .times(tokenMap[denomOrAddress]?.usdPrice ?? 0)
                      .toHumanReadableNumber(
                        tokenMap[denomOrAddress]?.token.decimals ?? 0
                      )
                  )
                  .reduce((acc, amount) => acc + amount, 0)

                const attributeRatingsFieldName =
                  `ratings.${contributionIndex}.attributes` as const
                const attributeRatings = watch(attributeRatingsFieldName) || []
                const allRatingsAbstain = attributeRatings.every(
                  (rating) => rating === null
                )
                const toggleAbstain = () =>
                  allRatingsAbstain
                    ? setValue(
                        attributeRatingsFieldName,
                        [...Array(survey.attributes.length)].map(() => 0)
                      )
                    : setValue(
                        attributeRatingsFieldName,
                        [...Array(survey.attributes.length)].map(() => null)
                      )

                return (
                  <div
                    key={contribution.id}
                    className="flex flex-col rounded-md border border-border-primary bg-background-secondary"
                  >
                    <div className="flex flex-col gap-2 p-4">
                      <EntityDisplay
                        address={contribution.contributor.address}
                      />

                      <MarkdownRenderer
                        className="styled-scrollbar max-h-96 !max-w-full overflow-y-auto py-2 px-2"
                        markdown={[
                          contribution.content,
                          // Add images and links to files below content.
                          ...(contribution.files?.map(
                            ({ name, url, mimetype }) =>
                              `${mimetype.startsWith('image') ? '!' : ''}[${
                                name || url
                              }](${transformIpfsUrlToHttpsIfNecessary(url)})`
                          ) || []),
                        ].join('\n\n')}
                      />
                    </div>

                    <div className="flex flex-col gap-2 border-t border-border-secondary py-4 px-6">
                      <div className="mb-6 flex flex-row items-center gap-2">
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

                      {survey.attributes.map(({ name }, attributeIndex) => (
                        <div
                          key={attributeIndex}
                          className="flex flex-row flex-wrap items-start justify-between gap-x-8 gap-y-4"
                        >
                          <div className="space-y-1">
                            <p className="link-text">{name}</p>

                            {/* What they feel they should be rated */}
                            {contribution.ratings?.[attributeIndex] !==
                              null && (
                              <p className="secondary-text">
                                {t('title.requestedRating')}:{' '}
                                {contribution.ratings?.[attributeIndex]}
                              </p>
                            )}
                          </div>

                          <RangeInput
                            className="!h-20 min-w-[min(10rem,100%)] max-w-2xl grow"
                            fieldName={`ratings.${contributionIndex}.attributes.${attributeIndex}`}
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
                        </div>
                      ))}
                    </div>

                    {/* Projected compensation */}
                    {!allRatingsAbstain && (
                      <div className="flex flex-row flex-wrap items-start justify-between gap-x-8 gap-y-4 border-t border-border-secondary py-4 px-6">
                        <p className="link-text">
                          {t('title.projectedCompensation')}
                        </p>

                        <div className="flex flex-col gap-2">
                          {Object.entries(projectedTokens).map(
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

                          <div className="mt-1">
                            <TokenAmountDisplay
                              amount={projectedTotalUsdc}
                              className="caption-text text-right"
                              dateFetched={tokenPrices[0]?.timestamp}
                              estimatedUsdValue
                              prefix="= "
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {status.rated && (
              <p className="caption-text self-end text-right text-text-interactive-valid">
                {t('form.ratingsSubmitted')}
              </p>
            )}

            <Button
              className="self-end"
              disabled={loadingNominate}
              loading={loadingSubmit}
              type="submit"
            >
              <p>{status.rated ? t('button.update') : t('button.submit')}</p>
              <Publish className="!h-4 !w-4" />
            </Button>
          </form>

          <div className="flex flex-col rounded-lg bg-background-tertiary p-6">
            <p className="title-text mb-2">{t('title.nominateContributor')}</p>
            <MarkdownRenderer
              markdown={t('info.nominateContributorDescription')}
            />

            <FormProvider {...nominationFormMethods}>
              <form
                className="mt-6 flex flex-col gap-4"
                onSubmit={nominationFormMethods.handleSubmit(onNominate)}
              >
                <div className="space-y-1">
                  <InputLabel name={t('form.contributorAddress')} />
                  <AddressInput
                    containerClassName="grow"
                    error={nominationFormMethods.formState.errors?.contributor}
                    fieldName="contributor"
                    register={nominationFormMethods.register}
                    setValue={nominationFormMethods.setValue}
                    validation={[
                      validateRequired,
                      makeValidateAddress(bech32Prefix),
                    ]}
                    watch={nominationFormMethods.watch}
                  />
                  <InputErrorMessage
                    error={nominationFormMethods.formState.errors?.contributor}
                  />
                </div>

                <ContributionFormInput
                  Trans={Trans}
                  survey={survey}
                  thirdPerson
                />

                <Button
                  className="self-end"
                  disabled={loadingSubmit}
                  loading={loadingNominate}
                  type="submit"
                >
                  {t('button.nominate')}
                  <Publish className="!h-4 !w-4" />
                </Button>
              </form>
            </FormProvider>
          </div>
        </>
      )}
    </div>
  )
}
