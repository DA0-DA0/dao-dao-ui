import { GavelRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, MarkdownPreview } from '@dao-dao/stateless'

import { CompleteRatings, Status } from '../../types'
import { IdentityProfileDisplayProps } from '../stateful/IdentityProfileDisplay'

export interface ProposalCreationFormProps {
  status: Status
  // If undefined, they need to be loaded.
  completeRatings: CompleteRatings | undefined
  loadRatings: () => Promise<void>
  onComplete: () => Promise<void>
  loading: boolean
  IdentityProfileDisplay: ComponentType<IdentityProfileDisplayProps>
}

export const ProposalCreationForm = ({
  status: { survey },
  completeRatings,
  loadRatings,
  onComplete,
  loading,
  IdentityProfileDisplay,
}: ProposalCreationFormProps) => {
  const { t } = useTranslation()

  return (
    <div className="grow space-y-6 pb-10">
      <p className="hero-text max-w-prose break-words">{survey.name}</p>

      <MarkdownPreview markdown={t('info.surveyClosedAwaitingCompletion')} />

      {completeRatings ? (
        <div className="flex flex-col gap-8">
          {survey.attributes.map(({ name }, attributeIndex) => (
            <div key={attributeIndex} className="space-y-4">
              <p className="primary-text">{name}</p>

              <div
                className="grid-rows-auto grid items-stretch justify-items-stretch"
                // Column for contributor and each rater.
                style={{
                  gridTemplateColumns: `minmax(0,1fr) ${completeRatings.ratings
                    .map(() => 'auto')
                    .join(' ')}`,
                }}
              >
                {/* Row for titles, which are mostly rater names. */}
                <p className="rounded-tl-md bg-background-primary p-4">
                  {t('title.contributor')}
                </p>
                {completeRatings.ratings.map(({ rater }, ratingIndex) => (
                  <IdentityProfileDisplay
                    key={rater.publicKey}
                    className={clsx(
                      'justify-self-end border-l border-border-secondary bg-background-primary p-4',
                      ratingIndex === completeRatings.ratings.length - 1 &&
                        'rounded-tr-md'
                    )}
                    identity={rater}
                  />
                ))}

                {/* Row for each contributor. */}
                {completeRatings.contributions.map(
                  (contribution, contributionIndex) => {
                    // Every other row.
                    const backgroundClassName =
                      contributionIndex % 2 !== 0 && 'bg-background-tertiary'

                    return (
                      <Fragment key={contribution.id}>
                        <IdentityProfileDisplay
                          className={clsx(
                            'p-4',
                            backgroundClassName,
                            contributionIndex ===
                              completeRatings.contributions.length - 1 &&
                              'rounded-bl-md'
                          )}
                          identity={contribution.contributor}
                        />

                        {completeRatings.ratings.map(
                          ({ rater, contributions }, ratingIndex) => {
                            const rating = contributions.find(
                              ({ id }) => id === contribution.id
                            )?.attributes[attributeIndex]

                            return (
                              <div
                                key={rater.publicKey}
                                className={clsx(
                                  'flex flex-col items-end justify-center border-l border-border-secondary p-4',
                                  backgroundClassName,
                                  ratingIndex ===
                                    completeRatings.ratings.length - 1 &&
                                    contributionIndex ===
                                      completeRatings.contributions.length -
                                        1 &&
                                    'rounded-br-md'
                                )}
                              >
                                {typeof rating === 'number' ? (
                                  <p className="font-mono">{rating}</p>
                                ) : // Nothing if abstained.
                                null}
                              </div>
                            )
                          }
                        )}
                      </Fragment>
                    )
                  }
                )}
              </div>
            </div>
          ))}

          <p className="header-text">{t('title.averages')}</p>

          <div
            className="grid-rows-auto grid items-stretch justify-items-stretch"
            // Column for contributor and each rater.
            style={{
              gridTemplateColumns: `minmax(0,1fr) ${survey.attributes
                .map(() => 'auto')
                .join(' ')}`,
            }}
          >
            {/* Row for titles, which are mostly attribute names. */}
            <p className="rounded-tl-md bg-background-primary p-4">
              {t('title.contributor')}
            </p>
            {survey.attributes.map(({ name }, attributeIndex) => (
              <p
                key={attributeIndex}
                className={clsx(
                  'border-l border-border-secondary bg-background-primary p-4',
                  attributeIndex === survey.attributes.length - 1 &&
                    'rounded-tr-md'
                )}
              >
                {name}
              </p>
            ))}

            {/* Row for each contributor. */}
            {completeRatings.contributions.map(
              ({ id, contributor, compensation }, contributionIndex) => {
                // Every other row.
                const backgroundClassName =
                  contributionIndex % 2 !== 0 && 'bg-background-tertiary'

                return (
                  <Fragment key={id}>
                    <IdentityProfileDisplay
                      className={clsx(
                        'p-4',
                        backgroundClassName,
                        contributionIndex ===
                          completeRatings.contributions.length - 1 &&
                          'rounded-bl-md'
                      )}
                      identity={contributor}
                    />

                    {survey.attributes.map((_, attributeIndex) => (
                      <p
                        key={attributeIndex}
                        className={clsx(
                          'flex flex-col items-end justify-center border-l border-border-secondary p-4 font-mono',
                          backgroundClassName,
                          attributeIndex === survey.attributes.length - 1 &&
                            contributionIndex ===
                              completeRatings.contributions.length - 1 &&
                            'rounded-br-md'
                        )}
                      >
                        {
                          compensation.compensationPerAttribute[attributeIndex]
                            .averageRating
                        }
                      </p>
                    ))}
                  </Fragment>
                )
              }
            )}
          </div>

          <Button className="self-end" loading={loading} onClick={onComplete}>
            <p>{t('button.publishProposal')}</p>
            <GavelRounded className="!h-4 !w-4" />
          </Button>
        </div>
      ) : (
        <Button
          className="self-start"
          loading={loading}
          onClick={loadRatings}
          variant="primary"
        >
          {t('button.reviewResultsAndPropose')}
        </Button>
      )}
    </div>
  )
}
