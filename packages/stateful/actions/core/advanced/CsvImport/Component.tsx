import cloneDeep from 'lodash.clonedeep'
import uniq from 'lodash.uniq'
import { parse } from 'papaparse'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, CosmosMessageDisplay, FileDropInput } from '@dao-dao/stateless'
import {
  ActionComponent,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
} from '@dao-dao/types/actions'

import { Trans } from '../../../../components'

export type CsvImportOptions = {
  loadedActions: LoadedActions
}

export const CsvImportComponent: ActionComponent<CsvImportOptions> = ({
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

    if (file.type !== 'text/csv') {
      setError(t('error.invalidCsv'))
      return
    }

    // Expected format is the first column of each row is the action key, and
    // the rest of the columns are the action's parameters.
    parse(file, {
      // Skip whitespace lines and lines with all empty cells.
      skipEmptyLines: 'greedy',
      // Success callback.
      complete: (results) => {
        const data = results.data
        if (data.length === 0) {
          setError(t('error.emptyCsv'))
          return
        }

        let rows
        try {
          // Verify all rows are arrays of strings.
          if (
            data.some(
              (row) =>
                !Array.isArray(row) ||
                row.some((cell) => typeof cell !== 'string')
            )
          ) {
            throw new Error(t('error.invalidCsv'))
          }

          // Parse rows, the first column being the action key, and the rest
          // stringified JSON.
          rows = data.map((row, rowIndex) =>
            (row as string[]).filter(Boolean).map((cell, colIndex) => {
              if (colIndex === 0) {
                return cell
              }

              try {
                return JSON.parse(cell)
              } catch (err) {
                throw new Error(
                  `[Error at row ${rowIndex + 1} column ${colIndex + 1}] ${
                    err instanceof Error ? err.message : err
                  }`
                )
              }
            })
          )
        } catch (err) {
          setError(err instanceof Error ? err.message : `${err}`)
          return
        }

        // Verify the first column of each row is a valid action key.
        const actionKeys = rows.map((row) => row[0])
        const invalidActionKeys = uniq(
          actionKeys.filter((actionKey) => !(actionKey in loadedActions))
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
          rows
            .map(
              ([actionKey, ...fields]):
                | PartialCategorizedActionKeyAndData
                | undefined => {
                const loadedAction =
                  loadedActions[actionKey as keyof typeof loadedActions]
                // Type-check, validated above.
                if (!loadedAction) {
                  return
                }

                const {
                  action: { key },
                  defaults,
                } = loadedAction

                const dataKeys = Object.keys(defaults)

                return {
                  actionKey: key,
                  // Construct data by making a deep-copy of the defaults, and
                  // then overwriting the values with the parsed data. The
                  // position of the data in the row corresponds with the index
                  // of the key in the defaults.
                  data: fields.slice(0, dataKeys.length).reduce(
                    (acc, field, index) => ({
                      ...acc,
                      [dataKeys[index]]: field,
                    }),
                    cloneDeep(defaults)
                  ),
                }
              }
            )
            .filter(
              (data): data is PartialCategorizedActionKeyAndData => !!data
            )
        )
      },
      error: (error) => {
        console.error(error)
        setError(error.message)
      },
    })
  }

  const importPending = () => {
    // Add all pending actions to the form.
    pendingActions.forEach((action) => addAction?.(action))
    // Remove this action from the form.
    remove?.()
  }

  return pendingActions.length > 0 ? (
    <>
      <p>{t('info.reviewActionImportData')}</p>

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
