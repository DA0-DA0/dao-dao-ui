import clsx from 'clsx'
import { ReactNode } from 'react'

interface GridCardContainerProps {
  children: ReactNode | ReactNode[]
  cardType?: 'tall' | 'short'
  className?: string
}

export const GridCardContainer = ({
  children,
  cardType = 'tall',
  className,
}: GridCardContainerProps) => (
  <div
    className={clsx(
      'grid-rows-auto grid grid-cols-1 gap-4',
      {
        'sm:grid-cols-3': cardType === 'tall',
        'sm:grid-cols-2 lg:grid-cols-3': cardType === 'short',
      },
      className
    )}
  >
    {children}
  </div>
)
