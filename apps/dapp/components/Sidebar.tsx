import { ReactNode } from 'react'

import { useRecoilState } from 'recoil'

import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'

import { sidebarExpandedAtom } from 'atoms/sidebar'

function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useRecoilState(sidebarExpandedAtom)

  const Icon = expanded ? ChevronRightIcon : ChevronLeftIcon
  return (
    <>
      {/* <button
          onClick={() => setExpanded((e) => !e)}
          className="text-secondary text-white fixed top-4 right-3 p-2 dark:bg-slate-800 rounded-lg"
          >
          <Icon className="h-5" />
          </button> */}
      {expanded && children}
    </>
  )
}

export default Sidebar
