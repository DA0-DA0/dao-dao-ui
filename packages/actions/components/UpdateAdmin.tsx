import Emoji from 'a11y-react-emoji'
import { useTranslation } from 'next-i18next'
import { useFormContext } from 'react-hook-form'

import { AddressInput, InputErrorMessage, InputLabel } from '@dao-dao/ui'
import {
  validateAddress,
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'
import { IsAdminWarning } from './IsAdminWarning'

export interface UpdateAdminOptions {
  onContractChange: (s: string) => void
  contractAdmin: string | undefined
}

export const UpdateAdminComponent: ActionComponent<UpdateAdminOptions> = ({
  getFieldName,
  onRemove,
  errors,
  readOnly,
  coreAddress,
  options: { onContractChange, contractAdmin },
}) => {
  const { register } = useFormContext()
  const { t } = useTranslation()

  return (
    <ActionCard
      emoji={<Emoji label={t('emoji.whale')} symbol="🍄" />}
      onRemove={onRemove}
      title={t('title.updateContractAdmin')}
    >
      <p className="mb-4 max-w-prose secondary-text">
        {t('form.updateAdminDescription')}
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex flex-col grow gap-1">
          <InputLabel name={t('form.smartContractAddress')} />
          <AddressInput
            disabled={readOnly}
            error={errors?.contract}
            fieldName={getFieldName('contract')}
            onChange={(e) => onContractChange(e.target.value)}
            register={register}
            validation={[validateRequired, validateContractAddress]}
          />
          <InputErrorMessage error={errors?.tokenAddress} />
        </div>
        <div className="flex flex-col grow gap-1">
          <InputLabel name={t('form.admin')} />
          <AddressInput
            disabled={readOnly}
            error={errors?.newAdmin}
            fieldName={getFieldName('newAdmin')}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
          <InputErrorMessage error={errors?.tokenAddress} />
        </div>
      </div>
      <div className="my-2">
        <IsAdminWarning admin={contractAdmin} maybeAdmin={coreAddress} />
      </div>
    </ActionCard>
  )
}
