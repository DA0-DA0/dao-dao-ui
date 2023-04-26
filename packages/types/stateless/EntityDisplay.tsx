import { LoadingData } from './common'
import { CopyToClipboardProps } from './CopyToClipboard'

export enum EntityType {
  Dao = 'dao',
  Wallet = 'wallet',
}

// DAO or wallet representation.
export interface Entity {
  type: EntityType
  address: string
  name: string | null
  imageUrl: string
}

export interface EntityDisplayProps {
  address: string
  loadingEntity: LoadingData<Entity>
  imageSize?: number
  hideImage?: boolean
  copyToClipboardProps?: Partial<Omit<CopyToClipboardProps, 'label' | 'value'>>
  size?: 'default' | 'lg'
  className?: string
  noImageTooltip?: boolean
  noCopy?: boolean
}

export type StatefulEntityDisplayProps = Omit<
  EntityDisplayProps,
  'loadingEntity'
>
