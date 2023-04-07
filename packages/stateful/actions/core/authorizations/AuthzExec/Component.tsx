import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  NestedActionsEditor,
  NestedActionsEditorFormData,
  NestedActionsEditorOptions,
  NestedActionsRenderer,
  NestedActionsRendererProps,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  CosmosMsgFor_Empty,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  CHAIN_BECH32_PREFIX,
  isValidAddress,
  validateAddress,
} from '@dao-dao/utils'

export type AuthzExecData = {
  // Set common address to use for all actions.
  address: string
  // Once created, fill group adjacent messages by sender.
  _msgs?: {
    sender: string
    msgs: CosmosMsgFor_Empty[]
  }[]
} & NestedActionsEditorFormData

export type AuthzExecOptions = {
  AddressInput: ComponentType<AddressInputProps<AuthzExecData>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
} & NestedActionsEditorOptions &
  Omit<NestedActionsRendererProps, 'msgsFieldName'>

export const AuthzExecComponent: ActionComponent<AuthzExecOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { watch, register } = useFormContext<AuthzExecData>()
  const {
    fieldNamePrefix,
    errors,
    isCreating,
    options: { AddressInput, EntityDisplay, ...options },
  } = props

  const address = watch((fieldNamePrefix + 'address') as 'address')
  const msgsPerSender = watch((fieldNamePrefix + '_msgs') as '_msgs') || []

  return (
    <>
      {/* When creating, show common address field for all messages. When not creating, msgs will be grouped by sender and displayed in order, which if created via this action, will look the same with one address at the top and many actions below it. */}
      {isCreating && (
        <>
          <p className="title-text -mb-1">{t('title.account')}</p>

          <AddressInput
            error={errors?.address}
            fieldName={(fieldNamePrefix + 'address') as 'address'}
            register={register}
            validation={[validateAddress]}
          />
        </>
      )}

      {(isValidAddress(address, CHAIN_BECH32_PREFIX) || !isCreating) && (
        <>
          {isCreating ? (
            <>
              <p className="title-text -mb-1 mt-1">{t('title.actions')}</p>

              <NestedActionsEditor {...props} />
            </>
          ) : (
            // This will safely render all messages, even if they are not
            // created via this action, because they will be grouped by sender.
            msgsPerSender.map(({ sender }, index) => (
              <div key={index} className="flex flex-col gap-4">
                <p className="title-text -mb-1">{t('title.account')}</p>
                <EntityDisplay address={sender} />

                <p className="title-text -mb-1 mt-1">{t('title.actions')}</p>
                <NestedActionsRenderer
                  {...options}
                  msgsFieldName={fieldNamePrefix + `_msgs.${index}.msgs`}
                />
              </div>
            ))
          )}
        </>
      )}
    </>
  )
}
