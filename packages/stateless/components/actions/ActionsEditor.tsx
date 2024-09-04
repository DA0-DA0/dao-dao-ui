import clsx from 'clsx'
import {
  ComponentType,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { SuspenseLoaderProps } from '@dao-dao/types'
import { ActionKeyAndData, ActionKeyAndDataNoId } from '@dao-dao/types/actions'

import { useActionsContext, useDaoInfoContextIfAvailable } from '../../contexts'
import { Loader } from '../logo'
import { ActionCard } from './ActionCard'
import { ActionLibrary } from './ActionLibrary'

// The props needed to render an action from a message.
export type ActionsEditorProps = {
  actionDataFieldName: string
  actionDataErrors: FieldErrors<ActionKeyAndData[]> | undefined
  className?: string
  hideEmptyPlaceholder?: boolean
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

// Renders editable cards.
export const ActionsEditor = ({
  actionDataFieldName: _actionDataFieldName,
  actionDataErrors,
  className,
  hideEmptyPlaceholder,
  SuspenseLoader,
}: ActionsEditorProps) => {
  const { t } = useTranslation()
  const { control, watch, clearErrors } = useFormContext<{
    actionData: ActionKeyAndData[]
  }>()
  const { actionMap } = useActionsContext()

  const isDao = !!useDaoInfoContextIfAvailable()

  // Type assertion assumes the passed in field name is correct.
  const actionDataFieldName = _actionDataFieldName as 'actionData'

  // All actions from the form.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const actionData = watch(actionDataFieldName) || []

  const { append, insert, remove } = useFieldArray({
    name: actionDataFieldName,
    control,
  })
  const addAction = useCallback(
    async (data: ActionKeyAndDataNoId, insertIndex?: number) => {
      const action = actionMap[data.actionKey]
      if (!action) {
        toast.error(t('errors.actionNotFound', { key: data.actionKey }))
        return
      }

      if (!action.ready) {
        await action.init()
      }

      const actionData: ActionKeyAndData = {
        // See `ActionKeyAndData` comment in `packages/types/actions.ts` for an
        // explanation of why we need to append with a unique ID.
        _id: uuidv4(),
        // Allow overriding ID if passed.
        ...data,
      }

      return insertIndex !== undefined
        ? insert(insertIndex, actionData)
        : append(actionData)
    },
    [actionMap, append, insert, t]
  )

  // Start with scroll to new actions disabled to prevent scrolling on initial
  // page load. Only enable once an action is selected from the library.
  const [scrollToNewActions, setScrollToNewActions] = useState(false)

  // If action is idle, initialize it. This ensures that actions loaded from
  // saved form state are automatically initialized.
  useEffect(() => {
    actionData
      .flatMap(({ actionKey }) => actionMap[actionKey] || [])
      .forEach((action) => {
        if (action.status === 'idle') {
          action.init()
        }
      })
  }, [actionData, actionMap])

  // IDs already seen. This is used to prevent scrolling to the same action more
  // than once.
  const idsSeenRef = useRef<Set<string>>(new Set())

  return (
    <>
      {actionData.length > 0 ? (
        <div className={clsx('flex flex-col gap-2', className)}>
          {actionData.map(({ _id, actionKey, data }, index) => {
            const action = actionMap[actionKey]
            if (!action) {
              return null
            }

            // Clear all errors when the action is removed, in case any manual
            // errors were not cleaned up. If manual errors persist, the form
            // gets stuck.
            const onRemove = () => {
              clearErrors(`${actionDataFieldName}.${index}`)
              remove(index)
            }

            return (
              <div
                key={
                  // If id empty, likely due to an old saved form state, use
                  // index and action as re-render key. Using a unique `key`
                  // ensures that the action does not re-render when other parts
                  // of the form change.
                  _id || `${index}-${actionKey}`
                }
                className="relative"
                id={`A${index + 1}`}
              >
                <ActionCard action={action} onRemove={onRemove}>
                  <div
                    className="animate-fade-in flex min-w-0 grow flex-col gap-4"
                    ref={(node) => {
                      // Scroll into view when added. If not scrolling, still
                      // register we saw it so we don't scroll later.
                      if (node && _id && !idsSeenRef.current.has(_id)) {
                        idsSeenRef.current.add(_id)

                        if (scrollToNewActions) {
                          node.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          })
                        }
                      }
                    }}
                  >
                    <SuspenseLoader fallback={<Loader />}>
                      <action.Component
                        addAction={addAction}
                        allActionsWithData={actionData}
                        data={data}
                        errors={actionDataErrors?.[index]?.data || {}}
                        fieldNamePrefix={`${actionDataFieldName}.${index}.data.`}
                        index={index}
                        isCreating
                        remove={onRemove}
                      />
                    </SuspenseLoader>
                  </div>
                </ActionCard>
              </div>
            )
          })}
        </div>
      ) : (
        !hideEmptyPlaceholder && (
          <p className="secondary-text -mt-3 max-w-prose italic">
            {t('info.noActionsAdded', {
              context: isDao ? 'dao' : undefined,
            })}
          </p>
        )
      )}

      <ActionLibrary
        actionDataFieldName={actionDataFieldName}
        defaultOpen={
          // Default open only if no actions exist yet.
          actionData.length === 0
        }
        onSelect={() => {
          // Enable scrolling to new actions once an action is selected for the
          // first time.
          setScrollToNewActions(true)
        }}
      />
    </>
  )
}
