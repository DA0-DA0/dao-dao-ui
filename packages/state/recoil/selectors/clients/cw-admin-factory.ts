import { selectorFamily } from 'recoil'

import { CwAdminFactoryClient as ExecuteClient } from '../../../clients/cw-admin-factory'
import { signingCosmWasmClientAtom } from '../../atoms'

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
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})
