import clsx from 'clsx'

export interface ProposalWalletVoteProps {
  label: string
  showBadge: boolean
  className: string
}

export const ProposalWalletVote = ({
  label,
  showBadge,
  className,
}: ProposalWalletVoteProps) => (
  <div
    className={clsx(
      'flex relative shrink-0 justify-center items-center py-1 px-4 w-16 rounded-full button-text-sm',
      className
    )}
  >
    <p>{label}</p>
    {showBadge && (
      <div className="absolute top-[1.5px] right-[1.5px] w-[0.375rem] h-[0.375rem] bg-icon-interactive-active rounded-full"></div>
    )}
  </div>
)
