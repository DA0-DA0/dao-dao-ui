import clsx from 'clsx'
import { ReactNode, forwardRef } from 'react'

interface GridCardContainerProps {
  children: ReactNode | ReactNode[]
  cardType?: 'tall' | 'wide'
  className?: string
}

export const GridCardContainer = forwardRef<
  HTMLDivElement,
  GridCardContainerProps
>(function GridCardContainer({ children, cardType = 'tall', className }, ref) {
  return (
    <div
      className={clsx(
        'grid-rows-auto grid grid-cols-1 gap-2 sm:gap-3 lg:gap-4',
        {
          'sm:grid-cols-2 md:grid-cols-3': cardType === 'tall',
          'sm:grid-cols-2': cardType === 'wide',
        },
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  )
})
