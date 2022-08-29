import { useTranslation } from 'react-i18next'

import { PushPin } from '@dao-dao/icons'

import { Button } from '../Button'

export interface PinToggleProps {
  pinned: boolean
  onPin: () => void
}

export const PinToggle = ({ pinned, onPin }: PinToggleProps) => {
  const { t } = useTranslation()

  return (
    <Button onClick={(_e) => onPin()} variant="secondary">
      <p className="text-text-body">
        {pinned ? t('button.following') : t('button.follow')}
      </p>
      <PushPin className="w-4 h-4 text-icon-primary" />
    </Button>
  )
}
