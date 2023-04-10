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
  validateAddress,
  validateContractAddress,
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
  const { register } = useFormContext()
  const { t } = useTranslation()
  const { address } = useActionOptions()

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
            validation={[validateRequired, validateContractAddress]}
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
            validation={[validateRequired, validateAddress]}
          />
          <InputErrorMessage error={errors?.tokenAddress} />
        </div>
      </div>

      <IsAdminWarning admin={contractAdmin} maybeAdmin={address} />
    </>
  )
}
