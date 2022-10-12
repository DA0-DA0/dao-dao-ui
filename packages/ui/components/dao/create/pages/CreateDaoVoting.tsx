import { WarningAmber } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { CreateDaoContext } from '@dao-dao/tstypes'

import { FormCheckbox } from '../../../input/Checkbox'
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
      <div className="pb-6 border-b border-b-border-secondary">
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
        <div ref={advancedConfigurationContainerRef}>
          <div className="flex flex-row justify-between items-end mt-7 -mb-7">
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
              'flex flex-col gap-4 mt-14',
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
    </>
  )
}
