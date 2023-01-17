import { useTranslation } from 'react-i18next'

import { FollowState } from '@dao-dao/types'

import { Button } from './Button'

export type FollowingToggleProps = FollowState

export const FollowingToggle = ({
  following,
  onFollow,
  updatingFollowing,
}: FollowingToggleProps) => {
  const { t } = useTranslation()

  return (
    <Button
      loading={updatingFollowing}
      onClick={onFollow}
      variant={following ? 'secondary' : 'primary'}
    >
      {following ? t('button.following') : t('button.follow')}
    </Button>
  )
}
