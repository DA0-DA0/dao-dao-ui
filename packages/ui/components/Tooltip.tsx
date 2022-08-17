import ReachTooltip from '@reach/tooltip'
import { ReactNode } from 'react'

export interface TooltipProps {
  label: ReactNode | undefined
  children: ReactNode | ReactNode[]
}

export const Tooltip = ({ label, children }: TooltipProps) =>
  !!label ? (
    <ReachTooltip label={label}>{children}</ReachTooltip>
  ) : (
    <>{children}</>
  )
