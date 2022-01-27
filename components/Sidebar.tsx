import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { sidebarExpandedAtom } from 'atoms/sidebar'

export function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useRecoilState(sidebarExpandedAtom)

  const collapsedArrowClass = expanded ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  )

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded((e) => !e)}
        style={{
          color: 'grey',
          cursor: 'pointer',
          fontSize: '25px',
          lineHeight: '1',
          position: 'absolute',
          top: '6%',
          right: '1%',
        }}
      >
        {collapsedArrowClass}
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="expanded"
        style={{
          color: 'grey',
          cursor: 'pointer',
          fontSize: '25px',
          lineHeight: '1',
          position: 'absolute',
          top: '2%',
          right: '1%',
        }}
      >
        {collapsedArrowClass}
      </button>
      {children}
    </>
  )
}
