import clsx from 'clsx'
import { useState } from 'react'

import { Button } from '../buttons'

export interface SegmentedControlTab<T extends unknown> {
  label: string
  value: T
}

export interface SegmentedControlsProps<T extends unknown> {
  tabs: SegmentedControlTab<T>[]
  selected: T
  onSelect: (value: T) => void
  loading?: T
  className?: string
  disabled?: boolean
}

export const SegmentedControls = <T extends unknown>({
  tabs,
  selected,
  onSelect,
  loading,
  className,
  disabled,
}: SegmentedControlsProps<T>) => {
  const [hovering, setHovering] = useState<number>()

  return (
    <div
      className={clsx(
        'group bg-background-tertiary grid auto-cols-fr grid-flow-col rounded-md',
        disabled && 'pointer-events-none',
        className
      )}
      onMouseLeave={() => setHovering(undefined)}
    >
      {tabs.map(({ label, value }, index) => (
        <div key={index} className="flex flex-row items-stretch">
          {/* Don't render left border for the first element. */}
          {index > 0 && (
            <div
              className={clsx(
                'bg-border-primary h-4 w-[1px] self-center opacity-100 transition-opacity',
                {
                  // Do not show left border if...
                  '!opacity-0':
                    // left tab selected.
                    selected === tabs[index - 1].value ||
                    // current tab selected.
                    selected === value ||
                    // left tab hovering.
                    hovering === index - 1 ||
                    // current tab hovering.
                    hovering === index,
                }
              )}
            ></div>
          )}

          <Button
            className={clsx(
              'flex w-full items-center justify-center !px-4',
              selected === value || hovering === index
                ? // Brighten text when selected or hovering over this tab.
                  'body-text'
                : // Dim text when not selected and not hovering over this tab.
                  'text-text-secondary',
              // Highlight background when selected. Button contains its own
              // hover background class.
              selected === value && '!bg-background-primary'
            )}
            loading={loading === value}
            onClick={() => onSelect(value)}
            onMouseOver={() => setHovering(index)}
            variant="ghost"
          >
            {label}
          </Button>
        </div>
      ))}
    </div>
  )
}
