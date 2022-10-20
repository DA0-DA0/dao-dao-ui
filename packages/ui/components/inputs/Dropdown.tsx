import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ArrowDropdown } from '@dao-dao/icons'

import { Button } from '../buttons'

export interface DropdownOption<T> {
  label: string
  value: T
}

export interface DropdownProps<T> {
  options: DropdownOption<T>[]
  placeholder?: string
  selected?: T | T[]
  onSelect: (option: T, index: number) => void
  containerClassName?: string
  labelContainerClassName?: string
  labelClassName?: string
  iconClassName?: string
  keepOpenOnSelect?: boolean
}

export const Dropdown = <T extends unknown>({
  options,
  placeholder,
  selected,
  onSelect,
  containerClassName,
  labelContainerClassName,
  labelClassName,
  iconClassName,
  keepOpenOnSelect,
}: DropdownProps<T>) => {
  const { t } = useTranslation()

  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const selectedOptions =
    selected && Array.isArray(selected)
      ? options.filter(({ value }) => selected.includes(value))
      : options.filter(({ value }) => selected === value)

  // Set width of dropdown to this so it stays constant.
  const longestLabelLength = Math.max(
    placeholder?.length ?? 0,
    ...options.map(({ label }) => label.length)
  )

  // Listen for click not in dropdown bounds, and close if so. Adds listener
  // only when the dropdown is open.
  useEffect(() => {
    // Don't do anything if not on browser or dropdown is not open.
    // If open is switched off, the useEffect will remove the listener and then
    // not-readd it.
    if (typeof window === 'undefined' || !open) {
      return
    }

    const closeIfClickOutside = (event: MouseEvent) => {
      // If clicked on an element that is not a descendant of this Dropdown's
      // outermost container, close the dropdown.
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    window.addEventListener('click', closeIfClickOutside)
    return () => window.removeEventListener('click', closeIfClickOutside)
  }, [open])

  return (
    <div
      className={clsx('relative inline-block', containerClassName)}
      ref={containerRef}
    >
      <div
        className={clsx(
          'overflow-hidden rounded-md border border-b-0 transition-all',
          open
            ? 'rounded-b-none border-border-primary bg-component-dropdown'
            : 'border-transparent '
        )}
      >
        <Button
          className="rounded-none"
          contentContainerClassName={clsx(
            'justify-between gap-4',
            labelContainerClassName
          )}
          onClick={() => setOpen((o) => !o)}
          variant="ghost"
        >
          <p
            className={clsx(
              'link-text text-left',
              {
                // Darken if nothing selected and showing placeholder.
                'text-text-secondary': selectedOptions.length === 0,
              },
              labelClassName
            )}
            style={{
              width: `${longestLabelLength}ch`,
            }}
          >
            {selectedOptions.length === 0
              ? placeholder
              : selectedOptions.length === 1
              ? selectedOptions[0].label
              : t('info.numSelected', { count: selectedOptions.length })}
          </p>

          <ArrowDropdown className={clsx('h-2 w-2', iconClassName)} />
        </Button>
      </div>

      {/* Dropdown */}
      <div
        className={clsx(
          'absolute right-0 left-0 z-10 overflow-hidden rounded-b-md border border-t-0 border-border-primary bg-component-dropdown transition-all',
          {
            'pointer-events-none opacity-0': !open,
            'opacity-100': open,
          }
        )}
      >
        <div className="no-scrollbar flex h-full max-h-80 flex-col gap-[1px] overflow-y-auto border-t border-t-border-base">
          {options.map((option, index) => (
            <Button
              key={index}
              className="rounded-none"
              onClick={() => {
                onSelect(option.value, index)

                if (!keepOpenOnSelect) {
                  setOpen(false)
                }
              }}
              pressed={selectedOptions.includes(option)}
              variant="ghost"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
