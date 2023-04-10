import clsx from 'clsx'
import { useState } from 'react'

import { SegmentedControlsProps } from '@dao-dao/types'

import { Button } from '../buttons'

export const SegmentedControls = <T extends unknown>({
  tabs,
  selected,
  onSelect,
  loading,
  className,
  disabled,
}: SegmentedControlsProps<T>) => {
  const [hovering, setHovering] = useState<number>()

  const selectedIndex = tabs.findIndex((tab) => tab.value === selected)

  return (
    <div
      className={clsx(
        'group grid auto-cols-fr grid-flow-col rounded-md bg-background-tertiary',
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
                'h-4 w-[1px] shrink-0 self-center bg-border-primary opacity-100',
                {
                  // Emphasize left border when...
                  '!bg-border-interactive-hover':
                    // left tab hovering.
                    hovering === index - 1 ||
                    // current tab hovering.
                    hovering === index,
                  // Don't show left border if...
                  '!opacity-0':
                    // left tab selected.
                    selected === tabs[index - 1].value ||
                    // current tab selected.
                    selected === value,
                }
              )}
              style={{
                // Fade out a bit longer than it takes the sliding indicator to
                // move so it doesn't look like these borders disappear until
                // after the indicator reaches its place. Still transition
                // background color quickly on hover to match the quick
                // transition of the brighter text on hover.
                transition: 'background-color 150ms, opacity 500ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            ></div>
          )}

          <div className="relative w-full">
            {/* Sliding selection indicator. It matches the width of the first button and offsets based on the selection index. */}
            {index === 0 && selectedIndex > -1 && (
              <div
                className={clsx(
                  'absolute top-0 bottom-0 h-full w-full rounded-md bg-background-primary transition-[left] duration-300 motion-reduce:!transition-none'
                )}
                style={{
                  left: `calc(${selectedIndex} * 100%)`,
                }}
              ></div>
            )}

            <Button
              className={clsx(
                // Render transparent background so the sliding indicator can
                // show through underneath.
                'relative flex h-full w-full items-center justify-center !bg-transparent !px-4',
                selected === value || hovering === index
                  ? // Brighten text when selected or hovering over this tab.
                    '!text-text-body'
                  : // Dim text when not selected and not hovering over this tab.
                    '!text-text-secondary'
              )}
              loading={loading === value}
              onClick={() => onSelect(value)}
              onMouseOver={() => setHovering(index)}
              variant="ghost"
            >
              {label}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
