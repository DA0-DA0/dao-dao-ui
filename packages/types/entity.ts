import { DaoInfo } from './dao'
import { UnifiedProfile } from './profile'

export enum EntityType {
  Dao = 'dao',
  Wallet = 'wallet',
  // native chain module
  Module = 'module',
  // cw1-whitelist with multiple entities inside
  Cw1Whitelist = 'cw1-whitelist',
  // cryptographic multisig with multiple entities inside
  CryptographicMultisig = 'cryptographic-multisig',
}

// Generalizable entity representation.
export type Entity = {
  chainId: string
  address: string
  name: string | null
  imageUrl: string
  /**
   * If loaded from a Polytone proxy, this will be set to the proxy.
   */
  polytoneProxy?: {
    chainId: string
    address: string
  }
} & (
  | {
      type: EntityType.Wallet
      profile?: UnifiedProfile
    }
  | {
      type: EntityType.Module
    }
  | {
      type: EntityType.Dao
      daoInfo: DaoInfo
    }
  | {
      type: EntityType.Cw1Whitelist
      entities: Entity[]
    }
  | {
      type: EntityType.CryptographicMultisig
      entities: Entity[]
    }
)
