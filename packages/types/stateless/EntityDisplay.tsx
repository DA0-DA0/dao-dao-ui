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
> & {
  // Allow specifying public key to speed up loading. Just providing an address
  // requires a chain query to fetch the public key. If we know the entity is a
  // wallet and have its public key, we can skip the chain query.
  walletHexPublicKey?: string
}
