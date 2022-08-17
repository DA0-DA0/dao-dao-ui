import { ReactNode } from 'react'

export interface ModeButtonProps {
  onClick: () => void
  active: boolean
  children: ReactNode
}

export const ModeButton = ({ onClick, active, children }: ModeButtonProps) => (
  <button
    className={`rounded py-2 px-4  transition ${
      active
        ? 'border border-inactive bg-btn-secondary'
        : 'hover:bg-btn-secondary'
    } body-text`}
    onClick={onClick}
  >
    {children}
  </button>
)
