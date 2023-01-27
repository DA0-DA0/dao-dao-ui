import { ComponentType } from 'react'

export type WidgetComponentProps<Variables extends Record<string, unknown>> = {
  variables: Variables
}

export type Widget<Variables extends Record<string, unknown> = any> = {
  id: string
  defaultValues?: Variables
  Component: ComponentType<WidgetComponentProps<Variables>>
}

export type DaoWidget = {
  id: string
  values?: Record<string, unknown>
}

export type DaoWidgets = {
  widgets: DaoWidget[]
}
