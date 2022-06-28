import { selectorFamily } from 'recoil'

import { CwAdminFactoryClient as ExecuteClient } from '../../../clients/cw-admin-factory'
import { signingCosmWasmClientSelector } from '../chain'

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  ExecuteClient | undefined,
  ExecuteClientParams
>({
  key: 'cwAdminFactoryExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientSelector)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})
