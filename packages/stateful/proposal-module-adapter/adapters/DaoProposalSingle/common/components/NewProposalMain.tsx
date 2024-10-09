import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ActionsEditor,
  ActionsRenderer,
  ProposalExecutionMetadataEditor,
  ProposalExecutionMetadataRenderer,
  useActionsContext,
} from '@dao-dao/stateless'
import { convertActionKeysAndDataToActions } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { NewProposalForm } from '../../types'

export type NewProposalMainProps = {
  actionsReadOnlyMode?: boolean
}

export const NewProposalMain = ({
  actionsReadOnlyMode,
}: NewProposalMainProps) => {
  const { t } = useTranslation()
  const { actionMap } = useActionsContext()

  const {
    watch,
    formState: { errors },
  } = useFormContext<NewProposalForm>()

  const actionKeysAndData = watch('actionData') || []

  const metadata = watch('metadata')

  return (
    <div className="flex flex-col gap-4">
      <p className="title-text">{t('title.actions')}</p>

      {actionsReadOnlyMode ? (
        <>
          <ActionsRenderer
            SuspenseLoader={SuspenseLoader}
            actionData={convertActionKeysAndDataToActions(
              actionMap,
              actionKeysAndData
            )}
          />

          <ProposalExecutionMetadataRenderer
            className="mt-2"
            metadata={metadata}
          />
        </>
      ) : (
        <>
          <ActionsEditor
            SuspenseLoader={SuspenseLoader}
            actionDataErrors={errors?.actionData}
            actionDataFieldName="actionData"
          />

          <ProposalExecutionMetadataEditor className="mt-2" errors={errors} />
        </>
      )}
    </div>
  )
}
