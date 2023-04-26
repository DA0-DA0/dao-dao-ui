import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  NestedActionsEditor,
  NestedActionsEditorFormData,
  NestedActionsEditorOptions,
  NestedActionsRenderer,
  NestedActionsRendererProps,
  RadioInput,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'
import { POLYTONE_NOTES, getNameForChainId } from '@dao-dao/utils'

export type CrossChainExecData = {
  chainId: string
} & NestedActionsEditorFormData

export type CrossChainExecOptions = NestedActionsEditorOptions &
  Omit<NestedActionsRendererProps, 'msgsFieldName'>

export const CrossChainExecComponent: ActionComponent<CrossChainExecOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<CrossChainExecData>()
  const { fieldNamePrefix, isCreating, options } = props

  const msgs = watch((fieldNamePrefix + 'msgs') as 'msgs')

  return (
    <>
      <p className="title-text">{t('title.chain')}</p>
      <div className="mb-2">
        <RadioInput
          disabled={!isCreating}
          fieldName={(fieldNamePrefix + 'chainId') as 'chainId'}
          options={Object.keys(POLYTONE_NOTES).map((chainId) => ({
            label: getNameForChainId(chainId),
            value: chainId,
          }))}
          setValue={setValue}
          watch={watch}
        />
      </div>

      <p className="title-text">{t('title.actions')}</p>

      {isCreating ? (
        <NestedActionsEditor {...props} />
      ) : msgs.length > 0 ? (
        <NestedActionsRenderer
          {...options}
          msgsFieldName={fieldNamePrefix + 'msgs'}
        />
      ) : (
        <p className="secondary-text italic">{t('info.none')}</p>
      )}
    </>
  )
}
