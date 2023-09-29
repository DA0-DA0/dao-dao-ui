import { Clear } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import {
  IconButton,
  ProposalIdDisplay,
  Tooltip,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  InboxApiItemType,
  InboxApiItemTypeProposalCreatedData,
} from '@dao-dao/types'
import { formatDateTimeTz } from '@dao-dao/utils'

import { LinkWrapper } from '../../../../components'
import { RendererProps } from '../types'

export const ProposalRenderer = ({
  item,
  data: { dao, proposalId, proposalTitle },
  clear,
}: RendererProps<InboxApiItemTypeProposalCreatedData>) => {
  const { t } = useTranslation()
  const { getDaoProposalPath } = useDaoNavHelpers()

  const proposalPrefix = proposalId.match(/^[A-Z]+/)?.[0] ?? ''
  const proposalNumber = Number(proposalId.match(/[0-9]+$/)?.[0] || '-1')
  const timestamp = item.timestamp && new Date(item.timestamp)

  const status =
    item.type === InboxApiItemType.ProposalCreated
      ? t('title.created')
      : item.type === InboxApiItemType.ProposalExecuted
      ? item.data.failed
        ? t('proposalStatusTitle.execution_failed')
        : t('proposalStatusTitle.executed')
      : item.type === InboxApiItemType.ProposalClosed
      ? t('proposalStatusTitle.closed')
      : undefined

  // Invalid.
  if (proposalNumber === -1) {
    return null
  }

  return (
    <div className="flex flex-row items-stretch gap-1">
      <LinkWrapper
        className="block cursor-pointer rounded-md bg-background-secondary transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed"
        containerClassName="grow"
        href={getDaoProposalPath(dao, proposalId)}
      >
        {/* Desktop */}
        <div className="hidden h-12 flex-row items-center gap-6 p-3 md:flex">
          <p className="caption-text shrink-0 font-mono">
            <ProposalIdDisplay
              proposalNumber={proposalNumber}
              proposalPrefix={proposalPrefix}
            />
          </p>

          <p className="body-text grow truncate">{proposalTitle}</p>

          {timestamp && (
            <p className="link-text shrink-0 break-words text-right">
              {status && `${status} @ `}
              {formatDateTimeTz(timestamp)}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div className="flex flex-col justify-between gap-2 rounded-md p-4 text-sm md:hidden">
          <div className="flex flex-col gap-1">
            <p className="caption-text font-mono">
              <ProposalIdDisplay
                proposalNumber={proposalNumber}
                proposalPrefix={proposalPrefix}
              />
            </p>

            <p className="body-text mb-3 break-words line-clamp-2">
              {proposalTitle}
            </p>
          </div>

          {timestamp && (
            <p className="link-text break-words">
              {status && `${status} @ `}
              {formatDateTimeTz(timestamp)}
            </p>
          )}
        </div>
      </LinkWrapper>

      <Tooltip title={t('button.clearNotification')}>
        <div>
          <IconButton
            Icon={Clear}
            className="!h-full"
            onClick={clear}
            size="sm"
            variant="ghost"
          />
        </div>
      </Tooltip>
    </div>
  )
}
