import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  InputErrorMessage,
  InputLabel,
  TextInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'
import { validateAddress, validateRequired } from '@dao-dao/utils'

import { InstantiateNftCollectionOptions } from './types'

// Form displayed when the user is instantiating a new NFT collection.
export const InstantiateNftCollection: ActionComponent<
  InstantiateNftCollectionOptions
> = ({
  fieldNamePrefix,
  errors,
  options: { onInstantiate, instantiating, ProfileDisplay },
}) => {
  const { t } = useTranslation()

  const { register, trigger } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-prose">{t('form.nftCollectionCreateInstructions')}</p>

      <div className="space-y-2">
        <InputLabel name={t('form.whoCanMint')} />

        <AddressInput
          ProfileDisplay={ProfileDisplay}
          error={errors?.instantiateMsg?.minter}
          fieldName={fieldNamePrefix + 'instantiateMsg.minter'}
          register={register}
          validation={[validateRequired, validateAddress]}
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
