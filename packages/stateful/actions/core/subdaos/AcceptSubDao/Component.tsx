import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, InputLabel } from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export type AcceptSubDaoData = {
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
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { register } = useFormContext<AcceptSubDaoData>()

  const addressFieldName = (fieldNamePrefix + 'address') as 'address'

  return (
    <>
      <div className="space-y-3">
        <p className="max-w-prose">{t('info.acceptSubDaoActionDescription')}</p>

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
      </div>
    </>
  )
}
