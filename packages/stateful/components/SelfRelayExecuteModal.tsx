import { Chain } from '@chain-registry/types'
import { AckWithMetadata } from '@confio/relayer'
import { IbcClient } from '@confio/relayer/build/lib/ibcclient'
import { Link } from '@confio/relayer/build/lib/link'
import {
  parseAcksFromTxEvents,
  parsePacketsFromTendermintEvents,
} from '@confio/relayer/build/lib/utils'
import { toHex } from '@cosmjs/encoding'
import { DirectSecp256k1HdWallet, EncodeObject } from '@cosmjs/proto-signing'
import {
  GasPrice,
  IndexedTx,
  SigningStargateClient,
  calculateFee,
  coins,
  fromTendermintEvent,
} from '@cosmjs/stargate'
import { useChains } from '@cosmos-kit/react-lite'
import { Check, Close, Send, Verified } from '@mui/icons-material'
import { MsgGrant as MsgGrantEncoder } from 'cosmjs-types/cosmos/authz/v1beta1/tx'
import uniq from 'lodash.uniq'
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback, waitForAll } from 'recoil'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import {
  genericTokenBalanceSelector,
  nativeDenomBalanceSelector,
  refreshPolytoneListenerResultsAtom,
  refreshUnreceivedIbcDataAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state/recoil'
import {
  Button,
  FlyingAnimation,
  Loader,
  Modal,
  SteppedWalkthrough,
  TokenAmountDisplay,
  Tooltip,
  useCachedLoadingWithError,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  ChainId,
  PolytoneConnection,
  SelfRelayExecuteModalProps,
  TokenType,
} from '@dao-dao/types'
import {
  CHAIN_GAS_MULTIPLIER,
  convertMicroDenomToDenomWithDecimals,
  cwMsgToEncodeObject,
  getChainForChainId,
  getDisplayNameForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  getRpcForChainId,
  getTokenForChainIdAndDenom,
  makeBankMessage,
  processError,
} from '@dao-dao/utils'
import { MsgGrant } from '@dao-dao/utils/protobuf/codegen/cosmos/authz/v1beta1/tx'
import { SendAuthorization } from '@dao-dao/utils/protobuf/codegen/cosmos/bank/v1beta1/authz'
import { toTimestamp } from '@dao-dao/utils/protobuf/codegen/helpers'

enum RelayStatus {
  Uninitialized,
  Initializing,
  Funding,
  Executing,
  Relaying,
  Refunding,
  RefundingErrored,
  Success,
  RelayErrored,
  Canceled,
}

const RELAYER_FUNDS_NEEDED: Partial<Record<ChainId | string, number>> = {
  [ChainId.JunoMainnet]: 100000,
  [ChainId.OsmosisMainnet]: 100000,
  [ChainId.StargazeMainnet]: 2000000,
  [ChainId.NeutronMainnet]: 500000,
  [ChainId.TerraMainnet]: 100000,
  [ChainId.MigalooMainnet]: 2000000,
  [ChainId.KujiraMainnet]: 100000,
  [ChainId.OraichainMainnet]: 100000,
}

type Relayer = {
  chain: Chain
  chainImageUrl: string
  feeToken: {
    denom: string
    average_gas_price?: number
  }
  wallet: {
    address: string
    signingStargateClient: SigningStargateClient
  }
  relayerAddress: string
  client: IbcClient
  // Will be loaded for receiving chains only. The current chain will not have a
  // polytone note since it is just responsible for sending packets.
  polytoneConnection?: PolytoneConnection
}

export const SelfRelayExecuteModal = ({
  uniqueId,
  chainIds: _chainIds,
  transaction,
  onSuccess,
  onClose,
  visible,
}: SelfRelayExecuteModalProps) => {
  const { t } = useTranslation()
  const mnemonicKey = `relayer_mnemonic_${uniqueId}`

  // Current chain.
  const {
    chain: { chain_id: currentChainId },
    config,
  } = useSupportedChainContext()

  // All chains, including current.
  const chainIds = [currentChainId, ..._chainIds]
  const chains = uniq(chainIds).map(getChainForChainId)
  const wallets = useChains(chains.map(({ chain_name }) => chain_name))
  const allWalletsConnected = Object.values(wallets).every(
    (wallet) => wallet.isWalletConnected
  )

  const [status, setStatus] = useState<RelayStatus>(RelayStatus.Uninitialized)
  const [relayError, setRelayError] = useState<string>()
  const [relayers, setRelayers] = useState<Relayer[]>()

  // Relayer chain IDs currently being funded.
  const [fundingRelayer, setFundingRelayer] = useState<Record<string, boolean>>(
    {}
  )
  // Amount funded once funding is complete.
  const [fundedAmount, setFundedAmount] = useState<
    Record<string, number | undefined>
  >({})
  const [executeTx, setExecuteTx] =
    useState<Pick<IndexedTx, 'events' | 'height'>>()
  const [relaying, setRelaying] = useState<{
    type: 'packet' | 'ack'
    relayer: Relayer
  }>()
  // Amount refunded once refunding is complete.
  const [refundedAmount, setRefundedAmount] = useState<
    Record<string, number | undefined>
  >({})

  // If relay fails and user decides to refund and cancel, this will be set to
  // true.
  const [canceling, setCanceling] = useState(false)

  // When the modal is closed, reset state.
  useEffect(() => {
    if (visible) {
      return
    }

    // Reset state after a short delay to allow the modal to close.
    setTimeout(() => {
      setStatus(RelayStatus.Uninitialized)
      setRelayers(undefined)
      setFundingRelayer({})
      setFundedAmount({})
      setExecuteTx(undefined)
      setRefundedAmount({})
      setRelaying(undefined)
      setCanceling(false)
    }, 500)
  }, [visible])

  // Prevent accidentally closing the tab/window in the middle of the process.
  useEffect(() => {
    if (
      !visible ||
      status === RelayStatus.Uninitialized ||
      status === RelayStatus.Success
    ) {
      return
    }

    const listener = (event: BeforeUnloadEvent) => {
      event.returnValue = t('info.completeRelayOrLoseFunds')
    }

    window.addEventListener('beforeunload', listener)
    return () => window.removeEventListener('beforeunload', listener)
  }, [visible, status, t])

  // Refresh balances for the wallet and relayer wallet.
  const refreshBalances = useRecoilCallback(
    ({ set }) =>
      ({ wallet, relayerAddress }: Relayer) => {
        set(refreshWalletBalancesIdAtom(wallet.address), (id) => id + 1)
        set(refreshWalletBalancesIdAtom(relayerAddress), (id) => id + 1)
      },
    []
  )
  // Refresh balances every 10 seconds.
  useEffect(() => {
    if (!relayers) {
      return
    }
    const interval = setInterval(() => {
      relayers?.forEach(refreshBalances)
    }, 10000)
    return () => clearInterval(interval)
  }, [relayers, refreshBalances])

  const walletFunds = useCachedLoadingWithError(
    relayers
      ? waitForAll(
          relayers.map(({ chain: { chain_id: chainId }, feeToken, wallet }) =>
            genericTokenBalanceSelector({
              type: TokenType.Native,
              chainId,
              denomOrAddress: feeToken.denom,
              address: wallet.address,
            })
          )
        )
      : undefined
  )
  const walletFundsSufficient =
    !walletFunds.loading && !walletFunds.errored && relayers
      ? walletFunds.data.map(
          ({ balance }, index) =>
            Number(balance) >=
            (RELAYER_FUNDS_NEEDED[relayers[index].chain.chain_id] ?? 0)
        )
      : undefined

  const relayerFunds = useCachedLoadingWithError(
    relayers
      ? waitForAll(
          relayers.map(
            ({ chain: { chain_id: chainId }, feeToken, relayerAddress }) =>
              nativeDenomBalanceSelector({
                walletAddress: relayerAddress,
                denom: feeToken.denom,
                chainId,
              })
          )
        )
      : undefined
  )
  // Whether or not all relayers have enough funds to pay fees, except current.
  const allReceivingRelayersFunded =
    !relayerFunds.loading &&
    !relayerFunds.errored &&
    relayers &&
    relayerFunds.data
      .slice(1)
      .every(
        ({ amount }, index) =>
          Number(amount) >=
          (RELAYER_FUNDS_NEEDED[relayers[index + 1].chain.chain_id] ?? 0)
      )

  const setupRelayer = async () => {
    if (status !== RelayStatus.Uninitialized) {
      toast.error(t('error.relayerAlreadySetUp'))
      return
    }

    if (!allWalletsConnected) {
      toast.error(t('error.chainNotConnected'))
      return
    }

    // Make sure all wallets are connected by trying to connect first one.
    Object.values(wallets)[0]?.connect()

    setStatus(RelayStatus.Initializing)
    try {
      // Find the mnemonic if it exists, or generate a new one.
      const mnemonic =
        localStorage.getItem(mnemonicKey) ||
        (await DirectSecp256k1HdWallet.generate(24)).mnemonic

      const relayers = await Promise.all(
        chains.map(async (chain): Promise<Relayer> => {
          const chainImageUrl =
            getImageUrlForChainId(chain.chain_id) ||
            getFallbackImage(chain.chain_id)

          const feeToken = chain.fees?.fee_tokens[0]
          if (!feeToken) {
            throw new Error(t('error.feeTokenNotFound'))
          }

          const polytoneConnection = config.polytone?.[chain.chain_id]
          // Only the receiving chains need polytone notes. The current chain is
          // just responsible for sending.
          if (chain.chain_id !== currentChainId && !polytoneConnection) {
            throw new Error(t('error.polytoneConnectionNotFound'))
          }

          // Connect wallet to chain so we can send tokens.
          const connectedWallet = wallets[chain.chain_name]
          if (!connectedWallet?.address) {
            throw new Error(t('error.chainNotConnected'))
          }
          const signingStargateClient =
            await connectedWallet.getSigningStargateClient()

          // Create relayer signer.
          const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
            prefix: chain.bech32_prefix,
          })
          const relayerAddress = (await signer.getAccounts())[0].address

          // Create IBC client with newly created signer.
          const client = await IbcClient.connectWithSigner(
            getRpcForChainId(chain.chain_id),
            signer,
            relayerAddress,
            {
              // How long it waits in between checking for a new block.
              estimatedBlockTime: 3000,
              // How long it waits until looking for acks.
              estimatedIndexerTime: 3000,
              gasPrice: GasPrice.fromString(
                `${feeToken.average_gas_price ?? 0}${feeToken.denom}`
              ),
            }
          )

          return {
            chain,
            chainImageUrl,
            feeToken,
            wallet: {
              address: connectedWallet.address,
              // cosmos-kit has an older version of the package. This is a
              // workaround.
              signingStargateClient:
                signingStargateClient as unknown as SigningStargateClient,
            },
            relayerAddress,
            client,
            polytoneConnection,
          }
        })
      )

      // Save mnemonic in case of an error. This gets cleared when the relayer
      // succeeds and all wallets are refunded successfully.
      localStorage.setItem(mnemonicKey, mnemonic)

      setRelayers(relayers)
      setStatus(RelayStatus.Funding)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
      setStatus(RelayStatus.Uninitialized)
    }
  }

  // Send fee tokens to relayer wallet.
  const fundRelayer = async (chainId: string, withExecuteRelay = false) => {
    const relayer = relayers?.find(({ chain }) => chainId === chain.chain_id)
    if (!relayers || !relayer) {
      toast.error(t('error.relayerNotSetUp'))
      return
    }

    // Should never happen, but just to be safe.
    if (withExecuteRelay && relayer.chain.chain_id !== currentChainId) {
      toast.error(
        t('error.unexpectedError') +
          ' Relay can only happen when funding the current chain.'
      )
      return
    }

    setFundingRelayer((prev) => ({
      ...prev,
      [chainId]: true,
    }))
    try {
      if (withExecuteRelay) {
        setStatus(RelayStatus.Executing)
      }

      // Get current balance of relayer wallet.
      const currentBalance = await relayer.client.query.bank.balance(
        relayer.relayerAddress,
        relayer.feeToken.denom
      )

      const fundsNeeded =
        // Give a little extra to cover the authz tx fee.
        (RELAYER_FUNDS_NEEDED[chainId] ?? 0) * 1.3 -
        Number(currentBalance.amount)

      let msgs: EncodeObject[] =
        fundsNeeded > 0
          ? // Send tokens to relayer wallet if needed.
            [
              cwMsgToEncodeObject(
                {
                  bank: {
                    send: {
                      amount: coins(
                        BigInt(fundsNeeded).toString(),
                        relayer.feeToken.denom
                      ),
                      to_address: relayer.relayerAddress,
                    },
                  },
                },
                relayer.wallet.address
              ),
            ]
          : []

      // Add execute message if executing and has not already executed.
      if (withExecuteRelay && !executeTx && transaction.type === 'execute') {
        msgs.push(
          ...transaction.msgs.map((msg) =>
            cwMsgToEncodeObject(msg, relayer.wallet.address)
          )
        )
      }

      // Execute fund and execute messages. Fund should only happen if the
      // relayer wallet needs funding, and execute should only happen if this is
      // the current chain. There will be none if this is not the current chain
      // and the relayer wallet is already funded.
      let newExecuteTxResult
      if (msgs.length > 0) {
        newExecuteTxResult =
          await relayer.wallet.signingStargateClient.signAndBroadcast(
            relayer.wallet.address,
            msgs,
            CHAIN_GAS_MULTIPLIER
          )
      }

      // Get new balance of relayer wallet.
      const newBalance = Number(
        (
          await relayer.client.query.bank.balance(
            relayer.relayerAddress,
            relayer.feeToken.denom
          )
        ).amount
      )
      setFundedAmount((prev) => ({
        ...prev,
        [chainId]: newBalance,
      }))

      // Authorize the user's wallet to be able to send funds on behalf of the
      // relayer wallet, in case anything goes wrong, so they can recover the
      // funds.

      // Set expiration to 10 years.
      const expiration = new Date()
      expiration.setFullYear(expiration.getFullYear() + 10)
      // Encoder needs a whole number of seconds.
      expiration.setMilliseconds(0)

      await relayer.client.sign.signAndBroadcast(
        relayer.relayerAddress,
        [
          {
            typeUrl: MsgGrant.typeUrl,
            value: {
              granter: relayer.relayerAddress,
              grantee: relayer.wallet.address,
              grant: {
                authorization: SendAuthorization.toProtoMsg(
                  SendAuthorization.fromPartial({
                    spendLimit: coins(
                      BigInt(newBalance).toString(),
                      relayer.feeToken.denom
                    ),
                  })
                ),
                expiration: toTimestamp(expiration),
              },
            } as MsgGrantEncoder,
          },
        ],
        CHAIN_GAS_MULTIPLIER
      )

      // Begin relay.
      if (withExecuteRelay) {
        if (transaction.type === 'execute') {
          setExecuteTx(newExecuteTxResult)
          relay(newExecuteTxResult)
        } else {
          const tx = await relayer.client.sign.getTx(transaction.hash)
          if (!tx) {
            throw new Error(t('error.txNotFound'))
          }

          setExecuteTx(tx)
          relay(tx)
        }
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setFundingRelayer((prev) => ({
        ...prev,
        [chainId]: false,
      }))
      refreshBalances(relayer)
    }
  }

  const refreshPolytoneResults = useRecoilCallback(
    ({ set }) =>
      () => {
        chainIds.forEach((chainId) =>
          set(refreshUnreceivedIbcDataAtom(chainId), (id) => id + 1)
        )
        set(refreshPolytoneListenerResultsAtom, (id) => id + 1)
      },
    useDeepCompareMemoize([chainIds])
  )

  const relay = async (_executeTx?: typeof executeTx) => {
    const currentExecuteTx = _executeTx || executeTx

    if (!relayers || !mnemonicKey) {
      toast.error(t('error.relayerNotSetUp'))
      return
    }

    if (!currentExecuteTx) {
      toast.error(t('error.txNotFound'))
      return
    }

    setStatus(RelayStatus.Relaying)
    setRelayError(undefined)
    setRelaying({
      type: 'packet',
      relayer: relayers[1],
    })

    try {
      // Parse the packets from the execution TX events.
      const packets = parsePacketsFromTendermintEvents(
        currentExecuteTx.events
      ).map((packet) => ({
        packet,
        height: currentExecuteTx.height,
      }))

      // Wait a few seconds for the TX to be indexed.
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // First relayer is current chain that is sending packets. The rest of the
      // relayers are the chains that are receiving packets. Relay and ack
      // packets sequentially, one chain at a time, since a wallet can only
      // submit one TX at a time.
      await relayers.slice(1).reduce(async (prev, relayer) => {
        // Wait for previous chain to finish relaying packets.
        await prev

        const { chain, client, polytoneConnection } = relayer

        // Type-check, should never happen since we slice off the first (current
        // chain) relayer, which is just responsible for sending.
        if (!polytoneConnection) {
          throw new Error(t('error.polytoneNoteNotFound'))
        }

        // Get packets for this chain that need relaying.
        const thesePackets = packets.filter(
          ({ packet }) =>
            packet.sourcePort === `wasm.${polytoneConnection.note}` &&
            packet.sourceChannel === polytoneConnection.localChannel &&
            packet.destinationChannel === polytoneConnection.remoteChannel
        )
        if (!thesePackets.length) {
          return
        }
        const packetSequences = thesePackets.map(({ packet }) =>
          Number(packet.sequence)
        )

        setRelaying({
          type: 'packet',
          relayer,
        })

        const link = await Link.createWithExistingConnections(
          // First relayer is current chain sending packets.
          relayers[0].client,
          client,
          polytoneConnection.localConnection,
          polytoneConnection.remoteConnection
        )

        // Relay packets. Try 5 times.
        let tries = 5
        while (tries) {
          try {
            const unrelayedPackets =
              await client.query.ibc.channel.unreceivedPackets(
                thesePackets[0].packet.destinationPort,
                thesePackets[0].packet.destinationChannel,
                packetSequences
              )

            const packetsNeedingRelay = thesePackets.filter(({ packet }) =>
              unrelayedPackets.sequences.some((seq) => seq === packet.sequence)
            )

            // Relay only the packets that need relaying.
            if (packetsNeedingRelay.length) {
              await link.relayPackets('A', packetsNeedingRelay)
            }

            break
          } catch (err) {
            // If relayer wallet out of funds, throw immediately since they need
            // to top up.
            if (
              err instanceof Error &&
              err.message.includes('insufficient funds')
            ) {
              // Refresh all balances.
              relayers.map(refreshBalances)
              throw new Error(t('error.relayerWalletNeedsFunds'))
            }

            tries -= 1

            console.error(
              t('error.failedToRelayPackets', {
                chain: chain.pretty_name,
              }) + (tries > 0 ? ' ' + t('info.tryingAgain') : ''),
              err
            )

            // If no more tries, rethrow error.
            if (tries === 0) {
              throw err
            }

            // Wait a few seconds before trying again.
            await new Promise((resolve) => setTimeout(resolve, 5000))
          }
        }

        // Wait a few seconds for the packets to be indexed.
        await new Promise((resolve) => setTimeout(resolve, 5000))

        setRelaying({
          type: 'ack',
          relayer,
        })

        const sourcePort = thesePackets[0].packet.sourcePort
        const sourceChannel = thesePackets[0].packet.sourceChannel

        // Relay acks. Try 5 times.
        tries = 5
        while (tries) {
          try {
            // Find acks that need relaying.
            const smallestSequenceNumber = Math.min(...packetSequences)
            const largestSequenceNumber = Math.max(...packetSequences)
            const search = await link.endB.client.tm.txSearchAll({
              query: `write_acknowledgement.packet_connection='${polytoneConnection.remoteConnection}' AND write_acknowledgement.packet_src_port='${sourcePort}' AND write_acknowledgement.packet_src_channel='${sourceChannel}' AND write_acknowledgement.packet_sequence>=${smallestSequenceNumber} AND write_acknowledgement.packet_sequence<=${largestSequenceNumber}`,
            })

            const allAcks = search.txs.flatMap(({ height, result, hash }) => {
              const events = result.events.map(fromTendermintEvent)
              return parseAcksFromTxEvents(events).map(
                (ack): AckWithMetadata => ({
                  height,
                  txHash: toHex(hash).toUpperCase(),
                  txEvents: events,
                  ...ack,
                })
              )
            })

            const unrelayedAcks =
              // First relayer is current chain sending packets/getting acks.
              await relayers[0].client.query.ibc.channel.unreceivedAcks(
                sourcePort,
                sourceChannel,
                allAcks.map(({ originalPacket }) =>
                  Number(originalPacket.sequence)
                )
              )

            const acksNeedingRelay = allAcks.filter(({ originalPacket }) =>
              unrelayedAcks.sequences.some(
                (seq) => seq === originalPacket.sequence
              )
            )

            // Acknowledge only the packets that need relaying.
            if (acksNeedingRelay.length) {
              await link.relayAcks('B', acksNeedingRelay)
            }

            break
          } catch (err) {
            // If relayer wallet out of funds, throw immediately since they need
            // to top up.
            if (
              err instanceof Error &&
              err.message.includes('insufficient funds')
            ) {
              // Refresh all balances.
              relayers.map(refreshBalances)
              throw new Error(t('error.relayerWalletNeedsFunds'))
            }

            tries -= 1

            console.error(
              t('error.failedToRelayAcks', {
                chain: chain.pretty_name,
              }) + (tries > 0 ? ' ' + t('info.tryingAgain') : ''),
              err
            )

            // If no more tries, rethrow error.
            if (tries === 0) {
              throw err
            }

            // Wait a few seconds before trying again.
            await new Promise((resolve) =>
              setTimeout(
                resolve,
                // If redundant packets detected, a relayer already relayed
                // these acks. In that case, wait a bit longer to let it finish.
                // The ack relayer above tries to check which acks have not yet
                // been received, so if a relayer takes care of the acks, we
                // will safely continue.
                err instanceof Error && err.message.includes('redundant')
                  ? 10 * 1000
                  : 5 * 1000
              )
            )
          }
        }
      }, Promise.resolve())

      // If packets and acks were relayed successfully, execute was successful.
      setExecuteTx(undefined)
      setRelaying(undefined)
    } catch (err) {
      console.error(err)
      setRelayError(processError(err))
      setStatus(RelayStatus.RelayErrored)
      return
    } finally {
      // Refresh all balances.
      relayers.map(refreshBalances)

      // Refresh all polytone results.
      refreshPolytoneResults()
    }

    await refundAllRelayers()
  }

  // Refund all relayers that have remaining tokens.
  const refundAllRelayers = async (cancel = false) => {
    if (!relayers || !mnemonicKey) {
      toast.error(t('error.relayerNotSetUp'))
      return
    }

    if (cancel) {
      setCanceling(true)
    }

    // If relay was successful, refund remaining tokens from relayer wallet back
    // to user on all chains.
    setStatus(RelayStatus.Refunding)
    try {
      await Promise.all(
        relayers.map(({ chain }) => refundRelayer(chain.chain_id))
      )

      // Clear mnemonic from local storage since all wallets should be empty now
      // (if all refunds completed successfully).
      localStorage.removeItem(mnemonicKey)

      setStatus(
        cancel || canceling ? RelayStatus.Canceled : RelayStatus.Success
      )
    } catch (err) {
      setStatus(RelayStatus.RefundingErrored)

      console.error(err)
      toast.error(processError(err))
    }
  }

  // Return remaining tokens from IBC client relayer wallet back to user.
  const refundRelayer = async (chainId: string) => {
    const relayer = relayers?.find(({ chain }) => chain.chain_id === chainId)
    if (!relayer) {
      throw new Error(t('error.relayerNotSetUp'))
    }

    const { chain, client, relayerAddress, wallet } = relayer

    const feeDenom = chain.fees?.fee_tokens[0]?.denom
    if (!feeDenom) {
      throw new Error(t('error.feeTokenNotFound'))
    }

    try {
      const remainingTokens = await client.query.bank.balance(
        relayerAddress,
        feeDenom
      )
      if (remainingTokens.amount === '0') {
        return
      }

      // Compute fees needed to send and subtract from remaining tokens.
      const gasUsed = await client.sign.simulate(
        relayerAddress,
        [
          cwMsgToEncodeObject(
            {
              bank: makeBankMessage(
                remainingTokens.amount,
                wallet.address,
                feeDenom
              ),
            },
            relayerAddress
          ),
        ],
        undefined
      )
      const fee = calculateFee(
        Math.round(gasUsed * CHAIN_GAS_MULTIPLIER),
        // @ts-ignore
        client.gasPrice
      )
      const remainingTokensAfterFee =
        Number(remainingTokens.amount) - Number(fee.amount[0].amount)

      // Send remaining tokens if there are more than enough to pay the fee.
      if (remainingTokensAfterFee > 0) {
        await client.sign.sendTokens(
          relayerAddress,
          wallet.address,
          coins(BigInt(remainingTokensAfterFee).toString(), feeDenom),
          fee
        )

        setRefundedAmount((prev) => ({
          ...prev,
          [chainId]: remainingTokensAfterFee,
        }))
      }
      // Don't catch error. Throw to caller.
    } finally {
      refreshBalances(relayer)
    }
  }

  const RelayIcon = !relaying || relaying.type === 'packet' ? Send : Verified

  return (
    <Modal
      containerClassName="w-full !max-w-lg"
      header={{
        title: t('title.relay'),
        subtitle: t('info.selfRelayDescription'),
      }}
      onClose={
        // Only allow closing if execution and relaying has not begun. This
        // prevents accidentally closing the modal in the middle of the process.
        status === RelayStatus.Uninitialized ||
        status === RelayStatus.Initializing ||
        status === RelayStatus.Funding
          ? onClose
          : undefined
      }
      visible={visible}
    >
      <SteppedWalkthrough
        className="w-full"
        stepIndex={
          status === RelayStatus.Uninitialized ||
          status === RelayStatus.Initializing
            ? 0
            : status === RelayStatus.Funding || status === RelayStatus.Executing
            ? 1
            : status === RelayStatus.Relaying ||
              status === RelayStatus.RelayErrored
            ? 2
            : status === RelayStatus.Refunding ||
              status === RelayStatus.RefundingErrored
            ? 3
            : 4
        }
        steps={[
          {
            label: t('title.start'),
            content: () => (
              <div className="flex flex-col gap-4">
                <p>
                  To execute this proposal, you must relay a message from the
                  source chain to the destination chain
                  {chains.length > 2 ? 's' : ''}.
                </p>

                <p>
                  A new relayer wallet will be created, which you will have to
                  fund with tokens to pay transaction fees on{' '}
                  {chains.length > 2 ? 'all' : 'both'} chains.
                </p>

                <p>
                  Once the relaying process is complete, the remaining tokens
                  will be sent back to your wallet.
                </p>

                <Button
                  className="self-end"
                  loading={status === RelayStatus.Initializing}
                  onClick={
                    allWalletsConnected
                      ? setupRelayer
                      : // Connect all wallets by connecting one.
                        () => Object.values(wallets)[0]?.connect()
                  }
                >
                  {allWalletsConnected
                    ? t('button.begin')
                    : t('button.connect')}
                </Button>
              </div>
            ),
          },
          {
            label: t('title.fundAndExecute'),
            // Show when this step is current or past. This makes sure the
            // funded balances are visible once the relayer is funded.
            overrideShowStepContentStatuses: ['current', 'past'],
            content: (stepStatus) => (
              <div className="flex flex-col gap-4">
                <p>
                  Fund the relayer wallet with tokens to pay transaction fees on
                  {' ' + (chains.length > 2 ? 'all' : 'both')} chains. The last
                  one will{' '}
                  {transaction.type === 'execute' ? 'execute and ' : ''}start
                  the relayer. Remaining fees will be refunded to your wallet
                  once relaying is complete.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  {[
                    // Receiving chains first.
                    ...(relayers?.slice(1) ?? []),
                    // Current chain last. This includes the execute.
                    ...(relayers ? [relayers[0]] : []),
                  ].map(({ chain: { chain_id }, chainImageUrl }, index) => {
                    // Adjust the index to reflect the reordering above.
                    index = (index + 1) % relayers!.length

                    const fundTokenWithBalance =
                      walletFunds.loading || walletFunds.errored
                        ? undefined
                        : walletFunds.data[index]

                    const walletCannotAfford =
                      !walletFunds.loading &&
                      !(walletFundsSufficient?.[index] ?? false)

                    const funds =
                      !relayerFunds.loading && !relayerFunds.errored
                        ? Number(relayerFunds.data[index].amount)
                        : // Use the previously funded amount if the step is past.
                          fundedAmount[chain_id] ?? 0
                    const empty = funds === 0

                    const funded =
                      funds >= (RELAYER_FUNDS_NEEDED[chain_id] ?? 0)

                    const isExecute = index === 0
                    // If this is the execute, we need to make sure all
                    // receiving relayers are funded first.
                    const cannotExecuteUntilFunded =
                      isExecute && !allReceivingRelayersFunded

                    const showFundOrExecuteButton =
                      stepStatus === 'current' && (!funded || isExecute)

                    return (
                      <Fragment key={chain_id}>
                        <div className="flex flex-row items-center gap-2">
                          <div
                            className="h-6 w-6 bg-contain bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${chainImageUrl})`,
                            }}
                          ></div>

                          <p className="primary-text shrink-0">
                            {getDisplayNameForChainId(chain_id)}
                          </p>
                        </div>

                        {showFundOrExecuteButton ? (
                          <Tooltip
                            title={
                              walletCannotAfford && fundTokenWithBalance
                                ? t('error.insufficientWalletBalance', {
                                    amount:
                                      convertMicroDenomToDenomWithDecimals(
                                        fundTokenWithBalance.balance,
                                        fundTokenWithBalance.token.decimals
                                      ),
                                    tokenSymbol:
                                      fundTokenWithBalance.token.symbol,
                                  })
                                : cannotExecuteUntilFunded
                                ? `Fund the other relayer${
                                    chains.length > 2 ? 's' : ''
                                  } before executing.`
                                : undefined
                            }
                          >
                            <Button
                              center
                              className="w-36 justify-self-end"
                              disabled={
                                walletCannotAfford || cannotExecuteUntilFunded
                              }
                              loading={
                                !!fundingRelayer[chain_id] ||
                                walletFunds.loading ||
                                walletFunds.errored
                              }
                              onClick={() => fundRelayer(chain_id, isExecute)}
                            >
                              {isExecute
                                ? funded
                                  ? transaction.type === 'execute'
                                    ? t('button.execute')
                                    : t('button.relay')
                                  : transaction.type === 'execute'
                                  ? t('button.fundAndExecute')
                                  : t('button.fundAndRelay')
                                : empty
                                ? t('button.fund')
                                : t('button.topUp')}
                            </Button>
                          </Tooltip>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <TokenAmountDisplay
                              amount={
                                walletFunds.loading || walletFunds.errored
                                  ? { loading: true }
                                  : {
                                      loading: false,
                                      data: convertMicroDenomToDenomWithDecimals(
                                        funds,
                                        walletFunds.data[index].token.decimals
                                      ),
                                    }
                              }
                              decimals={
                                fundTokenWithBalance?.token.decimals ?? 0
                              }
                              symbol={
                                fundTokenWithBalance?.token.symbol ?? '...'
                              }
                            />

                            <Tooltip title={t('info.funded')}>
                              <Check className="!h-4 !w-4 text-icon-interactive-valid" />
                            </Tooltip>
                          </div>
                        )}
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            ),
          },
          {
            OverrideIcon:
              status === RelayStatus.RelayErrored ? Close : undefined,
            iconContainerClassName:
              status === RelayStatus.RelayErrored
                ? '!bg-icon-interactive-error'
                : undefined,
            label: t('title.relay'),
            content: () =>
              status === RelayStatus.RelayErrored ? (
                <div className="flex flex-row flex-wrap items-center justify-between gap-x-8 gap-y-4">
                  <p className="break-all text-text-interactive-error">
                    {relayError}
                  </p>

                  <div className="flex grow flex-row items-stretch justify-end gap-2">
                    <Button
                      onClick={() => refundAllRelayers(true)}
                      variant="secondary"
                    >
                      {t('button.refundAndCancel')}
                    </Button>

                    <Button onClick={() => setStatus(RelayStatus.Funding)}>
                      {t('button.retry')}
                    </Button>
                  </div>
                </div>
              ) : (
                relayers &&
                relaying && (
                  <FlyingAnimation
                    destination={
                      <Tooltip
                        title={getDisplayNameForChainId(
                          relaying.relayer.chain.chain_id
                        )}
                      >
                        <div className="flex items-center justify-center rounded-l-full bg-background-base p-1">
                          <div
                            className="h-8 w-8 rounded-full bg-contain bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${relaying.relayer.chainImageUrl})`,
                            }}
                          ></div>
                        </div>
                      </Tooltip>
                    }
                    flyer={
                      <RelayIcon className="text-icon-interactive-primary !h-5 !w-5" />
                    }
                    reversed={relaying.type === 'ack'}
                    source={
                      // First chain is current source chain.
                      <Tooltip
                        title={getDisplayNameForChainId(
                          relayers[0].chain.chain_id
                        )}
                      >
                        <div className="flex items-center justify-center rounded-r-full bg-background-base p-1">
                          <div
                            className="h-8 w-8 rounded-full bg-contain bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${relayers[0].chainImageUrl})`,
                            }}
                          ></div>
                        </div>
                      </Tooltip>
                    }
                  />
                )
              ),
          },
          {
            label: t('title.refund'),
            // Show when this step is current or past. This makes sure the
            // refund balances are visible once the success step is reached.
            overrideShowStepContentStatuses: ['current', 'past'],
            content: (stepStatus) => (
              <div className="flex flex-col gap-4">
                <p>
                  Refund your wallet with the remaining tokens from the relayer
                  wallet.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  {[
                    // Match the order of the funding step above with the
                    // current chain execute last.

                    // Receiving chains first.
                    ...(relayers?.slice(1) ?? []),
                    // Current chain last.
                    ...(relayers ? [relayers[0]] : []),
                  ].map(
                    (
                      {
                        chain: { chain_id },
                        chainImageUrl,
                        feeToken: { denom },
                      },
                      index
                    ) => {
                      // Adjust the index to reflect the reordering above.
                      index = (index + 1) % relayers!.length

                      const funds =
                        !relayerFunds.loading && !relayerFunds.errored
                          ? Number(relayerFunds.data[index].amount)
                          : 0
                      const empty = funds === 0

                      const refunded = refundedAmount[chain_id] ?? 0
                      const feeToken = getTokenForChainIdAndDenom(
                        chain_id,
                        denom
                      )

                      return (
                        <Fragment key={chain_id}>
                          <div className="flex flex-row items-center gap-2">
                            <div
                              className="h-6 w-6 bg-contain bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${chainImageUrl})`,
                              }}
                            ></div>

                            <p className="primary-text shrink-0">
                              {getDisplayNameForChainId(chain_id)}
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2">
                            <TokenAmountDisplay
                              amount={convertMicroDenomToDenomWithDecimals(
                                empty ? refunded : funds,
                                feeToken.decimals
                              )}
                              decimals={feeToken.decimals}
                              symbol={feeToken.symbol}
                            />

                            {empty ? (
                              <Tooltip title="Refunded">
                                <Check className="!h-4 !w-4 text-icon-interactive-valid" />
                              </Tooltip>
                            ) : (
                              <Loader fill={false} size={20} />
                            )}
                          </div>
                        </Fragment>
                      )
                    }
                  )}
                </div>

                {stepStatus === 'current' && (
                  <Button
                    className="self-end"
                    loading={status === RelayStatus.Refunding}
                    onClick={() => refundAllRelayers()}
                    size="sm"
                  >
                    {t('button.retry')}
                  </Button>
                )}
              </div>
            ),
          },
          {
            label: canceling ? t('title.canceled') : t('title.success'),
            content: () => (
              <div className="flex flex-row flex-wrap items-center justify-between gap-x-8 gap-y-4">
                <p>
                  The execution and relay{' '}
                  {canceling ? 'was canceled' : 'succeeded'}.
                </p>

                <Button
                  onClick={() => {
                    status === RelayStatus.Success && onSuccess()
                    onClose?.()
                  }}
                >
                  {t('button.close')}
                </Button>
              </div>
            ),
          },
        ]}
        textClassName="!title-text"
      />
    </Modal>
  )
}
