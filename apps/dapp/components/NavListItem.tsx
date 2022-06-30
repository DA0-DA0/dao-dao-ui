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
        currentUrl == href ? 'underline' : 'transition-all hover:underline'
      }
    >
      <div className="mt-1 flex cursor-pointer flex-row items-center gap-2">
        <div className="flex items-center">
          <Icon className="h-5 w-5" />
        </div>
        <Link href={href}>
          <a className="link-text w-full">{text}</a>
        </Link>
      </div>
    </li>
  )
}
