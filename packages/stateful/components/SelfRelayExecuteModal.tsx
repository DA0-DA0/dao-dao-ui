import { Chain } from '@chain-registry/types'
import { AckWithMetadata } from '@confio/relayer/build/lib/endpoint'
import { IbcClient } from '@confio/relayer/build/lib/ibcclient'
import { Link } from '@confio/relayer/build/lib/link'
import { parsePacketsFromTendermintEvents } from '@confio/relayer/build/lib/utils'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { GasPrice, calculateFee, coins } from '@cosmjs/stargate'
import { ConnectedWallet, useConnectWalletToChain } from '@noahsaso/cosmodal'
import uniq from 'lodash.uniq'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilCallback, waitForAll } from 'recoil'

import {
  nativeDenomBalanceSelector,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state/recoil'
import {
  Button,
  Modal,
  useCachedLoadingWithError,
  useChain,
} from '@dao-dao/stateless'
import { PolytoneNote, SelfRelayExecuteModalProps } from '@dao-dao/types'
import {
  POLYTONE_NOTES,
  getChainForChainId,
  getRpcForChainId,
  processError,
} from '@dao-dao/utils'

enum RelayStatus {
  Uninitialized = 'Uninitialized',
  Initializing = 'Initializing',
  Funding = 'Funding',
  Executing = 'Executing',
  RelayingPackets = 'Relaying packets',
  RelayingAcks = 'Relaying acks',
  Refunding = 'Refunding',
  Success = 'Success',
  Error = 'Error',
}

// TODO: Figure out how much each relayer needs to pay for gas.
const RELAYER_ALLOWANCE = 100000

type Relayer = {
  chain: Chain
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
  chainIds: _chainIds,
  execute,
  onSuccess,
  ...modalProps
}: SelfRelayExecuteModalProps) => {
  // Current chain.
  const { chain_id: currentChainId } = useChain()

  // All chains, including current.
  const chains = uniq([currentChainId, ..._chainIds]).map(getChainForChainId)
  const connectWalletToChain = useConnectWalletToChain()

  const [status, setStatus] = useState<RelayStatus>(RelayStatus.Uninitialized)
  const [mnemonicKey, setMnemonicKey] = useState<string>()
  const [relayers, setRelayers] = useState<Relayer[]>()

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
  // If wallet has enough funds to fund all relayers.
  const walletCanAffordAllRelayers =
    walletFunds.loading ||
    (!walletFunds.errored &&
      // TODO: Figure out how much each relayer needs to pay for gas.
      walletFunds.data.every(
        ({ amount }) => Number(amount) >= RELAYER_ALLOWANCE
      ))

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
    if (!walletCanAffordAllRelayers) {
      toast.error('Not enough funds in wallet')
      return
    }

    if (status !== RelayStatus.Uninitialized) {
      toast.error('Relayer already set up')
      return
    }

    setStatus(RelayStatus.Initializing)
    try {
      // Create a new relayer wallet and get a signer for each chain.
      const mnemonic = (await DirectSecp256k1HdWallet.generate(24)).mnemonic

      const relayers = await Promise.all(
        chains.map(async (chain): Promise<Relayer> => {
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
            feeToken,
            wallet,
            relayerAddress,
            client,
            polytoneNote,
          }
        })
      )

      // Save mnemonic in case of an error.
      const mnemonicKey = `relayer_mnemonic_${Date.now()}`
      localStorage.setItem(mnemonicKey, mnemonic)
      // TODO: remove
      console.log(mnemonic)

      setRelayers(relayers)
      setMnemonicKey(mnemonicKey)
      setStatus(RelayStatus.Funding)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
      setStatus(RelayStatus.Error)
      return
    }
  }

  // Relayer chain IDs currently being funded.
  const [fundingRelayer, setFundingRelayer] = useState<Record<string, boolean>>(
    {}
  )
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

  const [executeResult, setExecuteResult] = useState<ExecuteResult>()
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

      // Loop over all chains and relay packets.
      setStatus(RelayStatus.RelayingPackets)

      // First relayer is current chain that is sending packets. The rest of the
      // relayers are the chains that are receiving packets. Relay packets
      // sequentially, one chain at a time, since a wallet can only submit one
      // TX at a time.
      const linksAndAcks = await relayers.slice(1).reduce(
        async (prev, { client, polytoneNote }) => {
          const curr = await prev

          // Type-check, should never happen since we slice off the first
          // (current chain) relayer, which is just responsible for sending.
          if (!polytoneNote) {
            return curr
          }

          // Get packets for this chain.
          const thesePackets = packets.filter(
            ({ packet }) =>
              packet.sourcePort === `wasm.${polytoneNote.note}` &&
              packet.sourceChannel === polytoneNote.localChannel &&
              packet.destinationChannel === polytoneNote.remoteChannel
          )
          if (!thesePackets.length) {
            return curr
          }

          const link = await Link.createWithExistingConnections(
            // First relayer is current chain sending packets.
            relayers[0].client,
            client,
            polytoneNote.localConnection,
            polytoneNote.remoteConnection
          )

          // Relay packets and get acks.
          const acks = await link.relayPackets('A', packets)

          return [
            ...curr,
            {
              link,
              acks,
            },
          ]
        },
        Promise.resolve(
          [] as {
            link: Link
            acks: AckWithMetadata[]
          }[]
        )
      )

      // Relay acks back to current chain. Relay acks sequentially, one chain at
      // a time, since a wallet can only submit one TX at a time.
      setStatus(RelayStatus.RelayingAcks)
      await linksAndAcks.reduce(async (prev, { link, acks }) => {
        await prev
        await link.relayAcks('B', acks)
      }, Promise.resolve())

      // Send fee tokens remaining in the relayer wallets back to the user.
      setStatus(RelayStatus.Refunding)
      // If packets and acks were relayed successfully, execute was successful.
      setExecuteResult(undefined)

      await Promise.all(
        relayers.map(({ chain }) => refundRelayer(chain.chain_id))
      )

      // Clear mnemonic from local storage since they should be empty now.
      localStorage.removeItem(mnemonicKey)

      setStatus(RelayStatus.Success)

      onSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
      setStatus(RelayStatus.Error)
    } finally {
      // Refresh all balances.
      relayers.map(refreshBalances)
    }
  }

  // Relayer chain IDs currently being refunded.
  const [refundingRelayer, setRefundingRelayer] = useState<
    Record<string, boolean>
  >({})
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

  return (
    <Modal
      header={{
        title: 'Self Relay',
      }}
      {...modalProps}
      onClose={
        // Only allow closing at the beginning or end of the process. This
        // prevents accidentally closing the modal in the middle of the process.
        status === RelayStatus.Uninitialized || status === RelayStatus.Success
          ? modalProps.onClose
          : undefined
      }
    >
      {walletCanAffordAllRelayers ? (
        <div className="flex flex-col gap-4">
          <p className="title-text">1. Set up</p>
          <Button
            center
            disabled={status !== RelayStatus.Uninitialized}
            loading={status === RelayStatus.Initializing}
            onClick={setupRelayer}
          >
            Setup Relayer
          </Button>

          {/* Funding */}
          <p className="title-text">2. Fund</p>
          <div className="flex flex-row items-stretch justify-between gap-4">
            {chains.map(({ chain_id, pretty_name }, index) => {
              const funded =
                !relayerFunds.loading &&
                !relayerFunds.errored &&
                // TODO: Figure out how much each relayer needs to pay for gas.
                relayerFunds.data[index].amount !== '0'

              return (
                <Button
                  key={chain_id}
                  disabled={status !== RelayStatus.Funding || funded}
                  loading={!!fundingRelayer[chain_id]}
                  onClick={() => fundRelayer(chain_id)}
                >
                  {pretty_name}
                  {funded && ' (Funded)'}
                </Button>
              )
            })}
          </div>

          {/* Relay */}
          <p className="title-text">3. Go</p>
          <Button
            center
            disabled={status !== RelayStatus.Funding || !allRelayersFunded}
            loading={
              status === RelayStatus.Executing ||
              status === RelayStatus.RelayingPackets ||
              status === RelayStatus.RelayingAcks
            }
            onClick={relay}
          >
            Execute and Relay
          </Button>

          {/* Refund */}
          <p className="title-text">4. Refund</p>
          <div className="flex flex-row items-stretch justify-between gap-4">
            {chains.map(({ chain_id, pretty_name }, index) => {
              const empty =
                !relayerFunds.loading &&
                !relayerFunds.errored &&
                relayerFunds.data[index].amount === '0'

              return (
                <Button
                  key={chain_id}
                  disabled={
                    // Only allow manually refunding if errored, since it will
                    // try to refund automatically when relaying is done.
                    status !== RelayStatus.Error || empty
                  }
                  loading={!!refundingRelayer[chain_id]}
                  onClick={() => refundRelayer(chain_id)}
                >
                  {pretty_name}
                  {empty && ' (Refunded)'}
                </Button>
              )
            })}
          </div>

          <div className="mt-4">
            <p className="title-text">Status</p>
            <p className="body-text">{status}</p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-text-interactive-error">
            Insufficient funds to relay.
          </p>
        </>
      )}
    </Modal>
  )
}
