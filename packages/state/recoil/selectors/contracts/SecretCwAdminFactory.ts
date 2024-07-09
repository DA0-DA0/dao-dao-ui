import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'

import { SecretCwAdminFactoryClient as ExecuteClient } from '../../../contracts/SecretCwAdminFactory'
import { signingCosmWasmClientAtom } from '../../atoms'

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  ExecuteClient | undefined,
  ExecuteClientParams
>({
  key: 'secretCwAdminFactoryExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return

      return new ExecuteClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})
