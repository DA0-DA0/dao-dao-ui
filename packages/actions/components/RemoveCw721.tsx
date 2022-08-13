import Emoji from 'a11y-react-emoji'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ContractInfoResponse } from '@dao-dao/state/clients/cw721-base'
import {
  AddressInput,
  Button,
  FormattedJSONDisplay,
  FormattedJSONDisplayProps,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/ui'
import { validateContractAddress, validateRequired } from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

interface Token {
  address: string
  info: ContractInfoResponse
}

interface RemoveCw721Options {
  additionalAddressError?: string
  existingTokens: Token[]
  formattedJsonDisplayProps: FormattedJSONDisplayProps
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
      Icon={RemoveCw721Icon}
      onRemove={onRemove}
      title={t('title.removeCw721FromTreasury')}
    >
      {existingTokens.length > 0 && (
        <>
          <InputLabel name={t('form.existingTokens')} />
          <div className="grid grid-cols-5 gap-1 mb-2">
            {existingTokens.map(({ address, info }) => (
              <Button
                key={address}
                className={clsx('text-center', {
                  'text-secondary bg-transparent': address !== tokenAddress,
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

      <FormattedJSONDisplay {...formattedJsonDisplayProps} />
    </ActionCard>
  )
}

export const RemoveCw721Icon = () => {
  const { t } = useTranslation()
  return <Emoji label={t('emoji.x')} symbol="❌" />
}
