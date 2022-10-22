import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  FormattedJsonDisplay,
  FormattedJsonDisplayProps,
  InputErrorMessage,
  InputLabel,
  RemoveCw20Emoji,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import { ActionCard } from './ActionCard'

interface Token {
  address: string
  info: TokenInfoResponse
}

interface RemoveCw20Options {
  additionalAddressError?: string
  existingTokens: Token[]
  formattedJsonDisplayProps: FormattedJsonDisplayProps
}

export const RemoveCw20Component: ActionComponent<RemoveCw20Options> = ({
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
      Icon={RemoveCw20Emoji}
      onRemove={onRemove}
      title={t('title.removeCw20FromTreasury')}
    >
      {existingTokens.length > 0 && (
        <>
          <InputLabel name={t('form.existingTokens')} />
          <div className="mb-2 grid grid-cols-5 gap-1">
            {existingTokens.map(({ address, info }) => (
              <Button
                key={address}
                className={clsx('text-center', {
                  'bg-transparent text-text-secondary':
                    address !== tokenAddress,
                })}
                disabled={!isCreating}
                onClick={() => setValue(fieldNamePrefix + 'address', address)}
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
