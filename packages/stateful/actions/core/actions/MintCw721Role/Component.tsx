import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  DaoSupportedChainPickerInput,
  InputErrorMessage,
  InputLabel,
  NumericInput,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  getChainForChainId,
  makeValidateAddress,
  validatePositive,
  validateRequired,
  validateUrlWithIpfs,
} from '@dao-dao/utils'

import { type MintCw721RoleData } from './index'

const validatePositiveInteger = (value: string | number) =>
  Number.isSafeInteger(Number(value)) && Number(value) > 0
    ? true
    : 'Must be a positive safe integer.'

const validateRoleSlug = (value?: string | null) =>
  !value || /^[a-z][a-z0-9-]{1,31}$/.test(value)
    ? true
    : 'Role must be a lowercase slug, 2-32 characters, starting with a letter.'

const validateTokenId = (value?: string | null) =>
  value && !/\s/.test(value)
    ? true
    : 'Token ID is required and cannot contain spaces.'

const validateOptionalTokenUri = (value?: string | null) =>
  validateUrlWithIpfs(value || undefined)

export const MintCw721RoleComponent: ActionComponent<
  undefined,
  MintCw721RoleData
> = ({ fieldNamePrefix, errors, isCreating }) => {
  const { t } = useTranslation()
  const { register, watch } = useFormContext<MintCw721RoleData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const { bech32Prefix } = getChainForChainId(chainId)

  return (
    <>
      <p className="secondary-text max-w-prose">
        {t('form.cw721RolesMintInstructions')}
      </p>

      <DaoSupportedChainPickerInput
        className="mb-2"
        disabled={!isCreating}
        fieldName={fieldNamePrefix + 'chainId'}
        onlyDaoChainIds
      />

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.nftCollectionAddress')} />
        <AddressInput
          disabled={!isCreating}
          error={errors?.collectionAddress}
          fieldName={
            (fieldNamePrefix + 'collectionAddress') as 'collectionAddress'
          }
          register={register}
          validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
        />
        <InputErrorMessage error={errors?.collectionAddress} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.uniqueTokenId')} />
          <TextInput
            disabled={!isCreating}
            error={errors?.mintMsg?.token_id}
            fieldName={
              (fieldNamePrefix + 'mintMsg.token_id') as 'mintMsg.token_id'
            }
            register={register}
            validation={[validateRequired, validateTokenId]}
          />
          <InputErrorMessage error={errors?.mintMsg?.token_id} />
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel name={t('title.owner')} />
          <AddressInput
            disabled={!isCreating}
            error={errors?.mintMsg?.owner}
            fieldName={(fieldNamePrefix + 'mintMsg.owner') as 'mintMsg.owner'}
            register={register}
            validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
          />
          <InputErrorMessage error={errors?.mintMsg?.owner} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.roleOptional')} />
          <TextInput
            disabled={!isCreating}
            error={errors?.mintMsg?.extension?.role}
            fieldName={
              (fieldNamePrefix +
                'mintMsg.extension.role') as 'mintMsg.extension.role'
            }
            register={register}
            validation={[validateRoleSlug]}
          />
          <InputErrorMessage error={errors?.mintMsg?.extension?.role} />
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.weight')} />
          <NumericInput
            disabled={!isCreating}
            error={errors?.mintMsg?.extension?.weight}
            fieldName={
              (fieldNamePrefix +
                'mintMsg.extension.weight') as 'mintMsg.extension.weight'
            }
            min={1}
            register={register}
            step={1}
            validation={[
              validateRequired,
              validatePositive,
              validatePositiveInteger,
            ]}
          />
          <InputErrorMessage error={errors?.mintMsg?.extension?.weight} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.tokenUriOptional')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.mintMsg?.token_uri}
          fieldName={
            (fieldNamePrefix + 'mintMsg.token_uri') as 'mintMsg.token_uri'
          }
          register={register}
          validation={[validateOptionalTokenUri]}
        />
        <InputErrorMessage error={errors?.mintMsg?.token_uri} />
      </div>
    </>
  )
}
