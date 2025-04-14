import { Close } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ButtonLink,
  Checkbox,
  FileUploadInput,
  IconButton,
  ImageUploadInput,
  InputErrorMessage,
  InputLabel,
  MarkdownRenderer,
  RangeInput,
  TextAreaInput,
} from '@dao-dao/stateless'
import { TransProps } from '@dao-dao/types'
import {
  processError,
  transformIpfsUrlToHttpsIfNecessary,
  validateRequired,
} from '@dao-dao/utils'

import { ContributionFormData, Survey } from '../../types'

export type ContributionFormInputProps = {
  survey: Survey
  thirdPerson?: boolean
  readOnly?: boolean
  Trans: ComponentType<TransProps>
}

export const ContributionFormInput = ({
  survey,
  thirdPerson,
  readOnly,
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
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: 'files',
  })
  const files = watch('files')

  const contribution = watch('contribution')
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
      {readOnly ? (
        <MarkdownRenderer markdown={contribution} />
      ) : (
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
      )}

      <div className="flex flex-col gap-4">
        {fileFields.map(
          ({ id }, index) =>
            (files?.[index].url || !readOnly) && (
              <div key={id} className="flex flex-row items-center gap-2">
                {files?.[index].url ? (
                  files[index].mimetype?.startsWith('image') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={files[index].url}
                      className="min-w-24 min-h-24 max-w-80 h-auto max-h-80 w-auto"
                      src={transformIpfsUrlToHttpsIfNecessary(
                        files[index].url!
                      )}
                    />
                  ) : (
                    <ButtonLink
                      href={transformIpfsUrlToHttpsIfNecessary(
                        files[index].url!
                      )}
                      openInNewTab
                      variant="underline"
                    >
                      {files[index].name || files[index].url}
                    </ButtonLink>
                  )
                ) : (
                  !readOnly &&
                  (files?.[index].image ? (
                    <ImageUploadInput
                      Trans={Trans}
                      onChange={(url, file) => {
                        setValue(`files.${index}.name`, file.name)
                        setValue(`files.${index}.url`, url)
                        setValue(`files.${index}.mimetype`, file.type)
                      }}
                      onError={(err) => toast.error(processError(err))}
                    />
                  ) : (
                    <FileUploadInput
                      Trans={Trans}
                      onChange={(url, file) => {
                        setValue(`files.${index}.name`, file.name)
                        setValue(`files.${index}.url`, url)
                        setValue(`files.${index}.mimetype`, file.type)
                      }}
                      onError={(err) => toast.error(processError(err))}
                    />
                  ))
                )}

                {!readOnly && (
                  <IconButton
                    Icon={Close}
                    onClick={() => removeFile(index)}
                    size="sm"
                    variant="ghost"
                  />
                )}
              </div>
            )
        )}

        {!readOnly && (
          <div className="flex flex-row gap-2 items-stretch">
            <Button
              className="self-start"
              onClick={() =>
                appendFile({
                  image: true,
                })
              }
              variant="secondary"
            >
              {t('button.addImage')}
            </Button>

            <Button
              className="self-start"
              onClick={() =>
                appendFile({
                  image: false,
                })
              }
              variant="secondary"
            >
              {t('button.addFile')}
            </Button>
          </div>
        )}
      </div>

      <div className="flex mt-2 flex-col gap-4">
        {!readOnly && (
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

              <p className="body-text text-xs" onClick={toggleAbstain}>
                {t('info.dontKnowNotSure')}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-row items-stretch gap-4">
          {survey.attributes.map(({ name }, attributeIndex) => (
            <div key={attributeIndex}>
              <InputLabel name={name} />

              <RangeInput
                className="mt-1 !h-20 w-40"
                disabled={readOnly}
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
