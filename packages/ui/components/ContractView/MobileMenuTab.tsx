import clsx from 'clsx'

export interface MobileMenuTabProps {
  icon: string
  text: string
  onClick: () => void
  selected: boolean
}

export const MobileMenuTab = ({
  icon,
  text,
  onClick,
  selected,
}: MobileMenuTabProps) => (
  <button
    className={clsx(
      'flex min-w-[100px] flex-1 flex-col items-center gap-3 rounded p-5 transition',
      selected ? 'bg-tab-hover' : 'bg-tab hover:bg-tab-hover'
    )}
    onClick={onClick}
    style={{
      backgroundImage: selected
        ? 'radial-gradient(#FF990033, #FFCC001A, transparent 80%)'
        : ' ',
    }}
  >
    <span className="text-[32px]">{icon}</span>
    <h2 className="button-text text-dark">{text}</h2>
  </button>
)
