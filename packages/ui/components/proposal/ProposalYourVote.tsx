import { FC } from 'react'
import clsx from 'clsx'

export type YourVoteProps = {
  variant: 'abstain' | 'pending' | 'no' | 'yes'
}

export const ProposalYourVote = ({ variant }: YourVoteProps) => {
  return (
    <div
      className={clsx(
        'flex justify-center w-20 py-2 px-4 rounded-full font-medium text-sm', 
        variant == 'abstain'
          ? 'bg-primary text-secondary'
          : variant == 'pending'
          ? 'border border-primary'
          : variant == 'no'
          ? 'bg-[#C73E5914] text-interactive-error'
          : 'bg-[#39A69914] text-valid'
      )}
    >
      {variant[0].toUpperCase() + variant.slice(1)}
    </div>
  )
}
