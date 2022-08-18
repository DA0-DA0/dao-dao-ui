import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'

import { TooltipIcon } from '../TooltipIcon'

export interface InputLabelProps
  extends Omit<ComponentProps<'span'>, 'children'> {
  mono?: boolean
  name: string
  tooltip?: ReactNode
  containerProps?: Omit<ComponentProps<'label'>, 'children'>
}

export const InputLabel = ({
  className,
  mono,
  name,
  tooltip,
  containerProps: { className: labelClassName, ...containerProps } = {},
  ...rest
}: InputLabelProps) => (
  <label
    className={clsx('flex items-center space-x-1', labelClassName)}
    {...containerProps}
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
