import { Check, WarningRounded } from '@mui/icons-material'
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
import { useTranslation } from 'react-i18next'

import { useSearchFilter } from '../../hooks'
import { Button } from '../buttons/Button'
import { SearchBar } from '../inputs/SearchBar'
import { Modal } from '../modals'
import { NoContent } from '../NoContent'

export interface FilterableItem {
  key: string | number
  Icon?: ComponentType
  label: ReactNode
  description?: ReactNode
  rightNode?: ReactNode
  selected?: boolean
}

export interface FilterableItemPopupProps<T extends FilterableItem> {
  Trigger: ComponentType<{ onClick: () => void; open: boolean }>
  items: T[]
  filterableItemKeys: Fuse.FuseOptionKey<T>[]
  onSelect: (item: T, index: number) => void
  searchPlaceholder?: string
  listClassName?: string
  closeOnSelect?: boolean
  getKeydownEventListener?: (
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => (event: KeyboardEvent) => any
}

export const FilterableItemPopup = <T extends FilterableItem>({
  Trigger,
  items,
  filterableItemKeys,
  onSelect,
  searchPlaceholder,
  listClassName,
  closeOnSelect = true,
  getKeydownEventListener,
}: FilterableItemPopupProps<T>) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const { searchBarProps, filteredData, setFilter } = useSearchFilter(
    items,
    filterableItemKeys
  )
  const itemsListRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null)

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

  const onSelectItem = useCallback(
    (item: T, index: number) => {
      onSelect(item, index)
      // Close.
      if (closeOnSelect) {
        setOpen(false)
      }
    },
    [closeOnSelect, onSelect]
  )

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // If closed, do not process keypresses.
      if (!open) {
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
    [open, selectedIndex, filteredData, onSelectItem]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    // Add custom listener if provided.
    const listener =
      getKeydownEventListener && getKeydownEventListener(open, setOpen)
    if (listener) {
      document.addEventListener('keydown', listener)
    }

    // Clean up event listeners on unmount.
    return () => {
      document.removeEventListener('keydown', handleKeyPress)

      // Remove custom listener if provided.
      if (listener) {
        document.removeEventListener('keydown', listener)
      }
    }
  }, [getKeydownEventListener, handleKeyPress, open])

  useEffect(() => {
    // Auto focus on search bar on open.
    if (open) {
      searchBarRef.current?.focus()
      // Clear filter on close.
    } else {
      // Blur search bar in case focused.
      searchBarRef.current?.blur()

      // Small delay to let it fade away first.
      setTimeout(() => setFilter(''), 200)
    }
  }, [open, searchBarRef, setFilter])

  return (
    <>
      <Trigger onClick={() => setOpen((o) => !o)} open={open} />

      <Modal
        containerClassName="!w-[24rem] !max-w-[96vw] !h-[32rem] !max-h-[96vh]"
        contentContainerClassName="p-3 pt-4"
        headerContainerClassName="p-4"
        headerContent={
          <SearchBar
            className="!primary-text text-text-body"
            containerClassName="grow"
            ghost
            hideIcon
            placeholder={searchPlaceholder}
            ref={searchBarRef}
            {...searchBarProps}
          />
        }
        hideCloseButton
        onClose={() => setOpen(false)}
        visible={open}
      >
        <div
          className={clsx(
            'no-scrollbar grow space-y-1 overflow-y-auto',
            listClassName
          )}
          ref={itemsListRef}
        >
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <Button
                key={item.key}
                className={clsx(
                  'w-full',
                  selectedIndex === index &&
                    'bg-background-interactive-selected'
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

                <div className="min-w-0 space-y-1 text-left">
                  <div className="flex flex-row items-center gap-2">
                    {item.selected && (
                      <Check className="!h-4 !w-4 text-icon-brand" />
                    )}

                    <p
                      className={clsx(
                        'link-text break-words',
                        item.selected ? 'text-text-brand' : 'text-text-body'
                      )}
                    >
                      {item.label}
                    </p>
                  </div>

                  {item.description && (
                    <div className="secondary-text break-words">
                      {item.description}
                    </div>
                  )}
                </div>

                {item.rightNode && (
                  <div className="flex grow flex-row items-center justify-end">
                    {item.rightNode}
                  </div>
                )}
              </Button>
            ))
          ) : (
            <NoContent
              Icon={WarningRounded}
              body={t('info.nothingFound')}
              className="h-full w-full justify-center border-0"
            />
          )}
        </div>
      </Modal>
    </>
  )
}
