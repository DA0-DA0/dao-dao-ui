import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { validateRequired } from '@dao-dao/utils'

import { InputErrorMessage, TextAreaInput, TextInput } from '../inputs'

type TitleDescriptionForm = {
  title: string
  description: string
}

export const NewProposalTitleDescriptionHeader = () => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext<TitleDescriptionForm>()

  return (
    <div className="rounded-lg bg-background-tertiary">
      <div className="flex flex-col gap-2 border-b border-border-secondary py-4 px-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="primary-text text-text-body">{t('form.title')}</p>

        <div className="flex grow flex-col">
          <TextInput
            error={errors.title}
            fieldName="title"
            placeholder={t('form.proposalsTitlePlaceholder')}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors.title} />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-6 pt-5 sm:gap-4">
        <p className="primary-text text-text-body">{t('form.description')}</p>

        <div className="flex flex-col">
          <TextAreaInput
            error={errors.description}
            fieldName="description"
            placeholder={t('form.proposalsDescriptionPlaceholder')}
            register={register}
            rows={5}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors.description} />
        </div>
      </div>
    </div>
  )
}
