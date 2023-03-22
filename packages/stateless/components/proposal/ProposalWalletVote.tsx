import clsx from 'clsx'

import { TooltipTruncatedText } from '../tooltip'

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
      'button-text-sm relative flex min-w-[5rem] shrink-0 items-center justify-center rounded-full py-1 px-4 text-center',
      className
    )}
  >
    <TooltipTruncatedText text={label} />

    {showBadge && (
      <div className="absolute top-[1.5px] right-[1.5px] h-[0.375rem] w-[0.375rem] rounded-full bg-icon-interactive-active"></div>
    )}
  </div>
)
