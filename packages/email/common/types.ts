import { ComponentType } from 'react'

export type EmailRenderer = {
  name: string
  subject: string
  Template: ComponentType
}
