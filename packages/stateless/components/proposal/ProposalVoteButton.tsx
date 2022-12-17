import clsx from 'clsx'

import { ProposalVoteOption } from '@dao-dao/types'

import { Button } from '../buttons'

export interface ProposalVoteButtonProps<Vote extends unknown> {
  option: ProposalVoteOption<Vote>
  onClick: () => void
  pressed?: boolean
  disabled?: boolean
}

export const ProposalVoteButton = <Vote extends unknown>({
  option: { label, Icon },
  onClick,
  pressed = false,
  disabled = false,
}: ProposalVoteButtonProps<Vote>) => (
  <Button
    className={clsx('mb-2 w-full border-2 border-transparent pl-4', {
      'border-border-primary': pressed,
    })}
    contentContainerClassName={clsx('justify-between text-sm', {
      'primary-text': !pressed,
    })}
    disabled={disabled}
    onClick={onClick}
    pressed={pressed}
    size="lg"
    variant="secondary"
  >
    <p>{label}</p>
    <Icon className="h-6 w-6" />
  </Button>
)
