import {
  DeliverTxResponse,
  instantiate2Address,
} from '@cosmjs/cosmwasm-stargate'
import { fromHex, toUtf8 } from '@cosmjs/encoding'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { codeDetailsSelector } from '@dao-dao/state/recoil'
import { useCachedLoadingWithError } from '@dao-dao/stateless'
import { Coin, UnifiedCosmosMsg, cwMsgToEncodeObject } from '@dao-dao/types'
import {
  CHAIN_GAS_MULTIPLIER,
  isSecretNetwork,
  makeWasmMessage,
} from '@dao-dao/utils'

import { useWallet } from './useWallet'

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
  chainId: string | undefined,
  codeId: number
): UseInstantiateAndExecuteResult => {
  const { t } = useTranslation()
  const { getSigningClient, address, chain } = useWallet({
    chainId,
  })

  // Load checksum of the contract code.
  const checksum = useCachedLoadingWithError(
    chainId
      ? codeDetailsSelector({
          chainId,
          codeId,
        })
      : undefined,
    (data) => fromHex(data.checksum)
  )

  const instantiateAndExecute: InstantiateAndExecute = useCallback(
    async ({ instantiate, executes }) => {
      if (checksum.loading || checksum.errored) {
        throw new Error(t('error.loadingData'))
      }

      if (!address || !chain) {
        throw new Error(t('error.logInToContinue'))
      }

      // Ensure active chain is not Secret Network.
      if (isSecretNetwork(chain.chain_id)) {
        throw new Error('Secret Network does not support instantiate2.')
      }

      // Random salt.
      const salt = uuidv4()

      const contractAddress = instantiate2Address(
        checksum.data,
        address,
        toUtf8(salt),
        chain.bech32_prefix
      )
      const messages: UnifiedCosmosMsg[] = [
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

      const signingClient = await getSigningClient()
      const response = (await signingClient.signAndBroadcast(
        address,
        messages.map((msg) =>
          cwMsgToEncodeObject(chain.chain_id, msg, address)
        ),
        CHAIN_GAS_MULTIPLIER
        // cosmos-kit has an older version of the package. This is a workaround.
      )) as DeliverTxResponse

      return {
        contractAddress,
        response,
      }
    },
    [address, chain, checksum, codeId, getSigningClient, t]
  )

  return {
    ready: !checksum.loading && !checksum.errored && !!address,
    instantiateAndExecute,
  }
}
