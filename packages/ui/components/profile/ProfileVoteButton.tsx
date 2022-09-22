import clsx from 'clsx'

import { ProfileVoteCardOption } from '..'
import { Button } from '../Button'

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
    className={clsx('pl-4 mb-2 w-full border-2 border-transparent', {
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
    <Icon className="w-6 h-6" />
  </Button>
)
