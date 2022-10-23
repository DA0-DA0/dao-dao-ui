import clsx from 'clsx'

import { ProfileVoteCardOption } from '..'
import { Button } from '../buttons'

export interface ProfileVoteButtonProps {
  option: ProfileVoteCardOption<unknown>
  onClick: () => void
  pressed?: boolean
}

export const ProfileVoteButton = ({
  option: { label, Icon },
  onClick,
  pressed = false,
}: ProfileVoteButtonProps) => (
  <Button
    className={clsx('mb-2 w-full border-2 border-transparent pl-4', {
      'border-border-primary': pressed,
    })}
    contentContainerClassName={clsx('justify-between text-sm', {
      'primary-text': !pressed,
    })}
    onClick={onClick}
    pressed={pressed}
    size="lg"
    variant="secondary"
  >
    <p>{label}</p>
    <Icon className="h-6 w-6" />
  </Button>
)
