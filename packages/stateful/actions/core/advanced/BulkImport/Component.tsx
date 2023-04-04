import JSON5 from 'json5'
import merge from 'lodash.merge'
import uniq from 'lodash.uniq'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ActionsRenderer,
  Button,
  ButtonLink,
  FileDropInput,
} from '@dao-dao/stateless'
import { SuspenseLoaderProps, TransProps } from '@dao-dao/types'
import {
  ActionComponent,
  CategorizedActionAndData,
  LoadedAction,
  LoadedActions,
} from '@dao-dao/types/actions'
import { objectMatchesStructure } from '@dao-dao/utils'

export type BulkImportOptions = {
  loadedActions: LoadedActions
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  Trans: ComponentType<TransProps>
}

type PendingAction = {
  loadedAction: LoadedAction
  data: any
}

export const BulkImportComponent: ActionComponent<BulkImportOptions> = ({
  addAction,
  remove,
  options: { loadedActions, SuspenseLoader, Trans },
}) => {
  const { t } = useTranslation()

  const [error, setError] = useState('')
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([])

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

      // Validate data is list of `actions` with `key` present. Some actions
      // take no `data`, so `data` is optional.
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
            })
        )
      ) {
        setError(t('error.invalidImportFormat'))
        return
      }

      const actions = data.actions as {
        key: any
        data?: any
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
        actions.map(({ key, data }): PendingAction => {
          // Existence validated above.
          const loadedAction = loadedActions[key as keyof typeof loadedActions]!

          return {
            loadedAction,
            // Use the action's defaults as a base, and then merge in the
            // imported data, overriding any defaults. If data is undefined,
            // then the action's defaults will be used.
            data: merge({}, loadedAction.defaults, data),
          }
        })
      )
    }
    reader.onerror = () => {
      console.error(reader.error)
      setError(reader.error?.message ?? t('error.loadingData'))
    }
  }

  const importPending = () => {
    // Add all pending actions to the form.
    pendingActions.forEach(
      ({
        loadedAction: {
          action: { key },
        },
        data,
      }) =>
        addAction?.({
          actionKey: key,
          data,
        })
    )
    // Remove this action from the form.
    remove?.()
  }

  return pendingActions.length > 0 ? (
    <>
      <p className="max-w-prose">{t('info.reviewActionImportData')}</p>

      <ActionsRenderer
        SuspenseLoader={SuspenseLoader}
        actionData={pendingActions.map(
          ({
            loadedAction: { category, action },
            data,
          }): CategorizedActionAndData => ({
            category,
            action,
            data,
          })
        )}
        hideCopyLink
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
      <p>
        <Trans i18nKey="info.bulkImportActionExplanation">
          Choose a JSON file below that matches the format described in{' '}
          <ButtonLink
            containerClassName="inline-block"
            href="https://github.com/DA0-DA0/dao-dao-ui/wiki/Bulk-importing-actions"
            variant="underline"
          >
            this guide
          </ButtonLink>
          .
        </Trans>
      </p>

      <FileDropInput Trans={Trans} onSelect={onSelect} />

      {error && <p className="text-text-interactive-error">{error}</p>}
    </>
  )
}
