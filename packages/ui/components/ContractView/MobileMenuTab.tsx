import clsx from 'clsx'
import { FC } from 'react'

export interface MobileMenuTabProps {
  icon: string
  text: string
  onClick: () => void
  selected: boolean
}

export const MobileMenuTab: FC<MobileMenuTabProps> = ({
  icon,
  text,
  onClick,
  selected,
}) => (
  <button
    className={clsx(
      'flex flex-col flex-1 gap-3 items-center p-5 min-w-[100px] rounded transition',
      selected ? 'bg-tab-hover' : 'bg-tab hover:bg-tab-hover'
    )}
    onClick={onClick}
    style={{
      backgroundImage: selected
        ? 'radial-gradient(#FF990033, #FFCC001A, transparent 80%)'
        : '',
    }}
  >
    <span className="text-[32px]">{icon}</span>
    <h2 className="text-dark button-text">{text}</h2>
  </button>
)
