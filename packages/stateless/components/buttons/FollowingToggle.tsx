import { PushPin, PushPinOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { Button } from './Button'

export interface FollowingToggleProps {
  following: boolean
  onToggle: () => void
}

export const FollowingToggle = ({
  following,
  onToggle,
}: FollowingToggleProps) => {
  const { t } = useTranslation()
  const Icon = following ? PushPin : PushPinOutlined

  return (
    <Button onClick={(_e) => onToggle()} variant="secondary">
      {/* Don't show text on mobile, header too small. */}
      <p className="text-text-body hidden sm:block">
        {following ? t('button.following') : t('button.follow')}
      </p>
      <Icon className="!text-icon-primary !h-4 !w-4" />
    </Button>
  )
}
