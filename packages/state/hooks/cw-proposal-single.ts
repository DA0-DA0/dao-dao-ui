/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from 'react'

import { useRecoilValue } from 'recoil'

import { Client as ExecuteClient } from '../clients/cw-proposal-single'
import {
  executeClient,
  ExecuteClientParams,
} from '../recoil/selectors/clients/cw-proposal-single'

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

export const usePropose = wrapExecuteHook('propose')
export const useCastVote = wrapExecuteHook('castVote')
export const useExecute = wrapExecuteHook('execute')
export const useClose = wrapExecuteHook('close')
export const useUpdateConfig = wrapExecuteHook('updateConfig')
export const useAddProposalHook = wrapExecuteHook('addProposalHook')
export const useRemoveProposalHook = wrapExecuteHook('removeProposalHook')
export const useAddVoteHook = wrapExecuteHook('addVoteHook')
export const useRemoveVoteHook = wrapExecuteHook('removeVoteHook')
