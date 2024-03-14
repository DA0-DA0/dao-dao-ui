import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
/**
 * Emitted when an attester is enabled
 * @param attester newly enabled attester
 */
export interface AttesterEnabled {
  attester: string;
}
export interface AttesterEnabledProtoMsg {
  typeUrl: "/circle.cctp.v1.AttesterEnabled";
  value: Uint8Array;
}
/**
 * Emitted when an attester is enabled
 * @param attester newly enabled attester
 */
export interface AttesterEnabledAmino {
  attester?: string;
}
export interface AttesterEnabledAminoMsg {
  type: "/circle.cctp.v1.AttesterEnabled";
  value: AttesterEnabledAmino;
}
/**
 * Emitted when an attester is enabled
 * @param attester newly enabled attester
 */
export interface AttesterEnabledSDKType {
  attester: string;
}
/**
 * Emitted when an attester is disabled
 * @param attester newly disabled attester
 */
export interface AttesterDisabled {
  attester: string;
}
export interface AttesterDisabledProtoMsg {
  typeUrl: "/circle.cctp.v1.AttesterDisabled";
  value: Uint8Array;
}
/**
 * Emitted when an attester is disabled
 * @param attester newly disabled attester
 */
export interface AttesterDisabledAmino {
  attester?: string;
}
export interface AttesterDisabledAminoMsg {
  type: "/circle.cctp.v1.AttesterDisabled";
  value: AttesterDisabledAmino;
}
/**
 * Emitted when an attester is disabled
 * @param attester newly disabled attester
 */
export interface AttesterDisabledSDKType {
  attester: string;
}
/**
 * Emitted when threshold number of attestations (m in m/n multisig) is updated
 * @param old_signature_threshold old signature threshold
 * @param new_signature_threshold new signature threshold
 */
export interface SignatureThresholdUpdated {
  oldSignatureThreshold: bigint;
  newSignatureThreshold: bigint;
}
export interface SignatureThresholdUpdatedProtoMsg {
  typeUrl: "/circle.cctp.v1.SignatureThresholdUpdated";
  value: Uint8Array;
}
/**
 * Emitted when threshold number of attestations (m in m/n multisig) is updated
 * @param old_signature_threshold old signature threshold
 * @param new_signature_threshold new signature threshold
 */
export interface SignatureThresholdUpdatedAmino {
  old_signature_threshold?: string;
  new_signature_threshold?: string;
}
export interface SignatureThresholdUpdatedAminoMsg {
  type: "/circle.cctp.v1.SignatureThresholdUpdated";
  value: SignatureThresholdUpdatedAmino;
}
/**
 * Emitted when threshold number of attestations (m in m/n multisig) is updated
 * @param old_signature_threshold old signature threshold
 * @param new_signature_threshold new signature threshold
 */
export interface SignatureThresholdUpdatedSDKType {
  old_signature_threshold: bigint;
  new_signature_threshold: bigint;
}
/**
 * Emitted when owner address is updated
 * @param previous_owner representing the address of the previous owner
 * @param new_owner representing the address of the new owner
 */
export interface OwnerUpdated {
  previousOwner: string;
  newOwner: string;
}
export interface OwnerUpdatedProtoMsg {
  typeUrl: "/circle.cctp.v1.OwnerUpdated";
  value: Uint8Array;
}
/**
 * Emitted when owner address is updated
 * @param previous_owner representing the address of the previous owner
 * @param new_owner representing the address of the new owner
 */
export interface OwnerUpdatedAmino {
  previous_owner?: string;
  new_owner?: string;
}
export interface OwnerUpdatedAminoMsg {
  type: "/circle.cctp.v1.OwnerUpdated";
  value: OwnerUpdatedAmino;
}
/**
 * Emitted when owner address is updated
 * @param previous_owner representing the address of the previous owner
 * @param new_owner representing the address of the new owner
 */
export interface OwnerUpdatedSDKType {
  previous_owner: string;
  new_owner: string;
}
/**
 * Emitted when starting the two stage transfer ownership process
 * @param previousOwner representing the address of the previous owner
 * @param newOwner representing the address of the new owner
 */
export interface OwnershipTransferStarted {
  previousOwner: string;
  newOwner: string;
}
export interface OwnershipTransferStartedProtoMsg {
  typeUrl: "/circle.cctp.v1.OwnershipTransferStarted";
  value: Uint8Array;
}
/**
 * Emitted when starting the two stage transfer ownership process
 * @param previousOwner representing the address of the previous owner
 * @param newOwner representing the address of the new owner
 */
export interface OwnershipTransferStartedAmino {
  previous_owner?: string;
  new_owner?: string;
}
export interface OwnershipTransferStartedAminoMsg {
  type: "/circle.cctp.v1.OwnershipTransferStarted";
  value: OwnershipTransferStartedAmino;
}
/**
 * Emitted when starting the two stage transfer ownership process
 * @param previousOwner representing the address of the previous owner
 * @param newOwner representing the address of the new owner
 */
export interface OwnershipTransferStartedSDKType {
  previous_owner: string;
  new_owner: string;
}
/**
 * Emitted when pauser address is updated
 * @param previous_pauser representing the address of the previous pauser
 * @param new_pauser representing the address of the new pauser
 */
export interface PauserUpdated {
  previousPauser: string;
  newPauser: string;
}
export interface PauserUpdatedProtoMsg {
  typeUrl: "/circle.cctp.v1.PauserUpdated";
  value: Uint8Array;
}
/**
 * Emitted when pauser address is updated
 * @param previous_pauser representing the address of the previous pauser
 * @param new_pauser representing the address of the new pauser
 */
export interface PauserUpdatedAmino {
  previous_pauser?: string;
  new_pauser?: string;
}
export interface PauserUpdatedAminoMsg {
  type: "/circle.cctp.v1.PauserUpdated";
  value: PauserUpdatedAmino;
}
/**
 * Emitted when pauser address is updated
 * @param previous_pauser representing the address of the previous pauser
 * @param new_pauser representing the address of the new pauser
 */
export interface PauserUpdatedSDKType {
  previous_pauser: string;
  new_pauser: string;
}
/**
 * Emitted when attester manager address is updated
 * @param previous_attester_manager representing the address of the previous
 * attester manager
 * @param new_attester_manager representing the address of the new attester
 * manager
 */
export interface AttesterManagerUpdated {
  previousAttesterManager: string;
  newAttesterManager: string;
}
export interface AttesterManagerUpdatedProtoMsg {
  typeUrl: "/circle.cctp.v1.AttesterManagerUpdated";
  value: Uint8Array;
}
/**
 * Emitted when attester manager address is updated
 * @param previous_attester_manager representing the address of the previous
 * attester manager
 * @param new_attester_manager representing the address of the new attester
 * manager
 */
export interface AttesterManagerUpdatedAmino {
  previous_attester_manager?: string;
  new_attester_manager?: string;
}
export interface AttesterManagerUpdatedAminoMsg {
  type: "/circle.cctp.v1.AttesterManagerUpdated";
  value: AttesterManagerUpdatedAmino;
}
/**
 * Emitted when attester manager address is updated
 * @param previous_attester_manager representing the address of the previous
 * attester manager
 * @param new_attester_manager representing the address of the new attester
 * manager
 */
export interface AttesterManagerUpdatedSDKType {
  previous_attester_manager: string;
  new_attester_manager: string;
}
/**
 * Emitted when token controller address is updated
 * @param previous_token_controller representing the address of the previous
 * token controller
 * @param new_token_controller representing the address of the new token
 * controller
 */
export interface TokenControllerUpdated {
  previousTokenController: string;
  newTokenController: string;
}
export interface TokenControllerUpdatedProtoMsg {
  typeUrl: "/circle.cctp.v1.TokenControllerUpdated";
  value: Uint8Array;
}
/**
 * Emitted when token controller address is updated
 * @param previous_token_controller representing the address of the previous
 * token controller
 * @param new_token_controller representing the address of the new token
 * controller
 */
export interface TokenControllerUpdatedAmino {
  previous_token_controller?: string;
  new_token_controller?: string;
}
export interface TokenControllerUpdatedAminoMsg {
  type: "/circle.cctp.v1.TokenControllerUpdated";
  value: TokenControllerUpdatedAmino;
}
/**
 * Emitted when token controller address is updated
 * @param previous_token_controller representing the address of the previous
 * token controller
 * @param new_token_controller representing the address of the new token
 * controller
 */
