import { InfoOutlined } from '@mui/icons-material'
import clsx from 'clsx'

import { IconButton, IconButtonProps } from './IconButton'
import { Tooltip, TooltipProps } from './Tooltip'

export type TooltipInfoIconProps = Omit<TooltipProps, 'children'> &
  Pick<IconButtonProps, 'size' | 'className'>

export const TooltipInfoIcon = ({
  size,
  className,
  ...props
}: TooltipInfoIconProps) => (
  <Tooltip {...props}>
    <IconButton
      Icon={InfoOutlined}
      // Only change background on hover, and don't outline. Don't make this
      // feel like a clickable button.
      className={clsx(
        '!p-1.5 !bg-transparent hover:!bg-btn-ghost-hover !outline-none cursor-help',
        className
      )}
      size={size}
      variant="ghost"
    />
  </Tooltip>
)
