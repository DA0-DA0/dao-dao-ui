import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/stateless'

import { useFollowingDaos } from '../../../hooks'

export const Renderer = ({ coreAddress }: { coreAddress: string }) => {
  const { t } = useTranslation()
  const { setFollowing, setUnfollowing, updatingFollowing } = useFollowingDaos()
  const [loadingFollowing, setLoadingFollowing] = useState(false)

  return (
    <div className="ml-10 flex flex-col gap-4 self-start rounded-md bg-background-secondary p-6">
      <p className="primary-text">{t('info.addedToDaoFollowPrompt')}</p>

      <div className="flex flex-row items-center gap-2">
        <Button
          center
          className="grow"
          disabled={updatingFollowing}
          loading={updatingFollowing && loadingFollowing}
          onClick={() => {
            setLoadingFollowing(true)
            setFollowing(coreAddress)
          }}
        >
          {t('button.follow')}
        </Button>
        <Button
          center
          className="grow"
          disabled={updatingFollowing}
          loading={updatingFollowing && !loadingFollowing}
          onClick={() => {
            setLoadingFollowing(false)
            setUnfollowing(coreAddress)
          }}
          variant="secondary"
        >
          {t('button.ignore')}
        </Button>
      </div>
    </div>
  )
}
