import { WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CommandModalContextSection,
  CommandModalContextSectionItem,
} from '@dao-dao/types/command'

import { NoContent } from '../NoContent'
import { ItemRow } from './ItemRow'

export interface CommandModalContextViewProps {
  sections: CommandModalContextSection[]
  loading: boolean
  visible: boolean
}

interface ItemWithSection {
  item: CommandModalContextSectionItem
  section: CommandModalContextSection
}

export const CommandModalContextView = ({
  sections,
  loading,
  visible,
}: CommandModalContextViewProps) => {
  const { t } = useTranslation()

  // Flatten sections so we can access both section and item at the same level.
  const itemsWithSection: ItemWithSection[] = sections.flatMap((section) =>
    section.items.map((item) => ({
      item,
      section,
    }))
  )

  // Flat index in list of all items above.
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedItemWithSection: ItemWithSection | undefined =
    itemsWithSection[selectedIndex]

  // Cap selection at last item if items length changes.
  useEffect(() => {
    // If empty, do nothing to prevent negative index.
    if (itemsWithSection.length === 0) {
      return
    }

    setSelectedIndex((selected) =>
      Math.min(selected, itemsWithSection.length - 1)
    )
  }, [itemsWithSection.length])

  // Navigate on keypress.
  const handleKeyPress = useCallback(
    (event) => {
      // Do nothing if no items.
      if (itemsWithSection.length === 0 || !selectedItemWithSection) {
        return
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          setSelectedIndex((selection) => {
            let newIndex =
              selection === 0 ? itemsWithSection.length - 1 : selection - 1
            while (
              // Continue decrementing until finding a non-disabled item.
              itemsWithSection[newIndex].item.disabled &&
              // If newIndex loops all the way back to selection somehow,
              // terminate to prevent infinite loops. This should never
              // happen...
              newIndex !== selection
            ) {
              newIndex -= 1
              // Loop.
              if (newIndex < 0) {
                newIndex = itemsWithSection.length - 1
              }
            }

            return newIndex
          })
          break
        case 'ArrowRight':
        case 'ArrowDown':
          setSelectedIndex((selection) => {
            let newIndex = (selection + 1) % itemsWithSection.length
            while (
              // Continue incrementing until finding a non-disabled item.
              itemsWithSection[newIndex].item.disabled &&
              // If newIndex loops all the way back to selection somehow,
              // terminate to prevent infinite loops. This should never
              // happen...
              newIndex !== selection
            ) {
              newIndex = (newIndex + 1) % itemsWithSection.length
            }

            return newIndex
          })
          break
        case 'Enter':
          selectedItemWithSection.section.onChoose(selectedItemWithSection.item)
          break
      }
    },
    [itemsWithSection, selectedItemWithSection]
  )
  // Add keypress listener.
  useEffect(() => {
    // Don't add if loading or not visible.
    if (loading || !visible) {
      return
    }

    document.addEventListener('keydown', handleKeyPress)
    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress, loading, visible])

  // Ensure selected action is scrolled into view.
  const onSelectedRef = useCallback((ref: HTMLDivElement | null) => {
    const scrollParent = ref?.parentElement?.parentElement
    if (!ref || !scrollParent) {
      return
    }

    // Only scroll if not already visible.
    const { top, bottom } = ref.getBoundingClientRect()
    const containerRect = scrollParent.getBoundingClientRect()
    if (top >= containerRect.top && bottom <= containerRect.bottom) {
      return
    }

    scrollParent.scrollTo({
      behavior: 'smooth',
      top: ref.offsetTop - scrollParent.offsetTop - 24,
    })
  }, [])

  return (
    <div
      className={clsx('flex grow flex-col gap-1', loading && 'animate-pulse')}
    >
      {sections.length > 0 ? (
        sections.map(({ name, items, onChoose }, sectionIndex) => (
          <Fragment key={sectionIndex}>
            <p className="link-text h-7 py-1 pl-3 text-text-tertiary">{name}</p>

            {items.map((item, itemIndex) => {
              const selected =
                !loading && selectedItemWithSection?.item === item

              return (
                <ItemRow
                  key={itemIndex}
                  className={
                    loading
                      ? 'pointer-events-none !bg-background-interactive-disabled'
                      : undefined
                  }
                  item={item}
                  onClick={() => onChoose(item)}
                  ref={
                    // Scroll into view when selected.
                    selected ? onSelectedRef : undefined
                  }
                  selected={selected}
                />
              )
            })}
          </Fragment>
        ))
      ) : (
        <NoContent
          Icon={WarningRounded}
          body={t('info.nothingFound')}
          className="h-full w-full justify-center border-0"
        />
      )}
    </div>
  )
}

export const CommandModalContextViewLoader = () => (
  <CommandModalContextView
    loading
    sections={[
      {
        name: '',
        onChoose: () => null,
        items: [
          {
            name: '',
            Icon: () => null,
          },
          {
            name: '',
            Icon: () => null,
          },
        ],
      },
      {
        name: '',
        onChoose: () => null,
        items: [
          {
            name: '',
            Icon: () => null,
          },
          {
            name: '',
            Icon: () => null,
          },
          {
            name: '',
            Icon: () => null,
          },
          {
            name: '',
            Icon: () => null,
          },
        ],
      },
      {
        name: '',
        onChoose: () => null,
        items: [
          {
            name: '',
            Icon: () => null,
          },
        ],
      },
    ]}
    visible
  />
)
