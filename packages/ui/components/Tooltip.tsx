import {
  Tooltip as MaterialTooltip,
  TooltipProps as MaterialTooltipProps,
} from '@mui/material'
import { ReactElement, ReactNode } from 'react'

export interface TooltipProps extends MaterialTooltipProps {
  label: ReactNode | undefined
  children: ReactElement
}

export const Tooltip = ({
  label,
  children,
  classes,
  arrow,
  ...props
}: TooltipProps) =>
  label ? (
    <MaterialTooltip
      arrow={arrow ?? true}
      classes={{
        ...classes,
        arrow: classes?.arrow ?? '!text-component-tooltip',
        tooltip:
          classes?.tooltip ??
          '!font-sans !text-xs !font-normal !text-text-body !bg-component-tooltip !rounded-md !border !border-border-primary',
      }}
      {...props}
      title={label}
    >
      {children}
    </MaterialTooltip>
  ) : (
    <>{children}</>
  )
