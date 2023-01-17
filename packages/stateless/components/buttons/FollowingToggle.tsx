import { DoneRounded } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { Button } from './Button'

export interface FollowingToggleProps {
  following: boolean
  onToggle: () => void
  updating: boolean
}

export const FollowingToggle = ({
  following,
  onToggle,
  updating,
}: FollowingToggleProps) => {
  const { t } = useTranslation()

  return (
    <Button
      disabled={updating}
      onClick={(_e) => onToggle()}
      variant="secondary"
    >
      {/* Don't show text on mobile, header too small. */}
      <p className="hidden text-text-body sm:block">
        {following ? t('button.following') : t('button.follow')}
      </p>
      <DoneRounded className="!h-4 !w-4 !text-icon-primary" />
    </Button>
  )
}
