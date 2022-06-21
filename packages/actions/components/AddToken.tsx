import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

import { useTranslation } from '@dao-dao/i18n'
import {
  AddressInput,
  InputErrorMessage,
  InputLabel,
  TokenInfoDisplay,
  TokenInfoDisplayProps,
} from '@dao-dao/ui'
import {
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils/validation'

import { ActionCard, ActionComponent } from '..'

export const AddTokenComponent: ActionComponent<TokenInfoDisplayProps> = ({
  getFieldName,
  onRemove,
  errors,
  readOnly,
  options,
}) => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <ActionCard
      emoji={<Emoji label={t('token')} symbol="🔘" />}
      onRemove={onRemove}
      title={t('addTreasuryToken')}
    >
      <div className="flex flex-col gap-2">
        <InputLabel name={t('Governance token address')} />
        <AddressInput
          disabled={readOnly}
          error={errors?.address}
          fieldName={getFieldName('address')}
          register={register}
          validation={[validateRequired, validateContractAddress]}
        />
        <InputErrorMessage error={errors?.address} />
      </div>

      <TokenInfoDisplay {...options} />
    </ActionCard>
  )
}
