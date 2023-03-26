import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  GasEmoji,
  InputErrorMessage,
  InputLabel,
  SegmentedControls,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { validateAddress, validateContractAddress } from '@dao-dao/utils'

import { FeeShareType } from '../actions/FeeShare'
import { ActionCard } from './ActionCard'

export const FeeShareComponent: ActionComponent = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext()

  const showWithdrawer = watch(fieldNamePrefix + 'showWithdrawer')
  const typeUrl = watch(fieldNamePrefix + 'typeUrl')

  return (
    <ActionCard Icon={GasEmoji} onRemove={onRemove} title={t('title.feeShare')}>
      <div className="flex flex-col items-stretch gap-1">
        <SegmentedControls<string>
          onSelect={(value) => setValue(fieldNamePrefix + 'typeUrl', value)}
          selected={typeUrl}
          tabs={[
            {
              label: t('info.register'),
              value: FeeShareType.Register,
            },
            {
              label: t('button.update'),
              value: FeeShareType.Update,
            },
          ]}
        />
      </div>

      <div className="flex flex-col items-stretch gap-1">
        <InputLabel
          name={t('form.smartContractAddress')}
          tooltip={t('form.feeShareContractAddressDescription')}
        />
        <TextInput
          disabled={!isCreating}
          error={errors?.contract}
          fieldName={fieldNamePrefix + 'contract'}
          placeholder={!isCreating ? t('info.none') : undefined}
          register={register}
          validation={[(v: string) => validateContractAddress(v, false)]}
        />
        <InputErrorMessage error={errors?.contract} />
      </div>

      {showWithdrawer && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.feeShareWithdrawerAddress')}
            tooltip={t('form.feeShareWithdrawerAddressDescription')}
          />
          <TextInput
            disabled={!isCreating}
            error={errors?.withdrawer}
            fieldName={fieldNamePrefix + 'withdrawer'}
            placeholder={!isCreating ? t('info.none') : undefined}
            register={register}
            validation={[
              (v: string) =>
                validateAddress(v) || validateContractAddress(v, false),
            ]}
          />
          <InputErrorMessage error={errors?.contract} />
        </div>
      )}

      <FormSwitchCard
        containerClassName="self-start"
        fieldName={fieldNamePrefix + 'showWithdrawer'}
        label={t('form.feeShareToggleWithdrawerAddress')}
        onToggle={
          // Set message type URL back to delegate if custom is disabled.
          (showWithdrawer) =>
            setValue(fieldNamePrefix + 'showWithdrawer', showWithdrawer)
        }
        readOnly={!isCreating}
        setValue={setValue}
        sizing="sm"
        tooltip={t('form.feeShareToggleWithdrawerAddressDescription')}
        tooltipIconSize="sm"
        value={watch(fieldNamePrefix + 'showWithdrawer')}
      />
    </ActionCard>
  )
}
