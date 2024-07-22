import { Add } from '@mui/icons-material'
import { useCallback } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  DateTimePicker,
  InputErrorMessage,
  InputLabel,
  InputThemedText,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import { validateRequired } from '@dao-dao/utils'

import { NewSurveyFormData } from '../../../types'
import { NewAttribute, NewAttributeProps } from '../NewAttribute'

export interface CreateSurveyProps
  extends Pick<NewAttributeProps, 'availableTokens'> {
  onCreate: (newCompensationCycle: NewSurveyFormData) => Promise<void>
  loading: boolean
}

export const CreateSurvey = ({
  onCreate,
  loading,
  ...newAttributeProps
}: CreateSurveyProps) => {
  const { t } = useTranslation()

  const formMethods = useForm<NewSurveyFormData>({
    defaultValues: {
      attributes: [
        {
          name: '',
          tokens: [],
        },
      ],
    },
  })

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods

  const contributionsOpenAt = watch('contributionsOpenAt')
  const contributionsCloseRatingsOpenAt = watch(
    'contributionsCloseRatingsOpenAt'
  )

  const {
    append: appendAttribute,
    remove: removeAttribute,
    fields: attributes,
  } = useFieldArray({
    control,
    name: 'attributes',
  })

  const onFormRef = useCallback((ref: HTMLFormElement) => {
    if (ref) {
      ref.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])

  return (
    <FormProvider {...formMethods}>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onCreate)}
        ref={onFormRef}
      >
        <p className="title-text text-text-body">
          {t('title.newCompensationCycle')}
        </p>

        {/* Survey Name */}
        <div className="space-y-2">
          <InputLabel name={t('form.name')} />

          <div>
            <TextInput
              error={errors.name}
              fieldName="name"
              placeholder={t('form.compensationCycleNamePlaceholder')}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.name} />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="primary-text text-text-body">
            {t('title.publicSubmissions')}
          </p>
          <p className="secondary-text max-w-prose">
            {t('info.publicSubmissionsDescription')}
          </p>

          <div className="mt-2 space-y-4 rounded-lg bg-background-tertiary p-6">
            {/* Contribution Dates */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Contribution Open Date */}
              <div className="grow basis-0 space-y-2">
                <InputLabel name={t('form.openDate')} />

                <div>
                  <DateTimePicker
                    control={control}
                    error={errors.contributionsOpenAt}
                    fieldName="contributionsOpenAt"
                    required
                  />
                  <InputErrorMessage error={errors.contributionsOpenAt} />
                </div>
              </div>

              {/* Contribution Close Date */}
              <div className="grow basis-0 space-y-2">
                <InputLabel name={t('form.closeDate')} />

                <div>
                  <DateTimePicker
                    control={control}
                    error={errors.contributionsCloseRatingsOpenAt}
                    fieldName="contributionsCloseRatingsOpenAt"
                    minDate={
                      // Ensure close date is after open date.
                      contributionsOpenAt &&
                      !isNaN(Date.parse(contributionsOpenAt))
                        ? new Date(contributionsOpenAt)
                        : undefined
                    }
                    required
                  />
                  <InputErrorMessage
                    error={errors.contributionsCloseRatingsOpenAt}
                  />
                </div>
              </div>
            </div>

            {/* Contribution Instructions */}
            <div className="space-y-2">
              <InputLabel>
                {t('form.instructions')}
                <span className="text-text-tertiary">
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  {' – '}
                  {t('info.supportsMarkdown')}
                </span>
              </InputLabel>

              <div>
                <TextAreaInput
                  error={errors.contributionInstructions}
                  fieldName="contributionInstructions"
                  placeholder={t('form.contributionInstructionsPlaceholder')}
                  register={register}
                  rows={5}
                  validation={[validateRequired]}
                />
                <InputErrorMessage error={errors.contributionInstructions} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="primary-text text-text-body">{t('title.daoRatings')}</p>
          <p className="secondary-text max-w-prose">
            {t('info.daoRatingsDescription')}
          </p>

          <div className="mt-2 space-y-4 rounded-lg bg-background-tertiary p-6">
            {/* Rating Dates */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Rating Open Date, same as Contribution Close Date */}
              <div className="grow basis-0 space-y-2">
                <InputLabel name={t('form.openDate')} />

                {/* Set explicit height to match rating close date input */}
                <InputThemedText className="h-11 text-text-tertiary">
                  {t('form.sameAsPublicSubmissionCloseDate')}
                </InputThemedText>
              </div>

              {/* Rating Close Date */}
              <div className="grow basis-0 space-y-2">
                <InputLabel name={t('form.closeDate')} />

                <div>
                  <DateTimePicker
                    control={control}
                    error={errors.ratingsCloseAt}
                    fieldName="ratingsCloseAt"
                    minDate={
                      // Ensure close date is after open date.
                      contributionsCloseRatingsOpenAt &&
                      !isNaN(Date.parse(contributionsCloseRatingsOpenAt))
                        ? new Date(contributionsCloseRatingsOpenAt)
                        : undefined
                    }
                    required
                  />
                  <InputErrorMessage error={errors.ratingsCloseAt} />
                </div>
              </div>
            </div>

            {/* Rating Instructions */}
            <div className="space-y-2">
              <InputLabel>
                {t('form.instructions')}
                <span className="text-text-tertiary">
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  {' – '}
                  {t('info.supportsMarkdown')}
                </span>
              </InputLabel>

              <div>
                <TextAreaInput
                  error={errors.ratingInstructions}
                  fieldName="ratingInstructions"
                  placeholder={t('form.ratingInstructionsPlaceholder')}
                  register={register}
                  rows={5}
                  validation={[validateRequired]}
                />
                <InputErrorMessage error={errors.ratingInstructions} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="primary-text text-text-body">
            {t('form.contributionAttributes')}
          </p>
          <p className="secondary-text max-w-prose">
            {t('form.contributionAttributesDescription')}
          </p>

          <div className="mt-3 space-y-2">
            {attributes.map((attribute, index) => (
              <NewAttribute
                key={attribute.id}
                index={index}
                onRemove={() => removeAttribute(index)}
                {...newAttributeProps}
              />
            ))}
          </div>

          <Button
            className="self-start mt-1"
            onClick={() =>
              appendAttribute({
                name: '',
                tokens: [],
              })
            }
            variant="ghost"
          >
            <Add className="!h-4 !w-4" />
            {t('button.addAttribute')}
          </Button>
        </div>

        <Button className="mb-6 self-end" loading={loading} type="submit">
          <Add className="!h-4 !w-4" />
          <p>{t('button.create')}</p>
        </Button>
      </form>
    </FormProvider>
  )
}
