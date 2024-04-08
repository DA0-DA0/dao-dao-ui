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
  ibcAckReceivedSelector,
  ibcUnreceivedAcksSelector,
  ibcUnreceivedPacketsSelector,
  refreshIbcDataAtom,
  refreshPolytoneListenerResultsAtom,
  transactionPacketsSelector,
} from '@dao-dao/state/recoil'
import {
  useCachedLoading,
  useCachedLoadingWithError,
  useDaoInfoContext,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  BaseProposalStatusAndInfoProps,
  CosmosMsgFor_Empty,
  LoadingData,
  ProposalRelayState,
  ProposalStatus,
  ProposalStatusEnum,
} from '@dao-dao/types'
import {
  decodeCrossChainMessages,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

export type UseProposalRelayStateOptions = {
  msgs: CosmosMsgFor_Empty[]
  status: ProposalStatus
  executedAt: Date | undefined
  proposalModuleAddress: string
  proposalNumber: number
  openSelfRelayExecute: BaseProposalStatusAndInfoProps['openSelfRelayExecute']
  loadingTxHash: LoadingData<string | undefined>
}

export type UseProposalRelayStateReturn = LoadingData<ProposalRelayState>

/**
 * This hook uses information about a proposal and produces all the necessary
 * state for the status of polytone message relays. It is used in the
 * `useProposalActionState` hook.
 */
export const useProposalRelayState = ({
  msgs,
  status,
  executedAt,
  proposalModuleAddress,
  proposalNumber,
  openSelfRelayExecute,
  loadingTxHash,
}: UseProposalRelayStateOptions): UseProposalRelayStateReturn => {
  const { coreAddress } = useDaoInfoContext()
  const {
    chain: { chain_id: srcChainId },
  } = useSupportedChainContext()

  const packetsLoadable = useCachedLoadingWithError(
    loadingTxHash.loading || !loadingTxHash.data
      ? constSelector(undefined)
      : transactionPacketsSelector({
          chainId: srcChainId,
          txHash: loadingTxHash.data,
        })
  )

  // Decoded cross-chain execute messages.
  const { crossChainMessages, dstChainIds } = useMemo(() => {
    const crossChainMessages = decodeCrossChainMessages(
      srcChainId,
      coreAddress,
      msgs
    )

    const dstChainIds = uniq(
      crossChainMessages.map(({ data: { chainId } }) => chainId)
    )

    return {
      crossChainMessages,
      dstChainIds,
    }
  }, [msgs, srcChainId, coreAddress])

  // Get unreceived packets and acks.
  const unreceivedPackets = useCachedLoading(
    packetsLoadable.loading || packetsLoadable.errored
      ? undefined
      : waitForAll(
          crossChainMessages.map(({ data: { chainId }, srcPort, dstPort }) => {
            const packetsToCommit = (packetsLoadable.data || []).filter(
              (packet) =>
                packet.sourcePort === srcPort &&
                packet.destinationPort === dstPort
            )

            return waitForAll(
              packetsToCommit.map((packet) =>
                ibcUnreceivedPacketsSelector({
                  chainId,
                  portId: dstPort,
                  channelId: packet.destinationChannel,
                  packetCommitmentSequences: [Number(packet.sequence)],
                })
              )
            )
          })
        ),
    []
  )
  const unreceivedAcks = useCachedLoading(
    packetsLoadable.loading || packetsLoadable.errored
      ? undefined
      : waitForAll(
          crossChainMessages.map(({ srcPort, dstPort }) => {
            const packetsToAck = (packetsLoadable.data || []).filter(
              (packet) =>
                packet.sourcePort === srcPort &&
                packet.destinationPort === dstPort
            )

            return waitForAll(
              packetsToAck.map((packet) =>
                ibcUnreceivedAcksSelector({
                  chainId: srcChainId,
                  portId: srcPort,
                  channelId: packet.sourceChannel,
                  packetAckSequences: [Number(packet.sequence)],
                })
              )
            )
          })
        ),
    []
  )
  const acksReceived = useCachedLoading(
    packetsLoadable.loading || packetsLoadable.errored
      ? undefined
      : waitForAll(
          crossChainMessages.map(({ data: { chainId }, srcPort, dstPort }) => {
            const packetsToAck = (packetsLoadable.data || []).filter(
              (packet) =>
                packet.sourcePort === srcPort &&
                packet.destinationPort === dstPort
            )

            return waitForAll(
              packetsToAck.map((packet) =>
                ibcAckReceivedSelector({
                  chainId,
                  portId: dstPort,
                  channelId: packet.destinationChannel,
                  sequence: Number(packet.sequence),
                })
              )
            )
          })
        ),
    []
  )

  // Polytone relay results.
  const polytoneRelayResults = useCachedLoading(
    waitForAllSettled(
      crossChainMessages.map((decoded) =>
        decoded.type === 'polytone'
          ? PolytoneListenerSelectors.resultSelector({
              chainId: srcChainId,
              contractAddress: decoded.data.polytoneConnection.listener,
              params: [
                {
                  initiator: coreAddress,
                  initiatorMsg: decoded.data.initiatorMsg,
                },
              ],
            })
          : constSelector(undefined)
      )
    ),
    []
  )

  // Get unrelayed and timed-out messages.
  const { relayedMsgs, unrelayedMsgs, timedOutMsgs } = useMemo(() => {
    const crossChainMessageStatuses =
      packetsLoadable.loading ||
      packetsLoadable.errored ||
      unreceivedPackets.loading ||
      unreceivedAcks.loading ||
      acksReceived.loading ||
      polytoneRelayResults.loading
        ? []
        : crossChainMessages.flatMap((decoded, index) => {
            if (decoded.type === 'polytone') {
              const result = polytoneRelayResults.data[index]

              return {
                msg: decoded,
                status:
                  result.state === 'hasError' &&
                  result.contents instanceof Error &&
                  result.contents.message.includes(
                    'polytone::callbacks::CallbackMessage not found'
                  )
                    ? 'unrelayed'
                    : result.state === 'hasValue'
                    ? objectMatchesStructure(result.contents, {
                        callback: {
                          result: {
                            execute: {
                              Ok: {},
                            },
                          },
                        },
                      })
                      ? 'relayed'
                      : objectMatchesStructure(result.contents, {
                          callback: {
                            result: {
                              execute: {
                                Err: {},
                              },
                            },
                          },
                        }) &&
                        (result.contents?.callback.result as any).execute
                          .Err === 'timeout'
                      ? 'timedOut'
                      : ''
                    : '',
              }
            }

            if (decoded.type === 'ica') {
              // Get latest timeout of packets from this source.
              const latestPacketTimeout = Math.max(
                0,
                ...(packetsLoadable.data || [])
                  .filter((packet) => packet.sourcePort === decoded.srcPort)
                  .map((packet) => Number(packet.timeoutTimestamp))
              )

              return {
                msg: decoded,
                status:
                  acksReceived.data[index]?.length &&
                  acksReceived.data[index].every(Boolean)
                    ? 'relayed'
                    : unreceivedPackets.data[index]?.length &&
                      unreceivedPackets.data[index].some(Boolean)
                    ? Date.now() > Number(latestPacketTimeout) / 1e6
                      ? 'timedOut'
                      : 'unrelayed'
                    : unreceivedAcks.data[index]?.length &&
                      unreceivedAcks.data[index].some(Boolean)
                    ? 'unrelayed'
                    : // If could not find ack or packet, assume unrelayed.
                      'unrelayed',
              }
            }

            return []
          })

    return {
      relayedMsgs: crossChainMessageStatuses.flatMap(({ msg, status }) =>
        status === 'relayed' ? msg : []
      ),
      unrelayedMsgs: crossChainMessageStatuses.flatMap(({ msg, status }) =>
        status === 'unrelayed' ? msg : []
      ),
      timedOutMsgs: crossChainMessageStatuses.flatMap(({ msg, status }) =>
        status === 'timedOut' ? msg : []
      ),
    }
  }, [
    unreceivedPackets,
    unreceivedAcks,
    acksReceived,
    polytoneRelayResults,
    crossChainMessages,
    packetsLoadable,
  ])

  // Refresh every 10 seconds while anything is unrelayed.
  const refreshIbcData = useRecoilCallback(
    ({ set }) =>
      () => {
        set(refreshIbcDataAtom(srcChainId), (id) => id + 1)
        dstChainIds.forEach((chainId) =>
          set(refreshIbcDataAtom(chainId), (id) => id + 1)
        )
        set(refreshPolytoneListenerResultsAtom, (id) => id + 1)
      },
    useDeepCompareMemoize([srcChainId, dstChainIds])
  )
  const anyUnrelayed = unrelayedMsgs.length > 0
  useEffect(() => {
    if (!anyUnrelayed) {
      return
    }

    const interval = setInterval(refreshIbcData, 10 * 1000)
    return () => clearInterval(interval)
  }, [anyUnrelayed, refreshIbcData])

  const executedOverFiveMinutesAgo =
    status === ProposalStatusEnum.Executed &&
    executedAt !== undefined &&
    // If executed over 5 minutes ago...
    Date.now() - executedAt.getTime() > 5 * 60 * 1000
  const messagesNeedingSelfRelay =
    unreceivedPackets.loading ||
    unreceivedAcks.loading ||
    acksReceived.loading ||
    polytoneRelayResults.loading
      ? undefined
      : crossChainMessages.filter(
          (decoded) =>
            // Not yet relayed.
            unrelayedMsgs.includes(decoded) &&
            // Executed a few minutes ago and still has not been relayed, or the
            // Polytone connection needs self-relay.
            (executedOverFiveMinutesAgo ||
              (decoded.type === 'polytone' &&
                !!decoded.data.polytoneConnection.needsSelfRelay))
        )
  const hasCrossChainMessagesNeedingSelfRelay =
    !!messagesNeedingSelfRelay?.length

  const openSelfRelay = (transactionHash?: string) =>
    hasCrossChainMessagesNeedingSelfRelay &&
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
      crossChainMessages: messagesNeedingSelfRelay,
      chainIds: uniq(
        messagesNeedingSelfRelay.map(({ data: { chainId } }) => chainId)
      ),
    })

  return unreceivedPackets.loading ||
    unreceivedAcks.loading ||
    acksReceived.loading ||
    polytoneRelayResults.loading ||
    packetsLoadable.loading
    ? {
        loading: true,
      }
    : {
        loading: false,
        data: {
          hasCrossChainMessages: crossChainMessages.length > 0,
          relayedMsgs,
          unrelayedMsgs,
          timedOutMsgs,
          needsSelfRelay: hasCrossChainMessagesNeedingSelfRelay,
          openSelfRelay: () =>
            status === ProposalStatusEnum.Executed && !loadingTxHash.loading
              ? openSelfRelay(loadingTxHash.data)
              : openSelfRelay(),
        },
      }
}
