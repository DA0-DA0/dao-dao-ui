import { PlusIcon, MapIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { ReactNode } from 'react'

const ActionItem = ({
  href,
  icon,
  text,
}: {
  href: string
  icon: ReactNode
  text: string
}) => (
  <li className="py-0.5 px-2 mt-0.5 hover:bg-secondary rounded-md link-text">
    <Link href={href}>
      <a className="flex gap-2 items-center">
        {icon}
        {text}
      </a>
    </Link>
  </li>
)

export const ActionMenu = () => (
  <div className="p-4 bg-primary rounded-md border border-transparent hover:border-btn-secondary">
    <ul className="-mx-1 font-medium list-none text-md">
      <ActionItem
        href="/org/create"
        icon={<PlusIcon className="w-4" />}
        text="Create an Org"
      />
      <ActionItem
        href="/org/list"
        icon={<MapIcon className="w-4" />}
        text="Explore all Orgs"
      />
    </ul>
  </div>
)
