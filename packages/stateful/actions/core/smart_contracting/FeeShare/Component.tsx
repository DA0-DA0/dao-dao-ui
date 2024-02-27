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
import { makeValidateAddress } from '@dao-dao/utils'
import {
  MsgRegisterFeeShare,
  MsgUpdateFeeShare,
} from '@dao-dao/utils/protobuf/codegen/juno/feeshare/v1/tx'

import { useActionOptions } from '../../../react'

export type FeeShareData = {
  typeUrl: string
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
  const {
    context,
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()
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
              value: MsgRegisterFeeShare.typeUrl,
            },
            {
              label: t('button.update'),
              value: MsgUpdateFeeShare.typeUrl,
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
          validation={[makeValidateAddress(bech32Prefix, false)]}
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
            validation={[makeValidateAddress(bech32Prefix, false)]}
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
