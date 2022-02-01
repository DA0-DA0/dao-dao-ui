import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { sidebarExpandedAtom } from 'atoms/sidebar'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline'

export function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useRecoilState(sidebarExpandedAtom)

  const collapsedArrowClass = expanded ? (
    <ChevronRightIcon className="h-5" />
  ) : (
    <ChevronLeftIcon className="h-5" />
  )

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded((e) => !e)}
        className="text-secondary text-white fixed top-4 right-3 p-2 dark:bg-slate-800 rounded-lg"
      >
        {collapsedArrowClass}
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="text-secondary text-white fixed top-4 right-3 p-2 dark:bg-slate-800 rounded-lg"
      >
        {collapsedArrowClass}
      </button>
      {children}
    </>
  )
}
