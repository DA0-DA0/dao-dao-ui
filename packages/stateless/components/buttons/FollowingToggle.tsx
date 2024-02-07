import { useTranslation } from 'react-i18next'

import { ButtonProps, FollowState } from '@dao-dao/types'

import { Tooltip } from '../tooltip'
import { Button } from './Button'

export type FollowingToggleProps = FollowState &
  Omit<ButtonProps, 'loading' | 'onClick'>

export const FollowingToggle = ({
  following,
  onFollow,
  updatingFollowing,
  variant = 'secondary',
  ...props
}: FollowingToggleProps) => {
  const { t } = useTranslation()

  return (
    <Tooltip
      title={following ? t('info.unfollowTooltip') : t('info.followTooltip')}
    >
      <Button
        loading={updatingFollowing}
        onClick={onFollow}
        variant={variant}
        {...props}
      >
        {following ? t('button.unfollow') : t('button.follow')}
      </Button>
    </Tooltip>
  )
}
