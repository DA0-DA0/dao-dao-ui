import { Chain } from '@chain-registry/types'
import { AckWithMetadata } from '@confio/relayer/build/lib/endpoint'
import { IbcClient } from '@confio/relayer/build/lib/ibcclient'
import { Link } from '@confio/relayer/build/lib/link'
import { parsePacketsFromTendermintEvents } from '@confio/relayer/build/lib/utils'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { GasPrice, calculateFee, coins } from '@cosmjs/stargate'
import { Check, Close, Send, Verified } from '@mui/icons-material'
import { ConnectedWallet, useConnectWalletToChain } from '@noahsaso/cosmodal'
import uniq from 'lodash.uniq'
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilCallback, waitForAll } from 'recoil'

import {
  nativeDenomBalanceSelector,
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
  POLYTONE_NOTES,
  convertMicroDenomToDenomWithDecimals,
  getChainForChainId,
  getImageUrlForChainId,
  getRpcForChainId,
  getTokenForChainIdAndDenom,
  processError,
} from '@dao-dao/utils'

enum RelayStatus {
  Uninitialized,
  Initializing,
  Funding,
  Executing,
  Relaying,
  Refunding,
  Success,
  ExecuteOrRelayErrored,
}

// TODO: Figure out how much each relayer needs to pay for gas.
const RELAYER_ALLOWANCE = 100000

type Relayer = {
  chain: Chain
  chainImageUrl: string
  feeToken: {
    denom: string
    average_gas_price?: number
  }
  wallet: ConnectedWallet
  relayerAddress: string
  client: IbcClient
  // Will be loaded for receiving chains only. The current chain will not have a
  // polytone note since it is just responsible for sending packets.
  polytoneNote?: PolytoneNote
}

