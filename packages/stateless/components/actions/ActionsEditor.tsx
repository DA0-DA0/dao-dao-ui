import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import {
  ComponentType,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  FieldErrors,
  UseFormClearErrors,
  useFieldArray,
  useFormContext,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { SuspenseLoaderProps } from '@dao-dao/types'
import {
  ActionComponentProps,
  ActionKeyAndData,
  ActionKeyAndDataNoId,
  ActionMap,
} from '@dao-dao/types/actions'

import { useActionsContext, useDaoIfAvailable } from '../../contexts'
import { useLoadingPromise } from '../../hooks'
import { Loader } from '../logo'
import { ActionCard } from './ActionCard'
import { ActionLibrary } from './ActionLibrary'

// The props needed to render an action from a message.
export type ActionsEditorProps = {
  actionDataFieldName: string
  className?: string
  hideEmptyPlaceholder?: boolean
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
} & Pick<ActionEditorProps, 'actionDataErrors'>

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

  const isDao = !!useDaoIfAvailable()

  // Type assertion assumes the passed in field name is correct.
  const actionDataFieldName = _actionDataFieldName as 'actionData'

  // All actions from the form.
  const actionData = watch(actionDataFieldName) || []

  const { append, insert, remove, move } = useFieldArray({
    name: actionDataFieldName,
    control,
  })

  // Remove actions with no valid action for the given key.
  useEffect(() => {
    actionData
      .flatMap((action, index) =>
        !(action.actionKey in actionMap) ? [index] : []
      )
      // Remove in descending order so indexes don't change.
      .sort((a, b) => b - a)
      .forEach((index) => remove(index))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData.length, actionMap, remove])

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
        _id: nanoid(),
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

  // IDs already seen. This is used to prevent scrolling to the same action more
  // than once.
  const idsSeenRef = useRef<Set<string>>(new Set())

  return (
    <>
      {actionData.length > 0 ? (
        <div className={clsx('flex flex-col gap-2', className)}>
          {actionData.map(({ _id, actionKey }, index) => (
            <ActionEditor
              key={
                // If id empty, likely due to an old saved form state, use
                // index and action as re-render key. Using a unique `key`
                // ensures that the action does not re-render when other parts
                // of the form change.
                _id || `${index}-${actionKey}`
              }
              SuspenseLoader={SuspenseLoader}
              actionData={actionData}
              actionDataErrors={actionDataErrors}
              actionDataFieldName={actionDataFieldName}
              actionMap={actionMap}
              addAction={addAction}
              clearErrors={clearErrors}
              idsSeenRef={idsSeenRef}
              index={index}
              moveTo={(to) => move(index, to)}
              remove={remove}
              scrollToNewActions={scrollToNewActions}
            />
          ))}
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

type ActionEditorProps = {
  actionMap: ActionMap
  actionData: ActionKeyAndData[]
  actionDataFieldName: 'actionData'
  actionDataErrors: FieldErrors<ActionKeyAndData[]> | undefined
  index: number
  scrollToNewActions: boolean
  idsSeenRef: MutableRefObject<Set<string>>
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  clearErrors: UseFormClearErrors<{
    actionData: ActionKeyAndData[]
  }>
  remove: (index: number) => void
  addAction: Required<ActionComponentProps>['addAction']
  moveTo: (index: number) => void
}

const ActionEditor = ({
  actionMap,
  actionData,
  actionDataFieldName,
  actionDataErrors,
  index,
  idsSeenRef,
  scrollToNewActions,
  SuspenseLoader,
  clearErrors,
  remove,
  addAction,
  moveTo,
}: ActionEditorProps) => {
  const { _id, actionKey, data } = actionData[index]
  const action = actionMap[actionKey]

  // Make sure action is initialized before rendering.
  const { loading } = useLoadingPromise({
    promise: async () => action?.init(),
    deps: [action],
  })

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
    <div className="relative" id={`A${index + 1}`}>
      <ActionCard
        action={action}
        onAddNew={
          action.ready
            ? () =>
                addAction(
                  { actionKey, data: cloneDeep(action.defaults) },
                  index + 1
                )
            : undefined
        }
        onDuplicate={() =>
          addAction({ actionKey, data: cloneDeep(data) }, index + 1)
        }
        onMoveDown={
          index < actionData.length - 1 ? () => moveTo(index + 1) : undefined
        }
        onMoveUp={index > 0 ? () => moveTo(index - 1) : undefined}
        onRemove={onRemove}
      >
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
            {loading ? (
              <Loader className="min-h-32" size={48} />
            ) : (
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
            )}
          </SuspenseLoader>
        </div>
      </ActionCard>
    </div>
  )
}
