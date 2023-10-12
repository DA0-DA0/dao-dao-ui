import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, InputLabel, TextInput } from '@dao-dao/stateless'
import { ActionComponent, ChainId } from '@dao-dao/types'
import { validateRequired } from '@dao-dao/utils'

export type InstantiateNftCollectionData = {
  chainId: string
  name: string
  symbol: string
}

// Form displayed when the user is instantiating a new NFT collection.
export const InstantiateNftCollectionAction: ActionComponent = ({
  isCreating,
  fieldNamePrefix,
  errors,
}) => {
  const { t } = useTranslation()
  const { register, watch } = useFormContext<InstantiateNftCollectionData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')

  return (
    <div className="flex flex-col gap-4">
      {chainId === ChainId.StargazeMainnet ||
      chainId === ChainId.StargazeTestnet ? (
        <p className="body-text max-w-prose">
          {t('error.cannotUseCreateNftCollectionOnStargaze')}
        </p>
      ) : (
        <>
          <div className="space-y-2">
            <InputLabel name={t('form.collectionName')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.name}
              fieldName={(fieldNamePrefix + 'name') as 'name'}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.name} />
          </div>

          <div className="space-y-2">
            <InputLabel name={t('form.collectionSymbol')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.symbol}
              fieldName={(fieldNamePrefix + 'symbol') as 'symbol'}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.symbol} />
          </div>
        </>
      )}
    </div>
  )
}
