import clsx from 'clsx'
import Fuse from 'fuse.js'
import {
  ComponentType,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useSearchFilter } from '../../hooks'
import { Button } from '../buttons/Button'
import { SearchBar } from '../inputs/SearchBar'
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
    label: ReactNode
    description?: ReactNode
    rightNode?: ReactNode
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
  const { searchBarProps, filteredData, setFilter } = useSearchFilter(
    items,
    filterableItemKeys
  )
  const itemsListRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null)
  const openRef = useRef<boolean | null>(null)
  const setOpenRef = useRef<Dispatch<SetStateAction<boolean>> | null>(null)

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
  useEffect(() => setSelectedIndex(0), [filteredData])
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
      // If openRef is unset or false (so, closed), do not take over keypresses.
      if (!openRef.current) {
        return
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex((index) =>
            index - 1 < 0
              ? filteredData.length - 1
              : // Just in case for some reason the index is overflowing.
                Math.min(index - 1, filteredData.length - 1)
          )
          break
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(
            // Just in case for some reason the index is underflowing.
            (index) => Math.max(index + 1, 0) % filteredData.length
          )
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < filteredData.length) {
            onSelectItem(filteredData[selectedIndex], selectedIndex)
          }
          break
      }
    },
    [selectedIndex, filteredData, onSelectItem]
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
    // Blur search bar in case focused.
    searchBarRef.current?.blur()

    // Small delay to let it fade away first.
    setTimeout(() => setFilter(''), 200)

    // Call original callback if passed in.
    onClose?.()
  }, [onClose, setFilter])

  return (
    <Popup
      headerContent={
        <SearchBar
          placeholder={searchPlaceholder}
          ref={searchBarRef}
          {...searchBarProps}
        />
      }
      onClose={onPopupClose}
      onOpen={onPopupOpen}
      openRef={openRef}
      popupClassName={clsx('h-80 w-60', popupClassName)}
      setOpenRef={setOpenRef}
      {...popupProps}
    >
      <div
        className={clsx(
          'no-scrollbar -mt-4 w-full grow space-y-1 overflow-y-auto px-4 pt-4',
          listClassName
        )}
        ref={itemsListRef}
      >
        {filteredData.map((item, index) => (
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
              <p className="link-text text-text-body">{item.label}</p>
              {item.description && (
                <p className="secondary-text">{item.description}</p>
              )}
            </div>

            {item.rightNode && (
              <div className="flex grow flex-row items-center justify-end">
                {item.rightNode}
              </div>
            )}
          </Button>
        ))}
      </div>
    </Popup>
  )
}
