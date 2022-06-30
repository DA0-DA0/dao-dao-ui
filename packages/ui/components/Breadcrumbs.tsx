import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

export interface BreadcrumbsProps {
  crumbs: Array<[string, string]>
  className?: string
}

// Navigation breadcrumbs. We hide these on small screens prefering the nav bar.
export const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs, className }) => (
  <ul className={clsx('link-text hidden list-none lg:flex', className)}>
    <li key="icon">
      <Link href={crumbs[crumbs.length - 2][0]}>
        <a>
          <ArrowNarrowLeftIcon className="mb-1 inline h-5 w-5 transition hover:opacity-80" />
        </a>
      </Link>
    </li>
    {crumbs.map(([link, name], idx) => (
      <li key={name}>
        <Link href={link}>
          <a className="mx-2 transition hover:opacity-80">{name}</a>
        </Link>
        {idx != crumbs.length - 1 && '/'}
      </li>
    ))}
  </ul>
)
