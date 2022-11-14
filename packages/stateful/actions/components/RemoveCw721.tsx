import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  FormattedJsonDisplay,
  FormattedJsonDisplayProps,
  InputErrorMessage,
  InputLabel,
  XEmoji,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

interface Token {
  address: string
  info: ContractInfoResponse
}

export interface RemoveCw721Options {
  additionalAddressError?: string
  existingTokens: Token[]
  formattedJsonDisplayProps: FormattedJsonDisplayProps
}

export const RemoveCw721Component: ActionComponent<RemoveCw721Options> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: {
    additionalAddressError,
    existingTokens,
    formattedJsonDisplayProps,
  },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  const tokenAddress = watch(fieldNamePrefix + 'address')

  return (
    <ActionCard
      Icon={XEmoji}
      onRemove={onRemove}
      title={t('title.removeCw721FromTreasury')}
    >
      {existingTokens.length > 0 && (
        <>
          <InputLabel name={t('form.existingTokens')} />
          <div className="mb-2 flex flex-row flex-wrap gap-1">
            {existingTokens.map(({ address, info }) => (
              <Button
                key={address}
                center
                disabled={!isCreating}
                onClick={() => setValue(fieldNamePrefix + 'address', address)}
                pressed={tokenAddress === address}
                size="sm"
                type="button"
                variant="secondary"
              >
                ${info.symbol}
              </Button>
            ))}
          </div>
        </>
      )}

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
