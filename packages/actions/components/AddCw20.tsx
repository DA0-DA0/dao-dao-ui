import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  FormattedJSONDisplay,
  FormattedJSONDisplayProps,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/ui'
import {
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils/validation'

import { ActionCard, ActionComponent } from '..'

interface AddCw20Options {
  additionalAddressError?: string
  formattedJsonDisplayProps: FormattedJSONDisplayProps
}

export const AddCw20Component: ActionComponent<AddCw20Options> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  readOnly,
  options: { additionalAddressError, formattedJsonDisplayProps },
}) => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <ActionCard
      Icon={AddCw20Icon}
      onRemove={onRemove}
      title={t('title.addCw20ToTreasury')}
    >
      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.tokenAddress')} />
        <AddressInput
          disabled={readOnly}
          error={errors?.address}
          fieldName={fieldNamePrefix + 'address'}
          register={register}
          validation={[
            validateRequired,
            validateContractAddress,
            // Invalidate field if additional error is present.
            () => additionalAddressError || true,
          ]}
        />
        <InputErrorMessage
          error={
            errors?.address ||
            (additionalAddressError && { message: additionalAddressError })
          }
        />
      </div>

      <FormattedJSONDisplay {...formattedJsonDisplayProps} />
    </ActionCard>
  )
}

export const AddCw20Icon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.token')} symbol="🔘" />
}
