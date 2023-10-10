import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@dao-dao/stateless'
import {
  InboxItemRendererProps,
  InboxItemTypeJoinedDaoData,
} from '@dao-dao/types'
import { formatLongDateTime } from '@dao-dao/utils'

import { useFollowingDaos } from '../../../hooks'
import { EntityDisplay } from '../../EntityDisplay'

export const JoinedDaoRenderer = ({
  item,
  data: { chainId, dao },
  clear,
}: InboxItemRendererProps<InboxItemTypeJoinedDaoData>) => {
  const { t } = useTranslation()
  const { setFollowing, updatingFollowing } = useFollowingDaos(chainId)

  const [loadingFollowing, setLoadingFollowing] = useState(false)

  const timestamp = item.timestamp && new Date(item.timestamp)

  return (
    <div className="flex flex-row items-end justify-between gap-6 rounded-md bg-background-secondary p-4">
      <div className="flex flex-col gap-2">
        <EntityDisplay address={dao} />

        <p className="body-text ml-8 break-words">
          {t('info.addedToDaoFollowPrompt', {
            context: timestamp ? 'withTimestamp' : 'withoutTimestamp',
            timestamp: timestamp ? formatLongDateTime(timestamp) : undefined,
          })}
        </p>
      </div>

      <Button
        center
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
    </div>
  )
}
