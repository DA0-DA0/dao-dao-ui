import { ComponentType } from 'react'

import { ActionCategoryMaker, ActionComponentProps } from './actions'

export enum WidgetLocation {
  // Widget is displayed on the homepage (the first tab).
  Home = 'home',
  // Widget is displayed in its own tab. `Icon` must be provided as well.
  Tab = 'tab',
}

export enum WidgetVisibilityContext {
  // Widget is always visible.
  Always = 'always',
  // Widget is visible only for members.
  OnlyMembers = 'onlyMembers',
  // Widget is visible only for non-members. This is also visible when no wallet
  // is connected, as the user is not known to be a member.
  OnlyNonMembers = 'onlyNonMembers',
}

export type WidgetRendererProps<Variables extends Record<string, unknown>> = {
  variables: Variables
}

export type WidgetEditorProps<Variables extends Record<string, unknown> = any> =
  ActionComponentProps<undefined, Variables>

export type Widget<Variables extends Record<string, unknown> = any> = {
  // A unique identifier for the widget.
  id: string
  // An icon for the widget. Used when `location` is `WidgetLocation.Tab`.
  Icon?: ComponentType<{ className: string }>
  // The location where the widget is displayed.
  location: WidgetLocation
  // The context in which the widget is visible.
  visibilityContext: WidgetVisibilityContext
  // The default values for the widget's variables.
  defaultValues?: Variables
  // Component that renders the widget.
  Renderer: ComponentType<WidgetRendererProps<Variables>>
  // Component that allows the user to edit the widget's variables in an action.
  Editor: ComponentType<WidgetEditorProps<Variables>>
  // Actions that are available in proposals when this widget is enabled.
  getActionCategoryMakers?: (variables: Variables) => ActionCategoryMaker[]
}

// DaoWidget is the structure of a widget as stored in the DAO's core item map
// as a JSON-encoded object. It stores the unique identifier of the widget and
// the values for the widget's variables so that it can be rendered.
export type DaoWidget = {
  id: string
  values?: Record<string, unknown>
}
