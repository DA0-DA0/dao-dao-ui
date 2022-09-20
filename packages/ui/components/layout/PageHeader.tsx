import { Menu } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'

import { Breadcrumbs, BreadcrumbsProps } from '../Breadcrumbs'
import { IconButton } from '../IconButton'
import { useAppLayoutContext } from './AppLayoutContext'

export interface PageHeaderProps {
  title?: string
  breadcrumbs?: BreadcrumbsProps
  className?: string
  noBorder?: boolean
  // Center title, breadcrumbs, or centerNode (whichever is displayed) even when
  // not responsive.
  forceCenter?: boolean
  centerNode?: ReactNode
  rightNode?: ReactNode
}

// Title and breadcrumbs are mutually exclusive. Title takes precedence.
export const PageHeader = ({
  title,
  breadcrumbs,
  className,
  noBorder = false,
  forceCenter = false,
  centerNode,
  rightNode,
}: PageHeaderProps) => {
  const { toggle } = useAppLayoutContext().responsiveNavigation

  return (
    <div
      className={clsx(
        'relative shrink-0 h-20',
        !noBorder && 'border-b border-border-secondary',
        className
      )}
    >
      <div className="flex absolute top-0 bottom-0 -left-2 flex-col justify-center">
        <IconButton
          Icon={Menu}
          className="!outline-none sm:hidden"
          onClick={toggle}
          variant="ghost"
        />
      </div>

      <div
        className={clsx(
          'flex flex-row justify-center items-center w-full h-full',
          !forceCenter && 'sm:justify-start'
        )}
      >
        {title ? (
          <p className="leading-[5rem] header-text">{title}</p>
        ) : breadcrumbs ? (
          <Breadcrumbs {...breadcrumbs} />
        ) : (
          centerNode
        )}
      </div>

      <div className="flex absolute top-0 right-0 bottom-0 flex-col justify-center">
        {rightNode}
      </div>
    </div>
  )
}
