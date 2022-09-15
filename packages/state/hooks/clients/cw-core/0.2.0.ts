/* eslint-disable react-hooks/rules-of-hooks */

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { validateCwCoreInstantiateMsg } from '@dao-dao/utils'

import { CwCoreV0_2_0Client as ExecuteClient } from '../../../clients/cw-core/0.2.0'
import {
  ExecuteClientParams,
  executeClient,
} from '../../../recoil/selectors/clients/cw-core/0.2.0'
import { FunctionKeyOf } from '../../../types'

// This hook wrapper lets us easily make hooks out of all execution functions on
// the contract clients, without having to fetch the `executeClient` selector as
// a loadable and add `useCallback` hooks in all the components.
const wrapExecuteHook =
  <T extends FunctionKeyOf<ExecuteClient>>(fn: T) =>
  (params: ExecuteClientParams) => {
    const clientLoadable = useRecoilValueLoadable(executeClient(params))
    const client =
      clientLoadable.state === 'hasValue' ? clientLoadable.contents : undefined

    return useCallback(
      (...args: Parameters<ExecuteClient[T]>) => {
        if (client)
          return (
            client[fn] as (
              ...args: Parameters<ExecuteClient[T]>
            ) => Promise<ExecuteResult>
          )(...args)
        throw new Error('Client undefined.')
      },
      [client]
    )
  }

export const useExecuteAdminMsgs = wrapExecuteHook('executeAdminMsgs')
export const useExecuteProposalHook = wrapExecuteHook('executeProposalHook')
export const usePause = wrapExecuteHook('pause')
export const useUpdateAdmin = wrapExecuteHook('updateAdmin')
export const useUpdateConfig = wrapExecuteHook('updateConfig')
export const useUpdateVotingModule = wrapExecuteHook('updateVotingModule')
export const useUpdateProposalModules = wrapExecuteHook('updateProposalModules')
export const useSetItem = wrapExecuteHook('setItem')
export const useRemoveItem = wrapExecuteHook('removeItem')
export const useReceive = wrapExecuteHook('receive')
export const useReceiveNft = wrapExecuteHook('receiveNft')
export const useUpdateCw20List = wrapExecuteHook('updateCw20List')
export const useUpdateCw721List = wrapExecuteHook('updateCw721List')

type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer R) => any
  ? R
  : never
interface UseInstantiateParams
  extends Omit<ExecuteClientParams, 'contractAddress'> {
  codeId: number
}
export const useInstantiate = ({ codeId, ...params }: UseInstantiateParams) => {
  const clientLoadable = useRecoilValueLoadable(
    // contractAddress irrelevant when instantiating a new contract.
    executeClient({ ...params, contractAddress: '' })
  )
  const client =
    clientLoadable.state === 'hasValue' ? clientLoadable.contents : undefined

  return useCallback(
    (...args: ParametersExceptFirst<ExecuteClient['instantiate']>) => {
      validateCwCoreInstantiateMsg(args[0])

      if (client) return client.instantiate(codeId, ...args)
      throw new Error('Client undefined.')
    },
    [client, codeId]
  )
}
