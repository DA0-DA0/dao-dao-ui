import { ComponentType } from 'react'

import { DaoDropdownInfo } from './stateless'

export type InboxItem<T extends unknown = any> = {
  Renderer: ComponentType<T>
  props: T
  order?: number
}

export type InboxDao = Omit<DaoDropdownInfo, 'content' | 'subdaos'>

export interface InboxDaoWithItems {
  dao: InboxDao
  items: InboxItem[]
}

export interface InboxState {
  loading: boolean
  refreshing: boolean
  daosWithItems: InboxDaoWithItems[]
  itemCount: number
  refresh: () => void
}