export interface TokenControllerUpdatedSDKType {
  previous_token_controller: string;
  new_token_controller: string;
}
/** Emitted when burning and minting tokens is paused */
export interface BurningAndMintingPausedEvent {}
export interface BurningAndMintingPausedEventProtoMsg {
  typeUrl: "/circle.cctp.v1.BurningAndMintingPausedEvent";
  value: Uint8Array;
}
/** Emitted when burning and minting tokens is paused */
export interface BurningAndMintingPausedEventAmino {}
export interface BurningAndMintingPausedEventAminoMsg {
  type: "/circle.cctp.v1.BurningAndMintingPausedEvent";
  value: BurningAndMintingPausedEventAmino;
}
/** Emitted when burning and minting tokens is paused */
export interface BurningAndMintingPausedEventSDKType {}
/** Emitted when burning and minting tokens is unpaused */
export interface BurningAndMintingUnpausedEvent {}
export interface BurningAndMintingUnpausedEventProtoMsg {
  typeUrl: "/circle.cctp.v1.BurningAndMintingUnpausedEvent";
  value: Uint8Array;
}
/** Emitted when burning and minting tokens is unpaused */
export interface BurningAndMintingUnpausedEventAmino {}
export interface BurningAndMintingUnpausedEventAminoMsg {
  type: "/circle.cctp.v1.BurningAndMintingUnpausedEvent";
  value: BurningAndMintingUnpausedEventAmino;
}
/** Emitted when burning and minting tokens is unpaused */
export interface BurningAndMintingUnpausedEventSDKType {}
/** Emitted when sending and receiving messages is paused */
export interface SendingAndReceivingPausedEvent {}
export interface SendingAndReceivingPausedEventProtoMsg {
  typeUrl: "/circle.cctp.v1.SendingAndReceivingPausedEvent";
  value: Uint8Array;
}
/** Emitted when sending and receiving messages is paused */
export interface SendingAndReceivingPausedEventAmino {}
export interface SendingAndReceivingPausedEventAminoMsg {
  type: "/circle.cctp.v1.SendingAndReceivingPausedEvent";
  value: SendingAndReceivingPausedEventAmino;
}
/** Emitted when sending and receiving messages is paused */
export interface SendingAndReceivingPausedEventSDKType {}
/** Emitted when sending and receiving messages is paused */
export interface SendingAndReceivingUnpausedEvent {}
export interface SendingAndReceivingUnpausedEventProtoMsg {
  typeUrl: "/circle.cctp.v1.SendingAndReceivingUnpausedEvent";
  value: Uint8Array;
}
/** Emitted when sending and receiving messages is paused */
export interface SendingAndReceivingUnpausedEventAmino {}
export interface SendingAndReceivingUnpausedEventAminoMsg {
  type: "/circle.cctp.v1.SendingAndReceivingUnpausedEvent";
  value: SendingAndReceivingUnpausedEventAmino;
}
/** Emitted when sending and receiving messages is paused */
export interface SendingAndReceivingUnpausedEventSDKType {}
/**
 * Emitted when a DepositForBurn message is sent
 * @param nonce unique nonce reserved by message
 * @param burn_token address of token burnt on source domain
 * @param amount deposit amount
 * @param depositor address where deposit is transferred from
 * @param mint_recipient address receiving minted tokens on destination domain
 * as bytes32
 * @param destination_domain destination domain
 * @param destination_token_messenger address of TokenMessenger on destination
 * domain as bytes32
 * @param destination_caller authorized caller as bytes32 of receiveMessage() on
 * destination domain, if not equal to bytes32(0). If equal to bytes32(0), any
 * address can call receiveMessage().
 */
export interface DepositForBurn {
  nonce: bigint;
  burnToken: string;
  amount: string;
  depositor: string;
  mintRecipient: Uint8Array;
  destinationDomain: number;
  destinationTokenMessenger: Uint8Array;
  destinationCaller: Uint8Array;
}
export interface DepositForBurnProtoMsg {
  typeUrl: "/circle.cctp.v1.DepositForBurn";
  value: Uint8Array;
}
/**
 * Emitted when a DepositForBurn message is sent
 * @param nonce unique nonce reserved by message
 * @param burn_token address of token burnt on source domain
 * @param amount deposit amount
 * @param depositor address where deposit is transferred from
 * @param mint_recipient address receiving minted tokens on destination domain
 * as bytes32
 * @param destination_domain destination domain
 * @param destination_token_messenger address of TokenMessenger on destination
 * domain as bytes32
 * @param destination_caller authorized caller as bytes32 of receiveMessage() on
 * destination domain, if not equal to bytes32(0). If equal to bytes32(0), any
 * address can call receiveMessage().
 */
export interface DepositForBurnAmino {
  nonce?: string;
  burn_token?: string;
  amount?: string;
  depositor?: string;
  mint_recipient?: string;
  destination_domain?: number;
  destination_token_messenger?: string;
  destination_caller?: string;
}
export interface DepositForBurnAminoMsg {
  type: "/circle.cctp.v1.DepositForBurn";
  value: DepositForBurnAmino;
}
/**
 * Emitted when a DepositForBurn message is sent
 * @param nonce unique nonce reserved by message
 * @param burn_token address of token burnt on source domain
 * @param amount deposit amount
 * @param depositor address where deposit is transferred from
 * @param mint_recipient address receiving minted tokens on destination domain
 * as bytes32
 * @param destination_domain destination domain
 * @param destination_token_messenger address of TokenMessenger on destination
 * domain as bytes32
 * @param destination_caller authorized caller as bytes32 of receiveMessage() on
 * destination domain, if not equal to bytes32(0). If equal to bytes32(0), any
 * address can call receiveMessage().
 */
export interface DepositForBurnSDKType {
  nonce: bigint;
  burn_token: string;
  amount: string;
  depositor: string;
  mint_recipient: Uint8Array;
  destination_domain: number;
  destination_token_messenger: Uint8Array;
  destination_caller: Uint8Array;
}
/**
 * Emitted when tokens are minted
 * @param mint_recipient recipient address of minted tokens
 * @param amount amount of minted tokens
 * @param mint_token contract address of minted token
 */
export interface MintAndWithdraw {
  mintRecipient: Uint8Array;
  amount: string;
  mintToken: string;
}
export interface MintAndWithdrawProtoMsg {
  typeUrl: "/circle.cctp.v1.MintAndWithdraw";
  value: Uint8Array;
}
/**
 * Emitted when tokens are minted
 * @param mint_recipient recipient address of minted tokens
 * @param amount amount of minted tokens
 * @param mint_token contract address of minted token
 */
export interface MintAndWithdrawAmino {
  mint_recipient?: string;
  amount?: string;
  mint_token?: string;
}
export interface MintAndWithdrawAminoMsg {
  type: "/circle.cctp.v1.MintAndWithdraw";
  value: MintAndWithdrawAmino;
}
/**
 * Emitted when tokens are minted
 * @param mint_recipient recipient address of minted tokens
 * @param amount amount of minted tokens
 * @param mint_token contract address of minted token
 */
export interface MintAndWithdrawSDKType {
  mint_recipient: Uint8Array;
  amount: string;
  mint_token: string;
}
/**
 * Emitted when a token pair is linked
 * @param local_token local token to support
 * @param remote_domain remote domain
 * @param remote_token token on `remoteDomain` corresponding to `localToken`
 */
export interface TokenPairLinked {
  localToken: string;
  remoteDomain: number;
  remoteToken: Uint8Array;
}
export interface TokenPairLinkedProtoMsg {
  typeUrl: "/circle.cctp.v1.TokenPairLinked";
  value: Uint8Array;
}
/**
 * Emitted when a token pair is linked
 * @param local_token local token to support
 * @param remote_domain remote domain
 * @param remote_token token on `remoteDomain` corresponding to `localToken`
 */
export interface TokenPairLinkedAmino {
  local_token?: string;
  remote_domain?: number;
  remote_token?: string;
}
export interface TokenPairLinkedAminoMsg {
  type: "/circle.cctp.v1.TokenPairLinked";
  value: TokenPairLinkedAmino;
}
/**
 * Emitted when a token pair is linked
 * @param local_token local token to support
 * @param remote_domain remote domain
 * @param remote_token token on `remoteDomain` corresponding to `localToken`
 */
export interface TokenPairLinkedSDKType {
  local_token: string;
  remote_domain: number;
  remote_token: Uint8Array;
}
/**
 * Emitted when a token pair is unlinked
 * @param local_token local token address
 * @param remote_domain remote domain
 * @param remote_token token on `remoteDomain` unlinked from `localToken`
 */
export interface TokenPairUnlinked {
  localToken: string;
  remoteDomain: number;
  remoteToken: Uint8Array;
}
export interface TokenPairUnlinkedProtoMsg {
  typeUrl: "/circle.cctp.v1.TokenPairUnlinked";
  value: Uint8Array;
}
/**
 * Emitted when a token pair is unlinked
 * @param local_token local token address
 * @param remote_domain remote domain
 * @param remote_token token on `remoteDomain` unlinked from `localToken`
 */
export interface TokenPairUnlinkedAmino {
  local_token?: string;
  remote_domain?: number;
  remote_token?: string;
}
export interface TokenPairUnlinkedAminoMsg {
  type: "/circle.cctp.v1.TokenPairUnlinked";
  value: TokenPairUnlinkedAmino;
}
/**
 * Emitted when a token pair is unlinked
 * @param local_token local token address
 * @param remote_domain remote domain
 * @param remote_token token on `remoteDomain` unlinked from `localToken`
 */
export interface TokenPairUnlinkedSDKType {
  local_token: string;
  remote_domain: number;
  remote_token: Uint8Array;
}
/**
 * Emitted when a new message is dispatched
 * @param message Raw bytes of message
 */
