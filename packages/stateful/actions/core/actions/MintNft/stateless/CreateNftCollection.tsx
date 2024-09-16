import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/stateless'
import { ActionComponent, ChainId } from '@dao-dao/types'

import { InstantiateOptions, MintNftData } from '../types'

// Form displayed when the user is creating a new NFT collection.
export const CreateNftCollection: ActionComponent<InstantiateOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { trigger, watch } = useFormContext<MintNftData>()
  const chainId = watch(
    (props.fieldNamePrefix +
      'instantiateData.chainId') as 'instantiateData.chainId'
  )

  return (
    <div className="flex flex-col gap-4">
      <props.options.CreateNftCollectionAction
        {...props}
        data={props.data?.instantiateData}
        errors={props.errors?.instantiateData}
        fieldNamePrefix={props.fieldNamePrefix + 'instantiateData.'}
      />

      <Button
        className="self-end"
        disabled={
          // Can't instantiate directly on Stargaze.
          chainId === ChainId.StargazeMainnet ||
          chainId === ChainId.StargazeTestnet
        }
        loading={props.options.instantiating}
        onClick={async () => {
          // Manually validate just the instantiation fields.
          const valid = await trigger(
            (props.fieldNamePrefix + 'instantiateData') as 'instantiateData'
          )
          valid && props.options.onInstantiate()
        }}
        size="lg"
      >
        {t('button.create')}
      </Button>
    </div>
  )
}
