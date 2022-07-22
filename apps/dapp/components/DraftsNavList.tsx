import { PencilIcon, XCircleIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  activeDraftIdAtom,
  draftsAtom,
  navDraftsSelector,
} from '@dao-dao/state'

interface NavListDraftItemProps {
  title: string
  label: string
  address: string
  id: string
  isActive: boolean
  onDelete: () => void
}

export const NavListDraftItem: FC<NavListDraftItemProps> = ({
  title,
  label,
  address,
  id,
  isActive,
  onDelete,
}) => {
  return (
    <li
      className={`py-2 px-2 rounded-lg group ${isActive ? 'bg-primary' : ''}`}
    >
      <Link href={`/dao/${address}/proposals/create?draftId=${id}`}>
        <a className="w-full hover:underline transition-all">
          <div className="flex relative flex-row gap-2 justify-start items-center mt-1">
            <div className="flex items-center">
              <PencilIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="primary-text">{title}</div>
              <div className="caption-text">{label}</div>
            </div>
            <div
              className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={onDelete}
            >
              <XCircleIcon className="w-5 h-5" />
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

export const DraftsNavList: FC = () => {
  const drafts = useRecoilValue(navDraftsSelector)
  const setDraftIds = useSetRecoilState(draftsAtom)
  const [activeDraftId, setActiveDraftId] = useRecoilState(activeDraftIdAtom)
  const router = useRouter()
  return (
    <ul className="list-none">
      {drafts?.map(({ label, id, title, address }) => (
        <NavListDraftItem
          key={id}
          address={address}
          id={id}
          isActive={id === activeDraftId}
          label={label}
          onDelete={() => {
            setDraftIds((prevDrafts) =>
              prevDrafts.filter(({ id: oldId }) => id !== oldId)
            )
            if (id === activeDraftId) {
              router.replace(
                { query: { ...router.query, draftId: '' } },
                undefined,
                {}
              )
              setActiveDraftId(undefined)
            }
          }}
          title={title}
        />
      ))}
    </ul>
  )
}
