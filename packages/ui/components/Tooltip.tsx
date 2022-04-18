import { FC, ReactNode } from 'react'

import ReachTooltip from '@reach/tooltip'

export interface TooltipProps {
  label: ReactNode | undefined
  children: ReactNode
}

export const Tooltip: FC<TooltipProps> = ({ label, children }) =>
  !!label ? (
    <ReachTooltip label={label}>{children}</ReachTooltip>
  ) : (
    <>{children}</>
  )
