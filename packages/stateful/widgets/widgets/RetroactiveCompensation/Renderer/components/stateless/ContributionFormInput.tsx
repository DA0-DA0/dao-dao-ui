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
} from '@dao-dao/stateless'
import { validateRequired } from '@dao-dao/utils'

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
  thirdPerson?: boolean
}

export const ContributionFormInput = ({
  survey,
  register,
  watch,
  setValue,
  errors,
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
              ? t('info.whatTheyFeelTheyShouldBeRated')
              : t('info.whatYouFeelYouShouldBeRated')}
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
          {survey.attributes.map(({ name }, attributeIndex) => (
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
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
