import { useTranslation } from 'react-i18next'

import { FollowState } from '@dao-dao/types'

import { Tooltip } from '../tooltip'
import { Button } from './Button'

export interface FollowingToggleProps extends FollowState {
  className?: string
}

export const FollowingToggle = ({
  following,
  onFollow,
  updatingFollowing,
  className,
}: FollowingToggleProps) => {
  const { t } = useTranslation()

  return (
    <Tooltip
      title={following ? t('info.unfollowTooltip') : t('info.followTooltip')}
    >
      <Button
        className={className}
        loading={updatingFollowing}
        onClick={onFollow}
        variant={following ? 'secondary' : 'primary'}
      >
        {following ? t('button.following') : t('button.follow')}
      </Button>
    </Tooltip>
  )
}
