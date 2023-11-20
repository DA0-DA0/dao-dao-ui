import {
  Add,
  ArrowRightAltRounded,
  Close,
  SubdirectoryArrowRightRounded,
  WarningRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CopyToClipboard,
  IconButton,
  InputErrorMessage,
  InputLabel,
  InputThemedText,
  NumberInput,
  RadioInput,
  RadioInputOption,
  SelectInput,
  TextAreaInput,
  TextInput,
  TokenInput,
  VestingStepsLineGraph,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  AddressInputProps,
  DurationUnits,
  DurationUnitsValues,
  DurationWithUnits,
  GenericTokenBalance,
  LoadingData,
  StatefulEntityDisplayProps,
  VestingPaymentsWidgetData,
  VestingPaymentsWidgetVersion,
  VestingStep,
} from '@dao-dao/types'
import {
  convertDurationWithUnitsToSeconds,
  convertMicroDenomToDenomWithDecimals,
  formatDateTimeTz,
  makeValidateAddress,
  makeValidateDate,
  validateNonNegative,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react/context'

export type BeginVestingData = {
  amount: number
  denomOrAddress: string
  recipient: string
  title: string
  description?: string
  startDate: string
  ownerMode: 'none' | 'me' | 'other' | 'many'
  // If ownerMode === 'other', the address of the owner.
  otherOwner: string
  // If ownerMode === 'many', the list of addresses of the owners.
  manyOwners: {
    address: string
  }[]
  // This will be the cw1-whitelist contract once the many owners list is
  // finalized.
  manyOwnersCw1WhitelistContract: string
  steps: {
    // Additional percent unlocked after the delay.
    percent: number
    delay: DurationWithUnits
  }[]
}

export type BeginVestingOptions = {
  // If undefined, no widget is setup, and begin vesting should be disabled.
  widgetData: VestingPaymentsWidgetData | undefined
  tokens: GenericTokenBalance[]
  // The vesting contract factory owner. If undefined, no owner is set.
  vestingFactoryOwner: LoadingData<string | undefined>
  AddressInput: ComponentType<AddressInputProps<BeginVestingData>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  createCw1WhitelistOwners: () => void | Promise<void>
  creatingCw1WhitelistOwners: boolean
}

export const BeginVesting: ActionComponent<BeginVestingOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    widgetData,
    tokens,
    vestingFactoryOwner,
    AddressInput,
    EntityDisplay,
    createCw1WhitelistOwners,
    creatingCw1WhitelistOwners,
  },
}) => {
  const { t } = useTranslation()
  const {
    context,
    address,
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { control, register, watch, setValue, setError, clearErrors } =
    useFormContext<BeginVestingData>()
  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'steps') as 'steps',
  })

  const watchAmount = watch((fieldNamePrefix + 'amount') as 'amount')
  const watchDenomOrAddress = watch(
    (fieldNamePrefix + 'denomOrAddress') as 'denomOrAddress'
  )
  const parsedStartDate = Date.parse(
    watch((fieldNamePrefix + 'startDate') as 'startDate')
  )
  const description = watch((fieldNamePrefix + 'description') as 'description')

  const ownerMode = watch((fieldNamePrefix + 'ownerMode') as 'ownerMode')
  const manyOwnersCw1WhitelistContract = watch(
    (fieldNamePrefix +
      'manyOwnersCw1WhitelistContract') as 'manyOwnersCw1WhitelistContract'
  )
  const {
    fields: manyOwnerFields,
    append: appendManyOwner,
    remove: removeManyOwner,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'manyOwners') as 'manyOwners',
  })

  const startDate = !isNaN(parsedStartDate)
    ? new Date(parsedStartDate)
    : undefined

  const steps = watch((fieldNamePrefix + 'steps') as 'steps')
  const stepPoints =
    startDate &&
    steps.reduce((acc, { percent, delay }, index): VestingStep[] => {
      const delayMs =
        delay.value && convertDurationWithUnitsToSeconds(delay) * 1000

      const lastMs =
        index === 0 ? startDate.getTime() : acc[acc.length - 1].timestamp
      const lastAmount = index === 0 ? 0 : acc[acc.length - 1].amount

      return [
        ...acc,
        {
          timestamp: lastMs + delayMs,
          amount: lastAmount + (percent / 100) * watchAmount,
        },
      ]
    }, [] as VestingStep[])

  const totalStepPercent = steps.reduce((acc, { percent }) => acc + percent, 0)
  useEffect(() => {
    if (!isCreating) {
      return
    }

    if (totalStepPercent === 100) {
      clearErrors((fieldNamePrefix + 'steps') as 'steps')
    } else {
      setError((fieldNamePrefix + 'steps') as 'steps', {
        type: 'manual',
        message: t('error.stepPercentsMustSumTo100'),
      })
    }
  }, [clearErrors, fieldNamePrefix, isCreating, setError, t, totalStepPercent])

  const formattedStartDate = startDate && formatDateTimeTz(startDate)
  const formattedFinishDate = stepPoints?.length
    ? formatDateTimeTz(new Date(stepPoints[stepPoints.length - 1].timestamp))
    : undefined

  const selectedToken = tokens.find(
    ({ token: { denomOrAddress } }) => denomOrAddress === watchDenomOrAddress
  )
  const selectedDecimals = selectedToken?.token.decimals ?? 0
  const selectedMicroBalance = selectedToken?.balance ?? 0
  const selectedBalance = convertMicroDenomToDenomWithDecimals(
    selectedMicroBalance,
    selectedDecimals
  )
  const selectedSymbol = selectedToken?.token?.symbol ?? t('info.tokens')

  const insufficientBalanceI18nKey =
    context.type === ActionContextType.Wallet
      ? 'error.insufficientWalletBalance'
      : 'error.cantSpendMoreThanTreasury'

  // If widget not set up, don't render anything because begin vesting cannot be
  // used.
  if (!widgetData) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <InputLabel name={t('form.title')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.title}
          fieldName={(fieldNamePrefix + 'title') as 'title'}
          register={register}
          required
        />
        <InputErrorMessage error={errors?.title} />
      </div>

      {(isCreating || !!description) && (
        <div className="space-y-2">
          <InputLabel name={t('form.descriptionOptional')} />
          <TextAreaInput
            disabled={!isCreating}
            error={errors?.description}
            fieldName={(fieldNamePrefix + 'description') as 'description'}
            register={register}
          />
          <InputErrorMessage error={errors?.description} />
        </div>
      )}

      <div className="space-y-2">
        <InputLabel name={t('form.payment')} />

        <div className="flex min-w-0 flex-col flex-wrap gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
          <TokenInput
            amountError={errors?.amount}
            amountFieldName={(fieldNamePrefix + 'amount') as 'amount'}
            amountMax={selectedBalance}
            amountMin={convertMicroDenomToDenomWithDecimals(
              1,
              selectedDecimals
            )}
            amountStep={convertMicroDenomToDenomWithDecimals(
              1,
              selectedDecimals
            )}
            amountValidations={[
              (amount) =>
                amount <= selectedBalance ||
                t(insufficientBalanceI18nKey, {
                  amount: selectedBalance.toLocaleString(undefined, {
                    maximumFractionDigits: selectedDecimals,
                  }),
                  tokenSymbol:
                    selectedToken?.token.symbol ??
                    t('info.token').toLocaleUpperCase(),
                }),
            ]}
            onSelectToken={({ denomOrAddress }) =>
              setValue(
                (fieldNamePrefix + 'denomOrAddress') as 'denomOrAddress',
                denomOrAddress
              )
            }
            readOnly={!isCreating}
            register={register}
            selectedToken={selectedToken?.token}
            setValue={setValue}
            tokens={{
              loading: false,
              data: tokens.map(({ token }) => token),
            }}
            watch={watch}
          />

          <div className="flex min-w-0 grow flex-row items-stretch gap-2 sm:gap-3">
            <div className="flex flex-row items-center pl-1 sm:pl-0">
              <ArrowRightAltRounded className="!hidden !h-6 !w-6 text-text-secondary sm:!block" />
              <SubdirectoryArrowRightRounded className="!h-4 !w-4 text-text-secondary sm:!hidden" />
            </div>

            <AddressInput
              containerClassName="grow"
              disabled={!isCreating}
              error={errors?.recipient}
              fieldName={(fieldNamePrefix + 'recipient') as 'recipient'}
              register={register}
              validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
            />
          </div>
        </div>

        {(errors?.amount || errors?.denomOrAddress || errors?.recipient) && (
          <div className="space-y-1">
            <InputErrorMessage error={errors?.amount} />
            <InputErrorMessage error={errors?.denomOrAddress} />
            <InputErrorMessage error={errors?.recipient} />
          </div>
        )}
      </div>

      {
        // V1 and later can set the owner.
        !!widgetData.version &&
          widgetData.version >= VestingPaymentsWidgetVersion.V1 && (
            <div className="flex flex-col gap-4 rounded-md bg-background-tertiary p-4">
              <InputLabel name={t('form.whoCanCancelPayment')} />

              <RadioInput
                disabled={!isCreating}
                fieldName={(fieldNamePrefix + 'ownerMode') as 'ownerMode'}
                options={(
                  [
                    {
                      label: t('form.noOne'),
                      value: 'none',
                    },
                    {
                      display: <EntityDisplay address={address} />,
                      value: 'me',
                    },
                    {
                      label: t('form.anotherAccount'),
                      value: 'other',
                    },
                    {
                      label: t('form.moreThanOneAccount'),
                      value: 'many',
                    },
                  ] as RadioInputOption<BeginVestingData, 'ownerMode'>[]
                )
                  // Only show the selected option once created.
                  .filter(({ value }) => isCreating || value === ownerMode)}
                setValue={setValue}
                watch={watch}
              />

              {ownerMode === 'other' && (
                <AddressInput
                  disabled={!isCreating}
                  error={errors?.otherOwner}
                  fieldName={(fieldNamePrefix + 'otherOwner') as 'otherOwner'}
                  register={register}
                  validation={[
                    validateRequired,
                    makeValidateAddress(bech32Prefix),
                  ]}
                />
              )}

              {ownerMode === 'many' && (
                <div className={clsx('flex flex-col', isCreating && 'gap-2')}>
                  {manyOwnerFields.map(({ id }, index) => (
                    <div key={id} className="flex flex-row items-center gap-2">
                      <AddressInput
                        containerClassName="grow"
                        disabled={
                          !isCreating || !!manyOwnersCw1WhitelistContract
                        }
                        error={errors?.manyOwners?.[index]?.address}
                        fieldName={
                          (fieldNamePrefix +
                            `manyOwners.${index}.address`) as `manyOwners.${number}.address`
                        }
                        register={register}
                        validation={[
                          validateRequired,
                          makeValidateAddress(bech32Prefix),
                        ]}
                      />

                      {isCreating && !manyOwnersCw1WhitelistContract && (
                        <IconButton
                          Icon={Close}
                          disabled={creatingCw1WhitelistOwners}
                          onClick={() => removeManyOwner(index)}
                          size="sm"
                          variant="ghost"
                        />
                      )}
                    </div>
                  ))}

                  <InputErrorMessage
                    className="self-end pr-8"
                    error={errors?.manyOwnersCw1WhitelistContract}
                  />

                  {isCreating && !manyOwnersCw1WhitelistContract && (
                    <div className="flex flex-row justify-end gap-1 pr-8">
                      <Button
                        className="self-start"
                        loading={creatingCw1WhitelistOwners}
                        onClick={createCw1WhitelistOwners}
                        variant="primary"
                      >
                        {t('button.save')}
                      </Button>

                      <Button
                        className="self-start"
                        disabled={creatingCw1WhitelistOwners}
                        onClick={() =>
                          appendManyOwner({
                            address: '',
                          })
                        }
                        variant="secondary"
                      >
                        <Add className="!h-4 !w-4" />
                        {t('button.add')}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
      }

      <div className="flex flex-row flex-wrap gap-2">
        {/* Start Date */}
        <div className="flex max-w-xs flex-col gap-2">
          <div className="flex flex-row items-end gap-2">
            <InputLabel name={t('form.startDate')} />

            {/* Date Preview */}
            {formattedStartDate && isCreating && (
              <p className="caption-text">{formattedStartDate}</p>
            )}
          </div>

          {isCreating ? (
            <div className="flex flex-col gap-1">
              <TextInput
                error={errors?.startDate}
                fieldName={(fieldNamePrefix + 'startDate') as 'startDate'}
                // eslint-disable-next-line i18next/no-literal-string
                placeholder="YYYY-MM-DD HH:mm"
                register={register}
                validation={[validateRequired, makeValidateDate(t, true)]}
              />
              <InputErrorMessage error={errors?.startDate} />
            </div>
          ) : (
            <InputThemedText>{formattedStartDate}</InputThemedText>
          )}
        </div>

        {/* Finish Date, once created */}
        {!isCreating && formattedFinishDate && (
          <div className="flex max-w-xs flex-col gap-2">
            <InputLabel name={t('form.finishDate')} />
            <InputThemedText className="max-w-xs">
              {formattedFinishDate}
            </InputThemedText>
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3">
        <InputLabel name={t('form.steps')} primary />

        {stepFields.map(({ id }, index) => {
          const stepTimestamp =
            stepPoints && new Date(stepPoints[index].timestamp)

          return (
            <div
              key={id}
              className="flex flex-row flex-wrap items-center gap-2"
            >
              <div className="flex shrink-0 flex-col gap-1">
                <InputLabel name={t('form.unlockPercent')} />

                <NumberInput
                  disabled={!isCreating}
                  error={errors?.steps?.[index]?.percent}
                  fieldName={
                    (fieldNamePrefix +
                      `steps.${index}.percent`) as `steps.${number}.percent`
                  }
                  max={100}
                  min={0}
                  register={register}
                  setValue={setValue}
                  sizing="md"
                  step={0.01}
                  unit="%"
                  validation={[validateNonNegative, validateRequired]}
                  watch={watch}
                />

                <InputErrorMessage error={errors?.steps?.[index]?.percent} />
              </div>

              <div className="flex shrink-0 flex-col gap-1">
                <div className="flex flex-row items-end justify-between gap-2">
                  <InputLabel name={'...' + t('form.afterDelay')} />

                  {/* Date Preview */}
                  {stepTimestamp && (
                    <p className="caption-text">
                      ({formatDateTimeTz(stepTimestamp)})
                    </p>
                  )}
                </div>

                <div className="flex flex-row gap-1">
                  <NumberInput
                    disabled={!isCreating}
                    error={errors?.steps?.[index]?.delay?.value}
                    fieldName={
                      (fieldNamePrefix +
                        `steps.${index}.delay.value`) as `steps.${number}.delay.value`
                    }
                    min={1}
                    register={register}
                    setValue={setValue}
                    sizing="md"
                    step={1}
                    unit={
                      isCreating
                        ? undefined
                        : t(`unit.${steps[index].delay.units}`, {
                            count: steps[index].delay.value,
                          }).toLocaleLowerCase()
                    }
                    validation={[validatePositive, validateRequired]}
                    watch={watch}
                  />

                  {isCreating && (
                    <SelectInput
                      disabled={!isCreating}
                      error={errors?.steps?.[index]?.delay?.units}
                      fieldName={
                        (fieldNamePrefix +
                          `steps.${index}.delay.units`) as `steps.${number}.delay.units`
                      }
                      register={register}
                      validation={[validateRequired]}
                    >
                      {DurationUnitsValues.map((type, idx) => (
                        <option key={idx} value={type}>
                          {t(`unit.${type}`, {
                            count: steps[index].delay.value,
                          }).toLocaleLowerCase()}
                        </option>
                      ))}
                    </SelectInput>
                  )}
                </div>

                <InputErrorMessage
                  error={
                    errors?.steps?.[index]?.delay?.value ||
                    errors?.steps?.[index]?.delay?.units
                  }
                />
              </div>

              {isCreating && (
                <IconButton
                  Icon={Close}
                  className="mt-6"
                  onClick={() => removeStep(index)}
                  size="sm"
                  variant="ghost"
                />
              )}
            </div>
          )
        })}

        {isCreating && (
          <Button
            className="self-start"
            onClick={() =>
              appendStep({
                percent: 25,
                delay: {
                  value: 1,
                  units: DurationUnits.Months,
                },
              })
            }
            variant="secondary"
          >
            {t('button.addStep')}
          </Button>
        )}

        <InputErrorMessage error={errors?.steps} />
      </div>

      <div className="rounded-md bg-background-tertiary p-2">
        <VestingStepsLineGraph
          startTimestamp={parsedStartDate || 0}
          steps={stepPoints ?? []}
          tokenSymbol={selectedSymbol || t('info.token')}
        />
      </div>

      {
        // Widgets prior to V1 use the factory owner.
        !widgetData.version && !vestingFactoryOwner.loading && (
          <div className="flex flex-row items-center gap-4 rounded-md bg-background-secondary p-4">
            <WarningRounded className="!h-8 !w-8" />

            <div className="min-w-0 space-y-2">
              {vestingFactoryOwner.data === address ? (
                <p>
                  {t('info.vestingIsCancellableByOwner', {
                    context: context.type,
                  })}
                </p>
              ) : vestingFactoryOwner.data ? (
                <>
                  <p>{t('info.vestingIsCancellableByOther')}</p>

                  <CopyToClipboard
                    takeStartEnd={{ start: 16, end: 16 }}
                    value={vestingFactoryOwner.data}
                  />
                </>
              ) : (
                <p>{t('info.vestingNotCancellable')}</p>
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}
