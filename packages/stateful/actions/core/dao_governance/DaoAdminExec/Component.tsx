import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Loader,
  NestedActionsEditor,
  NestedActionsEditorOptions,
  NestedActionsRenderer,
  NestedActionsRendererProps,
  RadioInput,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  LoadingData,
  NestedActionsEditorFormData,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { isValidBech32Address, makeValidateAddress } from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export type DaoAdminExecData = {
  coreAddress: string
} & NestedActionsEditorFormData

export type DaoAdminExecOptions = {
  // DAO core addresses where the admin is set to the current DAO/wallet.
  childDaos: LoadingData<string[]>
  AddressInput: ComponentType<AddressInputProps<DaoAdminExecData>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
} & NestedActionsEditorOptions &
  Omit<NestedActionsRendererProps, 'msgsFieldName'>

export const DaoAdminExecComponent: ActionComponent<DaoAdminExecOptions> = (
  props
) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()
  const { watch, setValue, register } = useFormContext<DaoAdminExecData>()
  const {
    fieldNamePrefix,
    errors,
    isCreating,
    options: { childDaos, AddressInput, EntityDisplay, ...options },
  } = props

  const coreAddress = watch((fieldNamePrefix + 'coreAddress') as 'coreAddress')

  return (
    <>
      <p className="title-text">{t('title.dao')}</p>
      <div className="mb-2">
        {childDaos.loading ? (
          <Loader />
        ) : isCreating ? (
          childDaos.data.length > 0 ? (
            <RadioInput
              fieldName={(fieldNamePrefix + 'coreAddress') as 'coreAddress'}
              options={childDaos.data.map((childDao) => ({
                display: <EntityDisplay address={childDao} hideImage noCopy />,
                value: childDao,
              }))}
              setValue={setValue}
              watch={watch}
            />
          ) : (
            <AddressInput
              error={errors?.coreAddress}
              fieldName={(fieldNamePrefix + 'coreAddress') as 'coreAddress'}
              register={register}
              type="contract"
              validation={[makeValidateAddress(bech32Prefix)]}
            />
          )
        ) : (
          <EntityDisplay address={coreAddress} />
        )}
      </div>

      {isValidBech32Address(coreAddress, bech32Prefix) && (
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
