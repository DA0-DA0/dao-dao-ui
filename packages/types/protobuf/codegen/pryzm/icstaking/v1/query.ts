//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { HostChain, HostChainAmino, HostChainSDKType, HostChainState, HostChainStateAmino, HostChainStateSDKType } from "./host_chain";
import { Undelegation, UndelegationAmino, UndelegationSDKType, ChannelUndelegation, ChannelUndelegationAmino, ChannelUndelegationSDKType } from "./undelegation";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { ReplyData, ReplyDataAmino, ReplyDataSDKType } from "./reply";
import { MultiSigConnection, MultiSigConnectionAmino, MultiSigConnectionSDKType, MultiSigPacket, MultiSigPacketAmino, MultiSigPacketSDKType } from "./multisig";
import { FailedLsmTransfer, FailedLsmTransferAmino, FailedLsmTransferSDKType, RedeemableLsm, RedeemableLsmAmino, RedeemableLsmSDKType } from "./lsm";
import { SweepTransfer, SweepTransferAmino, SweepTransferSDKType } from "./sweep";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryGetHostChainRequest {
  hostChainId: string;
}
export interface QueryGetHostChainRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainRequest";
  value: Uint8Array;
}
export interface QueryGetHostChainRequestAmino {
  host_chain_id?: string;
}
export interface QueryGetHostChainRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetHostChainRequest";
  value: QueryGetHostChainRequestAmino;
}
export interface QueryGetHostChainRequestSDKType {
  host_chain_id: string;
}
export interface QueryGetHostChainResponse {
  hostChain: HostChain | undefined;
}
export interface QueryGetHostChainResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainResponse";
  value: Uint8Array;
}
export interface QueryGetHostChainResponseAmino {
  host_chain?: HostChainAmino | undefined;
}
export interface QueryGetHostChainResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetHostChainResponse";
  value: QueryGetHostChainResponseAmino;
}
export interface QueryGetHostChainResponseSDKType {
  host_chain: HostChainSDKType | undefined;
}
export interface QueryAllHostChainRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllHostChainRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainRequest";
  value: Uint8Array;
}
export interface QueryAllHostChainRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllHostChainRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllHostChainRequest";
  value: QueryAllHostChainRequestAmino;
}
export interface QueryAllHostChainRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllHostChainResponse {
  hostChain: HostChain[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllHostChainResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainResponse";
  value: Uint8Array;
}
export interface QueryAllHostChainResponseAmino {
  host_chain?: HostChainAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllHostChainResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllHostChainResponse";
  value: QueryAllHostChainResponseAmino;
}
export interface QueryAllHostChainResponseSDKType {
  host_chain: HostChainSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetHostChainStateRequest {
  hostChainId: string;
}
export interface QueryGetHostChainStateRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainStateRequest";
  value: Uint8Array;
}
export interface QueryGetHostChainStateRequestAmino {
  host_chain_id?: string;
}
export interface QueryGetHostChainStateRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetHostChainStateRequest";
  value: QueryGetHostChainStateRequestAmino;
}
export interface QueryGetHostChainStateRequestSDKType {
  host_chain_id: string;
}
export interface QueryGetHostChainStateResponse {
  hostChainState: HostChainState | undefined;
}
export interface QueryGetHostChainStateResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainStateResponse";
  value: Uint8Array;
}
export interface QueryGetHostChainStateResponseAmino {
  host_chain_state?: HostChainStateAmino | undefined;
}
export interface QueryGetHostChainStateResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetHostChainStateResponse";
  value: QueryGetHostChainStateResponseAmino;
}
export interface QueryGetHostChainStateResponseSDKType {
  host_chain_state: HostChainStateSDKType | undefined;
}
export interface QueryAllHostChainStateRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllHostChainStateRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainStateRequest";
  value: Uint8Array;
}
export interface QueryAllHostChainStateRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllHostChainStateRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllHostChainStateRequest";
  value: QueryAllHostChainStateRequestAmino;
}
export interface QueryAllHostChainStateRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllHostChainStateResponse {
  hostChainState: HostChainState[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllHostChainStateResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainStateResponse";
  value: Uint8Array;
}
export interface QueryAllHostChainStateResponseAmino {
  host_chain_state?: HostChainStateAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllHostChainStateResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllHostChainStateResponse";
  value: QueryAllHostChainStateResponseAmino;
}
export interface QueryAllHostChainStateResponseSDKType {
  host_chain_state: HostChainStateSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetUndelegationRequest {
  hostChain: string;
  epoch: bigint;
}
export interface QueryGetUndelegationRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetUndelegationRequest";
  value: Uint8Array;
}
export interface QueryGetUndelegationRequestAmino {
  host_chain?: string;
  epoch?: string;
}
export interface QueryGetUndelegationRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetUndelegationRequest";
  value: QueryGetUndelegationRequestAmino;
}
export interface QueryGetUndelegationRequestSDKType {
  host_chain: string;
  epoch: bigint;
}
export interface QueryGetUndelegationResponse {
  undelegation: Undelegation | undefined;
}
export interface QueryGetUndelegationResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetUndelegationResponse";
  value: Uint8Array;
}
export interface QueryGetUndelegationResponseAmino {
  undelegation?: UndelegationAmino | undefined;
}
export interface QueryGetUndelegationResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetUndelegationResponse";
  value: QueryGetUndelegationResponseAmino;
}
export interface QueryGetUndelegationResponseSDKType {
  undelegation: UndelegationSDKType | undefined;
}
export interface QueryAllUndelegationRequest {
  hostChain: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAllUndelegationRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllUndelegationRequest";
  value: Uint8Array;
}
export interface QueryAllUndelegationRequestAmino {
  host_chain?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllUndelegationRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllUndelegationRequest";
  value: QueryAllUndelegationRequestAmino;
}
export interface QueryAllUndelegationRequestSDKType {
  host_chain: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllUndelegationResponse {
  undelegation: Undelegation[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllUndelegationResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllUndelegationResponse";
  value: Uint8Array;
}
export interface QueryAllUndelegationResponseAmino {
  undelegation?: UndelegationAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllUndelegationResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllUndelegationResponse";
  value: QueryAllUndelegationResponseAmino;
}
export interface QueryAllUndelegationResponseSDKType {
  undelegation: UndelegationSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryIncompleteUndelegationRequest {
  hostChain: string;
  pagination?: PageRequest | undefined;
}
export interface QueryIncompleteUndelegationRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryIncompleteUndelegationRequest";
  value: Uint8Array;
}
export interface QueryIncompleteUndelegationRequestAmino {
  host_chain?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryIncompleteUndelegationRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryIncompleteUndelegationRequest";
  value: QueryIncompleteUndelegationRequestAmino;
}
export interface QueryIncompleteUndelegationRequestSDKType {
  host_chain: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryIncompleteUndelegationResponse {
  undelegation: Undelegation[];
  pagination?: PageResponse | undefined;
}
export interface QueryIncompleteUndelegationResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryIncompleteUndelegationResponse";
  value: Uint8Array;
}
export interface QueryIncompleteUndelegationResponseAmino {
  undelegation?: UndelegationAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryIncompleteUndelegationResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryIncompleteUndelegationResponse";
  value: QueryIncompleteUndelegationResponseAmino;
}
export interface QueryIncompleteUndelegationResponseSDKType {
  undelegation: UndelegationSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetChannelUndelegationRequest {
  hostChain: string;
  epoch: bigint;
  transferChannel: string;
}
export interface QueryGetChannelUndelegationRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetChannelUndelegationRequest";
  value: Uint8Array;
}
export interface QueryGetChannelUndelegationRequestAmino {
  host_chain?: string;
  epoch?: string;
  transfer_channel?: string;
}
export interface QueryGetChannelUndelegationRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetChannelUndelegationRequest";
  value: QueryGetChannelUndelegationRequestAmino;
}
export interface QueryGetChannelUndelegationRequestSDKType {
  host_chain: string;
  epoch: bigint;
  transfer_channel: string;
}
export interface QueryGetChannelUndelegationResponse {
  channelUndelegation: ChannelUndelegation | undefined;
}
export interface QueryGetChannelUndelegationResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetChannelUndelegationResponse";
  value: Uint8Array;
}
export interface QueryGetChannelUndelegationResponseAmino {
  channel_undelegation?: ChannelUndelegationAmino | undefined;
}
export interface QueryGetChannelUndelegationResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetChannelUndelegationResponse";
  value: QueryGetChannelUndelegationResponseAmino;
}
export interface QueryGetChannelUndelegationResponseSDKType {
  channel_undelegation: ChannelUndelegationSDKType | undefined;
}
export interface QueryAllChannelUndelegationRequest {
  hostChain: string;
  epoch: bigint;
  pagination?: PageRequest | undefined;
}
export interface QueryAllChannelUndelegationRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllChannelUndelegationRequest";
  value: Uint8Array;
}
export interface QueryAllChannelUndelegationRequestAmino {
  host_chain?: string;
  epoch?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllChannelUndelegationRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllChannelUndelegationRequest";
  value: QueryAllChannelUndelegationRequestAmino;
}
export interface QueryAllChannelUndelegationRequestSDKType {
  host_chain: string;
  epoch: bigint;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllChannelUndelegationResponse {
  channelUndelegation: ChannelUndelegation[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllChannelUndelegationResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllChannelUndelegationResponse";
  value: Uint8Array;
}
export interface QueryAllChannelUndelegationResponseAmino {
  channel_undelegation?: ChannelUndelegationAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllChannelUndelegationResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllChannelUndelegationResponse";
  value: QueryAllChannelUndelegationResponseAmino;
}
export interface QueryAllChannelUndelegationResponseSDKType {
  channel_undelegation: ChannelUndelegationSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryDelegationQueueBalanceRequest {
  hostChain: string;
  transferChannel: string;
}
export interface QueryDelegationQueueBalanceRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryDelegationQueueBalanceRequest";
  value: Uint8Array;
}
export interface QueryDelegationQueueBalanceRequestAmino {
  host_chain?: string;
  transfer_channel?: string;
}
export interface QueryDelegationQueueBalanceRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryDelegationQueueBalanceRequest";
  value: QueryDelegationQueueBalanceRequestAmino;
}
export interface QueryDelegationQueueBalanceRequestSDKType {
  host_chain: string;
  transfer_channel: string;
}
export interface QueryDelegationQueueBalanceResponse {
  balance: Coin | undefined;
}
export interface QueryDelegationQueueBalanceResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryDelegationQueueBalanceResponse";
  value: Uint8Array;
}
export interface QueryDelegationQueueBalanceResponseAmino {
  balance?: CoinAmino | undefined;
}
export interface QueryDelegationQueueBalanceResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryDelegationQueueBalanceResponse";
  value: QueryDelegationQueueBalanceResponseAmino;
}
export interface QueryDelegationQueueBalanceResponseSDKType {
  balance: CoinSDKType | undefined;
}
export interface QueryEpochInfoRequest {
  hostChain: string;
}
export interface QueryEpochInfoRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryEpochInfoRequest";
  value: Uint8Array;
}
export interface QueryEpochInfoRequestAmino {
  host_chain?: string;
}
export interface QueryEpochInfoRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryEpochInfoRequest";
  value: QueryEpochInfoRequestAmino;
}
export interface QueryEpochInfoRequestSDKType {
  host_chain: string;
}
export interface QueryEpochInfoResponse {
  lastDelegationTime: Date | undefined;
  lastRedelegationTime: Date | undefined;
  lastLsmRedeemTime: Date | undefined;
  lastUndelegationTime: Date | undefined;
  currentUndelegationEpoch: bigint;
}
export interface QueryEpochInfoResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryEpochInfoResponse";
  value: Uint8Array;
}
export interface QueryEpochInfoResponseAmino {
  last_delegation_time?: string | undefined;
  last_redelegation_time?: string | undefined;
  last_lsm_redeem_time?: string | undefined;
  last_undelegation_time?: string | undefined;
  current_undelegation_epoch?: string;
}
export interface QueryEpochInfoResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryEpochInfoResponse";
  value: QueryEpochInfoResponseAmino;
}
export interface QueryEpochInfoResponseSDKType {
  last_delegation_time: Date | undefined;
  last_redelegation_time: Date | undefined;
  last_lsm_redeem_time: Date | undefined;
  last_undelegation_time: Date | undefined;
  current_undelegation_epoch: bigint;
}
export interface QueryAllReplyDataRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllReplyDataRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllReplyDataRequest";
  value: Uint8Array;
}
export interface QueryAllReplyDataRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllReplyDataRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllReplyDataRequest";
  value: QueryAllReplyDataRequestAmino;
}
export interface QueryAllReplyDataRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllReplyDataResponse {
  replyData: ReplyData[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllReplyDataResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllReplyDataResponse";
  value: Uint8Array;
}
export interface QueryAllReplyDataResponseAmino {
  reply_data?: ReplyDataAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllReplyDataResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllReplyDataResponse";
  value: QueryAllReplyDataResponseAmino;
}
export interface QueryAllReplyDataResponseSDKType {
  reply_data: ReplyDataSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetMultiSigConnectionRequest {
  id: string;
}
export interface QueryGetMultiSigConnectionRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigConnectionRequest";
  value: Uint8Array;
}
export interface QueryGetMultiSigConnectionRequestAmino {
  id?: string;
}
export interface QueryGetMultiSigConnectionRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetMultiSigConnectionRequest";
  value: QueryGetMultiSigConnectionRequestAmino;
}
export interface QueryGetMultiSigConnectionRequestSDKType {
  id: string;
}
export interface QueryGetMultiSigConnectionResponse {
  multiSigConnection: MultiSigConnection | undefined;
}
export interface QueryGetMultiSigConnectionResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigConnectionResponse";
  value: Uint8Array;
}
export interface QueryGetMultiSigConnectionResponseAmino {
  multi_sig_connection?: MultiSigConnectionAmino | undefined;
}
export interface QueryGetMultiSigConnectionResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetMultiSigConnectionResponse";
  value: QueryGetMultiSigConnectionResponseAmino;
}
export interface QueryGetMultiSigConnectionResponseSDKType {
  multi_sig_connection: MultiSigConnectionSDKType | undefined;
}
export interface QueryAllMultiSigConnectionRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllMultiSigConnectionRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigConnectionRequest";
  value: Uint8Array;
}
export interface QueryAllMultiSigConnectionRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllMultiSigConnectionRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllMultiSigConnectionRequest";
  value: QueryAllMultiSigConnectionRequestAmino;
}
export interface QueryAllMultiSigConnectionRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllMultiSigConnectionResponse {
  multiSigConnection: MultiSigConnection[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllMultiSigConnectionResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigConnectionResponse";
  value: Uint8Array;
}
export interface QueryAllMultiSigConnectionResponseAmino {
  multi_sig_connection?: MultiSigConnectionAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllMultiSigConnectionResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllMultiSigConnectionResponse";
  value: QueryAllMultiSigConnectionResponseAmino;
}
export interface QueryAllMultiSigConnectionResponseSDKType {
  multi_sig_connection: MultiSigConnectionSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryGetMultiSigPacketRequest {
  connectionId: string;
  sequence: bigint;
}
export interface QueryGetMultiSigPacketRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigPacketRequest";
  value: Uint8Array;
}
export interface QueryGetMultiSigPacketRequestAmino {
  connection_id?: string;
  sequence?: string;
}
export interface QueryGetMultiSigPacketRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetMultiSigPacketRequest";
  value: QueryGetMultiSigPacketRequestAmino;
}
export interface QueryGetMultiSigPacketRequestSDKType {
  connection_id: string;
  sequence: bigint;
}
export interface QueryGetMultiSigPacketResponse {
  multiSigPacket: MultiSigPacket | undefined;
}
export interface QueryGetMultiSigPacketResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigPacketResponse";
  value: Uint8Array;
}
export interface QueryGetMultiSigPacketResponseAmino {
  multi_sig_packet?: MultiSigPacketAmino | undefined;
}
export interface QueryGetMultiSigPacketResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryGetMultiSigPacketResponse";
  value: QueryGetMultiSigPacketResponseAmino;
}
export interface QueryGetMultiSigPacketResponseSDKType {
  multi_sig_packet: MultiSigPacketSDKType | undefined;
}
export interface QueryAllMultiSigPacketRequest {
  connectionId?: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAllMultiSigPacketRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigPacketRequest";
  value: Uint8Array;
}
export interface QueryAllMultiSigPacketRequestAmino {
  connection_id?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllMultiSigPacketRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllMultiSigPacketRequest";
  value: QueryAllMultiSigPacketRequestAmino;
}
export interface QueryAllMultiSigPacketRequestSDKType {
  connection_id?: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllMultiSigPacketResponse {
  multiSigPacket: MultiSigPacket[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllMultiSigPacketResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigPacketResponse";
  value: Uint8Array;
}
export interface QueryAllMultiSigPacketResponseAmino {
  multi_sig_packet?: MultiSigPacketAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllMultiSigPacketResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllMultiSigPacketResponse";
  value: QueryAllMultiSigPacketResponseAmino;
}
export interface QueryAllMultiSigPacketResponseSDKType {
  multi_sig_packet: MultiSigPacketSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryAllFailedLsmTransferRequest {
  hostChain: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAllFailedLsmTransferRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllFailedLsmTransferRequest";
  value: Uint8Array;
}
export interface QueryAllFailedLsmTransferRequestAmino {
  host_chain?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllFailedLsmTransferRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllFailedLsmTransferRequest";
  value: QueryAllFailedLsmTransferRequestAmino;
}
export interface QueryAllFailedLsmTransferRequestSDKType {
  host_chain: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllFailedLsmTransferResponse {
  failedLsmTransfer: FailedLsmTransfer[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllFailedLsmTransferResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllFailedLsmTransferResponse";
  value: Uint8Array;
}
export interface QueryAllFailedLsmTransferResponseAmino {
  failed_lsm_transfer?: FailedLsmTransferAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllFailedLsmTransferResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllFailedLsmTransferResponse";
  value: QueryAllFailedLsmTransferResponseAmino;
}
export interface QueryAllFailedLsmTransferResponseSDKType {
  failed_lsm_transfer: FailedLsmTransferSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryAllRedeemableLsmRequest {
  hostChain: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAllRedeemableLsmRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllRedeemableLsmRequest";
  value: Uint8Array;
}
export interface QueryAllRedeemableLsmRequestAmino {
  host_chain?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllRedeemableLsmRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllRedeemableLsmRequest";
  value: QueryAllRedeemableLsmRequestAmino;
}
export interface QueryAllRedeemableLsmRequestSDKType {
  host_chain: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllRedeemableLsmResponse {
  redeemableLsm: RedeemableLsm[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllRedeemableLsmResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllRedeemableLsmResponse";
  value: Uint8Array;
}
export interface QueryAllRedeemableLsmResponseAmino {
  redeemable_lsm?: RedeemableLsmAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllRedeemableLsmResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllRedeemableLsmResponse";
  value: QueryAllRedeemableLsmResponseAmino;
}
export interface QueryAllRedeemableLsmResponseSDKType {
  redeemable_lsm: RedeemableLsmSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryAllSweepTransferRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllSweepTransferRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllSweepTransferRequest";
  value: Uint8Array;
}
export interface QueryAllSweepTransferRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllSweepTransferRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllSweepTransferRequest";
  value: QueryAllSweepTransferRequestAmino;
}
export interface QueryAllSweepTransferRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllSweepTransferResponse {
  sweepTransfer: SweepTransfer[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllSweepTransferResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QueryAllSweepTransferResponse";
  value: Uint8Array;
}
export interface QueryAllSweepTransferResponseAmino {
  sweep_transfer?: SweepTransferAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllSweepTransferResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QueryAllSweepTransferResponse";
  value: QueryAllSweepTransferResponseAmino;
}
export interface QueryAllSweepTransferResponseSDKType {
  sweep_transfer: SweepTransferSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QuerySimulateStakeRequest {
  hostChain: string;
  transferChannel: string;
  /** amount_in is the amount of tokens to stake. if this field is set, amount_out must be nil */
  amountIn: string;
  /** amount_out is the amount of cAsset tokens to receive. if this field is set, amount_in must be nil */
  amountOut: string;
}
export interface QuerySimulateStakeRequestProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QuerySimulateStakeRequest";
  value: Uint8Array;
}
export interface QuerySimulateStakeRequestAmino {
  host_chain?: string;
  transfer_channel?: string;
  /** amount_in is the amount of tokens to stake. if this field is set, amount_out must be nil */
  amount_in?: string;
  /** amount_out is the amount of cAsset tokens to receive. if this field is set, amount_in must be nil */
  amount_out?: string;
}
export interface QuerySimulateStakeRequestAminoMsg {
  type: "/pryzm.icstaking.v1.QuerySimulateStakeRequest";
  value: QuerySimulateStakeRequestAmino;
}
export interface QuerySimulateStakeRequestSDKType {
  host_chain: string;
  transfer_channel: string;
  amount_in: string;
  amount_out: string;
}
export interface QuerySimulateStakeResponse {
  /** the amount of tokens being staked */
  amountIn?: Coin | undefined;
  /** the amount of cAssets tokens being received */
  amountOut?: Coin | undefined;
  /** the amount of fee deducted from the amount_in before stake */
  feeAmount: Coin | undefined;
}
export interface QuerySimulateStakeResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.QuerySimulateStakeResponse";
  value: Uint8Array;
}
export interface QuerySimulateStakeResponseAmino {
  /** the amount of tokens being staked */
  amount_in?: CoinAmino | undefined;
  /** the amount of cAssets tokens being received */
  amount_out?: CoinAmino | undefined;
  /** the amount of fee deducted from the amount_in before stake */
  fee_amount?: CoinAmino | undefined;
}
export interface QuerySimulateStakeResponseAminoMsg {
  type: "/pryzm.icstaking.v1.QuerySimulateStakeResponse";
  value: QuerySimulateStakeResponseAmino;
}
export interface QuerySimulateStakeResponseSDKType {
  amount_in?: CoinSDKType | undefined;
  amount_out?: CoinSDKType | undefined;
  fee_amount: CoinSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetHostChainRequest(): QueryGetHostChainRequest {
  return {
    hostChainId: ""
  };
}
export const QueryGetHostChainRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainRequest",
  encode(message: QueryGetHostChainRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChainId !== "") {
      writer.uint32(10).string(message.hostChainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHostChainRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHostChainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHostChainRequest>): QueryGetHostChainRequest {
    const message = createBaseQueryGetHostChainRequest();
    message.hostChainId = object.hostChainId ?? "";
    return message;
  },
  fromAmino(object: QueryGetHostChainRequestAmino): QueryGetHostChainRequest {
    const message = createBaseQueryGetHostChainRequest();
    if (object.host_chain_id !== undefined && object.host_chain_id !== null) {
      message.hostChainId = object.host_chain_id;
    }
    return message;
  },
  toAmino(message: QueryGetHostChainRequest, useInterfaces: boolean = false): QueryGetHostChainRequestAmino {
    const obj: any = {};
    obj.host_chain_id = message.hostChainId === "" ? undefined : message.hostChainId;
    return obj;
  },
  fromAminoMsg(object: QueryGetHostChainRequestAminoMsg): QueryGetHostChainRequest {
    return QueryGetHostChainRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHostChainRequestProtoMsg, useInterfaces: boolean = false): QueryGetHostChainRequest {
    return QueryGetHostChainRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHostChainRequest): Uint8Array {
    return QueryGetHostChainRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHostChainRequest): QueryGetHostChainRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainRequest",
      value: QueryGetHostChainRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetHostChainResponse(): QueryGetHostChainResponse {
  return {
    hostChain: HostChain.fromPartial({})
  };
}
export const QueryGetHostChainResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainResponse",
  encode(message: QueryGetHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== undefined) {
      HostChain.encode(message.hostChain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHostChainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = HostChain.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHostChainResponse>): QueryGetHostChainResponse {
    const message = createBaseQueryGetHostChainResponse();
    message.hostChain = object.hostChain !== undefined && object.hostChain !== null ? HostChain.fromPartial(object.hostChain) : undefined;
    return message;
  },
  fromAmino(object: QueryGetHostChainResponseAmino): QueryGetHostChainResponse {
    const message = createBaseQueryGetHostChainResponse();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = HostChain.fromAmino(object.host_chain);
    }
    return message;
  },
  toAmino(message: QueryGetHostChainResponse, useInterfaces: boolean = false): QueryGetHostChainResponseAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain ? HostChain.toAmino(message.hostChain, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetHostChainResponseAminoMsg): QueryGetHostChainResponse {
    return QueryGetHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHostChainResponseProtoMsg, useInterfaces: boolean = false): QueryGetHostChainResponse {
    return QueryGetHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHostChainResponse): Uint8Array {
    return QueryGetHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHostChainResponse): QueryGetHostChainResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainResponse",
      value: QueryGetHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllHostChainRequest(): QueryAllHostChainRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllHostChainRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainRequest",
  encode(message: QueryAllHostChainRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHostChainRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHostChainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllHostChainRequest>): QueryAllHostChainRequest {
    const message = createBaseQueryAllHostChainRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHostChainRequestAmino): QueryAllHostChainRequest {
    const message = createBaseQueryAllHostChainRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHostChainRequest, useInterfaces: boolean = false): QueryAllHostChainRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHostChainRequestAminoMsg): QueryAllHostChainRequest {
    return QueryAllHostChainRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHostChainRequestProtoMsg, useInterfaces: boolean = false): QueryAllHostChainRequest {
    return QueryAllHostChainRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHostChainRequest): Uint8Array {
    return QueryAllHostChainRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHostChainRequest): QueryAllHostChainRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainRequest",
      value: QueryAllHostChainRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllHostChainResponse(): QueryAllHostChainResponse {
  return {
    hostChain: [],
    pagination: undefined
  };
}
export const QueryAllHostChainResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainResponse",
  encode(message: QueryAllHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.hostChain) {
      HostChain.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHostChainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain.push(HostChain.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllHostChainResponse>): QueryAllHostChainResponse {
    const message = createBaseQueryAllHostChainResponse();
    message.hostChain = object.hostChain?.map(e => HostChain.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHostChainResponseAmino): QueryAllHostChainResponse {
    const message = createBaseQueryAllHostChainResponse();
    message.hostChain = object.host_chain?.map(e => HostChain.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHostChainResponse, useInterfaces: boolean = false): QueryAllHostChainResponseAmino {
    const obj: any = {};
    if (message.hostChain) {
      obj.host_chain = message.hostChain.map(e => e ? HostChain.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_chain = message.hostChain;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHostChainResponseAminoMsg): QueryAllHostChainResponse {
    return QueryAllHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHostChainResponseProtoMsg, useInterfaces: boolean = false): QueryAllHostChainResponse {
    return QueryAllHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHostChainResponse): Uint8Array {
    return QueryAllHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHostChainResponse): QueryAllHostChainResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainResponse",
      value: QueryAllHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetHostChainStateRequest(): QueryGetHostChainStateRequest {
  return {
    hostChainId: ""
  };
}
export const QueryGetHostChainStateRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainStateRequest",
  encode(message: QueryGetHostChainStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChainId !== "") {
      writer.uint32(10).string(message.hostChainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHostChainStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHostChainStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHostChainStateRequest>): QueryGetHostChainStateRequest {
    const message = createBaseQueryGetHostChainStateRequest();
    message.hostChainId = object.hostChainId ?? "";
    return message;
  },
  fromAmino(object: QueryGetHostChainStateRequestAmino): QueryGetHostChainStateRequest {
    const message = createBaseQueryGetHostChainStateRequest();
    if (object.host_chain_id !== undefined && object.host_chain_id !== null) {
      message.hostChainId = object.host_chain_id;
    }
    return message;
  },
  toAmino(message: QueryGetHostChainStateRequest, useInterfaces: boolean = false): QueryGetHostChainStateRequestAmino {
    const obj: any = {};
    obj.host_chain_id = message.hostChainId === "" ? undefined : message.hostChainId;
    return obj;
  },
  fromAminoMsg(object: QueryGetHostChainStateRequestAminoMsg): QueryGetHostChainStateRequest {
    return QueryGetHostChainStateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHostChainStateRequestProtoMsg, useInterfaces: boolean = false): QueryGetHostChainStateRequest {
    return QueryGetHostChainStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHostChainStateRequest): Uint8Array {
    return QueryGetHostChainStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHostChainStateRequest): QueryGetHostChainStateRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainStateRequest",
      value: QueryGetHostChainStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetHostChainStateResponse(): QueryGetHostChainStateResponse {
  return {
    hostChainState: HostChainState.fromPartial({})
  };
}
export const QueryGetHostChainStateResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainStateResponse",
  encode(message: QueryGetHostChainStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChainState !== undefined) {
      HostChainState.encode(message.hostChainState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetHostChainStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetHostChainStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChainState = HostChainState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetHostChainStateResponse>): QueryGetHostChainStateResponse {
    const message = createBaseQueryGetHostChainStateResponse();
    message.hostChainState = object.hostChainState !== undefined && object.hostChainState !== null ? HostChainState.fromPartial(object.hostChainState) : undefined;
    return message;
  },
  fromAmino(object: QueryGetHostChainStateResponseAmino): QueryGetHostChainStateResponse {
    const message = createBaseQueryGetHostChainStateResponse();
    if (object.host_chain_state !== undefined && object.host_chain_state !== null) {
      message.hostChainState = HostChainState.fromAmino(object.host_chain_state);
    }
    return message;
  },
  toAmino(message: QueryGetHostChainStateResponse, useInterfaces: boolean = false): QueryGetHostChainStateResponseAmino {
    const obj: any = {};
    obj.host_chain_state = message.hostChainState ? HostChainState.toAmino(message.hostChainState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetHostChainStateResponseAminoMsg): QueryGetHostChainStateResponse {
    return QueryGetHostChainStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetHostChainStateResponseProtoMsg, useInterfaces: boolean = false): QueryGetHostChainStateResponse {
    return QueryGetHostChainStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetHostChainStateResponse): Uint8Array {
    return QueryGetHostChainStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetHostChainStateResponse): QueryGetHostChainStateResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetHostChainStateResponse",
      value: QueryGetHostChainStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllHostChainStateRequest(): QueryAllHostChainStateRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllHostChainStateRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainStateRequest",
  encode(message: QueryAllHostChainStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHostChainStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHostChainStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllHostChainStateRequest>): QueryAllHostChainStateRequest {
    const message = createBaseQueryAllHostChainStateRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHostChainStateRequestAmino): QueryAllHostChainStateRequest {
    const message = createBaseQueryAllHostChainStateRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHostChainStateRequest, useInterfaces: boolean = false): QueryAllHostChainStateRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHostChainStateRequestAminoMsg): QueryAllHostChainStateRequest {
    return QueryAllHostChainStateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHostChainStateRequestProtoMsg, useInterfaces: boolean = false): QueryAllHostChainStateRequest {
    return QueryAllHostChainStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHostChainStateRequest): Uint8Array {
    return QueryAllHostChainStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHostChainStateRequest): QueryAllHostChainStateRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainStateRequest",
      value: QueryAllHostChainStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllHostChainStateResponse(): QueryAllHostChainStateResponse {
  return {
    hostChainState: [],
    pagination: undefined
  };
}
export const QueryAllHostChainStateResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainStateResponse",
  encode(message: QueryAllHostChainStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.hostChainState) {
      HostChainState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllHostChainStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllHostChainStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChainState.push(HostChainState.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllHostChainStateResponse>): QueryAllHostChainStateResponse {
    const message = createBaseQueryAllHostChainStateResponse();
    message.hostChainState = object.hostChainState?.map(e => HostChainState.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllHostChainStateResponseAmino): QueryAllHostChainStateResponse {
    const message = createBaseQueryAllHostChainStateResponse();
    message.hostChainState = object.host_chain_state?.map(e => HostChainState.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllHostChainStateResponse, useInterfaces: boolean = false): QueryAllHostChainStateResponseAmino {
    const obj: any = {};
    if (message.hostChainState) {
      obj.host_chain_state = message.hostChainState.map(e => e ? HostChainState.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_chain_state = message.hostChainState;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllHostChainStateResponseAminoMsg): QueryAllHostChainStateResponse {
    return QueryAllHostChainStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllHostChainStateResponseProtoMsg, useInterfaces: boolean = false): QueryAllHostChainStateResponse {
    return QueryAllHostChainStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllHostChainStateResponse): Uint8Array {
    return QueryAllHostChainStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllHostChainStateResponse): QueryAllHostChainStateResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllHostChainStateResponse",
      value: QueryAllHostChainStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetUndelegationRequest(): QueryGetUndelegationRequest {
  return {
    hostChain: "",
    epoch: BigInt(0)
  };
}
export const QueryGetUndelegationRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetUndelegationRequest",
  encode(message: QueryGetUndelegationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    if (message.epoch !== BigInt(0)) {
      writer.uint32(16).uint64(message.epoch);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetUndelegationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetUndelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        case 2:
          message.epoch = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetUndelegationRequest>): QueryGetUndelegationRequest {
    const message = createBaseQueryGetUndelegationRequest();
    message.hostChain = object.hostChain ?? "";
    message.epoch = object.epoch !== undefined && object.epoch !== null ? BigInt(object.epoch.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetUndelegationRequestAmino): QueryGetUndelegationRequest {
    const message = createBaseQueryGetUndelegationRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.epoch !== undefined && object.epoch !== null) {
      message.epoch = BigInt(object.epoch);
    }
    return message;
  },
  toAmino(message: QueryGetUndelegationRequest, useInterfaces: boolean = false): QueryGetUndelegationRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.epoch = message.epoch !== BigInt(0) ? message.epoch.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetUndelegationRequestAminoMsg): QueryGetUndelegationRequest {
    return QueryGetUndelegationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetUndelegationRequestProtoMsg, useInterfaces: boolean = false): QueryGetUndelegationRequest {
    return QueryGetUndelegationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetUndelegationRequest): Uint8Array {
    return QueryGetUndelegationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetUndelegationRequest): QueryGetUndelegationRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetUndelegationRequest",
      value: QueryGetUndelegationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetUndelegationResponse(): QueryGetUndelegationResponse {
  return {
    undelegation: Undelegation.fromPartial({})
  };
}
export const QueryGetUndelegationResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetUndelegationResponse",
  encode(message: QueryGetUndelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.undelegation !== undefined) {
      Undelegation.encode(message.undelegation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetUndelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetUndelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.undelegation = Undelegation.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetUndelegationResponse>): QueryGetUndelegationResponse {
    const message = createBaseQueryGetUndelegationResponse();
    message.undelegation = object.undelegation !== undefined && object.undelegation !== null ? Undelegation.fromPartial(object.undelegation) : undefined;
    return message;
  },
  fromAmino(object: QueryGetUndelegationResponseAmino): QueryGetUndelegationResponse {
    const message = createBaseQueryGetUndelegationResponse();
    if (object.undelegation !== undefined && object.undelegation !== null) {
      message.undelegation = Undelegation.fromAmino(object.undelegation);
    }
    return message;
  },
  toAmino(message: QueryGetUndelegationResponse, useInterfaces: boolean = false): QueryGetUndelegationResponseAmino {
    const obj: any = {};
    obj.undelegation = message.undelegation ? Undelegation.toAmino(message.undelegation, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetUndelegationResponseAminoMsg): QueryGetUndelegationResponse {
    return QueryGetUndelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetUndelegationResponseProtoMsg, useInterfaces: boolean = false): QueryGetUndelegationResponse {
    return QueryGetUndelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetUndelegationResponse): Uint8Array {
    return QueryGetUndelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetUndelegationResponse): QueryGetUndelegationResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetUndelegationResponse",
      value: QueryGetUndelegationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllUndelegationRequest(): QueryAllUndelegationRequest {
  return {
    hostChain: "",
    pagination: undefined
  };
}
export const QueryAllUndelegationRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllUndelegationRequest",
  encode(message: QueryAllUndelegationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllUndelegationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUndelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllUndelegationRequest>): QueryAllUndelegationRequest {
    const message = createBaseQueryAllUndelegationRequest();
    message.hostChain = object.hostChain ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllUndelegationRequestAmino): QueryAllUndelegationRequest {
    const message = createBaseQueryAllUndelegationRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllUndelegationRequest, useInterfaces: boolean = false): QueryAllUndelegationRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllUndelegationRequestAminoMsg): QueryAllUndelegationRequest {
    return QueryAllUndelegationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllUndelegationRequestProtoMsg, useInterfaces: boolean = false): QueryAllUndelegationRequest {
    return QueryAllUndelegationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllUndelegationRequest): Uint8Array {
    return QueryAllUndelegationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllUndelegationRequest): QueryAllUndelegationRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllUndelegationRequest",
      value: QueryAllUndelegationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllUndelegationResponse(): QueryAllUndelegationResponse {
  return {
    undelegation: [],
    pagination: undefined
  };
}
export const QueryAllUndelegationResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllUndelegationResponse",
  encode(message: QueryAllUndelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.undelegation) {
      Undelegation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllUndelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUndelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.undelegation.push(Undelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllUndelegationResponse>): QueryAllUndelegationResponse {
    const message = createBaseQueryAllUndelegationResponse();
    message.undelegation = object.undelegation?.map(e => Undelegation.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllUndelegationResponseAmino): QueryAllUndelegationResponse {
    const message = createBaseQueryAllUndelegationResponse();
    message.undelegation = object.undelegation?.map(e => Undelegation.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllUndelegationResponse, useInterfaces: boolean = false): QueryAllUndelegationResponseAmino {
    const obj: any = {};
    if (message.undelegation) {
      obj.undelegation = message.undelegation.map(e => e ? Undelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.undelegation = message.undelegation;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllUndelegationResponseAminoMsg): QueryAllUndelegationResponse {
    return QueryAllUndelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllUndelegationResponseProtoMsg, useInterfaces: boolean = false): QueryAllUndelegationResponse {
    return QueryAllUndelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllUndelegationResponse): Uint8Array {
    return QueryAllUndelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllUndelegationResponse): QueryAllUndelegationResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllUndelegationResponse",
      value: QueryAllUndelegationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryIncompleteUndelegationRequest(): QueryIncompleteUndelegationRequest {
  return {
    hostChain: "",
    pagination: undefined
  };
}
export const QueryIncompleteUndelegationRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryIncompleteUndelegationRequest",
  encode(message: QueryIncompleteUndelegationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryIncompleteUndelegationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncompleteUndelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryIncompleteUndelegationRequest>): QueryIncompleteUndelegationRequest {
    const message = createBaseQueryIncompleteUndelegationRequest();
    message.hostChain = object.hostChain ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryIncompleteUndelegationRequestAmino): QueryIncompleteUndelegationRequest {
    const message = createBaseQueryIncompleteUndelegationRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryIncompleteUndelegationRequest, useInterfaces: boolean = false): QueryIncompleteUndelegationRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryIncompleteUndelegationRequestAminoMsg): QueryIncompleteUndelegationRequest {
    return QueryIncompleteUndelegationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIncompleteUndelegationRequestProtoMsg, useInterfaces: boolean = false): QueryIncompleteUndelegationRequest {
    return QueryIncompleteUndelegationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryIncompleteUndelegationRequest): Uint8Array {
    return QueryIncompleteUndelegationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryIncompleteUndelegationRequest): QueryIncompleteUndelegationRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryIncompleteUndelegationRequest",
      value: QueryIncompleteUndelegationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryIncompleteUndelegationResponse(): QueryIncompleteUndelegationResponse {
  return {
    undelegation: [],
    pagination: undefined
  };
}
export const QueryIncompleteUndelegationResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryIncompleteUndelegationResponse",
  encode(message: QueryIncompleteUndelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.undelegation) {
      Undelegation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryIncompleteUndelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncompleteUndelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.undelegation.push(Undelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryIncompleteUndelegationResponse>): QueryIncompleteUndelegationResponse {
    const message = createBaseQueryIncompleteUndelegationResponse();
    message.undelegation = object.undelegation?.map(e => Undelegation.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryIncompleteUndelegationResponseAmino): QueryIncompleteUndelegationResponse {
    const message = createBaseQueryIncompleteUndelegationResponse();
    message.undelegation = object.undelegation?.map(e => Undelegation.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryIncompleteUndelegationResponse, useInterfaces: boolean = false): QueryIncompleteUndelegationResponseAmino {
    const obj: any = {};
    if (message.undelegation) {
      obj.undelegation = message.undelegation.map(e => e ? Undelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.undelegation = message.undelegation;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryIncompleteUndelegationResponseAminoMsg): QueryIncompleteUndelegationResponse {
    return QueryIncompleteUndelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIncompleteUndelegationResponseProtoMsg, useInterfaces: boolean = false): QueryIncompleteUndelegationResponse {
    return QueryIncompleteUndelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryIncompleteUndelegationResponse): Uint8Array {
    return QueryIncompleteUndelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryIncompleteUndelegationResponse): QueryIncompleteUndelegationResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryIncompleteUndelegationResponse",
      value: QueryIncompleteUndelegationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetChannelUndelegationRequest(): QueryGetChannelUndelegationRequest {
  return {
    hostChain: "",
    epoch: BigInt(0),
    transferChannel: ""
  };
}
export const QueryGetChannelUndelegationRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetChannelUndelegationRequest",
  encode(message: QueryGetChannelUndelegationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    if (message.epoch !== BigInt(0)) {
      writer.uint32(16).uint64(message.epoch);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetChannelUndelegationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetChannelUndelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        case 2:
          message.epoch = reader.uint64();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetChannelUndelegationRequest>): QueryGetChannelUndelegationRequest {
    const message = createBaseQueryGetChannelUndelegationRequest();
    message.hostChain = object.hostChain ?? "";
    message.epoch = object.epoch !== undefined && object.epoch !== null ? BigInt(object.epoch.toString()) : BigInt(0);
    message.transferChannel = object.transferChannel ?? "";
    return message;
  },
  fromAmino(object: QueryGetChannelUndelegationRequestAmino): QueryGetChannelUndelegationRequest {
    const message = createBaseQueryGetChannelUndelegationRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.epoch !== undefined && object.epoch !== null) {
      message.epoch = BigInt(object.epoch);
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    return message;
  },
  toAmino(message: QueryGetChannelUndelegationRequest, useInterfaces: boolean = false): QueryGetChannelUndelegationRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.epoch = message.epoch !== BigInt(0) ? message.epoch.toString() : undefined;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    return obj;
  },
  fromAminoMsg(object: QueryGetChannelUndelegationRequestAminoMsg): QueryGetChannelUndelegationRequest {
    return QueryGetChannelUndelegationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetChannelUndelegationRequestProtoMsg, useInterfaces: boolean = false): QueryGetChannelUndelegationRequest {
    return QueryGetChannelUndelegationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetChannelUndelegationRequest): Uint8Array {
    return QueryGetChannelUndelegationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetChannelUndelegationRequest): QueryGetChannelUndelegationRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetChannelUndelegationRequest",
      value: QueryGetChannelUndelegationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetChannelUndelegationResponse(): QueryGetChannelUndelegationResponse {
  return {
    channelUndelegation: ChannelUndelegation.fromPartial({})
  };
}
export const QueryGetChannelUndelegationResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetChannelUndelegationResponse",
  encode(message: QueryGetChannelUndelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channelUndelegation !== undefined) {
      ChannelUndelegation.encode(message.channelUndelegation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetChannelUndelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetChannelUndelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelUndelegation = ChannelUndelegation.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetChannelUndelegationResponse>): QueryGetChannelUndelegationResponse {
    const message = createBaseQueryGetChannelUndelegationResponse();
    message.channelUndelegation = object.channelUndelegation !== undefined && object.channelUndelegation !== null ? ChannelUndelegation.fromPartial(object.channelUndelegation) : undefined;
    return message;
  },
  fromAmino(object: QueryGetChannelUndelegationResponseAmino): QueryGetChannelUndelegationResponse {
    const message = createBaseQueryGetChannelUndelegationResponse();
    if (object.channel_undelegation !== undefined && object.channel_undelegation !== null) {
      message.channelUndelegation = ChannelUndelegation.fromAmino(object.channel_undelegation);
    }
    return message;
  },
  toAmino(message: QueryGetChannelUndelegationResponse, useInterfaces: boolean = false): QueryGetChannelUndelegationResponseAmino {
    const obj: any = {};
    obj.channel_undelegation = message.channelUndelegation ? ChannelUndelegation.toAmino(message.channelUndelegation, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetChannelUndelegationResponseAminoMsg): QueryGetChannelUndelegationResponse {
    return QueryGetChannelUndelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetChannelUndelegationResponseProtoMsg, useInterfaces: boolean = false): QueryGetChannelUndelegationResponse {
    return QueryGetChannelUndelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetChannelUndelegationResponse): Uint8Array {
    return QueryGetChannelUndelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetChannelUndelegationResponse): QueryGetChannelUndelegationResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetChannelUndelegationResponse",
      value: QueryGetChannelUndelegationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllChannelUndelegationRequest(): QueryAllChannelUndelegationRequest {
  return {
    hostChain: "",
    epoch: BigInt(0),
    pagination: undefined
  };
}
export const QueryAllChannelUndelegationRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllChannelUndelegationRequest",
  encode(message: QueryAllChannelUndelegationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    if (message.epoch !== BigInt(0)) {
      writer.uint32(16).uint64(message.epoch);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllChannelUndelegationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllChannelUndelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        case 2:
          message.epoch = reader.uint64();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllChannelUndelegationRequest>): QueryAllChannelUndelegationRequest {
    const message = createBaseQueryAllChannelUndelegationRequest();
    message.hostChain = object.hostChain ?? "";
    message.epoch = object.epoch !== undefined && object.epoch !== null ? BigInt(object.epoch.toString()) : BigInt(0);
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllChannelUndelegationRequestAmino): QueryAllChannelUndelegationRequest {
    const message = createBaseQueryAllChannelUndelegationRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.epoch !== undefined && object.epoch !== null) {
      message.epoch = BigInt(object.epoch);
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllChannelUndelegationRequest, useInterfaces: boolean = false): QueryAllChannelUndelegationRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.epoch = message.epoch !== BigInt(0) ? message.epoch.toString() : undefined;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllChannelUndelegationRequestAminoMsg): QueryAllChannelUndelegationRequest {
    return QueryAllChannelUndelegationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllChannelUndelegationRequestProtoMsg, useInterfaces: boolean = false): QueryAllChannelUndelegationRequest {
    return QueryAllChannelUndelegationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllChannelUndelegationRequest): Uint8Array {
    return QueryAllChannelUndelegationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllChannelUndelegationRequest): QueryAllChannelUndelegationRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllChannelUndelegationRequest",
      value: QueryAllChannelUndelegationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllChannelUndelegationResponse(): QueryAllChannelUndelegationResponse {
  return {
    channelUndelegation: [],
    pagination: undefined
  };
}
export const QueryAllChannelUndelegationResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllChannelUndelegationResponse",
  encode(message: QueryAllChannelUndelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.channelUndelegation) {
      ChannelUndelegation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllChannelUndelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllChannelUndelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelUndelegation.push(ChannelUndelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllChannelUndelegationResponse>): QueryAllChannelUndelegationResponse {
    const message = createBaseQueryAllChannelUndelegationResponse();
    message.channelUndelegation = object.channelUndelegation?.map(e => ChannelUndelegation.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllChannelUndelegationResponseAmino): QueryAllChannelUndelegationResponse {
    const message = createBaseQueryAllChannelUndelegationResponse();
    message.channelUndelegation = object.channel_undelegation?.map(e => ChannelUndelegation.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllChannelUndelegationResponse, useInterfaces: boolean = false): QueryAllChannelUndelegationResponseAmino {
    const obj: any = {};
    if (message.channelUndelegation) {
      obj.channel_undelegation = message.channelUndelegation.map(e => e ? ChannelUndelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.channel_undelegation = message.channelUndelegation;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllChannelUndelegationResponseAminoMsg): QueryAllChannelUndelegationResponse {
    return QueryAllChannelUndelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllChannelUndelegationResponseProtoMsg, useInterfaces: boolean = false): QueryAllChannelUndelegationResponse {
    return QueryAllChannelUndelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllChannelUndelegationResponse): Uint8Array {
    return QueryAllChannelUndelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllChannelUndelegationResponse): QueryAllChannelUndelegationResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllChannelUndelegationResponse",
      value: QueryAllChannelUndelegationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDelegationQueueBalanceRequest(): QueryDelegationQueueBalanceRequest {
  return {
    hostChain: "",
    transferChannel: ""
  };
}
export const QueryDelegationQueueBalanceRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryDelegationQueueBalanceRequest",
  encode(message: QueryDelegationQueueBalanceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(18).string(message.transferChannel);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDelegationQueueBalanceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegationQueueBalanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        case 2:
          message.transferChannel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDelegationQueueBalanceRequest>): QueryDelegationQueueBalanceRequest {
    const message = createBaseQueryDelegationQueueBalanceRequest();
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    return message;
  },
  fromAmino(object: QueryDelegationQueueBalanceRequestAmino): QueryDelegationQueueBalanceRequest {
    const message = createBaseQueryDelegationQueueBalanceRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    return message;
  },
  toAmino(message: QueryDelegationQueueBalanceRequest, useInterfaces: boolean = false): QueryDelegationQueueBalanceRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    return obj;
  },
  fromAminoMsg(object: QueryDelegationQueueBalanceRequestAminoMsg): QueryDelegationQueueBalanceRequest {
    return QueryDelegationQueueBalanceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDelegationQueueBalanceRequestProtoMsg, useInterfaces: boolean = false): QueryDelegationQueueBalanceRequest {
    return QueryDelegationQueueBalanceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDelegationQueueBalanceRequest): Uint8Array {
    return QueryDelegationQueueBalanceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDelegationQueueBalanceRequest): QueryDelegationQueueBalanceRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryDelegationQueueBalanceRequest",
      value: QueryDelegationQueueBalanceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDelegationQueueBalanceResponse(): QueryDelegationQueueBalanceResponse {
  return {
    balance: Coin.fromPartial({})
  };
}
export const QueryDelegationQueueBalanceResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryDelegationQueueBalanceResponse",
  encode(message: QueryDelegationQueueBalanceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDelegationQueueBalanceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegationQueueBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDelegationQueueBalanceResponse>): QueryDelegationQueueBalanceResponse {
    const message = createBaseQueryDelegationQueueBalanceResponse();
    message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
    return message;
  },
  fromAmino(object: QueryDelegationQueueBalanceResponseAmino): QueryDelegationQueueBalanceResponse {
    const message = createBaseQueryDelegationQueueBalanceResponse();
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = Coin.fromAmino(object.balance);
    }
    return message;
  },
  toAmino(message: QueryDelegationQueueBalanceResponse, useInterfaces: boolean = false): QueryDelegationQueueBalanceResponseAmino {
    const obj: any = {};
    obj.balance = message.balance ? Coin.toAmino(message.balance, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDelegationQueueBalanceResponseAminoMsg): QueryDelegationQueueBalanceResponse {
    return QueryDelegationQueueBalanceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDelegationQueueBalanceResponseProtoMsg, useInterfaces: boolean = false): QueryDelegationQueueBalanceResponse {
    return QueryDelegationQueueBalanceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDelegationQueueBalanceResponse): Uint8Array {
    return QueryDelegationQueueBalanceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDelegationQueueBalanceResponse): QueryDelegationQueueBalanceResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryDelegationQueueBalanceResponse",
      value: QueryDelegationQueueBalanceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryEpochInfoRequest(): QueryEpochInfoRequest {
  return {
    hostChain: ""
  };
}
export const QueryEpochInfoRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryEpochInfoRequest",
  encode(message: QueryEpochInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEpochInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEpochInfoRequest>): QueryEpochInfoRequest {
    const message = createBaseQueryEpochInfoRequest();
    message.hostChain = object.hostChain ?? "";
    return message;
  },
  fromAmino(object: QueryEpochInfoRequestAmino): QueryEpochInfoRequest {
    const message = createBaseQueryEpochInfoRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    return message;
  },
  toAmino(message: QueryEpochInfoRequest, useInterfaces: boolean = false): QueryEpochInfoRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    return obj;
  },
  fromAminoMsg(object: QueryEpochInfoRequestAminoMsg): QueryEpochInfoRequest {
    return QueryEpochInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEpochInfoRequestProtoMsg, useInterfaces: boolean = false): QueryEpochInfoRequest {
    return QueryEpochInfoRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEpochInfoRequest): Uint8Array {
    return QueryEpochInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEpochInfoRequest): QueryEpochInfoRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryEpochInfoRequest",
      value: QueryEpochInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryEpochInfoResponse(): QueryEpochInfoResponse {
  return {
    lastDelegationTime: new Date(),
    lastRedelegationTime: new Date(),
    lastLsmRedeemTime: new Date(),
    lastUndelegationTime: new Date(),
    currentUndelegationEpoch: BigInt(0)
  };
}
export const QueryEpochInfoResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryEpochInfoResponse",
  encode(message: QueryEpochInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lastDelegationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastDelegationTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.lastRedelegationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastRedelegationTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.lastLsmRedeemTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastLsmRedeemTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.lastUndelegationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUndelegationTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.currentUndelegationEpoch !== BigInt(0)) {
      writer.uint32(40).uint64(message.currentUndelegationEpoch);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEpochInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastDelegationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.lastRedelegationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.lastLsmRedeemTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.lastUndelegationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.currentUndelegationEpoch = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEpochInfoResponse>): QueryEpochInfoResponse {
    const message = createBaseQueryEpochInfoResponse();
    message.lastDelegationTime = object.lastDelegationTime ?? undefined;
    message.lastRedelegationTime = object.lastRedelegationTime ?? undefined;
    message.lastLsmRedeemTime = object.lastLsmRedeemTime ?? undefined;
    message.lastUndelegationTime = object.lastUndelegationTime ?? undefined;
    message.currentUndelegationEpoch = object.currentUndelegationEpoch !== undefined && object.currentUndelegationEpoch !== null ? BigInt(object.currentUndelegationEpoch.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryEpochInfoResponseAmino): QueryEpochInfoResponse {
    const message = createBaseQueryEpochInfoResponse();
    if (object.last_delegation_time !== undefined && object.last_delegation_time !== null) {
      message.lastDelegationTime = fromTimestamp(Timestamp.fromAmino(object.last_delegation_time));
    }
    if (object.last_redelegation_time !== undefined && object.last_redelegation_time !== null) {
      message.lastRedelegationTime = fromTimestamp(Timestamp.fromAmino(object.last_redelegation_time));
    }
    if (object.last_lsm_redeem_time !== undefined && object.last_lsm_redeem_time !== null) {
      message.lastLsmRedeemTime = fromTimestamp(Timestamp.fromAmino(object.last_lsm_redeem_time));
    }
    if (object.last_undelegation_time !== undefined && object.last_undelegation_time !== null) {
      message.lastUndelegationTime = fromTimestamp(Timestamp.fromAmino(object.last_undelegation_time));
    }
    if (object.current_undelegation_epoch !== undefined && object.current_undelegation_epoch !== null) {
      message.currentUndelegationEpoch = BigInt(object.current_undelegation_epoch);
    }
    return message;
  },
  toAmino(message: QueryEpochInfoResponse, useInterfaces: boolean = false): QueryEpochInfoResponseAmino {
    const obj: any = {};
    obj.last_delegation_time = message.lastDelegationTime ? Timestamp.toAmino(toTimestamp(message.lastDelegationTime)) : undefined;
    obj.last_redelegation_time = message.lastRedelegationTime ? Timestamp.toAmino(toTimestamp(message.lastRedelegationTime)) : undefined;
    obj.last_lsm_redeem_time = message.lastLsmRedeemTime ? Timestamp.toAmino(toTimestamp(message.lastLsmRedeemTime)) : undefined;
    obj.last_undelegation_time = message.lastUndelegationTime ? Timestamp.toAmino(toTimestamp(message.lastUndelegationTime)) : undefined;
    obj.current_undelegation_epoch = message.currentUndelegationEpoch !== BigInt(0) ? message.currentUndelegationEpoch.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEpochInfoResponseAminoMsg): QueryEpochInfoResponse {
    return QueryEpochInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEpochInfoResponseProtoMsg, useInterfaces: boolean = false): QueryEpochInfoResponse {
    return QueryEpochInfoResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEpochInfoResponse): Uint8Array {
    return QueryEpochInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEpochInfoResponse): QueryEpochInfoResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryEpochInfoResponse",
      value: QueryEpochInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllReplyDataRequest(): QueryAllReplyDataRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllReplyDataRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllReplyDataRequest",
  encode(message: QueryAllReplyDataRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllReplyDataRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllReplyDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllReplyDataRequest>): QueryAllReplyDataRequest {
    const message = createBaseQueryAllReplyDataRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllReplyDataRequestAmino): QueryAllReplyDataRequest {
    const message = createBaseQueryAllReplyDataRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllReplyDataRequest, useInterfaces: boolean = false): QueryAllReplyDataRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllReplyDataRequestAminoMsg): QueryAllReplyDataRequest {
    return QueryAllReplyDataRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllReplyDataRequestProtoMsg, useInterfaces: boolean = false): QueryAllReplyDataRequest {
    return QueryAllReplyDataRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllReplyDataRequest): Uint8Array {
    return QueryAllReplyDataRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllReplyDataRequest): QueryAllReplyDataRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllReplyDataRequest",
      value: QueryAllReplyDataRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllReplyDataResponse(): QueryAllReplyDataResponse {
  return {
    replyData: [],
    pagination: undefined
  };
}
export const QueryAllReplyDataResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllReplyDataResponse",
  encode(message: QueryAllReplyDataResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.replyData) {
      ReplyData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllReplyDataResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllReplyDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.replyData.push(ReplyData.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllReplyDataResponse>): QueryAllReplyDataResponse {
    const message = createBaseQueryAllReplyDataResponse();
    message.replyData = object.replyData?.map(e => ReplyData.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllReplyDataResponseAmino): QueryAllReplyDataResponse {
    const message = createBaseQueryAllReplyDataResponse();
    message.replyData = object.reply_data?.map(e => ReplyData.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllReplyDataResponse, useInterfaces: boolean = false): QueryAllReplyDataResponseAmino {
    const obj: any = {};
    if (message.replyData) {
      obj.reply_data = message.replyData.map(e => e ? ReplyData.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.reply_data = message.replyData;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllReplyDataResponseAminoMsg): QueryAllReplyDataResponse {
    return QueryAllReplyDataResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllReplyDataResponseProtoMsg, useInterfaces: boolean = false): QueryAllReplyDataResponse {
    return QueryAllReplyDataResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllReplyDataResponse): Uint8Array {
    return QueryAllReplyDataResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllReplyDataResponse): QueryAllReplyDataResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllReplyDataResponse",
      value: QueryAllReplyDataResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetMultiSigConnectionRequest(): QueryGetMultiSigConnectionRequest {
  return {
    id: ""
  };
}
export const QueryGetMultiSigConnectionRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigConnectionRequest",
  encode(message: QueryGetMultiSigConnectionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetMultiSigConnectionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMultiSigConnectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetMultiSigConnectionRequest>): QueryGetMultiSigConnectionRequest {
    const message = createBaseQueryGetMultiSigConnectionRequest();
    message.id = object.id ?? "";
    return message;
  },
  fromAmino(object: QueryGetMultiSigConnectionRequestAmino): QueryGetMultiSigConnectionRequest {
    const message = createBaseQueryGetMultiSigConnectionRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    return message;
  },
  toAmino(message: QueryGetMultiSigConnectionRequest, useInterfaces: boolean = false): QueryGetMultiSigConnectionRequestAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    return obj;
  },
  fromAminoMsg(object: QueryGetMultiSigConnectionRequestAminoMsg): QueryGetMultiSigConnectionRequest {
    return QueryGetMultiSigConnectionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetMultiSigConnectionRequestProtoMsg, useInterfaces: boolean = false): QueryGetMultiSigConnectionRequest {
    return QueryGetMultiSigConnectionRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetMultiSigConnectionRequest): Uint8Array {
    return QueryGetMultiSigConnectionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetMultiSigConnectionRequest): QueryGetMultiSigConnectionRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigConnectionRequest",
      value: QueryGetMultiSigConnectionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetMultiSigConnectionResponse(): QueryGetMultiSigConnectionResponse {
  return {
    multiSigConnection: MultiSigConnection.fromPartial({})
  };
}
export const QueryGetMultiSigConnectionResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigConnectionResponse",
  encode(message: QueryGetMultiSigConnectionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.multiSigConnection !== undefined) {
      MultiSigConnection.encode(message.multiSigConnection, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetMultiSigConnectionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMultiSigConnectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.multiSigConnection = MultiSigConnection.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetMultiSigConnectionResponse>): QueryGetMultiSigConnectionResponse {
    const message = createBaseQueryGetMultiSigConnectionResponse();
    message.multiSigConnection = object.multiSigConnection !== undefined && object.multiSigConnection !== null ? MultiSigConnection.fromPartial(object.multiSigConnection) : undefined;
    return message;
  },
  fromAmino(object: QueryGetMultiSigConnectionResponseAmino): QueryGetMultiSigConnectionResponse {
    const message = createBaseQueryGetMultiSigConnectionResponse();
    if (object.multi_sig_connection !== undefined && object.multi_sig_connection !== null) {
      message.multiSigConnection = MultiSigConnection.fromAmino(object.multi_sig_connection);
    }
    return message;
  },
  toAmino(message: QueryGetMultiSigConnectionResponse, useInterfaces: boolean = false): QueryGetMultiSigConnectionResponseAmino {
    const obj: any = {};
    obj.multi_sig_connection = message.multiSigConnection ? MultiSigConnection.toAmino(message.multiSigConnection, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetMultiSigConnectionResponseAminoMsg): QueryGetMultiSigConnectionResponse {
    return QueryGetMultiSigConnectionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetMultiSigConnectionResponseProtoMsg, useInterfaces: boolean = false): QueryGetMultiSigConnectionResponse {
    return QueryGetMultiSigConnectionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetMultiSigConnectionResponse): Uint8Array {
    return QueryGetMultiSigConnectionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetMultiSigConnectionResponse): QueryGetMultiSigConnectionResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigConnectionResponse",
      value: QueryGetMultiSigConnectionResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllMultiSigConnectionRequest(): QueryAllMultiSigConnectionRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllMultiSigConnectionRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigConnectionRequest",
  encode(message: QueryAllMultiSigConnectionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllMultiSigConnectionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllMultiSigConnectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllMultiSigConnectionRequest>): QueryAllMultiSigConnectionRequest {
    const message = createBaseQueryAllMultiSigConnectionRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllMultiSigConnectionRequestAmino): QueryAllMultiSigConnectionRequest {
    const message = createBaseQueryAllMultiSigConnectionRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllMultiSigConnectionRequest, useInterfaces: boolean = false): QueryAllMultiSigConnectionRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllMultiSigConnectionRequestAminoMsg): QueryAllMultiSigConnectionRequest {
    return QueryAllMultiSigConnectionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllMultiSigConnectionRequestProtoMsg, useInterfaces: boolean = false): QueryAllMultiSigConnectionRequest {
    return QueryAllMultiSigConnectionRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllMultiSigConnectionRequest): Uint8Array {
    return QueryAllMultiSigConnectionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllMultiSigConnectionRequest): QueryAllMultiSigConnectionRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigConnectionRequest",
      value: QueryAllMultiSigConnectionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllMultiSigConnectionResponse(): QueryAllMultiSigConnectionResponse {
  return {
    multiSigConnection: [],
    pagination: undefined
  };
}
export const QueryAllMultiSigConnectionResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigConnectionResponse",
  encode(message: QueryAllMultiSigConnectionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.multiSigConnection) {
      MultiSigConnection.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllMultiSigConnectionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllMultiSigConnectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.multiSigConnection.push(MultiSigConnection.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllMultiSigConnectionResponse>): QueryAllMultiSigConnectionResponse {
    const message = createBaseQueryAllMultiSigConnectionResponse();
    message.multiSigConnection = object.multiSigConnection?.map(e => MultiSigConnection.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllMultiSigConnectionResponseAmino): QueryAllMultiSigConnectionResponse {
    const message = createBaseQueryAllMultiSigConnectionResponse();
    message.multiSigConnection = object.multi_sig_connection?.map(e => MultiSigConnection.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllMultiSigConnectionResponse, useInterfaces: boolean = false): QueryAllMultiSigConnectionResponseAmino {
    const obj: any = {};
    if (message.multiSigConnection) {
      obj.multi_sig_connection = message.multiSigConnection.map(e => e ? MultiSigConnection.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.multi_sig_connection = message.multiSigConnection;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllMultiSigConnectionResponseAminoMsg): QueryAllMultiSigConnectionResponse {
    return QueryAllMultiSigConnectionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllMultiSigConnectionResponseProtoMsg, useInterfaces: boolean = false): QueryAllMultiSigConnectionResponse {
    return QueryAllMultiSigConnectionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllMultiSigConnectionResponse): Uint8Array {
    return QueryAllMultiSigConnectionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllMultiSigConnectionResponse): QueryAllMultiSigConnectionResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigConnectionResponse",
      value: QueryAllMultiSigConnectionResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetMultiSigPacketRequest(): QueryGetMultiSigPacketRequest {
  return {
    connectionId: "",
    sequence: BigInt(0)
  };
}
export const QueryGetMultiSigPacketRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigPacketRequest",
  encode(message: QueryGetMultiSigPacketRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(16).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetMultiSigPacketRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMultiSigPacketRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionId = reader.string();
          break;
        case 2:
          message.sequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetMultiSigPacketRequest>): QueryGetMultiSigPacketRequest {
    const message = createBaseQueryGetMultiSigPacketRequest();
    message.connectionId = object.connectionId ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetMultiSigPacketRequestAmino): QueryGetMultiSigPacketRequest {
    const message = createBaseQueryGetMultiSigPacketRequest();
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    return message;
  },
  toAmino(message: QueryGetMultiSigPacketRequest, useInterfaces: boolean = false): QueryGetMultiSigPacketRequestAmino {
    const obj: any = {};
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetMultiSigPacketRequestAminoMsg): QueryGetMultiSigPacketRequest {
    return QueryGetMultiSigPacketRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetMultiSigPacketRequestProtoMsg, useInterfaces: boolean = false): QueryGetMultiSigPacketRequest {
    return QueryGetMultiSigPacketRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetMultiSigPacketRequest): Uint8Array {
    return QueryGetMultiSigPacketRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetMultiSigPacketRequest): QueryGetMultiSigPacketRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigPacketRequest",
      value: QueryGetMultiSigPacketRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetMultiSigPacketResponse(): QueryGetMultiSigPacketResponse {
  return {
    multiSigPacket: MultiSigPacket.fromPartial({})
  };
}
export const QueryGetMultiSigPacketResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigPacketResponse",
  encode(message: QueryGetMultiSigPacketResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.multiSigPacket !== undefined) {
      MultiSigPacket.encode(message.multiSigPacket, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetMultiSigPacketResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMultiSigPacketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.multiSigPacket = MultiSigPacket.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetMultiSigPacketResponse>): QueryGetMultiSigPacketResponse {
    const message = createBaseQueryGetMultiSigPacketResponse();
    message.multiSigPacket = object.multiSigPacket !== undefined && object.multiSigPacket !== null ? MultiSigPacket.fromPartial(object.multiSigPacket) : undefined;
    return message;
  },
  fromAmino(object: QueryGetMultiSigPacketResponseAmino): QueryGetMultiSigPacketResponse {
    const message = createBaseQueryGetMultiSigPacketResponse();
    if (object.multi_sig_packet !== undefined && object.multi_sig_packet !== null) {
      message.multiSigPacket = MultiSigPacket.fromAmino(object.multi_sig_packet);
    }
    return message;
  },
  toAmino(message: QueryGetMultiSigPacketResponse, useInterfaces: boolean = false): QueryGetMultiSigPacketResponseAmino {
    const obj: any = {};
    obj.multi_sig_packet = message.multiSigPacket ? MultiSigPacket.toAmino(message.multiSigPacket, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetMultiSigPacketResponseAminoMsg): QueryGetMultiSigPacketResponse {
    return QueryGetMultiSigPacketResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetMultiSigPacketResponseProtoMsg, useInterfaces: boolean = false): QueryGetMultiSigPacketResponse {
    return QueryGetMultiSigPacketResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetMultiSigPacketResponse): Uint8Array {
    return QueryGetMultiSigPacketResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetMultiSigPacketResponse): QueryGetMultiSigPacketResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryGetMultiSigPacketResponse",
      value: QueryGetMultiSigPacketResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllMultiSigPacketRequest(): QueryAllMultiSigPacketRequest {
  return {
    connectionId: undefined,
    pagination: undefined
  };
}
export const QueryAllMultiSigPacketRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigPacketRequest",
  encode(message: QueryAllMultiSigPacketRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.connectionId !== undefined) {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllMultiSigPacketRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllMultiSigPacketRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllMultiSigPacketRequest>): QueryAllMultiSigPacketRequest {
    const message = createBaseQueryAllMultiSigPacketRequest();
    message.connectionId = object.connectionId ?? undefined;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllMultiSigPacketRequestAmino): QueryAllMultiSigPacketRequest {
    const message = createBaseQueryAllMultiSigPacketRequest();
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllMultiSigPacketRequest, useInterfaces: boolean = false): QueryAllMultiSigPacketRequestAmino {
    const obj: any = {};
    obj.connection_id = message.connectionId === null ? undefined : message.connectionId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllMultiSigPacketRequestAminoMsg): QueryAllMultiSigPacketRequest {
    return QueryAllMultiSigPacketRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllMultiSigPacketRequestProtoMsg, useInterfaces: boolean = false): QueryAllMultiSigPacketRequest {
    return QueryAllMultiSigPacketRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllMultiSigPacketRequest): Uint8Array {
    return QueryAllMultiSigPacketRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllMultiSigPacketRequest): QueryAllMultiSigPacketRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigPacketRequest",
      value: QueryAllMultiSigPacketRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllMultiSigPacketResponse(): QueryAllMultiSigPacketResponse {
  return {
    multiSigPacket: [],
    pagination: undefined
  };
}
export const QueryAllMultiSigPacketResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigPacketResponse",
  encode(message: QueryAllMultiSigPacketResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.multiSigPacket) {
      MultiSigPacket.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllMultiSigPacketResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllMultiSigPacketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.multiSigPacket.push(MultiSigPacket.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllMultiSigPacketResponse>): QueryAllMultiSigPacketResponse {
    const message = createBaseQueryAllMultiSigPacketResponse();
    message.multiSigPacket = object.multiSigPacket?.map(e => MultiSigPacket.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllMultiSigPacketResponseAmino): QueryAllMultiSigPacketResponse {
    const message = createBaseQueryAllMultiSigPacketResponse();
    message.multiSigPacket = object.multi_sig_packet?.map(e => MultiSigPacket.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllMultiSigPacketResponse, useInterfaces: boolean = false): QueryAllMultiSigPacketResponseAmino {
    const obj: any = {};
    if (message.multiSigPacket) {
      obj.multi_sig_packet = message.multiSigPacket.map(e => e ? MultiSigPacket.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.multi_sig_packet = message.multiSigPacket;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllMultiSigPacketResponseAminoMsg): QueryAllMultiSigPacketResponse {
    return QueryAllMultiSigPacketResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllMultiSigPacketResponseProtoMsg, useInterfaces: boolean = false): QueryAllMultiSigPacketResponse {
    return QueryAllMultiSigPacketResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllMultiSigPacketResponse): Uint8Array {
    return QueryAllMultiSigPacketResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllMultiSigPacketResponse): QueryAllMultiSigPacketResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllMultiSigPacketResponse",
      value: QueryAllMultiSigPacketResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllFailedLsmTransferRequest(): QueryAllFailedLsmTransferRequest {
  return {
    hostChain: "",
    pagination: undefined
  };
}
export const QueryAllFailedLsmTransferRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllFailedLsmTransferRequest",
  encode(message: QueryAllFailedLsmTransferRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllFailedLsmTransferRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllFailedLsmTransferRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllFailedLsmTransferRequest>): QueryAllFailedLsmTransferRequest {
    const message = createBaseQueryAllFailedLsmTransferRequest();
    message.hostChain = object.hostChain ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllFailedLsmTransferRequestAmino): QueryAllFailedLsmTransferRequest {
    const message = createBaseQueryAllFailedLsmTransferRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllFailedLsmTransferRequest, useInterfaces: boolean = false): QueryAllFailedLsmTransferRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllFailedLsmTransferRequestAminoMsg): QueryAllFailedLsmTransferRequest {
    return QueryAllFailedLsmTransferRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllFailedLsmTransferRequestProtoMsg, useInterfaces: boolean = false): QueryAllFailedLsmTransferRequest {
    return QueryAllFailedLsmTransferRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllFailedLsmTransferRequest): Uint8Array {
    return QueryAllFailedLsmTransferRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllFailedLsmTransferRequest): QueryAllFailedLsmTransferRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllFailedLsmTransferRequest",
      value: QueryAllFailedLsmTransferRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllFailedLsmTransferResponse(): QueryAllFailedLsmTransferResponse {
  return {
    failedLsmTransfer: [],
    pagination: undefined
  };
}
export const QueryAllFailedLsmTransferResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllFailedLsmTransferResponse",
  encode(message: QueryAllFailedLsmTransferResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.failedLsmTransfer) {
      FailedLsmTransfer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllFailedLsmTransferResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllFailedLsmTransferResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.failedLsmTransfer.push(FailedLsmTransfer.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllFailedLsmTransferResponse>): QueryAllFailedLsmTransferResponse {
    const message = createBaseQueryAllFailedLsmTransferResponse();
    message.failedLsmTransfer = object.failedLsmTransfer?.map(e => FailedLsmTransfer.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllFailedLsmTransferResponseAmino): QueryAllFailedLsmTransferResponse {
    const message = createBaseQueryAllFailedLsmTransferResponse();
    message.failedLsmTransfer = object.failed_lsm_transfer?.map(e => FailedLsmTransfer.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllFailedLsmTransferResponse, useInterfaces: boolean = false): QueryAllFailedLsmTransferResponseAmino {
    const obj: any = {};
    if (message.failedLsmTransfer) {
      obj.failed_lsm_transfer = message.failedLsmTransfer.map(e => e ? FailedLsmTransfer.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.failed_lsm_transfer = message.failedLsmTransfer;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllFailedLsmTransferResponseAminoMsg): QueryAllFailedLsmTransferResponse {
    return QueryAllFailedLsmTransferResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllFailedLsmTransferResponseProtoMsg, useInterfaces: boolean = false): QueryAllFailedLsmTransferResponse {
    return QueryAllFailedLsmTransferResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllFailedLsmTransferResponse): Uint8Array {
    return QueryAllFailedLsmTransferResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllFailedLsmTransferResponse): QueryAllFailedLsmTransferResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllFailedLsmTransferResponse",
      value: QueryAllFailedLsmTransferResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllRedeemableLsmRequest(): QueryAllRedeemableLsmRequest {
  return {
    hostChain: "",
    pagination: undefined
  };
}
export const QueryAllRedeemableLsmRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllRedeemableLsmRequest",
  encode(message: QueryAllRedeemableLsmRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllRedeemableLsmRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRedeemableLsmRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllRedeemableLsmRequest>): QueryAllRedeemableLsmRequest {
    const message = createBaseQueryAllRedeemableLsmRequest();
    message.hostChain = object.hostChain ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllRedeemableLsmRequestAmino): QueryAllRedeemableLsmRequest {
    const message = createBaseQueryAllRedeemableLsmRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllRedeemableLsmRequest, useInterfaces: boolean = false): QueryAllRedeemableLsmRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllRedeemableLsmRequestAminoMsg): QueryAllRedeemableLsmRequest {
    return QueryAllRedeemableLsmRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllRedeemableLsmRequestProtoMsg, useInterfaces: boolean = false): QueryAllRedeemableLsmRequest {
    return QueryAllRedeemableLsmRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllRedeemableLsmRequest): Uint8Array {
    return QueryAllRedeemableLsmRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllRedeemableLsmRequest): QueryAllRedeemableLsmRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllRedeemableLsmRequest",
      value: QueryAllRedeemableLsmRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllRedeemableLsmResponse(): QueryAllRedeemableLsmResponse {
  return {
    redeemableLsm: [],
    pagination: undefined
  };
}
export const QueryAllRedeemableLsmResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllRedeemableLsmResponse",
  encode(message: QueryAllRedeemableLsmResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.redeemableLsm) {
      RedeemableLsm.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllRedeemableLsmResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRedeemableLsmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redeemableLsm.push(RedeemableLsm.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllRedeemableLsmResponse>): QueryAllRedeemableLsmResponse {
    const message = createBaseQueryAllRedeemableLsmResponse();
    message.redeemableLsm = object.redeemableLsm?.map(e => RedeemableLsm.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllRedeemableLsmResponseAmino): QueryAllRedeemableLsmResponse {
    const message = createBaseQueryAllRedeemableLsmResponse();
    message.redeemableLsm = object.redeemable_lsm?.map(e => RedeemableLsm.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllRedeemableLsmResponse, useInterfaces: boolean = false): QueryAllRedeemableLsmResponseAmino {
    const obj: any = {};
    if (message.redeemableLsm) {
      obj.redeemable_lsm = message.redeemableLsm.map(e => e ? RedeemableLsm.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.redeemable_lsm = message.redeemableLsm;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllRedeemableLsmResponseAminoMsg): QueryAllRedeemableLsmResponse {
    return QueryAllRedeemableLsmResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllRedeemableLsmResponseProtoMsg, useInterfaces: boolean = false): QueryAllRedeemableLsmResponse {
    return QueryAllRedeemableLsmResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllRedeemableLsmResponse): Uint8Array {
    return QueryAllRedeemableLsmResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllRedeemableLsmResponse): QueryAllRedeemableLsmResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllRedeemableLsmResponse",
      value: QueryAllRedeemableLsmResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllSweepTransferRequest(): QueryAllSweepTransferRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllSweepTransferRequest = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllSweepTransferRequest",
  encode(message: QueryAllSweepTransferRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllSweepTransferRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSweepTransferRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllSweepTransferRequest>): QueryAllSweepTransferRequest {
    const message = createBaseQueryAllSweepTransferRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllSweepTransferRequestAmino): QueryAllSweepTransferRequest {
    const message = createBaseQueryAllSweepTransferRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllSweepTransferRequest, useInterfaces: boolean = false): QueryAllSweepTransferRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllSweepTransferRequestAminoMsg): QueryAllSweepTransferRequest {
    return QueryAllSweepTransferRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllSweepTransferRequestProtoMsg, useInterfaces: boolean = false): QueryAllSweepTransferRequest {
    return QueryAllSweepTransferRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllSweepTransferRequest): Uint8Array {
    return QueryAllSweepTransferRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllSweepTransferRequest): QueryAllSweepTransferRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllSweepTransferRequest",
      value: QueryAllSweepTransferRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllSweepTransferResponse(): QueryAllSweepTransferResponse {
  return {
    sweepTransfer: [],
    pagination: undefined
  };
}
export const QueryAllSweepTransferResponse = {
  typeUrl: "/pryzm.icstaking.v1.QueryAllSweepTransferResponse",
  encode(message: QueryAllSweepTransferResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.sweepTransfer) {
      SweepTransfer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllSweepTransferResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSweepTransferResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sweepTransfer.push(SweepTransfer.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllSweepTransferResponse>): QueryAllSweepTransferResponse {
    const message = createBaseQueryAllSweepTransferResponse();
    message.sweepTransfer = object.sweepTransfer?.map(e => SweepTransfer.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllSweepTransferResponseAmino): QueryAllSweepTransferResponse {
    const message = createBaseQueryAllSweepTransferResponse();
    message.sweepTransfer = object.sweep_transfer?.map(e => SweepTransfer.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllSweepTransferResponse, useInterfaces: boolean = false): QueryAllSweepTransferResponseAmino {
    const obj: any = {};
    if (message.sweepTransfer) {
      obj.sweep_transfer = message.sweepTransfer.map(e => e ? SweepTransfer.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.sweep_transfer = message.sweepTransfer;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllSweepTransferResponseAminoMsg): QueryAllSweepTransferResponse {
    return QueryAllSweepTransferResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllSweepTransferResponseProtoMsg, useInterfaces: boolean = false): QueryAllSweepTransferResponse {
    return QueryAllSweepTransferResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllSweepTransferResponse): Uint8Array {
    return QueryAllSweepTransferResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllSweepTransferResponse): QueryAllSweepTransferResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QueryAllSweepTransferResponse",
      value: QueryAllSweepTransferResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateStakeRequest(): QuerySimulateStakeRequest {
  return {
    hostChain: "",
    transferChannel: "",
    amountIn: "",
    amountOut: ""
  };
}
export const QuerySimulateStakeRequest = {
  typeUrl: "/pryzm.icstaking.v1.QuerySimulateStakeRequest",
  encode(message: QuerySimulateStakeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== "") {
      writer.uint32(10).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(18).string(message.transferChannel);
    }
    if (message.amountIn !== "") {
      writer.uint32(26).string(message.amountIn);
    }
    if (message.amountOut !== "") {
      writer.uint32(34).string(message.amountOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateStakeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateStakeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = reader.string();
          break;
        case 2:
          message.transferChannel = reader.string();
          break;
        case 3:
          message.amountIn = reader.string();
          break;
        case 4:
          message.amountOut = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateStakeRequest>): QuerySimulateStakeRequest {
    const message = createBaseQuerySimulateStakeRequest();
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.amountIn = object.amountIn ?? "";
    message.amountOut = object.amountOut ?? "";
    return message;
  },
  fromAmino(object: QuerySimulateStakeRequestAmino): QuerySimulateStakeRequest {
    const message = createBaseQuerySimulateStakeRequest();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.amount_in !== undefined && object.amount_in !== null) {
      message.amountIn = object.amount_in;
    }
    if (object.amount_out !== undefined && object.amount_out !== null) {
      message.amountOut = object.amount_out;
    }
    return message;
  },
  toAmino(message: QuerySimulateStakeRequest, useInterfaces: boolean = false): QuerySimulateStakeRequestAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.amount_in = message.amountIn === "" ? undefined : message.amountIn;
    obj.amount_out = message.amountOut === "" ? undefined : message.amountOut;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateStakeRequestAminoMsg): QuerySimulateStakeRequest {
    return QuerySimulateStakeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateStakeRequestProtoMsg, useInterfaces: boolean = false): QuerySimulateStakeRequest {
    return QuerySimulateStakeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateStakeRequest): Uint8Array {
    return QuerySimulateStakeRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateStakeRequest): QuerySimulateStakeRequestProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QuerySimulateStakeRequest",
      value: QuerySimulateStakeRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySimulateStakeResponse(): QuerySimulateStakeResponse {
  return {
    amountIn: undefined,
    amountOut: undefined,
    feeAmount: Coin.fromPartial({})
  };
}
export const QuerySimulateStakeResponse = {
  typeUrl: "/pryzm.icstaking.v1.QuerySimulateStakeResponse",
  encode(message: QuerySimulateStakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amountIn !== undefined) {
      Coin.encode(message.amountIn, writer.uint32(10).fork()).ldelim();
    }
    if (message.amountOut !== undefined) {
      Coin.encode(message.amountOut, writer.uint32(18).fork()).ldelim();
    }
    if (message.feeAmount !== undefined) {
      Coin.encode(message.feeAmount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySimulateStakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySimulateStakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amountIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.feeAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySimulateStakeResponse>): QuerySimulateStakeResponse {
    const message = createBaseQuerySimulateStakeResponse();
    message.amountIn = object.amountIn !== undefined && object.amountIn !== null ? Coin.fromPartial(object.amountIn) : undefined;
    message.amountOut = object.amountOut !== undefined && object.amountOut !== null ? Coin.fromPartial(object.amountOut) : undefined;
    message.feeAmount = object.feeAmount !== undefined && object.feeAmount !== null ? Coin.fromPartial(object.feeAmount) : undefined;
    return message;
  },
  fromAmino(object: QuerySimulateStakeResponseAmino): QuerySimulateStakeResponse {
    const message = createBaseQuerySimulateStakeResponse();
    if (object.amount_in !== undefined && object.amount_in !== null) {
      message.amountIn = Coin.fromAmino(object.amount_in);
    }
    if (object.amount_out !== undefined && object.amount_out !== null) {
      message.amountOut = Coin.fromAmino(object.amount_out);
    }
    if (object.fee_amount !== undefined && object.fee_amount !== null) {
      message.feeAmount = Coin.fromAmino(object.fee_amount);
    }
    return message;
  },
  toAmino(message: QuerySimulateStakeResponse, useInterfaces: boolean = false): QuerySimulateStakeResponseAmino {
    const obj: any = {};
    obj.amount_in = message.amountIn ? Coin.toAmino(message.amountIn, useInterfaces) : undefined;
    obj.amount_out = message.amountOut ? Coin.toAmino(message.amountOut, useInterfaces) : undefined;
    obj.fee_amount = message.feeAmount ? Coin.toAmino(message.feeAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySimulateStakeResponseAminoMsg): QuerySimulateStakeResponse {
    return QuerySimulateStakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySimulateStakeResponseProtoMsg, useInterfaces: boolean = false): QuerySimulateStakeResponse {
    return QuerySimulateStakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySimulateStakeResponse): Uint8Array {
    return QuerySimulateStakeResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySimulateStakeResponse): QuerySimulateStakeResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.QuerySimulateStakeResponse",
      value: QuerySimulateStakeResponse.encode(message).finish()
    };
  }
};