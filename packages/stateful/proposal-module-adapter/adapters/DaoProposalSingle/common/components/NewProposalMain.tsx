import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionsEditor, ActionsRenderer } from '@dao-dao/stateless'
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
  const { t } = useTranslation()
  const { loadedActions, categories } = useLoadedActionsAndCategories()

  const {
    watch,
    formState: { errors },
  } = useFormContext<NewProposalForm>()

  const actionData = watch('actionData') || []

  return (
    <div className="flex flex-col gap-4">
      <p className="title-text">{t('title.actions')}</p>

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
    </div>
  )
}
