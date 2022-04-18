import { FC, ReactNode } from 'react'

export interface ModeButtonProps {
  onClick: () => void
  active: boolean
  children: ReactNode
}

export const ModeButton: FC<ModeButtonProps> = ({
  onClick,
  active,
  children,
}) => (
  <button
    className={`py-2 px-4 rounded  transition ${
      active
        ? 'bg-btn-secondary border border-inactive'
        : 'hover:bg-btn-secondary'
    } body-text`}
    onClick={onClick}
  >
    {children}
  </button>
)
