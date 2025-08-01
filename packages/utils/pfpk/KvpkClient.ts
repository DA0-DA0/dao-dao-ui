import { KVPK_API_BASE } from '../constants'
import { PfpkClient, PfpkClientOptions } from './PfpkClient'

export type KvpkClientOptions = Pick<
  PfpkClientOptions,
  'getOfflineSignerAmino' | 'urlPrefix'
>

export class KvpkClient extends PfpkClient {
  constructor(options: KvpkClientOptions) {
    super({
      // Default signature type for KVPK.
      defaultSignatureType: 'KVPK',

      ...options,
      urlPrefix: KVPK_API_BASE,
    })
  }
}
