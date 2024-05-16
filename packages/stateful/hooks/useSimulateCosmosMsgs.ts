import { useCallback } from 'react'
import { constSelector, useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { useChain } from '@dao-dao/stateless'
import {
  UnifiedCosmosMsg,
  cwMsgToEncodeObject,
  typesRegistry,
} from '@dao-dao/types'
import { cosmos } from '@dao-dao/types/protobuf'
import { SignMode } from '@dao-dao/types/protobuf/codegen/cosmos/tx/signing/v1beta1/signing'
import { SimulateRequest } from '@dao-dao/types/protobuf/codegen/cosmos/tx/v1beta1/service'
import {
  AuthInfo,
  Fee,
  Tx,
  TxBody,
} from '@dao-dao/types/protobuf/codegen/cosmos/tx/v1beta1/tx'
import { Any } from '@dao-dao/types/protobuf/codegen/google/protobuf/any'
import {
  cosmosProtoRpcClientRouter,
  decodeMessages,
  decodePolytoneExecuteMsg,
  isValidBech32Address,
} from '@dao-dao/utils'

// TODO(secret): prevent simulating if it contains compute/wasm messages

// Simulate executing Cosmos messages on-chain. We can't just use the simulate
// function on SigningCosmWasmClient or SigningStargateClient because they
// include signer info from the wallet. We may want to simulate these messages
// coming from a DAO, so we don't want wallet signing info included. Those
// simulate functions internally call this function:
// https://github.com/cosmos/cosmjs/blob/2c3b27eeb3622a6108086267ba6faf3984251be3/packages/stargate/src/modules/tx/queries.ts#L47
// We can copy this simulate function and leave out the wallet-specific fields
// (i.e. sequence) and unnecessary fields (i.e. publicKey, memo) to simulate
// these messages from a DAO address.
export const useSimulateCosmosMsgs = (senderAddress: string) => {
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()

  const polytoneProxies = useRecoilValue(
    isValidBech32Address(senderAddress, bech32Prefix)
      ? DaoCoreV2Selectors.polytoneProxiesSelector({
          chainId,
          contractAddress: senderAddress,
        })
      : constSelector(undefined)
  )

  const simulate = useCallback(
    async (msgs: UnifiedCosmosMsg[]): Promise<void> => {
      // If no messages, nothing to simulate.
      if (msgs.length === 0) {
        return
      }

      await doSimulation(chainId, msgs, senderAddress)

      // Also simulate polytone messages on receiving chains.
      const decodedPolytoneMessages = decodeMessages(msgs).flatMap((msg) => {
        const decoded = decodePolytoneExecuteMsg(chainId, msg, 'any')
        return decoded.match && decoded.cosmosMsg ? decoded : []
      })

      if (decodedPolytoneMessages.length) {
        const polytoneGroupedByChainId = decodedPolytoneMessages.reduce(
          (acc, decoded) => ({
            ...acc,
            [decoded.chainId]: [
              ...(acc[decoded.chainId] ?? []),
              ...decoded.cosmosMsgs,
            ],
          }),
          {} as Record<string, UnifiedCosmosMsg[] | undefined>
        )

        await Promise.all(
          Object.entries(polytoneGroupedByChainId).map(
            async ([chainId, msgs]) => {
              const polytoneProxy = (polytoneProxies || {})[chainId]
              if (!polytoneProxy || !msgs?.length) {
                return
              }

              await doSimulation(chainId, msgs, polytoneProxy)
            }
          )
        )
      }

      // Unfortunately we can't simulate messages from an ICA for weird
      // cosmos-sdk reasons... YOLO
    },
    [chainId, polytoneProxies, senderAddress]
  )

  return simulate
}

const doSimulation = async (
  chainId: string,
  msgs: UnifiedCosmosMsg[],
  senderAddress: string
) => {
  const cosmosRpcClient = await cosmosProtoRpcClientRouter.connect(chainId)

  const encodedMsgs = msgs.map((msg) => {
    const encoded = cwMsgToEncodeObject(chainId, msg, senderAddress)
    return typesRegistry.encodeAsAny(encoded)
  })

  // Simulate messages together.
  try {
    await simulateMessages(cosmosRpcClient, encodedMsgs)
  } catch (err) {
    // Simulate messages separately and log any errors, but don't throw them.
    // This helps debug which message is causing an error if they all fail
    // together. But we only care about the result of simulating all messages
    // since they may depend on each other.
    await encodedMsgs.reduce(async (p, encoded) => {
      await p

      console.log('Simulating:', encoded)
      try {
        await simulateMessages(cosmosRpcClient, [encoded])
      } catch (err) {
        console.error(err)
      }
    }, Promise.resolve())

    // Rethrow original error.
    throw err
  }
}

const simulateMessages = async (
  cosmosRpcClient: Awaited<
    ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>
  >['cosmos'],
  messages: Any[]
) => {
  const tx = Tx.fromPartial({
    authInfo: AuthInfo.fromPartial({
      fee: Fee.fromPartial({}),
      signerInfos: [
        // @ts-ignore
        {
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_DIRECT,
            },
          },
        },
      ],
    }),
    body: TxBody.fromPartial({
      messages,
      memo: '',
    }),
    signatures: [new Uint8Array()],
  })

  const request = SimulateRequest.fromPartial({
    txBytes: Tx.encode(tx).finish(),
  })

  await cosmosRpcClient.tx.v1beta1.simulate(request)
}
