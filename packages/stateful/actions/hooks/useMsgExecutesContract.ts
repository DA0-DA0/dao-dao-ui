import { constSelector } from 'recoil'

import { isContractSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
import { objectMatchesStructure } from '@dao-dao/utils'

// Returns if the message is a wasm message that executes a specific contract.
// The names are checked against the data stored in contract_info, via the
// indexer's `info` formula, falling back to a contract `info` query.
export const useMsgExecutesContract = (
  msg: Record<string, any>,
  nameOrNames: string | string[],
  chainId?: string
): boolean => {
  const isWasmExecuteMessage = objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {},
      },
    },
  })

  const isContractLoadable = useCachedLoadable(
    isWasmExecuteMessage
      ? isContractSelector({
          contractAddress: msg.wasm.execute.contract_addr,
          chainId,
          ...(typeof nameOrNames === 'string'
            ? {
                name: nameOrNames,
              }
            : {
                names: nameOrNames,
              }),
        })
      : constSelector(false)
  )

  return isContractLoadable.state === 'hasValue' && isContractLoadable.contents
}
