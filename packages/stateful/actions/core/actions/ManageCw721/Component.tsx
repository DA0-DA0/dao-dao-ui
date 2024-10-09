import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  ChainProvider,
  DaoSupportedChainPickerInput,
  FormattedJsonDisplay,
  FormattedJsonDisplayProps,
  InputErrorMessage,
  InputLabel,
  SegmentedControlsTitle,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import { getChainForChainId } from '@dao-dao/utils'
import {
  makeValidateAddress,
  validateRequired,
} from '@dao-dao/utils/validation'

export type ManageCw721Data = {
  chainId: string
  adding: boolean
  address: string
}

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
  errors,
  isCreating,
  options: {
    additionalAddressError,
    existingTokens,
    formattedJsonDisplayProps,
  },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext<ManageCw721Data>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const chain = getChainForChainId(chainId)

  const addingNew = watch((fieldNamePrefix + 'adding') as 'adding')
  const tokenAddress = watch((fieldNamePrefix + 'address') as 'address')

  return (
    <>
      <div className="flex flex-col gap-1">
        <SegmentedControlsTitle
          className="mb-4"
          editable={isCreating}
          fieldName={fieldNamePrefix + 'adding'}
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

        <DaoSupportedChainPickerInput
          className="mb-2"
          disabled={!isCreating}
          fieldName={fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />

        {!addingNew && isCreating && existingTokens.length > 0 && (
          <>
            <InputLabel name={t('form.existingTokens')} />
            <div className="mb-2 flex flex-row flex-wrap gap-1">
              {existingTokens.map(({ address, info }) => (
                <Button
                  key={address}
                  center
                  disabled={!isCreating}
                  onClick={() =>
                    setValue(
                      (fieldNamePrefix + 'address') as 'address',
                      address
                    )
                  }
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
        <ChainProvider chainId={chainId}>
          <AddressInput
            disabled={!isCreating}
            error={errors?.address}
            fieldName={(fieldNamePrefix + 'address') as 'address'}
            register={register}
            type="contract"
            validation={[
              validateRequired,
              makeValidateAddress(chain.bech32Prefix),
              // Invalidate field if additional error is present.
              () => additionalAddressError || true,
            ]}
          />
        </ChainProvider>
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
