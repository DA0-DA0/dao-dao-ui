import { ComponentType } from 'react'

export type InboxSourceItem<Props extends unknown = any> = {
  props: Props
  order?: number
}

export type InboxSourceDaoWithItems<Props extends unknown = any> = {
  coreAddress: string
  items: InboxSourceItem<Props>[]
}

export type InboxSourceData<Props extends unknown = any> = {
  loading: boolean
  refreshing: boolean
  daosWithItems: InboxSourceDaoWithItems<Props>[]
  refresh: () => void
}

export type InboxSource<Props extends unknown = any> = {
  id: string
  Renderer: ComponentType<Props>
  useData: () => InboxSourceData<Props>
}

export type InboxItem<Props extends unknown = any> = InboxSourceItem<Props> & {
  Renderer: ComponentType<Props>
}

export type InboxDaoWithItems = {
  dao: {
    coreAddress: string
    name: string
    imageUrl: string
  }
  items: InboxItem[]
}

export type InboxState = {
  loading: boolean
  refreshing: boolean
  daosWithItems: InboxDaoWithItems[]
  itemCount: number
  refresh: () => void
}
