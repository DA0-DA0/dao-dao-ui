import { ComponentType, ReactNode } from 'react'
import { TFunction } from 'react-i18next'

import { PolytoneProxies } from './dao'

export type StatefulCommandModalProps = {
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
        Icon: ComponentType<{ className: string }>
      }
  )

export type CommandModalContextSection<ExtraItemProperties extends {} = {}> = {
  name: string
  items: CommandModalContextSectionItem<ExtraItemProperties>[]
  onChoose: (item: CommandModalContextSectionItem<ExtraItemProperties>) => void
  // If present, will be used to order sections before sorting by search field.
  // For example: following DAOs should always appear above searched DAOs. If
  // not present, will be after those with an order set. Ascending by order, so
  // lowest orders first. This only applies when a search is being applied.
  // Otherwise, the section order is used.
  searchOrder?: number
  loading?: boolean
}

export type CommandModalContextUseSectionsOptions = {
  filter: string
}

export type CommandModalContextUseSections = (
  options: CommandModalContextUseSectionsOptions
) => CommandModalContextSection[]

export type CommandModalContext = {
  useSections: CommandModalContextUseSections
  name: string
  imageUrl?: string
  // If defined, will wrap the context with this component around where
  // `useSections` will be called.
  Wrapper?: CommandModalContextWrapper
}

export type CommandModalContextWrapper = ComponentType<{ children: ReactNode }>

export type CommandModalContextMakerOptions<MakerOptions extends {} = {}> =
  MakerOptions & {
    t: TFunction
    openContext: (context: CommandModalContext) => void
  }

export type CommandModalContextMaker<MakerOptions extends {} = {}> = (
  options: CommandModalContextMakerOptions<MakerOptions>
) => CommandModalContext

export type CommandModalDaoInfo = {
  chainId: string
  coreAddress: string
  name: string
  imageUrl: string
  polytoneProxies: PolytoneProxies
}
