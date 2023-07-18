/* eslint-disable react-hooks/rules-of-hooks */

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { WyndexMultiHopClient as ExecuteClient } from '@dao-dao/state/contracts/WyndexMultiHop'
import {
  ExecuteClientParams,
  executeClient,
} from '@dao-dao/state/recoil/selectors/contracts/WyndexMultiHop'
import { useChain } from '@dao-dao/stateless'
import { FunctionKeyOf } from '@dao-dao/types'

// This hook wrapper lets us easily make hooks out of all execution functions on
// the contract clients, without having to fetch the `executeClient` selector as
// a loadable and add `useCallback` hooks in all the components.
const wrapExecuteHook =
  <T extends FunctionKeyOf<ExecuteClient>>(fn: T) =>
  (params: Omit<ExecuteClientParams, 'chainId'>) => {
    const { chain_id: chainId } = useChain()
    const clientLoadable = useRecoilValueLoadable(
      executeClient({
        ...params,
        chainId,
      })
    )
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

export const useExecuteSwapOperations = wrapExecuteHook('executeSwapOperations')
