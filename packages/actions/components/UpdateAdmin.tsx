import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/tstypes/actions'
import {
  AddressInput,
  InputErrorMessage,
  InputLabel,
  UpdateAdminEmoji,
} from '@dao-dao/ui'
import {
  validateAddress,
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../react/context'
import { ActionCard } from './ActionCard'
import { IsAdminWarning } from './IsAdminWarning'

export interface UpdateAdminOptions {
  onContractChange: (s: string) => void
  contractAdmin: string | undefined
}

export const UpdateAdminComponent: ActionComponent<UpdateAdminOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { onContractChange, contractAdmin },
}) => {
  const { register } = useFormContext()
  const { t } = useTranslation()
  const { address } = useActionOptions()

  return (
    <ActionCard
      Icon={UpdateAdminEmoji}
      onRemove={onRemove}
      title={t('title.updateContractAdmin')}
    >
      <p className="secondary-text mb-4 max-w-prose">
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
      <div className="my-2">
        <IsAdminWarning admin={contractAdmin} maybeAdmin={address} />
      </div>
    </ActionCard>
  )
}
