import { Star } from '@mui/icons-material'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import {
  Action,
  ActionCategory,
  ActionCategoryKey,
  ActionKey,
  ActionKeyAndData,
  LoadedActions,
} from '@dao-dao/types'

import { useSearchFilter } from '../../hooks'
import { Button } from '../buttons'
import { Collapsible } from '../Collapsible'
import { SearchBar } from '../inputs'
import { Loader } from '../logo'
import { TooltipInfoIcon } from '../tooltip'

export type ActionLibraryProps = {
  /**
   * All action categories to render. Should be loaded from
   * `useLoadedActionsAndCategories`.
   */
  categories: ActionCategory[]
  /**
   * Loaded actions in the categories. Should be loaded from
   * `useLoadedActionsAndCategories`.
   */
  loadedActions: LoadedActions
  /**
   * The react-hook-form field name that stores the action data.
   */
  actionDataFieldName: string
  /**
   * A callback when an action is selected.
   */
  onSelect?: (action: Action) => void
}

export const ActionLibrary = ({
  categories,
  loadedActions,
  actionDataFieldName,
  onSelect,
}: ActionLibraryProps) => {
  const { t } = useTranslation()

  const { control, watch } = useFormContext<{
    actionData: ActionKeyAndData[]
  }>()
  const { append: addAction } = useFieldArray({
    name: actionDataFieldName as 'actionData',
    control,
  })
  const actionData = watch(actionDataFieldName as 'actionData') || []

  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect
  const onSelectAction = useCallback(
    (action: Action) => {
      const loadedAction = loadedActions[action.key]
      if (!loadedAction) {
        return
      }

      onSelectRef.current?.(action)

      addAction({
        // See `ActionKeyAndData` comment in
        // `packages/types/actions.ts` for an explanation of why we need to
        // append with a unique ID.
        _id: uuidv4(),
        actionKey: action.key,
        // Clone to prevent the form from mutating the original
        // object.
        data: cloneDeep(loadedAction.defaults ?? {}),
      })
    },
    [addAction, loadedActions]
  )

  const [_categoryKeySelected, setCategoryKeySelected] = useState<
    ActionCategoryKey | undefined
  >(categories[0]?.key)

  // Default nothing selected.
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // The action library is active if the most recent mouse click was within the
  // action library container. This ensures we don't capture arrow and enter
  // keys across multiple action libraries (like in multiple choice proposals)
  // or when the user is typing into an input elsewhere.
  const [isActionLibraryActive, setIsActionLibraryActive] = useState(false)
  const actionLibraryRef = useRef<HTMLDivElement>(null)
  const itemsListRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null)

  const allActions = useMemo(
    () => Object.values(loadedActions).map(({ action }) => action),
    [loadedActions]
  )
  const {
    searchBarProps,
    filteredData: filteredActions,
    filter,
    setFilter,
  } = useSearchFilter({
    data: allActions,
    filterableKeys: ACTION_SEARCH_FILTERABLE_KEYS,
    // If filter is updated, unselect category and select first item.
    onFilterChange: () => {
      setCategoryKeySelected(undefined)
      setSelectedIndex(0)
    },
  })

  // If filter exists, unselect category.
  const categoryKeySelected = filter
    ? undefined
    : // Fallback to first category if state empty.
      _categoryKeySelected || categories[0]?.key
  const selectedCategory = categoryKeySelected
    ? categories.find((c) => c.key === categoryKeySelected)
    : undefined

  const showingActions = categoryKeySelected
    ? (selectedCategory || categories[0]).actions
    : filteredActions.slice(0, 10).map(({ item }) => item)

  // Ensure selected item is scrolled into view.
  useEffect(() => {
    const item = itemsListRef.current?.children[selectedIndex]
    if (!item) {
      return
    }

    // Only scroll if not already visible.
    const { bottom, top } = item.getBoundingClientRect()
    const containerRect = itemsListRef.current.getBoundingClientRect()
    if (top >= containerRect.top && bottom <= containerRect.bottom) {
      return
    }

    item.scrollIntoView({
      behavior: 'smooth',
    })
  }, [selectedIndex])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!isActionLibraryActive) {
        return
      }

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex((index) =>
            index - 1 < 0
              ? showingActions.length - 1
              : // Just in case for some reason the index is overflowing.
                Math.min(index - 1, showingActions.length - 1)
          )
          break
        case 'ArrowDown':
        case 'Tab':
          event.preventDefault()
          setSelectedIndex(
            // Just in case for some reason the index is underflowing.
            (index) => Math.max(index + 1, 0) % showingActions.length
          )
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < showingActions.length) {
            onSelectAction(showingActions[selectedIndex])
          }
          break
      }
    },
    [isActionLibraryActive, selectedIndex, showingActions, onSelectAction]
  )

  // Add event listeners.
  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    // Update activity based on whether or not the last click was within the
    // action library.
    const updateIsActionLibraryActive = (event: MouseEvent | TouchEvent) => {
      if (actionLibraryRef.current?.contains(event.target as Node)) {
        setIsActionLibraryActive(true)
      } else {
        setIsActionLibraryActive(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', updateIsActionLibraryActive)
    document.addEventListener('touchstart', updateIsActionLibraryActive)
    document.addEventListener('keydown', handleKeyPress)

    // Clean up event listeners on unmount.
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.removeEventListener('touchstart', updateIsActionLibraryActive)
      document.removeEventListener('mousedown', updateIsActionLibraryActive)
    }
  }, [handleKeyPress, isActionLibraryActive])

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

  return (
    <Collapsible
      containerClassName="mt-2 flex flex-col gap-4 rounded-md border border-dashed border-border-primary p-4 relative"
      dropdownContainerClassName="!ml-0"
      label={t('title.actionLibrary')}
      labelClassName="!title-text"
      labelContainerClassName="!py-0"
      noContentIndent
      ref={actionLibraryRef}
      tooltip={t('info.actionLibraryDescription')}
    >
      <SearchBar
        {...searchBarProps}
        className="text-sm"
        containerClassName="mb-4 md:mb-0 md:absolute md:top-4 md:right-4 md:w-[6rem] md:focus-within:w-full md:max-w-xs md:ring-[transparent] !duration-300 transition-all md:!ring-0 md:!p-0 md:!pb-1 overflow-hidden"
        iconClassName="md:!h-6 md:!w-6"
        onIconClick={() => searchBarRef.current?.focus()}
        ref={searchBarRef}
      />

      <div className="flex flex-col gap-x-3 gap-y-1 md:flex-row md:items-start">
        <div className="no-scrollbar -mx-4 flex min-w-0 shrink-0 flex-row gap-y-0 overflow-x-auto px-4 pb-2 pt-1 md:w-56 md:flex-col md:pb-1">
          {categories.map((category) => (
            <Button
              key={category.key}
              className={clsx(
                'shrink-0 rounded-b-none border-b border-transparent !py-1 !px-2 md:w-full md:rounded-b-md md:!border-b-0 md:!py-2 md:!px-3 md:text-left',
                categoryKeySelected === category.key &&
                  '!border-icon-primary md:bg-background-interactive-selected'
              )}
              onClick={() => {
                setCategoryKeySelected(category.key)
                setFilter('')
              }}
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

        <div
          className="flex min-w-0 grow flex-col gap-2 pt-1 md:pb-1"
          ref={itemsListRef}
        >
          {showingActions
            .filter(
              (action) =>
                // Never show programmatic actions.
                !action.programmaticOnly &&
                // Show if reusable or not already used.
                (!action.notReusable ||
                  !actionData.some((a) => a.actionKey !== action.key))
            )
            .map((action, index) => (
              <Button
                key={categoryKeySelected + action.key}
                className={clsx(
                  selectedIndex === index &&
                    'bg-background-interactive-selected'
                )}
                contentContainerClassName="gap-4 text-left"
                disabled={
                  loadingActionKeys.includes(action.key) ||
                  !!erroredActionKeys[action.key]
                }
                onClick={() => onSelectAction(action)}
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
    </Collapsible>
  )
}

const ACTION_SEARCH_FILTERABLE_KEYS: Fuse.FuseOptionKey<Action>[] = [
  'label',
  'description',
  'keywords',
]
