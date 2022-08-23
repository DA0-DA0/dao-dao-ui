import clsx from 'clsx'

export type YourVoteProps = {
  variant: 'abstain' | 'pending' | 'no' | 'yes'
}

export const ProposalYourVote = ({ variant }: YourVoteProps) => {
  return (
    <div
      className={clsx(
        'flex relative justify-center items-center py-1 px-4 w-20 text-sm font-medium rounded-full',
        variant === 'abstain'
          ? 'text-text-secondary bg-background-secondary'
          : variant === 'pending'
          ? 'border-2 border-inactive'
          : variant === 'no'
          ? 'text-text-interactive-error bg-[#C73E5914]'
          : 'text-text-valid bg-color-valid/[0.08]'
      )}
    >
      {variant[0].toUpperCase() + variant.slice(1)}
      {variant === 'pending' && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#F53E86] rounded-full"></div>
      )}
    </div>
  )
}
