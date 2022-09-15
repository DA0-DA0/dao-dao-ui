import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/tstypes/actions'
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

import { ActionCard } from './ActionCard'

interface AddCw721Options {
  additionalAddressError?: string
  formattedJsonDisplayProps: FormattedJSONDisplayProps
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
      Icon={AddCw721Icon}
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

      <FormattedJSONDisplay {...formattedJsonDisplayProps} />
    </ActionCard>
  )
}

export const AddCw721Icon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.image')} symbol="🖼" />
}
