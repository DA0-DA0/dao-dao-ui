import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipInfoIcon } from '../tooltip/TooltipInfoIcon'

export interface InputLabelProps
  extends Omit<ComponentProps<'p'>, 'children' | 'title'> {
  mono?: boolean
  name?: string
  tooltip?: ReactNode
  containerProps?: Omit<ComponentProps<'div'>, 'children'>
  children?: ReactNode | ReactNode[]
  optional?: boolean
  primary?: boolean
  title?: boolean
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
  title,
  ...rest
}: InputLabelProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx('flex flex-row items-center space-x-1', labelClassName)}
      {...containerProps}
    >
      <p
        className={clsx(
          title ? 'title-text' : primary ? 'primary-text' : 'secondary-text',
          mono && 'font-mono',
          className
        )}
        {...rest}
      >
        {name}
        {children}
        {optional && ` (${t('form.optional')})`}
      </p>

      {tooltip && <TooltipInfoIcon size="sm" title={tooltip} />}
    </div>
  )
}
