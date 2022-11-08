import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  FormattedJsonDisplay,
  FormattedJsonDisplayProps,
  ImageEmoji,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils/validation'

import { ActionCard } from './ActionCard'

interface AddCw721Options {
  additionalAddressError?: string
  formattedJsonDisplayProps: FormattedJsonDisplayProps
}

export const AddCw721Component: ActionComponent<AddCw721Options> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { additionalAddressError, formattedJsonDisplayProps },
}) => {
  const { t } = useTranslation()
  const { register } = useFormContext()

  return (
    <ActionCard
      Icon={ImageEmoji}
      onRemove={onRemove}
      title={t('title.addCw721ToTreasury')}
    >
      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.tokenAddress')} />
        <AddressInput
          disabled={!isCreating}
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

      <FormattedJsonDisplay {...formattedJsonDisplayProps} />
    </ActionCard>
  )
}
