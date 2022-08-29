import clsx from 'clsx'
import { ReactNode } from 'react'

export interface ProposalStatusProps {
  icon: ReactNode
  label: ReactNode
  className?: string
}

export const ProposalStatus = ({
  icon,
  label,
  className,
}: ProposalStatusProps) => (
  <div
    className={clsx('flex flex-row gap-2 items-center link-text', className)}
  >
    {icon}
    {label}
  </div>
)
