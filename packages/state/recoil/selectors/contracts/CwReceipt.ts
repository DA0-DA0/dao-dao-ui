import { selectorFamily } from 'recoil'

import { CwReceiptClient as ExecuteClient } from '../../../contracts/CwReceipt'
import { signingCosmWasmClientAtom } from '../../atoms'

export type ExecuteClientParams = {
  contractAddress: string
  sender: string
}

export const executeClient = selectorFamily<
  ExecuteClient | undefined,
  ExecuteClientParams
>({
  key: 'cwReceiptExecuteClient',
  get:
    ({ contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom)
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})
