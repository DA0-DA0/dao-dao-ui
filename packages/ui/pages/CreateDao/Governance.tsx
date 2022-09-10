import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { NewDao } from '@dao-dao/tstypes'
import { getAdapterById as getVotingModuleAdapterById } from '@dao-dao/voting-module-adapter'

import {
  BreadcrumbsProps,
  DaoHeader,
  GradientHero,
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

  const newDao = watch()
  const { name, description, imageUrl, votingModuleAdapter } = newDao

  // Get selected voting module adapter.
  const votingModuleDaoCreationAdapter = useMemo(
    () => getVotingModuleAdapterById(votingModuleAdapter.id)?.daoCreation,
    [votingModuleAdapter.id]
  )
  if (!votingModuleDaoCreationAdapter) {
    throw new Error(t('error.loadingData'))
  }

  if (!votingModuleDaoCreationAdapter) {
    throw new Error(t('error.loadingData'))
  }

  const { governanceConfig } = votingModuleDaoCreationAdapter

  return (
    // No container padding because we want the gradient to expand. Apply px-6
    // to children instead.
    <form className="flex flex-col items-stretch mx-auto max-w-6xl">
      <GradientHero childContainerClassName="px-6">
        <PageHeader
          breadcrumbs={{
            crumbs: [{ href: '/home', label: 'Home' }, ...(extraCrumbs ?? [])],
            current: name,
          }}
        />

        <DaoHeader
          description={description}
          established={t('info.today')}
          imageUrl={imageUrl}
          name={name}
        />

        {/* TODO: Placeholder, remove */}
        <p className="mt-10 text-center header-text">
          {t(votingModuleDaoCreationAdapter.displayInfo.nameI18nKey)}
        </p>
      </GradientHero>

      <div className="mx-6">
        <governanceConfig.Input
          data={votingModuleAdapter.data}
          errors={errors?.votingModuleAdapter?.data}
          newDao={newDao}
          register={(fieldName, options) =>
            register(
              ('votingModuleAdapter.data.' +
                fieldName) as `votingModuleAdapter.data.${string}`,
              options
            )
          }
          setValue={(fieldName, value, options) =>
            setValue(
              ('votingModuleAdapter.data.' +
                fieldName) as `votingModuleAdapter.data.${string}`,
              value,
              options
            )
          }
          watch={(fieldName) =>
            watch(
              ('votingModuleAdapter.data.' +
                fieldName) as `votingModuleAdapter.data.${string}`
            )
          }
        />
      </div>
    </form>
  )
}
