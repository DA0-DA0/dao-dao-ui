import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, InputLabel, useChain } from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

export type EnableApproverData = {
  approver: string
}

export type EnableApproverOptions = {
  AddressInput: ComponentType<AddressInputProps<EnableApproverData>>
}

export const EnableApproverComponent: ActionComponent<
  EnableApproverOptions
> = ({ isCreating, fieldNamePrefix, errors, options: { AddressInput } }) => {
  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix } = useChain()
  const { register } = useFormContext<EnableApproverData>()

  return (
    <>
      <p className="body-text max-w-prose">
        {t('info.enableApproverExplanation')}
      </p>

      <div className="flex flex-col gap-1 max-w-prose">
        <InputLabel name={t('title.approver')} />
        <AddressInput
          disabled={!isCreating}
          error={errors?.approver}
          fieldName={(fieldNamePrefix + 'approver') as 'approver'}
          register={register}
          validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
        />
        <InputErrorMessage error={errors?.approver} />
      </div>
    </>
  )
}
