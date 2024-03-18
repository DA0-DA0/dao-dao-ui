import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  Button,
  ChainProvider,
  Tooltip,
  useDaoNavHelpers,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import {
  InboxItemRendererProps,
  InboxItemTypeJoinedDaoData,
} from '@dao-dao/types'
import { formatDate, formatDateTimeTz } from '@dao-dao/utils'

import { useFollowingDaos } from '../../../hooks'
import { ButtonLink } from '../../ButtonLink'
import { EntityDisplay } from '../../EntityDisplay'

export const JoinedDaoRenderer = ({
  item,
  data: { chainId, dao },
  clear,
  compact,
}: InboxItemRendererProps<InboxItemTypeJoinedDaoData>) => {
  // `chainId` is occasionally undefined.
  if (item.chainId && !chainId) {
    chainId = item.chainId
  }

  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()
  const { setFollowing, updatingFollowing } = useFollowingDaos(chainId)

  const timestampFormatter = useTranslatedTimeDeltaFormatter({
    words: false,
  })

  const [loadingFollowing, setLoadingFollowing] = useState(false)

  const timestamp = item.timestamp && new Date(item.timestamp)
  const timestampDisplay = timestamp && (
    <Tooltip title={formatDateTimeTz(timestamp)}>
      <p className="legend-text mt-0.5 inline-block text-text-quaternary">
        {timestamp < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) ? (
          formatDate(timestamp)
        ) : (
          <TimeAgo date={timestamp} formatter={timestampFormatter} />
        )}
      </p>
    </Tooltip>
  )

  return (
    <div className="relative flex grow flex-row items-end justify-between">
      <ButtonLink
        className="!p-0 !pr-28 !ring-0"
        containerClassName="grow"
        href={getDaoPath(dao)}
        loadingVariant="pulse"
        noRounding
        variant="ghost"
      >
        <div className="flex min-w-0 grow flex-col gap-1 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-row items-start gap-2">
            <ChainProvider chainId={chainId}>
              <EntityDisplay
                address={dao}
                imageSize={32}
                noCopy
                noLink
                noUnderline
                textClassName="self-start"
              />
            </ChainProvider>

            {!compact && timestampDisplay}
          </div>

          <p className="secondary-text ml-10 -mt-3 break-words text-text-tertiary">
            {t('info.addedToDaoFollowPrompt')}
          </p>

          {compact && <div className="ml-10">{timestampDisplay}</div>}
        </div>
      </ButtonLink>

      <div className="absolute top-0 bottom-0 right-12 flex flex-row items-center">
        <Button
          disabled={updatingFollowing}
          loading={updatingFollowing && loadingFollowing}
          onClick={(e) => {
            e.stopPropagation()
            setLoadingFollowing(true)
            setFollowing(dao).then((success) => {
              if (success) {
                clear()
              }
            })
          }}
          variant="ghost"
        >
          {t('button.follow')}
        </Button>
      </div>
    </div>
  )
}
