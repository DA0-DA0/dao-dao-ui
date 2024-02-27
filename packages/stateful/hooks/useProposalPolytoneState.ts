import { parsePacketsFromTendermintEvents } from '@confio/relayer/build/lib/utils'
import uniq from 'lodash.uniq'
import { useEffect, useMemo } from 'react'
import {
  constSelector,
  useRecoilCallback,
  waitForAll,
  waitForAllSettled,
} from 'recoil'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import {
  PolytoneListenerSelectors,
  ibcUnreceivedAcksSelector,
  ibcUnreceivedPacketsSelector,
  refreshPolytoneListenerResultsAtom,
  refreshUnreceivedIbcDataAtom,
  transactionSelector,
} from '@dao-dao/state/recoil'
import {
  useCachedLoading,
  useDaoInfoContext,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  BaseProposalStatusAndInfoProps,
  CosmosMsgFor_Empty,
  LoadingData,
  ProposalPolytoneState,
  ProposalStatus,
  ProposalStatusEnum,
} from '@dao-dao/types'
import {
  decodeMessage,
  decodePolytoneExecuteMsg,
  makeWasmMessage,
} from '@dao-dao/utils'

export type UseProposalPolytoneStateOptions = {
  msgs: CosmosMsgFor_Empty[]
  status: ProposalStatus
  executedAt: Date | undefined
  proposalModuleAddress: string
  proposalNumber: number
  openSelfRelayExecute: BaseProposalStatusAndInfoProps['openSelfRelayExecute']
  loadingTxHash: LoadingData<string | undefined>
}

export type UseProposalPolytoneStateReturn = LoadingData<ProposalPolytoneState>

/**
 * This hook uses information about a proposal and produces all the necessary
 * state for the status of polytone message relays. It is used in the
 * `useProposalActionState` hook.
 */
