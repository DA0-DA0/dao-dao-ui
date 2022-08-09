/* eslint-disable react-hooks/rules-of-hooks */

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { Cw20Client as ExecuteClient } from '../../clients/cw20-base'
import {
  ExecuteClientParams,
  executeClient,
} from '../../recoil/selectors/clients/cw20-base'
import { FunctionKeyOf } from '../../types'

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

export const useTransfer = wrapExecuteHook('transfer')
export const useBurn = wrapExecuteHook('burn')
export const useSend = wrapExecuteHook('send')
export const useIncreaseAllowance = wrapExecuteHook('increaseAllowance')
export const useDecreaseAllowance = wrapExecuteHook('decreaseAllowance')
export const useTransferFrom = wrapExecuteHook('transferFrom')
export const useSendFrom = wrapExecuteHook('sendFrom')
export const useBurnFrom = wrapExecuteHook('burnFrom')
export const useMint = wrapExecuteHook('mint')
export const useUpdateMarketing = wrapExecuteHook('updateMarketing')
export const useUploadLogo = wrapExecuteHook('uploadLogo')
