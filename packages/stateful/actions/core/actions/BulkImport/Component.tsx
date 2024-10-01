import JSON5 from 'json5'
import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import uniq from 'lodash.uniq'
import { parse as csvToJson } from 'papaparse'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ActionsRenderer,
  Button,
  ButtonLink,
  FileDropInput,
  useActionsContext,
} from '@dao-dao/stateless'
import { SuspenseLoaderProps, TransProps } from '@dao-dao/types'
import {
  ActionAndData,
  ActionComponent,
  ActionKey,
} from '@dao-dao/types/actions'
import { objectMatchesStructure } from '@dao-dao/utils'

export type BulkImportOptions = {
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  Trans: ComponentType<TransProps>
}

export const BulkImportComponent: ActionComponent<BulkImportOptions> = ({
  addAction,
  remove,
  options: { SuspenseLoader, Trans },
}) => {
  const { t } = useTranslation()
  const { actionMap } = useActionsContext()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pendingActions, setPendingActions] = useState<ActionAndData[]>([])

  const onSelect = (file: File) => {
    setError('')

    if (file.type !== 'application/json' && file.type !== 'text/csv') {
      setError(t('error.invalidFileTypeBulkImport'))
      return
    }

    // Read contents of the file.
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return
      }

      setLoading(true)
      try {
        let data
        try {
          switch (file.type) {
            case 'application/json':
              data = JSON5.parse(reader.result)
              break
            case 'text/csv':
              const parsedCsv = csvToJson(reader.result, {
                header: true,
              }).data.filter(
                (obj: any) =>
                  objectMatchesStructure(obj, { ACTION: {} }) &&
                  obj.ACTION &&
                  Object.values(ActionKey).includes(obj.ACTION)
              )

              data = {
                actions: parsedCsv.map(({ ACTION, ...data }: any) => ({
                  key: ACTION,
                  data,
                })),
              }

              if (!data.actions.length) {
                throw new Error(t('error.invalidImportFormatCsv'))
              }

              break
            default:
              throw new Error(t('error.invalidFileTypeBulkImport'))
          }
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
          setError(t('error.invalidImportFormatJson'))
          return
        }

        const actions = data.actions as {
          key: any
          data?: any
        }[]

        // Verify the action key of each action is valid.
        const invalidActionKeys = uniq(
          actions.flatMap(({ key }) =>
            typeof key !== 'string' || !(key in actionMap) ? key : []
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

        // Error if any actions failed to load.
        const firstErroredAction = actions.flatMap(({ key }) =>
          actionMap[key as keyof typeof actionMap]?.errored
            ? actionMap[key as keyof typeof actionMap]
            : []
        )[0]
        if (firstErroredAction) {
          setError(
            t('error.actionFailedToLoad', {
              action: firstErroredAction.metadata.label,
              error: firstErroredAction.error!.message,
            })
          )
          return
        }

        setPendingActions(
          actions.flatMap(({ key, data }): ActionAndData | [] => {
            try {
              // Existence validated above.
              const action = actionMap[key as keyof typeof actionMap]!
              const actionData = merge({}, cloneDeep(action.defaults), data)
              return {
                action,
                // Use the action's defaults as a base, and then merge in the
                // imported data, overriding any defaults. If data is undefined,
                // then the action's defaults will be used.
                data: action.transformImportData?.(actionData) || actionData,
              }
            } catch {
              return []
            }
          })
        )
      } finally {
        setLoading(false)
      }
    }
    reader.onerror = () => {
      console.error(reader.error)
      setError(reader.error?.message ?? t('error.loadingData'))
      setLoading(false)
    }
  }

  const importPending = () => {
    // Add all pending actions to the form.
    pendingActions.forEach(({ action: { key }, data }) =>
      addAction?.({
        actionKey: key,
        data,
      })
    )
    // Remove this bulk import action from the form.
    remove?.()
  }

  return pendingActions.length > 0 ? (
    <>
      <p className="max-w-prose">{t('info.reviewActionImportData')}</p>

      <ActionsRenderer
        SuspenseLoader={SuspenseLoader}
        actionData={pendingActions}
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
          Choose a JSON or CSV file below that matches the format described in{' '}
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

      <FileDropInput Trans={Trans} loading={loading} onSelect={onSelect} />

      {error && <p className="text-text-interactive-error">{error}</p>}
    </>
  )
}
