import Tooltip, { TooltipProps } from '@reach/tooltip'
import clsx from 'clsx'

import { Info } from '@dao-dao/icons'

export type TooltipIconProps = Omit<TooltipProps, 'children'> & {
  className?: string
}

export const TooltipIcon = ({ className, ...props }: TooltipIconProps) => (
  <Tooltip {...props}>
    <p>
      {/* Make 20% larger than size of text. */}
      <Info
        className={clsx(
          'shrink-0 text-[1.2em] hover:opacity-80 active:opacity-70 transition-opacity cursor-help',
          className
        )}
      />
    </p>
  </Tooltip>
)
