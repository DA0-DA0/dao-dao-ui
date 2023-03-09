import clsx from 'clsx'

import { ProposalVoteOption } from '@dao-dao/types'

import { Button } from '../buttons'

export interface ProposalVoteButtonProps<Vote extends unknown> {
  option: ProposalVoteOption<Vote>
  onClick?: () => void
  style?: object
  pressed?: boolean
  disabled?: boolean
  className?: string
}

export const ProposalVoteButton = <Vote extends unknown>({
  option: { label, Icon, style },
  onClick,
  pressed = false,
  disabled = false,
  className,
}: ProposalVoteButtonProps<Vote>) => (
  <Button
    className={clsx(
      'border-2 border-transparent',
      {
        'border-border-primary': pressed,
      },
      className
    )}
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
    <Icon className="!h-6 !w-6" style={style} />
  </Button>
)
