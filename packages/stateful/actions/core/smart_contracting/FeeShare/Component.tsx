import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  SegmentedControlsTitle,
} from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { validateAddress, validateContractAddress } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export enum FeeShareType {
  Register = '/juno.feeshare.v1.MsgRegisterFeeShare',
  Update = '/juno.feeshare.v1.MsgUpdateFeeShare',
}

export type FeeShareData = {
  typeUrl: FeeShareType
  contract: string
  showWithdrawer: boolean
  withdrawer?: string
}

export type FeeShareOptions = {
  AddressInput: ComponentType<AddressInputProps<FeeShareData>>
}

export const FeeShareComponent: ActionComponent<FeeShareOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { AddressInput },
}) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()
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
        <AddressInput
          disabled={!isCreating}
          error={errors?.contract}
          fieldName={(fieldNamePrefix + 'contract') as 'contract'}
          register={register}
          type="contract"
          validation={[(v) => validateContractAddress(v, false)]}
        />
        <InputErrorMessage error={errors?.contract} />
      </div>

      {showWithdrawer && (
        <div className="flex flex-col items-stretch gap-1">
          <InputLabel
            name={t('form.feeShareWithdrawerAddress')}
            tooltip={t('form.feeShareWithdrawerAddressTooltip')}
          />
          <AddressInput
            disabled={!isCreating}
            error={errors?.withdrawer}
            fieldName={(fieldNamePrefix + 'withdrawer') as 'withdrawer'}
            register={register}
            validation={[(v) => validateAddress(v, false)]}
          />
          <InputErrorMessage error={errors?.withdrawer} />
        </div>
      )}

      <FormSwitchCard
        containerClassName="self-start"
        fieldName={(fieldNamePrefix + 'showWithdrawer') as 'showWithdrawer'}
        label={t('form.feeShareToggleWithdrawerAddress')}
        readOnly={!isCreating}
        setValue={setValue}
        sizing="sm"
        tooltip={t('form.feeShareToggleWithdrawerAddressTooltip', {
          context: context.type,
        })}
        tooltipIconSize="sm"
        value={watch((fieldNamePrefix + 'showWithdrawer') as 'showWithdrawer')}
      />
    </>
  )
}
