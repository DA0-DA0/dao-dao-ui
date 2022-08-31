import { BorderClear, Check, Close, PanToolOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
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

  const Icon = ProfileVoteButtonIconMap[variant]

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
      {variant === 'yes'
        ? t('button.yes')
        : variant === 'no'
        ? t('button.no')
        : variant === 'noWithVeto'
        ? t('button.noWithVeto')
        : variant === 'abstain'
        ? t('button.abstain')
        : t('info.unknown')}

      <Icon className="w-6 h-6" />
    </Button>
  )
}

export const ProfileVoteButtonIconMap: Record<
  ProfileVoteButtonProps['variant'],
  ComponentType<{ className: string }>
> = {
  yes: Check,
  no: Close,
  noWithVeto: PanToolOutlined,
  abstain: BorderClear,
}
