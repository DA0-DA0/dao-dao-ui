// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { Warning } from '@mui/icons-material'
import clsx from 'clsx'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CommandModalContextSection,
  CommandModalContextSectionItem,
} from '@dao-dao/tstypes/command'

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

  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedItemWithSection: ItemWithSection | undefined =
    itemsWithSection[selectedIndex]

  // Reset selection to first row if data changes.
  useEffect(() => setSelectedIndex(0), [sections])

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
    if (!ref || !ref.parentElement) {
      return
    }

    // Only scroll if not already visible.
    const { top, bottom } = ref.getBoundingClientRect()
    const containerRect = ref.parentElement.getBoundingClientRect()
    if (top >= containerRect.top && bottom <= containerRect.bottom) {
      return
    }

    ref.parentElement.scrollTo({
      behavior: 'smooth',
      top: ref.offsetTop - ref.parentElement.offsetTop - 24,
    })
  }, [])

  return (
    <div
      className={clsx(
        'flex overflow-y-auto flex-col grow gap-1 p-3 pt-4 no-scrollbar',
        loading && 'animate-pulse'
      )}
    >
      {sections.length > 0 ? (
        sections.map(({ name, items, onChoose }, sectionIndex) => (
          <Fragment key={sectionIndex}>
            <p className="py-1 pl-3 h-7 text-text-tertiary link-text">{name}</p>

            {items.map((item, itemIndex) => {
              const selected =
                !loading && selectedItemWithSection?.item === item

              return (
                <ItemRow
                  key={itemIndex}
                  className={
                    loading
                      ? '!bg-background-interactive-disabled pointer-events-none'
                      : undefined
                  }
                  // loading={navigatingFromHit === hit}
                  item={item}
                  loading={false}
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
          Icon={Warning}
          body={t('info.nothingFound')}
          className="justify-center w-full h-full border-0"
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
