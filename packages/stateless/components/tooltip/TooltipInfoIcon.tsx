import { InfoOutlined, WarningAmberRounded } from '@mui/icons-material'
import clsx from 'clsx'

import { IconButtonProps } from '@dao-dao/types'

import { IconButton } from '../icon_buttons/IconButton'
import { Tooltip, TooltipProps } from './Tooltip'

export type TooltipInfoIconProps = Omit<TooltipProps, 'children'> &
  Pick<IconButtonProps, 'size' | 'className' | 'iconClassName'> & {
    warning?: boolean
  }

export const TooltipInfoIcon = ({
  size,
  className,
  iconClassName,
  warning,
  ...props
}: TooltipInfoIconProps) => (
  <Tooltip {...props}>
    <IconButton
      Icon={warning ? WarningAmberRounded : InfoOutlined}
      // Only change background on hover, and don't outline. Don't make this
      // feel like a clickable button.
      className={clsx(
        'cursor-help !bg-transparent !p-1.5 !outline-none hover:!bg-background-interactive-hover',
        className
      )}
      iconClassName={iconClassName}
      size={size}
      variant="ghost"
    />
  </Tooltip>
)
