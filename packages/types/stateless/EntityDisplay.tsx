import { DaoInfo } from '../dao'
import { LoadingData } from './common'

export enum EntityType {
  Dao = 'dao',
  Wallet = 'wallet',
  // native chain module
  Module = 'module',
}

// DAO or wallet representation.
export type Entity = {
  chainId: string
  address: string
  name: string | null
  imageUrl: string
} & (
  | {
      type: EntityType.Wallet
    }
  | {
      type: EntityType.Module
    }
  | {
      type: EntityType.Dao
      daoInfo: DaoInfo
      // If loaded from a DAO's Polytone proxy, this will be set.
      polytoneProxy?: {
        chainId: string
        address: string
      }
    }
)

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
  noLink?: boolean
  openInNewTab?: boolean
}

export type StatefulEntityDisplayProps = Omit<
  EntityDisplayProps,
  'loadingEntity'
>
