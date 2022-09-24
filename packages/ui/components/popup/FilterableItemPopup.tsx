import clsx from 'clsx'
import Fuse from 'fuse.js'
import {
  ComponentType,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Button } from '../Button'
import { SearchBar } from '../SearchBar'
import { Popup, PopupProps } from './Popup'

export interface FilterableItemPopupProps<T>
  extends Omit<PopupProps, 'headerContent' | 'children' | 'setOpenRef'> {
  items: T[]
  filterableItemKeys: Fuse.FuseOptionKey<T>[]
  onSelect: (item: T, index: number) => void
  searchPlaceholder?: string
  listClassName?: string
  closeOnSelect?: boolean
}

export const FilterableItemPopup = <
  T extends {
    key: string | number
    Icon?: ComponentType
    label: string
    description?: string
  }
>({
  items,
  filterableItemKeys,
  onSelect,
  searchPlaceholder,
  listClassName,
  closeOnSelect = true,
  // Popup props and overrides.
  onOpen,
  onClose,
  popupClassName,
  ...popupProps
}: FilterableItemPopupProps<T>) => {
  const itemsFuse = useMemo(
    () => new Fuse(items, { keys: filterableItemKeys }),
    [items, filterableItemKeys]
  )
  const itemsListRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null)
  const setOpenRef = useRef<Dispatch<SetStateAction<boolean>> | null>(null)

  const [filter, setFilter] = useState('')
  const filteredItems = useMemo(
    () => (filter ? itemsFuse.search(filter).map(({ item }) => item) : items),
    [filter, itemsFuse, items]
  )

  const onSelectItem = useCallback(
    (item: T, index: number) => {
      onSelect(item, index)
      // Close.
      if (closeOnSelect) {
        setOpenRef.current?.(false)
      }
    },
    [closeOnSelect, onSelect]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  // When filtered items update, reset selection to top.
  useEffect(() => setSelectedIndex(0), [filteredItems])
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
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex((index) =>
            index - 1 < 0
              ? filteredItems.length - 1
              : // Just in case for some reason the index is overflowing.
                Math.min(index - 1, filteredItems.length - 1)
          )
          break
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(
            // Just in case for some reason the index is underflowing.
            (index) => Math.max(index + 1, 0) % filteredItems.length
          )
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
            onSelectItem(filteredItems[selectedIndex], selectedIndex)
          }
          break
      }
    },
    [selectedIndex, filteredItems, onSelectItem]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    // Clean up event listener on unmount.
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Auto focus on search bar on open.
  const onPopupOpen = useCallback(() => {
    searchBarRef.current?.focus()

    // Call original callback if passed in.
    onOpen?.()
  }, [onOpen, searchBarRef])

  // Clear filter on close.
  const onPopupClose = useCallback(() => {
    // Small delay to let it fade away first.
    setTimeout(() => setFilter(''), 200)

    // Call original callback if passed in.
    onClose?.()
  }, [onClose])

  return (
    <Popup
      headerContent={
        <SearchBar
          onChange={(event) => setFilter(event.target.value)}
          placeholder={searchPlaceholder}
          ref={searchBarRef}
          value={filter}
        />
      }
      onClose={onPopupClose}
      onOpen={onPopupOpen}
      popupClassName={clsx('w-60 h-80', popupClassName)}
      setOpenRef={setOpenRef}
      {...popupProps}
    >
      <div
        className={clsx(
          'overflow-y-auto grow pr-4 pl-2 space-y-1 w-full no-scrollbar',
          listClassName
        )}
        ref={itemsListRef}
      >
        {filteredItems.map((item, index) => (
          <Button
            key={item.key}
            className={clsx(
              'w-full',
              selectedIndex === index && 'bg-background-interactive-selected'
            )}
            contentContainerClassName="gap-4"
            onClick={() => onSelectItem(item, index)}
            variant="ghost"
          >
            {item.Icon && (
              <p className="text-2xl">
                <item.Icon />
              </p>
            )}
            <div className="space-y-1 text-left">
              <p className="text-text-body link-text">{item.label}</p>
              {item.description && (
                <p className="secondary-text">{item.description}</p>
              )}
            </div>
          </Button>
        ))}
      </div>
    </Popup>
  )
}
