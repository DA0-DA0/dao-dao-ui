import { ComponentType } from 'react'

export enum WidgetVisibilityContext {
  // Widget is always visible.
  Always = 'always',
  // Widget is visible only for members.
  OnlyMembers = 'onlyMembers',
  // Widget is visible only for non-members. This is also visible when no wallet
  // is connected, as the user is not known to be a member.
  OnlyNonMembers = 'onlyNonMembers',
}

export type WidgetComponentProps<Variables extends Record<string, unknown>> = {
  variables: Variables
}

export type Widget<Variables extends Record<string, unknown> = any> = {
  // A unique identifier for the widget.
  id: string
  // The context in which the widget is visible.
  visibilityContext: WidgetVisibilityContext
  // The default values for the widget's variables.
  defaultValues?: Variables
  // The component that renders the widget.
  Component: ComponentType<WidgetComponentProps<Variables>>
}

// DaoWidget is the structure of a widget as stored in the DAO's core item map
// as a JSON-encoded object. It stores the unique identifier of the widget and
// the values for the widget's variables so that it can be rendered.
export type DaoWidget = {
  id: string
  values?: Record<string, unknown>
}

// DaoWidgets is the entire structure of the JSON-encoded object stored in the
// DAO's core item map. It is an array of DaoWidget objects.
export type DaoWidgets = {
  widgets: DaoWidget[]
}
