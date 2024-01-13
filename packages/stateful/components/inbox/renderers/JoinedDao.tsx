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
}: InboxItemRendererProps<InboxItemTypeJoinedDaoData>) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()
  const { setFollowing, updatingFollowing } = useFollowingDaos(chainId)

  const timestampFormatter = useTranslatedTimeDeltaFormatter({
    words: false,
  })

  const [loadingFollowing, setLoadingFollowing] = useState(false)

  const timestamp = item.timestamp && new Date(item.timestamp)

  return (
    <div className="flex grow flex-row items-end justify-between">
      <ButtonLink
        className="!p-0 !ring-0"
        containerClassName="grow"
        href={getDaoPath(dao)}
        loadingVariant="pulse"
        noRounding
        variant="ghost"
      >
        <div className="flex grow flex-col gap-2 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-row items-start gap-1">
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

            {timestamp && (
              <Tooltip title={formatDateTimeTz(timestamp)}>
                <p className="legend-text mt-0.5 inline-block text-text-quaternary">
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  {'• '}
                  {timestamp <
                  new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) ? (
                    formatDate(timestamp)
                  ) : (
                    <TimeAgo date={timestamp} formatter={timestampFormatter} />
                  )}
                </p>
              </Tooltip>
            )}
          </div>

          <p className="secondary-text ml-10 -mt-4 break-words text-text-tertiary">
            {t('info.addedToDaoFollowPrompt')}
          </p>
        </div>
      </ButtonLink>

      <Button
        center
        className="h-full shrink-0 border-l border-border-secondary !px-4 !ring-0"
        disabled={updatingFollowing}
        loading={updatingFollowing && loadingFollowing}
        loadingVariant="pulse"
        noRounding
        onClick={() => {
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
  )
}
