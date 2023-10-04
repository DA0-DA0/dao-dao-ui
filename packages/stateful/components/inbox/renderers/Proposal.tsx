import { Done } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
  IconButton,
  Tooltip,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  InboxItemRendererProps,
  InboxItemType,
  InboxItemTypeProposalCreatedData,
} from '@dao-dao/types'
import { formatDateTimeTz, formatLongDateTime } from '@dao-dao/utils'

import { EntityDisplay } from '../../EntityDisplay'
import { LinkWrapper } from '../../LinkWrapper'

export const ProposalRenderer = ({
  item,
  data: { chainId, dao, proposalId, proposalTitle },
  clear,
}: InboxItemRendererProps<InboxItemTypeProposalCreatedData>) => {
  const { t } = useTranslation()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const timestamp = item.timestamp && new Date(item.timestamp)

  const status =
    item.type === InboxItemType.ProposalCreated
      ? t('title.created')
      : item.type === InboxItemType.ProposalExecuted
      ? item.data.failed
        ? t('proposalStatusTitle.execution_failed')
        : t('proposalStatusTitle.executed')
      : item.type === InboxItemType.ProposalClosed
      ? t('proposalStatusTitle.closed')
      : undefined

  return (
    <ChainProvider chainId={chainId}>
      <div className="flex flex-row items-stretch gap-1">
        <LinkWrapper
          className="block cursor-pointer rounded-md bg-background-secondary transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed"
          containerClassName="grow"
          href={getDaoProposalPath(dao, proposalId)}
        >
          {/* Desktop */}
          <div className="hidden flex-row items-end justify-between gap-6 p-4 md:flex">
            <div className="flex flex-col gap-2">
              <EntityDisplay address={dao} />

              <p className="body-text ml-8 break-words">
                {proposalId + ': ' + proposalTitle}
              </p>
            </div>

            {timestamp && (
              <p className="secondary-text break-words text-right">
                {status && `${status} @ `}
                {formatLongDateTime(timestamp)}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div className="flex flex-col justify-between gap-2 rounded-md p-4 text-sm md:hidden">
            <EntityDisplay address={dao} />

            <p className="body-text ml-8 break-words">
              {proposalId + ': ' + proposalTitle}
            </p>

            {timestamp && (
              <p className="secondary-text ml-8 break-words">
                {status && `${status} @ `}
                {formatDateTimeTz(timestamp)}
              </p>
            )}
          </div>
        </LinkWrapper>

        <Tooltip title={t('button.clearNotification')}>
          <div>
            <IconButton
              Icon={Done}
              className="!h-full"
              onClick={clear}
              size="sm"
              variant="ghost"
            />
          </div>
        </Tooltip>
      </div>
    </ChainProvider>
  )
}
