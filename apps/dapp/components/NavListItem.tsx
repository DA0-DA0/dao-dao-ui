import Link from 'next/link'
import { FC } from 'react'

export const NavListItem = ({
  key,
  currentUrl,
  href,
  icon,
  text,
}: {
  key?: string
  currentUrl: string
  href: string
  icon: FC<{}>
  text: string
}) => {
  const Icon = icon
  return (
    <li
      key={key}
      className={
        currentUrl == href ? 'underline' : 'hover:underline transition-all'
      }
    >
      <div className="flex flex-row gap-2 items-center cursor-pointer">
        <div className="flex items-center w-5 h-5">
          <Icon />
        </div>
        <Link href={href}>
          <a className="w-full link-text">{text}</a>
        </Link>
      </div>
    </li>
  )
}
