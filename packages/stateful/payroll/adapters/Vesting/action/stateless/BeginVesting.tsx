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
  LineGraph,
  NumberInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionOptionsContextType,
  AddressInputProps,
  GenericTokenBalance,
  LoadingData,
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

import { useActionOptions } from '../../../../../actions/react'

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
  const { address, context } = useActionOptions()

  const { register, watch, setValue } = useFormContext()
  const watchAmount = watch(fieldNamePrefix + 'amount')
  const watchDenomOrAddress = watch(fieldNamePrefix + 'denomOrAddress')
  const parsedStartDate = Date.parse(watch(fieldNamePrefix + 'startDate'))
  const parsedFinishDate = Date.parse(watch(fieldNamePrefix + 'finishDate'))

  const formattedStartDate = !isNaN(parsedStartDate)
    ? formatDateTimeTz(new Date(parsedStartDate))
    : undefined
  const formattedFinishDate = !isNaN(parsedFinishDate)
    ? formatDateTimeTz(new Date(parsedFinishDate))
    : undefined

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
                      selectedToken?.token.symbol ??
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
              {tokens.map(({ token: { denomOrAddress, symbol } }) => (
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
            {formattedStartDate && (
              <p className="caption-text">{formattedStartDate}</p>
            )}
          </div>

          <div>
            <TextInput
              disabled={!isCreating}
              error={errors?.startDate}
              fieldName={fieldNamePrefix + 'startDate'}
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
            {formattedFinishDate && (
              <p className="caption-text">{formattedFinishDate}</p>
            )}
          </div>

          <div>
            <TextInput
              disabled={!isCreating}
              error={errors?.finishDate}
              fieldName={fieldNamePrefix + 'finishDate'}
              // eslint-disable-next-line i18next/no-literal-string
              placeholder="YYYY-MM-DD HH:mm"
              register={register}
              validation={[
                validateRequired,
                makeValidateDate(t),
                // Ensure close date is after open date.
                () =>
                  // Valid if dates not yet available.
                  !(!isNaN(parsedStartDate) && !isNaN(parsedFinishDate)) ||
                  new Date(parsedFinishDate) > new Date(parsedStartDate) ||
                  t('error.finishDateMustBeAfterStartDate'),
              ]}
            />
            <InputErrorMessage error={errors?.finishDate} />
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
