import { ComponentType } from 'react'

export type FeedSourceItem<Props extends unknown = any> = {
  props: Props
  // If pending, the item will count towards the pending count.
  pending: boolean
  order?: number
}

export type FeedSourceDaoWithItems<Data extends unknown = any> = {
  chainId: string
  coreAddress: string
  items: FeedSourceItem<Data>[]
}

export type FeedSourceData<Data extends unknown = any> = {
  loading: boolean
  refreshing: boolean
  daosWithItems: FeedSourceDaoWithItems<Data>[]
  refresh: () => void
}

export type FeedSource<Data extends unknown = any> = {
  id: string
  Renderer: ComponentType<Data>
  useData: (filter: FeedFilter) => FeedSourceData<Data>
}

export type FeedItem<Data extends unknown = any> = FeedSourceItem<Data> & {
  Renderer: ComponentType<Data>
}

export type FeedDaoWithItems = {
  dao: {
    chainId: string
    coreAddress: string
    name: string
    imageUrl: string
  }
  items: FeedItem[]
}

export type FeedState = {
  loading: boolean
  refreshing: boolean
  daosWithItems: FeedDaoWithItems[]
  pendingItemCount: number
  totalItemCount: number
  refresh: () => void
}

export type FeedFilter = {
  chainId?: string
}
