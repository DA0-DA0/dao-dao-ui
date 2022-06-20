import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface NavListItemProps {
  href: string
  icon: FC<{ className?: string }>
  text: string
}

export const NavListItem: FC<NavListItemProps> = ({
  href,
  icon: Icon,
  text,
}) => {
  const { asPath: currentUrl } = useRouter()

  return (
    <li
      className={
        currentUrl == href ? 'underline' : 'hover:underline transition-all'
      }
    >
      <div className="cursor-pointer flex flex-row gap-2 items-center mt-1">
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
