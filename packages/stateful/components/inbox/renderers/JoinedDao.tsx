import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/stateless'
import {
  InboxItemRendererProps,
  InboxItemTypeJoinedDaoData,
} from '@dao-dao/types'

import { useFollowingDaos } from '../../../hooks'

export const JoinedDaoRenderer = ({
  data: { chainId, dao },
  clear,
}: InboxItemRendererProps<InboxItemTypeJoinedDaoData>) => {
  const { t } = useTranslation()
  const { setFollowing, updatingFollowing } = useFollowingDaos(chainId)

  const [loadingFollowing, setLoadingFollowing] = useState(false)

  return (
    <div className="flex flex-col gap-4 self-start rounded-md bg-background-secondary p-6">
      <p className="primary-text">{t('info.addedToDaoFollowPrompt')}</p>

      <div className="flex flex-row items-center gap-2">
        <Button
          center
          className="grow"
          disabled={updatingFollowing}
          loading={updatingFollowing && loadingFollowing}
          onClick={() => {
            setLoadingFollowing(true)
            setFollowing(dao).then((success) => {
              if (success) {
                clear()
              }
            })
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
            clear()
          }}
          variant="secondary"
        >
          {t('button.ignore')}
        </Button>
      </div>
    </div>
  )
}
