import { Menu } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'

import { Breadcrumbs, BreadcrumbsProps } from '../Breadcrumbs'
import { IconButton } from '../IconButton'
import { useToggleResponsiveNavigationContext } from './ToggleResponsiveNavigationContext'

export interface PageHeaderProps {
  title?: string
  breadcrumbs?: BreadcrumbsProps
  className?: string
  noBorder?: boolean
  children?: ReactNode
}

// Title and breadcrumbs are mutually exclusive. Title takes precedence.
export const PageHeader = ({
  title,
  breadcrumbs,
  className,
  noBorder = false,
  children,
}: PageHeaderProps) => {
  const toggleResponsiveNavigation = useToggleResponsiveNavigationContext()

  return (
    <div
      className={clsx(
        'flex relative flex-row gap-6 items-center h-20',
        !noBorder && 'border-b border-border-secondary',
        className
      )}
    >
      <IconButton
        Icon={Menu}
        className="absolute -left-2 shrink-0 !outline-none sm:hidden"
        onClick={() => toggleResponsiveNavigation()}
        variant="ghost"
      />

      {title ? (
        <p className="pl-10 leading-[5rem] sm:pl-0 header-text">{title}</p>
      ) : breadcrumbs ? (
        <Breadcrumbs
          {...breadcrumbs}
          className={clsx('pl-10 sm:pl-0', breadcrumbs.className)}
        />
      ) : null}

      {children}
    </div>
  )
}
