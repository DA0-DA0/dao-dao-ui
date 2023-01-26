/* eslint-disable react-hooks/rules-of-hooks */

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { Cw721BaseClient as ExecuteClient } from '@dao-dao/state/contracts/Cw721Base'
import {
  ExecuteClientParams,
  executeClient,
} from '@dao-dao/state/recoil/selectors/contracts/Cw721Base'
import { FunctionKeyOf } from '@dao-dao/types'

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

export const useTransferNft = wrapExecuteHook('transferNft')
export const useSendNft = wrapExecuteHook('sendNft')
export const useSendNftMultiple = wrapExecuteHook('sendNftMultiple')
export const useApprove = wrapExecuteHook('approve')
export const useRevoke = wrapExecuteHook('revoke')
export const useApproveAll = wrapExecuteHook('approveAll')
export const useRevokeAll = wrapExecuteHook('revokeAll')
export const useMint = wrapExecuteHook('mint')
export const useBurn = wrapExecuteHook('burn')
