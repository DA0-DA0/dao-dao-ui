import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  InputErrorMessage,
  InputLabel,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { useActionOptions } from '../../../../react'
import { InstantiateNftCollectionOptions } from '../types'

// Form displayed when the user is instantiating a new NFT collection.
export const InstantiateNftCollection: ActionComponent<
  InstantiateNftCollectionOptions
> = ({
  fieldNamePrefix,
  errors,
  options: { onInstantiate, instantiating, AddressInput },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()
  const { register, trigger } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <InputLabel name={t('form.whoCanMint')} />

        <AddressInput
          error={errors?.instantiateMsg?.minter}
          fieldName={fieldNamePrefix + 'instantiateMsg.minter'}
          register={register}
          validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
        />

        <InputErrorMessage error={errors?.instantiateMsg?.minter} />
      </div>

      <div className="space-y-2">
        <InputLabel name={t('form.collectionName')} />

        <TextInput
          error={errors?.instantiateMsg?.name}
          fieldName={fieldNamePrefix + 'instantiateMsg.name'}
          register={register}
          validation={[validateRequired]}
        />

        <InputErrorMessage error={errors?.instantiateMsg?.name} />
      </div>

      <div className="space-y-2">
        <InputLabel name={t('form.collectionSymbol')} />

        <TextInput
          error={errors?.instantiateMsg?.symbol}
          fieldName={fieldNamePrefix + 'instantiateMsg.symbol'}
          register={register}
          validation={[validateRequired]}
        />

        <InputErrorMessage error={errors?.instantiateMsg?.symbol} />
      </div>

      <Button
        className="self-end"
        loading={instantiating}
        onClick={async () => {
          // Manually validate just the instantiation fields.
          const valid = await trigger(fieldNamePrefix + 'instantiateMsg')
          valid && onInstantiate()
        }}
        size="lg"
      >
        {t('button.create')}
      </Button>
    </div>
  )
}
