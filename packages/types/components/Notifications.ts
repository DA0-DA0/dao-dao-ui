import { ComponentType } from 'react'

import { InboxMainItemRendererProps } from '../inbox'

export type NotificationsProps = {
  /**
   * Map of item ID to whether or not it is checked for removal.
   */
  checked?: Record<string, boolean>
  /**
   * Function to toggle whether or not an item is checked for removal. If
   * undefined, check button hidden.
   */
  onCheck?: (id: string) => void
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