export interface MessageSent {
  message: Uint8Array;
}
export interface MessageSentProtoMsg {
  typeUrl: "/circle.cctp.v1.MessageSent";
  value: Uint8Array;
}
/**
 * Emitted when a new message is dispatched
 * @param message Raw bytes of message
 */
export interface MessageSentAmino {
  message?: string;
}
export interface MessageSentAminoMsg {
  type: "/circle.cctp.v1.MessageSent";
  value: MessageSentAmino;
}
/**
 * Emitted when a new message is dispatched
 * @param message Raw bytes of message
 */
export interface MessageSentSDKType {
  message: Uint8Array;
}
/**
 * Emitted when a new message is received
 * @param caller caller (msg.sender) on destination domain
 * @param source_domain the source domain this message originated from
 * @param nonce the nonce unique to this message
 * @param sender the sender of this message
 * @param message_body message body bytes
 */
export interface MessageReceived {
  caller: string;
  sourceDomain: number;
  nonce: bigint;
  sender: Uint8Array;
  messageBody: Uint8Array;
}
export interface MessageReceivedProtoMsg {
  typeUrl: "/circle.cctp.v1.MessageReceived";
  value: Uint8Array;
}
/**
 * Emitted when a new message is received
 * @param caller caller (msg.sender) on destination domain
 * @param source_domain the source domain this message originated from
 * @param nonce the nonce unique to this message
 * @param sender the sender of this message
 * @param message_body message body bytes
 */
export interface MessageReceivedAmino {
  caller?: string;
  source_domain?: number;
  nonce?: string;
  sender?: string;
  message_body?: string;
}
export interface MessageReceivedAminoMsg {
  type: "/circle.cctp.v1.MessageReceived";
  value: MessageReceivedAmino;
}
/**
 * Emitted when a new message is received
 * @param caller caller (msg.sender) on destination domain
 * @param source_domain the source domain this message originated from
 * @param nonce the nonce unique to this message
 * @param sender the sender of this message
 * @param message_body message body bytes
 */
export interface MessageReceivedSDKType {
  caller: string;
  source_domain: number;
  nonce: bigint;
  sender: Uint8Array;
  message_body: Uint8Array;
}
/**
 * Emitted when max message body size is updated
 * @param new_max_message_body_size new maximum message body size, in bytes
 */
export interface MaxMessageBodySizeUpdated {
  newMaxMessageBodySize: bigint;
}
export interface MaxMessageBodySizeUpdatedProtoMsg {
  typeUrl: "/circle.cctp.v1.MaxMessageBodySizeUpdated";
  value: Uint8Array;
}
/**
 * Emitted when max message body size is updated
 * @param new_max_message_body_size new maximum message body size, in bytes
 */
export interface MaxMessageBodySizeUpdatedAmino {
  new_max_message_body_size?: string;
}
export interface MaxMessageBodySizeUpdatedAminoMsg {
  type: "/circle.cctp.v1.MaxMessageBodySizeUpdated";
  value: MaxMessageBodySizeUpdatedAmino;
}
/**
 * Emitted when max message body size is updated
 * @param new_max_message_body_size new maximum message body size, in bytes
 */
export interface MaxMessageBodySizeUpdatedSDKType {
  new_max_message_body_size: bigint;
}
/**
 * Emitted when a RemoteTokenMessenger is added
 * @param domain remote domain
 * @param remote_token_messenger RemoteTokenMessenger on domain
 */
export interface RemoteTokenMessengerAdded {
  domain: number;
  remoteTokenMessenger: Uint8Array;
}
export interface RemoteTokenMessengerAddedProtoMsg {
  typeUrl: "/circle.cctp.v1.RemoteTokenMessengerAdded";
  value: Uint8Array;
}
/**
 * Emitted when a RemoteTokenMessenger is added
 * @param domain remote domain
 * @param remote_token_messenger RemoteTokenMessenger on domain
 */
export interface RemoteTokenMessengerAddedAmino {
  domain?: number;
  remote_token_messenger?: string;
}
export interface RemoteTokenMessengerAddedAminoMsg {
  type: "/circle.cctp.v1.RemoteTokenMessengerAdded";
  value: RemoteTokenMessengerAddedAmino;
}
/**
 * Emitted when a RemoteTokenMessenger is added
 * @param domain remote domain
 * @param remote_token_messenger RemoteTokenMessenger on domain
 */
export interface RemoteTokenMessengerAddedSDKType {
  domain: number;
  remote_token_messenger: Uint8Array;
}
/**
 * Emitted when a RemoteTokenMessenger is removed
 * @param domain remote domain
 * @param remote_token_messenger RemoteTokenMessenger on domain
 */
export interface RemoteTokenMessengerRemoved {
  domain: number;
  remoteTokenMessenger: Uint8Array;
}
export interface RemoteTokenMessengerRemovedProtoMsg {
  typeUrl: "/circle.cctp.v1.RemoteTokenMessengerRemoved";
  value: Uint8Array;
}
/**
 * Emitted when a RemoteTokenMessenger is removed
 * @param domain remote domain
 * @param remote_token_messenger RemoteTokenMessenger on domain
 */
export interface RemoteTokenMessengerRemovedAmino {
  domain?: number;
  remote_token_messenger?: string;
}
export interface RemoteTokenMessengerRemovedAminoMsg {
  type: "/circle.cctp.v1.RemoteTokenMessengerRemoved";
  value: RemoteTokenMessengerRemovedAmino;
}
/**
 * Emitted when a RemoteTokenMessenger is removed
 * @param domain remote domain
 * @param remote_token_messenger RemoteTokenMessenger on domain
 */
export interface RemoteTokenMessengerRemovedSDKType {
  domain: number;
  remote_token_messenger: Uint8Array;
}
/**
 * Emitted when max burn amount per message is updated
 * @param local_token
 * @param old_amount old max burn amount
 * @param new_amount new max burn amount
 */
export interface SetBurnLimitPerMessage {
  token: string;
  burnLimitPerMessage: string;
}
export interface SetBurnLimitPerMessageProtoMsg {
  typeUrl: "/circle.cctp.v1.SetBurnLimitPerMessage";
  value: Uint8Array;
}
/**
 * Emitted when max burn amount per message is updated
 * @param local_token
 * @param old_amount old max burn amount
 * @param new_amount new max burn amount
 */
export interface SetBurnLimitPerMessageAmino {
  token?: string;
  burn_limit_per_message?: string;
}
export interface SetBurnLimitPerMessageAminoMsg {
  type: "/circle.cctp.v1.SetBurnLimitPerMessage";
  value: SetBurnLimitPerMessageAmino;
}
/**
 * Emitted when max burn amount per message is updated
 * @param local_token
 * @param old_amount old max burn amount
 * @param new_amount new max burn amount
 */
