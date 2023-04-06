import { Check, Link, WarningRounded } from '@mui/icons-material'
import { ComponentType, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import { SuspenseLoaderProps } from '@dao-dao/types'
import {
  Action,
  ActionCategoryWithLabel,
  CategorizedActionAndData,
  CategorizedActionKeyAndData,
} from '@dao-dao/types/actions'

import { IconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { PAGINATION_MIN_PAGE, Pagination } from '../Pagination'
import { ActionCard } from './ActionCard'

const ACTIONS_PER_PAGE = 20

// The props needed to render an action from a message.
export interface ActionsRendererProps {
  actionData: CategorizedActionAndData[]
  hideCopyLink?: boolean
  onCopyLink?: () => void
  setSeenAllActionPages?: () => void
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

// Groups actions together and renders uneditable cards.
export const ActionsRenderer = ({
  actionData,
  hideCopyLink,
  onCopyLink,
  setSeenAllActionPages,
  SuspenseLoader,
}: ActionsRendererProps) => {
  const actionKeysWithData = useMemo(
    () =>
      actionData.map(
        (
          { category: { key: categoryKey }, action: { key: actionKey }, data },
          index
        ): CategorizedActionKeyAndData => ({
          _id: index.toString(),
          categoryKey,
          actionKey,
          data,
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([actionData])
  )

  // Group action data by adjacent action, preserving order.
  const groupedActionData = useMemo(
    () =>
      actionData.reduce((acc, { category, action, data }, index) => {
        // If most recent action is the same as the current action, add the
        // current action's data to the most recent action's data.
        const lastAction = acc[acc.length - 1]
        if (lastAction && lastAction.action.key === action.key) {
          lastAction.all.push({
            data,
            // Index in the original array.
            index,
          })
        } else {
          // Otherwise, add a new action to the list.
          acc.push({
            category,
            action,
            all: [
              {
                data,
                // Index in the original array.
                index,
              },
            ],
          })
        }

        return acc
      }, [] as Omit<ActionRendererProps, 'SuspenseLoader' | 'allActionsWithData' | 'setSeenAllPages'>[]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([actionData])
  )

  const [copied, setCopied] = useState<number>()
  // Unset copied after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(undefined), 2000)
    // Cleanup on unmount.
    return () => clearTimeout(timeout)
  }, [copied])

  // Store for each action group whether the user has seen all pages.
  const [seenAllPagesForAction, setSeenAllPagesForAction] = useState(() =>
    groupedActionData.reduce(
      (acc, { all }, index) => ({
        ...acc,
        [index]: all.length <= ACTIONS_PER_PAGE,
      }),
      {} as Record<number, boolean | undefined>
    )
  )
  // Check that every action has seen all pages, and if so, call the
  // `setSeenAllActionPages` callback.
  const [markedSeen, setMarkedSeen] = useState(false)
  useEffect(() => {
    if (markedSeen) {
      return
    }

    if (
      setSeenAllActionPages &&
      [...Array(groupedActionData.length)].every(
        (_, index) => seenAllPagesForAction[index]
      )
    ) {
      setSeenAllActionPages()
      setMarkedSeen(true)
    }
  }, [
    groupedActionData.length,
    markedSeen,
    seenAllPagesForAction,
    setSeenAllActionPages,
  ])

  return (
    <div className="flex flex-col gap-2">
      {groupedActionData.map((props, index) => (
        <div key={index} className="group relative" id={`A${index + 1}`}>
          <ActionRenderer
            key={
              // Re-render when the action at a given position changes so the
              // form resets. If the action changed and the data in the form was
              // updated in a `useEffect`, the new action may try to render the
              // past action's data and error in unexpected ways. The data in
              // the form needs to match the action being rendered at all times,
              // thus re-render the entire component (and reset the form) when
              // the action changes. This is necessary because the component
              // expects to exist inside a FormProvider, and a FormProvider
              // depends on a `useForm` hook return value.
              `${index}-${props.action.key}`
            }
            {...props}
            SuspenseLoader={SuspenseLoader}
            allActionsWithData={actionKeysWithData}
            setSeenAllPages={() =>
              setSeenAllPagesForAction((prev) =>
                // Don't update if already true.
                prev[index]
                  ? prev
                  : {
                      ...prev,
                      [index]: true,
                    }
              )
            }
          />

          {!hideCopyLink && (
            <IconButton
              Icon={copied === index ? Check : Link}
              className="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => {
                const url = new URL(window.location.href)
                url.hash = '#' + `A${index + 1}`
                navigator.clipboard.writeText(url.href)
                setCopied(index)
                onCopyLink?.()
              }}
              size="sm"
              variant="none"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export type ActionRendererProps = {
  category: ActionCategoryWithLabel
  action: Action
  all: {
    // Index of data in `allActionsWithData` list.
    index: number
    data: any
  }[]
  allActionsWithData: CategorizedActionKeyAndData[]
  setSeenAllPages: () => void
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

// Renders a group of data that belong to the same action.
export const ActionRenderer = ({
  category,
  action,
  all,
  allActionsWithData,
  setSeenAllPages,
  SuspenseLoader,
}: ActionRendererProps) => {
  const { t } = useTranslation()
  const form = useForm({
    defaultValues: {
      data: all.map(({ data }) => data),
    },
  })

  const [page, setPage] = useState(PAGINATION_MIN_PAGE)
  const minIndex = (page - 1) * ACTIONS_PER_PAGE
  const maxIndex = page * ACTIONS_PER_PAGE
  const maxPage = Math.ceil(all.length / ACTIONS_PER_PAGE)

  // Store pages visited so we can check if we've seen all pages.
  const [pagesVisited, setPagesVisited] = useState(() => new Set([page]))
  useEffect(() => {
    setPagesVisited((prev) => {
      const next = new Set(prev)
      next.add(page)
      return next
    })
  }, [page])

  const [markedSeen, setMarkedSeen] = useState(false)
  useEffect(() => {
    if (markedSeen) {
      return
    }

    // If only one page, mark as seen.
    if (maxPage === PAGINATION_MIN_PAGE) {
      setSeenAllPages()
      setMarkedSeen(true)
    }

    // If all pages have been visited, mark as seen.
    if (pagesVisited.size === maxPage) {
      setSeenAllPages()
      setMarkedSeen(true)
    }
  }, [markedSeen, maxPage, page, pagesVisited.size, setSeenAllPages])

  return (
    <FormProvider {...form}>
      <ActionCard action={action} actionCount={all.length} category={category}>
        {all.map(
          ({ index, data }, dataIndex) =>
            // Paginate manually instead of slicing the array so that the
            // `dataIndex` matches the index in the `data` array of the form.
            dataIndex >= minIndex &&
            dataIndex < maxIndex && (
              <SuspenseLoader key={index} fallback={<Loader size={36} />}>
                <action.Component
                  allActionsWithData={allActionsWithData}
                  data={data}
                  fieldNamePrefix={`data.${dataIndex}.`}
                  index={index}
                  isCreating={false}
                />
              </SuspenseLoader>
            )
        )}

        {maxPage > PAGINATION_MIN_PAGE && (
          <div className="-mx-6 flex flex-col gap-4 border-t border-border-secondary p-6 pb-0">
            <div className="flex flex-row items-center gap-4 rounded-md bg-background-secondary p-4">
              <WarningRounded className="!h-12 !w-12 text-icon-interactive-warning" />

              <p className="primary-text text-text-interactive-warning-body">
                {t('info.actionPageWarning', {
                  actions: all.length,
                  pages: maxPage,
                })}
              </p>
            </div>

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
    </FormProvider>
  )
}
