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
      {/* Don't show text on mobile, header too small. */}
      <p className="hidden text-text-body sm:block">
        {pinned ? t('button.following') : t('button.follow')}
      </p>
      <PushPin className="w-4 h-4 text-icon-primary" />
    </Button>
  )
}
