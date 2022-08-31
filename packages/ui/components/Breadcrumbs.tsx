import clsx from 'clsx'
import Link from 'next/link'
import { Fragment, ReactNode } from 'react'

import { ArrowForward } from '@dao-dao/icons'

export interface BreadcrumbsProps {
  crumbs: {
    href: string
    label: ReactNode
  }[]
  current: ReactNode
  className?: string
}

export const Breadcrumbs = ({
  crumbs,
  current,
  className,
}: BreadcrumbsProps) => (
  <div
    className={clsx(
      'flex flex-row gap-2 items-center text-text-secondary header-text',
      className
    )}
  >
    {crumbs.map(({ href, label }, idx) => (
      <Fragment key={idx}>
        <Link href={href}>
          <a className="mx-2 hover:opacity-80 transition-opacity">{label}</a>
        </Link>

        <ArrowForward className="w-5 h-5 text-icon-tertiary" />
      </Fragment>
    ))}

    {/* Highlight last crumb. */}
    <p className="mx-2 text-text-primary">{current}</p>
  </div>
)
