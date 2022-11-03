import { WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { CreateDaoContext } from '@dao-dao/types'

import { FormCheckbox } from '../../../inputs/Checkbox'
import { DaoCreateConfigInputCard } from '../DaoCreateConfigInputCard'

export const CreateDaoVoting = ({
  form: {
    formState: { errors },
    register,
    watch,
    setValue,
  },
  votingModuleDaoCreationAdapter,
  proposalModuleDaoCreationAdapters,
  SuspenseLoader,
}: CreateDaoContext) => {
  const { t } = useTranslation()

  const newDao = watch()
  const {
    votingModuleAdapter,
    proposalModuleAdapters,
    advancedVotingConfigEnabled,
  } = newDao

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
    <>
      <div className="border-b-border-secondary border-b pb-6">
        <p className="title-text text-text-body my-9">
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
                  SuspenseLoader={SuspenseLoader}
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
                      SuspenseLoader={SuspenseLoader}
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
        <div ref={advancedConfigurationContainerRef}>
          <div className="mt-7 -mb-7 flex flex-row items-end justify-between">
            <p className="title-text text-text-body">
              {t('title.advancedConfiguration')}
            </p>

            <div className="flex flex-row items-center gap-4">
              <p
                className="body-text cursor-pointer"
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
              'mt-14 flex flex-col gap-4',
              !advancedVotingConfigEnabled && 'hidden'
            )}
          >
            {advancedWarningI18nKeys.length > 0 && (
              <div className="flex flex-col gap-4">
                {advancedWarningI18nKeys.map(
                  (advancedWarningI18nKey, index) => (
                    <div
                      key={index}
                      className="bg-background-interactive-warning flex flex-col gap-2 rounded-lg py-5 px-6"
                    >
                      <div className="flex flex-row items-center gap-3">
                        <WarningRounded className="text-icon-interactive-warning !h-6 !w-6" />
                        <p className="primary-text text-text-interactive-warning-title">
                          {t('title.watchOut')}
                        </p>
                      </div>

                      <p className="body-text text-text-interactive-warning-body">
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
                      SuspenseLoader={SuspenseLoader}
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
                          SuspenseLoader={SuspenseLoader}
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
    </>
  )
}