export interface SetBurnLimitPerMessageSDKType {
  token: string;
  burn_limit_per_message: string;
}
function createBaseAttesterEnabled(): AttesterEnabled {
  return {
    attester: ""
  };
}
export const AttesterEnabled = {
  typeUrl: "/circle.cctp.v1.AttesterEnabled",
  encode(message: AttesterEnabled, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attester !== "") {
      writer.uint32(10).string(message.attester);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AttesterEnabled {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttesterEnabled();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attester = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AttesterEnabled>): AttesterEnabled {
    const message = createBaseAttesterEnabled();
    message.attester = object.attester ?? "";
    return message;
  },
  fromAmino(object: AttesterEnabledAmino): AttesterEnabled {
    const message = createBaseAttesterEnabled();
    if (object.attester !== undefined && object.attester !== null) {
      message.attester = object.attester;
    }
    return message;
  },
  toAmino(message: AttesterEnabled, useInterfaces: boolean = false): AttesterEnabledAmino {
    const obj: any = {};
    obj.attester = message.attester;
    return obj;
  },
  fromAminoMsg(object: AttesterEnabledAminoMsg): AttesterEnabled {
    return AttesterEnabled.fromAmino(object.value);
  },
  fromProtoMsg(message: AttesterEnabledProtoMsg, useInterfaces: boolean = false): AttesterEnabled {
    return AttesterEnabled.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AttesterEnabled): Uint8Array {
    return AttesterEnabled.encode(message).finish();
  },
  toProtoMsg(message: AttesterEnabled): AttesterEnabledProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.AttesterEnabled",
      value: AttesterEnabled.encode(message).finish()
    };
  }
};
function createBaseAttesterDisabled(): AttesterDisabled {
  return {
    attester: ""
  };
}
export const AttesterDisabled = {
  typeUrl: "/circle.cctp.v1.AttesterDisabled",
  encode(message: AttesterDisabled, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attester !== "") {
      writer.uint32(10).string(message.attester);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AttesterDisabled {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttesterDisabled();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attester = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AttesterDisabled>): AttesterDisabled {
    const message = createBaseAttesterDisabled();
    message.attester = object.attester ?? "";
    return message;
  },
  fromAmino(object: AttesterDisabledAmino): AttesterDisabled {
    const message = createBaseAttesterDisabled();
    if (object.attester !== undefined && object.attester !== null) {
      message.attester = object.attester;
    }
    return message;
  },
  toAmino(message: AttesterDisabled, useInterfaces: boolean = false): AttesterDisabledAmino {
    const obj: any = {};
    obj.attester = message.attester;
    return obj;
  },
  fromAminoMsg(object: AttesterDisabledAminoMsg): AttesterDisabled {
    return AttesterDisabled.fromAmino(object.value);
  },
  fromProtoMsg(message: AttesterDisabledProtoMsg, useInterfaces: boolean = false): AttesterDisabled {
    return AttesterDisabled.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AttesterDisabled): Uint8Array {
    return AttesterDisabled.encode(message).finish();
  },
  toProtoMsg(message: AttesterDisabled): AttesterDisabledProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.AttesterDisabled",
      value: AttesterDisabled.encode(message).finish()
    };
  }
};
function createBaseSignatureThresholdUpdated(): SignatureThresholdUpdated {
  return {
    oldSignatureThreshold: BigInt(0),
    newSignatureThreshold: BigInt(0)
  };
}
export const SignatureThresholdUpdated = {
  typeUrl: "/circle.cctp.v1.SignatureThresholdUpdated",
  encode(message: SignatureThresholdUpdated, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.oldSignatureThreshold !== BigInt(0)) {
      writer.uint32(8).uint64(message.oldSignatureThreshold);
    }
    if (message.newSignatureThreshold !== BigInt(0)) {
      writer.uint32(16).uint64(message.newSignatureThreshold);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SignatureThresholdUpdated {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureThresholdUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oldSignatureThreshold = reader.uint64();
          break;
        case 2:
          message.newSignatureThreshold = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SignatureThresholdUpdated>): SignatureThresholdUpdated {
    const message = createBaseSignatureThresholdUpdated();
    message.oldSignatureThreshold = object.oldSignatureThreshold !== undefined && object.oldSignatureThreshold !== null ? BigInt(object.oldSignatureThreshold.toString()) : BigInt(0);
    message.newSignatureThreshold = object.newSignatureThreshold !== undefined && object.newSignatureThreshold !== null ? BigInt(object.newSignatureThreshold.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SignatureThresholdUpdatedAmino): SignatureThresholdUpdated {
    const message = createBaseSignatureThresholdUpdated();
    if (object.old_signature_threshold !== undefined && object.old_signature_threshold !== null) {
      message.oldSignatureThreshold = BigInt(object.old_signature_threshold);
    }
    if (object.new_signature_threshold !== undefined && object.new_signature_threshold !== null) {
      message.newSignatureThreshold = BigInt(object.new_signature_threshold);
    }
    return message;
  },
  toAmino(message: SignatureThresholdUpdated, useInterfaces: boolean = false): SignatureThresholdUpdatedAmino {
    const obj: any = {};
    obj.old_signature_threshold = message.oldSignatureThreshold ? message.oldSignatureThreshold.toString() : undefined;
    obj.new_signature_threshold = message.newSignatureThreshold ? message.newSignatureThreshold.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SignatureThresholdUpdatedAminoMsg): SignatureThresholdUpdated {
    return SignatureThresholdUpdated.fromAmino(object.value);
  },
  fromProtoMsg(message: SignatureThresholdUpdatedProtoMsg, useInterfaces: boolean = false): SignatureThresholdUpdated {
    return SignatureThresholdUpdated.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SignatureThresholdUpdated): Uint8Array {
    return SignatureThresholdUpdated.encode(message).finish();
  },
  toProtoMsg(message: SignatureThresholdUpdated): SignatureThresholdUpdatedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.SignatureThresholdUpdated",
      value: SignatureThresholdUpdated.encode(message).finish()
    };
  }
};
function createBaseOwnerUpdated(): OwnerUpdated {
  return {
    previousOwner: "",
    newOwner: ""
  };
}
export const OwnerUpdated = {
  typeUrl: "/circle.cctp.v1.OwnerUpdated",
  encode(message: OwnerUpdated, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.previousOwner !== "") {
      writer.uint32(10).string(message.previousOwner);
    }
    if (message.newOwner !== "") {
      writer.uint32(18).string(message.newOwner);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): OwnerUpdated {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOwnerUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.previousOwner = reader.string();
          break;
        case 2:
          message.newOwner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OwnerUpdated>): OwnerUpdated {
    const message = createBaseOwnerUpdated();
    message.previousOwner = object.previousOwner ?? "";
    message.newOwner = object.newOwner ?? "";
    return message;
  },
  fromAmino(object: OwnerUpdatedAmino): OwnerUpdated {
    const message = createBaseOwnerUpdated();
    if (object.previous_owner !== undefined && object.previous_owner !== null) {
      message.previousOwner = object.previous_owner;
    }
    if (object.new_owner !== undefined && object.new_owner !== null) {
      message.newOwner = object.new_owner;
    }
    return message;
  },
  toAmino(message: OwnerUpdated, useInterfaces: boolean = false): OwnerUpdatedAmino {
    const obj: any = {};
    obj.previous_owner = message.previousOwner;
    obj.new_owner = message.newOwner;
    return obj;
  },
  fromAminoMsg(object: OwnerUpdatedAminoMsg): OwnerUpdated {
    return OwnerUpdated.fromAmino(object.value);
  },
  fromProtoMsg(message: OwnerUpdatedProtoMsg, useInterfaces: boolean = false): OwnerUpdated {
    return OwnerUpdated.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: OwnerUpdated): Uint8Array {
    return OwnerUpdated.encode(message).finish();
  },
  toProtoMsg(message: OwnerUpdated): OwnerUpdatedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.OwnerUpdated",
      value: OwnerUpdated.encode(message).finish()
    };
  }
};
function createBaseOwnershipTransferStarted(): OwnershipTransferStarted {
  return {
    previousOwner: "",
    newOwner: ""
  };
}
export const OwnershipTransferStarted = {
  typeUrl: "/circle.cctp.v1.OwnershipTransferStarted",
  encode(message: OwnershipTransferStarted, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.previousOwner !== "") {
      writer.uint32(10).string(message.previousOwner);
    }
    if (message.newOwner !== "") {
      writer.uint32(18).string(message.newOwner);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): OwnershipTransferStarted {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOwnershipTransferStarted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.previousOwner = reader.string();
          break;
        case 2:
          message.newOwner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OwnershipTransferStarted>): OwnershipTransferStarted {
    const message = createBaseOwnershipTransferStarted();
    message.previousOwner = object.previousOwner ?? "";
    message.newOwner = object.newOwner ?? "";
    return message;
  },
  fromAmino(object: OwnershipTransferStartedAmino): OwnershipTransferStarted {
    const message = createBaseOwnershipTransferStarted();
    if (object.previous_owner !== undefined && object.previous_owner !== null) {
      message.previousOwner = object.previous_owner;
    }
    if (object.new_owner !== undefined && object.new_owner !== null) {
      message.newOwner = object.new_owner;
    }
    return message;
  },
  toAmino(message: OwnershipTransferStarted, useInterfaces: boolean = false): OwnershipTransferStartedAmino {
    const obj: any = {};
    obj.previous_owner = message.previousOwner;
    obj.new_owner = message.newOwner;
    return obj;
  },
  fromAminoMsg(object: OwnershipTransferStartedAminoMsg): OwnershipTransferStarted {
    return OwnershipTransferStarted.fromAmino(object.value);
  },
  fromProtoMsg(message: OwnershipTransferStartedProtoMsg, useInterfaces: boolean = false): OwnershipTransferStarted {
    return OwnershipTransferStarted.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: OwnershipTransferStarted): Uint8Array {
    return OwnershipTransferStarted.encode(message).finish();
  },
  toProtoMsg(message: OwnershipTransferStarted): OwnershipTransferStartedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.OwnershipTransferStarted",
      value: OwnershipTransferStarted.encode(message).finish()
    };
  }
};
function createBasePauserUpdated(): PauserUpdated {
  return {
    previousPauser: "",
    newPauser: ""
  };
}
export const PauserUpdated = {
  typeUrl: "/circle.cctp.v1.PauserUpdated",
  encode(message: PauserUpdated, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.previousPauser !== "") {
      writer.uint32(10).string(message.previousPauser);
    }
    if (message.newPauser !== "") {
      writer.uint32(18).string(message.newPauser);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PauserUpdated {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePauserUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.previousPauser = reader.string();
          break;
        case 2:
          message.newPauser = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PauserUpdated>): PauserUpdated {
    const message = createBasePauserUpdated();
    message.previousPauser = object.previousPauser ?? "";
    message.newPauser = object.newPauser ?? "";
    return message;
  },
  fromAmino(object: PauserUpdatedAmino): PauserUpdated {
    const message = createBasePauserUpdated();
    if (object.previous_pauser !== undefined && object.previous_pauser !== null) {
      message.previousPauser = object.previous_pauser;
    }
    if (object.new_pauser !== undefined && object.new_pauser !== null) {
      message.newPauser = object.new_pauser;
    }
    return message;
  },
  toAmino(message: PauserUpdated, useInterfaces: boolean = false): PauserUpdatedAmino {
    const obj: any = {};
    obj.previous_pauser = message.previousPauser;
    obj.new_pauser = message.newPauser;
    return obj;
  },
  fromAminoMsg(object: PauserUpdatedAminoMsg): PauserUpdated {
    return PauserUpdated.fromAmino(object.value);
  },
  fromProtoMsg(message: PauserUpdatedProtoMsg, useInterfaces: boolean = false): PauserUpdated {
    return PauserUpdated.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PauserUpdated): Uint8Array {
    return PauserUpdated.encode(message).finish();
  },
  toProtoMsg(message: PauserUpdated): PauserUpdatedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.PauserUpdated",
      value: PauserUpdated.encode(message).finish()
    };
  }
};
function createBaseAttesterManagerUpdated(): AttesterManagerUpdated {
  return {
    previousAttesterManager: "",
    newAttesterManager: ""
  };
}
export const AttesterManagerUpdated = {
  typeUrl: "/circle.cctp.v1.AttesterManagerUpdated",
  encode(message: AttesterManagerUpdated, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.previousAttesterManager !== "") {
      writer.uint32(10).string(message.previousAttesterManager);
    }
    if (message.newAttesterManager !== "") {
      writer.uint32(18).string(message.newAttesterManager);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AttesterManagerUpdated {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttesterManagerUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.previousAttesterManager = reader.string();
          break;
        case 2:
          message.newAttesterManager = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AttesterManagerUpdated>): AttesterManagerUpdated {
    const message = createBaseAttesterManagerUpdated();
    message.previousAttesterManager = object.previousAttesterManager ?? "";
    message.newAttesterManager = object.newAttesterManager ?? "";
    return message;
  },
  fromAmino(object: AttesterManagerUpdatedAmino): AttesterManagerUpdated {
    const message = createBaseAttesterManagerUpdated();
    if (object.previous_attester_manager !== undefined && object.previous_attester_manager !== null) {
      message.previousAttesterManager = object.previous_attester_manager;
    }
    if (object.new_attester_manager !== undefined && object.new_attester_manager !== null) {
      message.newAttesterManager = object.new_attester_manager;
    }
    return message;
  },
  toAmino(message: AttesterManagerUpdated, useInterfaces: boolean = false): AttesterManagerUpdatedAmino {
    const obj: any = {};
    obj.previous_attester_manager = message.previousAttesterManager;
    obj.new_attester_manager = message.newAttesterManager;
    return obj;
  },
  fromAminoMsg(object: AttesterManagerUpdatedAminoMsg): AttesterManagerUpdated {
    return AttesterManagerUpdated.fromAmino(object.value);
  },
  fromProtoMsg(message: AttesterManagerUpdatedProtoMsg, useInterfaces: boolean = false): AttesterManagerUpdated {
    return AttesterManagerUpdated.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AttesterManagerUpdated): Uint8Array {
    return AttesterManagerUpdated.encode(message).finish();
  },
  toProtoMsg(message: AttesterManagerUpdated): AttesterManagerUpdatedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.AttesterManagerUpdated",
      value: AttesterManagerUpdated.encode(message).finish()
    };
  }
};
function createBaseTokenControllerUpdated(): TokenControllerUpdated {
  return {
    previousTokenController: "",
    newTokenController: ""
  };
}
export const TokenControllerUpdated = {
  typeUrl: "/circle.cctp.v1.TokenControllerUpdated",
  encode(message: TokenControllerUpdated, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.previousTokenController !== "") {
      writer.uint32(10).string(message.previousTokenController);
    }
    if (message.newTokenController !== "") {
      writer.uint32(18).string(message.newTokenController);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TokenControllerUpdated {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenControllerUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.previousTokenController = reader.string();
          break;
        case 2:
          message.newTokenController = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TokenControllerUpdated>): TokenControllerUpdated {
    const message = createBaseTokenControllerUpdated();
    message.previousTokenController = object.previousTokenController ?? "";
    message.newTokenController = object.newTokenController ?? "";
    return message;
  },
  fromAmino(object: TokenControllerUpdatedAmino): TokenControllerUpdated {
    const message = createBaseTokenControllerUpdated();
    if (object.previous_token_controller !== undefined && object.previous_token_controller !== null) {
      message.previousTokenController = object.previous_token_controller;
    }
    if (object.new_token_controller !== undefined && object.new_token_controller !== null) {
      message.newTokenController = object.new_token_controller;
    }
    return message;
  },
  toAmino(message: TokenControllerUpdated, useInterfaces: boolean = false): TokenControllerUpdatedAmino {
    const obj: any = {};
    obj.previous_token_controller = message.previousTokenController;
    obj.new_token_controller = message.newTokenController;
    return obj;
  },
  fromAminoMsg(object: TokenControllerUpdatedAminoMsg): TokenControllerUpdated {
    return TokenControllerUpdated.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenControllerUpdatedProtoMsg, useInterfaces: boolean = false): TokenControllerUpdated {
    return TokenControllerUpdated.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TokenControllerUpdated): Uint8Array {
    return TokenControllerUpdated.encode(message).finish();
  },
  toProtoMsg(message: TokenControllerUpdated): TokenControllerUpdatedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.TokenControllerUpdated",
      value: TokenControllerUpdated.encode(message).finish()
    };
  }
};
function createBaseBurningAndMintingPausedEvent(): BurningAndMintingPausedEvent {
  return {};
}
export const BurningAndMintingPausedEvent = {
  typeUrl: "/circle.cctp.v1.BurningAndMintingPausedEvent",
  encode(_: BurningAndMintingPausedEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BurningAndMintingPausedEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBurningAndMintingPausedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<BurningAndMintingPausedEvent>): BurningAndMintingPausedEvent {
    const message = createBaseBurningAndMintingPausedEvent();
    return message;
  },
  fromAmino(_: BurningAndMintingPausedEventAmino): BurningAndMintingPausedEvent {
    const message = createBaseBurningAndMintingPausedEvent();
    return message;
  },
  toAmino(_: BurningAndMintingPausedEvent, useInterfaces: boolean = false): BurningAndMintingPausedEventAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: BurningAndMintingPausedEventAminoMsg): BurningAndMintingPausedEvent {
    return BurningAndMintingPausedEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: BurningAndMintingPausedEventProtoMsg, useInterfaces: boolean = false): BurningAndMintingPausedEvent {
    return BurningAndMintingPausedEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BurningAndMintingPausedEvent): Uint8Array {
    return BurningAndMintingPausedEvent.encode(message).finish();
  },
  toProtoMsg(message: BurningAndMintingPausedEvent): BurningAndMintingPausedEventProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.BurningAndMintingPausedEvent",
      value: BurningAndMintingPausedEvent.encode(message).finish()
    };
  }
};
function createBaseBurningAndMintingUnpausedEvent(): BurningAndMintingUnpausedEvent {
  return {};
}
export const BurningAndMintingUnpausedEvent = {
  typeUrl: "/circle.cctp.v1.BurningAndMintingUnpausedEvent",
  encode(_: BurningAndMintingUnpausedEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BurningAndMintingUnpausedEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBurningAndMintingUnpausedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<BurningAndMintingUnpausedEvent>): BurningAndMintingUnpausedEvent {
    const message = createBaseBurningAndMintingUnpausedEvent();
    return message;
  },
  fromAmino(_: BurningAndMintingUnpausedEventAmino): BurningAndMintingUnpausedEvent {
    const message = createBaseBurningAndMintingUnpausedEvent();
    return message;
  },
  toAmino(_: BurningAndMintingUnpausedEvent, useInterfaces: boolean = false): BurningAndMintingUnpausedEventAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: BurningAndMintingUnpausedEventAminoMsg): BurningAndMintingUnpausedEvent {
    return BurningAndMintingUnpausedEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: BurningAndMintingUnpausedEventProtoMsg, useInterfaces: boolean = false): BurningAndMintingUnpausedEvent {
    return BurningAndMintingUnpausedEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BurningAndMintingUnpausedEvent): Uint8Array {
    return BurningAndMintingUnpausedEvent.encode(message).finish();
  },
  toProtoMsg(message: BurningAndMintingUnpausedEvent): BurningAndMintingUnpausedEventProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.BurningAndMintingUnpausedEvent",
      value: BurningAndMintingUnpausedEvent.encode(message).finish()
    };
  }
};
function createBaseSendingAndReceivingPausedEvent(): SendingAndReceivingPausedEvent {
  return {};
}
export const SendingAndReceivingPausedEvent = {
  typeUrl: "/circle.cctp.v1.SendingAndReceivingPausedEvent",
  encode(_: SendingAndReceivingPausedEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SendingAndReceivingPausedEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendingAndReceivingPausedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<SendingAndReceivingPausedEvent>): SendingAndReceivingPausedEvent {
    const message = createBaseSendingAndReceivingPausedEvent();
    return message;
  },
  fromAmino(_: SendingAndReceivingPausedEventAmino): SendingAndReceivingPausedEvent {
    const message = createBaseSendingAndReceivingPausedEvent();
    return message;
  },
  toAmino(_: SendingAndReceivingPausedEvent, useInterfaces: boolean = false): SendingAndReceivingPausedEventAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: SendingAndReceivingPausedEventAminoMsg): SendingAndReceivingPausedEvent {
    return SendingAndReceivingPausedEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SendingAndReceivingPausedEventProtoMsg, useInterfaces: boolean = false): SendingAndReceivingPausedEvent {
    return SendingAndReceivingPausedEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SendingAndReceivingPausedEvent): Uint8Array {
    return SendingAndReceivingPausedEvent.encode(message).finish();
  },
  toProtoMsg(message: SendingAndReceivingPausedEvent): SendingAndReceivingPausedEventProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.SendingAndReceivingPausedEvent",
      value: SendingAndReceivingPausedEvent.encode(message).finish()
    };
  }
};
function createBaseSendingAndReceivingUnpausedEvent(): SendingAndReceivingUnpausedEvent {
  return {};
}
export const SendingAndReceivingUnpausedEvent = {
  typeUrl: "/circle.cctp.v1.SendingAndReceivingUnpausedEvent",
  encode(_: SendingAndReceivingUnpausedEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SendingAndReceivingUnpausedEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendingAndReceivingUnpausedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<SendingAndReceivingUnpausedEvent>): SendingAndReceivingUnpausedEvent {
    const message = createBaseSendingAndReceivingUnpausedEvent();
    return message;
  },
  fromAmino(_: SendingAndReceivingUnpausedEventAmino): SendingAndReceivingUnpausedEvent {
    const message = createBaseSendingAndReceivingUnpausedEvent();
    return message;
  },
  toAmino(_: SendingAndReceivingUnpausedEvent, useInterfaces: boolean = false): SendingAndReceivingUnpausedEventAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: SendingAndReceivingUnpausedEventAminoMsg): SendingAndReceivingUnpausedEvent {
    return SendingAndReceivingUnpausedEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SendingAndReceivingUnpausedEventProtoMsg, useInterfaces: boolean = false): SendingAndReceivingUnpausedEvent {
    return SendingAndReceivingUnpausedEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SendingAndReceivingUnpausedEvent): Uint8Array {
    return SendingAndReceivingUnpausedEvent.encode(message).finish();
  },
  toProtoMsg(message: SendingAndReceivingUnpausedEvent): SendingAndReceivingUnpausedEventProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.SendingAndReceivingUnpausedEvent",
      value: SendingAndReceivingUnpausedEvent.encode(message).finish()
    };
  }
};
function createBaseDepositForBurn(): DepositForBurn {
  return {
    nonce: BigInt(0),
    burnToken: "",
    amount: "",
    depositor: "",
    mintRecipient: new Uint8Array(),
    destinationDomain: 0,
    destinationTokenMessenger: new Uint8Array(),
    destinationCaller: new Uint8Array()
  };
}
export const DepositForBurn = {
  typeUrl: "/circle.cctp.v1.DepositForBurn",
  encode(message: DepositForBurn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.nonce);
    }
    if (message.burnToken !== "") {
      writer.uint32(18).string(message.burnToken);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.depositor !== "") {
      writer.uint32(34).string(message.depositor);
    }
    if (message.mintRecipient.length !== 0) {
      writer.uint32(42).bytes(message.mintRecipient);
    }
    if (message.destinationDomain !== 0) {
      writer.uint32(48).uint32(message.destinationDomain);
    }
    if (message.destinationTokenMessenger.length !== 0) {
      writer.uint32(58).bytes(message.destinationTokenMessenger);
    }
    if (message.destinationCaller.length !== 0) {
      writer.uint32(66).bytes(message.destinationCaller);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DepositForBurn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositForBurn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64();
          break;
        case 2:
          message.burnToken = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.depositor = reader.string();
          break;
        case 5:
          message.mintRecipient = reader.bytes();
          break;
        case 6:
          message.destinationDomain = reader.uint32();
          break;
        case 7:
          message.destinationTokenMessenger = reader.bytes();
          break;
        case 8:
          message.destinationCaller = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DepositForBurn>): DepositForBurn {
    const message = createBaseDepositForBurn();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.burnToken = object.burnToken ?? "";
    message.amount = object.amount ?? "";
    message.depositor = object.depositor ?? "";
    message.mintRecipient = object.mintRecipient ?? new Uint8Array();
    message.destinationDomain = object.destinationDomain ?? 0;
    message.destinationTokenMessenger = object.destinationTokenMessenger ?? new Uint8Array();
    message.destinationCaller = object.destinationCaller ?? new Uint8Array();
    return message;
  },
  fromAmino(object: DepositForBurnAmino): DepositForBurn {
    const message = createBaseDepositForBurn();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.burn_token !== undefined && object.burn_token !== null) {
      message.burnToken = object.burn_token;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.depositor !== undefined && object.depositor !== null) {
      message.depositor = object.depositor;
    }
    if (object.mint_recipient !== undefined && object.mint_recipient !== null) {
      message.mintRecipient = bytesFromBase64(object.mint_recipient);
    }
    if (object.destination_domain !== undefined && object.destination_domain !== null) {
      message.destinationDomain = object.destination_domain;
    }
    if (object.destination_token_messenger !== undefined && object.destination_token_messenger !== null) {
      message.destinationTokenMessenger = bytesFromBase64(object.destination_token_messenger);
    }
    if (object.destination_caller !== undefined && object.destination_caller !== null) {
      message.destinationCaller = bytesFromBase64(object.destination_caller);
    }
    return message;
  },
  toAmino(message: DepositForBurn, useInterfaces: boolean = false): DepositForBurnAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? message.nonce.toString() : undefined;
    obj.burn_token = message.burnToken;
    obj.amount = message.amount;
    obj.depositor = message.depositor;
    obj.mint_recipient = message.mintRecipient ? base64FromBytes(message.mintRecipient) : undefined;
    obj.destination_domain = message.destinationDomain;
    obj.destination_token_messenger = message.destinationTokenMessenger ? base64FromBytes(message.destinationTokenMessenger) : undefined;
    obj.destination_caller = message.destinationCaller ? base64FromBytes(message.destinationCaller) : undefined;
    return obj;
  },
  fromAminoMsg(object: DepositForBurnAminoMsg): DepositForBurn {
    return DepositForBurn.fromAmino(object.value);
  },
  fromProtoMsg(message: DepositForBurnProtoMsg, useInterfaces: boolean = false): DepositForBurn {
    return DepositForBurn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DepositForBurn): Uint8Array {
    return DepositForBurn.encode(message).finish();
  },
  toProtoMsg(message: DepositForBurn): DepositForBurnProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.DepositForBurn",
      value: DepositForBurn.encode(message).finish()
    };
  }
};
function createBaseMintAndWithdraw(): MintAndWithdraw {
  return {
    mintRecipient: new Uint8Array(),
    amount: "",
    mintToken: ""
  };
}
export const MintAndWithdraw = {
  typeUrl: "/circle.cctp.v1.MintAndWithdraw",
  encode(message: MintAndWithdraw, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.mintRecipient.length !== 0) {
      writer.uint32(10).bytes(message.mintRecipient);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.mintToken !== "") {
      writer.uint32(26).string(message.mintToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MintAndWithdraw {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMintAndWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mintRecipient = reader.bytes();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.mintToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MintAndWithdraw>): MintAndWithdraw {
    const message = createBaseMintAndWithdraw();
    message.mintRecipient = object.mintRecipient ?? new Uint8Array();
    message.amount = object.amount ?? "";
    message.mintToken = object.mintToken ?? "";
    return message;
  },
  fromAmino(object: MintAndWithdrawAmino): MintAndWithdraw {
    const message = createBaseMintAndWithdraw();
    if (object.mint_recipient !== undefined && object.mint_recipient !== null) {
      message.mintRecipient = bytesFromBase64(object.mint_recipient);
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.mint_token !== undefined && object.mint_token !== null) {
      message.mintToken = object.mint_token;
    }
    return message;
  },
  toAmino(message: MintAndWithdraw, useInterfaces: boolean = false): MintAndWithdrawAmino {
    const obj: any = {};
    obj.mint_recipient = message.mintRecipient ? base64FromBytes(message.mintRecipient) : undefined;
    obj.amount = message.amount;
    obj.mint_token = message.mintToken;
    return obj;
  },
  fromAminoMsg(object: MintAndWithdrawAminoMsg): MintAndWithdraw {
    return MintAndWithdraw.fromAmino(object.value);
  },
  fromProtoMsg(message: MintAndWithdrawProtoMsg, useInterfaces: boolean = false): MintAndWithdraw {
    return MintAndWithdraw.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MintAndWithdraw): Uint8Array {
    return MintAndWithdraw.encode(message).finish();
  },
  toProtoMsg(message: MintAndWithdraw): MintAndWithdrawProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MintAndWithdraw",
      value: MintAndWithdraw.encode(message).finish()
    };
  }
};
function createBaseTokenPairLinked(): TokenPairLinked {
  return {
    localToken: "",
    remoteDomain: 0,
    remoteToken: new Uint8Array()
  };
}
export const TokenPairLinked = {
  typeUrl: "/circle.cctp.v1.TokenPairLinked",
  encode(message: TokenPairLinked, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.localToken !== "") {
      writer.uint32(10).string(message.localToken);
    }
    if (message.remoteDomain !== 0) {
      writer.uint32(16).uint32(message.remoteDomain);
    }
    if (message.remoteToken.length !== 0) {
      writer.uint32(26).bytes(message.remoteToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TokenPairLinked {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenPairLinked();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localToken = reader.string();
          break;
        case 2:
          message.remoteDomain = reader.uint32();
          break;
        case 3:
          message.remoteToken = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TokenPairLinked>): TokenPairLinked {
    const message = createBaseTokenPairLinked();
    message.localToken = object.localToken ?? "";
    message.remoteDomain = object.remoteDomain ?? 0;
    message.remoteToken = object.remoteToken ?? new Uint8Array();
    return message;
  },
  fromAmino(object: TokenPairLinkedAmino): TokenPairLinked {
    const message = createBaseTokenPairLinked();
    if (object.local_token !== undefined && object.local_token !== null) {
      message.localToken = object.local_token;
    }
    if (object.remote_domain !== undefined && object.remote_domain !== null) {
      message.remoteDomain = object.remote_domain;
    }
    if (object.remote_token !== undefined && object.remote_token !== null) {
      message.remoteToken = bytesFromBase64(object.remote_token);
    }
    return message;
  },
  toAmino(message: TokenPairLinked, useInterfaces: boolean = false): TokenPairLinkedAmino {
    const obj: any = {};
    obj.local_token = message.localToken;
    obj.remote_domain = message.remoteDomain;
    obj.remote_token = message.remoteToken ? base64FromBytes(message.remoteToken) : undefined;
    return obj;
  },
  fromAminoMsg(object: TokenPairLinkedAminoMsg): TokenPairLinked {
    return TokenPairLinked.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenPairLinkedProtoMsg, useInterfaces: boolean = false): TokenPairLinked {
    return TokenPairLinked.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TokenPairLinked): Uint8Array {
    return TokenPairLinked.encode(message).finish();
  },
  toProtoMsg(message: TokenPairLinked): TokenPairLinkedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.TokenPairLinked",
      value: TokenPairLinked.encode(message).finish()
    };
  }
};
function createBaseTokenPairUnlinked(): TokenPairUnlinked {
  return {
    localToken: "",
    remoteDomain: 0,
    remoteToken: new Uint8Array()
  };
}
export const TokenPairUnlinked = {
  typeUrl: "/circle.cctp.v1.TokenPairUnlinked",
  encode(message: TokenPairUnlinked, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.localToken !== "") {
      writer.uint32(10).string(message.localToken);
    }
    if (message.remoteDomain !== 0) {
      writer.uint32(16).uint32(message.remoteDomain);
    }
    if (message.remoteToken.length !== 0) {
      writer.uint32(26).bytes(message.remoteToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TokenPairUnlinked {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenPairUnlinked();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.localToken = reader.string();
          break;
        case 2:
          message.remoteDomain = reader.uint32();
          break;
        case 3:
          message.remoteToken = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TokenPairUnlinked>): TokenPairUnlinked {
    const message = createBaseTokenPairUnlinked();
    message.localToken = object.localToken ?? "";
    message.remoteDomain = object.remoteDomain ?? 0;
    message.remoteToken = object.remoteToken ?? new Uint8Array();
    return message;
  },
  fromAmino(object: TokenPairUnlinkedAmino): TokenPairUnlinked {
    const message = createBaseTokenPairUnlinked();
    if (object.local_token !== undefined && object.local_token !== null) {
      message.localToken = object.local_token;
    }
    if (object.remote_domain !== undefined && object.remote_domain !== null) {
      message.remoteDomain = object.remote_domain;
    }
    if (object.remote_token !== undefined && object.remote_token !== null) {
      message.remoteToken = bytesFromBase64(object.remote_token);
    }
    return message;
  },
  toAmino(message: TokenPairUnlinked, useInterfaces: boolean = false): TokenPairUnlinkedAmino {
    const obj: any = {};
    obj.local_token = message.localToken;
    obj.remote_domain = message.remoteDomain;
    obj.remote_token = message.remoteToken ? base64FromBytes(message.remoteToken) : undefined;
    return obj;
  },
  fromAminoMsg(object: TokenPairUnlinkedAminoMsg): TokenPairUnlinked {
    return TokenPairUnlinked.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenPairUnlinkedProtoMsg, useInterfaces: boolean = false): TokenPairUnlinked {
    return TokenPairUnlinked.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TokenPairUnlinked): Uint8Array {
    return TokenPairUnlinked.encode(message).finish();
  },
  toProtoMsg(message: TokenPairUnlinked): TokenPairUnlinkedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.TokenPairUnlinked",
      value: TokenPairUnlinked.encode(message).finish()
    };
  }
};
function createBaseMessageSent(): MessageSent {
  return {
    message: new Uint8Array()
  };
}
export const MessageSent = {
  typeUrl: "/circle.cctp.v1.MessageSent",
  encode(message: MessageSent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.message.length !== 0) {
      writer.uint32(10).bytes(message.message);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MessageSent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageSent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MessageSent>): MessageSent {
    const message = createBaseMessageSent();
    message.message = object.message ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MessageSentAmino): MessageSent {
    const message = createBaseMessageSent();
    if (object.message !== undefined && object.message !== null) {
      message.message = bytesFromBase64(object.message);
    }
    return message;
  },
  toAmino(message: MessageSent, useInterfaces: boolean = false): MessageSentAmino {
    const obj: any = {};
    obj.message = message.message ? base64FromBytes(message.message) : undefined;
    return obj;
  },
  fromAminoMsg(object: MessageSentAminoMsg): MessageSent {
    return MessageSent.fromAmino(object.value);
  },
  fromProtoMsg(message: MessageSentProtoMsg, useInterfaces: boolean = false): MessageSent {
    return MessageSent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MessageSent): Uint8Array {
    return MessageSent.encode(message).finish();
  },
  toProtoMsg(message: MessageSent): MessageSentProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MessageSent",
      value: MessageSent.encode(message).finish()
    };
  }
};
function createBaseMessageReceived(): MessageReceived {
  return {
    caller: "",
    sourceDomain: 0,
    nonce: BigInt(0),
    sender: new Uint8Array(),
    messageBody: new Uint8Array()
  };
}
export const MessageReceived = {
  typeUrl: "/circle.cctp.v1.MessageReceived",
  encode(message: MessageReceived, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.caller !== "") {
      writer.uint32(10).string(message.caller);
    }
    if (message.sourceDomain !== 0) {
      writer.uint32(16).uint32(message.sourceDomain);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(24).uint64(message.nonce);
    }
    if (message.sender.length !== 0) {
      writer.uint32(34).bytes(message.sender);
    }
    if (message.messageBody.length !== 0) {
      writer.uint32(42).bytes(message.messageBody);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MessageReceived {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageReceived();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.caller = reader.string();
          break;
        case 2:
          message.sourceDomain = reader.uint32();
          break;
        case 3:
          message.nonce = reader.uint64();
          break;
        case 4:
          message.sender = reader.bytes();
          break;
        case 5:
          message.messageBody = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MessageReceived>): MessageReceived {
    const message = createBaseMessageReceived();
    message.caller = object.caller ?? "";
    message.sourceDomain = object.sourceDomain ?? 0;
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.sender = object.sender ?? new Uint8Array();
    message.messageBody = object.messageBody ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MessageReceivedAmino): MessageReceived {
    const message = createBaseMessageReceived();
    if (object.caller !== undefined && object.caller !== null) {
      message.caller = object.caller;
    }
    if (object.source_domain !== undefined && object.source_domain !== null) {
      message.sourceDomain = object.source_domain;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = bytesFromBase64(object.sender);
    }
    if (object.message_body !== undefined && object.message_body !== null) {
      message.messageBody = bytesFromBase64(object.message_body);
    }
    return message;
  },
  toAmino(message: MessageReceived, useInterfaces: boolean = false): MessageReceivedAmino {
    const obj: any = {};
    obj.caller = message.caller;
    obj.source_domain = message.sourceDomain;
    obj.nonce = message.nonce ? message.nonce.toString() : undefined;
    obj.sender = message.sender ? base64FromBytes(message.sender) : undefined;
    obj.message_body = message.messageBody ? base64FromBytes(message.messageBody) : undefined;
    return obj;
  },
  fromAminoMsg(object: MessageReceivedAminoMsg): MessageReceived {
    return MessageReceived.fromAmino(object.value);
  },
  fromProtoMsg(message: MessageReceivedProtoMsg, useInterfaces: boolean = false): MessageReceived {
    return MessageReceived.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MessageReceived): Uint8Array {
    return MessageReceived.encode(message).finish();
  },
  toProtoMsg(message: MessageReceived): MessageReceivedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MessageReceived",
      value: MessageReceived.encode(message).finish()
    };
  }
};
function createBaseMaxMessageBodySizeUpdated(): MaxMessageBodySizeUpdated {
  return {
    newMaxMessageBodySize: BigInt(0)
  };
}
export const MaxMessageBodySizeUpdated = {
  typeUrl: "/circle.cctp.v1.MaxMessageBodySizeUpdated",
  encode(message: MaxMessageBodySizeUpdated, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.newMaxMessageBodySize !== BigInt(0)) {
      writer.uint32(8).uint64(message.newMaxMessageBodySize);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MaxMessageBodySizeUpdated {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaxMessageBodySizeUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.newMaxMessageBodySize = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MaxMessageBodySizeUpdated>): MaxMessageBodySizeUpdated {
    const message = createBaseMaxMessageBodySizeUpdated();
    message.newMaxMessageBodySize = object.newMaxMessageBodySize !== undefined && object.newMaxMessageBodySize !== null ? BigInt(object.newMaxMessageBodySize.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MaxMessageBodySizeUpdatedAmino): MaxMessageBodySizeUpdated {
    const message = createBaseMaxMessageBodySizeUpdated();
    if (object.new_max_message_body_size !== undefined && object.new_max_message_body_size !== null) {
      message.newMaxMessageBodySize = BigInt(object.new_max_message_body_size);
    }
    return message;
  },
  toAmino(message: MaxMessageBodySizeUpdated, useInterfaces: boolean = false): MaxMessageBodySizeUpdatedAmino {
    const obj: any = {};
    obj.new_max_message_body_size = message.newMaxMessageBodySize ? message.newMaxMessageBodySize.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MaxMessageBodySizeUpdatedAminoMsg): MaxMessageBodySizeUpdated {
    return MaxMessageBodySizeUpdated.fromAmino(object.value);
  },
  fromProtoMsg(message: MaxMessageBodySizeUpdatedProtoMsg, useInterfaces: boolean = false): MaxMessageBodySizeUpdated {
    return MaxMessageBodySizeUpdated.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MaxMessageBodySizeUpdated): Uint8Array {
    return MaxMessageBodySizeUpdated.encode(message).finish();
  },
  toProtoMsg(message: MaxMessageBodySizeUpdated): MaxMessageBodySizeUpdatedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MaxMessageBodySizeUpdated",
      value: MaxMessageBodySizeUpdated.encode(message).finish()
    };
  }
};
function createBaseRemoteTokenMessengerAdded(): RemoteTokenMessengerAdded {
  return {
    domain: 0,
    remoteTokenMessenger: new Uint8Array()
  };
}
export const RemoteTokenMessengerAdded = {
  typeUrl: "/circle.cctp.v1.RemoteTokenMessengerAdded",
  encode(message: RemoteTokenMessengerAdded, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.domain !== 0) {
      writer.uint32(8).uint32(message.domain);
    }
    if (message.remoteTokenMessenger.length !== 0) {
      writer.uint32(18).bytes(message.remoteTokenMessenger);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RemoteTokenMessengerAdded {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoteTokenMessengerAdded();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.uint32();
          break;
        case 2:
          message.remoteTokenMessenger = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RemoteTokenMessengerAdded>): RemoteTokenMessengerAdded {
    const message = createBaseRemoteTokenMessengerAdded();
    message.domain = object.domain ?? 0;
    message.remoteTokenMessenger = object.remoteTokenMessenger ?? new Uint8Array();
    return message;
  },
  fromAmino(object: RemoteTokenMessengerAddedAmino): RemoteTokenMessengerAdded {
    const message = createBaseRemoteTokenMessengerAdded();
    if (object.domain !== undefined && object.domain !== null) {
      message.domain = object.domain;
    }
    if (object.remote_token_messenger !== undefined && object.remote_token_messenger !== null) {
      message.remoteTokenMessenger = bytesFromBase64(object.remote_token_messenger);
    }
    return message;
  },
  toAmino(message: RemoteTokenMessengerAdded, useInterfaces: boolean = false): RemoteTokenMessengerAddedAmino {
    const obj: any = {};
    obj.domain = message.domain;
    obj.remote_token_messenger = message.remoteTokenMessenger ? base64FromBytes(message.remoteTokenMessenger) : undefined;
    return obj;
  },
  fromAminoMsg(object: RemoteTokenMessengerAddedAminoMsg): RemoteTokenMessengerAdded {
    return RemoteTokenMessengerAdded.fromAmino(object.value);
  },
  fromProtoMsg(message: RemoteTokenMessengerAddedProtoMsg, useInterfaces: boolean = false): RemoteTokenMessengerAdded {
    return RemoteTokenMessengerAdded.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RemoteTokenMessengerAdded): Uint8Array {
    return RemoteTokenMessengerAdded.encode(message).finish();
  },
  toProtoMsg(message: RemoteTokenMessengerAdded): RemoteTokenMessengerAddedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.RemoteTokenMessengerAdded",
      value: RemoteTokenMessengerAdded.encode(message).finish()
    };
  }
};
function createBaseRemoteTokenMessengerRemoved(): RemoteTokenMessengerRemoved {
  return {
    domain: 0,
    remoteTokenMessenger: new Uint8Array()
  };
}
export const RemoteTokenMessengerRemoved = {
  typeUrl: "/circle.cctp.v1.RemoteTokenMessengerRemoved",
  encode(message: RemoteTokenMessengerRemoved, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.domain !== 0) {
      writer.uint32(8).uint32(message.domain);
    }
    if (message.remoteTokenMessenger.length !== 0) {
      writer.uint32(18).bytes(message.remoteTokenMessenger);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RemoteTokenMessengerRemoved {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoteTokenMessengerRemoved();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.uint32();
          break;
        case 2:
          message.remoteTokenMessenger = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RemoteTokenMessengerRemoved>): RemoteTokenMessengerRemoved {
    const message = createBaseRemoteTokenMessengerRemoved();
    message.domain = object.domain ?? 0;
    message.remoteTokenMessenger = object.remoteTokenMessenger ?? new Uint8Array();
    return message;
  },
  fromAmino(object: RemoteTokenMessengerRemovedAmino): RemoteTokenMessengerRemoved {
    const message = createBaseRemoteTokenMessengerRemoved();
    if (object.domain !== undefined && object.domain !== null) {
      message.domain = object.domain;
    }
    if (object.remote_token_messenger !== undefined && object.remote_token_messenger !== null) {
      message.remoteTokenMessenger = bytesFromBase64(object.remote_token_messenger);
    }
    return message;
  },
  toAmino(message: RemoteTokenMessengerRemoved, useInterfaces: boolean = false): RemoteTokenMessengerRemovedAmino {
    const obj: any = {};
    obj.domain = message.domain;
    obj.remote_token_messenger = message.remoteTokenMessenger ? base64FromBytes(message.remoteTokenMessenger) : undefined;
    return obj;
  },
  fromAminoMsg(object: RemoteTokenMessengerRemovedAminoMsg): RemoteTokenMessengerRemoved {
    return RemoteTokenMessengerRemoved.fromAmino(object.value);
  },
  fromProtoMsg(message: RemoteTokenMessengerRemovedProtoMsg, useInterfaces: boolean = false): RemoteTokenMessengerRemoved {
    return RemoteTokenMessengerRemoved.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RemoteTokenMessengerRemoved): Uint8Array {
    return RemoteTokenMessengerRemoved.encode(message).finish();
  },
  toProtoMsg(message: RemoteTokenMessengerRemoved): RemoteTokenMessengerRemovedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.RemoteTokenMessengerRemoved",
      value: RemoteTokenMessengerRemoved.encode(message).finish()
    };
  }
};
function createBaseSetBurnLimitPerMessage(): SetBurnLimitPerMessage {
  return {
    token: "",
    burnLimitPerMessage: ""
  };
}
export const SetBurnLimitPerMessage = {
  typeUrl: "/circle.cctp.v1.SetBurnLimitPerMessage",
  encode(message: SetBurnLimitPerMessage, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.burnLimitPerMessage !== "") {
      writer.uint32(18).string(message.burnLimitPerMessage);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetBurnLimitPerMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetBurnLimitPerMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        case 2:
          message.burnLimitPerMessage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetBurnLimitPerMessage>): SetBurnLimitPerMessage {
    const message = createBaseSetBurnLimitPerMessage();
    message.token = object.token ?? "";
    message.burnLimitPerMessage = object.burnLimitPerMessage ?? "";
    return message;
  },
  fromAmino(object: SetBurnLimitPerMessageAmino): SetBurnLimitPerMessage {
    const message = createBaseSetBurnLimitPerMessage();
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    }
    if (object.burn_limit_per_message !== undefined && object.burn_limit_per_message !== null) {
      message.burnLimitPerMessage = object.burn_limit_per_message;
    }
    return message;
  },
  toAmino(message: SetBurnLimitPerMessage, useInterfaces: boolean = false): SetBurnLimitPerMessageAmino {
    const obj: any = {};
    obj.token = message.token;
    obj.burn_limit_per_message = message.burnLimitPerMessage;
    return obj;
  },
  fromAminoMsg(object: SetBurnLimitPerMessageAminoMsg): SetBurnLimitPerMessage {
    return SetBurnLimitPerMessage.fromAmino(object.value);
  },
  fromProtoMsg(message: SetBurnLimitPerMessageProtoMsg, useInterfaces: boolean = false): SetBurnLimitPerMessage {
    return SetBurnLimitPerMessage.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetBurnLimitPerMessage): Uint8Array {
    return SetBurnLimitPerMessage.encode(message).finish();
  },
  toProtoMsg(message: SetBurnLimitPerMessage): SetBurnLimitPerMessageProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.SetBurnLimitPerMessage",
      value: SetBurnLimitPerMessage.encode(message).finish()
    };
  }
};