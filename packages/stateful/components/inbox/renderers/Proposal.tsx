import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  ChainProvider,
  Tooltip,
  useDaoNavHelpers,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import {
  InboxItemRendererProps,
  InboxItemType,
  InboxItemTypeProposalCreatedData,
} from '@dao-dao/types'
import { formatDate, formatDateTimeTz } from '@dao-dao/utils'

import { ButtonLink } from '../../ButtonLink'
import { EntityDisplay } from '../../EntityDisplay'

export const ProposalRenderer = ({
  item,
  data: { chainId, dao, proposalId, proposalTitle },
}: InboxItemRendererProps<InboxItemTypeProposalCreatedData>) => {
  const { t } = useTranslation()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const timestampFormatter = useTranslatedTimeDeltaFormatter({
    words: false,
  })

  const timestamp = item.timestamp && new Date(item.timestamp)

  const status =
    item.type === InboxItemType.ProposalCreated ||
    item.type === InboxItemType.PendingProposalCreated
      ? t('title.created')
      : item.type === InboxItemType.ProposalExecuted
      ? item.data.failed
        ? t('proposalStatusTitle.execution_failed')
        : t('proposalStatusTitle.executed')
      : item.type === InboxItemType.ProposalClosed
      ? t('proposalStatusTitle.closed')
      : item.type === InboxItemType.PendingProposalRejected
      ? t('proposalStatusTitle.rejected')
      : undefined

  return (
    <ButtonLink
      className="!p-0 !pr-16 !ring-0"
      containerClassName="grow"
      href={getDaoProposalPath(dao, proposalId)}
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
                {timestamp < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) ? (
                  formatDate(timestamp)
                ) : (
                  <TimeAgo date={timestamp} formatter={timestampFormatter} />
                )}
              </p>
            </Tooltip>
          )}
        </div>

        <p className="secondary-text ml-10 -mt-4 break-words text-text-tertiary">
          {(status ? status + ' ' : '') + proposalId + ': ' + proposalTitle}
        </p>
      </div>
    </ButtonLink>
  )
}
