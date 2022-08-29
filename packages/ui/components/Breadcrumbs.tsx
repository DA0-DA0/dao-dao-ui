import clsx from 'clsx'
import Link from 'next/link'
import { Fragment } from 'react'

import { ArrowForward } from '@dao-dao/icons'

export interface BreadcrumbsProps {
  crumbs: {
    href: string
    label: string
  }[]
  className?: string
}

export const Breadcrumbs = ({ crumbs, className }: BreadcrumbsProps) => (
  <div
    className={clsx(
      'flex flex-row gap-2 items-center text-text-secondary header-text',
      className
    )}
  >
    {crumbs.map(({ href, label }, idx) => (
      <Fragment key={idx}>
        <Link href={href}>
          <a
            className={clsx(
              'mx-2 hover:opacity-80 transition-opacity',
              // Highlight last crumb.
              idx === crumbs.length - 1 && 'text-text-primary'
            )}
          >
            {label}
          </a>
        </Link>

        {idx < crumbs.length - 1 && (
          <ArrowForward className="w-5 h-5 text-icon-tertiary" />
        )}
      </Fragment>
    ))}
  </div>
)
