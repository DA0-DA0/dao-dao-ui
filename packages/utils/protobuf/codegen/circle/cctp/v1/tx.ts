//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
/** TODO add comments */
export interface MsgUpdateOwner {
  from: string;
  newOwner: string;
}
export interface MsgUpdateOwnerProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateOwner";
  value: Uint8Array;
}
/** TODO add comments */
export interface MsgUpdateOwnerAmino {
  from?: string;
  new_owner?: string;
}
export interface MsgUpdateOwnerAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateOwner";
  value: MsgUpdateOwnerAmino;
}
/** TODO add comments */
export interface MsgUpdateOwnerSDKType {
  from: string;
  new_owner: string;
}
export interface MsgUpdateOwnerResponse {}
export interface MsgUpdateOwnerResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateOwnerResponse";
  value: Uint8Array;
}
export interface MsgUpdateOwnerResponseAmino {}
export interface MsgUpdateOwnerResponseAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateOwnerResponse";
  value: MsgUpdateOwnerResponseAmino;
}
export interface MsgUpdateOwnerResponseSDKType {}
export interface MsgUpdateAttesterManager {
  from: string;
  newAttesterManager: string;
}
export interface MsgUpdateAttesterManagerProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateAttesterManager";
  value: Uint8Array;
}
export interface MsgUpdateAttesterManagerAmino {
  from?: string;
  new_attester_manager?: string;
}
export interface MsgUpdateAttesterManagerAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateAttesterManager";
  value: MsgUpdateAttesterManagerAmino;
}
export interface MsgUpdateAttesterManagerSDKType {
  from: string;
  new_attester_manager: string;
}
export interface MsgUpdateAttesterManagerResponse {}
export interface MsgUpdateAttesterManagerResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateAttesterManagerResponse";
  value: Uint8Array;
}
export interface MsgUpdateAttesterManagerResponseAmino {}
export interface MsgUpdateAttesterManagerResponseAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateAttesterManagerResponse";
  value: MsgUpdateAttesterManagerResponseAmino;
}
export interface MsgUpdateAttesterManagerResponseSDKType {}
export interface MsgUpdateTokenController {
  from: string;
  newTokenController: string;
}
export interface MsgUpdateTokenControllerProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateTokenController";
  value: Uint8Array;
}
export interface MsgUpdateTokenControllerAmino {
  from?: string;
  new_token_controller?: string;
}
export interface MsgUpdateTokenControllerAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateTokenController";
  value: MsgUpdateTokenControllerAmino;
}
export interface MsgUpdateTokenControllerSDKType {
  from: string;
  new_token_controller: string;
}
export interface MsgUpdateTokenControllerResponse {}
export interface MsgUpdateTokenControllerResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateTokenControllerResponse";
  value: Uint8Array;
}
export interface MsgUpdateTokenControllerResponseAmino {}
export interface MsgUpdateTokenControllerResponseAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateTokenControllerResponse";
  value: MsgUpdateTokenControllerResponseAmino;
}
export interface MsgUpdateTokenControllerResponseSDKType {}
export interface MsgUpdatePauser {
  from: string;
  newPauser: string;
}
export interface MsgUpdatePauserProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdatePauser";
  value: Uint8Array;
}
export interface MsgUpdatePauserAmino {
  from?: string;
  new_pauser?: string;
}
export interface MsgUpdatePauserAminoMsg {
  type: "/circle.cctp.v1.MsgUpdatePauser";
  value: MsgUpdatePauserAmino;
}
export interface MsgUpdatePauserSDKType {
  from: string;
  new_pauser: string;
}
export interface MsgUpdatePauserResponse {}
export interface MsgUpdatePauserResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdatePauserResponse";
  value: Uint8Array;
}
export interface MsgUpdatePauserResponseAmino {}
export interface MsgUpdatePauserResponseAminoMsg {
  type: "/circle.cctp.v1.MsgUpdatePauserResponse";
  value: MsgUpdatePauserResponseAmino;
}
export interface MsgUpdatePauserResponseSDKType {}
export interface MsgAcceptOwner {
  from: string;
}
export interface MsgAcceptOwnerProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgAcceptOwner";
  value: Uint8Array;
}
export interface MsgAcceptOwnerAmino {
  from?: string;
}
export interface MsgAcceptOwnerAminoMsg {
  type: "/circle.cctp.v1.MsgAcceptOwner";
  value: MsgAcceptOwnerAmino;
}
export interface MsgAcceptOwnerSDKType {
  from: string;
}
export interface MsgAcceptOwnerResponse {}
export interface MsgAcceptOwnerResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgAcceptOwnerResponse";
  value: Uint8Array;
}
export interface MsgAcceptOwnerResponseAmino {}
export interface MsgAcceptOwnerResponseAminoMsg {
  type: "/circle.cctp.v1.MsgAcceptOwnerResponse";
  value: MsgAcceptOwnerResponseAmino;
}
export interface MsgAcceptOwnerResponseSDKType {}
export interface MsgEnableAttester {
  from: string;
  attester: string;
}
export interface MsgEnableAttesterProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgEnableAttester";
  value: Uint8Array;
}
export interface MsgEnableAttesterAmino {
  from?: string;
  attester?: string;
}
export interface MsgEnableAttesterAminoMsg {
  type: "/circle.cctp.v1.MsgEnableAttester";
  value: MsgEnableAttesterAmino;
}
export interface MsgEnableAttesterSDKType {
  from: string;
  attester: string;
}
export interface MsgEnableAttesterResponse {}
export interface MsgEnableAttesterResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgEnableAttesterResponse";
  value: Uint8Array;
}
export interface MsgEnableAttesterResponseAmino {}
export interface MsgEnableAttesterResponseAminoMsg {
  type: "/circle.cctp.v1.MsgEnableAttesterResponse";
  value: MsgEnableAttesterResponseAmino;
}
export interface MsgEnableAttesterResponseSDKType {}
export interface MsgDisableAttester {
  from: string;
  attester: string;
}
export interface MsgDisableAttesterProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgDisableAttester";
  value: Uint8Array;
}
export interface MsgDisableAttesterAmino {
  from?: string;
  attester?: string;
}
export interface MsgDisableAttesterAminoMsg {
  type: "/circle.cctp.v1.MsgDisableAttester";
  value: MsgDisableAttesterAmino;
}
export interface MsgDisableAttesterSDKType {
  from: string;
  attester: string;
}
export interface MsgDisableAttesterResponse {}
export interface MsgDisableAttesterResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgDisableAttesterResponse";
  value: Uint8Array;
}
export interface MsgDisableAttesterResponseAmino {}
export interface MsgDisableAttesterResponseAminoMsg {
  type: "/circle.cctp.v1.MsgDisableAttesterResponse";
  value: MsgDisableAttesterResponseAmino;
}
export interface MsgDisableAttesterResponseSDKType {}
export interface MsgPauseBurningAndMinting {
  from: string;
}
export interface MsgPauseBurningAndMintingProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgPauseBurningAndMinting";
  value: Uint8Array;
}
export interface MsgPauseBurningAndMintingAmino {
  from?: string;
}
export interface MsgPauseBurningAndMintingAminoMsg {
  type: "/circle.cctp.v1.MsgPauseBurningAndMinting";
  value: MsgPauseBurningAndMintingAmino;
}
export interface MsgPauseBurningAndMintingSDKType {
  from: string;
}
export interface MsgPauseBurningAndMintingResponse {}
export interface MsgPauseBurningAndMintingResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgPauseBurningAndMintingResponse";
  value: Uint8Array;
}
export interface MsgPauseBurningAndMintingResponseAmino {}
export interface MsgPauseBurningAndMintingResponseAminoMsg {
  type: "/circle.cctp.v1.MsgPauseBurningAndMintingResponse";
  value: MsgPauseBurningAndMintingResponseAmino;
}
export interface MsgPauseBurningAndMintingResponseSDKType {}
export interface MsgUnpauseBurningAndMinting {
  from: string;
}
export interface MsgUnpauseBurningAndMintingProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUnpauseBurningAndMinting";
  value: Uint8Array;
}
export interface MsgUnpauseBurningAndMintingAmino {
  from?: string;
}
export interface MsgUnpauseBurningAndMintingAminoMsg {
  type: "/circle.cctp.v1.MsgUnpauseBurningAndMinting";
  value: MsgUnpauseBurningAndMintingAmino;
}
export interface MsgUnpauseBurningAndMintingSDKType {
  from: string;
}
export interface MsgUnpauseBurningAndMintingResponse {}
export interface MsgUnpauseBurningAndMintingResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUnpauseBurningAndMintingResponse";
  value: Uint8Array;
}
export interface MsgUnpauseBurningAndMintingResponseAmino {}
export interface MsgUnpauseBurningAndMintingResponseAminoMsg {
  type: "/circle.cctp.v1.MsgUnpauseBurningAndMintingResponse";
  value: MsgUnpauseBurningAndMintingResponseAmino;
}
export interface MsgUnpauseBurningAndMintingResponseSDKType {}
export interface MsgPauseSendingAndReceivingMessages {
  from: string;
}
export interface MsgPauseSendingAndReceivingMessagesProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgPauseSendingAndReceivingMessages";
  value: Uint8Array;
}
export interface MsgPauseSendingAndReceivingMessagesAmino {
  from?: string;
}
export interface MsgPauseSendingAndReceivingMessagesAminoMsg {
  type: "/circle.cctp.v1.MsgPauseSendingAndReceivingMessages";
  value: MsgPauseSendingAndReceivingMessagesAmino;
}
export interface MsgPauseSendingAndReceivingMessagesSDKType {
  from: string;
}
export interface MsgPauseSendingAndReceivingMessagesResponse {}
export interface MsgPauseSendingAndReceivingMessagesResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgPauseSendingAndReceivingMessagesResponse";
  value: Uint8Array;
}
export interface MsgPauseSendingAndReceivingMessagesResponseAmino {}
export interface MsgPauseSendingAndReceivingMessagesResponseAminoMsg {
  type: "/circle.cctp.v1.MsgPauseSendingAndReceivingMessagesResponse";
  value: MsgPauseSendingAndReceivingMessagesResponseAmino;
}
export interface MsgPauseSendingAndReceivingMessagesResponseSDKType {}
export interface MsgUnpauseSendingAndReceivingMessages {
  from: string;
}
export interface MsgUnpauseSendingAndReceivingMessagesProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessages";
  value: Uint8Array;
}
export interface MsgUnpauseSendingAndReceivingMessagesAmino {
  from?: string;
}
export interface MsgUnpauseSendingAndReceivingMessagesAminoMsg {
  type: "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessages";
  value: MsgUnpauseSendingAndReceivingMessagesAmino;
}
export interface MsgUnpauseSendingAndReceivingMessagesSDKType {
  from: string;
}
export interface MsgUnpauseSendingAndReceivingMessagesResponse {}
export interface MsgUnpauseSendingAndReceivingMessagesResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessagesResponse";
  value: Uint8Array;
}
export interface MsgUnpauseSendingAndReceivingMessagesResponseAmino {}
export interface MsgUnpauseSendingAndReceivingMessagesResponseAminoMsg {
  type: "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessagesResponse";
  value: MsgUnpauseSendingAndReceivingMessagesResponseAmino;
}
export interface MsgUnpauseSendingAndReceivingMessagesResponseSDKType {}
export interface MsgUpdateMaxMessageBodySize {
  from: string;
  messageSize: bigint;
}
export interface MsgUpdateMaxMessageBodySizeProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateMaxMessageBodySize";
  value: Uint8Array;
}
export interface MsgUpdateMaxMessageBodySizeAmino {
  from?: string;
  message_size?: string;
}
export interface MsgUpdateMaxMessageBodySizeAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateMaxMessageBodySize";
  value: MsgUpdateMaxMessageBodySizeAmino;
}
export interface MsgUpdateMaxMessageBodySizeSDKType {
  from: string;
  message_size: bigint;
}
export interface MsgUpdateMaxMessageBodySizeResponse {}
export interface MsgUpdateMaxMessageBodySizeResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateMaxMessageBodySizeResponse";
  value: Uint8Array;
}
export interface MsgUpdateMaxMessageBodySizeResponseAmino {}
export interface MsgUpdateMaxMessageBodySizeResponseAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateMaxMessageBodySizeResponse";
  value: MsgUpdateMaxMessageBodySizeResponseAmino;
}
export interface MsgUpdateMaxMessageBodySizeResponseSDKType {}
export interface MsgSetMaxBurnAmountPerMessage {
  from: string;
  localToken: string;
  amount: string;
}
export interface MsgSetMaxBurnAmountPerMessageProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessage";
  value: Uint8Array;
}
export interface MsgSetMaxBurnAmountPerMessageAmino {
  from?: string;
  local_token?: string;
  amount?: string;
}
export interface MsgSetMaxBurnAmountPerMessageAminoMsg {
  type: "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessage";
  value: MsgSetMaxBurnAmountPerMessageAmino;
}
export interface MsgSetMaxBurnAmountPerMessageSDKType {
  from: string;
  local_token: string;
  amount: string;
}
export interface MsgSetMaxBurnAmountPerMessageResponse {}
export interface MsgSetMaxBurnAmountPerMessageResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessageResponse";
  value: Uint8Array;
}
export interface MsgSetMaxBurnAmountPerMessageResponseAmino {}
export interface MsgSetMaxBurnAmountPerMessageResponseAminoMsg {
  type: "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessageResponse";
  value: MsgSetMaxBurnAmountPerMessageResponseAmino;
}
export interface MsgSetMaxBurnAmountPerMessageResponseSDKType {}
export interface MsgDepositForBurn {
  from: string;
  amount: string;
  destinationDomain: number;
  mintRecipient: Uint8Array;
  burnToken: string;
}
export interface MsgDepositForBurnProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurn";
  value: Uint8Array;
}
export interface MsgDepositForBurnAmino {
  from?: string;
  amount?: string;
  destination_domain?: number;
  mint_recipient?: string;
  burn_token?: string;
}
export interface MsgDepositForBurnAminoMsg {
  type: "/circle.cctp.v1.MsgDepositForBurn";
  value: MsgDepositForBurnAmino;
}
export interface MsgDepositForBurnSDKType {
  from: string;
  amount: string;
  destination_domain: number;
  mint_recipient: Uint8Array;
  burn_token: string;
}
export interface MsgDepositForBurnResponse {
  nonce: bigint;
}
export interface MsgDepositForBurnResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurnResponse";
  value: Uint8Array;
}
export interface MsgDepositForBurnResponseAmino {
  nonce?: string;
}
export interface MsgDepositForBurnResponseAminoMsg {
  type: "/circle.cctp.v1.MsgDepositForBurnResponse";
  value: MsgDepositForBurnResponseAmino;
}
export interface MsgDepositForBurnResponseSDKType {
  nonce: bigint;
}
export interface MsgDepositForBurnWithCaller {
  from: string;
  amount: string;
  destinationDomain: number;
  mintRecipient: Uint8Array;
  burnToken: string;
  destinationCaller: Uint8Array;
}
export interface MsgDepositForBurnWithCallerProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurnWithCaller";
  value: Uint8Array;
}
export interface MsgDepositForBurnWithCallerAmino {
  from?: string;
  amount?: string;
  destination_domain?: number;
  mint_recipient?: string;
  burn_token?: string;
  destination_caller?: string;
}
export interface MsgDepositForBurnWithCallerAminoMsg {
  type: "/circle.cctp.v1.MsgDepositForBurnWithCaller";
  value: MsgDepositForBurnWithCallerAmino;
}
export interface MsgDepositForBurnWithCallerSDKType {
  from: string;
  amount: string;
  destination_domain: number;
  mint_recipient: Uint8Array;
  burn_token: string;
  destination_caller: Uint8Array;
}
export interface MsgDepositForBurnWithCallerResponse {
  nonce: bigint;
}
export interface MsgDepositForBurnWithCallerResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurnWithCallerResponse";
  value: Uint8Array;
}
export interface MsgDepositForBurnWithCallerResponseAmino {
  nonce?: string;
}
export interface MsgDepositForBurnWithCallerResponseAminoMsg {
  type: "/circle.cctp.v1.MsgDepositForBurnWithCallerResponse";
  value: MsgDepositForBurnWithCallerResponseAmino;
}
export interface MsgDepositForBurnWithCallerResponseSDKType {
  nonce: bigint;
}
export interface MsgReplaceDepositForBurn {
  from: string;
  originalMessage: Uint8Array;
  originalAttestation: Uint8Array;
  newDestinationCaller: Uint8Array;
  newMintRecipient: Uint8Array;
}
export interface MsgReplaceDepositForBurnProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgReplaceDepositForBurn";
  value: Uint8Array;
}
export interface MsgReplaceDepositForBurnAmino {
  from?: string;
  original_message?: string;
  original_attestation?: string;
  new_destination_caller?: string;
  new_mint_recipient?: string;
}
export interface MsgReplaceDepositForBurnAminoMsg {
  type: "/circle.cctp.v1.MsgReplaceDepositForBurn";
  value: MsgReplaceDepositForBurnAmino;
}
export interface MsgReplaceDepositForBurnSDKType {
  from: string;
  original_message: Uint8Array;
  original_attestation: Uint8Array;
  new_destination_caller: Uint8Array;
  new_mint_recipient: Uint8Array;
}
export interface MsgReplaceDepositForBurnResponse {}
export interface MsgReplaceDepositForBurnResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgReplaceDepositForBurnResponse";
  value: Uint8Array;
}
export interface MsgReplaceDepositForBurnResponseAmino {}
export interface MsgReplaceDepositForBurnResponseAminoMsg {
  type: "/circle.cctp.v1.MsgReplaceDepositForBurnResponse";
  value: MsgReplaceDepositForBurnResponseAmino;
}
export interface MsgReplaceDepositForBurnResponseSDKType {}
export interface MsgReceiveMessage {
  from: string;
  message: Uint8Array;
  attestation: Uint8Array;
}
export interface MsgReceiveMessageProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgReceiveMessage";
  value: Uint8Array;
}
export interface MsgReceiveMessageAmino {
  from?: string;
  message?: string;
  attestation?: string;
}
export interface MsgReceiveMessageAminoMsg {
  type: "/circle.cctp.v1.MsgReceiveMessage";
  value: MsgReceiveMessageAmino;
}
export interface MsgReceiveMessageSDKType {
  from: string;
  message: Uint8Array;
  attestation: Uint8Array;
}
export interface MsgReceiveMessageResponse {
  success: boolean;
}
export interface MsgReceiveMessageResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgReceiveMessageResponse";
  value: Uint8Array;
}
export interface MsgReceiveMessageResponseAmino {
  success?: boolean;
}
export interface MsgReceiveMessageResponseAminoMsg {
  type: "/circle.cctp.v1.MsgReceiveMessageResponse";
  value: MsgReceiveMessageResponseAmino;
}
export interface MsgReceiveMessageResponseSDKType {
  success: boolean;
}
export interface MsgSendMessage {
  from: string;
  destinationDomain: number;
  recipient: Uint8Array;
  messageBody: Uint8Array;
}
export interface MsgSendMessageProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgSendMessage";
  value: Uint8Array;
}
export interface MsgSendMessageAmino {
  from?: string;
  destination_domain?: number;
  recipient?: string;
  message_body?: string;
}
export interface MsgSendMessageAminoMsg {
  type: "/circle.cctp.v1.MsgSendMessage";
  value: MsgSendMessageAmino;
}
export interface MsgSendMessageSDKType {
  from: string;
  destination_domain: number;
  recipient: Uint8Array;
  message_body: Uint8Array;
}
export interface MsgSendMessageResponse {
  nonce: bigint;
}
export interface MsgSendMessageResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgSendMessageResponse";
  value: Uint8Array;
}
export interface MsgSendMessageResponseAmino {
  nonce?: string;
}
export interface MsgSendMessageResponseAminoMsg {
  type: "/circle.cctp.v1.MsgSendMessageResponse";
  value: MsgSendMessageResponseAmino;
}
export interface MsgSendMessageResponseSDKType {
  nonce: bigint;
}
export interface MsgSendMessageWithCaller {
  from: string;
  destinationDomain: number;
  recipient: Uint8Array;
  messageBody: Uint8Array;
  destinationCaller: Uint8Array;
}
export interface MsgSendMessageWithCallerProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgSendMessageWithCaller";
  value: Uint8Array;
}
export interface MsgSendMessageWithCallerAmino {
  from?: string;
  destination_domain?: number;
  recipient?: string;
  message_body?: string;
  destination_caller?: string;
}
export interface MsgSendMessageWithCallerAminoMsg {
  type: "/circle.cctp.v1.MsgSendMessageWithCaller";
  value: MsgSendMessageWithCallerAmino;
}
export interface MsgSendMessageWithCallerSDKType {
  from: string;
  destination_domain: number;
  recipient: Uint8Array;
  message_body: Uint8Array;
  destination_caller: Uint8Array;
}
export interface MsgSendMessageWithCallerResponse {
  nonce: bigint;
}
export interface MsgSendMessageWithCallerResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgSendMessageWithCallerResponse";
  value: Uint8Array;
}
export interface MsgSendMessageWithCallerResponseAmino {
  nonce?: string;
}
export interface MsgSendMessageWithCallerResponseAminoMsg {
  type: "/circle.cctp.v1.MsgSendMessageWithCallerResponse";
  value: MsgSendMessageWithCallerResponseAmino;
}
export interface MsgSendMessageWithCallerResponseSDKType {
  nonce: bigint;
}
export interface MsgReplaceMessage {
  from: string;
  originalMessage: Uint8Array;
  originalAttestation: Uint8Array;
  newMessageBody: Uint8Array;
  newDestinationCaller: Uint8Array;
}
export interface MsgReplaceMessageProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgReplaceMessage";
  value: Uint8Array;
}
export interface MsgReplaceMessageAmino {
  from?: string;
  original_message?: string;
  original_attestation?: string;
  new_message_body?: string;
  new_destination_caller?: string;
}
export interface MsgReplaceMessageAminoMsg {
  type: "/circle.cctp.v1.MsgReplaceMessage";
  value: MsgReplaceMessageAmino;
}
export interface MsgReplaceMessageSDKType {
  from: string;
  original_message: Uint8Array;
  original_attestation: Uint8Array;
  new_message_body: Uint8Array;
  new_destination_caller: Uint8Array;
}
export interface MsgReplaceMessageResponse {}
export interface MsgReplaceMessageResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgReplaceMessageResponse";
  value: Uint8Array;
}
export interface MsgReplaceMessageResponseAmino {}
export interface MsgReplaceMessageResponseAminoMsg {
  type: "/circle.cctp.v1.MsgReplaceMessageResponse";
  value: MsgReplaceMessageResponseAmino;
}
export interface MsgReplaceMessageResponseSDKType {}
export interface MsgUpdateSignatureThreshold {
  from: string;
  amount: number;
}
export interface MsgUpdateSignatureThresholdProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateSignatureThreshold";
  value: Uint8Array;
}
export interface MsgUpdateSignatureThresholdAmino {
  from?: string;
  amount?: number;
}
export interface MsgUpdateSignatureThresholdAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateSignatureThreshold";
  value: MsgUpdateSignatureThresholdAmino;
}
export interface MsgUpdateSignatureThresholdSDKType {
  from: string;
  amount: number;
}
export interface MsgUpdateSignatureThresholdResponse {}
export interface MsgUpdateSignatureThresholdResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUpdateSignatureThresholdResponse";
  value: Uint8Array;
}
export interface MsgUpdateSignatureThresholdResponseAmino {}
export interface MsgUpdateSignatureThresholdResponseAminoMsg {
  type: "/circle.cctp.v1.MsgUpdateSignatureThresholdResponse";
  value: MsgUpdateSignatureThresholdResponseAmino;
}
export interface MsgUpdateSignatureThresholdResponseSDKType {}
export interface MsgLinkTokenPair {
  from: string;
  remoteDomain: number;
  remoteToken: Uint8Array;
  localToken: string;
}
export interface MsgLinkTokenPairProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgLinkTokenPair";
  value: Uint8Array;
}
export interface MsgLinkTokenPairAmino {
  from?: string;
  remote_domain?: number;
  remote_token?: string;
  local_token?: string;
}
export interface MsgLinkTokenPairAminoMsg {
  type: "/circle.cctp.v1.MsgLinkTokenPair";
  value: MsgLinkTokenPairAmino;
}
export interface MsgLinkTokenPairSDKType {
  from: string;
  remote_domain: number;
  remote_token: Uint8Array;
  local_token: string;
}
export interface MsgLinkTokenPairResponse {}
export interface MsgLinkTokenPairResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgLinkTokenPairResponse";
  value: Uint8Array;
}
export interface MsgLinkTokenPairResponseAmino {}
export interface MsgLinkTokenPairResponseAminoMsg {
  type: "/circle.cctp.v1.MsgLinkTokenPairResponse";
  value: MsgLinkTokenPairResponseAmino;
}
export interface MsgLinkTokenPairResponseSDKType {}
export interface MsgUnlinkTokenPair {
  from: string;
  remoteDomain: number;
  remoteToken: Uint8Array;
  localToken: string;
}
export interface MsgUnlinkTokenPairProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUnlinkTokenPair";
  value: Uint8Array;
}
export interface MsgUnlinkTokenPairAmino {
  from?: string;
  remote_domain?: number;
  remote_token?: string;
  local_token?: string;
}
export interface MsgUnlinkTokenPairAminoMsg {
  type: "/circle.cctp.v1.MsgUnlinkTokenPair";
  value: MsgUnlinkTokenPairAmino;
}
export interface MsgUnlinkTokenPairSDKType {
  from: string;
  remote_domain: number;
  remote_token: Uint8Array;
  local_token: string;
}
export interface MsgUnlinkTokenPairResponse {}
export interface MsgUnlinkTokenPairResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgUnlinkTokenPairResponse";
  value: Uint8Array;
}
export interface MsgUnlinkTokenPairResponseAmino {}
export interface MsgUnlinkTokenPairResponseAminoMsg {
  type: "/circle.cctp.v1.MsgUnlinkTokenPairResponse";
  value: MsgUnlinkTokenPairResponseAmino;
}
export interface MsgUnlinkTokenPairResponseSDKType {}
export interface MsgAddRemoteTokenMessenger {
  from: string;
  domainId: number;
  address: Uint8Array;
}
export interface MsgAddRemoteTokenMessengerProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgAddRemoteTokenMessenger";
  value: Uint8Array;
}
export interface MsgAddRemoteTokenMessengerAmino {
  from?: string;
  domain_id?: number;
  address?: string;
}
export interface MsgAddRemoteTokenMessengerAminoMsg {
  type: "/circle.cctp.v1.MsgAddRemoteTokenMessenger";
  value: MsgAddRemoteTokenMessengerAmino;
}
export interface MsgAddRemoteTokenMessengerSDKType {
  from: string;
  domain_id: number;
  address: Uint8Array;
}
export interface MsgAddRemoteTokenMessengerResponse {}
export interface MsgAddRemoteTokenMessengerResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgAddRemoteTokenMessengerResponse";
  value: Uint8Array;
}
export interface MsgAddRemoteTokenMessengerResponseAmino {}
export interface MsgAddRemoteTokenMessengerResponseAminoMsg {
  type: "/circle.cctp.v1.MsgAddRemoteTokenMessengerResponse";
  value: MsgAddRemoteTokenMessengerResponseAmino;
}
export interface MsgAddRemoteTokenMessengerResponseSDKType {}
export interface MsgRemoveRemoteTokenMessenger {
  from: string;
  domainId: number;
}
export interface MsgRemoveRemoteTokenMessengerProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgRemoveRemoteTokenMessenger";
  value: Uint8Array;
}
export interface MsgRemoveRemoteTokenMessengerAmino {
  from?: string;
  domain_id?: number;
}
export interface MsgRemoveRemoteTokenMessengerAminoMsg {
  type: "/circle.cctp.v1.MsgRemoveRemoteTokenMessenger";
  value: MsgRemoveRemoteTokenMessengerAmino;
}
export interface MsgRemoveRemoteTokenMessengerSDKType {
  from: string;
  domain_id: number;
}
export interface MsgRemoveRemoteTokenMessengerResponse {}
export interface MsgRemoveRemoteTokenMessengerResponseProtoMsg {
  typeUrl: "/circle.cctp.v1.MsgRemoveRemoteTokenMessengerResponse";
  value: Uint8Array;
}
export interface MsgRemoveRemoteTokenMessengerResponseAmino {}
export interface MsgRemoveRemoteTokenMessengerResponseAminoMsg {
  type: "/circle.cctp.v1.MsgRemoveRemoteTokenMessengerResponse";
  value: MsgRemoveRemoteTokenMessengerResponseAmino;
}
export interface MsgRemoveRemoteTokenMessengerResponseSDKType {}
function createBaseMsgUpdateOwner(): MsgUpdateOwner {
  return {
    from: "",
    newOwner: ""
  };
}
export const MsgUpdateOwner = {
  typeUrl: "/circle.cctp.v1.MsgUpdateOwner",
  encode(message: MsgUpdateOwner, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.newOwner !== "") {
      writer.uint32(18).string(message.newOwner);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateOwner {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
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
  fromPartial(object: Partial<MsgUpdateOwner>): MsgUpdateOwner {
    const message = createBaseMsgUpdateOwner();
    message.from = object.from ?? "";
    message.newOwner = object.newOwner ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateOwnerAmino): MsgUpdateOwner {
    const message = createBaseMsgUpdateOwner();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.new_owner !== undefined && object.new_owner !== null) {
      message.newOwner = object.new_owner;
    }
    return message;
  },
  toAmino(message: MsgUpdateOwner, useInterfaces: boolean = false): MsgUpdateOwnerAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.new_owner = message.newOwner;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateOwnerAminoMsg): MsgUpdateOwner {
    return MsgUpdateOwner.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateOwnerProtoMsg, useInterfaces: boolean = false): MsgUpdateOwner {
    return MsgUpdateOwner.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateOwner): Uint8Array {
    return MsgUpdateOwner.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateOwner): MsgUpdateOwnerProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateOwner",
      value: MsgUpdateOwner.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateOwnerResponse(): MsgUpdateOwnerResponse {
  return {};
}
export const MsgUpdateOwnerResponse = {
  typeUrl: "/circle.cctp.v1.MsgUpdateOwnerResponse",
  encode(_: MsgUpdateOwnerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateOwnerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateOwnerResponse();
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
  fromPartial(_: Partial<MsgUpdateOwnerResponse>): MsgUpdateOwnerResponse {
    const message = createBaseMsgUpdateOwnerResponse();
    return message;
  },
  fromAmino(_: MsgUpdateOwnerResponseAmino): MsgUpdateOwnerResponse {
    const message = createBaseMsgUpdateOwnerResponse();
    return message;
  },
  toAmino(_: MsgUpdateOwnerResponse, useInterfaces: boolean = false): MsgUpdateOwnerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateOwnerResponseAminoMsg): MsgUpdateOwnerResponse {
    return MsgUpdateOwnerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateOwnerResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateOwnerResponse {
    return MsgUpdateOwnerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateOwnerResponse): Uint8Array {
    return MsgUpdateOwnerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateOwnerResponse): MsgUpdateOwnerResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateOwnerResponse",
      value: MsgUpdateOwnerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateAttesterManager(): MsgUpdateAttesterManager {
  return {
    from: "",
    newAttesterManager: ""
  };
}
export const MsgUpdateAttesterManager = {
  typeUrl: "/circle.cctp.v1.MsgUpdateAttesterManager",
  encode(message: MsgUpdateAttesterManager, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.newAttesterManager !== "") {
      writer.uint32(18).string(message.newAttesterManager);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateAttesterManager {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAttesterManager();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
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
  fromPartial(object: Partial<MsgUpdateAttesterManager>): MsgUpdateAttesterManager {
    const message = createBaseMsgUpdateAttesterManager();
    message.from = object.from ?? "";
    message.newAttesterManager = object.newAttesterManager ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateAttesterManagerAmino): MsgUpdateAttesterManager {
    const message = createBaseMsgUpdateAttesterManager();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.new_attester_manager !== undefined && object.new_attester_manager !== null) {
      message.newAttesterManager = object.new_attester_manager;
    }
    return message;
  },
  toAmino(message: MsgUpdateAttesterManager, useInterfaces: boolean = false): MsgUpdateAttesterManagerAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.new_attester_manager = message.newAttesterManager;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateAttesterManagerAminoMsg): MsgUpdateAttesterManager {
    return MsgUpdateAttesterManager.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateAttesterManagerProtoMsg, useInterfaces: boolean = false): MsgUpdateAttesterManager {
    return MsgUpdateAttesterManager.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateAttesterManager): Uint8Array {
    return MsgUpdateAttesterManager.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateAttesterManager): MsgUpdateAttesterManagerProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateAttesterManager",
      value: MsgUpdateAttesterManager.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateAttesterManagerResponse(): MsgUpdateAttesterManagerResponse {
  return {};
}
export const MsgUpdateAttesterManagerResponse = {
  typeUrl: "/circle.cctp.v1.MsgUpdateAttesterManagerResponse",
  encode(_: MsgUpdateAttesterManagerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateAttesterManagerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAttesterManagerResponse();
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
  fromPartial(_: Partial<MsgUpdateAttesterManagerResponse>): MsgUpdateAttesterManagerResponse {
    const message = createBaseMsgUpdateAttesterManagerResponse();
    return message;
  },
  fromAmino(_: MsgUpdateAttesterManagerResponseAmino): MsgUpdateAttesterManagerResponse {
    const message = createBaseMsgUpdateAttesterManagerResponse();
    return message;
  },
  toAmino(_: MsgUpdateAttesterManagerResponse, useInterfaces: boolean = false): MsgUpdateAttesterManagerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateAttesterManagerResponseAminoMsg): MsgUpdateAttesterManagerResponse {
    return MsgUpdateAttesterManagerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateAttesterManagerResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateAttesterManagerResponse {
    return MsgUpdateAttesterManagerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateAttesterManagerResponse): Uint8Array {
    return MsgUpdateAttesterManagerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateAttesterManagerResponse): MsgUpdateAttesterManagerResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateAttesterManagerResponse",
      value: MsgUpdateAttesterManagerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateTokenController(): MsgUpdateTokenController {
  return {
    from: "",
    newTokenController: ""
  };
}
export const MsgUpdateTokenController = {
  typeUrl: "/circle.cctp.v1.MsgUpdateTokenController",
  encode(message: MsgUpdateTokenController, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.newTokenController !== "") {
      writer.uint32(18).string(message.newTokenController);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateTokenController {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTokenController();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
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
  fromPartial(object: Partial<MsgUpdateTokenController>): MsgUpdateTokenController {
    const message = createBaseMsgUpdateTokenController();
    message.from = object.from ?? "";
    message.newTokenController = object.newTokenController ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateTokenControllerAmino): MsgUpdateTokenController {
    const message = createBaseMsgUpdateTokenController();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.new_token_controller !== undefined && object.new_token_controller !== null) {
      message.newTokenController = object.new_token_controller;
    }
    return message;
  },
  toAmino(message: MsgUpdateTokenController, useInterfaces: boolean = false): MsgUpdateTokenControllerAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.new_token_controller = message.newTokenController;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateTokenControllerAminoMsg): MsgUpdateTokenController {
    return MsgUpdateTokenController.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateTokenControllerProtoMsg, useInterfaces: boolean = false): MsgUpdateTokenController {
    return MsgUpdateTokenController.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateTokenController): Uint8Array {
    return MsgUpdateTokenController.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateTokenController): MsgUpdateTokenControllerProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateTokenController",
      value: MsgUpdateTokenController.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateTokenControllerResponse(): MsgUpdateTokenControllerResponse {
  return {};
}
export const MsgUpdateTokenControllerResponse = {
  typeUrl: "/circle.cctp.v1.MsgUpdateTokenControllerResponse",
  encode(_: MsgUpdateTokenControllerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateTokenControllerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTokenControllerResponse();
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
  fromPartial(_: Partial<MsgUpdateTokenControllerResponse>): MsgUpdateTokenControllerResponse {
    const message = createBaseMsgUpdateTokenControllerResponse();
    return message;
  },
  fromAmino(_: MsgUpdateTokenControllerResponseAmino): MsgUpdateTokenControllerResponse {
    const message = createBaseMsgUpdateTokenControllerResponse();
    return message;
  },
  toAmino(_: MsgUpdateTokenControllerResponse, useInterfaces: boolean = false): MsgUpdateTokenControllerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateTokenControllerResponseAminoMsg): MsgUpdateTokenControllerResponse {
    return MsgUpdateTokenControllerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateTokenControllerResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateTokenControllerResponse {
    return MsgUpdateTokenControllerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateTokenControllerResponse): Uint8Array {
    return MsgUpdateTokenControllerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateTokenControllerResponse): MsgUpdateTokenControllerResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateTokenControllerResponse",
      value: MsgUpdateTokenControllerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdatePauser(): MsgUpdatePauser {
  return {
    from: "",
    newPauser: ""
  };
}
export const MsgUpdatePauser = {
  typeUrl: "/circle.cctp.v1.MsgUpdatePauser",
  encode(message: MsgUpdatePauser, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.newPauser !== "") {
      writer.uint32(18).string(message.newPauser);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdatePauser {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePauser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
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
  fromPartial(object: Partial<MsgUpdatePauser>): MsgUpdatePauser {
    const message = createBaseMsgUpdatePauser();
    message.from = object.from ?? "";
    message.newPauser = object.newPauser ?? "";
    return message;
  },
  fromAmino(object: MsgUpdatePauserAmino): MsgUpdatePauser {
    const message = createBaseMsgUpdatePauser();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.new_pauser !== undefined && object.new_pauser !== null) {
      message.newPauser = object.new_pauser;
    }
    return message;
  },
  toAmino(message: MsgUpdatePauser, useInterfaces: boolean = false): MsgUpdatePauserAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.new_pauser = message.newPauser;
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePauserAminoMsg): MsgUpdatePauser {
    return MsgUpdatePauser.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdatePauserProtoMsg, useInterfaces: boolean = false): MsgUpdatePauser {
    return MsgUpdatePauser.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdatePauser): Uint8Array {
    return MsgUpdatePauser.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePauser): MsgUpdatePauserProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdatePauser",
      value: MsgUpdatePauser.encode(message).finish()
    };
  }
};
function createBaseMsgUpdatePauserResponse(): MsgUpdatePauserResponse {
  return {};
}
export const MsgUpdatePauserResponse = {
  typeUrl: "/circle.cctp.v1.MsgUpdatePauserResponse",
  encode(_: MsgUpdatePauserResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdatePauserResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePauserResponse();
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
  fromPartial(_: Partial<MsgUpdatePauserResponse>): MsgUpdatePauserResponse {
    const message = createBaseMsgUpdatePauserResponse();
    return message;
  },
  fromAmino(_: MsgUpdatePauserResponseAmino): MsgUpdatePauserResponse {
    const message = createBaseMsgUpdatePauserResponse();
    return message;
  },
  toAmino(_: MsgUpdatePauserResponse, useInterfaces: boolean = false): MsgUpdatePauserResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePauserResponseAminoMsg): MsgUpdatePauserResponse {
    return MsgUpdatePauserResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdatePauserResponseProtoMsg, useInterfaces: boolean = false): MsgUpdatePauserResponse {
    return MsgUpdatePauserResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdatePauserResponse): Uint8Array {
    return MsgUpdatePauserResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePauserResponse): MsgUpdatePauserResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdatePauserResponse",
      value: MsgUpdatePauserResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAcceptOwner(): MsgAcceptOwner {
  return {
    from: ""
  };
}
export const MsgAcceptOwner = {
  typeUrl: "/circle.cctp.v1.MsgAcceptOwner",
  encode(message: MsgAcceptOwner, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAcceptOwner {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcceptOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAcceptOwner>): MsgAcceptOwner {
    const message = createBaseMsgAcceptOwner();
    message.from = object.from ?? "";
    return message;
  },
  fromAmino(object: MsgAcceptOwnerAmino): MsgAcceptOwner {
    const message = createBaseMsgAcceptOwner();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    return message;
  },
  toAmino(message: MsgAcceptOwner, useInterfaces: boolean = false): MsgAcceptOwnerAmino {
    const obj: any = {};
    obj.from = message.from;
    return obj;
  },
  fromAminoMsg(object: MsgAcceptOwnerAminoMsg): MsgAcceptOwner {
    return MsgAcceptOwner.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAcceptOwnerProtoMsg, useInterfaces: boolean = false): MsgAcceptOwner {
    return MsgAcceptOwner.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAcceptOwner): Uint8Array {
    return MsgAcceptOwner.encode(message).finish();
  },
  toProtoMsg(message: MsgAcceptOwner): MsgAcceptOwnerProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgAcceptOwner",
      value: MsgAcceptOwner.encode(message).finish()
    };
  }
};
function createBaseMsgAcceptOwnerResponse(): MsgAcceptOwnerResponse {
  return {};
}
export const MsgAcceptOwnerResponse = {
  typeUrl: "/circle.cctp.v1.MsgAcceptOwnerResponse",
  encode(_: MsgAcceptOwnerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAcceptOwnerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcceptOwnerResponse();
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
  fromPartial(_: Partial<MsgAcceptOwnerResponse>): MsgAcceptOwnerResponse {
    const message = createBaseMsgAcceptOwnerResponse();
    return message;
  },
  fromAmino(_: MsgAcceptOwnerResponseAmino): MsgAcceptOwnerResponse {
    const message = createBaseMsgAcceptOwnerResponse();
    return message;
  },
  toAmino(_: MsgAcceptOwnerResponse, useInterfaces: boolean = false): MsgAcceptOwnerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAcceptOwnerResponseAminoMsg): MsgAcceptOwnerResponse {
    return MsgAcceptOwnerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAcceptOwnerResponseProtoMsg, useInterfaces: boolean = false): MsgAcceptOwnerResponse {
    return MsgAcceptOwnerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAcceptOwnerResponse): Uint8Array {
    return MsgAcceptOwnerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAcceptOwnerResponse): MsgAcceptOwnerResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgAcceptOwnerResponse",
      value: MsgAcceptOwnerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgEnableAttester(): MsgEnableAttester {
  return {
    from: "",
    attester: ""
  };
}
export const MsgEnableAttester = {
  typeUrl: "/circle.cctp.v1.MsgEnableAttester",
  encode(message: MsgEnableAttester, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.attester !== "") {
      writer.uint32(18).string(message.attester);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgEnableAttester {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEnableAttester();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.attester = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgEnableAttester>): MsgEnableAttester {
    const message = createBaseMsgEnableAttester();
    message.from = object.from ?? "";
    message.attester = object.attester ?? "";
    return message;
  },
  fromAmino(object: MsgEnableAttesterAmino): MsgEnableAttester {
    const message = createBaseMsgEnableAttester();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.attester !== undefined && object.attester !== null) {
      message.attester = object.attester;
    }
    return message;
  },
  toAmino(message: MsgEnableAttester, useInterfaces: boolean = false): MsgEnableAttesterAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.attester = message.attester;
    return obj;
  },
  fromAminoMsg(object: MsgEnableAttesterAminoMsg): MsgEnableAttester {
    return MsgEnableAttester.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgEnableAttesterProtoMsg, useInterfaces: boolean = false): MsgEnableAttester {
    return MsgEnableAttester.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgEnableAttester): Uint8Array {
    return MsgEnableAttester.encode(message).finish();
  },
  toProtoMsg(message: MsgEnableAttester): MsgEnableAttesterProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgEnableAttester",
      value: MsgEnableAttester.encode(message).finish()
    };
  }
};
function createBaseMsgEnableAttesterResponse(): MsgEnableAttesterResponse {
  return {};
}
export const MsgEnableAttesterResponse = {
  typeUrl: "/circle.cctp.v1.MsgEnableAttesterResponse",
  encode(_: MsgEnableAttesterResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgEnableAttesterResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEnableAttesterResponse();
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
  fromPartial(_: Partial<MsgEnableAttesterResponse>): MsgEnableAttesterResponse {
    const message = createBaseMsgEnableAttesterResponse();
    return message;
  },
  fromAmino(_: MsgEnableAttesterResponseAmino): MsgEnableAttesterResponse {
    const message = createBaseMsgEnableAttesterResponse();
    return message;
  },
  toAmino(_: MsgEnableAttesterResponse, useInterfaces: boolean = false): MsgEnableAttesterResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgEnableAttesterResponseAminoMsg): MsgEnableAttesterResponse {
    return MsgEnableAttesterResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgEnableAttesterResponseProtoMsg, useInterfaces: boolean = false): MsgEnableAttesterResponse {
    return MsgEnableAttesterResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgEnableAttesterResponse): Uint8Array {
    return MsgEnableAttesterResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgEnableAttesterResponse): MsgEnableAttesterResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgEnableAttesterResponse",
      value: MsgEnableAttesterResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDisableAttester(): MsgDisableAttester {
  return {
    from: "",
    attester: ""
  };
}
export const MsgDisableAttester = {
  typeUrl: "/circle.cctp.v1.MsgDisableAttester",
  encode(message: MsgDisableAttester, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.attester !== "") {
      writer.uint32(18).string(message.attester);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDisableAttester {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDisableAttester();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.attester = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDisableAttester>): MsgDisableAttester {
    const message = createBaseMsgDisableAttester();
    message.from = object.from ?? "";
    message.attester = object.attester ?? "";
    return message;
  },
  fromAmino(object: MsgDisableAttesterAmino): MsgDisableAttester {
    const message = createBaseMsgDisableAttester();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.attester !== undefined && object.attester !== null) {
      message.attester = object.attester;
    }
    return message;
  },
  toAmino(message: MsgDisableAttester, useInterfaces: boolean = false): MsgDisableAttesterAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.attester = message.attester;
    return obj;
  },
  fromAminoMsg(object: MsgDisableAttesterAminoMsg): MsgDisableAttester {
    return MsgDisableAttester.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDisableAttesterProtoMsg, useInterfaces: boolean = false): MsgDisableAttester {
    return MsgDisableAttester.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDisableAttester): Uint8Array {
    return MsgDisableAttester.encode(message).finish();
  },
  toProtoMsg(message: MsgDisableAttester): MsgDisableAttesterProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgDisableAttester",
      value: MsgDisableAttester.encode(message).finish()
    };
  }
};
function createBaseMsgDisableAttesterResponse(): MsgDisableAttesterResponse {
  return {};
}
export const MsgDisableAttesterResponse = {
  typeUrl: "/circle.cctp.v1.MsgDisableAttesterResponse",
  encode(_: MsgDisableAttesterResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDisableAttesterResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDisableAttesterResponse();
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
  fromPartial(_: Partial<MsgDisableAttesterResponse>): MsgDisableAttesterResponse {
    const message = createBaseMsgDisableAttesterResponse();
    return message;
  },
  fromAmino(_: MsgDisableAttesterResponseAmino): MsgDisableAttesterResponse {
    const message = createBaseMsgDisableAttesterResponse();
    return message;
  },
  toAmino(_: MsgDisableAttesterResponse, useInterfaces: boolean = false): MsgDisableAttesterResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDisableAttesterResponseAminoMsg): MsgDisableAttesterResponse {
    return MsgDisableAttesterResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDisableAttesterResponseProtoMsg, useInterfaces: boolean = false): MsgDisableAttesterResponse {
    return MsgDisableAttesterResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDisableAttesterResponse): Uint8Array {
    return MsgDisableAttesterResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDisableAttesterResponse): MsgDisableAttesterResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgDisableAttesterResponse",
      value: MsgDisableAttesterResponse.encode(message).finish()
    };
  }
};
function createBaseMsgPauseBurningAndMinting(): MsgPauseBurningAndMinting {
  return {
    from: ""
  };
}
export const MsgPauseBurningAndMinting = {
  typeUrl: "/circle.cctp.v1.MsgPauseBurningAndMinting",
  encode(message: MsgPauseBurningAndMinting, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgPauseBurningAndMinting {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPauseBurningAndMinting();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPauseBurningAndMinting>): MsgPauseBurningAndMinting {
    const message = createBaseMsgPauseBurningAndMinting();
    message.from = object.from ?? "";
    return message;
  },
  fromAmino(object: MsgPauseBurningAndMintingAmino): MsgPauseBurningAndMinting {
    const message = createBaseMsgPauseBurningAndMinting();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    return message;
  },
  toAmino(message: MsgPauseBurningAndMinting, useInterfaces: boolean = false): MsgPauseBurningAndMintingAmino {
    const obj: any = {};
    obj.from = message.from;
    return obj;
  },
  fromAminoMsg(object: MsgPauseBurningAndMintingAminoMsg): MsgPauseBurningAndMinting {
    return MsgPauseBurningAndMinting.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPauseBurningAndMintingProtoMsg, useInterfaces: boolean = false): MsgPauseBurningAndMinting {
    return MsgPauseBurningAndMinting.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgPauseBurningAndMinting): Uint8Array {
    return MsgPauseBurningAndMinting.encode(message).finish();
  },
  toProtoMsg(message: MsgPauseBurningAndMinting): MsgPauseBurningAndMintingProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgPauseBurningAndMinting",
      value: MsgPauseBurningAndMinting.encode(message).finish()
    };
  }
};
function createBaseMsgPauseBurningAndMintingResponse(): MsgPauseBurningAndMintingResponse {
  return {};
}
export const MsgPauseBurningAndMintingResponse = {
  typeUrl: "/circle.cctp.v1.MsgPauseBurningAndMintingResponse",
  encode(_: MsgPauseBurningAndMintingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgPauseBurningAndMintingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPauseBurningAndMintingResponse();
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
  fromPartial(_: Partial<MsgPauseBurningAndMintingResponse>): MsgPauseBurningAndMintingResponse {
    const message = createBaseMsgPauseBurningAndMintingResponse();
    return message;
  },
  fromAmino(_: MsgPauseBurningAndMintingResponseAmino): MsgPauseBurningAndMintingResponse {
    const message = createBaseMsgPauseBurningAndMintingResponse();
    return message;
  },
  toAmino(_: MsgPauseBurningAndMintingResponse, useInterfaces: boolean = false): MsgPauseBurningAndMintingResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgPauseBurningAndMintingResponseAminoMsg): MsgPauseBurningAndMintingResponse {
    return MsgPauseBurningAndMintingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPauseBurningAndMintingResponseProtoMsg, useInterfaces: boolean = false): MsgPauseBurningAndMintingResponse {
    return MsgPauseBurningAndMintingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgPauseBurningAndMintingResponse): Uint8Array {
    return MsgPauseBurningAndMintingResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgPauseBurningAndMintingResponse): MsgPauseBurningAndMintingResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgPauseBurningAndMintingResponse",
      value: MsgPauseBurningAndMintingResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUnpauseBurningAndMinting(): MsgUnpauseBurningAndMinting {
  return {
    from: ""
  };
}
export const MsgUnpauseBurningAndMinting = {
  typeUrl: "/circle.cctp.v1.MsgUnpauseBurningAndMinting",
  encode(message: MsgUnpauseBurningAndMinting, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnpauseBurningAndMinting {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnpauseBurningAndMinting();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUnpauseBurningAndMinting>): MsgUnpauseBurningAndMinting {
    const message = createBaseMsgUnpauseBurningAndMinting();
    message.from = object.from ?? "";
    return message;
  },
  fromAmino(object: MsgUnpauseBurningAndMintingAmino): MsgUnpauseBurningAndMinting {
    const message = createBaseMsgUnpauseBurningAndMinting();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    return message;
  },
  toAmino(message: MsgUnpauseBurningAndMinting, useInterfaces: boolean = false): MsgUnpauseBurningAndMintingAmino {
    const obj: any = {};
    obj.from = message.from;
    return obj;
  },
  fromAminoMsg(object: MsgUnpauseBurningAndMintingAminoMsg): MsgUnpauseBurningAndMinting {
    return MsgUnpauseBurningAndMinting.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnpauseBurningAndMintingProtoMsg, useInterfaces: boolean = false): MsgUnpauseBurningAndMinting {
    return MsgUnpauseBurningAndMinting.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnpauseBurningAndMinting): Uint8Array {
    return MsgUnpauseBurningAndMinting.encode(message).finish();
  },
  toProtoMsg(message: MsgUnpauseBurningAndMinting): MsgUnpauseBurningAndMintingProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUnpauseBurningAndMinting",
      value: MsgUnpauseBurningAndMinting.encode(message).finish()
    };
  }
};
function createBaseMsgUnpauseBurningAndMintingResponse(): MsgUnpauseBurningAndMintingResponse {
  return {};
}
export const MsgUnpauseBurningAndMintingResponse = {
  typeUrl: "/circle.cctp.v1.MsgUnpauseBurningAndMintingResponse",
  encode(_: MsgUnpauseBurningAndMintingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnpauseBurningAndMintingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnpauseBurningAndMintingResponse();
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
  fromPartial(_: Partial<MsgUnpauseBurningAndMintingResponse>): MsgUnpauseBurningAndMintingResponse {
    const message = createBaseMsgUnpauseBurningAndMintingResponse();
    return message;
  },
  fromAmino(_: MsgUnpauseBurningAndMintingResponseAmino): MsgUnpauseBurningAndMintingResponse {
    const message = createBaseMsgUnpauseBurningAndMintingResponse();
    return message;
  },
  toAmino(_: MsgUnpauseBurningAndMintingResponse, useInterfaces: boolean = false): MsgUnpauseBurningAndMintingResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUnpauseBurningAndMintingResponseAminoMsg): MsgUnpauseBurningAndMintingResponse {
    return MsgUnpauseBurningAndMintingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnpauseBurningAndMintingResponseProtoMsg, useInterfaces: boolean = false): MsgUnpauseBurningAndMintingResponse {
    return MsgUnpauseBurningAndMintingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnpauseBurningAndMintingResponse): Uint8Array {
    return MsgUnpauseBurningAndMintingResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUnpauseBurningAndMintingResponse): MsgUnpauseBurningAndMintingResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUnpauseBurningAndMintingResponse",
      value: MsgUnpauseBurningAndMintingResponse.encode(message).finish()
    };
  }
};
function createBaseMsgPauseSendingAndReceivingMessages(): MsgPauseSendingAndReceivingMessages {
  return {
    from: ""
  };
}
export const MsgPauseSendingAndReceivingMessages = {
  typeUrl: "/circle.cctp.v1.MsgPauseSendingAndReceivingMessages",
  encode(message: MsgPauseSendingAndReceivingMessages, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgPauseSendingAndReceivingMessages {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPauseSendingAndReceivingMessages();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPauseSendingAndReceivingMessages>): MsgPauseSendingAndReceivingMessages {
    const message = createBaseMsgPauseSendingAndReceivingMessages();
    message.from = object.from ?? "";
    return message;
  },
  fromAmino(object: MsgPauseSendingAndReceivingMessagesAmino): MsgPauseSendingAndReceivingMessages {
    const message = createBaseMsgPauseSendingAndReceivingMessages();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    return message;
  },
  toAmino(message: MsgPauseSendingAndReceivingMessages, useInterfaces: boolean = false): MsgPauseSendingAndReceivingMessagesAmino {
    const obj: any = {};
    obj.from = message.from;
    return obj;
  },
  fromAminoMsg(object: MsgPauseSendingAndReceivingMessagesAminoMsg): MsgPauseSendingAndReceivingMessages {
    return MsgPauseSendingAndReceivingMessages.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPauseSendingAndReceivingMessagesProtoMsg, useInterfaces: boolean = false): MsgPauseSendingAndReceivingMessages {
    return MsgPauseSendingAndReceivingMessages.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgPauseSendingAndReceivingMessages): Uint8Array {
    return MsgPauseSendingAndReceivingMessages.encode(message).finish();
  },
  toProtoMsg(message: MsgPauseSendingAndReceivingMessages): MsgPauseSendingAndReceivingMessagesProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgPauseSendingAndReceivingMessages",
      value: MsgPauseSendingAndReceivingMessages.encode(message).finish()
    };
  }
};
function createBaseMsgPauseSendingAndReceivingMessagesResponse(): MsgPauseSendingAndReceivingMessagesResponse {
  return {};
}
export const MsgPauseSendingAndReceivingMessagesResponse = {
  typeUrl: "/circle.cctp.v1.MsgPauseSendingAndReceivingMessagesResponse",
  encode(_: MsgPauseSendingAndReceivingMessagesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgPauseSendingAndReceivingMessagesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPauseSendingAndReceivingMessagesResponse();
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
  fromPartial(_: Partial<MsgPauseSendingAndReceivingMessagesResponse>): MsgPauseSendingAndReceivingMessagesResponse {
    const message = createBaseMsgPauseSendingAndReceivingMessagesResponse();
    return message;
  },
  fromAmino(_: MsgPauseSendingAndReceivingMessagesResponseAmino): MsgPauseSendingAndReceivingMessagesResponse {
    const message = createBaseMsgPauseSendingAndReceivingMessagesResponse();
    return message;
  },
  toAmino(_: MsgPauseSendingAndReceivingMessagesResponse, useInterfaces: boolean = false): MsgPauseSendingAndReceivingMessagesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgPauseSendingAndReceivingMessagesResponseAminoMsg): MsgPauseSendingAndReceivingMessagesResponse {
    return MsgPauseSendingAndReceivingMessagesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPauseSendingAndReceivingMessagesResponseProtoMsg, useInterfaces: boolean = false): MsgPauseSendingAndReceivingMessagesResponse {
    return MsgPauseSendingAndReceivingMessagesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgPauseSendingAndReceivingMessagesResponse): Uint8Array {
    return MsgPauseSendingAndReceivingMessagesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgPauseSendingAndReceivingMessagesResponse): MsgPauseSendingAndReceivingMessagesResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgPauseSendingAndReceivingMessagesResponse",
      value: MsgPauseSendingAndReceivingMessagesResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUnpauseSendingAndReceivingMessages(): MsgUnpauseSendingAndReceivingMessages {
  return {
    from: ""
  };
}
export const MsgUnpauseSendingAndReceivingMessages = {
  typeUrl: "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessages",
  encode(message: MsgUnpauseSendingAndReceivingMessages, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnpauseSendingAndReceivingMessages {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnpauseSendingAndReceivingMessages();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUnpauseSendingAndReceivingMessages>): MsgUnpauseSendingAndReceivingMessages {
    const message = createBaseMsgUnpauseSendingAndReceivingMessages();
    message.from = object.from ?? "";
    return message;
  },
  fromAmino(object: MsgUnpauseSendingAndReceivingMessagesAmino): MsgUnpauseSendingAndReceivingMessages {
    const message = createBaseMsgUnpauseSendingAndReceivingMessages();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    return message;
  },
  toAmino(message: MsgUnpauseSendingAndReceivingMessages, useInterfaces: boolean = false): MsgUnpauseSendingAndReceivingMessagesAmino {
    const obj: any = {};
    obj.from = message.from;
    return obj;
  },
  fromAminoMsg(object: MsgUnpauseSendingAndReceivingMessagesAminoMsg): MsgUnpauseSendingAndReceivingMessages {
    return MsgUnpauseSendingAndReceivingMessages.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnpauseSendingAndReceivingMessagesProtoMsg, useInterfaces: boolean = false): MsgUnpauseSendingAndReceivingMessages {
    return MsgUnpauseSendingAndReceivingMessages.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnpauseSendingAndReceivingMessages): Uint8Array {
    return MsgUnpauseSendingAndReceivingMessages.encode(message).finish();
  },
  toProtoMsg(message: MsgUnpauseSendingAndReceivingMessages): MsgUnpauseSendingAndReceivingMessagesProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessages",
      value: MsgUnpauseSendingAndReceivingMessages.encode(message).finish()
    };
  }
};
function createBaseMsgUnpauseSendingAndReceivingMessagesResponse(): MsgUnpauseSendingAndReceivingMessagesResponse {
  return {};
}
export const MsgUnpauseSendingAndReceivingMessagesResponse = {
  typeUrl: "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessagesResponse",
  encode(_: MsgUnpauseSendingAndReceivingMessagesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnpauseSendingAndReceivingMessagesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnpauseSendingAndReceivingMessagesResponse();
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
  fromPartial(_: Partial<MsgUnpauseSendingAndReceivingMessagesResponse>): MsgUnpauseSendingAndReceivingMessagesResponse {
    const message = createBaseMsgUnpauseSendingAndReceivingMessagesResponse();
    return message;
  },
  fromAmino(_: MsgUnpauseSendingAndReceivingMessagesResponseAmino): MsgUnpauseSendingAndReceivingMessagesResponse {
    const message = createBaseMsgUnpauseSendingAndReceivingMessagesResponse();
    return message;
  },
  toAmino(_: MsgUnpauseSendingAndReceivingMessagesResponse, useInterfaces: boolean = false): MsgUnpauseSendingAndReceivingMessagesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUnpauseSendingAndReceivingMessagesResponseAminoMsg): MsgUnpauseSendingAndReceivingMessagesResponse {
    return MsgUnpauseSendingAndReceivingMessagesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnpauseSendingAndReceivingMessagesResponseProtoMsg, useInterfaces: boolean = false): MsgUnpauseSendingAndReceivingMessagesResponse {
    return MsgUnpauseSendingAndReceivingMessagesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnpauseSendingAndReceivingMessagesResponse): Uint8Array {
    return MsgUnpauseSendingAndReceivingMessagesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUnpauseSendingAndReceivingMessagesResponse): MsgUnpauseSendingAndReceivingMessagesResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUnpauseSendingAndReceivingMessagesResponse",
      value: MsgUnpauseSendingAndReceivingMessagesResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateMaxMessageBodySize(): MsgUpdateMaxMessageBodySize {
  return {
    from: "",
    messageSize: BigInt(0)
  };
}
export const MsgUpdateMaxMessageBodySize = {
  typeUrl: "/circle.cctp.v1.MsgUpdateMaxMessageBodySize",
  encode(message: MsgUpdateMaxMessageBodySize, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.messageSize !== BigInt(0)) {
      writer.uint32(16).uint64(message.messageSize);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateMaxMessageBodySize {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMaxMessageBodySize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.messageSize = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateMaxMessageBodySize>): MsgUpdateMaxMessageBodySize {
    const message = createBaseMsgUpdateMaxMessageBodySize();
    message.from = object.from ?? "";
    message.messageSize = object.messageSize !== undefined && object.messageSize !== null ? BigInt(object.messageSize.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgUpdateMaxMessageBodySizeAmino): MsgUpdateMaxMessageBodySize {
    const message = createBaseMsgUpdateMaxMessageBodySize();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.message_size !== undefined && object.message_size !== null) {
      message.messageSize = BigInt(object.message_size);
    }
    return message;
  },
  toAmino(message: MsgUpdateMaxMessageBodySize, useInterfaces: boolean = false): MsgUpdateMaxMessageBodySizeAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.message_size = message.messageSize ? message.messageSize.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMaxMessageBodySizeAminoMsg): MsgUpdateMaxMessageBodySize {
    return MsgUpdateMaxMessageBodySize.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateMaxMessageBodySizeProtoMsg, useInterfaces: boolean = false): MsgUpdateMaxMessageBodySize {
    return MsgUpdateMaxMessageBodySize.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateMaxMessageBodySize): Uint8Array {
    return MsgUpdateMaxMessageBodySize.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMaxMessageBodySize): MsgUpdateMaxMessageBodySizeProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateMaxMessageBodySize",
      value: MsgUpdateMaxMessageBodySize.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateMaxMessageBodySizeResponse(): MsgUpdateMaxMessageBodySizeResponse {
  return {};
}
export const MsgUpdateMaxMessageBodySizeResponse = {
  typeUrl: "/circle.cctp.v1.MsgUpdateMaxMessageBodySizeResponse",
  encode(_: MsgUpdateMaxMessageBodySizeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateMaxMessageBodySizeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMaxMessageBodySizeResponse();
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
  fromPartial(_: Partial<MsgUpdateMaxMessageBodySizeResponse>): MsgUpdateMaxMessageBodySizeResponse {
    const message = createBaseMsgUpdateMaxMessageBodySizeResponse();
    return message;
  },
  fromAmino(_: MsgUpdateMaxMessageBodySizeResponseAmino): MsgUpdateMaxMessageBodySizeResponse {
    const message = createBaseMsgUpdateMaxMessageBodySizeResponse();
    return message;
  },
  toAmino(_: MsgUpdateMaxMessageBodySizeResponse, useInterfaces: boolean = false): MsgUpdateMaxMessageBodySizeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMaxMessageBodySizeResponseAminoMsg): MsgUpdateMaxMessageBodySizeResponse {
    return MsgUpdateMaxMessageBodySizeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateMaxMessageBodySizeResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateMaxMessageBodySizeResponse {
    return MsgUpdateMaxMessageBodySizeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateMaxMessageBodySizeResponse): Uint8Array {
    return MsgUpdateMaxMessageBodySizeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMaxMessageBodySizeResponse): MsgUpdateMaxMessageBodySizeResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateMaxMessageBodySizeResponse",
      value: MsgUpdateMaxMessageBodySizeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetMaxBurnAmountPerMessage(): MsgSetMaxBurnAmountPerMessage {
  return {
    from: "",
    localToken: "",
    amount: ""
  };
}
export const MsgSetMaxBurnAmountPerMessage = {
  typeUrl: "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessage",
  encode(message: MsgSetMaxBurnAmountPerMessage, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.localToken !== "") {
      writer.uint32(18).string(message.localToken);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetMaxBurnAmountPerMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMaxBurnAmountPerMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.localToken = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetMaxBurnAmountPerMessage>): MsgSetMaxBurnAmountPerMessage {
    const message = createBaseMsgSetMaxBurnAmountPerMessage();
    message.from = object.from ?? "";
    message.localToken = object.localToken ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MsgSetMaxBurnAmountPerMessageAmino): MsgSetMaxBurnAmountPerMessage {
    const message = createBaseMsgSetMaxBurnAmountPerMessage();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.local_token !== undefined && object.local_token !== null) {
      message.localToken = object.local_token;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgSetMaxBurnAmountPerMessage, useInterfaces: boolean = false): MsgSetMaxBurnAmountPerMessageAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.local_token = message.localToken;
    obj.amount = message.amount;
    return obj;
  },
  fromAminoMsg(object: MsgSetMaxBurnAmountPerMessageAminoMsg): MsgSetMaxBurnAmountPerMessage {
    return MsgSetMaxBurnAmountPerMessage.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetMaxBurnAmountPerMessageProtoMsg, useInterfaces: boolean = false): MsgSetMaxBurnAmountPerMessage {
    return MsgSetMaxBurnAmountPerMessage.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetMaxBurnAmountPerMessage): Uint8Array {
    return MsgSetMaxBurnAmountPerMessage.encode(message).finish();
  },
  toProtoMsg(message: MsgSetMaxBurnAmountPerMessage): MsgSetMaxBurnAmountPerMessageProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessage",
      value: MsgSetMaxBurnAmountPerMessage.encode(message).finish()
    };
  }
};
function createBaseMsgSetMaxBurnAmountPerMessageResponse(): MsgSetMaxBurnAmountPerMessageResponse {
  return {};
}
export const MsgSetMaxBurnAmountPerMessageResponse = {
  typeUrl: "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessageResponse",
  encode(_: MsgSetMaxBurnAmountPerMessageResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetMaxBurnAmountPerMessageResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMaxBurnAmountPerMessageResponse();
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
  fromPartial(_: Partial<MsgSetMaxBurnAmountPerMessageResponse>): MsgSetMaxBurnAmountPerMessageResponse {
    const message = createBaseMsgSetMaxBurnAmountPerMessageResponse();
    return message;
  },
  fromAmino(_: MsgSetMaxBurnAmountPerMessageResponseAmino): MsgSetMaxBurnAmountPerMessageResponse {
    const message = createBaseMsgSetMaxBurnAmountPerMessageResponse();
    return message;
  },
  toAmino(_: MsgSetMaxBurnAmountPerMessageResponse, useInterfaces: boolean = false): MsgSetMaxBurnAmountPerMessageResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetMaxBurnAmountPerMessageResponseAminoMsg): MsgSetMaxBurnAmountPerMessageResponse {
    return MsgSetMaxBurnAmountPerMessageResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetMaxBurnAmountPerMessageResponseProtoMsg, useInterfaces: boolean = false): MsgSetMaxBurnAmountPerMessageResponse {
    return MsgSetMaxBurnAmountPerMessageResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetMaxBurnAmountPerMessageResponse): Uint8Array {
    return MsgSetMaxBurnAmountPerMessageResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetMaxBurnAmountPerMessageResponse): MsgSetMaxBurnAmountPerMessageResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgSetMaxBurnAmountPerMessageResponse",
      value: MsgSetMaxBurnAmountPerMessageResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDepositForBurn(): MsgDepositForBurn {
  return {
    from: "",
    amount: "",
    destinationDomain: 0,
    mintRecipient: new Uint8Array(),
    burnToken: ""
  };
}
export const MsgDepositForBurn = {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
  encode(message: MsgDepositForBurn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.destinationDomain !== 0) {
      writer.uint32(24).uint32(message.destinationDomain);
    }
    if (message.mintRecipient.length !== 0) {
      writer.uint32(34).bytes(message.mintRecipient);
    }
    if (message.burnToken !== "") {
      writer.uint32(42).string(message.burnToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDepositForBurn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositForBurn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.destinationDomain = reader.uint32();
          break;
        case 4:
          message.mintRecipient = reader.bytes();
          break;
        case 5:
          message.burnToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDepositForBurn>): MsgDepositForBurn {
    const message = createBaseMsgDepositForBurn();
    message.from = object.from ?? "";
    message.amount = object.amount ?? "";
    message.destinationDomain = object.destinationDomain ?? 0;
    message.mintRecipient = object.mintRecipient ?? new Uint8Array();
    message.burnToken = object.burnToken ?? "";
    return message;
  },
  fromAmino(object: MsgDepositForBurnAmino): MsgDepositForBurn {
    const message = createBaseMsgDepositForBurn();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.destination_domain !== undefined && object.destination_domain !== null) {
      message.destinationDomain = object.destination_domain;
    }
    if (object.mint_recipient !== undefined && object.mint_recipient !== null) {
      message.mintRecipient = bytesFromBase64(object.mint_recipient);
    }
    if (object.burn_token !== undefined && object.burn_token !== null) {
      message.burnToken = object.burn_token;
    }
    return message;
  },
  toAmino(message: MsgDepositForBurn, useInterfaces: boolean = false): MsgDepositForBurnAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.amount = message.amount;
    obj.destination_domain = message.destinationDomain;
    obj.mint_recipient = message.mintRecipient ? base64FromBytes(message.mintRecipient) : undefined;
    obj.burn_token = message.burnToken;
    return obj;
  },
  fromAminoMsg(object: MsgDepositForBurnAminoMsg): MsgDepositForBurn {
    return MsgDepositForBurn.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositForBurnProtoMsg, useInterfaces: boolean = false): MsgDepositForBurn {
    return MsgDepositForBurn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDepositForBurn): Uint8Array {
    return MsgDepositForBurn.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositForBurn): MsgDepositForBurnProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
      value: MsgDepositForBurn.encode(message).finish()
    };
  }
};
function createBaseMsgDepositForBurnResponse(): MsgDepositForBurnResponse {
  return {
    nonce: BigInt(0)
  };
}
export const MsgDepositForBurnResponse = {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurnResponse",
  encode(message: MsgDepositForBurnResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDepositForBurnResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositForBurnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDepositForBurnResponse>): MsgDepositForBurnResponse {
    const message = createBaseMsgDepositForBurnResponse();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgDepositForBurnResponseAmino): MsgDepositForBurnResponse {
    const message = createBaseMsgDepositForBurnResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    return message;
  },
  toAmino(message: MsgDepositForBurnResponse, useInterfaces: boolean = false): MsgDepositForBurnResponseAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? message.nonce.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgDepositForBurnResponseAminoMsg): MsgDepositForBurnResponse {
    return MsgDepositForBurnResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositForBurnResponseProtoMsg, useInterfaces: boolean = false): MsgDepositForBurnResponse {
    return MsgDepositForBurnResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDepositForBurnResponse): Uint8Array {
    return MsgDepositForBurnResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositForBurnResponse): MsgDepositForBurnResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgDepositForBurnResponse",
      value: MsgDepositForBurnResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDepositForBurnWithCaller(): MsgDepositForBurnWithCaller {
  return {
    from: "",
    amount: "",
    destinationDomain: 0,
    mintRecipient: new Uint8Array(),
    burnToken: "",
    destinationCaller: new Uint8Array()
  };
}
export const MsgDepositForBurnWithCaller = {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurnWithCaller",
  encode(message: MsgDepositForBurnWithCaller, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.destinationDomain !== 0) {
      writer.uint32(24).uint32(message.destinationDomain);
    }
    if (message.mintRecipient.length !== 0) {
      writer.uint32(34).bytes(message.mintRecipient);
    }
    if (message.burnToken !== "") {
      writer.uint32(42).string(message.burnToken);
    }
    if (message.destinationCaller.length !== 0) {
      writer.uint32(50).bytes(message.destinationCaller);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDepositForBurnWithCaller {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositForBurnWithCaller();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.destinationDomain = reader.uint32();
          break;
        case 4:
          message.mintRecipient = reader.bytes();
          break;
        case 5:
          message.burnToken = reader.string();
          break;
        case 6:
          message.destinationCaller = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDepositForBurnWithCaller>): MsgDepositForBurnWithCaller {
    const message = createBaseMsgDepositForBurnWithCaller();
    message.from = object.from ?? "";
    message.amount = object.amount ?? "";
    message.destinationDomain = object.destinationDomain ?? 0;
    message.mintRecipient = object.mintRecipient ?? new Uint8Array();
    message.burnToken = object.burnToken ?? "";
    message.destinationCaller = object.destinationCaller ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgDepositForBurnWithCallerAmino): MsgDepositForBurnWithCaller {
    const message = createBaseMsgDepositForBurnWithCaller();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.destination_domain !== undefined && object.destination_domain !== null) {
      message.destinationDomain = object.destination_domain;
    }
    if (object.mint_recipient !== undefined && object.mint_recipient !== null) {
      message.mintRecipient = bytesFromBase64(object.mint_recipient);
    }
    if (object.burn_token !== undefined && object.burn_token !== null) {
      message.burnToken = object.burn_token;
    }
    if (object.destination_caller !== undefined && object.destination_caller !== null) {
      message.destinationCaller = bytesFromBase64(object.destination_caller);
    }
    return message;
  },
  toAmino(message: MsgDepositForBurnWithCaller, useInterfaces: boolean = false): MsgDepositForBurnWithCallerAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.amount = message.amount;
    obj.destination_domain = message.destinationDomain;
    obj.mint_recipient = message.mintRecipient ? base64FromBytes(message.mintRecipient) : undefined;
    obj.burn_token = message.burnToken;
    obj.destination_caller = message.destinationCaller ? base64FromBytes(message.destinationCaller) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgDepositForBurnWithCallerAminoMsg): MsgDepositForBurnWithCaller {
    return MsgDepositForBurnWithCaller.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositForBurnWithCallerProtoMsg, useInterfaces: boolean = false): MsgDepositForBurnWithCaller {
    return MsgDepositForBurnWithCaller.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDepositForBurnWithCaller): Uint8Array {
    return MsgDepositForBurnWithCaller.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositForBurnWithCaller): MsgDepositForBurnWithCallerProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgDepositForBurnWithCaller",
      value: MsgDepositForBurnWithCaller.encode(message).finish()
    };
  }
};
function createBaseMsgDepositForBurnWithCallerResponse(): MsgDepositForBurnWithCallerResponse {
  return {
    nonce: BigInt(0)
  };
}
export const MsgDepositForBurnWithCallerResponse = {
  typeUrl: "/circle.cctp.v1.MsgDepositForBurnWithCallerResponse",
  encode(message: MsgDepositForBurnWithCallerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDepositForBurnWithCallerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositForBurnWithCallerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDepositForBurnWithCallerResponse>): MsgDepositForBurnWithCallerResponse {
    const message = createBaseMsgDepositForBurnWithCallerResponse();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgDepositForBurnWithCallerResponseAmino): MsgDepositForBurnWithCallerResponse {
    const message = createBaseMsgDepositForBurnWithCallerResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    return message;
  },
  toAmino(message: MsgDepositForBurnWithCallerResponse, useInterfaces: boolean = false): MsgDepositForBurnWithCallerResponseAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? message.nonce.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgDepositForBurnWithCallerResponseAminoMsg): MsgDepositForBurnWithCallerResponse {
    return MsgDepositForBurnWithCallerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositForBurnWithCallerResponseProtoMsg, useInterfaces: boolean = false): MsgDepositForBurnWithCallerResponse {
    return MsgDepositForBurnWithCallerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDepositForBurnWithCallerResponse): Uint8Array {
    return MsgDepositForBurnWithCallerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositForBurnWithCallerResponse): MsgDepositForBurnWithCallerResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgDepositForBurnWithCallerResponse",
      value: MsgDepositForBurnWithCallerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgReplaceDepositForBurn(): MsgReplaceDepositForBurn {
  return {
    from: "",
    originalMessage: new Uint8Array(),
    originalAttestation: new Uint8Array(),
    newDestinationCaller: new Uint8Array(),
    newMintRecipient: new Uint8Array()
  };
}
export const MsgReplaceDepositForBurn = {
  typeUrl: "/circle.cctp.v1.MsgReplaceDepositForBurn",
  encode(message: MsgReplaceDepositForBurn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.originalMessage.length !== 0) {
      writer.uint32(18).bytes(message.originalMessage);
    }
    if (message.originalAttestation.length !== 0) {
      writer.uint32(26).bytes(message.originalAttestation);
    }
    if (message.newDestinationCaller.length !== 0) {
      writer.uint32(34).bytes(message.newDestinationCaller);
    }
    if (message.newMintRecipient.length !== 0) {
      writer.uint32(42).bytes(message.newMintRecipient);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReplaceDepositForBurn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReplaceDepositForBurn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.originalMessage = reader.bytes();
          break;
        case 3:
          message.originalAttestation = reader.bytes();
          break;
        case 4:
          message.newDestinationCaller = reader.bytes();
          break;
        case 5:
          message.newMintRecipient = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgReplaceDepositForBurn>): MsgReplaceDepositForBurn {
    const message = createBaseMsgReplaceDepositForBurn();
    message.from = object.from ?? "";
    message.originalMessage = object.originalMessage ?? new Uint8Array();
    message.originalAttestation = object.originalAttestation ?? new Uint8Array();
    message.newDestinationCaller = object.newDestinationCaller ?? new Uint8Array();
    message.newMintRecipient = object.newMintRecipient ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgReplaceDepositForBurnAmino): MsgReplaceDepositForBurn {
    const message = createBaseMsgReplaceDepositForBurn();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.original_message !== undefined && object.original_message !== null) {
      message.originalMessage = bytesFromBase64(object.original_message);
    }
    if (object.original_attestation !== undefined && object.original_attestation !== null) {
      message.originalAttestation = bytesFromBase64(object.original_attestation);
    }
    if (object.new_destination_caller !== undefined && object.new_destination_caller !== null) {
      message.newDestinationCaller = bytesFromBase64(object.new_destination_caller);
    }
    if (object.new_mint_recipient !== undefined && object.new_mint_recipient !== null) {
      message.newMintRecipient = bytesFromBase64(object.new_mint_recipient);
    }
    return message;
  },
  toAmino(message: MsgReplaceDepositForBurn, useInterfaces: boolean = false): MsgReplaceDepositForBurnAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.original_message = message.originalMessage ? base64FromBytes(message.originalMessage) : undefined;
    obj.original_attestation = message.originalAttestation ? base64FromBytes(message.originalAttestation) : undefined;
    obj.new_destination_caller = message.newDestinationCaller ? base64FromBytes(message.newDestinationCaller) : undefined;
    obj.new_mint_recipient = message.newMintRecipient ? base64FromBytes(message.newMintRecipient) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgReplaceDepositForBurnAminoMsg): MsgReplaceDepositForBurn {
    return MsgReplaceDepositForBurn.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgReplaceDepositForBurnProtoMsg, useInterfaces: boolean = false): MsgReplaceDepositForBurn {
    return MsgReplaceDepositForBurn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReplaceDepositForBurn): Uint8Array {
    return MsgReplaceDepositForBurn.encode(message).finish();
  },
  toProtoMsg(message: MsgReplaceDepositForBurn): MsgReplaceDepositForBurnProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgReplaceDepositForBurn",
      value: MsgReplaceDepositForBurn.encode(message).finish()
    };
  }
};
function createBaseMsgReplaceDepositForBurnResponse(): MsgReplaceDepositForBurnResponse {
  return {};
}
export const MsgReplaceDepositForBurnResponse = {
  typeUrl: "/circle.cctp.v1.MsgReplaceDepositForBurnResponse",
  encode(_: MsgReplaceDepositForBurnResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReplaceDepositForBurnResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReplaceDepositForBurnResponse();
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
  fromPartial(_: Partial<MsgReplaceDepositForBurnResponse>): MsgReplaceDepositForBurnResponse {
    const message = createBaseMsgReplaceDepositForBurnResponse();
    return message;
  },
  fromAmino(_: MsgReplaceDepositForBurnResponseAmino): MsgReplaceDepositForBurnResponse {
    const message = createBaseMsgReplaceDepositForBurnResponse();
    return message;
  },
  toAmino(_: MsgReplaceDepositForBurnResponse, useInterfaces: boolean = false): MsgReplaceDepositForBurnResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgReplaceDepositForBurnResponseAminoMsg): MsgReplaceDepositForBurnResponse {
    return MsgReplaceDepositForBurnResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgReplaceDepositForBurnResponseProtoMsg, useInterfaces: boolean = false): MsgReplaceDepositForBurnResponse {
    return MsgReplaceDepositForBurnResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReplaceDepositForBurnResponse): Uint8Array {
    return MsgReplaceDepositForBurnResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgReplaceDepositForBurnResponse): MsgReplaceDepositForBurnResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgReplaceDepositForBurnResponse",
      value: MsgReplaceDepositForBurnResponse.encode(message).finish()
    };
  }
};
function createBaseMsgReceiveMessage(): MsgReceiveMessage {
  return {
    from: "",
    message: new Uint8Array(),
    attestation: new Uint8Array()
  };
}
export const MsgReceiveMessage = {
  typeUrl: "/circle.cctp.v1.MsgReceiveMessage",
  encode(message: MsgReceiveMessage, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.message.length !== 0) {
      writer.uint32(18).bytes(message.message);
    }
    if (message.attestation.length !== 0) {
      writer.uint32(26).bytes(message.attestation);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReceiveMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReceiveMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.message = reader.bytes();
          break;
        case 3:
          message.attestation = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgReceiveMessage>): MsgReceiveMessage {
    const message = createBaseMsgReceiveMessage();
    message.from = object.from ?? "";
    message.message = object.message ?? new Uint8Array();
    message.attestation = object.attestation ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgReceiveMessageAmino): MsgReceiveMessage {
    const message = createBaseMsgReceiveMessage();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = bytesFromBase64(object.message);
    }
    if (object.attestation !== undefined && object.attestation !== null) {
      message.attestation = bytesFromBase64(object.attestation);
    }
    return message;
  },
  toAmino(message: MsgReceiveMessage, useInterfaces: boolean = false): MsgReceiveMessageAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.message = message.message ? base64FromBytes(message.message) : undefined;
    obj.attestation = message.attestation ? base64FromBytes(message.attestation) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgReceiveMessageAminoMsg): MsgReceiveMessage {
    return MsgReceiveMessage.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgReceiveMessageProtoMsg, useInterfaces: boolean = false): MsgReceiveMessage {
    return MsgReceiveMessage.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReceiveMessage): Uint8Array {
    return MsgReceiveMessage.encode(message).finish();
  },
  toProtoMsg(message: MsgReceiveMessage): MsgReceiveMessageProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgReceiveMessage",
      value: MsgReceiveMessage.encode(message).finish()
    };
  }
};
function createBaseMsgReceiveMessageResponse(): MsgReceiveMessageResponse {
  return {
    success: false
  };
}
export const MsgReceiveMessageResponse = {
  typeUrl: "/circle.cctp.v1.MsgReceiveMessageResponse",
  encode(message: MsgReceiveMessageResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReceiveMessageResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReceiveMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgReceiveMessageResponse>): MsgReceiveMessageResponse {
    const message = createBaseMsgReceiveMessageResponse();
    message.success = object.success ?? false;
    return message;
  },
  fromAmino(object: MsgReceiveMessageResponseAmino): MsgReceiveMessageResponse {
    const message = createBaseMsgReceiveMessageResponse();
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    }
    return message;
  },
  toAmino(message: MsgReceiveMessageResponse, useInterfaces: boolean = false): MsgReceiveMessageResponseAmino {
    const obj: any = {};
    obj.success = message.success;
    return obj;
  },
  fromAminoMsg(object: MsgReceiveMessageResponseAminoMsg): MsgReceiveMessageResponse {
    return MsgReceiveMessageResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgReceiveMessageResponseProtoMsg, useInterfaces: boolean = false): MsgReceiveMessageResponse {
    return MsgReceiveMessageResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReceiveMessageResponse): Uint8Array {
    return MsgReceiveMessageResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgReceiveMessageResponse): MsgReceiveMessageResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgReceiveMessageResponse",
      value: MsgReceiveMessageResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSendMessage(): MsgSendMessage {
  return {
    from: "",
    destinationDomain: 0,
    recipient: new Uint8Array(),
    messageBody: new Uint8Array()
  };
}
export const MsgSendMessage = {
  typeUrl: "/circle.cctp.v1.MsgSendMessage",
  encode(message: MsgSendMessage, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.destinationDomain !== 0) {
      writer.uint32(16).uint32(message.destinationDomain);
    }
    if (message.recipient.length !== 0) {
      writer.uint32(26).bytes(message.recipient);
    }
    if (message.messageBody.length !== 0) {
      writer.uint32(34).bytes(message.messageBody);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSendMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.destinationDomain = reader.uint32();
          break;
        case 3:
          message.recipient = reader.bytes();
          break;
        case 4:
          message.messageBody = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSendMessage>): MsgSendMessage {
    const message = createBaseMsgSendMessage();
    message.from = object.from ?? "";
    message.destinationDomain = object.destinationDomain ?? 0;
    message.recipient = object.recipient ?? new Uint8Array();
    message.messageBody = object.messageBody ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgSendMessageAmino): MsgSendMessage {
    const message = createBaseMsgSendMessage();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.destination_domain !== undefined && object.destination_domain !== null) {
      message.destinationDomain = object.destination_domain;
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = bytesFromBase64(object.recipient);
    }
    if (object.message_body !== undefined && object.message_body !== null) {
      message.messageBody = bytesFromBase64(object.message_body);
    }
    return message;
  },
  toAmino(message: MsgSendMessage, useInterfaces: boolean = false): MsgSendMessageAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.destination_domain = message.destinationDomain;
    obj.recipient = message.recipient ? base64FromBytes(message.recipient) : undefined;
    obj.message_body = message.messageBody ? base64FromBytes(message.messageBody) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSendMessageAminoMsg): MsgSendMessage {
    return MsgSendMessage.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSendMessageProtoMsg, useInterfaces: boolean = false): MsgSendMessage {
    return MsgSendMessage.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSendMessage): Uint8Array {
    return MsgSendMessage.encode(message).finish();
  },
  toProtoMsg(message: MsgSendMessage): MsgSendMessageProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgSendMessage",
      value: MsgSendMessage.encode(message).finish()
    };
  }
};
function createBaseMsgSendMessageResponse(): MsgSendMessageResponse {
  return {
    nonce: BigInt(0)
  };
}
export const MsgSendMessageResponse = {
  typeUrl: "/circle.cctp.v1.MsgSendMessageResponse",
  encode(message: MsgSendMessageResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSendMessageResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSendMessageResponse>): MsgSendMessageResponse {
    const message = createBaseMsgSendMessageResponse();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgSendMessageResponseAmino): MsgSendMessageResponse {
    const message = createBaseMsgSendMessageResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    return message;
  },
  toAmino(message: MsgSendMessageResponse, useInterfaces: boolean = false): MsgSendMessageResponseAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? message.nonce.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSendMessageResponseAminoMsg): MsgSendMessageResponse {
    return MsgSendMessageResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSendMessageResponseProtoMsg, useInterfaces: boolean = false): MsgSendMessageResponse {
    return MsgSendMessageResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSendMessageResponse): Uint8Array {
    return MsgSendMessageResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSendMessageResponse): MsgSendMessageResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgSendMessageResponse",
      value: MsgSendMessageResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSendMessageWithCaller(): MsgSendMessageWithCaller {
  return {
    from: "",
    destinationDomain: 0,
    recipient: new Uint8Array(),
    messageBody: new Uint8Array(),
    destinationCaller: new Uint8Array()
  };
}
export const MsgSendMessageWithCaller = {
  typeUrl: "/circle.cctp.v1.MsgSendMessageWithCaller",
  encode(message: MsgSendMessageWithCaller, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.destinationDomain !== 0) {
      writer.uint32(16).uint32(message.destinationDomain);
    }
    if (message.recipient.length !== 0) {
      writer.uint32(26).bytes(message.recipient);
    }
    if (message.messageBody.length !== 0) {
      writer.uint32(34).bytes(message.messageBody);
    }
    if (message.destinationCaller.length !== 0) {
      writer.uint32(42).bytes(message.destinationCaller);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSendMessageWithCaller {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendMessageWithCaller();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.destinationDomain = reader.uint32();
          break;
        case 3:
          message.recipient = reader.bytes();
          break;
        case 4:
          message.messageBody = reader.bytes();
          break;
        case 5:
          message.destinationCaller = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSendMessageWithCaller>): MsgSendMessageWithCaller {
    const message = createBaseMsgSendMessageWithCaller();
    message.from = object.from ?? "";
    message.destinationDomain = object.destinationDomain ?? 0;
    message.recipient = object.recipient ?? new Uint8Array();
    message.messageBody = object.messageBody ?? new Uint8Array();
    message.destinationCaller = object.destinationCaller ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgSendMessageWithCallerAmino): MsgSendMessageWithCaller {
    const message = createBaseMsgSendMessageWithCaller();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.destination_domain !== undefined && object.destination_domain !== null) {
      message.destinationDomain = object.destination_domain;
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = bytesFromBase64(object.recipient);
    }
    if (object.message_body !== undefined && object.message_body !== null) {
      message.messageBody = bytesFromBase64(object.message_body);
    }
    if (object.destination_caller !== undefined && object.destination_caller !== null) {
      message.destinationCaller = bytesFromBase64(object.destination_caller);
    }
    return message;
  },
  toAmino(message: MsgSendMessageWithCaller, useInterfaces: boolean = false): MsgSendMessageWithCallerAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.destination_domain = message.destinationDomain;
    obj.recipient = message.recipient ? base64FromBytes(message.recipient) : undefined;
    obj.message_body = message.messageBody ? base64FromBytes(message.messageBody) : undefined;
    obj.destination_caller = message.destinationCaller ? base64FromBytes(message.destinationCaller) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSendMessageWithCallerAminoMsg): MsgSendMessageWithCaller {
    return MsgSendMessageWithCaller.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSendMessageWithCallerProtoMsg, useInterfaces: boolean = false): MsgSendMessageWithCaller {
    return MsgSendMessageWithCaller.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSendMessageWithCaller): Uint8Array {
    return MsgSendMessageWithCaller.encode(message).finish();
  },
  toProtoMsg(message: MsgSendMessageWithCaller): MsgSendMessageWithCallerProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgSendMessageWithCaller",
      value: MsgSendMessageWithCaller.encode(message).finish()
    };
  }
};
function createBaseMsgSendMessageWithCallerResponse(): MsgSendMessageWithCallerResponse {
  return {
    nonce: BigInt(0)
  };
}
export const MsgSendMessageWithCallerResponse = {
  typeUrl: "/circle.cctp.v1.MsgSendMessageWithCallerResponse",
  encode(message: MsgSendMessageWithCallerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== BigInt(0)) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSendMessageWithCallerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendMessageWithCallerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSendMessageWithCallerResponse>): MsgSendMessageWithCallerResponse {
    const message = createBaseMsgSendMessageWithCallerResponse();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgSendMessageWithCallerResponseAmino): MsgSendMessageWithCallerResponse {
    const message = createBaseMsgSendMessageWithCallerResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    return message;
  },
  toAmino(message: MsgSendMessageWithCallerResponse, useInterfaces: boolean = false): MsgSendMessageWithCallerResponseAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? message.nonce.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSendMessageWithCallerResponseAminoMsg): MsgSendMessageWithCallerResponse {
    return MsgSendMessageWithCallerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSendMessageWithCallerResponseProtoMsg, useInterfaces: boolean = false): MsgSendMessageWithCallerResponse {
    return MsgSendMessageWithCallerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSendMessageWithCallerResponse): Uint8Array {
    return MsgSendMessageWithCallerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSendMessageWithCallerResponse): MsgSendMessageWithCallerResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgSendMessageWithCallerResponse",
      value: MsgSendMessageWithCallerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgReplaceMessage(): MsgReplaceMessage {
  return {
    from: "",
    originalMessage: new Uint8Array(),
    originalAttestation: new Uint8Array(),
    newMessageBody: new Uint8Array(),
    newDestinationCaller: new Uint8Array()
  };
}
export const MsgReplaceMessage = {
  typeUrl: "/circle.cctp.v1.MsgReplaceMessage",
  encode(message: MsgReplaceMessage, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.originalMessage.length !== 0) {
      writer.uint32(18).bytes(message.originalMessage);
    }
    if (message.originalAttestation.length !== 0) {
      writer.uint32(26).bytes(message.originalAttestation);
    }
    if (message.newMessageBody.length !== 0) {
      writer.uint32(34).bytes(message.newMessageBody);
    }
    if (message.newDestinationCaller.length !== 0) {
      writer.uint32(42).bytes(message.newDestinationCaller);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReplaceMessage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReplaceMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.originalMessage = reader.bytes();
          break;
        case 3:
          message.originalAttestation = reader.bytes();
          break;
        case 4:
          message.newMessageBody = reader.bytes();
          break;
        case 5:
          message.newDestinationCaller = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgReplaceMessage>): MsgReplaceMessage {
    const message = createBaseMsgReplaceMessage();
    message.from = object.from ?? "";
    message.originalMessage = object.originalMessage ?? new Uint8Array();
    message.originalAttestation = object.originalAttestation ?? new Uint8Array();
    message.newMessageBody = object.newMessageBody ?? new Uint8Array();
    message.newDestinationCaller = object.newDestinationCaller ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgReplaceMessageAmino): MsgReplaceMessage {
    const message = createBaseMsgReplaceMessage();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.original_message !== undefined && object.original_message !== null) {
      message.originalMessage = bytesFromBase64(object.original_message);
    }
    if (object.original_attestation !== undefined && object.original_attestation !== null) {
      message.originalAttestation = bytesFromBase64(object.original_attestation);
    }
    if (object.new_message_body !== undefined && object.new_message_body !== null) {
      message.newMessageBody = bytesFromBase64(object.new_message_body);
    }
    if (object.new_destination_caller !== undefined && object.new_destination_caller !== null) {
      message.newDestinationCaller = bytesFromBase64(object.new_destination_caller);
    }
    return message;
  },
  toAmino(message: MsgReplaceMessage, useInterfaces: boolean = false): MsgReplaceMessageAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.original_message = message.originalMessage ? base64FromBytes(message.originalMessage) : undefined;
    obj.original_attestation = message.originalAttestation ? base64FromBytes(message.originalAttestation) : undefined;
    obj.new_message_body = message.newMessageBody ? base64FromBytes(message.newMessageBody) : undefined;
    obj.new_destination_caller = message.newDestinationCaller ? base64FromBytes(message.newDestinationCaller) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgReplaceMessageAminoMsg): MsgReplaceMessage {
    return MsgReplaceMessage.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgReplaceMessageProtoMsg, useInterfaces: boolean = false): MsgReplaceMessage {
    return MsgReplaceMessage.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReplaceMessage): Uint8Array {
    return MsgReplaceMessage.encode(message).finish();
  },
  toProtoMsg(message: MsgReplaceMessage): MsgReplaceMessageProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgReplaceMessage",
      value: MsgReplaceMessage.encode(message).finish()
    };
  }
};
function createBaseMsgReplaceMessageResponse(): MsgReplaceMessageResponse {
  return {};
}
export const MsgReplaceMessageResponse = {
  typeUrl: "/circle.cctp.v1.MsgReplaceMessageResponse",
  encode(_: MsgReplaceMessageResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReplaceMessageResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReplaceMessageResponse();
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
  fromPartial(_: Partial<MsgReplaceMessageResponse>): MsgReplaceMessageResponse {
    const message = createBaseMsgReplaceMessageResponse();
    return message;
  },
  fromAmino(_: MsgReplaceMessageResponseAmino): MsgReplaceMessageResponse {
    const message = createBaseMsgReplaceMessageResponse();
    return message;
  },
  toAmino(_: MsgReplaceMessageResponse, useInterfaces: boolean = false): MsgReplaceMessageResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgReplaceMessageResponseAminoMsg): MsgReplaceMessageResponse {
    return MsgReplaceMessageResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgReplaceMessageResponseProtoMsg, useInterfaces: boolean = false): MsgReplaceMessageResponse {
    return MsgReplaceMessageResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReplaceMessageResponse): Uint8Array {
    return MsgReplaceMessageResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgReplaceMessageResponse): MsgReplaceMessageResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgReplaceMessageResponse",
      value: MsgReplaceMessageResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateSignatureThreshold(): MsgUpdateSignatureThreshold {
  return {
    from: "",
    amount: 0
  };
}
export const MsgUpdateSignatureThreshold = {
  typeUrl: "/circle.cctp.v1.MsgUpdateSignatureThreshold",
  encode(message: MsgUpdateSignatureThreshold, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.amount !== 0) {
      writer.uint32(16).uint32(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateSignatureThreshold {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSignatureThreshold();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.amount = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateSignatureThreshold>): MsgUpdateSignatureThreshold {
    const message = createBaseMsgUpdateSignatureThreshold();
    message.from = object.from ?? "";
    message.amount = object.amount ?? 0;
    return message;
  },
  fromAmino(object: MsgUpdateSignatureThresholdAmino): MsgUpdateSignatureThreshold {
    const message = createBaseMsgUpdateSignatureThreshold();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgUpdateSignatureThreshold, useInterfaces: boolean = false): MsgUpdateSignatureThresholdAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.amount = message.amount;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSignatureThresholdAminoMsg): MsgUpdateSignatureThreshold {
    return MsgUpdateSignatureThreshold.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSignatureThresholdProtoMsg, useInterfaces: boolean = false): MsgUpdateSignatureThreshold {
    return MsgUpdateSignatureThreshold.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateSignatureThreshold): Uint8Array {
    return MsgUpdateSignatureThreshold.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSignatureThreshold): MsgUpdateSignatureThresholdProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateSignatureThreshold",
      value: MsgUpdateSignatureThreshold.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateSignatureThresholdResponse(): MsgUpdateSignatureThresholdResponse {
  return {};
}
export const MsgUpdateSignatureThresholdResponse = {
  typeUrl: "/circle.cctp.v1.MsgUpdateSignatureThresholdResponse",
  encode(_: MsgUpdateSignatureThresholdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateSignatureThresholdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSignatureThresholdResponse();
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
  fromPartial(_: Partial<MsgUpdateSignatureThresholdResponse>): MsgUpdateSignatureThresholdResponse {
    const message = createBaseMsgUpdateSignatureThresholdResponse();
    return message;
  },
  fromAmino(_: MsgUpdateSignatureThresholdResponseAmino): MsgUpdateSignatureThresholdResponse {
    const message = createBaseMsgUpdateSignatureThresholdResponse();
    return message;
  },
  toAmino(_: MsgUpdateSignatureThresholdResponse, useInterfaces: boolean = false): MsgUpdateSignatureThresholdResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSignatureThresholdResponseAminoMsg): MsgUpdateSignatureThresholdResponse {
    return MsgUpdateSignatureThresholdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSignatureThresholdResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateSignatureThresholdResponse {
    return MsgUpdateSignatureThresholdResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateSignatureThresholdResponse): Uint8Array {
    return MsgUpdateSignatureThresholdResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSignatureThresholdResponse): MsgUpdateSignatureThresholdResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUpdateSignatureThresholdResponse",
      value: MsgUpdateSignatureThresholdResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLinkTokenPair(): MsgLinkTokenPair {
  return {
    from: "",
    remoteDomain: 0,
    remoteToken: new Uint8Array(),
    localToken: ""
  };
}
export const MsgLinkTokenPair = {
  typeUrl: "/circle.cctp.v1.MsgLinkTokenPair",
  encode(message: MsgLinkTokenPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.remoteDomain !== 0) {
      writer.uint32(16).uint32(message.remoteDomain);
    }
    if (message.remoteToken.length !== 0) {
      writer.uint32(26).bytes(message.remoteToken);
    }
    if (message.localToken !== "") {
      writer.uint32(34).string(message.localToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLinkTokenPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLinkTokenPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.remoteDomain = reader.uint32();
          break;
        case 3:
          message.remoteToken = reader.bytes();
          break;
        case 4:
          message.localToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLinkTokenPair>): MsgLinkTokenPair {
    const message = createBaseMsgLinkTokenPair();
    message.from = object.from ?? "";
    message.remoteDomain = object.remoteDomain ?? 0;
    message.remoteToken = object.remoteToken ?? new Uint8Array();
    message.localToken = object.localToken ?? "";
    return message;
  },
  fromAmino(object: MsgLinkTokenPairAmino): MsgLinkTokenPair {
    const message = createBaseMsgLinkTokenPair();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.remote_domain !== undefined && object.remote_domain !== null) {
      message.remoteDomain = object.remote_domain;
    }
    if (object.remote_token !== undefined && object.remote_token !== null) {
      message.remoteToken = bytesFromBase64(object.remote_token);
    }
    if (object.local_token !== undefined && object.local_token !== null) {
      message.localToken = object.local_token;
    }
    return message;
  },
  toAmino(message: MsgLinkTokenPair, useInterfaces: boolean = false): MsgLinkTokenPairAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.remote_domain = message.remoteDomain;
    obj.remote_token = message.remoteToken ? base64FromBytes(message.remoteToken) : undefined;
    obj.local_token = message.localToken;
    return obj;
  },
  fromAminoMsg(object: MsgLinkTokenPairAminoMsg): MsgLinkTokenPair {
    return MsgLinkTokenPair.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLinkTokenPairProtoMsg, useInterfaces: boolean = false): MsgLinkTokenPair {
    return MsgLinkTokenPair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLinkTokenPair): Uint8Array {
    return MsgLinkTokenPair.encode(message).finish();
  },
  toProtoMsg(message: MsgLinkTokenPair): MsgLinkTokenPairProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgLinkTokenPair",
      value: MsgLinkTokenPair.encode(message).finish()
    };
  }
};
function createBaseMsgLinkTokenPairResponse(): MsgLinkTokenPairResponse {
  return {};
}
export const MsgLinkTokenPairResponse = {
  typeUrl: "/circle.cctp.v1.MsgLinkTokenPairResponse",
  encode(_: MsgLinkTokenPairResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLinkTokenPairResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLinkTokenPairResponse();
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
  fromPartial(_: Partial<MsgLinkTokenPairResponse>): MsgLinkTokenPairResponse {
    const message = createBaseMsgLinkTokenPairResponse();
    return message;
  },
  fromAmino(_: MsgLinkTokenPairResponseAmino): MsgLinkTokenPairResponse {
    const message = createBaseMsgLinkTokenPairResponse();
    return message;
  },
  toAmino(_: MsgLinkTokenPairResponse, useInterfaces: boolean = false): MsgLinkTokenPairResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgLinkTokenPairResponseAminoMsg): MsgLinkTokenPairResponse {
    return MsgLinkTokenPairResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLinkTokenPairResponseProtoMsg, useInterfaces: boolean = false): MsgLinkTokenPairResponse {
    return MsgLinkTokenPairResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLinkTokenPairResponse): Uint8Array {
    return MsgLinkTokenPairResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLinkTokenPairResponse): MsgLinkTokenPairResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgLinkTokenPairResponse",
      value: MsgLinkTokenPairResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUnlinkTokenPair(): MsgUnlinkTokenPair {
  return {
    from: "",
    remoteDomain: 0,
    remoteToken: new Uint8Array(),
    localToken: ""
  };
}
export const MsgUnlinkTokenPair = {
  typeUrl: "/circle.cctp.v1.MsgUnlinkTokenPair",
  encode(message: MsgUnlinkTokenPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.remoteDomain !== 0) {
      writer.uint32(16).uint32(message.remoteDomain);
    }
    if (message.remoteToken.length !== 0) {
      writer.uint32(26).bytes(message.remoteToken);
    }
    if (message.localToken !== "") {
      writer.uint32(34).string(message.localToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnlinkTokenPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlinkTokenPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.remoteDomain = reader.uint32();
          break;
        case 3:
          message.remoteToken = reader.bytes();
          break;
        case 4:
          message.localToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUnlinkTokenPair>): MsgUnlinkTokenPair {
    const message = createBaseMsgUnlinkTokenPair();
    message.from = object.from ?? "";
    message.remoteDomain = object.remoteDomain ?? 0;
    message.remoteToken = object.remoteToken ?? new Uint8Array();
    message.localToken = object.localToken ?? "";
    return message;
  },
  fromAmino(object: MsgUnlinkTokenPairAmino): MsgUnlinkTokenPair {
    const message = createBaseMsgUnlinkTokenPair();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.remote_domain !== undefined && object.remote_domain !== null) {
      message.remoteDomain = object.remote_domain;
    }
    if (object.remote_token !== undefined && object.remote_token !== null) {
      message.remoteToken = bytesFromBase64(object.remote_token);
    }
    if (object.local_token !== undefined && object.local_token !== null) {
      message.localToken = object.local_token;
    }
    return message;
  },
  toAmino(message: MsgUnlinkTokenPair, useInterfaces: boolean = false): MsgUnlinkTokenPairAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.remote_domain = message.remoteDomain;
    obj.remote_token = message.remoteToken ? base64FromBytes(message.remoteToken) : undefined;
    obj.local_token = message.localToken;
    return obj;
  },
  fromAminoMsg(object: MsgUnlinkTokenPairAminoMsg): MsgUnlinkTokenPair {
    return MsgUnlinkTokenPair.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnlinkTokenPairProtoMsg, useInterfaces: boolean = false): MsgUnlinkTokenPair {
    return MsgUnlinkTokenPair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnlinkTokenPair): Uint8Array {
    return MsgUnlinkTokenPair.encode(message).finish();
  },
  toProtoMsg(message: MsgUnlinkTokenPair): MsgUnlinkTokenPairProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUnlinkTokenPair",
      value: MsgUnlinkTokenPair.encode(message).finish()
    };
  }
};
function createBaseMsgUnlinkTokenPairResponse(): MsgUnlinkTokenPairResponse {
  return {};
}
export const MsgUnlinkTokenPairResponse = {
  typeUrl: "/circle.cctp.v1.MsgUnlinkTokenPairResponse",
  encode(_: MsgUnlinkTokenPairResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnlinkTokenPairResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlinkTokenPairResponse();
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
  fromPartial(_: Partial<MsgUnlinkTokenPairResponse>): MsgUnlinkTokenPairResponse {
    const message = createBaseMsgUnlinkTokenPairResponse();
    return message;
  },
  fromAmino(_: MsgUnlinkTokenPairResponseAmino): MsgUnlinkTokenPairResponse {
    const message = createBaseMsgUnlinkTokenPairResponse();
    return message;
  },
  toAmino(_: MsgUnlinkTokenPairResponse, useInterfaces: boolean = false): MsgUnlinkTokenPairResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUnlinkTokenPairResponseAminoMsg): MsgUnlinkTokenPairResponse {
    return MsgUnlinkTokenPairResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnlinkTokenPairResponseProtoMsg, useInterfaces: boolean = false): MsgUnlinkTokenPairResponse {
    return MsgUnlinkTokenPairResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnlinkTokenPairResponse): Uint8Array {
    return MsgUnlinkTokenPairResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUnlinkTokenPairResponse): MsgUnlinkTokenPairResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgUnlinkTokenPairResponse",
      value: MsgUnlinkTokenPairResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddRemoteTokenMessenger(): MsgAddRemoteTokenMessenger {
  return {
    from: "",
    domainId: 0,
    address: new Uint8Array()
  };
}
export const MsgAddRemoteTokenMessenger = {
  typeUrl: "/circle.cctp.v1.MsgAddRemoteTokenMessenger",
  encode(message: MsgAddRemoteTokenMessenger, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.domainId !== 0) {
      writer.uint32(16).uint32(message.domainId);
    }
    if (message.address.length !== 0) {
      writer.uint32(26).bytes(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddRemoteTokenMessenger {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddRemoteTokenMessenger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.domainId = reader.uint32();
          break;
        case 3:
          message.address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddRemoteTokenMessenger>): MsgAddRemoteTokenMessenger {
    const message = createBaseMsgAddRemoteTokenMessenger();
    message.from = object.from ?? "";
    message.domainId = object.domainId ?? 0;
    message.address = object.address ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgAddRemoteTokenMessengerAmino): MsgAddRemoteTokenMessenger {
    const message = createBaseMsgAddRemoteTokenMessenger();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.domain_id !== undefined && object.domain_id !== null) {
      message.domainId = object.domain_id;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = bytesFromBase64(object.address);
    }
    return message;
  },
  toAmino(message: MsgAddRemoteTokenMessenger, useInterfaces: boolean = false): MsgAddRemoteTokenMessengerAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.domain_id = message.domainId;
    obj.address = message.address ? base64FromBytes(message.address) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddRemoteTokenMessengerAminoMsg): MsgAddRemoteTokenMessenger {
    return MsgAddRemoteTokenMessenger.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddRemoteTokenMessengerProtoMsg, useInterfaces: boolean = false): MsgAddRemoteTokenMessenger {
    return MsgAddRemoteTokenMessenger.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddRemoteTokenMessenger): Uint8Array {
    return MsgAddRemoteTokenMessenger.encode(message).finish();
  },
  toProtoMsg(message: MsgAddRemoteTokenMessenger): MsgAddRemoteTokenMessengerProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgAddRemoteTokenMessenger",
      value: MsgAddRemoteTokenMessenger.encode(message).finish()
    };
  }
};
function createBaseMsgAddRemoteTokenMessengerResponse(): MsgAddRemoteTokenMessengerResponse {
  return {};
}
export const MsgAddRemoteTokenMessengerResponse = {
  typeUrl: "/circle.cctp.v1.MsgAddRemoteTokenMessengerResponse",
  encode(_: MsgAddRemoteTokenMessengerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddRemoteTokenMessengerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddRemoteTokenMessengerResponse();
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
  fromPartial(_: Partial<MsgAddRemoteTokenMessengerResponse>): MsgAddRemoteTokenMessengerResponse {
    const message = createBaseMsgAddRemoteTokenMessengerResponse();
    return message;
  },
  fromAmino(_: MsgAddRemoteTokenMessengerResponseAmino): MsgAddRemoteTokenMessengerResponse {
    const message = createBaseMsgAddRemoteTokenMessengerResponse();
    return message;
  },
  toAmino(_: MsgAddRemoteTokenMessengerResponse, useInterfaces: boolean = false): MsgAddRemoteTokenMessengerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddRemoteTokenMessengerResponseAminoMsg): MsgAddRemoteTokenMessengerResponse {
    return MsgAddRemoteTokenMessengerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddRemoteTokenMessengerResponseProtoMsg, useInterfaces: boolean = false): MsgAddRemoteTokenMessengerResponse {
    return MsgAddRemoteTokenMessengerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddRemoteTokenMessengerResponse): Uint8Array {
    return MsgAddRemoteTokenMessengerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddRemoteTokenMessengerResponse): MsgAddRemoteTokenMessengerResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgAddRemoteTokenMessengerResponse",
      value: MsgAddRemoteTokenMessengerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveRemoteTokenMessenger(): MsgRemoveRemoteTokenMessenger {
  return {
    from: "",
    domainId: 0
  };
}
export const MsgRemoveRemoteTokenMessenger = {
  typeUrl: "/circle.cctp.v1.MsgRemoveRemoteTokenMessenger",
  encode(message: MsgRemoveRemoteTokenMessenger, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.domainId !== 0) {
      writer.uint32(16).uint32(message.domainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveRemoteTokenMessenger {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveRemoteTokenMessenger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.domainId = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveRemoteTokenMessenger>): MsgRemoveRemoteTokenMessenger {
    const message = createBaseMsgRemoveRemoteTokenMessenger();
    message.from = object.from ?? "";
    message.domainId = object.domainId ?? 0;
    return message;
  },
  fromAmino(object: MsgRemoveRemoteTokenMessengerAmino): MsgRemoveRemoteTokenMessenger {
    const message = createBaseMsgRemoveRemoteTokenMessenger();
    if (object.from !== undefined && object.from !== null) {
      message.from = object.from;
    }
    if (object.domain_id !== undefined && object.domain_id !== null) {
      message.domainId = object.domain_id;
    }
    return message;
  },
  toAmino(message: MsgRemoveRemoteTokenMessenger, useInterfaces: boolean = false): MsgRemoveRemoteTokenMessengerAmino {
    const obj: any = {};
    obj.from = message.from;
    obj.domain_id = message.domainId;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveRemoteTokenMessengerAminoMsg): MsgRemoveRemoteTokenMessenger {
    return MsgRemoveRemoteTokenMessenger.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveRemoteTokenMessengerProtoMsg, useInterfaces: boolean = false): MsgRemoveRemoteTokenMessenger {
    return MsgRemoveRemoteTokenMessenger.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveRemoteTokenMessenger): Uint8Array {
    return MsgRemoveRemoteTokenMessenger.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveRemoteTokenMessenger): MsgRemoveRemoteTokenMessengerProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgRemoveRemoteTokenMessenger",
      value: MsgRemoveRemoteTokenMessenger.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveRemoteTokenMessengerResponse(): MsgRemoveRemoteTokenMessengerResponse {
  return {};
}
export const MsgRemoveRemoteTokenMessengerResponse = {
  typeUrl: "/circle.cctp.v1.MsgRemoveRemoteTokenMessengerResponse",
  encode(_: MsgRemoveRemoteTokenMessengerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveRemoteTokenMessengerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveRemoteTokenMessengerResponse();
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
  fromPartial(_: Partial<MsgRemoveRemoteTokenMessengerResponse>): MsgRemoveRemoteTokenMessengerResponse {
    const message = createBaseMsgRemoveRemoteTokenMessengerResponse();
    return message;
  },
  fromAmino(_: MsgRemoveRemoteTokenMessengerResponseAmino): MsgRemoveRemoteTokenMessengerResponse {
    const message = createBaseMsgRemoveRemoteTokenMessengerResponse();
    return message;
  },
  toAmino(_: MsgRemoveRemoteTokenMessengerResponse, useInterfaces: boolean = false): MsgRemoveRemoteTokenMessengerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveRemoteTokenMessengerResponseAminoMsg): MsgRemoveRemoteTokenMessengerResponse {
    return MsgRemoveRemoteTokenMessengerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveRemoteTokenMessengerResponseProtoMsg, useInterfaces: boolean = false): MsgRemoveRemoteTokenMessengerResponse {
    return MsgRemoveRemoteTokenMessengerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveRemoteTokenMessengerResponse): Uint8Array {
    return MsgRemoveRemoteTokenMessengerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveRemoteTokenMessengerResponse): MsgRemoveRemoteTokenMessengerResponseProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.MsgRemoveRemoteTokenMessengerResponse",
      value: MsgRemoveRemoteTokenMessengerResponse.encode(message).finish()
    };
  }
};