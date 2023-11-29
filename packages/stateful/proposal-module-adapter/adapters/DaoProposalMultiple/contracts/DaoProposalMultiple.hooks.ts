/* eslint-disable react-hooks/rules-of-hooks */

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { useChain } from '@dao-dao/stateless'
import { FunctionKeyOf } from '@dao-dao/types'

import { useSyncWalletSigner } from '../../../../hooks'
import { DaoProposalMultipleClient as ExecuteClient } from './DaoProposalMultiple.client'
import {
  ExecuteClientParams,
  executeClient,
} from './DaoProposalMultiple.recoil'

// This hook wrapper lets us easily make hooks out of all execution functions on
// the contract clients, without having to fetch the `executeClient` selector as
// a loadable and add `useCallback` hooks in all the components.
const wrapExecuteHook =
  <T extends FunctionKeyOf<ExecuteClient>>(fn: T) =>
  (params: Omit<ExecuteClientParams, 'chainId'>) => {
    // Make sure we have the signing client for this chain and wallet.
    useSyncWalletSigner()

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
        throw new Error('Wallet signer not set up.')
      },
      [client]
    )
  }

export const usePropose = wrapExecuteHook('propose')
export const useVote = wrapExecuteHook('vote')
export const useExecute = wrapExecuteHook('execute')
export const useVeto = wrapExecuteHook('veto')
export const useClose = wrapExecuteHook('close')
export const useUpdateConfig = wrapExecuteHook('updateConfig')
export const useAddProposalHook = wrapExecuteHook('addProposalHook')
export const useRemoveProposalHook = wrapExecuteHook('removeProposalHook')
export const useAddVoteHook = wrapExecuteHook('addVoteHook')
export const useRemoveVoteHook = wrapExecuteHook('removeVoteHook')
