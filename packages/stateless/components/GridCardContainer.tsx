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
        'grid-rows-auto grid grid-cols-1 gap-1.5 sm:gap-2 lg:gap-3',
        {
          'xs:grid-cols-2 md:grid-cols-3': cardType === 'tall',
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
