import { Done } from '@mui/icons-material'
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

export const InboxMainItemRenderer = ({ item }: InboxMainItemRendererProps) => {
  const { t } = useTranslation()
  const { clear: _clear } = useInboxApi()
  const clear = useCallback(() => _clear(item.id), [_clear, item.id])

  const Renderer = ITEM_RENDERER_MAP[item.type]

  return Renderer ? (
    <div className="flex flex-row items-stretch gap-1">
      <div className="grow">
        <Renderer clear={clear} data={item.data} item={item} />
      </div>

      <Tooltip title={t('button.clearNotification')}>
        <div className="shrink-0">
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
  ) : (
    <WarningCard content={t('error.unknownInboxType')} />
  )
}

const ITEM_RENDERER_MAP: Partial<
  Record<InboxItemType, ComponentType<InboxItemRendererProps<any>>>
> = {
  [InboxItemType.JoinedDao]: JoinedDaoRenderer,
  [InboxItemType.ProposalCreated]: ProposalRenderer,
  [InboxItemType.ProposalExecuted]: ProposalRenderer,
  [InboxItemType.ProposalClosed]: ProposalRenderer,
}
