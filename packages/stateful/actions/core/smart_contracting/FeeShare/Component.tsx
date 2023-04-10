import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  SegmentedControlsTitle,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { validateAddress, validateContractAddress } from '@dao-dao/utils'

export enum FeeShareType {
  Register = '/juno.feeshare.v1.MsgRegisterFeeShare',
  Update = '/juno.feeshare.v1.MsgUpdateFeeShare',
}

export type FeeShareData = {
  contract: string
  showWithdrawer: boolean
  typeUrl: FeeShareType
  withdrawer?: string
}

export const FeeShareComponent: ActionComponent = ({
  fieldNamePrefix,
  errors,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext<FeeShareData>()

  const showWithdrawer = watch(
    (fieldNamePrefix + 'showWithdrawer') as 'showWithdrawer'
  )

  return (
    <>
      <div className="flex flex-col items-stretch gap-1">
        <SegmentedControlsTitle
          editable={isCreating}
          fieldName={(fieldNamePrefix + 'typeUrl') as 'typeUrl'}
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
          fieldName={(fieldNamePrefix + 'contract') as 'contract'}
          placeholder={!isCreating ? t('info.none') : undefined}
          register={register}
          validation={[(v) => validateContractAddress(v, false)]}
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
            fieldName={(fieldNamePrefix + 'withdrawer') as 'withdrawer'}
            placeholder={!isCreating ? t('info.none') : undefined}
            register={register}
            validation={[(v) => validateAddress(v, false)]}
          />
          <InputErrorMessage error={errors?.contract} />
        </div>
      )}

      <FormSwitchCard
        containerClassName="self-start"
        fieldName={(fieldNamePrefix + 'showWithdrawer') as 'showWithdrawer'}
        label={t('form.feeShareToggleWithdrawerAddress')}
        readOnly={!isCreating}
        setValue={setValue}
        sizing="sm"
        tooltip={t('form.feeShareToggleWithdrawerAddressDescription')}
        tooltipIconSize="sm"
        value={watch((fieldNamePrefix + 'showWithdrawer') as 'showWithdrawer')}
      />
    </>
  )
}
