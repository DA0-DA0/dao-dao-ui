import ReachTooltip from '@reach/tooltip'
import { FC, ReactNode } from 'react'

export interface TooltipProps {
  label: ReactNode | undefined
  children: ReactNode | ReactNode[]
}

export const Tooltip: FC<TooltipProps> = ({ label, children }) =>
  !!label ? (
    <ReachTooltip label={label}>{children}</ReachTooltip>
  ) : (
    <>{children}</>
  )
