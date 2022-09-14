import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'

import { TooltipInfoIcon } from '../TooltipInfoIcon'

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
    className={clsx('flex flex-row items-center space-x-1', labelClassName)}
    {...containerProps}
  >
    <span
      className={clsx('secondary-text', { 'font-mono': mono }, className)}
      {...rest}
    >
      {name}
    </span>

    {tooltip && <TooltipInfoIcon size="sm" title={tooltip} />}
  </label>
)
