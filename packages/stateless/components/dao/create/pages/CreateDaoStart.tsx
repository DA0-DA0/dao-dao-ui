import cloneDeep from 'lodash.clonedeep'
import { useTranslation } from 'react-i18next'

import { CreateDaoContext } from '@dao-dao/types'
import {
  MAX_DAO_DESCRIPTION_LENGTH,
  MAX_DAO_NAME_LENGTH,
  MIN_DAO_NAME_LENGTH,
  validateRequired,
} from '@dao-dao/utils'

import { InputErrorMessage, TextAreaInput, TextInput } from '../../../inputs'
import { DaoStructureCard } from '../DaoStructureCard'

export const CreateDaoStart = ({
  form: {
    formState: { errors },
    register,
    watch,
    resetField,
  },
  availableVotingModuleAdapters,
}: CreateDaoContext) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="bg-background-tertiary rounded-lg">
        <div className="border-border-secondary flex flex-row items-center justify-between gap-6 border-b py-4 px-6">
          <p className="primary-text text-text-body">{t('form.daoName')}</p>

          <div className="flex grow flex-col">
            <TextInput
              error={errors.name}
              fieldName="name"
              placeholder={t('form.daoNamePlaceholder')}
              register={register}
              validation={[
                validateRequired,

                (value) =>
                  (value.length >= MIN_DAO_NAME_LENGTH &&
                    value.length <= MAX_DAO_NAME_LENGTH) ||
                  t('error.nameIncorrectLength', {
                    min: MIN_DAO_NAME_LENGTH,
                    max: MAX_DAO_NAME_LENGTH,
                  }),
              ]}
            />
            <InputErrorMessage error={errors.name} />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 pt-5">
          <p className="primary-text text-text-body">
            {t('form.description')}
            <span className="text-text-tertiary">
              {/* eslint-disable-next-line i18next/no-literal-string */}
              {' – '}
              {t('form.maxCharacters', { max: MAX_DAO_DESCRIPTION_LENGTH })}
            </span>
          </p>

          <div className="flex flex-col">
            <TextAreaInput
              error={errors.description}
              fieldName="description"
              placeholder={t('form.daoDescriptionPlaceholder')}
              register={register}
              rows={5}
              validation={[
                validateRequired,
                (value) =>
                  value.length <= MAX_DAO_DESCRIPTION_LENGTH ||
                  t('error.descriptionTooLong', {
                    max: MAX_DAO_DESCRIPTION_LENGTH,
                  }),
              ]}
            />
            <InputErrorMessage error={errors.description} />
          </div>
        </div>
      </div>

      <p className="title-text text-text-body my-6">
        {t('title.chooseAStructure')}
      </p>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        {availableVotingModuleAdapters.map(
          ({
            id,
            daoCreation: {
              displayInfo: {
                Icon,
                nameI18nKey,
                descriptionI18nKey,
                suppliesI18nKey,
                membershipI18nKey,
              },
              defaultConfig,
            },
          }) => (
            <DaoStructureCard
              key={id}
              Icon={Icon}
              description={t(descriptionI18nKey)}
              membership={t(membershipI18nKey)}
              name={t(nameI18nKey)}
              onSelect={() =>
                resetField('votingModuleAdapter', {
                  defaultValue: {
                    id,
                    data: cloneDeep(defaultConfig),
                  },
                })
              }
              selected={watch('votingModuleAdapter.id') === id}
              supplies={t(suppliesI18nKey)}
            />
          )
        )}
      </div>
    </>
  )
}
