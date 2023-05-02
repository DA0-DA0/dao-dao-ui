import { Publish } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button, Loader, MarkdownRenderer, Tooltip } from '@dao-dao/stateless'
import { Entity, GenericTokenWithUsdPrice, LoadingData } from '@dao-dao/types'
import { formatDateTimeTz } from '@dao-dao/utils'

import { Status, SurveyStatus } from '../../types'
import {
  ContributionFormData,
  ContributionFormInput,
} from './ContributionFormInput'

export interface ContributionFormProps {
  connected: boolean
  status: Status
  onSubmit: (data: ContributionFormData) => Promise<void>
  loading: boolean
  loadingEntity: LoadingData<Entity>
  tokenPrices: GenericTokenWithUsdPrice[]
  EntityDisplay: ComponentType
  ConnectWallet: ComponentType
}

export const ContributionForm = ({
  connected,
  status: {
    survey,
    contribution: existingContribution,
    contributionSelfRatings,
  },
  onSubmit,
  loading,
  loadingEntity,
  tokenPrices,
  EntityDisplay,
  ConnectWallet,
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

        {connected ? (
          loadingEntity.loading ? (
            <Loader />
          ) : (
            <div className="flex min-w-[18rem] grow flex-col gap-4 pb-10">
              <div className="flex flex-col gap-2">
                <p className="primary-text text-text-body">
                  {t('title.yourSubmission')}
                </p>

                <EntityDisplay />

                {!loadingEntity.data.name && (
                  <p className="caption-text text-text-interactive-error">
                    {t('error.compensationCycleNeedsProfileName')}
                  </p>
                )}
              </div>

              <ContributionFormInput
                errors={errors}
                register={register}
                setValue={setValue}
                survey={survey}
                tokenPrices={tokenPrices}
                watch={watch}
              />

              {contributed && (
                <p className="caption-text self-end text-right text-text-interactive-valid">
                  {t('form.contributionSubmitted')}
                </p>
              )}

              {survey.status === SurveyStatus.Inactive && (
                <p className="caption-text self-end text-right text-text-interactive-error">
                  {t('info.intakeOpensAt', {
                    date: formatDateTimeTz(
                      new Date(survey.contributionsOpenAt)
                    ),
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
                    : !loadingEntity.data.name
                    ? t('error.compensationCycleNeedsProfileName')
                    : undefined
                }
              >
                <Button
                  className="self-end"
                  disabled={
                    survey.status === SurveyStatus.Inactive ||
                    !loadingEntity.data.name
                  }
                  loading={loading}
                  type="submit"
                >
                  <p>{contributed ? t('button.update') : t('button.submit')}</p>
                  <Publish className="!h-4 !w-4" />
                </Button>
              </Tooltip>
            </div>
          )
        ) : (
          <div className="flex grow flex-row items-start justify-end">
            <ConnectWallet />
          </div>
        )}
      </div>
    </form>
  )
}
