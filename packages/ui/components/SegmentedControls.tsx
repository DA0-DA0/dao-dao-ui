import clsx from 'clsx'

import { Button } from './Button'

export interface SegmentedControlsTab {
  name: string
  selected?: boolean
  onClick: () => void
}

export interface SegmentedControlsProps {
  tabs: SegmentedControlsTab[]
}

export const SegmentedControls = ({ tabs }: SegmentedControlsProps) => (
  <div className="grid grid-flow-col auto-cols-fr bg-background-tertiary">
    {tabs.map(({ name, onClick, selected }, index) => (
      <div key={name} className="flex flex-row items-center">
        {index !== 0 && !tabs[index - 1].selected && !selected && (
          <div className="w-[1px] h-4 bg-border-primary"></div>
        )}

        <Button
          className={clsx(
            'flex justify-center items-center w-full',
            selected && 'bg-background-primary body-text'
          )}
          onClick={onClick}
          variant="ghost"
        >
          {name}
        </Button>
      </div>
    ))}
  </div>
)
