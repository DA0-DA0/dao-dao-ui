import clsx from 'clsx'

import { Info } from '@dao-dao/icons'

import { Tooltip, TooltipProps } from './Tooltip'

export type TooltipIconProps = Omit<TooltipProps, 'children'> & {
  className?: string
}

export const TooltipIcon = ({ className, ...props }: TooltipIconProps) => (
  <Tooltip {...props}>
    <p>
      {/* Make 20% larger than size of text. */}
      <Info
        className={clsx(
          'shrink-0 cursor-help text-[1.2em] transition-opacity hover:opacity-80 active:opacity-70',
          className
        )}
      />
    </p>
  </Tooltip>
)
