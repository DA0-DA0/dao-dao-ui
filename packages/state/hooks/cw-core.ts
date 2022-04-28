/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

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

export const useExecuteProposalHook = wrapExecuteHook('executeProposalHook')
export const useUpdateConfig = wrapExecuteHook('updateConfig')
export const useUpdateVotingModule = wrapExecuteHook('updateVotingModule')
export const useUpdateProposalModules = wrapExecuteHook('updateProposalModules')
export const useSetItem = wrapExecuteHook('setItem')
export const useRemoveItem = wrapExecuteHook('removeItem')
export const useReceive = wrapExecuteHook('receive')
export const useReceiveNft = wrapExecuteHook('receiveNft')
export const useUpdateCw20List = wrapExecuteHook('updateCw20List')
export const useUpdateCw721List = wrapExecuteHook('updateCw721List')
