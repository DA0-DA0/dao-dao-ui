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
  tooltip?: string
  className?: string
  disabled?: boolean
  loading?: boolean
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
  // If present, will be used to order sections before sorting by search field.
  // For example: following DAOs should always appear above searched DAOs. If
  // not present, will be after those with an order set. Ascending by order, so
  // lowest orders first. This only applies when a search is being applied.
  // Otherwise, the section order is used.
  searchOrder?: number
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
  chainId: string | undefined
  coreAddress: string
  name: string
  imageUrl: string
}
