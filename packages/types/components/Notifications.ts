import { ComponentType } from 'react'

import { InboxApiWithUi, InboxMainItemRendererProps } from '../inbox'

export type NotificationsProps = {
  /**
   * The inbox API UI information from the `useInboxApiWithUi` hook.
   */
  inbox: InboxApiWithUi
  /**
   * The stateful inbox item renderer component.
   */
  InboxMainItemRenderer: ComponentType<InboxMainItemRendererProps>
  /**
   * Optionally style things a bit more compact. Used in the popup.
   */
  compact?: boolean
  /**
   * An optional class name to apply to the container.
   */
  className?: string
}
