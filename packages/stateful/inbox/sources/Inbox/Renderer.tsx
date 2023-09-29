import { ComponentType, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { WarningCard } from '@dao-dao/stateless'
import { InboxApiItem, InboxApiItemType } from '@dao-dao/types'

import { useInboxApi } from '../../../hooks'
import { JoinedDaoRenderer, ProposalRenderer } from './renderers'
import { RendererProps } from './types'

export const Renderer = (item: InboxApiItem) => {
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
  Record<InboxApiItemType, ComponentType<RendererProps<any>>>
> = {
  [InboxApiItemType.JoinedDao]: JoinedDaoRenderer,
  [InboxApiItemType.ProposalCreated]: ProposalRenderer,
  [InboxApiItemType.ProposalExecuted]: ProposalRenderer,
  [InboxApiItemType.ProposalClosed]: ProposalRenderer,
}
