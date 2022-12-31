import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  FormattedJsonDisplay,
  FormattedJsonDisplayProps,
  ImageEmoji,
  InputErrorMessage,
  InputLabel,
  SegmentedControls,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import {
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils/validation'

import { ActionCard } from './ActionCard'

interface Token {
  address: string
  info: ContractInfoResponse
}

export interface ManageCw721Options {
  additionalAddressError?: string
  existingTokens: Token[]
  formattedJsonDisplayProps: FormattedJsonDisplayProps
}

export const ManageCw721Component: ActionComponent<ManageCw721Options> = ({
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
  const { register, setValue, watch } = useFormContext()

  const addingNew = watch(fieldNamePrefix + 'adding')
  const tokenAddress = watch(fieldNamePrefix + 'address')

  return (
    <ActionCard
      Icon={ImageEmoji}
      onRemove={onRemove}
      title={t('title.manageTreasuryNfts')}
    >
      <div className="flex flex-col gap-1">
        <SegmentedControls<boolean>
          onSelect={(value) => setValue(fieldNamePrefix + 'adding', value)}
          selected={addingNew}
          tabs={[
            {
              label: t('title.addCw721ToTreasury'),
              value: true,
            },
            {
              label: t('title.removeCw721FromTreasury'),
              value: false,
            },
          ]}
        />

        {!addingNew && existingTokens.length > 0 && (
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

        <InputLabel
          name={t('form.collectionAddress')}
          tooltip={
            addingNew
              ? t('info.addCw721ToTreasuryActionDescription')
              : t('info.removeCw721FromTreasuryActionDescription')
          }
        />
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
