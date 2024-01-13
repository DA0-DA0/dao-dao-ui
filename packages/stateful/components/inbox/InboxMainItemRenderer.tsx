import { CloseSharp, RemoveSharp } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButton, Tooltip, WarningCard } from '@dao-dao/stateless'
import {
  InboxItemRendererProps,
  InboxItemType,
  InboxMainItemRendererProps,
} from '@dao-dao/types'

import { useInboxApi } from '../../hooks'
import { JoinedDaoRenderer, ProposalRenderer } from './renderers'

export const InboxMainItemRenderer = ({
  item,
  checked,
  onCheck,
}: InboxMainItemRendererProps) => {
  const { t } = useTranslation()
  const { clear: _clear } = useInboxApi()
  const clear = useCallback(() => _clear(item.id), [_clear, item.id])

  const Renderer = ITEM_RENDERER_MAP[item.type]

  return Renderer ? (
    <div
      className={clsx(
        'flex flex-row items-stretch transition-opacity',
        checked && 'opacity-30'
      )}
    >
      <div className="flex grow flex-row items-stretch">
        <Renderer clear={clear} data={item.data} item={item} />
      </div>

      <Tooltip
        title={
          checked ? t('button.keepNotification') : t('button.clearNotification')
        }
      >
        <div className="shrink-0 border-l border-border-secondary">
          <IconButton
            Icon={checked ? RemoveSharp : CloseSharp}
            className="!h-full !w-10"
            iconClassName="!h-5 !w-5"
            noRounding
            onClick={() => onCheck(item.id)}
            size="custom"
            variant="ghost"
          />
        </div>
      </Tooltip>
    </div>
  ) : (
    <WarningCard content={t('error.unknownInboxType')} />
  )
}

// TODO: combine these into standard shape, with optional extra buttons
const ITEM_RENDERER_MAP: Partial<
  Record<InboxItemType, ComponentType<InboxItemRendererProps<any>>>
> = {
  [InboxItemType.JoinedDao]: JoinedDaoRenderer,
  [InboxItemType.ProposalCreated]: ProposalRenderer,
  [InboxItemType.ProposalExecuted]: ProposalRenderer,
  [InboxItemType.ProposalClosed]: ProposalRenderer,
  [InboxItemType.PendingProposalCreated]: ProposalRenderer,
  [InboxItemType.PendingProposalRejected]: ProposalRenderer,
}
