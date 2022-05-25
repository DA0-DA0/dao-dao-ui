/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { validateCwCoreInstantiateMsg } from '@dao-dao/utils'

import { CwCoreClient as ExecuteClient } from '../clients/cw-core'
import {
  executeClient,
  ExecuteClientParams,
} from '../recoil/selectors/clients/cw-core'
import { FunctionKeyOf } from '../types'

const wrapExecuteHook =
  <T extends FunctionKeyOf<ExecuteClient>>(fn: T) =>
  (params: ExecuteClientParams) => {
    const client = useRecoilValue(executeClient(params))

    return useCallback(
      (...args: Parameters<ExecuteClient[T]>) => {
        if (client)
          return (
            client[fn] as (
              ...args: Parameters<ExecuteClient[T]>
            ) => ReturnType<ExecuteClient[T]>
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
  const client = useRecoilValue(
    // contractAddress irrelevant when instantiating a new contract.
    executeClient({ ...params, contractAddress: '' })
  )

  return useCallback(
    (...args: ParametersExceptFirst<ExecuteClient['instantiate']>) => {
      validateCwCoreInstantiateMsg(args[0])

      if (client) return client.instantiate(codeId, ...args)
      throw new Error('Client undefined.')
    },
    [client, codeId]
  )
}
