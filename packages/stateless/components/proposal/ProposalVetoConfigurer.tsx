import { Add, Close, Edit } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useCallback } from 'react'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  AddressInputProps,
  CreateCw1Whitelist,
  DurationUnitsValues,
  ProposalVetoConfig,
} from '@dao-dao/types'
import {
  makeValidateAddress,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

import { useChain } from '../../contexts'
import { Button } from '../buttons'
import { IconButton } from '../icon_buttons'
import {
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  NumericInput,
  SelectInput,
} from '../inputs'

export type ProposalVetoConfigProps = {
  veto: ProposalVetoConfig
  fieldNamePrefix: string
  errors?: FieldErrors<ProposalVetoConfig>
  disabled?: boolean
  createCw1WhitelistVetoers: CreateCw1Whitelist
  creatingCw1WhitelistVetoers: boolean
  AddressInput: ComponentType<AddressInputProps<ProposalVetoConfig>>
  className?: string
}

export const ProposalVetoConfigurer = ({
  veto,
  fieldNamePrefix,
  errors,
  disabled,
  createCw1WhitelistVetoers,
  creatingCw1WhitelistVetoers,
  AddressInput,
  className,
}: ProposalVetoConfigProps) => {
  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix } = useChain()

  const { control, register, setValue, getValues } =
    useFormContext<ProposalVetoConfig>()

  const {
    fields: vetoerFields,
    append: appendVetoer,
    remove: removeVetoer,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'addresses') as 'addresses',
  })

  const onCreateCw1WhitelistVetoers = useCallback(async () => {
    const contractAddress = await createCw1WhitelistVetoers(
      veto.addresses.map(({ address }) => address)
    )

    // Address is valid on success and undefined on error. Errors
    // are handled automatically, so we can just do nothing here.
    if (contractAddress) {
      setValue(
        (fieldNamePrefix + 'cw1WhitelistAddress') as 'cw1WhitelistAddress',
        contractAddress
      )

      toast.success(t('success.saved'))
    }
  }, [createCw1WhitelistVetoers, fieldNamePrefix, setValue, t, veto.addresses])

  return (
    <div className={className}>
      <div className="space-y-2">
        <InputLabel name={t('form.whoCanVetoProposals')} />

        <div className={clsx(!veto.cw1WhitelistAddress && 'space-y-2')}>
          {vetoerFields.map(({ id }, index) => (
            <div key={id} className="flex flex-row items-center gap-1">
              <AddressInput
                containerClassName="grow"
                disabled={disabled || !!veto.cw1WhitelistAddress}
                error={errors?.addresses?.[index]?.address}
                fieldName={
                  (fieldNamePrefix +
                    `addresses.${index}.address`) as `addresses.${number}.address`
                }
                register={register}
                validation={[
                  validateRequired,
                  makeValidateAddress(bech32Prefix),
                ]}
              />

              {!disabled && !veto.cw1WhitelistAddress && index > 0 && (
                <IconButton
                  Icon={Close}
                  disabled={creatingCw1WhitelistVetoers}
                  onClick={() => removeVetoer(index)}
                  size="sm"
                  variant="ghost"
                />
              )}
            </div>
          ))}
        </div>

        <InputErrorMessage error={errors?.cw1WhitelistAddress} />

        {!disabled && (
          <div className="flex flex-row justify-between">
            {veto.cw1WhitelistAddress ? (
              <Button
                className="self-start"
                onClick={() =>
                  setValue(
                    (fieldNamePrefix +
                      'cw1WhitelistAddress') as 'cw1WhitelistAddress',
                    undefined
                  )
                }
                variant="secondary"
              >
                <Edit className="!h-4 !w-4" />
                {t('button.changeVetoer')}
              </Button>
            ) : (
              <Button
                className="self-start"
                disabled={creatingCw1WhitelistVetoers}
                onClick={() =>
                  appendVetoer({
                    address: '',
                  })
                }
                variant="secondary"
              >
                <Add className="!h-4 !w-4" />
                {t('button.addVetoer')}
              </Button>
            )}

            {!veto.cw1WhitelistAddress && vetoerFields.length > 1 && (
              <Button
                className="self-start"
                loading={creatingCw1WhitelistVetoers}
                onClick={onCreateCw1WhitelistVetoers}
                variant="primary"
              >
                {t('button.save')}
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <InputLabel
          name={t('form.timelockDuration')}
          tooltip={t('form.timelockDurationTooltip')}
        />

        <div className="flex flex-row gap-2">
          <NumericInput
            containerClassName="grow"
            disabled={disabled}
            error={errors?.timelockDuration?.value}
            fieldName={
              (fieldNamePrefix +
                'timelockDuration.value') as 'timelockDuration.value'
            }
            getValues={getValues}
            min={0}
            numericValue
            register={register}
            setValue={setValue}
            sizing="sm"
            step={1}
            validation={[validateRequired, validateNonNegative]}
          />

          <SelectInput
            disabled={disabled}
            error={errors?.timelockDuration?.units}
            fieldName={
              (fieldNamePrefix +
                'timelockDuration.units') as 'timelockDuration.units'
            }
            register={register}
            validation={[validateRequired]}
          >
            {DurationUnitsValues.map((type, idx) => (
              <option key={idx} value={type}>
                {t(`unit.${type}`, {
                  count: veto.timelockDuration?.value,
                }).toLocaleLowerCase()}
              </option>
            ))}
          </SelectInput>
        </div>
      </div>

      <FormSwitchCard
        containerClassName="self-start"
        fieldName={(fieldNamePrefix + 'earlyExecute') as 'earlyExecute'}
        label={t('form.earlyExecute')}
        readOnly={disabled}
        setValue={setValue}
        sizing="sm"
        tooltip={t('form.earlyExecuteTooltip')}
        value={veto.earlyExecute}
      />

      <FormSwitchCard
        containerClassName="self-start"
        fieldName={(fieldNamePrefix + 'vetoBeforePassed') as 'vetoBeforePassed'}
        label={t('form.vetoBeforePassed')}
        readOnly={disabled}
        setValue={setValue}
        sizing="sm"
        tooltip={t('form.vetoBeforePassedTooltip')}
        value={veto.vetoBeforePassed}
      />
    </div>
  )
}
