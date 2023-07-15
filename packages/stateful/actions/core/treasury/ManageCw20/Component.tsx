import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  FormattedJsonDisplay,
  FormattedJsonDisplayProps,
  InputErrorMessage,
  InputLabel,
  SegmentedControlsTitle,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import {
  makeValidateContractAddress,
  validateRequired,
} from '@dao-dao/utils/validation'

import { useActionOptions } from '../../../react'

interface Token {
  address: string
  info: TokenInfoResponse
}

export interface ManageCw20Options {
  additionalAddressError?: string
  existingTokens: Token[]
  formattedJsonDisplayProps: FormattedJsonDisplayProps
}

export const ManageCw20Component: ActionComponent<ManageCw20Options> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    additionalAddressError,
    existingTokens,
    formattedJsonDisplayProps,
  },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()
  const { register, setValue, watch } = useFormContext()

  const addingNew = watch(fieldNamePrefix + 'adding')
  const tokenAddress = watch(fieldNamePrefix + 'address')

  return (
    <>
      <div className="flex flex-col gap-1">
        <SegmentedControlsTitle
          className="mb-4"
          editable={isCreating}
          fieldName={fieldNamePrefix + 'adding'}
          tabs={[
            {
              label: t('title.addCw20ToTreasury'),
              value: true,
            },
            {
              label: t('title.removeCw20FromTreasury'),
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
                  pressed={address === tokenAddress}
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
          name={t('form.tokenAddress')}
          tooltip={
            addingNew
              ? t('info.addCw20ToTreasuryActionDescription')
              : t('info.removeCw20FromTreasuryActionDescription')
          }
        />
        <AddressInput
          disabled={!isCreating}
          error={errors?.address}
          fieldName={fieldNamePrefix + 'address'}
          register={register}
          type="contract"
          validation={[
            validateRequired,
            makeValidateContractAddress(bech32Prefix),
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
    </>
  )
}
