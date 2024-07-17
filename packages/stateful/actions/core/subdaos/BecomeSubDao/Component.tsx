import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, InputLabel } from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export type BecomeSubDaoData = {
  admin: string
}

type BecomeSubDaoDataOptions = {
  AddressInput: ComponentType<AddressInputProps<BecomeSubDaoData>>
}

export const BecomeSubDaoComponent: ActionComponent<
  BecomeSubDaoDataOptions,
  BecomeSubDaoData
> = ({ fieldNamePrefix, errors, isCreating, options: { AddressInput } }) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { register } = useFormContext<BecomeSubDaoData>()

  const adminFieldName = (fieldNamePrefix + 'admin') as 'admin'

  return (
    <>
      <div className="space-y-3">
        <p className="max-w-prose">
          {t('info.becomeSubDaoActionDescription', {
            context: !isCreating ? 'created' : undefined,
          })}
        </p>

        <div className="space-y-1">
          <InputLabel name={t('form.becomeSubDaoAdminInputLabel')} />
          <AddressInput
            containerClassName="flex-1"
            disabled={!isCreating}
            error={errors?.admin}
            fieldName={adminFieldName}
            register={register}
            type="contract"
            validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
          />
        </div>
        <InputErrorMessage error={errors?.admin} />
      </div>
    </>
  )
}
