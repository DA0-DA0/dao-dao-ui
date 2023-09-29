import { ComponentType } from 'react'

export type InboxSourceItem<Props extends unknown = any> = {
  props: Props
  // If pending, the item will count towards the pending count.
  pending: boolean
  order?: number
}

export type InboxSourceDaoWithItems<Data extends unknown = any> = {
  chainId: string
  coreAddress: string
  items: InboxSourceItem<Data>[]
}

export type InboxSourceData<Data extends unknown = any> = {
  loading: boolean
  refreshing: boolean
  daosWithItems: InboxSourceDaoWithItems<Data>[]
  refresh: () => void
}

export type InboxSource<Data extends unknown = any> = {
  id: string
  Renderer: ComponentType<Data>
  useData: () => InboxSourceData<Data>
}

export type InboxItem<Data extends unknown = any> = InboxSourceItem<Data> & {
  Renderer: ComponentType<Data>
}

export type InboxDaoWithItems = {
  dao: {
    chainId: string
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

export enum InboxApiItemType {
  JoinedDao = 'joined_dao',
  ProposalCreated = 'proposal_created',
  ProposalExecuted = 'proposal_executed',
  ProposalClosed = 'proposal_closed',
}

export type InboxApiItemTypeJoinedDaoData = {
  chainId: string
  dao: string
  name: string
  imageUrl: string | undefined
}

export type InboxApiItemTypeProposalCreatedData = {
  chainId: string
  dao: string
  daoName: string
  imageUrl: string | undefined
  proposalId: string
  proposalTitle: string
}

export type InboxApiItemTypeProposalExecutedData =
  InboxApiItemTypeProposalCreatedData & {
    failed: boolean
    // Winning option for a multiple choice proposal.
    winningOption?: string
  }

export type InboxApiItemTypeProposalClosedData =
  InboxApiItemTypeProposalCreatedData

// Items from the inbox API.
export type InboxApiItem = Omit<InboxApiLoadedItem, 'data'> &
  (
    | {
        type: InboxApiItemType.JoinedDao
        data: InboxApiItemTypeJoinedDaoData
      }
    | {
        type: InboxApiItemType.ProposalCreated
        data: InboxApiItemTypeProposalCreatedData
      }
    | {
        type: InboxApiItemType.ProposalExecuted
        data: InboxApiItemTypeProposalExecutedData
      }
    | {
        type: InboxApiItemType.ProposalClosed
        data: InboxApiItemTypeProposalClosedData
      }
  )

export enum InboxApiItemTypeMethod {
  Website = 1 << 0,
  Email = 1 << 1,
  Push = 1 << 2,
}

export type InboxApiItemTypeMethodData = {
  method: InboxApiItemTypeMethod
  i18nKey: string
  Icon: ComponentType<{ className?: string }>
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
  // If present, update push settings.
  push?:
    | {
        // Add subscription.
        type: 'subscribe'
        subscription: any
      }
    | {
        // Check if subscribed or unsubscribe.
        type: 'check' | 'unsubscribe'
        p256dh: string
      }
    | {
        // Unsubscribe all subscriptions.
        type: 'unsubscribe_all'
      }
}

export type PushSubscriptionManager = {
  ready: boolean
  supported: boolean
  updating: boolean
  subscribed: boolean
  subscription: PushSubscription | undefined
  subscribe: () => Promise<void>
  unsubscribe: () => Promise<void>
  unsubscribeAll: () => Promise<void>
}

export type InboxApiConfig = {
  email: string | null
  verified: boolean
  types: Record<string, number | null>
  // Number of registered push subscriptions.
  pushSubscriptions: number
  // If `push` is defined in the body, returns whether or not the push is now
  // subscribed.
  pushSubscribed?: boolean
  // Allowed methods per type.
  typeAllowedMethods: Record<InboxApiItemType, InboxApiItemTypeMethod[]>
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
  push: PushSubscriptionManager
}

export enum InboxPageSlug {
  Settings = 'settings',
  Verify = 'verify',
}
