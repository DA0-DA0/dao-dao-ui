import { Close } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { IconButton, InputErrorMessage, InputLabel } from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export type AcceptSubDaoData = {
  address: string
}

type AcceptSubDaoDataOptions = {
  AddressInput: ComponentType<AddressInputProps<any>>
}

export const AcceptSubDaoComponent: ActionComponent<
  AcceptSubDaoDataOptions,
  AcceptSubDaoData
> = ({ fieldNamePrefix, errors, isCreating, options: { AddressInput } }) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { register, resetField } = useFormContext<AcceptSubDaoData>()

  const addressFieldName = (fieldNamePrefix + 'address') as 'address'

  return (
    <>
      <div className="flex flex-col items-stretch gap-1">
        <p className="max-w-prose pb-2">
          {t('info.acceptSubDaoActionDescription')}
        </p>

        <InputLabel
          className="py-2"
          name={t('form.acceptSubDaoAddressInputLabel')}
        />

        <div className="flex flex-row items-center gap-2">
          <div className="grow">
            <div className="flex flex-row items-center gap-2">
              <AddressInput
                containerClassName="flex-1"
                disabled={!isCreating}
                error={errors?.address}
                fieldName={addressFieldName}
                register={register}
                validation={[
                  validateRequired,
                  makeValidateAddress(bech32Prefix),
                ]}
              />
              {isCreating && (
                <IconButton
                  Icon={Close}
                  onClick={() => {
                    resetField(addressFieldName)
                  }}
                  size="sm"
                  variant="ghost"
                />
              )}
            </div>
            <InputErrorMessage error={errors?.address} />
          </div>
        </div>
      </div>
    </>
  )
}
