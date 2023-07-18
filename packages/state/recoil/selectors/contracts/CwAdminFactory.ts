import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'

import { CwAdminFactoryClient as ExecuteClient } from '../../../contracts/CwAdminFactory'
import { signingCosmWasmClientAtom } from '../../atoms'

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  ExecuteClient | undefined,
  ExecuteClientParams
>({
  key: 'cwAdminFactoryExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})
