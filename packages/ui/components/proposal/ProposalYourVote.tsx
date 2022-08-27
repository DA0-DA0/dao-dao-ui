import clsx from 'clsx'

import { convertToTitlecase } from '@dao-dao/utils'

export enum ProposalYourVoteEnum {
  Abstain = 'abstain',
  Pending = 'pending',
  No = 'no',
  Yes = 'yes',
}

export interface ProposalYourVoteProps {
  vote: ProposalYourVoteEnum
}

export const ProposalYourVote = ({ vote }: ProposalYourVoteProps) => (
  <div
    className={clsx(
      'flex relative justify-center items-center py-1 px-4 w-20 text-sm font-medium rounded-full',
      vote === ProposalYourVoteEnum.Abstain
        ? 'text-text-secondary bg-background-secondary'
        : vote === ProposalYourVoteEnum.Pending
        ? 'border-2 border-border-primary'
        : vote === ProposalYourVoteEnum.No
        ? 'text-text-interactive-error bg-background-interactive-error'
        : // vote === ProposalYourVoteEnum.Yes
          'text-text-interactive-valid bg-background-interactive-valid'
    )}
  >
    {convertToTitlecase(vote)}
    {vote === ProposalYourVoteEnum.Pending && (
      <div className="absolute top-0 right-0 w-2 h-2 bg-[#F53E86] rounded-full"></div>
    )}
  </div>
)
