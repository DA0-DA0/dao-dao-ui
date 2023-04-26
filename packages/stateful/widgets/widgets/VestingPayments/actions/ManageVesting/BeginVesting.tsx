import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
  WarningRounded,
} from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CopyToClipboard,
  InputErrorMessage,
  InputLabel,
  InputThemedText,
  LineGraph,
  NumberInput,
  SelectInput,
  TextAreaInput,
  TextInput,
  TokenInput,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  AddressInputProps,
  DurationUnitsValues,
  DurationWithUnits,
  GenericTokenBalance,
  LoadingData,
} from '@dao-dao/types'
import {
  NATIVE_DECIMALS,
  convertDurationWithUnitsToSeconds,
  convertMicroDenomToDenomWithDecimals,
  formatDateTimeTz,
  makeValidateAddress,
  makeValidateDate,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../../../actions/react/context'

export type BeginVestingData = {
  amount: number
  denomOrAddress: string
  recipient: string
  title: string
  description?: string
  startDate?: string
  duration: DurationWithUnits
}

export type BeginVestingOptions = {
  tokens: GenericTokenBalance[]
  // The vesting contract factory owner. If undefined, no owner is set.
  vestingFactoryOwner: LoadingData<string | undefined>
  AddressInput: ComponentType<AddressInputProps>
}

export const BeginVesting: ActionComponent<BeginVestingOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { tokens, vestingFactoryOwner, AddressInput },
}) => {
  const { t } = useTranslation()
  const {
    context,
    address,
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { register, watch, setValue } = useFormContext()

  const watchAmount = watch(fieldNamePrefix + 'amount')
  const watchDenomOrAddress = watch(fieldNamePrefix + 'denomOrAddress')
  const parsedStartDate = Date.parse(watch(fieldNamePrefix + 'startDate'))
  const duration = watch(fieldNamePrefix + 'duration')

  const durationSeconds = !isNaN(duration.value)
    ? convertDurationWithUnitsToSeconds(duration)
    : 0

  const startDate = !isNaN(parsedStartDate)
    ? new Date(parsedStartDate)
    : undefined
  const formattedStartDate = startDate && formatDateTimeTz(startDate)
  const finishDate =
    startDate && new Date(startDate.getTime() + durationSeconds * 1000)
  const formattedFinishDate = finishDate && formatDateTimeTz(finishDate)

  const selectedToken = tokens.find(
    ({ token: { denomOrAddress } }) => denomOrAddress === watchDenomOrAddress
  )
  const selectedDecimals = selectedToken?.token.decimals ?? NATIVE_DECIMALS
  const selectedMicroBalance = selectedToken?.balance ?? 0
  const selectedBalance = convertMicroDenomToDenomWithDecimals(
    selectedMicroBalance,
    selectedDecimals
  )
  const selectedSymbol = selectedToken?.token?.symbol ?? t('info.tokens')

  const insufficientBalanceI18nKey =
    context.type === ActionContextType.Dao
      ? 'error.cantSpendMoreThanTreasury'
      : 'error.insufficientWalletBalance'

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <InputLabel name={t('form.title')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.title}
          fieldName={fieldNamePrefix + 'title'}
          register={register}
          required
        />
        <InputErrorMessage error={errors?.title} />
      </div>

      <div className="space-y-2">
        <InputLabel name={t('form.descriptionOptional')} />
        <TextAreaInput
          disabled={!isCreating}
          error={errors?.description}
          fieldName={fieldNamePrefix + 'description'}
          register={register}
        />
        <InputErrorMessage error={errors?.description} />
      </div>

      <div className="space-y-2">
        <InputLabel name={t('form.payment')} />

        <div className="flex min-w-0 flex-col flex-wrap gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
          <TokenInput
            amountError={errors?.amount}
            amountFieldName={fieldNamePrefix + 'amount'}
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
              setValue(fieldNamePrefix + 'denomOrAddress', denomOrAddress)
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
              fieldName={fieldNamePrefix + 'recipient'}
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

      {/* Vesting Dates */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
        {/* Start Date */}
        <div className="flex grow basis-0 flex-col gap-2">
          <div className="flex flex-row items-end gap-2">
            <InputLabel name={t('form.startDate')} />

            {/* Date Preview */}
            {formattedStartDate && isCreating && (
              <p className="caption-text">{formattedStartDate}</p>
            )}
          </div>

          {isCreating ? (
            <div className="flex grow flex-col gap-1">
              <TextInput
                className="grow"
                error={errors?.startDate}
                fieldName={fieldNamePrefix + 'startDate'}
                // eslint-disable-next-line i18next/no-literal-string
                placeholder="YYYY-MM-DD HH:mm"
                register={register}
                validation={[validateRequired, makeValidateDate(t, true)]}
              />
              <InputErrorMessage error={errors?.startDate} />
            </div>
          ) : (
            <InputThemedText className="grow">
              {formattedStartDate}
            </InputThemedText>
          )}
        </div>

        {/* Duration */}
        <div className="flex grow basis-0 flex-col gap-2">
          <InputLabel name={t('form.vestingDuration')} />

          <div className="grow">
            <div className="flex flex-row gap-2">
              <NumberInput
                containerClassName="grow"
                disabled={!isCreating}
                error={errors?.duration?.value}
                fieldName={fieldNamePrefix + 'duration.value'}
                min={1}
                register={register}
                setValue={setValue}
                sizing="sm"
                step={1}
                validation={[validatePositive, validateRequired]}
                watch={watch}
              />

              <SelectInput
                disabled={!isCreating}
                error={errors?.duration?.units}
                fieldName={fieldNamePrefix + 'duration.units'}
                register={register}
                validation={[validateRequired]}
              >
                {DurationUnitsValues.map((type, idx) => (
                  <option key={idx} value={type}>
                    {t(`unit.${type}`, {
                      count: duration.value,
                    }).toLocaleLowerCase()}
                  </option>
                ))}
              </SelectInput>
            </div>

            <InputErrorMessage error={errors?.durationSeconds} />
          </div>
        </div>
      </div>

      <div className="rounded-md bg-background-tertiary p-2">
        <LineGraph
          className="!h-40"
          labels={[
            formattedStartDate || t('form.startDate'),
            formattedFinishDate || t('form.finishDate'),
          ]}
          title={t('title.vestingCurve')}
          yTitle={'$' + selectedSymbol}
          yValues={[0, watchAmount]}
        />
      </div>

      {!vestingFactoryOwner.loading && (
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
      )}
    </div>
  )
}
