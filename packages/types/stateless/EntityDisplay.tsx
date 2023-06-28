import { LoadingData } from './common'

export enum EntityType {
  Dao = 'dao',
  Wallet = 'wallet',
}

// DAO or wallet representation.
export type Entity = {
  type: EntityType
  address: string
  name: string | null
  imageUrl: string
}

export type EntityDisplayProps = {
  address: string
  loadingEntity: LoadingData<Entity>
  imageSize?: number
  hideImage?: boolean
  size?: 'default' | 'lg'
  className?: string
  textClassName?: string
  noCopy?: boolean
  noUnderline?: boolean
  showFullAddress?: boolean
}

export type StatefulEntityDisplayProps = Omit<
  EntityDisplayProps,
  'loadingEntity'
>
