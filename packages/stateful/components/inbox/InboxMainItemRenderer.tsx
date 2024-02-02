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
  compact,
}: InboxMainItemRendererProps) => {
  const { t } = useTranslation()
  const { clear: _clear } = useInboxApi()
  const clear = useCallback(() => _clear(item.id), [_clear, item.id])

  const Renderer = ITEM_RENDERER_MAP[item.type]

  return Renderer ? (
    <div
      className={clsx('relative transition-opacity', checked && 'opacity-30')}
    >
      <Renderer
        canCheck={!!onCheck}
        clear={clear}
        compact={compact}
        data={item.data}
        item={item}
      />

      {onCheck && (
        <div
          className="absolute top-0 bottom-0 right-4 flex flex-row items-center"
          onClick={() => onCheck(item.id)}
        >
          <Tooltip
            title={
              checked
                ? t('button.keepNotification')
                : t('button.clearNotification')
            }
          >
            <IconButton
              Icon={checked ? RemoveSharp : CloseSharp}
              onClick={(e) => {
                e.stopPropagation()
                onCheck(item.id)
              }}
              size="sm"
              variant="ghost"
            />
          </Tooltip>
        </div>
      )}
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