export const SelfRelayExecuteModal = ({
  uniqueId,
  chainIds: _chainIds,
  execute,
  onSuccess,
  ...modalProps
}: SelfRelayExecuteModalProps) => {
  const mnemonicKey = `relayer_mnemonic_${uniqueId}`

  // Current chain.
  const { chain_id: currentChainId } = useChain()

  // All chains, including current.
  const chains = uniq([currentChainId, ..._chainIds]).map(getChainForChainId)
  const connectWalletToChain = useConnectWalletToChain()

  const [status, setStatus] = useState<RelayStatus>(RelayStatus.Uninitialized)
  const [relayers, setRelayers] = useState<Relayer[]>()

  // Relayer chain IDs currently being funded.
  const [fundingRelayer, setFundingRelayer] = useState<Record<string, boolean>>(
    {}
  )
  const [executeResult, setExecuteResult] = useState<ExecuteResult>()
  const [relaying, setRelaying] = useState<{
    type: 'packet' | 'ack'
    relayer: Relayer
  }>()
  // Relayer chain IDs currently being refunded.
  const [refundingRelayer, setRefundingRelayer] = useState<
    Record<string, boolean>
  >({})
  // Amount refunded once refunding is complete.
  const [refundedAmount, setRefundedAmount] = useState<
    Record<string, number | undefined>
  >({})

  // When the modal is closed, reset state.
  useEffect(() => {
    if (modalProps.visible) {
      return
    }

    // Reset state after a short delay to allow the modal to close.
    setTimeout(() => {
      setStatus(RelayStatus.Uninitialized)
      setRelayers(undefined)
      setFundingRelayer({})
      setExecuteResult(undefined)
      setRefundingRelayer({})
      setRefundedAmount({})
      setRelaying(undefined)
    }, 500)
  }, [modalProps.visible])

  // Prevent accidentally closing the tab/window in the middle of the process.
  useEffect(() => {
    if (
      status === RelayStatus.Uninitialized ||
      status === RelayStatus.Success
    ) {
      return
    }

    const listener = (event: BeforeUnloadEvent) => {
      event.returnValue =
        'Make sure you have completed the relaying process, or you may lose the tokens you sent to the relayers to pay fees.'
    }

    window.addEventListener('beforeunload', listener)
    return () => window.removeEventListener('beforeunload', listener)
  })

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
          // TODO: Figure out how much each relayer needs to pay for gas.
          ({ amount }) => Number(amount) >= RELAYER_ALLOWANCE
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
  const allRelayersFunded =
    !relayerFunds.loading &&
    !relayerFunds.errored &&
    // TODO: Figure out how much each relayer needs to pay for gas.
    relayerFunds.data.every(({ amount }) => amount !== '0')

  const setupRelayer = async () => {
    if (status !== RelayStatus.Uninitialized) {
      toast.error('Relayer already set up')
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
          const chainImageUrl = getImageUrlForChainId(chain.chain_id)
          if (!chainImageUrl) {
            throw new Error('Chain image URL not found')
          }

          const feeToken = chain.fees?.fee_tokens[0]
          if (!feeToken) {
            throw new Error('Fee token not found')
          }

          const polytoneNote = POLYTONE_NOTES[chain.chain_id]
          // Only the receiving chains need polytone notes. The current chain is
          // just responsible for sending.
          if (chain.chain_id !== currentChainId && !polytoneNote) {
            throw new Error('Polytone note not found')
          }

          // Connect wallet to chain so we can send tokens.
          const wallet = await connectWalletToChain(chain.chain_id)

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
            wallet,
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
  const fundRelayer = async (chainId: string) => {
    if (!walletCanAffordAllRelayers) {
      toast.error('Not enough funds in wallet')
      return
    }

    if (!relayers || status !== RelayStatus.Funding) {
      toast.error('Relayer not set up')
      return
    }

    const relayer = relayers.find(({ chain }) => chainId === chain.chain_id)
    if (!relayer) {
      toast.error('Relayer not found')
      return
    }

    setFundingRelayer((prev) => ({
      ...prev,
      [chainId]: true,
    }))
    try {
      // Send tokens to relayer wallet.
      await relayer.wallet.signingStargateClient.sendTokens(
        relayer.wallet.address,
        relayer.relayerAddress,
        // TODO: Calculate fees needed better.
        coins(RELAYER_ALLOWANCE, relayer.feeToken.denom),
        'auto'
      )
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

  const relay = async () => {
    if (
      !relayers ||
      status !== RelayStatus.Funding ||
      !allRelayersFunded ||
      !mnemonicKey
    ) {
      return
    }

    try {
      // Execute the TX and parse the packets from the events.
      setStatus(RelayStatus.Executing)

      // If already executed, don't execute again. This may happen if packets or
      // acks fail to relay.
      let execResult = executeResult
      if (!execResult) {
        execResult = await execute()
        setExecuteResult(execResult)
      }

      const packets = parsePacketsFromTendermintEvents(execResult.events).map(
        (packet) => ({
          packet,
          height: execResult!.height,
        })
      )

      // Wait a few seconds for the TX to be indexed.
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Loop over all chains and relay packets.
      setStatus(RelayStatus.Relaying)

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
          return
        }

        // Get packets for this chain.
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

        // Relay packets and get acks. Try 3 times.
        let acks: AckWithMetadata[] | undefined
        let tries = 3
        while (tries) {
          try {
            acks = await link.relayPackets('A', thesePackets)
            break
          } catch (err) {
            tries -= 1

            console.error(
              `Failed to relay packets to ${chain.chain_id}.${
                tries > 0 ? ' Trying again...' : ''
              }`,
              err
            )

            // If no more tries, rethrow error.
            if (tries === 0) {
              throw err
            }

            // Wait a second before trying again.
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        }

        // Type-check. Logic above should ensure it is defined or an error is
        // thrown.
        if (!acks) {
          throw new Error('Failed to relay packets and get acks')
        }

        // Wait a few seconds for the packets to be indexed.
        await new Promise((resolve) => setTimeout(resolve, 3000))

        setRelaying({
          type: 'ack',
          relayer,
        })

        // Relay acks. Try 3 times.
        tries = 3
        while (tries) {
          try {
            await link.relayAcks('B', acks)
            break
          } catch (err) {
            tries -= 1

            console.error(
              `Failed to relay acks from ${chain.chain_id}.${
                tries > 0 ? ' Trying again...' : ''
              }`,
              err
            )

            // If no more tries, rethrow error.
            if (tries === 0) {
              throw err
            }

            // Wait a second before trying again.
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        }
      }, Promise.resolve())

      // If packets and acks were relayed successfully, execute was successful.
      setExecuteResult(undefined)
      setRelaying(undefined)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
      setStatus(RelayStatus.ExecuteOrRelayErrored)
      return
    } finally {
      // Refresh all balances.
      relayers.map(refreshBalances)
    }

    // If relay was successful, refund.
    try {
      // Send fee tokens remaining in the relayer wallets back to the user.
      setStatus(RelayStatus.Refunding)

      await Promise.all(
        relayers.map(({ chain }) => refundRelayer(chain.chain_id))
      )

      // Clear mnemonic from local storage since all wallets should be empty now
      // (if all refunds completed successfully).
      localStorage.removeItem(mnemonicKey)

      setStatus(RelayStatus.Success)
      setTimeout(() => onSuccess(), 2000)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    }
  }

  // Return remaining tokens from IBC client relayer wallet back to user.
  const refundRelayer = async (chainId: string) => {
    const relayer = relayers?.find(({ chain }) => chain.chain_id === chainId)
    if (!relayer) {
      toast.error('Relayer not found')
      return
    }

    const { chain, client, relayerAddress, wallet } = relayer

    const feeDenom = chain.fees?.fee_tokens[0]?.denom
    if (!feeDenom) {
      toast.error('Fee token not found')
      return
    }

    setRefundingRelayer((prev) => ({
      ...prev,
      [chainId]: true,
    }))
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
          {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: {
              fromAddress: relayerAddress,
              toAddress: wallet.address,
              amount: [remainingTokens],
            },
          },
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
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setRefundingRelayer((prev) => ({
        ...prev,
        [chainId]: false,
      }))
      refreshBalances(relayer)
    }
  }

  const RelayIcon = !relaying || relaying.type === 'packet' ? Send : Verified

  return (
    <Modal
      containerClassName="w-full !max-w-lg"
      header={{
        title: 'Self Relay',
      }}
      {...modalProps}
      onClose={
        // Only allow closing if execution and relaying has not begun or if it
        // was successful. This prevents accidentally closing the modal in the
        // middle of the process.
        status === RelayStatus.Uninitialized ||
        status === RelayStatus.Initializing ||
        status === RelayStatus.Funding ||
        status === RelayStatus.Success
          ? modalProps.onClose
          : undefined
      }
    >
      <SteppedWalkthrough
        className="w-full"
        stepIndex={
          status === RelayStatus.Uninitialized ||
          status === RelayStatus.Initializing
            ? 0
            : status === RelayStatus.Funding && !allRelayersFunded
            ? 1
            : (status === RelayStatus.Funding && allRelayersFunded) ||
              status === RelayStatus.Executing ||
              status === RelayStatus.Relaying
            ? 2
            : status !== RelayStatus.Success
            ? 3
            : 4
        }
        steps={[
          {
            label: 'Start',
            content: () => (
              <div className="flex flex-col gap-4">
                <p>
                  To execute this proposal, you must relay the packet from the
                  source chain to the destination chain or chains.
                </p>

                <p>
                  A new relayer wallet will be created, which you will have to
                  fund with tokens to pay transaction fees on all chains.
                </p>

                <p>
                  Once the relaying process is complete, the remaining tokens
                  will be sent back to your wallet.
                </p>

                <Button
                  center
                  className="self-end"
                  loading={status === RelayStatus.Initializing}
                  onClick={setupRelayer}
                >
                  Begin
                </Button>
              </div>
            ),
          },
          {
            label: 'Fund relayer',
            content: () => (
              <div className="flex flex-col gap-4">
                <p>
                  Fund the relayer wallet with tokens to pay transaction fees on
                  each chain.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  {relayers?.map(
                    (
                      {
                        chain: { chain_id, pretty_name },
                        chainImageUrl,
                        feeToken: { denom },
                      },
                      index
                    ) => {
                      const walletCannotAfford =
                        !walletFunds.loading &&
                        !(walletFundsSufficient?.[index] ?? false)

                      const funds =
                        !relayerFunds.loading && !relayerFunds.errored
                          ? Number(relayerFunds.data[index].amount)
                          : 0
                      // TODO: Figure out how much each relayer needs to pay for gas.
                      const funded = funds > 0
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
                              {pretty_name}
                            </p>
                          </div>

                          {funded ? (
                            <div className="flex items-center justify-end gap-2">
                              <TokenAmountDisplay
                                amount={convertMicroDenomToDenomWithDecimals(
                                  funds,
                                  feeToken.decimals
                                )}
                                decimals={feeToken.decimals}
                                iconUrl={feeToken.imageUrl}
                                symbol={feeToken.symbol}
                              />

                              <Tooltip title="Funded">
                                <Check className="!h-4 !w-4 text-icon-interactive-valid" />
                              </Tooltip>
                            </div>
                          ) : (
                            <Button
                              center
                              className="w-36 justify-self-end"
                              disabled={walletCannotAfford}
                              loading={!!fundingRelayer[chain_id]}
                              onClick={() => fundRelayer(chain_id)}
                            >
                              {walletCannotAfford
                                ? 'Insufficient funds'
                                : 'Fund'}
                            </Button>
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
              status === RelayStatus.ExecuteOrRelayErrored ? Close : undefined,
            iconContainerClassName:
              status === RelayStatus.ExecuteOrRelayErrored
                ? '!bg-icon-interactive-error'
                : undefined,
            label: 'Execute and Relay',
            content: () => (
              <>
                {status !== RelayStatus.Relaying ? (
                  <Button
                    center
                    loading={status === RelayStatus.Executing}
                    onClick={relay}
                  >
                    Go
                  </Button>
                ) : (
                  relayers &&
                  relaying && (
                    <FlyingAnimation
                      destination={
                        <Tooltip title={relaying.relayer.chain.pretty_name}>
                          <div
                            className="h-8 w-8 rounded-full bg-background-base bg-contain bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${relaying.relayer.chainImageUrl})`,
                            }}
                          ></div>
                        </Tooltip>
                      }
                      flyer={
                        <RelayIcon className="text-icon-interactive-primary !h-5 !w-5" />
                      }
                      reversed={relaying.type === 'ack'}
                      source={
                        // First chain is current source chain.
                        <Tooltip title={relayers[0].chain.pretty_name}>
                          <div
                            className="h-8 w-8 rounded-full bg-background-base bg-contain bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${relayers[0].chainImageUrl})`,
                            }}
                          ></div>
                        </Tooltip>
                      }
                    />
                  )
                )}
              </>
            ),
          },
          {
            label: 'Refund',
            // Show when this step is current or past. This makes sure the
            // refund balances are visible once the success step is reached.
            overrideShowStepContentStatuses: ['current', 'past'],
            content: () => (
              <div className="flex flex-col gap-4">
                <p>
                  Refund your wallet with the remaining tokens from the relayer
                  wallet.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  {relayers?.map(
                    (
                      {
                        chain: { chain_id, pretty_name },
                        chainImageUrl,
                        feeToken: { denom },
                      },
                      index
                    ) => {
                      const empty =
                        !relayerFunds.loading &&
                        !relayerFunds.errored &&
                        relayerFunds.data[index].amount === '0'

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
                              {pretty_name}
                            </p>
                          </div>

                          {refunded > 0 ? (
                            <div className="flex items-center justify-end gap-2">
                              <TokenAmountDisplay
                                amount={convertMicroDenomToDenomWithDecimals(
                                  refunded,
                                  feeToken.decimals
                                )}
                                decimals={feeToken.decimals}
                                iconUrl={feeToken.imageUrl}
                                symbol={feeToken.symbol}
                              />

                              <Tooltip title="Refunded">
                                <Check className="!h-4 !w-4 text-icon-interactive-valid" />
                              </Tooltip>
                            </div>
                          ) : (
                            <Button
                              center
                              className="w-36 justify-self-end"
                              disabled={
                                // Only allow manually refunding if errored,
                                // since it will try to refund automatically
                                // when relaying is done.
                                status !== RelayStatus.ExecuteOrRelayErrored ||
                                empty
                              }
                              loading={!!refundingRelayer[chain_id]}
                              onClick={() => refundRelayer(chain_id)}
                              variant={empty ? 'secondary' : 'primary'}
                            >
                              {empty ? 'Empty' : 'Refund'}
                            </Button>
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
            label: 'Success',
            content: () => <Loader />,
          },
        ]}
        textClassName="!title-text"
      />
    </Modal>
  )
}
