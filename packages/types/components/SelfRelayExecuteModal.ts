import { UnifiedCosmosMsg } from '../contracts'
import { CrossChainPacketInfo } from '../proposal'
import { ModalProps } from './Modal'

export type SelfRelayExecuteModalProps = Pick<
  ModalProps,
  'onClose' | 'visible'
> & {
  // Uniquely identify the self-relay execution. This is likely a proposal
  // module address and proposal ID. This is used to cache the relayer mnemonic
  // locally in case something goes wrong during the process. It will try to
  // load the same mnemonic again if the user tries to self-relay and execute
  // the same unique ID.
  uniqueId: string
  // All chain IDs that will receive an IBC packet.
  chainIds: string[]
  // Cross-chain packets that contain the packets that need self-relaying.
  crossChainPackets: CrossChainPacketInfo[]
  // Information on how to find the transaction to relay packets from.
  transaction: SelfRelayTransaction
  // Called when the self-relay execution is successful and all relayer wallets
  // refund the original wallet.
  onSuccess: () => void
}

export type SelfRelayTransaction =
  | {
      type: 'execute'
      // CosmWasm-formatted messages to execute that will create IBC packets
      // that need self-relaying.
      msgs: UnifiedCosmosMsg[]
    }
  | {
      type: 'exists'
      // The transaction hash of the transaction that created the IBC packets
      // that need self-relaying.
      hash: string
    }
