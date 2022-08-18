// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'

interface NavListItemProps {
  href: string
  icon: ComponentType<{ className?: string }>
  text: string
}

export const NavListItem = ({ href, icon: Icon, text }: NavListItemProps) => {
  const { asPath: currentUrl } = useRouter()

  return (
    <li
      className={
        currentUrl === href ? 'underline' : 'transition-all hover:underline'
      }
    >
      <div className="flex flex-row gap-2 items-center mt-1 cursor-pointer">
        <div className="flex items-center">
          <Icon className="w-5 h-5" />
        </div>
        <Link href={href}>
          <a className="w-full link-text">{text}</a>
        </Link>
      </div>
    </li>
  )
}
