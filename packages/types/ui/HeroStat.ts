import { ComponentType } from 'react'

export interface HeroStatProps {
  Icon: ComponentType<{ className?: string }>
  title: string
  value: string | undefined
}
