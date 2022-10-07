import { ComponentType, ReactNode } from 'react'
import { TFunction } from 'react-i18next'

export interface CommandModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  contexts: CommandModalContext[]
  goBack: () => void
  filter: string
  setFilter: (filter: string) => void
  children: ReactNode
}

export type CommandModalContextSectionItem<T extends {} = {}> = T & {
  name: string
  disabled?: boolean
} & (
    | {
        imageUrl: string
        Icon?: never
      }
    | {
        imageUrl?: never
        Icon: ComponentType<{ className?: string }>
      }
  )

export interface CommandModalContextSection<T extends {} = {}> {
  name: string
  items: CommandModalContextSectionItem<T>[]
  onChoose: (item: CommandModalContextSectionItem<T>) => void
}

export interface CommandModalContextUseSectionsOptions {
  filter: string
}

export type CommandModalContextUseSections = (
  options: CommandModalContextUseSectionsOptions
) => CommandModalContextSection[]

export interface CommandModalContext {
  useSections: CommandModalContextUseSections
  name: string
  imageUrl?: string
}

export type CommandModalContextMakerOptions<MakerOptions extends {} = {}> =
  MakerOptions & {
    // router: NextRouter
    t: TFunction
    // daos: CommandModalDaoInfo[]
    addContext: (context: CommandModalContext) => void
  }

export type CommandModalContextMaker<MakerOptions extends {} = {}> = (
  options: CommandModalContextMakerOptions<MakerOptions>
) => CommandModalContext

export interface CommandModalDaoInfo {
  coreAddress: string
  name: string
  imageUrl: string
}
