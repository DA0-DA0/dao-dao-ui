import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
  fieldNamePrefix,
  onRemove,
  errors,
  readOnly,
  options,
}) => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <ActionCard
      Icon={AddTokenIcon}
      onRemove={onRemove}
      title={t('title.addTreasuryToken')}
    >
      <div className="flex flex-col gap-2">
        <InputLabel name={t('form.governanceTokenAddress')} />
        <AddressInput
          disabled={readOnly}
          error={errors?.address}
          fieldName={fieldNamePrefix + 'address'}
          register={register}
          validation={[validateRequired, validateContractAddress]}
        />
        <InputErrorMessage error={errors?.address} />
      </div>

      <TokenInfoDisplay {...options} />
    </ActionCard>
  )
}

export const AddTokenIcon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.token')} symbol="🔘" />
}
