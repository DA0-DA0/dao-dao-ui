import { Publish } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  Checkbox,
  InputErrorMessage,
  InputLabel,
  MarkdownPreview,
  RangeInput,
  TextAreaInput,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import {
  AmountWithTimestampAndDenom,
  StatefulProfileDisplayProps,
  TokenInfoResponseWithAddressAndLogo,
} from '@dao-dao/types'
import {
  CHAIN_BECH32_PREFIX,
  convertMicroDenomToDenomWithDecimals,
  formatDateTimeTz,
  getFallbackImage,
  isValidAddress,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
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

export interface ContributionRatingData {
  contributions: Contribution[]
  existingRatings: ContributionRating[]
}

export interface NominationForm {
  contributor: string
  contribution: string
}

export interface RatingFormProps {
  status: Status
  data:
    | ContributionRatingData
    // If undefined, needs to be loaded.
    | undefined
  loadData: () => Promise<void>
  onSubmit: (data: RatingsFormData) => Promise<void>
  loading: boolean
  ProfileDisplay: ComponentType<StatefulProfileDisplayProps>
  cw20TokenInfos: TokenInfoResponseWithAddressAndLogo[]
  prices: AmountWithTimestampAndDenom[]
  onNominate: (data: NominationForm) => Promise<void>
}

export const RatingForm = ({
  status: { survey, rated },
  data,
  loadData,
  onSubmit,
  loading,
  ProfileDisplay,
  cw20TokenInfos,
  prices,
  onNominate,
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
    if (data && !ratings.length) {
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

  // Convert cw20TokenInfos into map of token addresses to token info.
  const cw20TokenInfosMap = useMemo(
    () =>
      cw20TokenInfos.reduce(
        (acc, tokenInfo) => ({
          ...acc,
          [tokenInfo.address]: tokenInfo,
        }),
        {} as Record<string, TokenInfoResponseWithAddressAndLogo>
      ),
    [cw20TokenInfos]
  )

  // Convert prices into map of token to price.
  const pricesMap = useMemo(
    () =>
      prices.reduce(
        (acc, price) => ({
          ...acc,
          [price.denom]: price,
        }),
        {} as Record<string, AmountWithTimestampAndDenom>
      ),
    [prices]
  )

  const {
    watch: nominationWatch,
    register: nominationRegister,
    handleSubmit: nominationHandleSubmit,
    formState: { errors: nominationErrors },
  } = useForm<NominationForm>()
  const nominationContributor = nominationWatch('contributor')

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

      <MarkdownPreview markdown={survey.ratingInstructions} />

      {!data ? (
        <Button
          className="self-start"
          loading={loading}
          onClick={loadData}
          variant="primary"
        >
          {t('button.rateContributions')}
        </Button>
      ) : (
        <form
          className="flex flex-col gap-4 pb-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className="grid-rows-auto -mb-2 grid items-stretch justify-items-stretch overflow-x-auto pb-4"
            // Column for contributor, each attribute, and projected
            // compenstaion.
            style={{
              gridTemplateColumns: `1fr ${survey.attributes
                .map(() => 'auto')
                .join(' ')} auto`,
            }}
          >
            {/* Row for titles, which are mostly attribute names. */}
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
            {/* Projected compensation */}
            <p className="rounded-tr-md border-l border-border-secondary bg-background-primary p-6 text-right">
              {t('title.projectedCompensation')}
            </p>

            {data.contributions.map((contribution, contributionIndex) => {
              // Every other row.
              const backgroundClassName =
                contributionIndex % 2 !== 0 && 'bg-background-tertiary'

              const compensationForContribution =
                compensation[contributionIndex].compensationPerAttribute
              const nativeTokens = compensationForContribution
                .flatMap(({ nativeTokens }) => nativeTokens)
                .reduce(
                  (acc, { denom, amount }) => ({
                    ...acc,
                    [denom]:
                      (acc[denom] ?? 0) +
                      convertMicroDenomToDenomWithDecimals(
                        amount,
                        nativeTokenDecimals(denom) ?? 0
                      ),
                  }),
                  {} as Record<string, number>
                )
              const cw20Tokens = compensationForContribution
                .flatMap(({ cw20Tokens }) => cw20Tokens)
                .reduce(
                  (acc, { address, amount }) => ({
                    ...acc,
                    [address]:
                      (acc[address] ?? 0) +
                      convertMicroDenomToDenomWithDecimals(
                        amount,
                        cw20TokenInfosMap[address]?.decimals ?? 0
                      ),
                  }),
                  {} as Record<string, number>
                )
              const totalUsdc = [
                ...Object.entries(nativeTokens).map(
                  ([denom, amount]) => (pricesMap[denom]?.amount ?? 0) * amount
                ),
                ...Object.entries(cw20Tokens).map(
                  ([address, amount]) =>
                    (pricesMap[address]?.amount ?? 0) * amount
                ),
              ].reduce((acc, amount) => acc + amount, 0)

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
                    <ProfileDisplay
                      address={contribution.contributor.address}
                      walletHexPublicKey={contribution.contributor.publicKey}
                    />

                    <MarkdownPreview
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
                      backgroundClassName,
                      contributionIndex === data.contributions.length - 1 &&
                        'rounded-br-md'
                    )}
                  >
                    {!allRatingsAbstain && (
                      <>
                        {Object.entries(nativeTokens).map(
                          ([denom, amount], index) => (
                            <TokenAmountDisplay
                              key={index}
                              amount={amount}
                              className="text-right"
                              decimals={nativeTokenDecimals(denom) ?? 0}
                              iconUrl={nativeTokenLogoURI(denom)}
                              symbol={nativeTokenLabel(denom)}
                            />
                          )
                        )}
                        {Object.entries(cw20Tokens).map(
                          ([address, amount], index) => (
                            <TokenAmountDisplay
                              key={index}
                              amount={amount}
                              className="text-right"
                              decimals={
                                cw20TokenInfosMap[address]?.decimals ?? 0
                              }
                              iconUrl={
                                cw20TokenInfosMap[address]?.logoUrl ||
                                getFallbackImage(address)
                              }
                              symbol={
                                cw20TokenInfosMap[address]?.symbol ?? address
                              }
                            />
                          )
                        )}

                        <div className="mt-4">
                          <TokenAmountDisplay
                            amount={totalUsdc}
                            className="caption-text text-right"
                            dateFetched={prices[0]?.timestamp}
                            hideApprox
                            prefix="= "
                            usdcConversion
                          />
                        </div>
                      </>
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

          <Button className="self-end" loading={loading} type="submit">
            <p>{rated ? t('button.update') : t('button.submit')}</p>
            <Publish className="!h-4 !w-4" />
          </Button>
        </form>
      )}

      <div className="mt-4 flex flex-col">
        <p className="title-text mb-2">{t('title.nominateContributor')}</p>
        <MarkdownPreview markdown={t('info.nominateContributorDescription')} />

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
              validation={[validateRequired, validateAddress]}
            />
            <InputErrorMessage error={nominationErrors?.contributor} />
          </div>

          {/* TODO: Add ProfileDisplay to AddressInput above once merged with that change. */}
          {!!nominationContributor &&
            isValidAddress(nominationContributor, CHAIN_BECH32_PREFIX) && (
              <ProfileDisplay address={nominationContributor} />
            )}

          <div className="space-y-1">
            <InputLabel name={t('form.contribution')} />
            <TextAreaInput
              error={nominationErrors?.contribution}
              fieldName="contribution"
              register={nominationRegister}
              rows={10}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={nominationErrors?.contribution} />
          </div>

          <Button className="self-end" loading={loading} type="submit">
            {t('button.nominate')}
            <Publish className="!h-4 !w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
