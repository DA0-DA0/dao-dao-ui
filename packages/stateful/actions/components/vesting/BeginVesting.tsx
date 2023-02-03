import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionOptionsContextType,
  AddressInputProps,
  GenericToken,
} from '@dao-dao/types'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  formatDateTimeTz,
  makeValidateDate,
  validateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../react'

export type BeginVestingData = {
  amount: number
  denomOrAddress: string
  recipient: string
  title?: string
  description?: string
  startDate: string
  finishDate: string
}
export type BeginVestingOptions = {
  tokens: (GenericToken & { microBalance: number })[]
  AddressInput: ComponentType<AddressInputProps>
}

export const BeginVesting: ActionComponent<BeginVestingOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { tokens, AddressInput },
}) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()

  const { register, watch, setValue } = useFormContext()
  const watchDenomOrAddress = watch(fieldNamePrefix + 'denomOrAddress')
  const startDate = watch(fieldNamePrefix + 'startDate')
  const finishDate = watch(fieldNamePrefix + 'finishDate')

  const selectedToken = tokens.find(
    ({ denomOrAddress }) => denomOrAddress === watchDenomOrAddress
  )
  const selectedDecimals = selectedToken?.decimals ?? NATIVE_DECIMALS
  const selectedMicroBalance = selectedToken?.microBalance ?? 0
  const selectedBalance = convertMicroDenomToDenomWithDecimals(
    selectedMicroBalance,
    selectedDecimals
  )

  const insufficientBalanceI18nKey =
    context.type === ActionOptionsContextType.Dao
      ? 'error.cantSpendMoreThanTreasury'
      : 'error.insufficientWalletBalance'

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <InputLabel name={t('form.payment')} />

        <div className="flex min-w-0 flex-col flex-wrap gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
          <div className="flex grow flex-row items-stretch gap-2">
            <NumberInput
              containerClassName="grow"
              disabled={!isCreating}
              error={errors?.amount}
              fieldName={fieldNamePrefix + 'amount'}
              min={1 / 10 ** selectedDecimals}
              register={register}
              setValue={setValue}
              sizing="auto"
              step={1 / 10 ** selectedDecimals}
              validation={[
                validateRequired,
                validatePositive,
                (amount) =>
                  amount <= selectedBalance ||
                  t(insufficientBalanceI18nKey, {
                    amount: selectedBalance.toLocaleString(undefined, {
                      maximumFractionDigits: selectedDecimals,
                    }),
                    tokenSymbol:
                      selectedToken?.symbol ??
                      t('info.token').toLocaleUpperCase(),
                  }),
              ]}
              watch={watch}
            />

            <SelectInput
              defaultValue={NATIVE_DENOM}
              disabled={!isCreating}
              error={errors?.denomOrAddress}
              fieldName={fieldNamePrefix + 'denomOrAddress'}
              register={register}
              style={{ maxWidth: '8.2rem' }}
            >
              {tokens.map(({ denomOrAddress, symbol }) => (
                <option key={denomOrAddress} value={denomOrAddress}>
                  ${symbol}
                </option>
              ))}
            </SelectInput>
          </div>

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
              validation={[validateRequired, validateAddress]}
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
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Start Date */}
        <div className="grow basis-0 space-y-2">
          <div className="flex flex-row items-end gap-2">
            <InputLabel name={t('form.startDate')} />

            {/* Date Preview */}
            {!!startDate && !isNaN(Date.parse(startDate)) && (
              <p className="caption-text">
                {formatDateTimeTz(new Date(startDate))}
              </p>
            )}
          </div>

          <div>
            <TextInput
              error={errors?.startDate}
              fieldName="startDate"
              // eslint-disable-next-line i18next/no-literal-string
              placeholder="YYYY-MM-DD HH:mm"
              register={register}
              validation={[validateRequired, makeValidateDate(t)]}
            />
            <InputErrorMessage error={errors?.startDate} />
          </div>
        </div>

        {/* Finish Date */}
        <div className="grow basis-0 space-y-2">
          <div className="flex flex-row items-end gap-2">
            <InputLabel name={t('form.finishDate')} />

            {/* Date Preview */}
            {!!finishDate && !isNaN(Date.parse(finishDate)) && (
              <p className="caption-text">
                {formatDateTimeTz(new Date(finishDate))}
              </p>
            )}
          </div>

          <div>
            <TextInput
              error={errors?.finishDate}
              fieldName="finishDate"
              // eslint-disable-next-line i18next/no-literal-string
              placeholder="YYYY-MM-DD HH:mm"
              register={register}
              validation={[
                validateRequired,
                makeValidateDate(t),
                // Ensure close date is after open date.
                () =>
                  // Valid if dates not yet available.
                  !(
                    startDate &&
                    !isNaN(Date.parse(startDate)) &&
                    finishDate &&
                    !isNaN(Date.parse(finishDate))
                  ) ||
                  new Date(finishDate) > new Date(startDate) ||
                  t('error.finishDateMustBeAfterStartDate'),
              ]}
            />
            <InputErrorMessage error={errors?.finishDate} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <InputLabel name={t('form.titleOptional')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.title}
          fieldName={fieldNamePrefix + 'title'}
          register={register}
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
    </div>
  )
}
