import {
  DeliverTxResponse,
  instantiate2Address,
} from '@cosmjs/cosmwasm-stargate'
import { fromHex, toUtf8 } from '@cosmjs/encoding'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { codeDetailsSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
import { Coin, CosmosMsgFor_Empty } from '@dao-dao/types'
import { cwMsgToEncodeObject, makeWasmMessage } from '@dao-dao/utils'

export type InstantiateAndExecuteOptions = {
  // Instantiate message to send to the contract.
  instantiate: {
    admin?: string | null
    funds: Coin[]
    label: string
    msg: Record<string, any>
  }
  // Wasm execute messages to execute on the contract.
  executes: {
    funds: Coin[]
    msg: Record<string, any>
  }[]
}

export type InstantiateAndExecute = ({
  instantiate,
  executes,
}: InstantiateAndExecuteOptions) => Promise<{
  // The address of the contract that was instantiated.
  contractAddress: string
  // The transaction hash of the transaction.
  response: DeliverTxResponse
}>

export type UseInstantiateAndExecuteResult = {
  ready: boolean
  instantiateAndExecute: InstantiateAndExecute
}

// This hook allows you to instantiate a contract and execute messages on it in
// a single transaction by taking advantage of `instantiate2` which can
// precompute contract addresses.
export const useInstantiateAndExecute = (
  codeId: number
): UseInstantiateAndExecuteResult => {
  const { t } = useTranslation()
  const { signingCosmWasmClient, address, chainInfo } = useWallet()

  // Load checksum of the contract code.
  const codeDetailsLoadable = useCachedLoadable(
    codeDetailsSelector({
      codeId,
    })
  )

  const instantiateAndExecute: InstantiateAndExecute = useCallback(
    async ({ instantiate, executes }) => {
      if (codeDetailsLoadable.state !== 'hasValue') {
        throw new Error(t('error.loadingData'))
      }

      if (!signingCosmWasmClient || !address || !chainInfo) {
        throw new Error(t('error.logInToContinue'))
      }

      // Get the checksum of the contract code.
      const checksum = fromHex(codeDetailsLoadable.contents.checksum)
      // Random salt.
      const salt = uuidv4()

      const contractAddress = instantiate2Address(
        checksum,
        address,
        toUtf8(salt),
        chainInfo.bech32Config.bech32PrefixAccAddr
      )
      const messages: CosmosMsgFor_Empty[] = [
        // Instantiate the contract.
        makeWasmMessage({
          wasm: {
            instantiate2: {
              ...instantiate,
              code_id: codeId,
              salt,
              fix_msg: false,
            },
          },
        }),
        // Execute messages on the contract.
        ...executes.map((execute) =>
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: contractAddress,
                ...execute,
              },
            },
          })
        ),
      ]

      const response = await signingCosmWasmClient.signAndBroadcast(
        address,
        messages.map((msg) => cwMsgToEncodeObject(msg, address)),
        'auto'
      )

      return {
        contractAddress,
        response,
      }
    },
    [address, chainInfo, codeDetailsLoadable, codeId, signingCosmWasmClient, t]
  )

  return {
    ready: codeDetailsLoadable.state === 'hasValue' && !!address,
    instantiateAndExecute,
  }
}
