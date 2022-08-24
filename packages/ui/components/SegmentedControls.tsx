import clsx from 'clsx'
import { useState } from 'react'

import { Button } from './Button'

export interface SegmentedControlsTab {
  name: string
  selected?: boolean
  loading?: boolean
  onClick: () => void
}

export interface SegmentedControlsProps {
  tabs: SegmentedControlsTab[]
}

export const SegmentedControls = ({ tabs }: SegmentedControlsProps) => {
  const [hovering, setHovering] = useState<number>()

  return (
    <div
      className="group grid grid-flow-col auto-cols-fr bg-background-tertiary"
      onMouseLeave={() => setHovering(undefined)}
    >
      {tabs.map(({ name, onClick, selected, loading }, index) => (
        <div key={name} className="flex flex-row items-center">
          <div
            className={clsx(
              'w-[1px] h-4 bg-border-primary opacity-100 transition-opacity',
              {
                // Do not show left border if...
                '!opacity-0':
                  // first element.
                  index === 0 ||
                  // left tab selected.
                  tabs[index - 1].selected ||
                  // current tab selected.
                  selected ||
                  // left tab hovering.
                  hovering === index - 1 ||
                  // current tab hovering.
                  hovering === index,
              }
            )}
          ></div>

          <Button
            className={clsx(
              'flex justify-center items-center w-full',
              selected || hovering === index
                ? // Brighten text when selected or hovering over this tab.
                  'body-text'
                : // Dim text when not selected and not hovering over this tab.
                  'text-text-secondary',
              // Highlight background when selected and not hovering over any
              // tab. Button contains its own hover background class.
              selected && hovering === undefined && 'bg-background-primary'
            )}
            loading={loading}
            onClick={onClick}
            onMouseOver={() => setHovering(index)}
            variant="ghost"
          >
            {name}
          </Button>
        </div>
      ))}
    </div>
  )
}
