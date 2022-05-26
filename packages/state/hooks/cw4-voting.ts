/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { Cw4VotingClient as ExecuteClient } from '../clients/cw4-voting'
import {
  executeClient,
  ExecuteClientParams,
} from '../recoil/selectors/clients/cw4-voting'
import { FunctionKeyOf } from '../types'

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
            ) => ReturnType<ExecuteClient[T]>
          )(...args)
        throw new Error('Client undefined.')
      },
      [client]
    )
  }

export const useMemberChangedHook = wrapExecuteHook('memberChangedHook')
