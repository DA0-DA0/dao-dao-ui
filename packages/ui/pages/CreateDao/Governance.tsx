import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { NewDao } from '@dao-dao/tstypes'
import { getAdapterById } from '@dao-dao/voting-module-adapter'

import {
  BreadcrumbsProps,
  DaoImage,
  GradientHero,
  MarkdownPreview,
  PageHeader,
} from '../../components'

export interface CreateDaoGovernanceProps {
  // Used to insert parent DAO crumbs if creating SubDAO.
  extraCrumbs?: BreadcrumbsProps['crumbs']
}

export const CreateDaoGovernance = ({
  extraCrumbs,
}: CreateDaoGovernanceProps) => {
  const { t } = useTranslation()

  const {
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext<NewDao>()

  const name = watch('name')
  const description = watch('description')
  const imageUrl = watch('imageUrl')
  const selectedStructureId = watch('votingModuleAdapter.id')

  // Get selected voting module adapter.
  const daoCreationAdapter = useMemo(
    () => getAdapterById(selectedStructureId)?.daoCreation,
    [selectedStructureId]
  )

  if (!daoCreationAdapter) {
    throw new Error(t('error.loadingData'))
  }

  return (
    // No container padding because we want the gradient to expand. Apply px-6
    // to children instead.
    <form className="flex flex-col items-stretch px-6 mx-auto max-w-6xl">
      <GradientHero>
        <PageHeader
          breadcrumbs={{
            crumbs: [{ href: '/home', label: 'Home' }, ...(extraCrumbs ?? [])],
            current: name,
          }}
        />

        <div className="flex flex-col items-center py-10">
          <DaoImage imageUrl={imageUrl} size="lg" />

          <p className="mt-6 text-center hero-text">{name}</p>
          <p className="mt-2 text-text-tertiary primary-text">
            {t('info.establishedAbbr')} {t('info.today')}
          </p>

          <MarkdownPreview
            className="mt-3 whitespace-pre-wrap body-text"
            markdown={description}
          />
        </div>

        <p className="mt-10 header-text">
          {t(daoCreationAdapter.displayInfo.nameI18nKey)}
        </p>
      </GradientHero>
    </form>
  )
}
