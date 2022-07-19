import { PencilIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'

import { INavDrafts } from '@dao-dao/state'

interface NavListDraftItemProps {
  title: string
  label: string
  address: string
  id: string
}

export const NavListDraftItem: FC<NavListDraftItemProps> = ({
  title,
  label,
  address,
  id,
}) => {
  return (
    <li className={'hover:underline transition-all'}>
      <div className="flex flex-row gap-2 items-center mt-1 cursor-pointer">
        <div className="flex items-center">
          <PencilIcon className="w-5 h-5" />{' '}
        </div>
        <div>
          <Link href={`/dao/${address}/proposals/create?draftId=${id}`}>
            <a className="w-full primary-text">{title}</a>
          </Link>
          <div className="caption-text">{label}</div>
        </div>
      </div>
    </li>
  )
}

export const DraftsNavList: FC<{ drafts: INavDrafts[] }> = ({ drafts }) => {
  return (
    <ul className="ml-2 list-none">
      {drafts?.map(({ label, id, title, address }) => (
        <NavListDraftItem
          key={id}
          address={address}
          id={id}
          label={label}
          title={title}
        />
      ))}
    </ul>
  )
}
