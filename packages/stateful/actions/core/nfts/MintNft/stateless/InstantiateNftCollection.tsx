import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types'

import { InstantiateNftCollectionAction } from '../../../../../components'
import { InstantiateOptions } from '../types'

// Form displayed when the user is instantiating a new NFT collection.
export const InstantiateNftCollection: ActionComponent<InstantiateOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { trigger } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <InstantiateNftCollectionAction
        {...props}
        errors={props.errors?.instantiateData}
        fieldNamePrefix={props.fieldNamePrefix + 'instantiateData.'}
      />

      <Button
        className="self-end"
        loading={props.options.instantiating}
        onClick={async () => {
          // Manually validate just the instantiation fields.
          const valid = await trigger(props.fieldNamePrefix + 'instantiateData')
          valid && props.options.onInstantiate()
        }}
        size="lg"
      >
        {t('button.create')}
      </Button>
    </div>
  )
}
