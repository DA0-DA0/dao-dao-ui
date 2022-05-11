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
      'rounded p-5 flex flex-col items-center gap-3 min-w-[100px] transition',
      selected ? 'bg-tab-hover' : 'bg-tab hover:bg-tab-hover'
    )}
    style={{
      backgroundImage: selected
        ? 'radial-gradient(#FF990033, #FFCC001A, transparent 80%)'
        : '',
    }}
    onClick={onClick}
  >
    <span className="text-[32px]">{icon}</span>
    <h2 className="button-text text-dark">{text}</h2>
  </button>
)
