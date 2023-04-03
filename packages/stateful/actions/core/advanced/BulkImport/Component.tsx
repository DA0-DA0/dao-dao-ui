import JSON5 from 'json5'
import uniq from 'lodash.uniq'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, CosmosMessageDisplay, FileDropInput } from '@dao-dao/stateless'
import {
  ActionComponent,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
} from '@dao-dao/types/actions'
import { objectMatchesStructure } from '@dao-dao/utils'

import { Trans } from '../../../../components'

export type BulkImportOptions = {
  loadedActions: LoadedActions
}

export const BulkImportComponent: ActionComponent<BulkImportOptions> = ({
  addAction,
  remove,
  options: { loadedActions },
}) => {
  const { t } = useTranslation()

  const [error, setError] = useState('')
  const [pendingActions, setPendingActions] = useState<
    PartialCategorizedActionKeyAndData[]
  >([])

  const onSelect = (file: File) => {
    setError('')

    if (file.type !== 'application/json') {
      setError(t('error.invalidJsonFile'))
      return
    }

    // Read contents of the file.
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return
      }

      let data
      try {
        data = JSON5.parse(reader.result)
      } catch (err) {
        setError(err instanceof Error ? err.message : `${err}`)
        return
      }

      // Validate data is list of `actions` with `key` and `data` keys.
      if (
        !objectMatchesStructure(data, {
          actions: {},
        }) ||
        !Array.isArray(data.actions) ||
        data.actions.length === 0 ||
        data.actions.some(
          (action: any) =>
            !objectMatchesStructure(action, {
              key: {},
              data: {},
            })
        )
      ) {
        setError(t('error.invalidImportFormat'))
        return
      }

      const actions = data.actions as {
        key: any
        data: any
      }[]

      // Verify the action key of each action is valid.
      const invalidActionKeys = uniq(
        actions.filter(
          ({ key }) => typeof key !== 'string' || !(key in loadedActions)
        )
      )
      if (invalidActionKeys.length > 0) {
        setError(
          t('error.invalidActionKeys', {
            keys: invalidActionKeys.join(', '),
          })
        )
        return
      }

      setPendingActions(
        actions
          .map(
            ({ key, data }): PartialCategorizedActionKeyAndData | undefined => {
              const loadedAction =
                loadedActions[key as keyof typeof loadedActions]
              // Type-check, validated above.
              if (!loadedAction) {
                return
              }

              return {
                actionKey: loadedAction.action.key,
                data,
              }
            }
          )
          .filter((data): data is PartialCategorizedActionKeyAndData => !!data)
      )
    }
    reader.onerror = () => {
      console.error(reader.error)
      setError(reader.error?.message ?? t('error.loadingData'))
    }
  }

  const importPending = () => {
    // Add all pending actions to the form.
    pendingActions.forEach((action) => addAction?.(action))
    // Remove this action from the form.
    remove?.()
  }

  return pendingActions.length > 0 ? (
    <>
      <p className="max-w-prose">{t('info.reviewActionImportData')}</p>

      <CosmosMessageDisplay
        className="styled-scrollbar max-h-96 overflow-y-auto pr-1"
        value={JSON.stringify(pendingActions, null, 2)}
      />

      <div className="flex flex-row items-stretch justify-end gap-2 self-end">
        <Button onClick={() => setPendingActions([])} variant="secondary">
          {t('button.clear')}
        </Button>

        <Button onClick={importPending}>{t('button.import')}</Button>
      </div>
    </>
  ) : (
    <>
      <FileDropInput Trans={Trans} onSelect={onSelect} />

      {error && <p className="text-text-interactive-error">{error}</p>}
    </>
  )
}
