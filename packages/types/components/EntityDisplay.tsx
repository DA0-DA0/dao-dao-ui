import { DaoInfo } from '../dao'
import { LoadingData } from '../misc'
import { WalletProfile } from '../profile'

export enum EntityType {
  Dao = 'dao',
  Wallet = 'wallet',
  // native chain module
  Module = 'module',
  // cw1-whitelist with multiple entities inside
  Cw1Whitelist = 'cw1-whitelist',
}

// Generalizable entity representation.
export type Entity = {
  chainId: string
  address: string
  name: string | null
  imageUrl: string
} & (
  | {
      type: EntityType.Wallet
      profile?: WalletProfile
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
  | {
      type: EntityType.Cw1Whitelist
      entities: Entity[]
    }
)

export type EntityDisplayProps = {
  address: string
  loadingEntity: LoadingData<Entity>
  imageSize?: number
  hideImage?: boolean
  size?: 'default' | 'lg' | 'custom'
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
> &
  Partial<Pick<EntityDisplayProps, 'loadingEntity'>>
