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
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  CHAIN_BECH32_PREFIX,
  isValidAddress,
  validateAddress,
} from '@dao-dao/utils'

export type AuthzExecData = {
  address: string
} & NestedActionsEditorFormData

export type AuthzExecOptions = {
  AddressInput: ComponentType<AddressInputProps<AuthzExecData>>
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
    options: { AddressInput, ...options },
  } = props

  const address = watch((fieldNamePrefix + 'address') as 'address')

  return (
    <>
      <AddressInput
        error={errors?.address}
        fieldName={(fieldNamePrefix + 'address') as 'address'}
        register={register}
        validation={[validateAddress]}
      />

      {isValidAddress(address, CHAIN_BECH32_PREFIX) && (
        <>
          <p className="title-text">{t('title.actions')}</p>

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
