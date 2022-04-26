/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { Cw20Client as ExecuteClient } from '../clients/cw20-base'
import {
  executeClient,
  ExecuteClientParams,
} from '../recoil/selectors/clients/cw20-base'
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
