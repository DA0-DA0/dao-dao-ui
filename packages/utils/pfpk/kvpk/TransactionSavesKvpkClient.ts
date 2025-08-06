import { ME_SAVED_TX_PREFIX } from '../../constants'
import { KvpkClient, KvpkClientOptions } from './KvpkClient'

export type TransactionSavesKvpkClientOptions = Omit<
  KvpkClientOptions,
  'onProfileUpdated' | 'defaultSignatureType' | 'flattenData' | 'keyPrefix'
>

export class TransactionSavesKvpkClient extends KvpkClient {
  constructor(options: TransactionSavesKvpkClientOptions) {
    super({
      ...options,
      defaultSignatureType: 'Update Transaction Saves',
      keyPrefix: ME_SAVED_TX_PREFIX,
    })
  }
}
