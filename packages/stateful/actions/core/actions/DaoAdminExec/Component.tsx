import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  InputLabel,
  NestedActionsEditor,
  NestedActionsEditorOptions,
  NestedActionsRenderer,
  NestedActionsRendererProps,
  useChain,
} from '@dao-dao/stateless'
import { NestedActionsEditorFormData } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { isValidBech32Address } from '@dao-dao/utils'

export type DaoAdminExecData = {
  chainId: string
  coreAddress: string
} & NestedActionsEditorFormData

export type DaoAdminExecOptions = NestedActionsEditorOptions &
  Omit<NestedActionsRendererProps, 'msgsFieldName'>

export const DaoAdminExecComponent: ActionComponent<DaoAdminExecOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { bech32Prefix } = useChain()

  const { watch } = useFormContext<DaoAdminExecData>()
  const { fieldNamePrefix, isCreating, options } = props

  const coreAddress = watch((fieldNamePrefix + 'coreAddress') as 'coreAddress')

  return (
    <>
      {isValidBech32Address(coreAddress, bech32Prefix) && (
        <>
          <InputLabel className="-mb-2" name={t('title.actions')} />

          {isCreating ? (
            <NestedActionsEditor {...props} />
          ) : (
            <NestedActionsRenderer
              {...options}
              msgsFieldName={fieldNamePrefix + 'msgs'}
            />
          )}
        </>
      )}
    </>
  )
}
