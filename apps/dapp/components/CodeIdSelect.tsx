// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ChevronDownIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/ui'

export interface ContractVersion {
  name: string
  codeId: number
}

export default function CodeIdSelect({
  currentVersion,
  versions,
  onSelect,
}: {
  currentVersion: ContractVersion
  versions: ContractVersion[]
  onSelect: (c: ContractVersion) => void
}) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center">
      <span className="px-2 font-medium">{t('title.contractVersion')}</span>
      <div className="dropdown dropdown-end">
        <Button size="sm">
          {currentVersion.name} <ChevronDownIcon className="inline h-4 w-4" />
        </Button>
        <ul
          className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-2xl"
          tabIndex={0}
        >
          {versions.map((v) => (
            <li
              key={v.name}
              className="cursor-pointer rounded-md p-2 hover:bg-purple-500"
              onClick={() => onSelect(v)}
            >
              {v.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
