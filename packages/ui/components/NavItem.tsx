import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

export interface NavItemData {
  renderIcon: (mobile: boolean) => ReactNode
  label: string
  href: string
  active: boolean
  external: boolean
}

export interface NavItemProps {
  item: NavItemData
  mobile?: boolean
}

export const NavItem = ({
  item: { renderIcon, label, href, active, external },
  mobile = false,
}: NavItemProps) => {
  const aClassName = clsx(
    'link-text flex flex-row items-center gap-2 rounded-lg p-3',
    {
      'bg-accent-transparent text-accent': active,
      'text-body hover:bg-card': !active,
      'gap-4 text-base': mobile,
    }
  )
  const contents = (
    <>
      {renderIcon(mobile)}
      <p className="sm:hidden lg:block">{label}</p>
    </>
  )

  return external ? (
    <a
      className={aClassName}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {contents}
    </a>
  ) : (
    <Link href={href}>
      <a className={aClassName}>{contents}</a>
    </Link>
  )
}
