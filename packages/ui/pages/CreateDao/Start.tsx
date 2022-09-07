import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { NewDao } from '@dao-dao/tstypes'
import { validateRequired, validateUrl } from '@dao-dao/utils'
import { getAdapters } from '@dao-dao/voting-module-adapter'

import {
  Breadcrumbs,
  BreadcrumbsProps,
  GradientHero,
  ImageSelector,
  InputErrorMessage,
  TextAreaInput,
  TextInput,
} from '../../components'
import { DaoStructureCard } from '../../components/dao/create/DaoStructureCard'

export interface CreateDaoStartProps {
  // Used to insert parent DAO crumbs if creating SubDAO.
  extraCrumbs?: BreadcrumbsProps['crumbs']
}

export const CreateDaoStart = ({ extraCrumbs }: CreateDaoStartProps) => {
  const { t } = useTranslation()

  const {
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext<NewDao>()

  const selectedStructureId = watch('votingModuleAdapter.id')

  // Get voting module adapters with daoCreation fields set.
  const daoCreationAdapters = useMemo(
    () =>
      getAdapters()
        .filter(({ daoCreation }) => !!daoCreation?.displayInfo)
        .map(({ id, daoCreation }) => ({
          id,
          displayInfo: daoCreation!.displayInfo!,
        })),
    []
  )

  return (
    // No container padding because we want the gradient to expand. Apply px-6
    // to children instead.
    <form className="flex flex-col items-stretch px-6 mx-auto max-w-6xl">
      <GradientHero>
        <div className="flex flex-row items-center h-20">
          <Breadcrumbs
            crumbs={[{ href: '/home', label: 'Home' }, ...(extraCrumbs ?? [])]}
            current={t('title.newDao')}
          />
        </div>

        <div className="flex flex-col items-center py-10">
          <ImageSelector
            error={errors.imageUrl}
            fieldName="imageUrl"
            register={register}
            validation={[validateUrl]}
            watch={watch}
          />

          <p className="mt-6 text-text-tertiary primary-text">
            {t('form.addAnImage')}
          </p>
        </div>
      </GradientHero>

      <div className="bg-background-tertiary rounded-lg">
        <div className="flex flex-row gap-6 justify-between items-center py-4 px-6 border-b border-border-secondary">
          <p className="text-text-body primary-text">{t('form.daoName')}</p>

          <div className="flex flex-col grow">
            <TextInput
              error={errors.name}
              fieldName="name"
              placeholder={t('form.daoNamePlaceholder')}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.name} />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 pt-5">
          <p className="text-text-body primary-text">
            {t('form.description')}
            <span className="text-text-tertiary">
              {/* eslint-disable-next-line i18next/no-literal-string */}
              {' – '}
              {t('form.maxCharacters', { max: 130 })}
            </span>
          </p>

          <div className="flex flex-col">
            <TextAreaInput
              error={errors.description}
              fieldName="description"
              placeholder={t('form.daoDescriptionPlaceholder')}
              register={register}
              rows={5}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.description} />
          </div>
        </div>
      </div>

      <p className="my-6 text-text-body title-text">
        {t('title.chooseAStructure')}
      </p>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        {daoCreationAdapters.map(
          ({
            id,
            displayInfo: {
              Icon,
              nameI18nKey,
              descriptionI18nKey,
              suppliesI18nKey,
              membershipI18nKey,
            },
          }) => (
            <DaoStructureCard
              key={id}
              Icon={Icon}
              description={t(descriptionI18nKey)}
              membership={t(membershipI18nKey)}
              name={t(nameI18nKey)}
              onSelect={() => setValue('votingModuleAdapter.id', id)}
              selected={selectedStructureId === id}
              supplies={t(suppliesI18nKey)}
            />
          )
        )}
      </div>
    </form>
  )
}
