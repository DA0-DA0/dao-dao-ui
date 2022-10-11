import { ComponentType } from 'react'
import { TFunction } from 'react-i18next'

export interface CommandModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  // Root context maker can take no extra options.
  makeRootContext: CommandModalContextMaker
}

export type CommandModalContextSectionItem<
  ExtraItemProperties extends {} = {}
> = ExtraItemProperties & {
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

export interface CommandModalContextSection<
  ExtraItemProperties extends {} = {}
> {
  name: string
  items: CommandModalContextSectionItem<ExtraItemProperties>[]
  onChoose: (item: CommandModalContextSectionItem<ExtraItemProperties>) => void
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
    t: TFunction
    openContext: (context: CommandModalContext) => void
  }

export type CommandModalContextMaker<MakerOptions extends {} = {}> = (
  options: CommandModalContextMakerOptions<MakerOptions>
) => CommandModalContext

export interface CommandModalDaoInfo {
  coreAddress: string
  name: string
  imageUrl: string
}
