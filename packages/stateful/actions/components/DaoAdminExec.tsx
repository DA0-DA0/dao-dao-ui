import { ComponentType, useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useDeepCompareEffect from 'use-deep-compare-effect'

import {
  ActionCategorySelector,
  ActionsRenderer,
  CategorizedActionEditor,
  Loader,
  RadioInput,
} from '@dao-dao/stateless'
import {
  ActionCategoryWithLabel,
  AddressInputProps,
  CategorizedAction,
  CosmosMsgFor_Empty,
  LoadingData,
  PartialCategorizedActionKeyAndData,
  StatefulEntityDisplayProps,
  SuspenseLoaderProps,
} from '@dao-dao/types'
import {
  ActionComponent,
  CategorizedActionAndData,
  LoadedActions,
} from '@dao-dao/types/actions'
import {
  CHAIN_BECH32_PREFIX,
  convertActionsToMessages,
  decodeMessages,
  isValidContractAddress,
  validateContractAddress,
} from '@dao-dao/utils'

export interface DaoAdminExecOptions {
  categories: ActionCategoryWithLabel[]
  loadedActions: LoadedActions
  actionsForMatching: CategorizedAction[]
  // DAO core addresses where the admin is set to the current DAO/wallet.
  childDaos: LoadingData<string[]>
  AddressInput: ComponentType<AddressInputProps<DaoAdminExecData>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export type DaoAdminExecData = {
  coreAddress: string
  msgs: CosmosMsgFor_Empty[]

  // Internal action data so that errors are added to main form.
  _actionData?: PartialCategorizedActionKeyAndData[]
}

export const DaoAdminExecComponent: ActionComponent<DaoAdminExecOptions> = (
  props
) => {
  const { t } = useTranslation()
  const { watch, setValue, register } = useFormContext<DaoAdminExecData>()
  const {
    fieldNamePrefix,
    errors,
    isCreating,
    options: { childDaos, AddressInput, EntityDisplay },
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
              validation={[validateContractAddress]}
            />
          )
        ) : (
          <EntityDisplay address={coreAddress} />
        )}
      </div>

      {isValidContractAddress(coreAddress, CHAIN_BECH32_PREFIX) && (
        <>
          <p className="title-text">{t('title.actions')}</p>
          {isCreating ? (
            <DaoAdminExecActionEditor {...props} />
          ) : (
            <DaoAdminExecActionRenderer {...props} />
          )}
        </>
      )}
    </>
  )
}

export const DaoAdminExecActionEditor: ActionComponent<DaoAdminExecOptions> = ({
  fieldNamePrefix,
  errors,
  options: { categories, loadedActions, SuspenseLoader },
}) => {
  const { watch, control, setValue, clearErrors, setError } =
    useFormContext<DaoAdminExecData>()

  const {
    fields: actionDataFields,
    append: appendAction,
    remove: removeAction,
  } = useFieldArray({
    name: (fieldNamePrefix + '_actionData') as '_actionData',
    control,
  })

  const actionData =
    watch((fieldNamePrefix + '_actionData') as '_actionData') || []

  // Update action msgs from actions form data.
  let msgs: CosmosMsgFor_Empty[] = []
  try {
    msgs = convertActionsToMessages(loadedActions, actionData)

    if (errors?.msgs) {
      clearErrors((fieldNamePrefix + 'msgs') as 'msgs')
    }
  } catch (err) {
    console.error(err)

    if (!errors?.msgs) {
      setError((fieldNamePrefix + 'msgs') as 'msgs', {
        type: 'manual',
        message: err instanceof Error ? err.message : `${err}`,
      })
    }
  }

  useDeepCompareEffect(() => {
    if (msgs) {
      setValue((fieldNamePrefix + 'msgs') as 'msgs', msgs)
    }
  }, [msgs])

  return (
    <>
      {actionData.length > 0 && (
        <div className="mb-4 flex flex-col gap-2">
          {actionData.map((field, index) => (
            <CategorizedActionEditor
              key={
                // Use ID from field array that corresponds with this action,
                // but use the data from watching the actions field so that it
                // updates.
                actionDataFields[index].id
              }
              {...field}
              SuspenseLoader={SuspenseLoader}
              actionDataFieldName={fieldNamePrefix + '_actionData'}
              actionErrors={errors?._actionData?.[index] || {}}
              addAction={appendAction}
              categories={categories}
              index={index}
              loadedActions={loadedActions}
              onRemove={() => removeAction(index)}
            />
          ))}
        </div>
      )}

      {categories.length === 0 ? (
        <Loader />
      ) : (
        <div className="self-start">
          <ActionCategorySelector
            categories={categories}
            onSelectCategory={({ key }) => {
              appendAction({
                categoryKey: key,
              })
            }}
          />
        </div>
      )}
    </>
  )
}

export const DaoAdminExecActionRenderer: ActionComponent<
  DaoAdminExecOptions
> = ({ fieldNamePrefix, options: { actionsForMatching, SuspenseLoader } }) => {
  const { watch } = useFormContext<DaoAdminExecData>()
  const msgs = watch((fieldNamePrefix + 'msgs') as 'msgs')

  const decodedMessages = useMemo(() => decodeMessages(msgs), [msgs])

  // Call relevant action hooks in the same order every time.
  const actionData = decodedMessages
    .map((message) => {
      const actionMatch = actionsForMatching
        .map(({ category, action }) => ({
          category,
          action,
          ...action.useDecodedCosmosMsg(message),
        }))
        .find(({ match }) => match)

      return (
        actionMatch && {
          category: actionMatch.category,
          action: actionMatch.action,
          data: actionMatch.data,
        }
      )
    })
    .filter(Boolean) as CategorizedActionAndData[]

  return (
    <>
      {actionsForMatching.length === 0 ? (
        <Loader />
      ) : (
        <ActionsRenderer
          SuspenseLoader={SuspenseLoader}
          actionData={actionData}
          hideCopyLink
        />
      )}
    </>
  )
}
