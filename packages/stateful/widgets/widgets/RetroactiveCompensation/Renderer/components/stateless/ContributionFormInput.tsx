import { Close } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Checkbox,
  IconButton,
  ImageUploadInput,
  InputErrorMessage,
  InputLabel,
  RangeInput,
  TextAreaInput,
} from '@dao-dao/stateless'
import { TransProps } from '@dao-dao/types'
import {
  transformIpfsUrlToHttpsIfNecessary,
  validateRequired,
} from '@dao-dao/utils'

import { ContributionFormData, Survey } from '../../types'

export type ContributionFormInputProps = {
  survey: Survey
  thirdPerson?: boolean
  Trans: ComponentType<TransProps>
}

export const ContributionFormInput = ({
  survey,
  thirdPerson,
  Trans,
}: ContributionFormInputProps) => {
  const { t } = useTranslation()

  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ContributionFormData>()

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'images',
  })
  const images = watch('images')

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

      <div className="flex flex-col gap-4">
        {imageFields.map(({ id }, index) => (
          <div key={id} className="flex flex-row items-center gap-2">
            {images?.[index].url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={images[index].url}
                className="min-w-24 min-h-24 max-w-80 h-auto max-h-80 w-auto"
                src={transformIpfsUrlToHttpsIfNecessary(images[index].url!)}
              />
            ) : (
              <ImageUploadInput
                Trans={Trans}
                onChange={(url) => setValue(`images.${index}.url`, url)}
              />
            )}

            <IconButton
              Icon={Close}
              onClick={() => removeImage(index)}
              size="sm"
              variant="ghost"
            />
          </div>
        ))}

        <Button
          className="self-start"
          onClick={() => appendImage({})}
          variant="secondary"
        >
          {t('button.addImage')}
        </Button>
      </div>

      <div className="mt-2 flex flex-col gap-4">
        <div className="flex flex-row flex-wrap items-center gap-6">
          <p className="primary-text text-text-body">
            {thirdPerson
              ? t('info.whatDoTheyWantToBeRated')
              : t('info.whatDoYouWantToBeRated')}
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