export const useProposalPolytoneState = ({
  msgs,
  status,
  executedAt,
  proposalModuleAddress,
  proposalNumber,
  openSelfRelayExecute,
  loadingTxHash,
}: UseProposalPolytoneStateOptions): UseProposalPolytoneStateReturn => {
  const { coreAddress } = useDaoInfoContext()
  const {
    chain: { chain_id: srcChainId },
    config: { polytone },
  } = useSupportedChainContext()

  const txLoadable = useCachedLoading(
    loadingTxHash.loading || !loadingTxHash.data
      ? constSelector(undefined)
      : transactionSelector({
          chainId: srcChainId,
          txHash: loadingTxHash.data,
        }),
    undefined
  )
  // Parse the packets from the execution TX events.
  const packets =
    !txLoadable.loading && txLoadable.data
      ? parsePacketsFromTendermintEvents(txLoadable.data.events).map(
          (packet) => packet
        )
      : []

  // Decoded polytone execute messages.
  const polytoneMessages = useMemo(
    () =>
      msgs
        .map((msg) =>
          decodePolytoneExecuteMsg(srcChainId, decodeMessage(msg), 'oneOrZero')
        )
        .flatMap((decoded) => (decoded.match ? [decoded] : [])),
    [srcChainId, msgs]
  )

  // Get unreceived packets and acks.
  const dstChainIds = uniq(polytoneMessages.map(({ chainId }) => chainId))
  const unreceivedPackets = useCachedLoading(
    waitForAll(
      dstChainIds.map((dstChainId) => {
        const portId = `wasm.${polytone![dstChainId]!.voice}`
        const channelId = polytone![dstChainId]!.remoteChannel
        // Get packets that are going to this chain's polytone connection.
        const packetCommitmentSequences = packets
          .filter(
            (packet) =>
              packet.destinationPort === portId &&
              packet.destinationChannel === channelId
          )
          .map((packet) => Number(packet.sequence))

        return ibcUnreceivedPacketsSelector({
          chainId: dstChainId,
          portId,
          channelId,
          packetCommitmentSequences,
        })
      })
    ),
    []
  )
  const unreceivedAcks = useCachedLoading(
    waitForAll(
      dstChainIds.map((dstChainId) => {
        const portId = `wasm.${polytone![dstChainId]!.note}`
        const channelId = polytone![dstChainId]!.localChannel
        // Get packets that are coming from this chain's polytone connection.
        const packetAckSequences = packets
          .filter(
            (packet) =>
              packet.sourcePort === portId && packet.sourceChannel === channelId
          )
          .map((packet) => Number(packet.sequence))

        return ibcUnreceivedAcksSelector({
          chainId: srcChainId,
          portId,
          channelId,
          packetAckSequences,
        })
      })
    ),
    []
  )

  // Callback results.
  const polytoneResults = useCachedLoading(
    waitForAllSettled(
      polytoneMessages.map(
        ({ polytoneConnection: { listener }, initiatorMsg }) =>
          PolytoneListenerSelectors.resultSelector({
            chainId: srcChainId,
            contractAddress: listener,
            params: [
              {
                initiator: coreAddress,
                initiatorMsg,
              },
            ],
          })
      )
    ),
    []
  )

  // If any packets or acks are not received, or any callbacks failed to load,
  // refresh the data.
  const anyUnrelayed =
    (!unreceivedPackets.loading && unreceivedPackets.data.flat().length > 0) ||
    (!unreceivedAcks.loading && unreceivedAcks.data.flat().length > 0) ||
    (!polytoneResults.loading &&
      polytoneResults.data.some(({ state }) => state === 'hasError'))

  // Refresh every 10 seconds while anything is unrelayed.
  const refreshUnreceivedIbcData = useRecoilCallback(
    ({ set }) =>
      () => {
        set(refreshUnreceivedIbcDataAtom(srcChainId), (id) => id + 1)
        dstChainIds.forEach((chainId) =>
          set(refreshUnreceivedIbcDataAtom(chainId), (id) => id + 1)
        )
        set(refreshPolytoneListenerResultsAtom, (id) => id + 1)
      },
    useDeepCompareMemoize([srcChainId, dstChainIds])
  )
  useEffect(() => {
    if (!anyUnrelayed) {
      return
    }

    const interval = setInterval(refreshUnreceivedIbcData, 10 * 1000)
    return () => clearInterval(interval)
  }, [anyUnrelayed, refreshUnreceivedIbcData])

  const executedOverFiveMinutesAgo =
    status === ProposalStatusEnum.Executed &&
    executedAt !== undefined &&
    // If executed over 5 minutes ago...
    Date.now() - executedAt.getTime() > 5 * 60 * 1000
  const polytoneMessagesNeedingSelfRelay = polytoneResults.loading
    ? undefined
    : polytoneMessages.filter(
        ({ polytoneConnection: { needsSelfRelay } }, index) =>
          // Needs self-relay or does not need self-relay but was executed a few
          // minutes ago and still has not been relayed.
          (!!needsSelfRelay || executedOverFiveMinutesAgo) &&
          // Not yet relayed.
          polytoneResults.data[index].state === 'hasError' &&
          polytoneResults.data[index].errorOrThrow() instanceof Error &&
          (
            polytoneResults.data[index].errorOrThrow() as Error
          ).message.includes('polytone::callbacks::CallbackMessage not found')
      )
  const hasPolytoneMessagesNeedingSelfRelay =
    !!polytoneMessagesNeedingSelfRelay?.length

  const openPolytoneRelay = (transactionHash?: string) =>
    hasPolytoneMessagesNeedingSelfRelay &&
    openSelfRelayExecute({
      uniqueId: `${srcChainId}:${proposalModuleAddress}:${proposalNumber}`,
      transaction: transactionHash
        ? {
            type: 'exists',
            hash: transactionHash,
          }
        : {
            type: 'execute',
            msgs: [
              makeWasmMessage({
                wasm: {
                  execute: {
                    contract_addr: proposalModuleAddress,
                    funds: [],
                    msg: {
                      execute: {
                        proposal_id: proposalNumber,
                      },
                    },
                  },
                },
              }),
            ],
          },
      chainIds: uniq(
        polytoneMessagesNeedingSelfRelay.map(({ chainId }) => chainId)
      ),
    })

  return unreceivedPackets.loading ||
    unreceivedAcks.loading ||
    polytoneResults.loading ||
    txLoadable.loading
    ? {
        loading: true,
      }
    : {
        loading: false,
        data: {
          hasPolytoneMessages: polytoneMessages.length > 0,
          anyUnrelayed,
          needsSelfRelay: hasPolytoneMessagesNeedingSelfRelay,
          openPolytoneRelay: () =>
            status === ProposalStatusEnum.Executed && !loadingTxHash.loading
              ? openPolytoneRelay(loadingTxHash.data)
              : openPolytoneRelay(),
        },
      }
}
