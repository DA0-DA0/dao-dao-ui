import { Tooltip as MaterialTooltip } from '@mui/material'
import { ReactElement, ReactNode } from 'react'

export interface TooltipProps {
  label: ReactNode | undefined
  children: ReactElement
}

export const Tooltip = ({ label, children }: TooltipProps) =>
  !!label ? (
    <MaterialTooltip
      classes={{
        tooltip:
          '!text-xs !font-medium !text-text-body !bg-component-tooltip !rounded-md !border !border-border-primary',
      }}
      componentsProps={{
        popper: {
          disablePortal: true,
        },
      }}
      title={label}
    >
      {children}
    </MaterialTooltip>
  ) : (
    <>{children}</>
  )
