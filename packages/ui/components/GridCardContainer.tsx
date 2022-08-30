import clsx from 'clsx'
import { ReactNode } from 'react'

interface GridCardContainerProps {
  children: ReactNode | ReactNode[]
  className?: string
}

export const GridCardContainer = ({
  children,
  className,
}: GridCardContainerProps) => (
  <div
    className={clsx(
      'grid grid-cols-1 gap-4 sm:grid-cols-3 grid-rows-auto',
      className
    )}
  >
    {children}
  </div>
)
