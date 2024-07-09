import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  NestedActionsEditor,
  NestedActionsEditorOptions,
  NestedActionsRenderer,
  NestedActionsRendererProps,
  useChain,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  NestedActionsEditorFormData,
  StatefulEntityDisplayProps,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { isValidBech32Address, makeValidateAddress } from '@dao-dao/utils'

export type AuthzExecData = {
  chainId: string
  // Set common address to use for all actions.
  address: string
  // Once created, fill group adjacent messages by sender.
  _msgs?: {
    sender: string
    msgs: UnifiedCosmosMsg[]
  }[]
} & NestedActionsEditorFormData

export type AuthzExecOptions = {
  // When not creating, this will be set to the index of the group of messages
  // to render.
  msgPerSenderIndex?: number

  AddressInput: ComponentType<AddressInputProps<AuthzExecData>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
} & NestedActionsEditorOptions &
  Omit<NestedActionsRendererProps, 'msgsFieldName'>

export const AuthzExecComponent: ActionComponent<AuthzExecOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix } = useChain()
  const { watch, register } = useFormContext<AuthzExecData>()
  const {
    fieldNamePrefix,
    errors,
    isCreating,
    options: { msgPerSenderIndex, AddressInput, EntityDisplay, ...options },
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
            autoFocus
            error={errors?.address}
            fieldName={(fieldNamePrefix + 'address') as 'address'}
            register={register}
            validation={[makeValidateAddress(bech32Prefix)]}
          />
        </>
      )}

      {(isValidBech32Address(address, bech32Prefix) || !isCreating) && (
        <>
          {isCreating ? (
            <>
              <p className="title-text -mb-1 mt-3">{t('title.actions')}</p>

              <NestedActionsEditor {...props} />
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="title-text -mb-1">{t('title.account')}</p>
              <EntityDisplay
                address={msgsPerSender[msgPerSenderIndex!].sender}
              />

              <p className="title-text -mb-1 mt-4">{t('title.actions')}</p>
              <NestedActionsRenderer
                {...options}
                msgsFieldName={
                  fieldNamePrefix + `_msgs.${msgPerSenderIndex!}.msgs`
                }
              />
            </div>
          )}
        </>
      )}
    </>
  )
}
