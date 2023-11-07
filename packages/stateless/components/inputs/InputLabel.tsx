import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipInfoIcon } from '../tooltip/TooltipInfoIcon'

export interface InputLabelProps
  extends Omit<ComponentProps<'span'>, 'children'> {
  mono?: boolean
  name?: string
  tooltip?: ReactNode
  containerProps?: Omit<ComponentProps<'label'>, 'children'>
  children?: ReactNode | ReactNode[]
  optional?: boolean
  primary?: boolean
}

export const InputLabel = ({
  className,
  mono,
  name,
  tooltip,
  containerProps: { className: labelClassName, ...containerProps } = {},
  children,
  optional,
  primary,
  ...rest
}: InputLabelProps) => {
  const { t } = useTranslation()

  return (
    <label
      className={clsx('flex flex-row items-center space-x-1', labelClassName)}
      {...containerProps}
    >
      <span
        className={clsx(
          primary ? 'primary-text' : 'secondary-text',
          mono && 'font-mono',
          className
        )}
        {...rest}
      >
        {name}
        {children}
        {optional && ` (${t('form.optional')})`}
      </span>

      {tooltip && <TooltipInfoIcon size="sm" title={tooltip} />}
    </label>
  )
}
