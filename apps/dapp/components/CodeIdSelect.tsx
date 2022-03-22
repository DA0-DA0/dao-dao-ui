import { Button } from '@dao-dao/ui'
import { ChevronDownIcon } from '@heroicons/react/outline'

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
      <span className="px-2 font-medium">Contract Version</span>
      <div className="dropdown dropdown-end">
        <Button size="sm">
          {currentVersion.name} <ChevronDownIcon className="inline w-4 h-4" />
        </Button>
        <ul
          className="p-2 w-52 shadow-2xl dropdown-content menu bg-base-100 rounded-box"
          tabIndex={0}
        >
          {versions.map((v) => (
            <li
              key={v.name}
              className="p-2 hover:bg-purple-500 rounded-md cursor-pointer"
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
