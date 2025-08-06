import { HIDDEN_BALANCE_PREFIX } from '../../constants'
import { KvpkClient, KvpkClientOptions } from './KvpkClient'

export type HiddenBalancesKvpkClientOptions = Omit<
  KvpkClientOptions,
  'onProfileUpdated' | 'defaultSignatureType' | 'flattenData' | 'keyPrefix'
>

export class HiddenBalancesKvpkClient extends KvpkClient {
  constructor(options: HiddenBalancesKvpkClientOptions) {
    super({
      ...options,
      defaultSignatureType: 'Update Hidden Balances',
      keyPrefix: HIDDEN_BALANCE_PREFIX,
    })
  }

  async hide(denom: string) {
    await this.set({
      key: denom,
      value: 1,
    })
  }

  async unhide(denom: string) {
    await this.delete({
      key: denom,
    })
  }
}
