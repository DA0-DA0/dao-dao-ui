import { Add } from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  InputErrorMessage,
  InputLabel,
  InputThemedText,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import {
  formatDateTimeTz,
  makeValidateDate,
  validateRequired,
} from '@dao-dao/utils'

import { NewSurveyFormData } from '../../types'
import { NewAttribute, NewAttributeProps } from './NewAttribute'

export interface NewSurveyFormProps
  extends Pick<NewAttributeProps, 'nativeDenoms' | 'cw20TokenInfos'> {
  onCreate: (newCompensationCycle: NewSurveyFormData) => Promise<void>
  loading: boolean
}

export const NewSurveyForm = ({
  onCreate,
  loading,
  ...newAttributeProps
}: NewSurveyFormProps) => {
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
  const ratingsCloseAt = watch('ratingsCloseAt')

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
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onCreate)}
        ref={onFormRef}
      >
        <p className="title-text text-text-body">
          {t('title.newCompensationCycle')}
        </p>

        {/* Survey Name */}
        <div className="space-y-2">
          <InputLabel name={t('form.compensationCycleName')} />

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

        <p className="primary-text -mb-2 text-text-body">
          {t('title.publicSubmissions')}
        </p>
        <div className="space-y-4 rounded-lg bg-background-tertiary p-6">
          {/* Contribution Dates */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Contribution Open Date */}
            <div className="grow basis-0 space-y-2">
              <div className="flex flex-row items-end gap-2">
                <InputLabel name={t('form.openDate')} />

                {/* Date Preview */}
                {!!contributionsOpenAt &&
                  !isNaN(Date.parse(contributionsOpenAt)) && (
                    <p className="caption-text">
                      {formatDateTimeTz(new Date(contributionsOpenAt))}
                    </p>
                  )}
              </div>

              <div>
                <TextInput
                  error={errors.contributionsOpenAt}
                  fieldName="contributionsOpenAt"
                  // eslint-disable-next-line i18next/no-literal-string
                  placeholder="YYYY-MM-DD HH:mm"
                  register={register}
                  validation={[validateRequired, makeValidateDate(t)]}
                />
                <InputErrorMessage error={errors.contributionsOpenAt} />
              </div>
            </div>

            {/* Contribution Close Date */}
            <div className="grow basis-0 space-y-2">
              <div className="flex flex-row items-end gap-2">
                <InputLabel name={t('form.closeDate')} />

                {/* Date Preview */}
                {!!contributionsCloseRatingsOpenAt &&
                  !isNaN(Date.parse(contributionsCloseRatingsOpenAt)) && (
                    <p className="caption-text">
                      {formatDateTimeTz(
                        new Date(contributionsCloseRatingsOpenAt)
                      )}
                    </p>
                  )}
              </div>

              <div>
                <TextInput
                  error={errors.contributionsCloseRatingsOpenAt}
                  fieldName="contributionsCloseRatingsOpenAt"
                  // eslint-disable-next-line i18next/no-literal-string
                  placeholder="YYYY-MM-DD HH:mm"
                  register={register}
                  validation={[
                    validateRequired,
                    makeValidateDate(t),
                    // Ensure close date is after open date.
                    () =>
                      // Valid if dates not yet available.
                      !(
                        contributionsOpenAt &&
                        !isNaN(Date.parse(contributionsOpenAt)) &&
                        contributionsCloseRatingsOpenAt &&
                        !isNaN(Date.parse(contributionsCloseRatingsOpenAt))
                      ) ||
                      new Date(contributionsCloseRatingsOpenAt) >
                        new Date(contributionsOpenAt) ||
                      t('error.closeDateMustBeAfterOpenDate'),
                  ]}
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
                {t('info.supportsMarkdownFormat')}
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

        <p className="primary-text -mb-2 text-text-body">
          {t('title.daoRatings')}
        </p>
        <div className="space-y-4 rounded-lg bg-background-tertiary p-6">
          {/* Rating Dates */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Rating Open Date, same as Contribution Close Date */}
            <div className="grow basis-0 space-y-2">
              <div className="flex flex-row items-end gap-2">
                <InputLabel name={t('form.openDate')} />

                {/* Date Preview */}
                {!!contributionsCloseRatingsOpenAt &&
                  !isNaN(Date.parse(contributionsCloseRatingsOpenAt)) && (
                    <p className="caption-text">
                      {formatDateTimeTz(
                        new Date(contributionsCloseRatingsOpenAt)
                      )}
                    </p>
                  )}
              </div>

              {/* Copy from contribution close date. */}
              <InputThemedText
                className={clsx(
                  // Explicitly set height so it doesn't shrink when empty.
                  'h-10',
                  !contributionsCloseRatingsOpenAt && 'text-text-tertiary'
                )}
              >
                {contributionsCloseRatingsOpenAt ||
                  t('form.sameAsPublicSubmissionCloseDate')}
              </InputThemedText>
            </div>

            {/* Rating Close Date */}
            <div className="grow basis-0 space-y-2">
              <div className="flex flex-row items-end gap-2">
                <InputLabel name={t('form.closeDate')} />

                {/* Date Preview */}
                {!!ratingsCloseAt && !isNaN(Date.parse(ratingsCloseAt)) && (
                  <p className="caption-text">
                    {formatDateTimeTz(new Date(ratingsCloseAt))}
                  </p>
                )}
              </div>

              <div>
                <TextInput
                  error={errors.ratingsCloseAt}
                  fieldName="ratingsCloseAt"
                  // eslint-disable-next-line i18next/no-literal-string
                  placeholder="YYYY-MM-DD HH:mm"
                  register={register}
                  validation={[
                    validateRequired,
                    makeValidateDate(t),
                    // Ensure close date is after open date.
                    () =>
                      // Valid if dates not yet available.
                      !(
                        contributionsCloseRatingsOpenAt &&
                        !isNaN(Date.parse(contributionsCloseRatingsOpenAt)) &&
                        ratingsCloseAt &&
                        !isNaN(Date.parse(ratingsCloseAt))
                      ) ||
                      new Date(ratingsCloseAt) >
                        new Date(contributionsCloseRatingsOpenAt) ||
                      t('error.closeDateMustBeAfterOpenDate'),
                  ]}
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
                {t('info.supportsMarkdownFormat')}
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

        <div className="flex flex-col gap-2">
          <p className="primary-text text-text-body">
            {t('form.contributionAttributes')}
          </p>
          <p className="secondary-text max-w-prose">
            {t('form.contributionAttributesDescription')}
          </p>

          <div className="mt-4 space-y-2">
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
            className="self-start"
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

        <Button className="mb-10 self-end" loading={loading} type="submit">
          <Add className="!h-4 !w-4" />
          <p>{t('button.create')}</p>
        </Button>
      </form>
    </FormProvider>
  )
}
