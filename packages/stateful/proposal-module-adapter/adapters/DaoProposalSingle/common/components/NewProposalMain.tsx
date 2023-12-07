import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import {
  ActionCategorySelector,
  ActionsEditor,
  ActionsRenderer,
} from '@dao-dao/stateless'
import { LoadedAction } from '@dao-dao/types'

import { useLoadedActionsAndCategories } from '../../../../../actions'
import { SuspenseLoader } from '../../../../../components'
import { NewProposalForm } from '../../types'

export type NewProposalMainProps = {
  actionsReadOnlyMode?: boolean
}

export const NewProposalMain = ({
  actionsReadOnlyMode,
}: NewProposalMainProps) => {
  const { loadedActions, categories } = useLoadedActionsAndCategories()

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<NewProposalForm>()

  const { append } = useFieldArray({
    name: 'actionData',
    control,
    shouldUnregister: true,
  })

  const actionData = watch('actionData') || []

  return (
    <>
      {actionsReadOnlyMode ? (
        <ActionsRenderer
          SuspenseLoader={SuspenseLoader}
          actionData={actionData.flatMap(({ actionKey, data }, index) => {
            const { category, action } = (
              actionKey ? loadedActions[actionKey] || {} : {}
            ) as Partial<LoadedAction>

            return category && action
              ? {
                  id: index.toString(),
                  category,
                  action,
                  data,
                }
              : []
          })}
        />
      ) : (
        <ActionsEditor
          SuspenseLoader={SuspenseLoader}
          actionDataErrors={errors?.actionData}
          actionDataFieldName="actionData"
          categories={categories}
          className="-mb-2"
          loadedActions={loadedActions}
        />
      )}

      {!actionsReadOnlyMode && (
        <div className="self-start">
          <ActionCategorySelector
            categories={categories}
            onSelectCategory={({ key }) => {
              append({
                // See `CategorizedActionKeyAndData` comment in
                // `packages/types/actions.ts` for an explanation of why we need
                // to append with a unique ID.
                _id: uuidv4(),
                categoryKey: key,
              })
            }}
          />
        </div>
      )}
    </>
  )
}
