import { Publish } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Checkbox,
  InputErrorMessage,
  InputLabel,
  MarkdownRenderer,
  RangeInput,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  GenericTokenWithUsdPrice,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  formatDateTimeTz,
  validateAddress,
  validateRequired,
} from '@dao-dao/utils'

import {
  Contribution,
  ContributionCompensation,
  ContributionRating,
  RatingsFormData,
  Status,
} from '../../types'
import { computeCompensation } from '../../utils'
import {
  ContributionFormData,
  ContributionFormInput,
} from './ContributionFormInput'

export interface ContributionRatingData {
  contributions: Contribution[]
  existingRatings: ContributionRating[]
}

export type NominationForm = ContributionFormData & {
  contributor: string
}

export interface RatingFormProps {
  status: Status
  data: ContributionRatingData
  onSubmit: (data: RatingsFormData) => Promise<void>
  loadingSubmit: boolean
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  AddressInput: ComponentType<AddressInputProps<NominationForm>>
  tokenPrices: GenericTokenWithUsdPrice[]
  onNominate: (data: NominationForm) => Promise<void>
  loadingNominate: boolean
}

export const RatingForm = ({
  status: { survey, rated },
  data,
  onSubmit,
  loadingSubmit,
  EntityDisplay,
  AddressInput,
  tokenPrices,
  onNominate,
  loadingNominate,
}: RatingFormProps) => {
  const { t } = useTranslation()

  const { watch, setValue, handleSubmit, reset } = useForm<RatingsFormData>({
    defaultValues: {
      ratings: [],
    },
  })

  // When contributions load, set the default form values.
  const ratings = watch('ratings')
  useEffect(() => {
    if (data && ratings.length !== data.contributions.length) {
      reset({
        ratings: data.contributions.map(({ id }) => ({
          contributionId: id,
          attributes: [
            // Try to find existing rating.
            ...(data.existingRatings.find(
              ({ contributionId }) => contributionId === id
            )?.attributes ??
              // Default to abstain.
              survey.attributes.map(() => null)),
          ],
        })),
      })
    }
  }, [data, ratings, reset, survey.attributes])

  // Compute compensation for each contribution.
  const compensation: ContributionCompensation[] = data
    ? computeCompensation(
        data.contributions.map(({ id }) => id),
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

  const {
    watch: nominationWatch,
    register: nominationRegister,
    handleSubmit: nominationHandleSubmit,
    formState: { errors: nominationErrors },
    setValue: nominationSetValue,
  } = useForm<NominationForm>({
    defaultValues: {
      contribution: '',
      ratings: survey.attributes.map(() => null),
    },
  })

  return (
    <div className="flex grow flex-col gap-6">
      <div className="max-w-prose space-y-1 break-words">
        <p className="hero-text">{survey.name}</p>
        <p className="caption-text italic">
          {t('info.ratingClosesAt', {
            date: formatDateTimeTz(new Date(survey.ratingsCloseAt)),
          })}
        </p>
      </div>

      <MarkdownRenderer markdown={survey.ratingInstructions} />

      <form
        className="flex flex-col gap-4 pb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className="grid-rows-auto -mb-2 grid items-stretch justify-items-stretch overflow-x-auto pb-4"
          // Column for contributor, each attribute, what they would like, and
          // projected compenstaion.
          style={{
            gridTemplateColumns: `1fr auto ${survey.attributes
              .map(() => 'auto')
              .join(' ')} auto`,
          }}
        >
          <p className="rounded-tl-md bg-background-primary p-6">
            {t('title.contributor')}
          </p>
          {/* Attribute labels */}
          {survey.attributes.map(({ name }, attributeIndex) => (
            <p
              key={attributeIndex}
              className="border-l border-border-secondary bg-background-primary p-6"
            >
              {name}
            </p>
          ))}
          <p className="border-l border-border-secondary bg-background-primary p-6 text-right">
            {t('title.projectedCompensation')}
          </p>
          <p className="rounded-tr-md border-l border-border-secondary bg-background-primary p-6 text-right">
            {t('title.whatTheyWouldLike')}
          </p>

          {data.contributions.map((contribution, contributionIndex) => {
            // Every other row.
            const backgroundClassName =
              contributionIndex % 2 !== 0 && 'bg-background-tertiary'

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
                  [denomOrAddress]:
                    (acc[denomOrAddress] ?? 0) +
                    convertMicroDenomToDenomWithDecimals(
                      amount,
                      tokenMap[denomOrAddress]?.token.decimals ?? 0
                    ),
                }),
                {} as Record<string, number>
              )
            const projectedTotalUsdc = Object.entries(projectedTokens)
              .map(
                ([denomOrAddress, amount]) =>
                  (tokenMap[denomOrAddress]?.usdPrice ?? 0) * amount
              )
              .reduce((acc, amount) => acc + amount, 0)

            // Map token denom to amount they determined they said they want.
            const selfRatedTokens = contribution.ratings?.every(
              (rating) => rating !== null
            )
              ? survey.attributes
                  .flatMap(({ nativeTokens, cw20Tokens }, attributeIndex) => [
                    ...nativeTokens.map(({ denom, amount }) => ({
                      denomOrAddress: denom,
                      amount,
                      rating: contribution.ratings?.[attributeIndex] ?? 0,
                    })),
                    ...cw20Tokens.map(({ address, amount }) => ({
                      denomOrAddress: address,
                      amount,
                      rating: contribution.ratings?.[attributeIndex] ?? 0,
                    })),
                  ])
                  .reduce(
                    (acc, { denomOrAddress, amount, rating }) => ({
                      ...acc,
                      [denomOrAddress]:
                        (acc[denomOrAddress] ?? 0) +
                        convertMicroDenomToDenomWithDecimals(
                          amount,
                          tokenMap[denomOrAddress]?.token.decimals ?? 0
                        ) *
                          // Multiply by the proportion of the rating they
                          // self-assigned.
                          (rating / 100),
                    }),
                    {} as Record<string, number>
                  )
              : null

            const selfRatedTotalUsdc = selfRatedTokens
              ? Object.entries(selfRatedTokens)
                  .map(
                    ([denomOrAddress, amount]) =>
                      (tokenMap[denomOrAddress]?.usdPrice ?? 0) * amount
                  )
                  .reduce((acc, amount) => acc + amount, 0)
              : 0

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
              <Fragment key={contribution.id}>
                <div
                  className={clsx(
                    'min-w-[14rem] space-y-2 border-border-secondary p-6',
                    backgroundClassName,
                    contributionIndex === data.contributions.length - 1 &&
                      'rounded-bl-md'
                  )}
                >
                  <EntityDisplay address={contribution.contributor.address} />

                  <MarkdownRenderer
                    className="styled-scrollbar max-h-40 overflow-y-auto py-2 pr-2"
                    markdown={contribution.content}
                  />

                  <div className="!mt-4 flex flex-row items-center gap-2">
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

                {survey.attributes.map((_, attributeIndex) => (
                  <div
                    key={attributeIndex}
                    className={clsx(
                      'flex flex-col justify-center border-l border-border-secondary p-6',
                      backgroundClassName
                    )}
                  >
                    <RangeInput
                      className="!h-20 w-40"
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

                {/* Projected compensation */}
                <div
                  className={clsx(
                    'flex flex-col items-end justify-center gap-1 border-l border-border-secondary p-6',
                    backgroundClassName
                  )}
                >
                  {!allRatingsAbstain && (
                    <>
                      {Object.entries(projectedTokens).map(
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

                      <div className="mt-3">
                        <TokenAmountDisplay
                          amount={projectedTotalUsdc}
                          className="caption-text text-right"
                          dateFetched={tokenPrices[0]?.timestamp}
                          estimatedUsdValue
                          hideApprox
                          prefix="= "
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* What they would like */}
                <div
                  className={clsx(
                    'border-l border-border-secondary',
                    backgroundClassName,
                    contributionIndex === data.contributions.length - 1 &&
                      'rounded-br-md'
                  )}
                >
                  {selfRatedTokens !== null && (
                    <div className="flex h-full w-full flex-col items-end justify-center gap-1 bg-background-tertiary p-6">
                      {Object.entries(selfRatedTokens).map(
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

                      <div className="mt-3">
                        <TokenAmountDisplay
                          amount={selfRatedTotalUsdc}
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
              </Fragment>
            )
          })}
        </div>

        {rated && (
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
          <p>{rated ? t('button.update') : t('button.submit')}</p>
          <Publish className="!h-4 !w-4" />
        </Button>
      </form>

      <div className="flex flex-col rounded-lg bg-background-tertiary p-6">
        <p className="title-text mb-2">{t('title.nominateContributor')}</p>
        <MarkdownRenderer markdown={t('info.nominateContributorDescription')} />

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={nominationHandleSubmit(onNominate)}
        >
          <div className="space-y-1">
            <InputLabel name={t('form.contributorAddress')} />
            <AddressInput
              containerClassName="grow"
              error={nominationErrors?.contributor}
              fieldName="contributor"
              register={nominationRegister}
              setValue={nominationSetValue}
              validation={[validateRequired, validateAddress]}
              watch={nominationWatch}
            />
            <InputErrorMessage error={nominationErrors?.contributor} />
          </div>

          <ContributionFormInput
            errors={nominationErrors}
            register={nominationRegister as any}
            setValue={nominationSetValue as any}
            survey={survey}
            thirdPerson
            tokenPrices={tokenPrices}
            watch={nominationWatch as any}
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
      </div>
    </div>
  )
}
