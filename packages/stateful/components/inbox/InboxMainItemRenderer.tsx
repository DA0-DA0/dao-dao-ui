import { CloseSharp, RemoveSharp } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButton, Loader, Tooltip, WarningCard } from '@dao-dao/stateless'
import {
  InboxItemRendererProps,
  InboxItemType,
  InboxMainItemRendererProps,
} from '@dao-dao/types'

import { useInboxApi } from '../../hooks'
import { SuspenseLoader } from '../SuspenseLoader'
import { JoinedDaoRenderer, ProposalRenderer } from './renderers'

export const InboxMainItemRenderer = ({
  item,
  checked,
  onCheck,
  compact,
}: InboxMainItemRendererProps) => {
  const { t } = useTranslation()
  const { clear: _clear } = useInboxApi()
  const clear = useCallback(() => _clear([item]), [_clear, item])

  const Renderer = ITEM_RENDERER_MAP[item.type]

  return Renderer ? (
    <div
      className={clsx('relative transition-opacity', checked && 'opacity-30')}
    >
      <SuspenseLoader fallback={<Loader />}>
        <Renderer
          clear={clear}
          compact={compact}
          data={item.data}
          item={item}
        />
      </SuspenseLoader>

      <div
        className="absolute top-0 bottom-0 right-4 flex flex-row items-center"
        onClick={() => onCheck(item)}
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
              onCheck(item)
            }}
            size="sm"
            variant="ghost"
          />
        </Tooltip>
      </div>
    </div>
  ) : (
    <WarningCard content={t('error.unknownInboxType')} />
  )
}

// TODO(inbox): combine these into standard shape, with optional extra buttons.
// also add generic fallback with clear button
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
