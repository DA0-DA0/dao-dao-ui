import { ComponentType } from 'react'

export type InboxSourceItem<Props extends unknown = any> = {
  props: Props
  // If pending, the item will count towards the pending count.
  pending: boolean
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
  pendingItemCount: number
  totalItemCount: number
  refresh: () => void
}

export type InboxApiLoadedItem = {
  id: string
  timestamp: string | undefined
  chainId: string | undefined
  data: unknown
}

// Items from the inbox API.
export type InboxApiItem = {
  id: string
  timestamp: string | undefined
  chainId: string | undefined
} & {
  type: InboxApiItemType.JoinedDao
  data: {
    dao: string
  }
}

export enum InboxApiItemType {
  JoinedDao = 'joined_dao',
}

export enum InboxApiItemTypeMethod {
  Website = 1 << 0,
  Email = 1 << 1,
}

export type InboxApiUpdateConfig = {
  // Update email. If empty or null, remove email.
  email?: string | null
  // Update notification settings per-type.
  types?: Record<string, number | null>
  // If present, verify email.
  verify?: string
  // If present, resend verification email.
  resend?: boolean
}

export type InboxApiConfig = {
  email: string | null
  verified: boolean
  types: Record<string, number | null>
}

export type InboxApi = {
  ready: boolean
  updating: boolean
  clear: (idOrIds: string | string[]) => Promise<boolean>
  loadConfig: () => Promise<boolean>
  updateConfig: (
    data: InboxApiUpdateConfig,
    signatureType?: string
  ) => Promise<boolean>
  resendVerificationEmail: () => Promise<boolean>
  verify: (code: string) => Promise<boolean>
  config: InboxApiConfig | undefined
}
