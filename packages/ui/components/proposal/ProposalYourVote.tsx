import clsx from 'clsx'

export interface ProposalYourVoteProps {
  label: string
  showBadge: boolean
  className: string
}

export const ProposalYourVote = ({
  label,
  showBadge,
  className,
}: ProposalYourVoteProps) => (
  <div
    className={clsx(
      'flex relative justify-center items-center py-1 px-4 w-20 rounded-full button-text-sm',
      className
    )}
  >
    <p>{label}</p>
    {showBadge && (
      <div className="absolute top-[1.5px] right-[1.5px] w-[0.375rem] h-[0.375rem] bg-[#F53E86] rounded-full"></div>
    )}
  </div>
)
