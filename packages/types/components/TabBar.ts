import { ComponentType } from 'react'

export type TabBarProps = {
  /**
   * Tabs.
   */
  tabs: TabBarTab[]
  /**
   * Selected tab ID.
   */
  selectedTabId: string
  /**
   * Callback when tab is selected.
   */
  onSelect: (id: string) => void
  /**
   * Optional class name.
   */
  className?: string
}

export type TabBarTab = {
  /**
   * Unique identifier.
   */
  id: string
  /**
   * Tab label.
   */
  label: string
  /**
   * Optional tab icon.
   */
  Icon?: ComponentType<{ className: string }>
}
