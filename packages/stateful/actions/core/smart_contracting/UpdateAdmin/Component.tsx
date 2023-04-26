import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  InputErrorMessage,
  InputLabel,
  IsAdminWarning,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  makeValidateAddress,
  makeValidateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react/context'

export interface UpdateAdminOptions {
  onContractChange: (s: string) => void
  contractAdmin: string | undefined
}

export const UpdateAdminComponent: ActionComponent<UpdateAdminOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { onContractChange, contractAdmin },
}) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { register } = useFormContext()

  return (
    <>
      <p className="secondary-text max-w-prose">
        {t('form.updateAdminDescription')}
      </p>

      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex grow flex-col gap-1">
          <InputLabel name={t('form.smartContractAddress')} />
          <AddressInput
            disabled={!isCreating}
            error={errors?.contract}
            fieldName={fieldNamePrefix + 'contract'}
            onChange={(e) => onContractChange(e.target.value)}
            register={register}
            validation={[
              validateRequired,
              makeValidateContractAddress(bech32Prefix),
            ]}
          />
          <InputErrorMessage error={errors?.tokenAddress} />
        </div>
        <div className="flex grow flex-col gap-1">
          <InputLabel name={t('form.admin')} />
          <AddressInput
            disabled={!isCreating}
            error={errors?.newAdmin}
            fieldName={fieldNamePrefix + 'newAdmin'}
            register={register}
            validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
          />
          <InputErrorMessage error={errors?.tokenAddress} />
        </div>
      </div>

      <IsAdminWarning admin={contractAdmin} maybeAdmin={address} />
    </>
  )
}
