import { PlusIcon, MapIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { ReactNode } from 'react'
import i18n from '@dao-dao/i18n'

const ActionItem = ({
  href,
  icon,
  text,
}: {
  href: string
  icon: ReactNode
  text: string
}) => (
  <div className="py-0.5 px-2 hover:bg-secondary rounded-md link-text">
    <Link href={href}>
      <a className="flex gap-2 items-center">
        {icon}
        {text}
      </a>
    </Link>
  </div>
)

export const ActionMenu = () => (
  <div className="p-4 bg-primary rounded-md border border-transparent hover:border-btn-secondary">
    <div className="flex flex-col gap-1 font-medium md:gap-0 text-md">
      <ActionItem
        href="/org/create"
        icon={<PlusIcon className="w-4" />}
        text={i18n.t('Create a DAO')}
      />
      <ActionItem
        href="/org/list"
        icon={<MapIcon className="w-4" />}
        text={i18n.t('Explore DAOs')}
      />
    </div>
  </div>
)
