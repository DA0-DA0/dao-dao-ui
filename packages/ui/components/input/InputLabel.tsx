import clsx from 'clsx'
import { ComponentProps, FC, ReactNode } from 'react'

import { TooltipIcon } from '../TooltipIcon'

export interface InputLabelProps
  extends Omit<ComponentProps<'span'>, 'children'> {
  mono?: boolean
  name: string
  tooltip?: ReactNode
  labelProps?: Omit<ComponentProps<'label'>, 'children'>
}

export const InputLabel: FC<InputLabelProps> = ({
  className,
  mono,
  name,
  tooltip,
  labelProps: { className: labelClassName, ...labelProps } = {},
  ...rest
}) => (
  <label
    className={clsx('flex items-center space-x-1', labelClassName)}
    {...labelProps}
  >
    <span
      className={clsx('caption-text', { 'font-mono': mono }, className)}
      {...rest}
    >
      {name}
    </span>

    {tooltip && <TooltipIcon label={tooltip} />}
  </label>
)
