import { Add } from '@mui/icons-material'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Action } from '@dao-dao/actions'
import { usePlatform } from '@dao-dao/utils'

import { Button } from './Button'
import { Popup, PopupProps } from './popup'
import { SearchBar } from './SearchBar'

export interface ActionSelectorProps {
  actions: Action[]
  onSelectAction: (action: Action) => void
}

export const ActionSelector = ({
  actions,
  onSelectAction,
}: ActionSelectorProps) => {
  const { t } = useTranslation()
  const actionsFuse = useMemo(
    () => new Fuse(actions, { keys: ['label', 'description'] }),
    [actions]
  )
  const actionsListRef = useRef<HTMLDivElement>(null)

  const [filter, setFilter] = useState('')
  const filteredActions = useMemo(
    () =>
      filter ? actionsFuse.search(filter).map(({ item }) => item) : actions,
    [actions, actionsFuse, filter]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  // When filtered actions update, reset selection to top.
  useEffect(() => setSelectedIndex(0), [filteredActions])
  // Ensure selected action is scrolled into view.
  useEffect(() => {
    const item = actionsListRef.current?.children[selectedIndex]
    if (!item) {
      return
    }

    // Only scroll if not already visible.
    const { bottom, top } = item.getBoundingClientRect()
    const containerRect = actionsListRef.current.getBoundingClientRect()
    if (top >= containerRect.top && bottom <= containerRect.bottom) {
      return
    }

    item.scrollIntoView({
      behavior: 'smooth',
    })
  }, [selectedIndex])

  // Detect if Mac for checking keypress.
  const { isMac } = usePlatform()

  const getPopupKeydownEventListener: Required<PopupProps>['getKeydownEventListener'] =
    useCallback(
      (open, setOpen) => (event) => {
        if (
          // If showing popup, do nothing. This allows the keybinding to
          // function normally when the selector is open. The escape keybinding
          // can always be used to exit the popup.
          open ||
          // If focused on an input, do nothing. This command overlaps with
          // select all, so if we're focused on a text input, don't open it.
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA'
        ) {
          return
        }

        if ((!isMac && event.ctrlKey) || event.metaKey) {
          if (event.key === 'a') {
            event.preventDefault()
            setOpen(true)
          }
        }
      },
      [isMac]
    )

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex((index) =>
            index - 1 < 0
              ? filteredActions.length - 1
              : // Just in case for some reason the index is overflowing.
                Math.min(index - 1, filteredActions.length - 1)
          )
          break
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(
            // Just in case for some reason the index is underflowing.
            (index) => Math.max(index + 1, 0) % filteredActions.length
          )
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < filteredActions.length) {
            onSelectAction(filteredActions[selectedIndex])
          }
          break
      }
    },
    [selectedIndex, filteredActions, onSelectAction]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    // Clean up event listener on unmount.
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return (
    <Popup
      Trigger={({ open, ...props }) => (
        <Button pressed={open} variant="secondary" {...props}>
          <Add
            className={clsx(
              'w-4 h-4',
              open ? 'text-icon-brand' : 'text-icon-primary'
            )}
          />{' '}
          {t('button.addAnAction')}
        </Button>
      )}
      getKeydownEventListener={getPopupKeydownEventListener}
      headerContent={
        <SearchBar
          onChange={(event) => setFilter(event.target.value)}
          placeholder={t('info.searchActionPlaceholder')}
          value={filter}
        />
      }
      position="right"
    >
      <div
        className="overflow-y-auto pr-4 pl-2 space-y-1 !w-[24rem] max-w-[96vw] !h-[38rem] max-h-[96vh] styled-scrollbar"
        ref={actionsListRef}
      >
        {filteredActions.map((action, index) => (
          <ActionDisplayItem
            key={action.key}
            action={action}
            onClick={() => onSelectAction(action)}
            selected={selectedIndex === index}
          />
        ))}
      </div>
    </Popup>
  )
}

interface ActionDisplayItemProps {
  action: Action
  onClick: () => void
  selected: boolean
}

const ActionDisplayItem = ({
  action: { Icon, label, description },
  onClick,
  selected,
}: ActionDisplayItemProps) => (
  <Button
    className={clsx('w-full', selected && 'bg-background-interactive-selected')}
    contentContainerClassName="gap-4"
    onClick={onClick}
    variant="ghost"
  >
    <p className="text-xl">
      <Icon />
    </p>
    <div className="space-y-1 text-left">
      <p className="text-text-body link-text">{label}</p>
      <p className="secondary-text">{description}</p>
    </div>
  </Button>
)
