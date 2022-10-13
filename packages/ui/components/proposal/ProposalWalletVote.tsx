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
      'button-text-sm relative flex w-16 shrink-0 items-center justify-center rounded-full py-1 px-4',
      className
    )}
  >
    <p>{label}</p>
    {showBadge && (
      <div className="absolute top-[1.5px] right-[1.5px] h-[0.375rem] w-[0.375rem] rounded-full bg-icon-interactive-active"></div>
    )}
  </div>
)
