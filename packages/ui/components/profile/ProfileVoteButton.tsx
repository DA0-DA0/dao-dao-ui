import {
  ChatAltIcon,
  CheckIcon,
  HandIcon,
  XIcon,
} from '@heroicons/react/outline'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Button } from '../Button'

export interface ProfileVoteButtonProps {
  variant: 'abstain' | 'noWithVeto' | 'no' | 'yes'
  pressed?: boolean
}

export const ProfileVoteButton = ({
  variant,
  pressed = false,
}: ProfileVoteButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button
      className={clsx('pl-4 mb-2 w-full border-2 border-transparent', {
        'border-border-primary': pressed,
      })}
      contentContainerClassName={clsx('justify-between text-sm', {
        'primary-text': !pressed,
      })}
      pressed={pressed}
      size="lg"
      variant="secondary"
    >
      {variant === 'yes' && t('button.yes')}
      {variant === 'no' && t('button.no')}
      {variant === 'noWithVeto' && t('button.noWithVeto')}
      {variant === 'abstain' && t('button.abstain')}

      {variant === 'yes' && <CheckIcon className="inline w-6" />}
      {variant === 'no' && <XIcon className="inline w-6" />}
      {variant === 'noWithVeto' && <HandIcon className="inline w-6" />}
      {variant === 'abstain' && <ChatAltIcon className="inline w-6" />}
    </Button>
  )
}
