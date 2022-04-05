import { ChevronDownIcon } from '@heroicons/react/outline'

import { Button } from '@components'

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
  return (
    <div className="flex items-center">
      <span className="font-medium px-2">Contract Version</span>
      <div className="dropdown dropdown-end">
        <Button size="sm">
          {currentVersion.name} <ChevronDownIcon className="inline h-4 w-4" />
        </Button>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52"
        >
          {versions.map((v) => (
            <li
              key={v.name}
              className="hover:bg-purple-500 p-2 rounded-md cursor-pointer"
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
