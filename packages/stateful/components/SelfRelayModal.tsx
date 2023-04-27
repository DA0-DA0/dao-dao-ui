import { IbcClient } from '@confio/relayer/build/lib/ibcclient'
import { Link } from '@confio/relayer/build/lib/link'
import { parsePacketsFromTendermintEvents } from '@confio/relayer/build/lib/utils'
import { GasPrice } from '@cosmjs/stargate'
import { useWallet } from '@noahsaso/cosmodal'

import { Button, Modal, ModalProps } from '@dao-dao/stateless'
import { getChainForChainId, getRpcForChainId } from '@dao-dao/utils'

export type SelfRelayModalProps = Pick<ModalProps, 'onClose' | 'visible'> & {
  chainIdA: string
  connectionA: string
  chainIdB: string
  connectionB: string
  // Information to identify what packet to relay.
  filter: {
    blockHeight: number
    executedContract: string
    sender: string
  }
}

export const SelfRelayModal = ({
  chainIdA,
  connectionA,
  chainIdB,
  connectionB,
  filter,
  ...modalProps
}: SelfRelayModalProps) => {
  const chainA = getChainForChainId(chainIdA)
  const chainAFeeToken = chainA.fees?.fee_tokens[0]
  const chainB = getChainForChainId(chainIdB)
  const chainBFeeToken = chainB.fees?.fee_tokens[0]
  const { offlineSigner: signerA, address: addressA } = useWallet(chainIdA)
  const { offlineSigner: signerB, address: addressB } = useWallet(chainIdB)

  const relay = async () => {
    if (
      !signerA ||
      !addressA ||
      !chainAFeeToken ||
      !signerB ||
      !addressB ||
      !chainBFeeToken
    ) {
      return
    }

    const clientA = await IbcClient.connectWithSigner(
      getRpcForChainId(chainIdA),
      signerA,
      addressA,
      {
        // How long it waits in between checking for a new block.
        estimatedBlockTime: 3000,
        // How long it waits until looking for acks.
        estimatedIndexerTime: 3000,
        gasPrice: GasPrice.fromString(
          `${chainAFeeToken.average_gas_price ?? 0}${chainAFeeToken.denom}`
        ),
      }
    )

    const clientB = await IbcClient.connectWithSigner(
      getRpcForChainId(chainIdB),
      signerB,
      addressB,
      {
        // How long it waits in between checking for a new block.
        estimatedBlockTime: 3000,
        // How long it waits until looking for acks.
        estimatedIndexerTime: 3000,
        gasPrice: GasPrice.fromString(
          `${chainBFeeToken.average_gas_price ?? 0}${chainBFeeToken.denom}`
        ),
      }
    )

    const link = await Link.createWithExistingConnections(
      clientA,
      clientB,
      connectionA,
      connectionB
    )

    // Get specific packets from the TX we care about and relay them.
    const packetsA = await link.endA.client.tm.txSearchAll({
      query: `send_packet.packet_connection='${connectionA}' AND tx.height=${filter.blockHeight} AND execute._contract_address='${filter.executedContract}' AND message.sender='${filter.sender}'`,
    })
    const packets = packetsA.txs.flatMap(({ result: { events }, height }) =>
      parsePacketsFromTendermintEvents(events).map((packet) => ({
        packet,
        height,
      }))
    )
    const acks = await link.relayPackets('A', packets)
    // Relay acks back to chain A.
    await link.relayAcks('B', acks)
  }

  return (
    <Modal {...modalProps}>
      <Button onClick={() => relay()}>Relay</Button>
    </Modal>
  )
}
