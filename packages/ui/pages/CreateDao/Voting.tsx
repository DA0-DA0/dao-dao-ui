import { WarningAmber } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useMemo, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ProposalModuleAdapter,
  getAdapterById as getProposalModuleAdapterById,
} from '@dao-dao/proposal-module-adapter'
import { NewDao } from '@dao-dao/tstypes'
import { getAdapterById as getVotingModuleAdapterById } from '@dao-dao/voting-module-adapter'

import {
  BreadcrumbsProps,
  DaoHeader,
  FormCheckbox,
  GradientHero,
  PageHeader,
} from '../../components'
import { DaoCreateConfigInputCard } from '../../components/dao/create/DaoCreateConfigInputCard'

export interface CreateDaoVotingProps {
  // Used to insert parent DAO crumbs if creating SubDAO.
  extraCrumbs?: BreadcrumbsProps['crumbs']
}

export const CreateDaoVoting = ({ extraCrumbs }: CreateDaoVotingProps) => {
  const { t } = useTranslation()

  const {
    formState: { errors },
    register,
    watch,
    setValue,
  } = useFormContext<NewDao>()

  const newDao = watch()
  const {
    name,
    description,
    imageUrl,
    votingModuleAdapter,
    proposalModuleAdapters,
    advancedVotingConfigEnabled,
  } = newDao

  // Get selected voting module adapter.
  const votingModuleDaoCreationAdapter = useMemo(
    () => getVotingModuleAdapterById(votingModuleAdapter.id)?.daoCreation,
    [votingModuleAdapter.id]
  )
  if (!votingModuleDaoCreationAdapter) {
    throw new Error(t('error.loadingData'))
  }

  // Get all proposal module adapters.
  const proposalModuleDaoCreationAdapters = useMemo(
    () =>
      proposalModuleAdapters
        .map(({ id }) => getProposalModuleAdapterById(id)?.daoCreation)
        // Remove undefined adapters.
        .filter(Boolean) as ProposalModuleAdapter['daoCreation'][],
    [proposalModuleAdapters]
  )

  // Combine all advanced warnings i18n keys into single array.
  const advancedWarningI18nKeys = useMemo(
    () => [
      ...(votingModuleDaoCreationAdapter.votingConfig.advancedWarningI18nKeys ??
        []),
      ...proposalModuleDaoCreationAdapters.flatMap(
        ({ votingConfig: { advancedWarningI18nKeys } }) =>
          advancedWarningI18nKeys ?? []
      ),
    ],
    [
      proposalModuleDaoCreationAdapters,
      votingModuleDaoCreationAdapter.votingConfig.advancedWarningI18nKeys,
    ]
  )

  const advancedConfigurationContainerRef = useRef<HTMLDivElement>(null)
  // When enabling advanced configuration, scroll to container.
  useEffect(() => {
    if (advancedVotingConfigEnabled) {
      advancedConfigurationContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [advancedVotingConfigEnabled])

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
      </GradientHero>

      <div className="pb-6 mx-6 border-y border-t-border-base border-b-border-secondary">
        <p className="my-9 text-text-body title-text">
          {t('title.votingConfiguration')}
        </p>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {votingModuleDaoCreationAdapter.votingConfig.items.map(
            (
              {
                onlyDisplayCondition,
                Icon,
                nameI18nKey,
                descriptionI18nKey,
                tooltipI18nKey,
                Input,
                getInputError,
              },
              index
            ) =>
              // If has display condition, check it. Otherwise display.
              (onlyDisplayCondition?.(newDao) ?? true) && (
                <DaoCreateConfigInputCard
                  key={index}
                  Icon={Icon}
                  description={t(descriptionI18nKey)}
                  error={getInputError(errors.votingModuleAdapter?.data)}
                  input={
                    <Input
                      data={votingModuleAdapter.data}
                      errors={errors.votingModuleAdapter?.data}
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
                          {
                            // Validate by default.
                            shouldValidate: true,
                            ...options,
                          }
                        )
                      }
                      watch={(fieldName) =>
                        watch(
                          ('votingModuleAdapter.data.' +
                            fieldName) as `votingModuleAdapter.data.${string}`
                        )
                      }
                    />
                  }
                  name={t(nameI18nKey)}
                  tooltip={tooltipI18nKey && t(tooltipI18nKey)}
                />
              )
          )}
          {proposalModuleDaoCreationAdapters.flatMap(
            ({ votingConfig: { items } }, index) =>
              items.map(
                (
                  {
                    onlyDisplayCondition,
                    Icon,
                    nameI18nKey,
                    descriptionI18nKey,
                    tooltipI18nKey,
                    Input,
                    getInputError,
                  },
                  itemIndex
                ) =>
                  // If has display condition, check it. Otherwise display.
                  (onlyDisplayCondition?.(newDao) ?? true) && (
                    <DaoCreateConfigInputCard
                      key={`${index}:${itemIndex}`}
                      Icon={Icon}
                      description={t(descriptionI18nKey)}
                      error={getInputError(
                        errors.proposalModuleAdapters?.[index]?.data
                      )}
                      input={
                        <Input
                          data={proposalModuleAdapters[index].data}
                          errors={errors.proposalModuleAdapters?.[index]?.data}
                          newDao={newDao}
                          register={(fieldName, options) =>
                            register(
                              (`proposalModuleAdapters.${index}.data.` +
                                fieldName) as `proposalModuleAdapters.${number}.data.${string}`,
                              options
                            )
                          }
                          setValue={(fieldName, value, options) =>
                            setValue(
                              (`proposalModuleAdapters.${index}.data.` +
                                fieldName) as `proposalModuleAdapters.${number}.data.${string}`,
                              value,
                              {
                                // Validate by default.
                                shouldValidate: true,
                                ...options,
                              }
                            )
                          }
                          watch={(fieldName) =>
                            watch(
                              (`proposalModuleAdapters.${index}.data.` +
                                fieldName) as `proposalModuleAdapters.${number}.data.${string}`
                            )
                          }
                        />
                      }
                      name={t(nameI18nKey)}
                      tooltip={tooltipI18nKey && t(tooltipI18nKey)}
                    />
                  )
              )
          )}
        </div>
      </div>

      {/* Only display advanced if there are advanced items to show. */}
      {(!!votingModuleDaoCreationAdapter.votingConfig.advancedItems?.length ||
        proposalModuleDaoCreationAdapters.some(
          ({ votingConfig: { advancedItems } }) => !!advancedItems?.length
        )) && (
        <div className="mx-6" ref={advancedConfigurationContainerRef}>
          <div className="flex flex-row justify-between items-end my-9">
            <p className="text-text-body title-text">
              {t('title.advancedConfiguration')}
            </p>

            <div className="flex flex-row gap-4 items-center">
              <p
                className="cursor-pointer body-text"
                onClick={() =>
                  setValue(
                    'advancedVotingConfigEnabled',
                    !advancedVotingConfigEnabled
                  )
                }
              >
                {t('form.showAdvancedSettings')}
              </p>

              <FormCheckbox
                fieldName="advancedVotingConfigEnabled"
                setValue={setValue}
                value={advancedVotingConfigEnabled}
              />
            </div>
          </div>

          <div
            className={clsx(
              'flex flex-col gap-4',
              !advancedVotingConfigEnabled && 'hidden'
            )}
          >
            {advancedWarningI18nKeys.length > 0 && (
              <div className="flex flex-col gap-4">
                {advancedWarningI18nKeys.map(
                  (advancedWarningI18nKey, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 py-5 px-6 bg-background-interactive-warning rounded-lg"
                    >
                      <div className="flex flex-row gap-3 items-center">
                        <WarningAmber className="!w-6 !h-6 text-icon-interactive-warning" />
                        <p className="text-text-interactive-warning-title primary-text">
                          {t('title.watchOut')}
                        </p>
                      </div>

                      <p className="text-text-interactive-warning-body body-text">
                        {t(advancedWarningI18nKey)}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
              {votingModuleDaoCreationAdapter.votingConfig.advancedItems?.map(
                (
                  {
                    onlyDisplayCondition,
                    Icon,
                    nameI18nKey,
                    descriptionI18nKey,
                    tooltipI18nKey,
                    Input,
                    getInputError,
                  },
                  index
                ) =>
                  // If has display condition, check it. Otherwise display.
                  (onlyDisplayCondition?.(newDao) ?? true) && (
                    <DaoCreateConfigInputCard
                      key={index}
                      Icon={Icon}
                      description={t(descriptionI18nKey)}
                      error={getInputError(errors.votingModuleAdapter?.data)}
                      input={
                        <Input
                          data={votingModuleAdapter.data}
                          errors={errors.votingModuleAdapter?.data}
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
                              {
                                // Validate by default.
                                shouldValidate: true,
                                ...options,
                              }
                            )
                          }
                          watch={(fieldName) =>
                            watch(
                              ('votingModuleAdapter.data.' +
                                fieldName) as `votingModuleAdapter.data.${string}`
                            )
                          }
                        />
                      }
                      name={t(nameI18nKey)}
                      tooltip={tooltipI18nKey && t(tooltipI18nKey)}
                    />
                  )
              )}
              {proposalModuleDaoCreationAdapters.flatMap(
                ({ votingConfig: { advancedItems } }, index) =>
                  advancedItems?.map(
                    (
                      {
                        onlyDisplayCondition,
                        Icon,
                        nameI18nKey,
                        descriptionI18nKey,
                        tooltipI18nKey,
                        Input,
                        getInputError,
                      },
                      itemIndex
                    ) =>
                      // If has display condition, check it. Otherwise display.
                      (onlyDisplayCondition?.(newDao) ?? true) && (
                        <DaoCreateConfigInputCard
                          key={`${index}:${itemIndex}`}
                          Icon={Icon}
                          description={t(descriptionI18nKey)}
                          error={getInputError(
                            errors.proposalModuleAdapters?.[index]?.data
                          )}
                          input={
                            <Input
                              data={proposalModuleAdapters[index].data}
                              errors={
                                errors.proposalModuleAdapters?.[index]?.data
                              }
                              newDao={newDao}
                              register={(fieldName, options) =>
                                register(
                                  (`proposalModuleAdapters.${index}.data.` +
                                    fieldName) as `proposalModuleAdapters.${number}.data.${string}`,
                                  options
                                )
                              }
                              setValue={(fieldName, value, options) =>
                                setValue(
                                  (`proposalModuleAdapters.${index}.data.` +
                                    fieldName) as `proposalModuleAdapters.${number}.data.${string}`,
                                  value,
                                  {
                                    // Validate by default.
                                    shouldValidate: true,
                                    ...options,
                                  }
                                )
                              }
                              watch={(fieldName) =>
                                watch(
                                  (`proposalModuleAdapters.${index}.data.` +
                                    fieldName) as `proposalModuleAdapters.${number}.data.${string}`
                                )
                              }
                            />
                          }
                          name={t(nameI18nKey)}
                          tooltip={tooltipI18nKey && t(tooltipI18nKey)}
                        />
                      )
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
