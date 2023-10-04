import { ComponentType, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { WarningCard } from '@dao-dao/stateless'
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
    <Renderer clear={clear} data={item.data} item={item} />
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
