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

import { PopupTrigger } from '@dao-dao/types'

import { useSearchFilter } from '../../hooks'
import { Button } from '../buttons/Button'
import { SearchBar } from '../inputs/SearchBar'
import { Modal } from '../modals'
import { NoContent } from '../NoContent'
import { TriggerRenderer } from './Popup'

export interface FilterableItem {
  key: string | number
  Icon?: ComponentType
  iconUrl?: string
  iconClassName?: string
  label: ReactNode
  description?: ReactNode
  rightNode?: ReactNode
  selected?: boolean
  contentContainerClassName?: string
}

export interface FilterableItemPopupProps<
  T extends FilterableItem = FilterableItem
> {
  trigger: PopupTrigger
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
  trigger,
  items,
  filterableItemKeys,
  onSelect,
  searchPlaceholder,
  listClassName,
  closeOnSelect = true,
  getKeydownEventListener,
}: FilterableItemPopupProps<T>) => {
  const { t } = useTranslation()

  const [_open, _setOpen] = useState(false)
  const open = trigger.type === 'manual' ? trigger.open : _open
  const setOpen = trigger.type === 'manual' ? trigger.setOpen : _setOpen

  const { searchBarProps, filteredData, setFilter } = useSearchFilter(
    items,
    filterableItemKeys
  )
  const itemsListRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLInputElement>(null)

  // Default nothing selected.
  const [selectedIndex, setSelectedIndex] = useState(-1)
  // When filtered items update, reset selection.
  useEffect(() => setSelectedIndex(-1), [filteredData])
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

  // Memoize reference so that it doesn't change on every render.
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  const onSelectItem = useCallback(
    (item: T, originalIndex: number) => {
      onSelectRef.current(item, originalIndex)
      // Close.
      if (closeOnSelect) {
        setOpen(false)
      }
    },
    [closeOnSelect, setOpen]
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
        case 'Tab':
          event.preventDefault()
          setSelectedIndex(
            // Just in case for some reason the index is underflowing.
            (index) => Math.max(index + 1, 0) % filteredData.length
          )
          break
        case 'Enter':
          event.preventDefault()
          // If nothing is selected, click the first item. It's confusing when
          // the first item is highlighted by default, so we don't show it as
          // selected, but still select it when pressing enter.
          const index = selectedIndex === -1 ? 0 : selectedIndex
          if (index >= 0 && index < filteredData.length) {
            const { item, originalIndex } = filteredData[index]
            onSelectItem(item, originalIndex)
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
  }, [getKeydownEventListener, handleKeyPress, open, setOpen])

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
      <TriggerRenderer
        options={{ open, onClick: () => setOpen((o) => !o) }}
        trigger={trigger}
      />

      <Modal
        containerClassName="!w-[28rem] !max-w-[96vw] !h-[36rem] !max-h-[96vh]"
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
            filteredData.map(({ item, originalIndex }, index) => (
              <Button
                key={item.key}
                className={clsx(
                  'w-full',
                  selectedIndex === index &&
                    'bg-background-interactive-selected'
                )}
                contentContainerClassName={clsx(
                  'gap-3',
                  item.contentContainerClassName
                )}
                onClick={() => onSelectItem(item, originalIndex)}
                variant="ghost"
              >
                {item.Icon ? (
                  <p className="text-2xl">
                    <item.Icon />
                  </p>
                ) : item.iconUrl ? (
                  <div
                    className={clsx(
                      'h-7 w-7 rounded-full bg-cover bg-center',
                      item.iconClassName
                    )}
                    style={{
                      backgroundImage: `url(${item.iconUrl})`,
                    }}
                  />
                ) : null}

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
