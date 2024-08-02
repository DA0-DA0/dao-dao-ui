import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'

import { CwVestingClient } from '../../../contracts/CwVesting'
import { signingCosmWasmClientAtom } from '../../atoms'

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  CwVestingClient | undefined,
  ExecuteClientParams
>({
  key: 'cwVestingExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return
      return new CwVestingClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})
