import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, InputLabel, useChain } from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

export type AcceptSubDaoData = {
  chainId: string
  address: string
}

type AcceptSubDaoDataOptions = {
  AddressInput: ComponentType<AddressInputProps<AcceptSubDaoData>>
}

export const AcceptSubDaoComponent: ActionComponent<
  AcceptSubDaoDataOptions,
  AcceptSubDaoData
> = ({ fieldNamePrefix, errors, isCreating, options: { AddressInput } }) => {
  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix } = useChain()
  const { register } = useFormContext<AcceptSubDaoData>()

  const addressFieldName = (fieldNamePrefix + 'address') as 'address'

  return (
    <div className="space-y-1">
      <InputLabel name={t('form.acceptSubDaoAddressInputLabel')} />
      <AddressInput
        disabled={!isCreating}
        error={errors?.address}
        fieldName={addressFieldName}
        register={register}
        type="contract"
        validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
      />
      <InputErrorMessage error={errors?.address} />
    </div>
  )
}
