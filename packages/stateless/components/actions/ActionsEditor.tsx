import { Add, Remove, Star } from '@mui/icons-material'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import {
  ComponentType,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { FieldErrors, useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { useActionOptions } from '@dao-dao/stateful/actions'
import { SuspenseLoaderProps } from '@dao-dao/types'
import {
  ActionAndData,
  ActionCategoryKey,
  ActionCategoryWithLabel,
  ActionKey,
  ActionKeyAndData,
  ActionKeyAndDataNoId,
  LoadedActions,
} from '@dao-dao/types/actions'

import { Button } from '../buttons'
import { IconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { PAGINATION_MIN_PAGE, Pagination } from '../Pagination'
import { Tooltip, TooltipInfoIcon } from '../tooltip'
import { ActionCard } from './ActionCard'
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
  const { context } = useActionOptions()
  const { control, watch } = useFormContext<{
    actionData: ActionKeyAndData[]
  }>()

  // All categorized actions from the form.
  const actionData = watch(actionDataFieldName as 'actionData') || []

  const { append } = useFieldArray({
    name: actionDataFieldName as 'actionData',
    control,
  })

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

  const loadedActionValues = Object.values(loadedActions)
  const loadingActionKeys = loadedActionValues.flatMap(
    ({ action: { key }, defaults }) => (!defaults ? key : [])
  )
  const erroredActionKeys = loadedActionValues.reduce(
    (acc, { action: { key }, defaults }) => ({
      ...acc,
      ...(defaults && defaults instanceof Error
        ? {
            [key]: defaults,
          }
        : {}),
    }),
    {} as Partial<Record<ActionKey, Error>>
  )

  const [categoryKeySelected, setCategoryKeySelected] =
    useState<ActionCategoryKey>(categories[0].key)
  const selectedCategory =
    categories.find((c) => c.key === categoryKeySelected) || categories[0]

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
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="secondary-text -mt-3 italic">
          {t('info.noActionsAdded')}
        </p>
      )}

      <div className="mt-2 flex flex-col gap-4 rounded-md border border-dashed border-border-primary p-4">
        <div className="flex flex-row gap-2">
          <p className="title-text">{t('title.actionLibrary')}</p>
          <TooltipInfoIcon
            size="sm"
            title={t('info.actionLibraryDescription', {
              context: context.type,
            })}
          />
        </div>

        <div className="flex flex-col gap-x-3 gap-y-1 md:flex-row md:items-start">
          <div className="-mx-4 flex min-w-0 shrink-0 flex-row gap-y-0 overflow-x-auto px-4 pb-3 pt-1 md:flex-col md:pb-1">
            {categories.map((category) => (
              <Button
                key={category.key}
                className={clsx(
                  'shrink-0 rounded-b-none border-b border-transparent !py-1 !px-2 md:w-full md:rounded-b-md md:!py-2 md:!px-3',
                  categoryKeySelected === category.key &&
                    '!border-icon-primary md:border-b-0 md:bg-background-interactive-selected'
                )}
                onClick={() => setCategoryKeySelected(category.key)}
                variant="none"
              >
                {category.key === ActionCategoryKey.CommonlyUsed && (
                  <Star className="!h-5 !w-5" />
                )}

                {category.label}
              </Button>
            ))}
          </div>

          <div className="hidden w-[1px] min-w-0 shrink-0 self-stretch bg-border-primary md:block"></div>

          <div className="flex min-w-0 grow flex-col gap-2 pt-1 md:pb-1">
            {selectedCategory?.actions
              .filter(
                (action) =>
                  // Never show programmatic actions.
                  !action.programmaticOnly &&
                  // Show if reusable or not already used.
                  (!action.notReusable ||
                    !actionData.some((a) => a.actionKey !== action.key))
              )
              .map((action) => (
                <Button
                  key={categoryKeySelected + action.key}
                  contentContainerClassName="gap-4 text-left"
                  disabled={
                    loadingActionKeys.includes(action.key) ||
                    !!erroredActionKeys[action.key]
                  }
                  onClick={() => {
                    const loadedAction = loadedActions[action.key]
                    if (!loadedAction) {
                      return
                    }

                    append({
                      actionKey: action.key,
                      // Clone to prevent the form from mutating the original
                      // object.
                      data: cloneDeep(loadedAction.defaults ?? {}),
                    })
                  }}
                  variant="ghost"
                >
                  {action.Icon && (
                    <p className="text-3xl">
                      <action.Icon />
                    </p>
                  )}

                  <div className="flex grow flex-col items-start gap-1">
                    <p className="primary-text">{action.label}</p>
                    <p className="caption-text">{action.description}</p>
                  </div>

                  {erroredActionKeys[action.key] && (
                    <TooltipInfoIcon
                      size="lg"
                      title={erroredActionKeys[action.key]!.message}
                      warning
                    />
                  )}

                  {loadingActionKeys.includes(action.key) && (
                    <Loader fill={false} size={32} />
                  )}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export type ActionEditorProps = GroupedActionData & {
  actionDataFieldName: string
  // The errors for all actions, pointed to by `actionsFieldName` above.
  actionDataErrors: FieldErrors<ActionKeyAndData[]> | undefined

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
              <div className="flex animate-fade-in flex-row items-start gap-4 px-6">
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
              insert(all[all.length - 1].index + 1, {
                // See `ActionKeyAndData` comment in `packages/types/actions.ts`
                // for an explanation of why we need to insert with a unique ID.
                _id: uuidv4(),
                actionKey: action.key,
                data: cloneDeep(actionDefaults ?? {}),
              })

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
