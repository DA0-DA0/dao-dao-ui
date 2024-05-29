import { Close } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { IconButton, InputErrorMessage, InputLabel } from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export type BecomeSubDaoData = {
  address: string
  admin: string
}

type BecomeSubDaoDataOptions = {
  AddressInput: ComponentType<AddressInputProps<any>>
}

export const BecomeSubDaoComponent: ActionComponent<
  BecomeSubDaoDataOptions,
  BecomeSubDaoData
> = ({ fieldNamePrefix, errors, isCreating, options: { AddressInput } }) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { register, resetField } = useFormContext<BecomeSubDaoData>()

  const adminFieldName = (fieldNamePrefix + 'admin') as 'admin'

  return (
    <>
      <div className="flex flex-col items-stretch gap-1">
        <p className="max-w-prose pb-2">
          Once you choose what DAO you want to be a SubDAO of, your parent DAO
          will need to accept your nomination.
        </p>

        <InputLabel
          className="py-2"
          name={t('form.becomeSubDaoAdminInputLabel')}
        />

        <div className="flex flex-row items-center gap-2">
          <div className="grow">
            <div className="flex flex-row items-center gap-2">
              <AddressInput
                containerClassName="flex-1"
                disabled={!isCreating}
                error={errors?.admin}
                fieldName={adminFieldName}
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
                    resetField(adminFieldName)
                  }}
                  size="sm"
                  variant="ghost"
                />
              )}
            </div>
            <InputErrorMessage error={errors?.admin} />
          </div>
        </div>
      </div>
    </>
  )
}
