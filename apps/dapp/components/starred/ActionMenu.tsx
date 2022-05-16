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
  <div className="py-2 px-4 bg-card hover:bg-secondary rounded md:py-0.5 md:px-2 md:bg-transparent link-text">
    <Link href={href}>
      <a className="flex gap-2 items-center">
        {icon}
        {text}
      </a>
    </Link>
  </div>
)

export const ActionMenu = () => (
  <div className="md:p-4 md:bg-card md:rounded-md md:border md:border-transparent md:hover:border-btn-secondary">
    <div className="flex flex-col gap-1 font-medium md:gap-0 text-md">
      <div className="grid flex-col grid-cols-2 gap-1 md:flex md:gap-0">
        <ActionItem
          href="/dao/create"
          icon={<PlusIcon className="w-4" />}
          text={'Create a DAO'}
        />
        <ActionItem
          href="/multisig/create"
          icon={<PlusIcon className="w-4" />}
          text={'Create a multisig'}
        />
      </div>
      <ActionItem
        href="/dao/list"
        icon={<MapIcon className="w-4" />}
        text={'Explore DAOs'}
      />
      <ActionItem
        href="/multisig/list"
        icon={<MapIcon className="w-4" />}
        text={'Explore multisigs'}
      />
    </div>
  </div>
)
