import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'

import { TooltipIcon } from '../TooltipIcon'

export type InputLabelProps = Omit<ComponentProps<'span'>, 'children'> & {
  mono?: boolean
  name: string
  tooltip?: ReactNode
  _outer?: Omit<ComponentProps<'label'>, 'children'>
}

export function InputLabel(props: InputLabelProps) {
  const { className, mono, name, tooltip, _outer, ...rest } = props

  return (
    <label
      {..._outer}
      className={clsx('flex items-center space-x-1', _outer?.className)}
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
}
