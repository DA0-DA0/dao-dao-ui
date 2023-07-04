import { Chain } from '@chain-registry/types'
import { AckWithMetadata } from '@confio/relayer/build/lib/endpoint'
import { IbcClient } from '@confio/relayer/build/lib/ibcclient'
import { Link } from '@confio/relayer/build/lib/link'
import { parsePacketsFromTendermintEvents } from '@confio/relayer/build/lib/utils'
import { DirectSecp256k1HdWallet, EncodeObject } from '@cosmjs/proto-signing'
import {
  GasPrice,
  IndexedTx,
  SigningStargateClient,
  calculateFee,
  coins,
} from '@cosmjs/stargate'
import { Check, Close, Send, Verified } from '@mui/icons-material'
import uniq from 'lodash.uniq'
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback, useSetRecoilState, waitForAll } from 'recoil'

import {
  nativeDenomBalanceSelector,
  refreshPolytoneListenerResultsAtom,
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
  useChain,
} from '@dao-dao/stateless'
import { PolytoneNote, SelfRelayExecuteModalProps } from '@dao-dao/types'
import {
  CHAIN_GAS_MULTIPLIER,
  POLYTONE_NOTES,
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

import { useWallet } from '../hooks'

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
}

// TODO(polytone): Figure out how much each relayer needs to pay for gas.
const RELAYER_FUNDS_NEEDED = 100000

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
  polytoneNote?: PolytoneNote
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
  const { chain_id: currentChainId } = useChain()

  // All chains, including current.
  const chains = uniq([currentChainId, ..._chainIds]).map(getChainForChainId)

  // Call hook for every chain that needs to be relayed. These chains can never
  // change. The caller must enforce this.
  // TODO(cosmos-kit-dynamic-conn-fn): Remove this when cosmos-kit supports dynamic chain connection fn.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const wallets = chains.map((chain) => useWallet(chain.chain_id))

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

  // Refresher for polytone listener results.
  const setRefreshPolytoneListenerResults = useSetRecoilState(
    refreshPolytoneListenerResultsAtom
  )
  const refreshPolytoneListenerResults = () =>
    setRefreshPolytoneListenerResults((id) => id + 1)

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
  const walletFunds = useCachedLoadingWithError(
    relayers
      ? waitForAll(
          relayers.map(({ chain: { chain_id: chainId }, feeToken, wallet }) =>
            nativeDenomBalanceSelector({
              walletAddress: wallet.address,
              denom: feeToken.denom,
              chainId,
            })
          )
        )
      : undefined
  )
  const walletFundsSufficient =
    !walletFunds.loading && !walletFunds.errored
      ? walletFunds.data.map(
          ({ amount }) => Number(amount) >= RELAYER_FUNDS_NEEDED
        )
      : undefined
  // If wallet has enough funds to fund all relayers.
  const walletCanAffordAllRelayers = !!walletFundsSufficient?.every(Boolean)

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
    relayerFunds.data
      .slice(1)
      .every(({ amount }) => Number(amount) >= RELAYER_FUNDS_NEEDED)

  const setupRelayer = async () => {
    if (status !== RelayStatus.Uninitialized) {
      toast.error(t('error.relayerAlreadySetUp'))
      return
    }

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

          const polytoneNote = POLYTONE_NOTES[chain.chain_id]
          // Only the receiving chains need polytone notes. The current chain is
          // just responsible for sending.
          if (chain.chain_id !== currentChainId && !polytoneNote) {
            throw new Error(t('error.polytoneNoteNotFound'))
          }

          // Connect wallet to chain so we can send tokens.
          const connectedWallet = wallets.find(
            ({ chain: { chain_id } }) => chain_id === chain.chain_id
          )
          if (!connectedWallet?.address) {
            throw new Error('Chain not connected')
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
              signingStargateClient,
            },
            relayerAddress,
            client,
            polytoneNote,
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
    }
  }

  // Send fee tokens to relayer wallet.
  const fundRelayer = async (chainId: string, withExecuteRelay = false) => {
    if (!walletCanAffordAllRelayers) {
      toast.error(t('error.insufficientFunds'))
      return
    }

    const relayer = relayers?.find(({ chain }) => chainId === chain.chain_id)
    if (!relayer) {
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

      const fundsNeeded = RELAYER_FUNDS_NEEDED - Number(currentBalance.amount)

      let msgs: EncodeObject[] =
        fundsNeeded > 0
          ? // Send tokens to relayer wallet if needed.
            [
              cwMsgToEncodeObject(
                {
                  bank: {
                    send: {
                      amount: coins(fundsNeeded, relayer.feeToken.denom),
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
      const newBalance = await relayer.client.query.bank.balance(
        relayer.relayerAddress,
        relayer.feeToken.denom
      )
      setFundedAmount((prev) => ({
        ...prev,
        [chainId]: Number(newBalance.amount),
      }))

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

        const { chain, client, polytoneNote } = relayer

        // Type-check, should never happen since we slice off the first
        // (current chain) relayer, which is just responsible for sending.
        if (!polytoneNote) {
          throw new Error(t('error.polytoneNoteNotFound'))
        }

        // Get packets for this chain that need relaying.
        const thesePackets = packets.filter(
          ({ packet }) =>
            packet.sourcePort === `wasm.${polytoneNote.note}` &&
            packet.sourceChannel === polytoneNote.localChannel &&
            packet.destinationChannel === polytoneNote.remoteChannel
        )
        if (!thesePackets.length) {
          return
        }

        setRelaying({
          type: 'packet',
          relayer,
        })

        const link = await Link.createWithExistingConnections(
          // First relayer is current chain sending packets.
          relayers[0].client,
          client,
          polytoneNote.localConnection,
          polytoneNote.remoteConnection
        )

        // Relay packets and get acks. Try 5 times.
        let acks: AckWithMetadata[] | undefined
        let tries = 5
        while (tries) {
          try {
            // Find packets that need relaying.
            const unrelayedPackets =
              await client.query.ibc.channel.unreceivedPackets(
                thesePackets[0].packet.destinationPort,
                thesePackets[0].packet.destinationChannel,
                thesePackets.map(({ packet }) => packet.sequence.toNumber())
              )

            const packetsNeedingRelay = thesePackets.filter(({ packet }) =>
              unrelayedPackets.sequences.some((seq) => seq.eq(packet.sequence))
            )

            // Relay only the packets that need relaying.
            if (packetsNeedingRelay.length) {
              acks = await link.relayPackets('A', packetsNeedingRelay)
            } else {
              acks = []
            }

            break
          } catch (err) {
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

            // Wait a second before trying again.
            await new Promise((resolve) => setTimeout(resolve, 3000))
          }
        }

        // Type-check. Logic above should ensure it is defined or an error is
        // thrown.
        if (!acks) {
          throw new Error(t('error.failedToRelayAndGetAcks'))
        }

        if (acks.length) {
          // Wait a few seconds for the packets to be indexed.
          await new Promise((resolve) => setTimeout(resolve, 3000))

          setRelaying({
            type: 'ack',
            relayer,
          })

          // Relay acks. Try 5 times.
          tries = 5
          while (tries) {
            try {
              await link.relayAcks('B', acks)
              break
            } catch (err) {
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
              await new Promise((resolve) => setTimeout(resolve, 3000))
            }
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

      // Refresh all polytone listener results.
      refreshPolytoneListenerResults()
    }

    await refundAllRelayers()
  }

  // Refund all relayers that have remaining tokens.
  const refundAllRelayers = async () => {
    if (!relayers || !mnemonicKey) {
      toast.error(t('error.relayerNotSetUp'))
      return
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

      setStatus(RelayStatus.Success)
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
      toast.error(t('error.relayerNotSetUp'))
      return
    }

    const { chain, client, relayerAddress, wallet } = relayer

    const feeDenom = chain.fees?.fee_tokens[0]?.denom
    if (!feeDenom) {
      toast.error(t('error.feeTokenNotFound'))
      return
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
      const fee = calculateFee(Math.round(gasUsed * 1.3), client.gasPrice)
      const remainingTokensAfterFee =
        Number(remainingTokens.amount) - Number(fee.amount[0].amount)

      // Send remaining tokens if there are more than enough to pay the fee.
      if (remainingTokensAfterFee > 0) {
        await client.sign.sendTokens(
          relayerAddress,
          wallet.address,
          coins(remainingTokensAfterFee, feeDenom),
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
                  onClick={setupRelayer}
                >
                  {t('button.begin')}
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
                  the relayer.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  {[
                    // Receiving chains first.
                    ...(relayers?.slice(1) ?? []),
                    // Current chain last. This includes the execute.
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

                      const walletCannotAfford =
                        !walletFunds.loading &&
                        !(walletFundsSufficient?.[index] ?? false)

                      const funds =
                        !relayerFunds.loading && !relayerFunds.errored
                          ? Number(relayerFunds.data[index].amount)
                          : // Use the previously funded amount if the step is past.
                            fundedAmount[chain_id] ?? 0
                      const empty = funds === 0

                      const funded = funds >= RELAYER_FUNDS_NEEDED
                      const feeToken = getTokenForChainIdAndDenom(
                        chain_id,
                        denom
                      )

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
                                cannotExecuteUntilFunded
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
                                loading={!!fundingRelayer[chain_id]}
                                onClick={() => fundRelayer(chain_id, isExecute)}
                              >
                                {walletCannotAfford
                                  ? t('error.insufficientFunds')
                                  : isExecute
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
                                amount={convertMicroDenomToDenomWithDecimals(
                                  funds,
                                  feeToken.decimals
                                )}
                                decimals={feeToken.decimals}
                                symbol={feeToken.symbol}
                              />

                              <Tooltip title={t('info.funded')}>
                                <Check className="!h-4 !w-4 text-icon-interactive-valid" />
                              </Tooltip>
                            </div>
                          )}
                        </Fragment>
                      )
                    }
                  )}
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
                  <p className="text-text-interactive-error">{relayError}</p>

                  <div className="flex grow flex-row justify-end">
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
                    onClick={refundAllRelayers}
                    size="sm"
                  >
                    {t('button.retry')}
                  </Button>
                )}
              </div>
            ),
          },
          {
            label: t('title.success'),
            content: () => (
              <div className="flex flex-row flex-wrap items-center justify-between gap-x-8 gap-y-4">
                <p>The execution and relay succeeded.</p>

                <Button
                  onClick={() => {
                    onSuccess()
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
