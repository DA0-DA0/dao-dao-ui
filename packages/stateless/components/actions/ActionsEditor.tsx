import { Add, Remove } from '@mui/icons-material'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import {
  ComponentType,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { SuspenseLoaderProps } from '@dao-dao/types'
import {
  ActionAndData,
  ActionCategoryWithLabel,
  ActionKeyAndData,
  ActionKeyAndDataNoId,
  LoadedActions,
} from '@dao-dao/types/actions'

import { IconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { PAGINATION_MIN_PAGE, Pagination } from '../Pagination'
import { Tooltip } from '../tooltip'
import { ActionCard } from './ActionCard'
import { ActionLibrary } from './ActionLibrary'
import { ACTIONS_PER_PAGE } from './ActionsRenderer'

// The props needed to render an action from a message.
export type ActionsEditorProps = {
  categories: ActionCategoryWithLabel[]
  loadedActions: LoadedActions
  actionDataFieldName: string
  actionDataErrors: FieldErrors<ActionKeyAndData[]> | undefined
  className?: string
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

type GroupedActionData = Omit<ActionAndData, 'data' | 'category'> & {
  actionDefaults: any
  all: {
    _id: string
    // Index of data in `actionData` list.
    index: number
    data: any
  }[]
}

// Groups actions together and renders editable cards.
export const ActionsEditor = ({
  categories,
  loadedActions,
  actionDataFieldName,
  actionDataErrors,
  className,
  SuspenseLoader,
}: ActionsEditorProps) => {
  const { t } = useTranslation()
  const { watch } = useFormContext<{
    actionData: ActionKeyAndData[]
  }>()

  // All categorized actions from the form.
  const actionData = watch(actionDataFieldName as 'actionData') || []

  // Group action data by adjacent action, preserving order. Adjacent data of
  // the same action are combined into a group so they can be rendered together.
  const groupedActionData = actionData.reduce(
    (acc, { _id, actionKey, data }, index): GroupedActionData[] => {
      const loadedAction = actionKey && loadedActions[actionKey]

      // If no action, skip. This is likely due to a cached action in the saved
      // form that no longer exists, or was used and is no longer usable (such
      // as enabling multiple choice). If action key is defined but no action is
      // found, same thing.
      if (!loadedAction) {
        return acc
      }

      // If most recent group is for the current action, add the current
      // action's data to the most recent group.
      const lastGroup = acc[acc.length - 1]
      if (lastGroup?.action && lastGroup.action.key === actionKey) {
        // Add data to group.
        lastGroup.all.push({
          _id,
          index,
          data,
        })
      } else {
        // Or create new group if previously adjacent group is for a different
        // action.
        acc.push({
          action: loadedAction.action,
          actionDefaults: loadedAction.defaults,
          all: [
            {
              _id,
              index,
              data,
            },
          ],
        })
      }

      return acc
    },
    [] as GroupedActionData[]
  )

  // Start with scroll to new actions disabled to prevent scrolling on initial
  // page load. Only enable once an action is selected from the library.
  const [scrollToNewActions, setScrollToNewActions] = useState(false)

  return (
    <>
      {groupedActionData.length > 0 ? (
        <div className={clsx('flex flex-col gap-2', className)}>
          {groupedActionData.map((group, index) => (
            <div
              key={
                // Re-render when the group at a given position changes.
                `${index}-${group.action?.key}`
              }
              className="group relative"
              id={`A${index + 1}`}
            >
              <ActionEditor
                {...group}
                SuspenseLoader={SuspenseLoader}
                actionDataErrors={actionDataErrors}
                actionDataFieldName={actionDataFieldName}
                scrollToNewActions={scrollToNewActions}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="secondary-text -mt-3 italic">
          {t('info.noActionsAdded')}
        </p>
      )}

      <ActionLibrary
        actionDataFieldName={actionDataFieldName}
        categories={categories}
        loadedActions={loadedActions}
        onSelect={() => {
          // Enable scrolling to new actions once an action is selected for the
          // first time.
          setScrollToNewActions(true)
        }}
      />
    </>
  )
}

export type ActionEditorProps = GroupedActionData & {
  actionDataFieldName: string
  // The errors for all actions, pointed to by `actionsFieldName` above.
  actionDataErrors: FieldErrors<ActionKeyAndData[]> | undefined

  scrollToNewActions: boolean
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

// Renders a group of data that belong to the same action, or a category action
// picker if no action is selected.
export const ActionEditor = ({
  actionDataFieldName: _actionDataFieldName,
  actionDataErrors,

  action,
  actionDefaults,
  all,

  scrollToNewActions,
  SuspenseLoader,
}: ActionEditorProps) => {
  const { t } = useTranslation()
  const { control, watch, clearErrors } = useFormContext<{
    actionData: ActionKeyAndData[]
  }>()

  // Type assertion assumes the passed in field name is correct.
  const actionDataFieldName = _actionDataFieldName as 'actionData'
  const { append, insert, remove } = useFieldArray({
    name: actionDataFieldName,
    control,
  })
  const addAction = useCallback(
    (data: ActionKeyAndDataNoId, insertIndex?: number) => {
      const actionData: ActionKeyAndData = {
        // See `ActionKeyAndData` comment in
        // `packages/types/actions.ts` for an explanation of why we need to
        // append with a unique ID.
        _id: uuidv4(),
        // Allow overriding ID if passed.
        ...data,
      }

      return insertIndex !== undefined
        ? insert(insertIndex, actionData)
        : append(actionData)
    },
    [append, insert]
  )

  // All categorized actions from the form.
  const actionData = watch(actionDataFieldName as 'actionData') || []

  const [page, setPage] = useState(PAGINATION_MIN_PAGE)
  const lastPage = Math.ceil(all.length / ACTIONS_PER_PAGE)
  // If the last page changes, reset the page to it. This ensures that if an
  // action gets deleted and the page we're on is now invalid, we reset to the
  // last page. And if an action gets created and we're not on the last page
  // anymore, go to it.
  useEffect(() => {
    setPage(lastPage)
  }, [lastPage])

  // Clear all errors when the action is removed, in case any manual errors were
  // not cleaned up. If manual errors persist, the form gets stuck.
  const onRemove = () => {
    // Clear all errors for this action.
    all.forEach(({ index }) => clearErrors(`${actionDataFieldName}.${index}`))

    // Remove all entries for this action. Remove the indices in reverse order
    // to prevent the indices from changing. This assumes `all` is ordered by
    // ascending index.
    all.reverse().forEach(({ index }) => remove(index))
  }

  const lastIndex = Math.min(all.length, ACTIONS_PER_PAGE) - 1
  const allowAdding = !action.notReusable && !action.programmaticOnly

  // IDs already seen. This is used to prevent scrolling to the same action more
  // than once.
  const idsSeenRef = useRef<Set<string>>(new Set())

  return (
    <ActionCard
      action={action}
      actionCount={all.length}
      childrenContainerClassName="!px-0"
      onRemove={onRemove}
    >
      {all
        // Paginate.
        .slice((page - 1) * ACTIONS_PER_PAGE, page * ACTIONS_PER_PAGE)
        .map(({ _id, index, data }, rowIndex) => {
          const removeAction = () => {
            clearErrors(`${actionDataFieldName}.${index}`)
            remove(index)
          }

          return (
            <Fragment
              key={
                // If _id empty, likely due to an old saved form state, use
                // index and action as re-render key. Using a unique `key`
                // ensures that the action does not re-render when other parts
                // of the form change.
                _id || `${index}-${action.key}`
              }
            >
              <div
                className="flex animate-fade-in flex-row items-start gap-4 px-6"
                ref={(node) => {
                  // Scroll new actions into view when added. If not scrolling,
                  // still register we saw these so we don't scroll later.
                  if (node && _id && !idsSeenRef.current.has(_id)) {
                    idsSeenRef.current.add(_id)

                    if (scrollToNewActions) {
                      node.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }
                  }
                }}
              >
                <div className="flex min-w-0 grow flex-col gap-4">
                  <SuspenseLoader fallback={<Loader size={36} />}>
                    <action.Component
                      addAction={addAction}
                      allActionsWithData={actionData}
                      data={data}
                      errors={actionDataErrors?.[index]?.data || {}}
                      fieldNamePrefix={`${actionDataFieldName}.${index}.data.`}
                      index={index}
                      isCreating
                      remove={removeAction}
                    />
                  </SuspenseLoader>
                </div>

                {
                  // Never show remove button for programmatic actions. Show
                  // remove button if action is resuable OR if there are more
                  // than one action. If there are more than one action,
                  // individual ones should be removable. But if there is only
                  // one, which is the intended state for an action configured
                  // as not reusable, don't show the remove button.
                  !action.programmaticOnly &&
                    (!action.notReusable || all.length > 1) && (
                      <Tooltip title={t('button.remove')}>
                        <IconButton
                          Icon={Remove}
                          circular
                          onClick={removeAction}
                          size="sm"
                          variant="secondary"
                        />
                      </Tooltip>
                    )
                }
              </div>

              {(rowIndex < lastIndex || allowAdding) && (
                <div className="my-3 h-[1px] bg-border-secondary"></div>
              )}
            </Fragment>
          )
        })}

      {/* Don't show add button if action is not reusable or if programmatic. */}
      {allowAdding && (
        <Tooltip
          title={t('button.addAnotherAction', {
            action: action.label,
          })}
        >
          <IconButton
            Icon={Add}
            circular
            className="mr-6 self-end"
            onClick={() => {
              // Insert another entry for the same action with the default
              // values after the last one in this group.
              addAction(
                {
                  actionKey: action.key,
                  data: cloneDeep(actionDefaults ?? {}),
                },
                all[all.length - 1].index + 1
              )

              // Go to the last page.
              setPage(lastPage)
            }}
            size="sm"
            variant="secondary"
          />
        </Tooltip>
      )}

      {lastPage > PAGINATION_MIN_PAGE && (
        <div className="flex flex-col gap-4 border-t border-border-secondary px-6 pt-5">
          <Pagination
            className="w-full self-center"
            page={page}
            pageSize={ACTIONS_PER_PAGE}
            setPage={setPage}
            total={all.length}
          />
        </div>
      )}
    </ActionCard>
  )
}
