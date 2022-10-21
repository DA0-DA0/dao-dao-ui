import clsx from 'clsx'
import { ReactNode } from 'react'

interface ProposalContainerProps {
  children: ReactNode | ReactNode[]
  className?: string
}

export const ProposalContainer = ({
  children,
  className,
}: ProposalContainerProps) => (
  <div className={clsx('flex flex-col gap-2 md:gap-1', className)}>
    {children}
  </div>
)
