import { Publish } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Checkbox,
  MarkdownPreview,
  RangeInput,
} from '@dao-dao/stateless'
import { formatDateTimeTz } from '@dao-dao/utils'

import {
  Contribution,
  ContributionRating,
  RatingsFormData,
  Status,
} from '../../types'
import { IdentityProfileDisplayProps } from '../stateful/IdentityProfileDisplay'

export interface ContributionRatingData {
  contributions: Contribution[]
  existingRatings: ContributionRating[]
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
  IdentityProfileDisplay: ComponentType<IdentityProfileDisplayProps>
}

export const RatingForm = ({
  status: { survey, rated },
  data,
  loadData,
  onSubmit,
  loading,
  IdentityProfileDisplay,
}: RatingFormProps) => {
  const { t } = useTranslation()

  const { watch, setValue, handleSubmit, reset } = useForm<RatingsFormData>()

  // When contributions load, set the default form values.
  const ratings = watch('ratings')
  useEffect(() => {
    if (data && !ratings) {
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

  return (
    <form
      className="flex grow flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="max-w-prose space-y-1 break-words">
        <p className="hero-text">{survey.name}</p>
        <p className="caption-text italic">
          {t('info.ratingClosesAt', {
            date: formatDateTimeTz(new Date(survey.ratingsCloseAt)),
          })}
        </p>
      </div>

      <MarkdownPreview markdown={survey.ratingInstructions} />

      <div className="flex flex-col gap-6">
        {rated && (
          <p className="legend-text text-text-interactive-valid">
            {t('form.ratingsSubmitted')}
          </p>
        )}

        {data ? (
          <>
            <div
              className="grid-rows-auto grid items-stretch justify-items-stretch"
              // Column for contributor and each attribute.
              style={{
                gridTemplateColumns: `minmax(0,1fr) ${survey.attributes
                  .map(() => 'auto')
                  .join(' ')}`,
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
                  className={clsx(
                    'border-l border-border-secondary bg-background-primary p-6',
                    attributeIndex === survey.attributes.length - 1 &&
                      'rounded-tr-md'
                  )}
                >
                  {name}
                </p>
              ))}

              {data.contributions.map((contribution, contributionIndex) => {
                // Every other row.
                const backgroundClassName =
                  contributionIndex % 2 !== 0 && 'bg-background-tertiary'

                return (
                  <Fragment key={contribution.id}>
                    <div
                      className={clsx(
                        'max-h-60 space-y-4 overflow-y-auto border-border-secondary p-6',
                        backgroundClassName,
                        contributionIndex === data.contributions.length - 1 &&
                          'rounded-bl-md'
                      )}
                    >
                      <IdentityProfileDisplay
                        identity={contribution.contributor}
                      />

                      <MarkdownPreview markdown={contribution.content} />
                    </div>

                    {survey.attributes.map((_, attributeIndex) => {
                      const fieldName =
                        `ratings.${contributionIndex}.attributes.${attributeIndex}` as const
                      const value = watch(fieldName)
                      const toggleAbstain = () =>
                        value === null
                          ? setValue(fieldName, 0)
                          : setValue(fieldName, null)

                      return (
                        <div
                          key={attributeIndex}
                          className={clsx(
                            'flex flex-col justify-center border-l border-border-secondary p-6',
                            backgroundClassName,
                            attributeIndex === survey.attributes.length - 1 &&
                              contributionIndex ===
                                data.contributions.length - 1 &&
                              'rounded-br-md'
                          )}
                        >
                          <div className="mb-4 flex flex-row items-center gap-2">
                            <Checkbox
                              checked={value === null}
                              onClick={toggleAbstain}
                            />

                            <p
                              className="body-text cursor-pointer text-sm"
                              onClick={toggleAbstain}
                            >
                              {t('info.dontKnowNotSure')}
                            </p>
                          </div>

                          <RangeInput
                            className="w-60"
                            dimmed={
                              // Dim instead of disable if abstaining, but
                              // allow interaction to automatically unset
                              // abstaining when changing.
                              value === null
                            }
                            fieldName={fieldName}
                            max={100}
                            min={0}
                            onStartChange={() => setValue(fieldName, 0)}
                            setValue={setValue}
                            watch={watch}
                          />
                        </div>
                      )
                    })}
                  </Fragment>
                )
              })}
            </div>

            <Button className="mb-10 self-end" loading={loading} type="submit">
              <p>{rated ? t('button.update') : t('button.submit')}</p>
              <Publish className="!h-4 !w-4" />
            </Button>
          </>
        ) : (
          <Button
            className="self-start"
            loading={loading}
            onClick={loadData}
            variant="primary"
          >
            {t('button.rateContributions')}
          </Button>
        )}
      </div>
    </form>
  )
}
