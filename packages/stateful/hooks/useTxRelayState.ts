import { queryOptions, useQueries } from '@tanstack/react-query'
import uniq from 'lodash.uniq'
import { nanoid } from 'nanoid'
import { useEffect, useMemo } from 'react'
import {
  constSelector,
  useRecoilCallback,
  waitForAll,
  waitForAllSettled,
} from 'recoil'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import { chainQueries } from '@dao-dao/state/query'
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
  useDao,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  BaseProposalStatusAndInfoProps,
  ChainId,
  CrossChainPacketInfoState,
  CrossChainPacketInfoStatus,
  LoadingData,
  LoadingDataWithError,
  SelfRelayExecuteModalProps,
  TxRelayState,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import { ExecutionResponse } from '@dao-dao/types/contracts/PolytoneListener'
import {
  decodeCrossChainMessages,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

export type UseTxRelayStateOptions = {
  msgs: UnifiedCosmosMsg[]
  context:
    | {
        type: 'proposal'
        proposalModuleAddress: string
        proposalNumber: number
        executed: boolean
        /**
         * Undefined if not executed or not yet loaded.
         */
        executedAt: Date | undefined
      }
    | {
        type: 'dao_initial_actions'
        coreAddress: string
        /**
         * Undefined if not yet loaded.
         */
        executedAt: Date | undefined
      }
  openSelfRelayExecute: BaseProposalStatusAndInfoProps['openSelfRelayExecute']
  loadingTxHash: LoadingDataWithError<string | null>
}

export type UseTxRelayStateReturn = LoadingData<TxRelayState>

/**
 * This hook uses information about cross-chain messages (like from a proposal)
 * and produces all the necessary state for the status of relays. It is used in
 * the `useProposalActionState` hook.
 */
export const useTxRelayState = ({
  msgs,
  context,
  openSelfRelayExecute,
  loadingTxHash,
}: UseTxRelayStateOptions): UseTxRelayStateReturn => {
  const { coreAddress } = useDao()
  const {
    chain: { chainId: srcChainId },
  } = useSupportedChainContext()

  /**
   * Whether or not the messages have been executed.
   */
  const executed =
    context.type === 'dao_initial_actions' ||
    (context.type === 'proposal' && context.executed)

  const packetsLoadable = useCachedLoadingWithError(
    loadingTxHash.loading || loadingTxHash.errored || !loadingTxHash.data
      ? constSelector(undefined)
      : transactionPacketsSelector({
          chainId: srcChainId,
          txHash: loadingTxHash.data,
        })
  )

  // Decoded cross-chain execute messages.
  const { crossChainPackets, dstChainIds } = useMemo(() => {
    const crossChainPackets = decodeCrossChainMessages(
      srcChainId,
      coreAddress,
      msgs
    ).map((packet) => ({
      uuid: nanoid(),
      ...packet,
    }))

    const dstChainIds = uniq(
      crossChainPackets.map(({ data: { chainId } }) => chainId)
    )

    return {
      crossChainPackets,
      dstChainIds,
    }
  }, [msgs, srcChainId, coreAddress])

  // Get unreceived packets and acks.
  const unreceivedPackets = useCachedLoading(
    packetsLoadable.loading || packetsLoadable.errored
      ? undefined
      : waitForAll(
          crossChainPackets.map(({ data: { chainId }, srcPort, dstPort }) => {
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
          crossChainPackets.map(({ srcPort, dstPort }) => {
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
          crossChainPackets.map(({ data: { chainId }, srcPort, dstPort }) => {
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
  const relayedTxHashes = useQueries({
    queries:
      packetsLoadable.loading || packetsLoadable.errored
        ? []
        : crossChainPackets.map(
            ({ uuid, data: { chainId }, srcPort, dstPort }) => {
              const packets = (packetsLoadable.data || []).filter(
                (packet) =>
                  packet.sourcePort === srcPort &&
                  packet.destinationPort === dstPort
              )

              return queryOptions({
                queryKey: [
                  'txRelayState',
                  'relayedTxHashes',
                  {
                    srcChainId,
                    srcPort,
                    dstChainId: chainId,
                    dstPort,
                    packets: packets.length,
                  },
                ],
                queryFn: async (ctx) => ({
                  uuid,
                  hashes: uniq(
                    (
                      await Promise.all(
                        packets.map(
                          ({ sourceChannel, destinationChannel, sequence }) =>
                            ctx.client.fetchQuery(
                              chainQueries.relayedCrossChainPacketTxHash({
                                srcPort,
                                srcChannel: sourceChannel,
                                dstChainId: chainId,
                                dstPort,
                                dstChannel: destinationChannel,
                                packetSequence: sequence.toString(),
                              })
                            )
                        )
                      )
                    ).flatMap((h) => h || [])
                  ),
                }),
              })
            }
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
      errorIf: 'all',
    }),
  })

  // Polytone relay results.
  const polytoneRelayResults = useCachedLoading(
    waitForAllSettled(
      crossChainPackets.map((decoded) =>
        decoded.type === 'polytone'
          ? PolytoneListenerSelectors.resultSelector({
              chainId: srcChainId,
              contractAddress: decoded.data.polytoneConnection.listener,
              params: [
                {
                  initiator: decoded.sender,
                  initiatorMsg: decoded.data.initiatorMsg,
                },
              ],
            })
          : constSelector(undefined)
      )
    ),
    []
  )

  // Get packet states.
  const states = useMemo((): TxRelayState['states'] => {
    const packetStates =
      packetsLoadable.loading ||
      packetsLoadable.errored ||
      unreceivedPackets.loading ||
      unreceivedAcks.loading ||
      acksReceived.loading ||
      polytoneRelayResults.loading
        ? []
        : crossChainPackets.flatMap(
            (packet, index): CrossChainPacketInfoState | [] => {
              if (packet.type === 'polytone') {
                const result = polytoneRelayResults.data[index]

                return result.state === 'hasError' &&
                  result.contents instanceof Error &&
                  result.contents.message.includes(
                    'polytone::callbacks::CallbackMessage not found'
                  )
                  ? {
                      packet,
                      status: CrossChainPacketInfoStatus.Pending,
                    }
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
                      ? {
                          packet,
                          status: CrossChainPacketInfoStatus.Relayed,
                          txHashes:
                            (!relayedTxHashes.loading &&
                              !relayedTxHashes.errored &&
                              relayedTxHashes.data.find(
                                (r) => r.uuid === packet.uuid
                              )?.hashes) ||
                            undefined,
                          msgResponses: (
                            (result.contents as any)!.callback.result.execute
                              .Ok as ExecutionResponse
                          ).result.map(({ events }) => ({ events })),
                        }
                      : objectMatchesStructure(result.contents, {
                            callback: {
                              result: {
                                execute: {
                                  Err: {},
                                },
                              },
                            },
                          })
                        ? (result.contents?.callback.result as any).execute
                            .Err === 'timeout'
                          ? {
                              packet,
                              status: CrossChainPacketInfoStatus.TimedOut,
                            }
                          : {
                              packet,
                              status: CrossChainPacketInfoStatus.Errored,
                              error: (result.contents as any).callback.result
                                .execute.Err,
                            }
                        : objectMatchesStructure(result.contents, {
                              callback: {
                                result: {
                                  fatal_error: {},
                                },
                              },
                            })
                          ? {
                              packet,
                              status: CrossChainPacketInfoStatus.Errored,
                              error: (result.contents as any).callback.result
                                .fatal_error,
                            }
                          : []
                    : []
              }

              if (packet.type === 'ica') {
                // Get latest timeout of packets from this source.
                const latestPacketTimeout = Math.max(
                  0,
                  ...(packetsLoadable.data || [])
                    .filter((p) => p.sourcePort === packet.srcPort)
                    .map((p) => Number(p.timeoutTimestamp))
                )

                return acksReceived.data[index]?.length &&
                  acksReceived.data[index].every(Boolean)
                  ? {
                      packet,
                      status: CrossChainPacketInfoStatus.Relayed,
                      txHashes:
                        (!relayedTxHashes.loading &&
                          !relayedTxHashes.errored &&
                          relayedTxHashes.data.find(
                            (r) => r.uuid === packet.uuid
                          )?.hashes) ||
                        undefined,
                      // Cannot reliably fetch message events from ICA yet.
                      msgResponses: [],
                    }
                  : unreceivedPackets.data[index]?.length &&
                      unreceivedPackets.data[index].some(Boolean)
                    ? Date.now() > Number(latestPacketTimeout) / 1e6
                      ? {
                          packet,
                          status: CrossChainPacketInfoStatus.TimedOut,
                        }
                      : {
                          packet,
                          status: CrossChainPacketInfoStatus.Pending,
                        }
                    : unreceivedAcks.data[index]?.length &&
                        unreceivedAcks.data[index].some(Boolean)
                      ? {
                          packet,
                          status: CrossChainPacketInfoStatus.Pending,
                        }
                      : // If could not find ack or packet, assume pending.
                        {
                          packet,
                          status: CrossChainPacketInfoStatus.Pending,
                        }
              }

              return []
            }
          )

    return {
      all: packetStates,
      pending: packetStates.flatMap((state, index) =>
        state.status === CrossChainPacketInfoStatus.Pending
          ? {
              ...state,
              index,
            }
          : []
      ),
      relayed: packetStates.flatMap((state, index) =>
        state.status === CrossChainPacketInfoStatus.Relayed
          ? {
              ...state,
              index,
            }
          : []
      ),
      errored: packetStates.flatMap((state, index) =>
        state.status === CrossChainPacketInfoStatus.Errored
          ? {
              ...state,
              index,
            }
          : []
      ),
      timedOut: packetStates.flatMap((state, index) =>
        state.status === CrossChainPacketInfoStatus.TimedOut
          ? {
              ...state,
              index,
            }
          : []
      ),
    }
  }, [
    unreceivedPackets,
    unreceivedAcks,
    acksReceived,
    polytoneRelayResults,
    crossChainPackets,
    packetsLoadable,
    relayedTxHashes,
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
  const anyPending = states.pending.length > 0
  useEffect(() => {
    if (!anyPending) {
      return
    }

    const interval = setInterval(refreshIbcData, 10 * 1000)
    return () => clearInterval(interval)
  }, [anyPending, refreshIbcData])

  // const executedOverOneMinuteAgo =
  //   executed &&
  //   !!context.executedAt &&
  //   // If executed over 1 minute ago...
  //   Date.now() - context.executedAt.getTime() > 1 * 60 * 1000
  const messagesNeedingSelfRelay =
    unreceivedPackets.loading ||
    unreceivedAcks.loading ||
    acksReceived.loading ||
    polytoneRelayResults.loading
      ? undefined
      : crossChainPackets.filter(
          (packet) =>
            // Not Injective, since we don't support signing for it yet.
            // TODO: support injective signing
            packet.data.chainId !== ChainId.InjectiveMainnet &&
            // Not yet relayed.
            states.pending.some((p) => p.packet === packet) &&
            // Executed.
            executed
          // Executed a few minutes ago and still has not been relayed, or the
          // Polytone connection needs self-relay.
          // (executed ||
          //   (packet.type === 'polytone' &&
          //     !!packet.data.polytoneConnection.needsSelfRelay))
        )
  const hasCrossChainMessagesNeedingSelfRelay =
    !!messagesNeedingSelfRelay?.length

  const openSelfRelay = (transactionHash?: string | null) => {
    if (!hasCrossChainMessagesNeedingSelfRelay) {
      return
    }

    if (executed && !transactionHash) {
      throw new Error('Transaction hash is required for executed proposals.')
    }

    const transaction: SelfRelayExecuteModalProps['transaction'] | undefined =
      executed && transactionHash
        ? {
            type: 'exists',
            hash: transactionHash,
          }
        : context.type === 'proposal'
          ? {
              type: 'execute',
              msgs: [
                makeWasmMessage({
                  wasm: {
                    execute: {
                      contract_addr: context.proposalModuleAddress,
                      funds: [],
                      msg: {
                        execute: {
                          proposal_id: context.proposalNumber,
                        },
                      },
                    },
                  },
                }),
              ],
            }
          : undefined

    if (!transaction) {
      throw new Error('Failed to detect transaction for self-relay.')
    }

    openSelfRelayExecute({
      uniqueId:
        context.type === 'dao_initial_actions'
          ? `${srcChainId}:${context.coreAddress}`
          : `${srcChainId}:${context.proposalModuleAddress}:${context.proposalNumber}`,
      transaction,
      crossChainPackets: messagesNeedingSelfRelay,
      chainIds: uniq(
        messagesNeedingSelfRelay.map(({ data: { chainId } }) => chainId)
      ),
    })
  }

  return unreceivedPackets.loading ||
    unreceivedAcks.loading ||
    acksReceived.loading ||
    polytoneRelayResults.loading ||
    packetsLoadable.loading ||
    (executed && loadingTxHash.loading)
    ? {
        loading: true,
      }
    : {
        loading: false,
        data: {
          hasCrossChainMessages: crossChainPackets.length > 0,
          states,
          needsSelfRelay: hasCrossChainMessagesNeedingSelfRelay,
          openSelfRelay: () =>
            executed && !loadingTxHash.loading && !loadingTxHash.errored
              ? openSelfRelay(loadingTxHash.data)
              : openSelfRelay(),
        },
      }
}
