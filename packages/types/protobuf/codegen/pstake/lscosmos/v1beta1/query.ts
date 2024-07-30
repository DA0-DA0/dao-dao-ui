//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { GenesisState, GenesisStateAmino, GenesisStateSDKType } from "./genesis";
import { HostChainParams, HostChainParamsAmino, HostChainParamsSDKType, DelegationState, DelegationStateAmino, DelegationStateSDKType, AllowListedValidators, AllowListedValidatorsAmino, AllowListedValidatorsSDKType, IBCAmountTransientStore, IBCAmountTransientStoreAmino, IBCAmountTransientStoreSDKType, UnbondingEpochCValue, UnbondingEpochCValueAmino, UnbondingEpochCValueSDKType, HostAccountUndelegation, HostAccountUndelegationAmino, HostAccountUndelegationSDKType, DelegatorUnbondingEpochEntry, DelegatorUnbondingEpochEntryAmino, DelegatorUnbondingEpochEntrySDKType, HostAccounts, HostAccountsAmino, HostAccountsSDKType } from "./lscosmos";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryParamsRequest";
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
  typeUrl: "/pstake.lscosmos.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/** QueryAllStateRequest is request type for the Query/AllState RPC method. */
export interface QueryAllStateRequest {}
export interface QueryAllStateRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllStateRequest";
  value: Uint8Array;
}
/** QueryAllStateRequest is request type for the Query/AllState RPC method. */
export interface QueryAllStateRequestAmino {}
export interface QueryAllStateRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryAllStateRequest";
  value: QueryAllStateRequestAmino;
}
/** QueryAllStateRequest is request type for the Query/AllState RPC method. */
export interface QueryAllStateRequestSDKType {}
/** QueryAllStateResponse is response type for the Query/AllState RPC method. */
export interface QueryAllStateResponse {
  /** params holds all the parameters of this module. */
  genesis: GenesisState | undefined;
}
export interface QueryAllStateResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllStateResponse";
  value: Uint8Array;
}
/** QueryAllStateResponse is response type for the Query/AllState RPC method. */
export interface QueryAllStateResponseAmino {
  /** params holds all the parameters of this module. */
  genesis?: GenesisStateAmino | undefined;
}
export interface QueryAllStateResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryAllStateResponse";
  value: QueryAllStateResponseAmino;
}
/** QueryAllStateResponse is response type for the Query/AllState RPC method. */
export interface QueryAllStateResponseSDKType {
  genesis: GenesisStateSDKType | undefined;
}
/** QueryHostChainParamsRequest is request for the Ouery/HostChainParams methods. */
export interface QueryHostChainParamsRequest {}
export interface QueryHostChainParamsRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostChainParamsRequest";
  value: Uint8Array;
}
/** QueryHostChainParamsRequest is request for the Ouery/HostChainParams methods. */
export interface QueryHostChainParamsRequestAmino {}
export interface QueryHostChainParamsRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryHostChainParamsRequest";
  value: QueryHostChainParamsRequestAmino;
}
/** QueryHostChainParamsRequest is request for the Ouery/HostChainParams methods. */
export interface QueryHostChainParamsRequestSDKType {}
/**
 * QueryHostChainParamsResponse is response for the Ouery/HostChainParams
 * methods.
 */
export interface QueryHostChainParamsResponse {
  hostChainParams: HostChainParams | undefined;
}
export interface QueryHostChainParamsResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostChainParamsResponse";
  value: Uint8Array;
}
/**
 * QueryHostChainParamsResponse is response for the Ouery/HostChainParams
 * methods.
 */
export interface QueryHostChainParamsResponseAmino {
  host_chain_params?: HostChainParamsAmino | undefined;
}
export interface QueryHostChainParamsResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryHostChainParamsResponse";
  value: QueryHostChainParamsResponseAmino;
}
/**
 * QueryHostChainParamsResponse is response for the Ouery/HostChainParams
 * methods.
 */
export interface QueryHostChainParamsResponseSDKType {
  host_chain_params: HostChainParamsSDKType | undefined;
}
/** QueryDelegationStateRequest is request for the Ouery/DelegationState methods. */
export interface QueryDelegationStateRequest {}
export interface QueryDelegationStateRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegationStateRequest";
  value: Uint8Array;
}
/** QueryDelegationStateRequest is request for the Ouery/DelegationState methods. */
export interface QueryDelegationStateRequestAmino {}
export interface QueryDelegationStateRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryDelegationStateRequest";
  value: QueryDelegationStateRequestAmino;
}
/** QueryDelegationStateRequest is request for the Ouery/DelegationState methods. */
export interface QueryDelegationStateRequestSDKType {}
/**
 * QueryDelegationStateResponse is response for the Ouery/DelegationState
 * methods.
 */
export interface QueryDelegationStateResponse {
  delegationState: DelegationState | undefined;
}
export interface QueryDelegationStateResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegationStateResponse";
  value: Uint8Array;
}
/**
 * QueryDelegationStateResponse is response for the Ouery/DelegationState
 * methods.
 */
export interface QueryDelegationStateResponseAmino {
  delegation_state?: DelegationStateAmino | undefined;
}
export interface QueryDelegationStateResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryDelegationStateResponse";
  value: QueryDelegationStateResponseAmino;
}
/**
 * QueryDelegationStateResponse is response for the Ouery/DelegationState
 * methods.
 */
export interface QueryDelegationStateResponseSDKType {
  delegation_state: DelegationStateSDKType | undefined;
}
/**
 * QueryListedValidatorsRequest is a request for the Query/AllowListedValidators
 * methods.
 */
export interface QueryAllowListedValidatorsRequest {}
export interface QueryAllowListedValidatorsRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllowListedValidatorsRequest";
  value: Uint8Array;
}
/**
 * QueryListedValidatorsRequest is a request for the Query/AllowListedValidators
 * methods.
 */
export interface QueryAllowListedValidatorsRequestAmino {}
export interface QueryAllowListedValidatorsRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryAllowListedValidatorsRequest";
  value: QueryAllowListedValidatorsRequestAmino;
}
/**
 * QueryListedValidatorsRequest is a request for the Query/AllowListedValidators
 * methods.
 */
export interface QueryAllowListedValidatorsRequestSDKType {}
/**
 * QueryListedValidatorsResponse is a response for the
 * Query/AllowListedValidators methods.
 */
export interface QueryAllowListedValidatorsResponse {
  allowListedValidators: AllowListedValidators | undefined;
}
export interface QueryAllowListedValidatorsResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllowListedValidatorsResponse";
  value: Uint8Array;
}
/**
 * QueryListedValidatorsResponse is a response for the
 * Query/AllowListedValidators methods.
 */
export interface QueryAllowListedValidatorsResponseAmino {
  allow_listed_validators?: AllowListedValidatorsAmino | undefined;
}
export interface QueryAllowListedValidatorsResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryAllowListedValidatorsResponse";
  value: QueryAllowListedValidatorsResponseAmino;
}
/**
 * QueryListedValidatorsResponse is a response for the
 * Query/AllowListedValidators methods.
 */
export interface QueryAllowListedValidatorsResponseSDKType {
  allow_listed_validators: AllowListedValidatorsSDKType | undefined;
}
/** QueryCValueRequest is a request for the Query/CValue methods. */
export interface QueryCValueRequest {}
export interface QueryCValueRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryCValueRequest";
  value: Uint8Array;
}
/** QueryCValueRequest is a request for the Query/CValue methods. */
export interface QueryCValueRequestAmino {}
export interface QueryCValueRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryCValueRequest";
  value: QueryCValueRequestAmino;
}
/** QueryCValueRequest is a request for the Query/CValue methods. */
export interface QueryCValueRequestSDKType {}
/** QueryCValueRequest is a response for the Query/CValue methods. */
export interface QueryCValueResponse {
  cValue: string;
}
export interface QueryCValueResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryCValueResponse";
  value: Uint8Array;
}
/** QueryCValueRequest is a response for the Query/CValue methods. */
export interface QueryCValueResponseAmino {
  c_value?: string;
}
export interface QueryCValueResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryCValueResponse";
  value: QueryCValueResponseAmino;
}
/** QueryCValueRequest is a response for the Query/CValue methods. */
export interface QueryCValueResponseSDKType {
  c_value: string;
}
/** QueryModuleStateRequest is a request for the Query/ModuleState methods. */
export interface QueryModuleStateRequest {}
export interface QueryModuleStateRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryModuleStateRequest";
  value: Uint8Array;
}
/** QueryModuleStateRequest is a request for the Query/ModuleState methods. */
export interface QueryModuleStateRequestAmino {}
export interface QueryModuleStateRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryModuleStateRequest";
  value: QueryModuleStateRequestAmino;
}
/** QueryModuleStateRequest is a request for the Query/ModuleState methods. */
export interface QueryModuleStateRequestSDKType {}
/** QueryModuleStateRequest is a response for the Query/ModuleState methods. */
export interface QueryModuleStateResponse {
  moduleState: boolean;
}
export interface QueryModuleStateResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryModuleStateResponse";
  value: Uint8Array;
}
/** QueryModuleStateRequest is a response for the Query/ModuleState methods. */
export interface QueryModuleStateResponseAmino {
  module_state?: boolean;
}
export interface QueryModuleStateResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryModuleStateResponse";
  value: QueryModuleStateResponseAmino;
}
/** QueryModuleStateRequest is a response for the Query/ModuleState methods. */
export interface QueryModuleStateResponseSDKType {
  module_state: boolean;
}
/**
 * QueryIBCTransientStoreRequest is a request for the Query/IBCTransientStore
 * methods.
 */
export interface QueryIBCTransientStoreRequest {}
export interface QueryIBCTransientStoreRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryIBCTransientStoreRequest";
  value: Uint8Array;
}
/**
 * QueryIBCTransientStoreRequest is a request for the Query/IBCTransientStore
 * methods.
 */
export interface QueryIBCTransientStoreRequestAmino {}
export interface QueryIBCTransientStoreRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryIBCTransientStoreRequest";
  value: QueryIBCTransientStoreRequestAmino;
}
/**
 * QueryIBCTransientStoreRequest is a request for the Query/IBCTransientStore
 * methods.
 */
export interface QueryIBCTransientStoreRequestSDKType {}
/**
 * QueryIBCTransientStoreRequest is a response for the Query/IBCTransientStore
 * methods.
 */
export interface QueryIBCTransientStoreResponse {
  iBCTransientStore: IBCAmountTransientStore | undefined;
}
export interface QueryIBCTransientStoreResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryIBCTransientStoreResponse";
  value: Uint8Array;
}
/**
 * QueryIBCTransientStoreRequest is a response for the Query/IBCTransientStore
 * methods.
 */
export interface QueryIBCTransientStoreResponseAmino {
  i_b_c_transient_store?: IBCAmountTransientStoreAmino | undefined;
}
export interface QueryIBCTransientStoreResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryIBCTransientStoreResponse";
  value: QueryIBCTransientStoreResponseAmino;
}
/**
 * QueryIBCTransientStoreRequest is a response for the Query/IBCTransientStore
 * methods.
 */
export interface QueryIBCTransientStoreResponseSDKType {
  i_b_c_transient_store: IBCAmountTransientStoreSDKType | undefined;
}
/** QueryUnclaimedRequest is a request for the Query/Unclaimed methods. */
export interface QueryUnclaimedRequest {
  delegatorAddress: string;
}
export interface QueryUnclaimedRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryUnclaimedRequest";
  value: Uint8Array;
}
/** QueryUnclaimedRequest is a request for the Query/Unclaimed methods. */
export interface QueryUnclaimedRequestAmino {
  delegator_address?: string;
}
export interface QueryUnclaimedRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryUnclaimedRequest";
  value: QueryUnclaimedRequestAmino;
}
/** QueryUnclaimedRequest is a request for the Query/Unclaimed methods. */
export interface QueryUnclaimedRequestSDKType {
  delegator_address: string;
}
/** QueryUnclaimedResponse is a response for the Query/Unclaimed methods. */
export interface QueryUnclaimedResponse {
  unclaimed: UnbondingEpochCValue[];
}
export interface QueryUnclaimedResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryUnclaimedResponse";
  value: Uint8Array;
}
/** QueryUnclaimedResponse is a response for the Query/Unclaimed methods. */
export interface QueryUnclaimedResponseAmino {
  unclaimed?: UnbondingEpochCValueAmino[];
}
export interface QueryUnclaimedResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryUnclaimedResponse";
  value: QueryUnclaimedResponseAmino;
}
/** QueryUnclaimedResponse is a response for the Query/Unclaimed methods. */
export interface QueryUnclaimedResponseSDKType {
  unclaimed: UnbondingEpochCValueSDKType[];
}
/**
 * QueryFailedUnbondingsRequest is a request for the Query/FailedUnbondings
 * methods.
 */
export interface QueryFailedUnbondingsRequest {
  delegatorAddress: string;
}
export interface QueryFailedUnbondingsRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryFailedUnbondingsRequest";
  value: Uint8Array;
}
/**
 * QueryFailedUnbondingsRequest is a request for the Query/FailedUnbondings
 * methods.
 */
export interface QueryFailedUnbondingsRequestAmino {
  delegator_address?: string;
}
export interface QueryFailedUnbondingsRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryFailedUnbondingsRequest";
  value: QueryFailedUnbondingsRequestAmino;
}
/**
 * QueryFailedUnbondingsRequest is a request for the Query/FailedUnbondings
 * methods.
 */
export interface QueryFailedUnbondingsRequestSDKType {
  delegator_address: string;
}
/**
 * QueryFailedUnbondingsResponse a response for the Query/FailedUnbondings
 * methods.
 */
export interface QueryFailedUnbondingsResponse {
  failedUnbondings: UnbondingEpochCValue[];
}
export interface QueryFailedUnbondingsResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryFailedUnbondingsResponse";
  value: Uint8Array;
}
/**
 * QueryFailedUnbondingsResponse a response for the Query/FailedUnbondings
 * methods.
 */
export interface QueryFailedUnbondingsResponseAmino {
  failed_unbondings?: UnbondingEpochCValueAmino[];
}
export interface QueryFailedUnbondingsResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryFailedUnbondingsResponse";
  value: QueryFailedUnbondingsResponseAmino;
}
/**
 * QueryFailedUnbondingsResponse a response for the Query/FailedUnbondings
 * methods.
 */
export interface QueryFailedUnbondingsResponseSDKType {
  failed_unbondings: UnbondingEpochCValueSDKType[];
}
/**
 * QueryPendingUnbondingsRequest is a request for the Query/PendingUnbondings
 * methods.
 */
export interface QueryPendingUnbondingsRequest {
  delegatorAddress: string;
}
export interface QueryPendingUnbondingsRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryPendingUnbondingsRequest";
  value: Uint8Array;
}
/**
 * QueryPendingUnbondingsRequest is a request for the Query/PendingUnbondings
 * methods.
 */
export interface QueryPendingUnbondingsRequestAmino {
  delegator_address?: string;
}
export interface QueryPendingUnbondingsRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryPendingUnbondingsRequest";
  value: QueryPendingUnbondingsRequestAmino;
}
/**
 * QueryPendingUnbondingsRequest is a request for the Query/PendingUnbondings
 * methods.
 */
export interface QueryPendingUnbondingsRequestSDKType {
  delegator_address: string;
}
/**
 * QueryPendingUnbondingsResponse is a response for the Query/PendingUnbondings
 * methods.
 */
export interface QueryPendingUnbondingsResponse {
  pendingUnbondings: UnbondingEpochCValue[];
}
export interface QueryPendingUnbondingsResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryPendingUnbondingsResponse";
  value: Uint8Array;
}
/**
 * QueryPendingUnbondingsResponse is a response for the Query/PendingUnbondings
 * methods.
 */
export interface QueryPendingUnbondingsResponseAmino {
  pending_unbondings?: UnbondingEpochCValueAmino[];
}
export interface QueryPendingUnbondingsResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryPendingUnbondingsResponse";
  value: QueryPendingUnbondingsResponseAmino;
}
/**
 * QueryPendingUnbondingsResponse is a response for the Query/PendingUnbondings
 * methods.
 */
export interface QueryPendingUnbondingsResponseSDKType {
  pending_unbondings: UnbondingEpochCValueSDKType[];
}
/**
 * QueryUnbondingEpochCValueRequest is a request for the
 * Query/UnbondingEpochCValue methods.
 */
export interface QueryUnbondingEpochCValueRequest {
  epochNumber: bigint;
}
export interface QueryUnbondingEpochCValueRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryUnbondingEpochCValueRequest";
  value: Uint8Array;
}
/**
 * QueryUnbondingEpochCValueRequest is a request for the
 * Query/UnbondingEpochCValue methods.
 */
export interface QueryUnbondingEpochCValueRequestAmino {
  epoch_number?: string;
}
export interface QueryUnbondingEpochCValueRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryUnbondingEpochCValueRequest";
  value: QueryUnbondingEpochCValueRequestAmino;
}
/**
 * QueryUnbondingEpochCValueRequest is a request for the
 * Query/UnbondingEpochCValue methods.
 */
export interface QueryUnbondingEpochCValueRequestSDKType {
  epoch_number: bigint;
}
/**
 * QueryUnbondingEpochCValueResponse is a response for the
 * Query/UnbondingEpochCValue methods.
 */
export interface QueryUnbondingEpochCValueResponse {
  unbondingEpochCValue: UnbondingEpochCValue | undefined;
}
export interface QueryUnbondingEpochCValueResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryUnbondingEpochCValueResponse";
  value: Uint8Array;
}
/**
 * QueryUnbondingEpochCValueResponse is a response for the
 * Query/UnbondingEpochCValue methods.
 */
export interface QueryUnbondingEpochCValueResponseAmino {
  unbonding_epoch_c_value?: UnbondingEpochCValueAmino | undefined;
}
export interface QueryUnbondingEpochCValueResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryUnbondingEpochCValueResponse";
  value: QueryUnbondingEpochCValueResponseAmino;
}
/**
 * QueryUnbondingEpochCValueResponse is a response for the
 * Query/UnbondingEpochCValue methods.
 */
export interface QueryUnbondingEpochCValueResponseSDKType {
  unbonding_epoch_c_value: UnbondingEpochCValueSDKType | undefined;
}
/**
 * QueryHostAccountUndelegationRequest is a request for the
 * Query/HostAccountUndelegation methods.
 */
export interface QueryHostAccountUndelegationRequest {
  epochNumber: bigint;
}
export interface QueryHostAccountUndelegationRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountUndelegationRequest";
  value: Uint8Array;
}
/**
 * QueryHostAccountUndelegationRequest is a request for the
 * Query/HostAccountUndelegation methods.
 */
export interface QueryHostAccountUndelegationRequestAmino {
  epoch_number?: string;
}
export interface QueryHostAccountUndelegationRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryHostAccountUndelegationRequest";
  value: QueryHostAccountUndelegationRequestAmino;
}
/**
 * QueryHostAccountUndelegationRequest is a request for the
 * Query/HostAccountUndelegation methods.
 */
export interface QueryHostAccountUndelegationRequestSDKType {
  epoch_number: bigint;
}
/**
 * QueryHostAccountUndelegationResponse is a response for the
 * Query/HostAccountUndelegation methods.
 */
export interface QueryHostAccountUndelegationResponse {
  hostAccountUndelegation: HostAccountUndelegation | undefined;
}
export interface QueryHostAccountUndelegationResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountUndelegationResponse";
  value: Uint8Array;
}
/**
 * QueryHostAccountUndelegationResponse is a response for the
 * Query/HostAccountUndelegation methods.
 */
export interface QueryHostAccountUndelegationResponseAmino {
  host_account_undelegation?: HostAccountUndelegationAmino | undefined;
}
export interface QueryHostAccountUndelegationResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryHostAccountUndelegationResponse";
  value: QueryHostAccountUndelegationResponseAmino;
}
/**
 * QueryHostAccountUndelegationResponse is a response for the
 * Query/HostAccountUndelegation methods.
 */
export interface QueryHostAccountUndelegationResponseSDKType {
  host_account_undelegation: HostAccountUndelegationSDKType | undefined;
}
/**
 * QueryDelegatorUnbondingEpochEntryRequest is a request for the
 * Query/DelegatorUnbondingEpochEntry methods.
 */
export interface QueryDelegatorUnbondingEpochEntryRequest {
  delegatorAddress: string;
  epochNumber: bigint;
}
export interface QueryDelegatorUnbondingEpochEntryRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegatorUnbondingEpochEntryRequest";
  value: Uint8Array;
}
/**
 * QueryDelegatorUnbondingEpochEntryRequest is a request for the
 * Query/DelegatorUnbondingEpochEntry methods.
 */
export interface QueryDelegatorUnbondingEpochEntryRequestAmino {
  delegator_address?: string;
  epoch_number?: string;
}
export interface QueryDelegatorUnbondingEpochEntryRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryDelegatorUnbondingEpochEntryRequest";
  value: QueryDelegatorUnbondingEpochEntryRequestAmino;
}
/**
 * QueryDelegatorUnbondingEpochEntryRequest is a request for the
 * Query/DelegatorUnbondingEpochEntry methods.
 */
export interface QueryDelegatorUnbondingEpochEntryRequestSDKType {
  delegator_address: string;
  epoch_number: bigint;
}
/**
 * QueryDelegatorUnbondingEpochEntryResponse is a response for the
 * Query/DelegatorUnbondingEpochEntry methods.
 */
export interface QueryDelegatorUnbondingEpochEntryResponse {
  delegatorUnbodingEpochEntry: DelegatorUnbondingEpochEntry | undefined;
}
export interface QueryDelegatorUnbondingEpochEntryResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegatorUnbondingEpochEntryResponse";
  value: Uint8Array;
}
/**
 * QueryDelegatorUnbondingEpochEntryResponse is a response for the
 * Query/DelegatorUnbondingEpochEntry methods.
 */
export interface QueryDelegatorUnbondingEpochEntryResponseAmino {
  delegator_unboding_epoch_entry?: DelegatorUnbondingEpochEntryAmino | undefined;
}
export interface QueryDelegatorUnbondingEpochEntryResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryDelegatorUnbondingEpochEntryResponse";
  value: QueryDelegatorUnbondingEpochEntryResponseAmino;
}
/**
 * QueryDelegatorUnbondingEpochEntryResponse is a response for the
 * Query/DelegatorUnbondingEpochEntry methods.
 */
export interface QueryDelegatorUnbondingEpochEntryResponseSDKType {
  delegator_unboding_epoch_entry: DelegatorUnbondingEpochEntrySDKType | undefined;
}
/** QueryHostAccountsRequest is a request for the Query/HostAccounts methods. */
export interface QueryHostAccountsRequest {}
export interface QueryHostAccountsRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountsRequest";
  value: Uint8Array;
}
/** QueryHostAccountsRequest is a request for the Query/HostAccounts methods. */
export interface QueryHostAccountsRequestAmino {}
export interface QueryHostAccountsRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryHostAccountsRequest";
  value: QueryHostAccountsRequestAmino;
}
/** QueryHostAccountsRequest is a request for the Query/HostAccounts methods. */
export interface QueryHostAccountsRequestSDKType {}
/** QueryHostAccountsResponse is a response for the Query/HostAccounts methods. */
export interface QueryHostAccountsResponse {
  hostAccounts: HostAccounts | undefined;
}
export interface QueryHostAccountsResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountsResponse";
  value: Uint8Array;
}
/** QueryHostAccountsResponse is a response for the Query/HostAccounts methods. */
export interface QueryHostAccountsResponseAmino {
  host_accounts?: HostAccountsAmino | undefined;
}
export interface QueryHostAccountsResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryHostAccountsResponse";
  value: QueryHostAccountsResponseAmino;
}
/** QueryHostAccountsResponse is a response for the Query/HostAccounts methods. */
export interface QueryHostAccountsResponseSDKType {
  host_accounts: HostAccountsSDKType | undefined;
}
/**
 * QueryDepositModuleAccountRequest is a request for the
 * Query/DepositModuleAccount methods.
 */
export interface QueryDepositModuleAccountRequest {}
export interface QueryDepositModuleAccountRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDepositModuleAccountRequest";
  value: Uint8Array;
}
/**
 * QueryDepositModuleAccountRequest is a request for the
 * Query/DepositModuleAccount methods.
 */
export interface QueryDepositModuleAccountRequestAmino {}
export interface QueryDepositModuleAccountRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryDepositModuleAccountRequest";
  value: QueryDepositModuleAccountRequestAmino;
}
/**
 * QueryDepositModuleAccountRequest is a request for the
 * Query/DepositModuleAccount methods.
 */
export interface QueryDepositModuleAccountRequestSDKType {}
/**
 * QueryDepositModuleAccountResponse is a response for the
 * Query/DepositModuleAccount methods.
 */
export interface QueryDepositModuleAccountResponse {
  balance: Coin | undefined;
}
export interface QueryDepositModuleAccountResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDepositModuleAccountResponse";
  value: Uint8Array;
}
/**
 * QueryDepositModuleAccountResponse is a response for the
 * Query/DepositModuleAccount methods.
 */
export interface QueryDepositModuleAccountResponseAmino {
  balance?: CoinAmino | undefined;
}
export interface QueryDepositModuleAccountResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryDepositModuleAccountResponse";
  value: QueryDepositModuleAccountResponseAmino;
}
/**
 * QueryDepositModuleAccountResponse is a response for the
 * Query/DepositModuleAccount methods.
 */
export interface QueryDepositModuleAccountResponseSDKType {
  balance: CoinSDKType | undefined;
}
/**
 * QueryAllDelegatorUnbondingEpochEntriesRequest is a request for the
 * Query/DelegatorUnbondingEpochEntries methods.
 */
export interface QueryAllDelegatorUnbondingEpochEntriesRequest {
  delegatorAddress: string;
}
export interface QueryAllDelegatorUnbondingEpochEntriesRequestProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllDelegatorUnbondingEpochEntriesRequest";
  value: Uint8Array;
}
/**
 * QueryAllDelegatorUnbondingEpochEntriesRequest is a request for the
 * Query/DelegatorUnbondingEpochEntries methods.
 */
export interface QueryAllDelegatorUnbondingEpochEntriesRequestAmino {
  delegator_address?: string;
}
export interface QueryAllDelegatorUnbondingEpochEntriesRequestAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryAllDelegatorUnbondingEpochEntriesRequest";
  value: QueryAllDelegatorUnbondingEpochEntriesRequestAmino;
}
/**
 * QueryAllDelegatorUnbondingEpochEntriesRequest is a request for the
 * Query/DelegatorUnbondingEpochEntries methods.
 */
export interface QueryAllDelegatorUnbondingEpochEntriesRequestSDKType {
  delegator_address: string;
}
/**
 * QueryAllDelegatorUnbondingEpochEntriesResponse is a response for the
 * Query/DelegatorUnbondingEpochEntries methods.
 */
export interface QueryAllDelegatorUnbondingEpochEntriesResponse {
  delegatorUnbondingEpochEntries: DelegatorUnbondingEpochEntry[];
}
export interface QueryAllDelegatorUnbondingEpochEntriesResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllDelegatorUnbondingEpochEntriesResponse";
  value: Uint8Array;
}
/**
 * QueryAllDelegatorUnbondingEpochEntriesResponse is a response for the
 * Query/DelegatorUnbondingEpochEntries methods.
 */
export interface QueryAllDelegatorUnbondingEpochEntriesResponseAmino {
  delegator_unbonding_epoch_entries?: DelegatorUnbondingEpochEntryAmino[];
}
export interface QueryAllDelegatorUnbondingEpochEntriesResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.QueryAllDelegatorUnbondingEpochEntriesResponse";
  value: QueryAllDelegatorUnbondingEpochEntriesResponseAmino;
}
/**
 * QueryAllDelegatorUnbondingEpochEntriesResponse is a response for the
 * Query/DelegatorUnbondingEpochEntries methods.
 */
export interface QueryAllDelegatorUnbondingEpochEntriesResponseSDKType {
  delegator_unbonding_epoch_entries: DelegatorUnbondingEpochEntrySDKType[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryParamsRequest",
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
      typeUrl: "/pstake.lscosmos.v1beta1.QueryParamsRequest",
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
  typeUrl: "/pstake.lscosmos.v1beta1.QueryParamsResponse",
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
      typeUrl: "/pstake.lscosmos.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllStateRequest(): QueryAllStateRequest {
  return {};
}
export const QueryAllStateRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllStateRequest",
  encode(_: QueryAllStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStateRequest();
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
  fromPartial(_: Partial<QueryAllStateRequest>): QueryAllStateRequest {
    const message = createBaseQueryAllStateRequest();
    return message;
  },
  fromAmino(_: QueryAllStateRequestAmino): QueryAllStateRequest {
    const message = createBaseQueryAllStateRequest();
    return message;
  },
  toAmino(_: QueryAllStateRequest, useInterfaces: boolean = false): QueryAllStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAllStateRequestAminoMsg): QueryAllStateRequest {
    return QueryAllStateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllStateRequestProtoMsg, useInterfaces: boolean = false): QueryAllStateRequest {
    return QueryAllStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllStateRequest): Uint8Array {
    return QueryAllStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllStateRequest): QueryAllStateRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryAllStateRequest",
      value: QueryAllStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllStateResponse(): QueryAllStateResponse {
  return {
    genesis: GenesisState.fromPartial({})
  };
}
export const QueryAllStateResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllStateResponse",
  encode(message: QueryAllStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.genesis !== undefined) {
      GenesisState.encode(message.genesis, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.genesis = GenesisState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllStateResponse>): QueryAllStateResponse {
    const message = createBaseQueryAllStateResponse();
    message.genesis = object.genesis !== undefined && object.genesis !== null ? GenesisState.fromPartial(object.genesis) : undefined;
    return message;
  },
  fromAmino(object: QueryAllStateResponseAmino): QueryAllStateResponse {
    const message = createBaseQueryAllStateResponse();
    if (object.genesis !== undefined && object.genesis !== null) {
      message.genesis = GenesisState.fromAmino(object.genesis);
    }
    return message;
  },
  toAmino(message: QueryAllStateResponse, useInterfaces: boolean = false): QueryAllStateResponseAmino {
    const obj: any = {};
    obj.genesis = message.genesis ? GenesisState.toAmino(message.genesis, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllStateResponseAminoMsg): QueryAllStateResponse {
    return QueryAllStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllStateResponseProtoMsg, useInterfaces: boolean = false): QueryAllStateResponse {
    return QueryAllStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllStateResponse): Uint8Array {
    return QueryAllStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllStateResponse): QueryAllStateResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryAllStateResponse",
      value: QueryAllStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryHostChainParamsRequest(): QueryHostChainParamsRequest {
  return {};
}
export const QueryHostChainParamsRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostChainParamsRequest",
  encode(_: QueryHostChainParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostChainParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostChainParamsRequest();
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
  fromPartial(_: Partial<QueryHostChainParamsRequest>): QueryHostChainParamsRequest {
    const message = createBaseQueryHostChainParamsRequest();
    return message;
  },
  fromAmino(_: QueryHostChainParamsRequestAmino): QueryHostChainParamsRequest {
    const message = createBaseQueryHostChainParamsRequest();
    return message;
  },
  toAmino(_: QueryHostChainParamsRequest, useInterfaces: boolean = false): QueryHostChainParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryHostChainParamsRequestAminoMsg): QueryHostChainParamsRequest {
    return QueryHostChainParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostChainParamsRequestProtoMsg, useInterfaces: boolean = false): QueryHostChainParamsRequest {
    return QueryHostChainParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostChainParamsRequest): Uint8Array {
    return QueryHostChainParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryHostChainParamsRequest): QueryHostChainParamsRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryHostChainParamsRequest",
      value: QueryHostChainParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryHostChainParamsResponse(): QueryHostChainParamsResponse {
  return {
    hostChainParams: HostChainParams.fromPartial({})
  };
}
export const QueryHostChainParamsResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostChainParamsResponse",
  encode(message: QueryHostChainParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChainParams !== undefined) {
      HostChainParams.encode(message.hostChainParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostChainParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostChainParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChainParams = HostChainParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryHostChainParamsResponse>): QueryHostChainParamsResponse {
    const message = createBaseQueryHostChainParamsResponse();
    message.hostChainParams = object.hostChainParams !== undefined && object.hostChainParams !== null ? HostChainParams.fromPartial(object.hostChainParams) : undefined;
    return message;
  },
  fromAmino(object: QueryHostChainParamsResponseAmino): QueryHostChainParamsResponse {
    const message = createBaseQueryHostChainParamsResponse();
    if (object.host_chain_params !== undefined && object.host_chain_params !== null) {
      message.hostChainParams = HostChainParams.fromAmino(object.host_chain_params);
    }
    return message;
  },
  toAmino(message: QueryHostChainParamsResponse, useInterfaces: boolean = false): QueryHostChainParamsResponseAmino {
    const obj: any = {};
    obj.host_chain_params = message.hostChainParams ? HostChainParams.toAmino(message.hostChainParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryHostChainParamsResponseAminoMsg): QueryHostChainParamsResponse {
    return QueryHostChainParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostChainParamsResponseProtoMsg, useInterfaces: boolean = false): QueryHostChainParamsResponse {
    return QueryHostChainParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostChainParamsResponse): Uint8Array {
    return QueryHostChainParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryHostChainParamsResponse): QueryHostChainParamsResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryHostChainParamsResponse",
      value: QueryHostChainParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDelegationStateRequest(): QueryDelegationStateRequest {
  return {};
}
export const QueryDelegationStateRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegationStateRequest",
  encode(_: QueryDelegationStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDelegationStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegationStateRequest();
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
  fromPartial(_: Partial<QueryDelegationStateRequest>): QueryDelegationStateRequest {
    const message = createBaseQueryDelegationStateRequest();
    return message;
  },
  fromAmino(_: QueryDelegationStateRequestAmino): QueryDelegationStateRequest {
    const message = createBaseQueryDelegationStateRequest();
    return message;
  },
  toAmino(_: QueryDelegationStateRequest, useInterfaces: boolean = false): QueryDelegationStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryDelegationStateRequestAminoMsg): QueryDelegationStateRequest {
    return QueryDelegationStateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDelegationStateRequestProtoMsg, useInterfaces: boolean = false): QueryDelegationStateRequest {
    return QueryDelegationStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDelegationStateRequest): Uint8Array {
    return QueryDelegationStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDelegationStateRequest): QueryDelegationStateRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegationStateRequest",
      value: QueryDelegationStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDelegationStateResponse(): QueryDelegationStateResponse {
  return {
    delegationState: DelegationState.fromPartial({})
  };
}
export const QueryDelegationStateResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegationStateResponse",
  encode(message: QueryDelegationStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegationState !== undefined) {
      DelegationState.encode(message.delegationState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDelegationStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegationStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegationState = DelegationState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDelegationStateResponse>): QueryDelegationStateResponse {
    const message = createBaseQueryDelegationStateResponse();
    message.delegationState = object.delegationState !== undefined && object.delegationState !== null ? DelegationState.fromPartial(object.delegationState) : undefined;
    return message;
  },
  fromAmino(object: QueryDelegationStateResponseAmino): QueryDelegationStateResponse {
    const message = createBaseQueryDelegationStateResponse();
    if (object.delegation_state !== undefined && object.delegation_state !== null) {
      message.delegationState = DelegationState.fromAmino(object.delegation_state);
    }
    return message;
  },
  toAmino(message: QueryDelegationStateResponse, useInterfaces: boolean = false): QueryDelegationStateResponseAmino {
    const obj: any = {};
    obj.delegation_state = message.delegationState ? DelegationState.toAmino(message.delegationState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDelegationStateResponseAminoMsg): QueryDelegationStateResponse {
    return QueryDelegationStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDelegationStateResponseProtoMsg, useInterfaces: boolean = false): QueryDelegationStateResponse {
    return QueryDelegationStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDelegationStateResponse): Uint8Array {
    return QueryDelegationStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDelegationStateResponse): QueryDelegationStateResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegationStateResponse",
      value: QueryDelegationStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllowListedValidatorsRequest(): QueryAllowListedValidatorsRequest {
  return {};
}
export const QueryAllowListedValidatorsRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllowListedValidatorsRequest",
  encode(_: QueryAllowListedValidatorsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllowListedValidatorsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllowListedValidatorsRequest();
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
  fromPartial(_: Partial<QueryAllowListedValidatorsRequest>): QueryAllowListedValidatorsRequest {
    const message = createBaseQueryAllowListedValidatorsRequest();
    return message;
  },
  fromAmino(_: QueryAllowListedValidatorsRequestAmino): QueryAllowListedValidatorsRequest {
    const message = createBaseQueryAllowListedValidatorsRequest();
    return message;
  },
  toAmino(_: QueryAllowListedValidatorsRequest, useInterfaces: boolean = false): QueryAllowListedValidatorsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAllowListedValidatorsRequestAminoMsg): QueryAllowListedValidatorsRequest {
    return QueryAllowListedValidatorsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllowListedValidatorsRequestProtoMsg, useInterfaces: boolean = false): QueryAllowListedValidatorsRequest {
    return QueryAllowListedValidatorsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllowListedValidatorsRequest): Uint8Array {
    return QueryAllowListedValidatorsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllowListedValidatorsRequest): QueryAllowListedValidatorsRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryAllowListedValidatorsRequest",
      value: QueryAllowListedValidatorsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllowListedValidatorsResponse(): QueryAllowListedValidatorsResponse {
  return {
    allowListedValidators: AllowListedValidators.fromPartial({})
  };
}
export const QueryAllowListedValidatorsResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllowListedValidatorsResponse",
  encode(message: QueryAllowListedValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.allowListedValidators !== undefined) {
      AllowListedValidators.encode(message.allowListedValidators, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllowListedValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllowListedValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allowListedValidators = AllowListedValidators.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllowListedValidatorsResponse>): QueryAllowListedValidatorsResponse {
    const message = createBaseQueryAllowListedValidatorsResponse();
    message.allowListedValidators = object.allowListedValidators !== undefined && object.allowListedValidators !== null ? AllowListedValidators.fromPartial(object.allowListedValidators) : undefined;
    return message;
  },
  fromAmino(object: QueryAllowListedValidatorsResponseAmino): QueryAllowListedValidatorsResponse {
    const message = createBaseQueryAllowListedValidatorsResponse();
    if (object.allow_listed_validators !== undefined && object.allow_listed_validators !== null) {
      message.allowListedValidators = AllowListedValidators.fromAmino(object.allow_listed_validators);
    }
    return message;
  },
  toAmino(message: QueryAllowListedValidatorsResponse, useInterfaces: boolean = false): QueryAllowListedValidatorsResponseAmino {
    const obj: any = {};
    obj.allow_listed_validators = message.allowListedValidators ? AllowListedValidators.toAmino(message.allowListedValidators, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllowListedValidatorsResponseAminoMsg): QueryAllowListedValidatorsResponse {
    return QueryAllowListedValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllowListedValidatorsResponseProtoMsg, useInterfaces: boolean = false): QueryAllowListedValidatorsResponse {
    return QueryAllowListedValidatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllowListedValidatorsResponse): Uint8Array {
    return QueryAllowListedValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllowListedValidatorsResponse): QueryAllowListedValidatorsResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryAllowListedValidatorsResponse",
      value: QueryAllowListedValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCValueRequest(): QueryCValueRequest {
  return {};
}
export const QueryCValueRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryCValueRequest",
  encode(_: QueryCValueRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCValueRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCValueRequest();
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
  fromPartial(_: Partial<QueryCValueRequest>): QueryCValueRequest {
    const message = createBaseQueryCValueRequest();
    return message;
  },
  fromAmino(_: QueryCValueRequestAmino): QueryCValueRequest {
    const message = createBaseQueryCValueRequest();
    return message;
  },
  toAmino(_: QueryCValueRequest, useInterfaces: boolean = false): QueryCValueRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryCValueRequestAminoMsg): QueryCValueRequest {
    return QueryCValueRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCValueRequestProtoMsg, useInterfaces: boolean = false): QueryCValueRequest {
    return QueryCValueRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCValueRequest): Uint8Array {
    return QueryCValueRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCValueRequest): QueryCValueRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryCValueRequest",
      value: QueryCValueRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCValueResponse(): QueryCValueResponse {
  return {
    cValue: ""
  };
}
export const QueryCValueResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryCValueResponse",
  encode(message: QueryCValueResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cValue !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.cValue, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCValueResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCValueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCValueResponse>): QueryCValueResponse {
    const message = createBaseQueryCValueResponse();
    message.cValue = object.cValue ?? "";
    return message;
  },
  fromAmino(object: QueryCValueResponseAmino): QueryCValueResponse {
    const message = createBaseQueryCValueResponse();
    if (object.c_value !== undefined && object.c_value !== null) {
      message.cValue = object.c_value;
    }
    return message;
  },
  toAmino(message: QueryCValueResponse, useInterfaces: boolean = false): QueryCValueResponseAmino {
    const obj: any = {};
    obj.c_value = message.cValue === "" ? undefined : message.cValue;
    return obj;
  },
  fromAminoMsg(object: QueryCValueResponseAminoMsg): QueryCValueResponse {
    return QueryCValueResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCValueResponseProtoMsg, useInterfaces: boolean = false): QueryCValueResponse {
    return QueryCValueResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCValueResponse): Uint8Array {
    return QueryCValueResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCValueResponse): QueryCValueResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryCValueResponse",
      value: QueryCValueResponse.encode(message).finish()
    };
  }
};
function createBaseQueryModuleStateRequest(): QueryModuleStateRequest {
  return {};
}
export const QueryModuleStateRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryModuleStateRequest",
  encode(_: QueryModuleStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryModuleStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleStateRequest();
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
  fromPartial(_: Partial<QueryModuleStateRequest>): QueryModuleStateRequest {
    const message = createBaseQueryModuleStateRequest();
    return message;
  },
  fromAmino(_: QueryModuleStateRequestAmino): QueryModuleStateRequest {
    const message = createBaseQueryModuleStateRequest();
    return message;
  },
  toAmino(_: QueryModuleStateRequest, useInterfaces: boolean = false): QueryModuleStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryModuleStateRequestAminoMsg): QueryModuleStateRequest {
    return QueryModuleStateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryModuleStateRequestProtoMsg, useInterfaces: boolean = false): QueryModuleStateRequest {
    return QueryModuleStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryModuleStateRequest): Uint8Array {
    return QueryModuleStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryModuleStateRequest): QueryModuleStateRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryModuleStateRequest",
      value: QueryModuleStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryModuleStateResponse(): QueryModuleStateResponse {
  return {
    moduleState: false
  };
}
export const QueryModuleStateResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryModuleStateResponse",
  encode(message: QueryModuleStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.moduleState === true) {
      writer.uint32(8).bool(message.moduleState);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryModuleStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryModuleStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moduleState = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryModuleStateResponse>): QueryModuleStateResponse {
    const message = createBaseQueryModuleStateResponse();
    message.moduleState = object.moduleState ?? false;
    return message;
  },
  fromAmino(object: QueryModuleStateResponseAmino): QueryModuleStateResponse {
    const message = createBaseQueryModuleStateResponse();
    if (object.module_state !== undefined && object.module_state !== null) {
      message.moduleState = object.module_state;
    }
    return message;
  },
  toAmino(message: QueryModuleStateResponse, useInterfaces: boolean = false): QueryModuleStateResponseAmino {
    const obj: any = {};
    obj.module_state = message.moduleState === false ? undefined : message.moduleState;
    return obj;
  },
  fromAminoMsg(object: QueryModuleStateResponseAminoMsg): QueryModuleStateResponse {
    return QueryModuleStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryModuleStateResponseProtoMsg, useInterfaces: boolean = false): QueryModuleStateResponse {
    return QueryModuleStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryModuleStateResponse): Uint8Array {
    return QueryModuleStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryModuleStateResponse): QueryModuleStateResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryModuleStateResponse",
      value: QueryModuleStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryIBCTransientStoreRequest(): QueryIBCTransientStoreRequest {
  return {};
}
export const QueryIBCTransientStoreRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryIBCTransientStoreRequest",
  encode(_: QueryIBCTransientStoreRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryIBCTransientStoreRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIBCTransientStoreRequest();
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
  fromPartial(_: Partial<QueryIBCTransientStoreRequest>): QueryIBCTransientStoreRequest {
    const message = createBaseQueryIBCTransientStoreRequest();
    return message;
  },
  fromAmino(_: QueryIBCTransientStoreRequestAmino): QueryIBCTransientStoreRequest {
    const message = createBaseQueryIBCTransientStoreRequest();
    return message;
  },
  toAmino(_: QueryIBCTransientStoreRequest, useInterfaces: boolean = false): QueryIBCTransientStoreRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryIBCTransientStoreRequestAminoMsg): QueryIBCTransientStoreRequest {
    return QueryIBCTransientStoreRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIBCTransientStoreRequestProtoMsg, useInterfaces: boolean = false): QueryIBCTransientStoreRequest {
    return QueryIBCTransientStoreRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryIBCTransientStoreRequest): Uint8Array {
    return QueryIBCTransientStoreRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryIBCTransientStoreRequest): QueryIBCTransientStoreRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryIBCTransientStoreRequest",
      value: QueryIBCTransientStoreRequest.encode(message).finish()
    };
  }
};
function createBaseQueryIBCTransientStoreResponse(): QueryIBCTransientStoreResponse {
  return {
    iBCTransientStore: IBCAmountTransientStore.fromPartial({})
  };
}
export const QueryIBCTransientStoreResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryIBCTransientStoreResponse",
  encode(message: QueryIBCTransientStoreResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iBCTransientStore !== undefined) {
      IBCAmountTransientStore.encode(message.iBCTransientStore, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryIBCTransientStoreResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIBCTransientStoreResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iBCTransientStore = IBCAmountTransientStore.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryIBCTransientStoreResponse>): QueryIBCTransientStoreResponse {
    const message = createBaseQueryIBCTransientStoreResponse();
    message.iBCTransientStore = object.iBCTransientStore !== undefined && object.iBCTransientStore !== null ? IBCAmountTransientStore.fromPartial(object.iBCTransientStore) : undefined;
    return message;
  },
  fromAmino(object: QueryIBCTransientStoreResponseAmino): QueryIBCTransientStoreResponse {
    const message = createBaseQueryIBCTransientStoreResponse();
    if (object.i_b_c_transient_store !== undefined && object.i_b_c_transient_store !== null) {
      message.iBCTransientStore = IBCAmountTransientStore.fromAmino(object.i_b_c_transient_store);
    }
    return message;
  },
  toAmino(message: QueryIBCTransientStoreResponse, useInterfaces: boolean = false): QueryIBCTransientStoreResponseAmino {
    const obj: any = {};
    obj.i_b_c_transient_store = message.iBCTransientStore ? IBCAmountTransientStore.toAmino(message.iBCTransientStore, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryIBCTransientStoreResponseAminoMsg): QueryIBCTransientStoreResponse {
    return QueryIBCTransientStoreResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIBCTransientStoreResponseProtoMsg, useInterfaces: boolean = false): QueryIBCTransientStoreResponse {
    return QueryIBCTransientStoreResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryIBCTransientStoreResponse): Uint8Array {
    return QueryIBCTransientStoreResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryIBCTransientStoreResponse): QueryIBCTransientStoreResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryIBCTransientStoreResponse",
      value: QueryIBCTransientStoreResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUnclaimedRequest(): QueryUnclaimedRequest {
  return {
    delegatorAddress: ""
  };
}
export const QueryUnclaimedRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryUnclaimedRequest",
  encode(message: QueryUnclaimedRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnclaimedRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnclaimedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUnclaimedRequest>): QueryUnclaimedRequest {
    const message = createBaseQueryUnclaimedRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
  fromAmino(object: QueryUnclaimedRequestAmino): QueryUnclaimedRequest {
    const message = createBaseQueryUnclaimedRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    return message;
  },
  toAmino(message: QueryUnclaimedRequest, useInterfaces: boolean = false): QueryUnclaimedRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
    return obj;
  },
  fromAminoMsg(object: QueryUnclaimedRequestAminoMsg): QueryUnclaimedRequest {
    return QueryUnclaimedRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUnclaimedRequestProtoMsg, useInterfaces: boolean = false): QueryUnclaimedRequest {
    return QueryUnclaimedRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnclaimedRequest): Uint8Array {
    return QueryUnclaimedRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUnclaimedRequest): QueryUnclaimedRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryUnclaimedRequest",
      value: QueryUnclaimedRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUnclaimedResponse(): QueryUnclaimedResponse {
  return {
    unclaimed: []
  };
}
export const QueryUnclaimedResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryUnclaimedResponse",
  encode(message: QueryUnclaimedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.unclaimed) {
      UnbondingEpochCValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnclaimedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnclaimedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unclaimed.push(UnbondingEpochCValue.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUnclaimedResponse>): QueryUnclaimedResponse {
    const message = createBaseQueryUnclaimedResponse();
    message.unclaimed = object.unclaimed?.map(e => UnbondingEpochCValue.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryUnclaimedResponseAmino): QueryUnclaimedResponse {
    const message = createBaseQueryUnclaimedResponse();
    message.unclaimed = object.unclaimed?.map(e => UnbondingEpochCValue.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryUnclaimedResponse, useInterfaces: boolean = false): QueryUnclaimedResponseAmino {
    const obj: any = {};
    if (message.unclaimed) {
      obj.unclaimed = message.unclaimed.map(e => e ? UnbondingEpochCValue.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.unclaimed = message.unclaimed;
    }
    return obj;
  },
  fromAminoMsg(object: QueryUnclaimedResponseAminoMsg): QueryUnclaimedResponse {
    return QueryUnclaimedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUnclaimedResponseProtoMsg, useInterfaces: boolean = false): QueryUnclaimedResponse {
    return QueryUnclaimedResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnclaimedResponse): Uint8Array {
    return QueryUnclaimedResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUnclaimedResponse): QueryUnclaimedResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryUnclaimedResponse",
      value: QueryUnclaimedResponse.encode(message).finish()
    };
  }
};
function createBaseQueryFailedUnbondingsRequest(): QueryFailedUnbondingsRequest {
  return {
    delegatorAddress: ""
  };
}
export const QueryFailedUnbondingsRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryFailedUnbondingsRequest",
  encode(message: QueryFailedUnbondingsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFailedUnbondingsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFailedUnbondingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryFailedUnbondingsRequest>): QueryFailedUnbondingsRequest {
    const message = createBaseQueryFailedUnbondingsRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
  fromAmino(object: QueryFailedUnbondingsRequestAmino): QueryFailedUnbondingsRequest {
    const message = createBaseQueryFailedUnbondingsRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    return message;
  },
  toAmino(message: QueryFailedUnbondingsRequest, useInterfaces: boolean = false): QueryFailedUnbondingsRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
    return obj;
  },
  fromAminoMsg(object: QueryFailedUnbondingsRequestAminoMsg): QueryFailedUnbondingsRequest {
    return QueryFailedUnbondingsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFailedUnbondingsRequestProtoMsg, useInterfaces: boolean = false): QueryFailedUnbondingsRequest {
    return QueryFailedUnbondingsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFailedUnbondingsRequest): Uint8Array {
    return QueryFailedUnbondingsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryFailedUnbondingsRequest): QueryFailedUnbondingsRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryFailedUnbondingsRequest",
      value: QueryFailedUnbondingsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryFailedUnbondingsResponse(): QueryFailedUnbondingsResponse {
  return {
    failedUnbondings: []
  };
}
export const QueryFailedUnbondingsResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryFailedUnbondingsResponse",
  encode(message: QueryFailedUnbondingsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.failedUnbondings) {
      UnbondingEpochCValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFailedUnbondingsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFailedUnbondingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.failedUnbondings.push(UnbondingEpochCValue.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryFailedUnbondingsResponse>): QueryFailedUnbondingsResponse {
    const message = createBaseQueryFailedUnbondingsResponse();
    message.failedUnbondings = object.failedUnbondings?.map(e => UnbondingEpochCValue.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryFailedUnbondingsResponseAmino): QueryFailedUnbondingsResponse {
    const message = createBaseQueryFailedUnbondingsResponse();
    message.failedUnbondings = object.failed_unbondings?.map(e => UnbondingEpochCValue.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryFailedUnbondingsResponse, useInterfaces: boolean = false): QueryFailedUnbondingsResponseAmino {
    const obj: any = {};
    if (message.failedUnbondings) {
      obj.failed_unbondings = message.failedUnbondings.map(e => e ? UnbondingEpochCValue.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.failed_unbondings = message.failedUnbondings;
    }
    return obj;
  },
  fromAminoMsg(object: QueryFailedUnbondingsResponseAminoMsg): QueryFailedUnbondingsResponse {
    return QueryFailedUnbondingsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFailedUnbondingsResponseProtoMsg, useInterfaces: boolean = false): QueryFailedUnbondingsResponse {
    return QueryFailedUnbondingsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFailedUnbondingsResponse): Uint8Array {
    return QueryFailedUnbondingsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryFailedUnbondingsResponse): QueryFailedUnbondingsResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryFailedUnbondingsResponse",
      value: QueryFailedUnbondingsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPendingUnbondingsRequest(): QueryPendingUnbondingsRequest {
  return {
    delegatorAddress: ""
  };
}
export const QueryPendingUnbondingsRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryPendingUnbondingsRequest",
  encode(message: QueryPendingUnbondingsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryPendingUnbondingsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingUnbondingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPendingUnbondingsRequest>): QueryPendingUnbondingsRequest {
    const message = createBaseQueryPendingUnbondingsRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
  fromAmino(object: QueryPendingUnbondingsRequestAmino): QueryPendingUnbondingsRequest {
    const message = createBaseQueryPendingUnbondingsRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    return message;
  },
  toAmino(message: QueryPendingUnbondingsRequest, useInterfaces: boolean = false): QueryPendingUnbondingsRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
    return obj;
  },
  fromAminoMsg(object: QueryPendingUnbondingsRequestAminoMsg): QueryPendingUnbondingsRequest {
    return QueryPendingUnbondingsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingUnbondingsRequestProtoMsg, useInterfaces: boolean = false): QueryPendingUnbondingsRequest {
    return QueryPendingUnbondingsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryPendingUnbondingsRequest): Uint8Array {
    return QueryPendingUnbondingsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingUnbondingsRequest): QueryPendingUnbondingsRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryPendingUnbondingsRequest",
      value: QueryPendingUnbondingsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPendingUnbondingsResponse(): QueryPendingUnbondingsResponse {
  return {
    pendingUnbondings: []
  };
}
export const QueryPendingUnbondingsResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryPendingUnbondingsResponse",
  encode(message: QueryPendingUnbondingsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pendingUnbondings) {
      UnbondingEpochCValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryPendingUnbondingsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingUnbondingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pendingUnbondings.push(UnbondingEpochCValue.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPendingUnbondingsResponse>): QueryPendingUnbondingsResponse {
    const message = createBaseQueryPendingUnbondingsResponse();
    message.pendingUnbondings = object.pendingUnbondings?.map(e => UnbondingEpochCValue.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryPendingUnbondingsResponseAmino): QueryPendingUnbondingsResponse {
    const message = createBaseQueryPendingUnbondingsResponse();
    message.pendingUnbondings = object.pending_unbondings?.map(e => UnbondingEpochCValue.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryPendingUnbondingsResponse, useInterfaces: boolean = false): QueryPendingUnbondingsResponseAmino {
    const obj: any = {};
    if (message.pendingUnbondings) {
      obj.pending_unbondings = message.pendingUnbondings.map(e => e ? UnbondingEpochCValue.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pending_unbondings = message.pendingUnbondings;
    }
    return obj;
  },
  fromAminoMsg(object: QueryPendingUnbondingsResponseAminoMsg): QueryPendingUnbondingsResponse {
    return QueryPendingUnbondingsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingUnbondingsResponseProtoMsg, useInterfaces: boolean = false): QueryPendingUnbondingsResponse {
    return QueryPendingUnbondingsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryPendingUnbondingsResponse): Uint8Array {
    return QueryPendingUnbondingsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingUnbondingsResponse): QueryPendingUnbondingsResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryPendingUnbondingsResponse",
      value: QueryPendingUnbondingsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUnbondingEpochCValueRequest(): QueryUnbondingEpochCValueRequest {
  return {
    epochNumber: BigInt(0)
  };
}
export const QueryUnbondingEpochCValueRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryUnbondingEpochCValueRequest",
  encode(message: QueryUnbondingEpochCValueRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(8).int64(message.epochNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnbondingEpochCValueRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnbondingEpochCValueRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochNumber = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUnbondingEpochCValueRequest>): QueryUnbondingEpochCValueRequest {
    const message = createBaseQueryUnbondingEpochCValueRequest();
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryUnbondingEpochCValueRequestAmino): QueryUnbondingEpochCValueRequest {
    const message = createBaseQueryUnbondingEpochCValueRequest();
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    return message;
  },
  toAmino(message: QueryUnbondingEpochCValueRequest, useInterfaces: boolean = false): QueryUnbondingEpochCValueRequestAmino {
    const obj: any = {};
    obj.epoch_number = message.epochNumber !== BigInt(0) ? message.epochNumber.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryUnbondingEpochCValueRequestAminoMsg): QueryUnbondingEpochCValueRequest {
    return QueryUnbondingEpochCValueRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUnbondingEpochCValueRequestProtoMsg, useInterfaces: boolean = false): QueryUnbondingEpochCValueRequest {
    return QueryUnbondingEpochCValueRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnbondingEpochCValueRequest): Uint8Array {
    return QueryUnbondingEpochCValueRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUnbondingEpochCValueRequest): QueryUnbondingEpochCValueRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryUnbondingEpochCValueRequest",
      value: QueryUnbondingEpochCValueRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUnbondingEpochCValueResponse(): QueryUnbondingEpochCValueResponse {
  return {
    unbondingEpochCValue: UnbondingEpochCValue.fromPartial({})
  };
}
export const QueryUnbondingEpochCValueResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryUnbondingEpochCValueResponse",
  encode(message: QueryUnbondingEpochCValueResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.unbondingEpochCValue !== undefined) {
      UnbondingEpochCValue.encode(message.unbondingEpochCValue, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnbondingEpochCValueResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnbondingEpochCValueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbondingEpochCValue = UnbondingEpochCValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUnbondingEpochCValueResponse>): QueryUnbondingEpochCValueResponse {
    const message = createBaseQueryUnbondingEpochCValueResponse();
    message.unbondingEpochCValue = object.unbondingEpochCValue !== undefined && object.unbondingEpochCValue !== null ? UnbondingEpochCValue.fromPartial(object.unbondingEpochCValue) : undefined;
    return message;
  },
  fromAmino(object: QueryUnbondingEpochCValueResponseAmino): QueryUnbondingEpochCValueResponse {
    const message = createBaseQueryUnbondingEpochCValueResponse();
    if (object.unbonding_epoch_c_value !== undefined && object.unbonding_epoch_c_value !== null) {
      message.unbondingEpochCValue = UnbondingEpochCValue.fromAmino(object.unbonding_epoch_c_value);
    }
    return message;
  },
  toAmino(message: QueryUnbondingEpochCValueResponse, useInterfaces: boolean = false): QueryUnbondingEpochCValueResponseAmino {
    const obj: any = {};
    obj.unbonding_epoch_c_value = message.unbondingEpochCValue ? UnbondingEpochCValue.toAmino(message.unbondingEpochCValue, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryUnbondingEpochCValueResponseAminoMsg): QueryUnbondingEpochCValueResponse {
    return QueryUnbondingEpochCValueResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUnbondingEpochCValueResponseProtoMsg, useInterfaces: boolean = false): QueryUnbondingEpochCValueResponse {
    return QueryUnbondingEpochCValueResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnbondingEpochCValueResponse): Uint8Array {
    return QueryUnbondingEpochCValueResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUnbondingEpochCValueResponse): QueryUnbondingEpochCValueResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryUnbondingEpochCValueResponse",
      value: QueryUnbondingEpochCValueResponse.encode(message).finish()
    };
  }
};
function createBaseQueryHostAccountUndelegationRequest(): QueryHostAccountUndelegationRequest {
  return {
    epochNumber: BigInt(0)
  };
}
export const QueryHostAccountUndelegationRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountUndelegationRequest",
  encode(message: QueryHostAccountUndelegationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(8).int64(message.epochNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostAccountUndelegationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostAccountUndelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochNumber = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryHostAccountUndelegationRequest>): QueryHostAccountUndelegationRequest {
    const message = createBaseQueryHostAccountUndelegationRequest();
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryHostAccountUndelegationRequestAmino): QueryHostAccountUndelegationRequest {
    const message = createBaseQueryHostAccountUndelegationRequest();
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    return message;
  },
  toAmino(message: QueryHostAccountUndelegationRequest, useInterfaces: boolean = false): QueryHostAccountUndelegationRequestAmino {
    const obj: any = {};
    obj.epoch_number = message.epochNumber !== BigInt(0) ? message.epochNumber.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryHostAccountUndelegationRequestAminoMsg): QueryHostAccountUndelegationRequest {
    return QueryHostAccountUndelegationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostAccountUndelegationRequestProtoMsg, useInterfaces: boolean = false): QueryHostAccountUndelegationRequest {
    return QueryHostAccountUndelegationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostAccountUndelegationRequest): Uint8Array {
    return QueryHostAccountUndelegationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryHostAccountUndelegationRequest): QueryHostAccountUndelegationRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountUndelegationRequest",
      value: QueryHostAccountUndelegationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryHostAccountUndelegationResponse(): QueryHostAccountUndelegationResponse {
  return {
    hostAccountUndelegation: HostAccountUndelegation.fromPartial({})
  };
}
export const QueryHostAccountUndelegationResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountUndelegationResponse",
  encode(message: QueryHostAccountUndelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostAccountUndelegation !== undefined) {
      HostAccountUndelegation.encode(message.hostAccountUndelegation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostAccountUndelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostAccountUndelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostAccountUndelegation = HostAccountUndelegation.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryHostAccountUndelegationResponse>): QueryHostAccountUndelegationResponse {
    const message = createBaseQueryHostAccountUndelegationResponse();
    message.hostAccountUndelegation = object.hostAccountUndelegation !== undefined && object.hostAccountUndelegation !== null ? HostAccountUndelegation.fromPartial(object.hostAccountUndelegation) : undefined;
    return message;
  },
  fromAmino(object: QueryHostAccountUndelegationResponseAmino): QueryHostAccountUndelegationResponse {
    const message = createBaseQueryHostAccountUndelegationResponse();
    if (object.host_account_undelegation !== undefined && object.host_account_undelegation !== null) {
      message.hostAccountUndelegation = HostAccountUndelegation.fromAmino(object.host_account_undelegation);
    }
    return message;
  },
  toAmino(message: QueryHostAccountUndelegationResponse, useInterfaces: boolean = false): QueryHostAccountUndelegationResponseAmino {
    const obj: any = {};
    obj.host_account_undelegation = message.hostAccountUndelegation ? HostAccountUndelegation.toAmino(message.hostAccountUndelegation, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryHostAccountUndelegationResponseAminoMsg): QueryHostAccountUndelegationResponse {
    return QueryHostAccountUndelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostAccountUndelegationResponseProtoMsg, useInterfaces: boolean = false): QueryHostAccountUndelegationResponse {
    return QueryHostAccountUndelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostAccountUndelegationResponse): Uint8Array {
    return QueryHostAccountUndelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryHostAccountUndelegationResponse): QueryHostAccountUndelegationResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountUndelegationResponse",
      value: QueryHostAccountUndelegationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDelegatorUnbondingEpochEntryRequest(): QueryDelegatorUnbondingEpochEntryRequest {
  return {
    delegatorAddress: "",
    epochNumber: BigInt(0)
  };
}
export const QueryDelegatorUnbondingEpochEntryRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegatorUnbondingEpochEntryRequest",
  encode(message: QueryDelegatorUnbondingEpochEntryRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(16).int64(message.epochNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDelegatorUnbondingEpochEntryRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorUnbondingEpochEntryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        case 2:
          message.epochNumber = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDelegatorUnbondingEpochEntryRequest>): QueryDelegatorUnbondingEpochEntryRequest {
    const message = createBaseQueryDelegatorUnbondingEpochEntryRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryDelegatorUnbondingEpochEntryRequestAmino): QueryDelegatorUnbondingEpochEntryRequest {
    const message = createBaseQueryDelegatorUnbondingEpochEntryRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    return message;
  },
  toAmino(message: QueryDelegatorUnbondingEpochEntryRequest, useInterfaces: boolean = false): QueryDelegatorUnbondingEpochEntryRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
    obj.epoch_number = message.epochNumber !== BigInt(0) ? message.epochNumber.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDelegatorUnbondingEpochEntryRequestAminoMsg): QueryDelegatorUnbondingEpochEntryRequest {
    return QueryDelegatorUnbondingEpochEntryRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDelegatorUnbondingEpochEntryRequestProtoMsg, useInterfaces: boolean = false): QueryDelegatorUnbondingEpochEntryRequest {
    return QueryDelegatorUnbondingEpochEntryRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDelegatorUnbondingEpochEntryRequest): Uint8Array {
    return QueryDelegatorUnbondingEpochEntryRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDelegatorUnbondingEpochEntryRequest): QueryDelegatorUnbondingEpochEntryRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegatorUnbondingEpochEntryRequest",
      value: QueryDelegatorUnbondingEpochEntryRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDelegatorUnbondingEpochEntryResponse(): QueryDelegatorUnbondingEpochEntryResponse {
  return {
    delegatorUnbodingEpochEntry: DelegatorUnbondingEpochEntry.fromPartial({})
  };
}
export const QueryDelegatorUnbondingEpochEntryResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegatorUnbondingEpochEntryResponse",
  encode(message: QueryDelegatorUnbondingEpochEntryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorUnbodingEpochEntry !== undefined) {
      DelegatorUnbondingEpochEntry.encode(message.delegatorUnbodingEpochEntry, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDelegatorUnbondingEpochEntryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorUnbondingEpochEntryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorUnbodingEpochEntry = DelegatorUnbondingEpochEntry.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDelegatorUnbondingEpochEntryResponse>): QueryDelegatorUnbondingEpochEntryResponse {
    const message = createBaseQueryDelegatorUnbondingEpochEntryResponse();
    message.delegatorUnbodingEpochEntry = object.delegatorUnbodingEpochEntry !== undefined && object.delegatorUnbodingEpochEntry !== null ? DelegatorUnbondingEpochEntry.fromPartial(object.delegatorUnbodingEpochEntry) : undefined;
    return message;
  },
  fromAmino(object: QueryDelegatorUnbondingEpochEntryResponseAmino): QueryDelegatorUnbondingEpochEntryResponse {
    const message = createBaseQueryDelegatorUnbondingEpochEntryResponse();
    if (object.delegator_unboding_epoch_entry !== undefined && object.delegator_unboding_epoch_entry !== null) {
      message.delegatorUnbodingEpochEntry = DelegatorUnbondingEpochEntry.fromAmino(object.delegator_unboding_epoch_entry);
    }
    return message;
  },
  toAmino(message: QueryDelegatorUnbondingEpochEntryResponse, useInterfaces: boolean = false): QueryDelegatorUnbondingEpochEntryResponseAmino {
    const obj: any = {};
    obj.delegator_unboding_epoch_entry = message.delegatorUnbodingEpochEntry ? DelegatorUnbondingEpochEntry.toAmino(message.delegatorUnbodingEpochEntry, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDelegatorUnbondingEpochEntryResponseAminoMsg): QueryDelegatorUnbondingEpochEntryResponse {
    return QueryDelegatorUnbondingEpochEntryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDelegatorUnbondingEpochEntryResponseProtoMsg, useInterfaces: boolean = false): QueryDelegatorUnbondingEpochEntryResponse {
    return QueryDelegatorUnbondingEpochEntryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDelegatorUnbondingEpochEntryResponse): Uint8Array {
    return QueryDelegatorUnbondingEpochEntryResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDelegatorUnbondingEpochEntryResponse): QueryDelegatorUnbondingEpochEntryResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryDelegatorUnbondingEpochEntryResponse",
      value: QueryDelegatorUnbondingEpochEntryResponse.encode(message).finish()
    };
  }
};
function createBaseQueryHostAccountsRequest(): QueryHostAccountsRequest {
  return {};
}
export const QueryHostAccountsRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountsRequest",
  encode(_: QueryHostAccountsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostAccountsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostAccountsRequest();
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
  fromPartial(_: Partial<QueryHostAccountsRequest>): QueryHostAccountsRequest {
    const message = createBaseQueryHostAccountsRequest();
    return message;
  },
  fromAmino(_: QueryHostAccountsRequestAmino): QueryHostAccountsRequest {
    const message = createBaseQueryHostAccountsRequest();
    return message;
  },
  toAmino(_: QueryHostAccountsRequest, useInterfaces: boolean = false): QueryHostAccountsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryHostAccountsRequestAminoMsg): QueryHostAccountsRequest {
    return QueryHostAccountsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostAccountsRequestProtoMsg, useInterfaces: boolean = false): QueryHostAccountsRequest {
    return QueryHostAccountsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostAccountsRequest): Uint8Array {
    return QueryHostAccountsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryHostAccountsRequest): QueryHostAccountsRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountsRequest",
      value: QueryHostAccountsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryHostAccountsResponse(): QueryHostAccountsResponse {
  return {
    hostAccounts: HostAccounts.fromPartial({})
  };
}
export const QueryHostAccountsResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountsResponse",
  encode(message: QueryHostAccountsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostAccounts !== undefined) {
      HostAccounts.encode(message.hostAccounts, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostAccountsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostAccounts = HostAccounts.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryHostAccountsResponse>): QueryHostAccountsResponse {
    const message = createBaseQueryHostAccountsResponse();
    message.hostAccounts = object.hostAccounts !== undefined && object.hostAccounts !== null ? HostAccounts.fromPartial(object.hostAccounts) : undefined;
    return message;
  },
  fromAmino(object: QueryHostAccountsResponseAmino): QueryHostAccountsResponse {
    const message = createBaseQueryHostAccountsResponse();
    if (object.host_accounts !== undefined && object.host_accounts !== null) {
      message.hostAccounts = HostAccounts.fromAmino(object.host_accounts);
    }
    return message;
  },
  toAmino(message: QueryHostAccountsResponse, useInterfaces: boolean = false): QueryHostAccountsResponseAmino {
    const obj: any = {};
    obj.host_accounts = message.hostAccounts ? HostAccounts.toAmino(message.hostAccounts, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryHostAccountsResponseAminoMsg): QueryHostAccountsResponse {
    return QueryHostAccountsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostAccountsResponseProtoMsg, useInterfaces: boolean = false): QueryHostAccountsResponse {
    return QueryHostAccountsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostAccountsResponse): Uint8Array {
    return QueryHostAccountsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryHostAccountsResponse): QueryHostAccountsResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryHostAccountsResponse",
      value: QueryHostAccountsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDepositModuleAccountRequest(): QueryDepositModuleAccountRequest {
  return {};
}
export const QueryDepositModuleAccountRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDepositModuleAccountRequest",
  encode(_: QueryDepositModuleAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDepositModuleAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositModuleAccountRequest();
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
  fromPartial(_: Partial<QueryDepositModuleAccountRequest>): QueryDepositModuleAccountRequest {
    const message = createBaseQueryDepositModuleAccountRequest();
    return message;
  },
  fromAmino(_: QueryDepositModuleAccountRequestAmino): QueryDepositModuleAccountRequest {
    const message = createBaseQueryDepositModuleAccountRequest();
    return message;
  },
  toAmino(_: QueryDepositModuleAccountRequest, useInterfaces: boolean = false): QueryDepositModuleAccountRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryDepositModuleAccountRequestAminoMsg): QueryDepositModuleAccountRequest {
    return QueryDepositModuleAccountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDepositModuleAccountRequestProtoMsg, useInterfaces: boolean = false): QueryDepositModuleAccountRequest {
    return QueryDepositModuleAccountRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDepositModuleAccountRequest): Uint8Array {
    return QueryDepositModuleAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDepositModuleAccountRequest): QueryDepositModuleAccountRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryDepositModuleAccountRequest",
      value: QueryDepositModuleAccountRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDepositModuleAccountResponse(): QueryDepositModuleAccountResponse {
  return {
    balance: Coin.fromPartial({})
  };
}
export const QueryDepositModuleAccountResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryDepositModuleAccountResponse",
  encode(message: QueryDepositModuleAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDepositModuleAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositModuleAccountResponse();
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
  fromPartial(object: Partial<QueryDepositModuleAccountResponse>): QueryDepositModuleAccountResponse {
    const message = createBaseQueryDepositModuleAccountResponse();
    message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
    return message;
  },
  fromAmino(object: QueryDepositModuleAccountResponseAmino): QueryDepositModuleAccountResponse {
    const message = createBaseQueryDepositModuleAccountResponse();
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = Coin.fromAmino(object.balance);
    }
    return message;
  },
  toAmino(message: QueryDepositModuleAccountResponse, useInterfaces: boolean = false): QueryDepositModuleAccountResponseAmino {
    const obj: any = {};
    obj.balance = message.balance ? Coin.toAmino(message.balance, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDepositModuleAccountResponseAminoMsg): QueryDepositModuleAccountResponse {
    return QueryDepositModuleAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDepositModuleAccountResponseProtoMsg, useInterfaces: boolean = false): QueryDepositModuleAccountResponse {
    return QueryDepositModuleAccountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDepositModuleAccountResponse): Uint8Array {
    return QueryDepositModuleAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDepositModuleAccountResponse): QueryDepositModuleAccountResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryDepositModuleAccountResponse",
      value: QueryDepositModuleAccountResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllDelegatorUnbondingEpochEntriesRequest(): QueryAllDelegatorUnbondingEpochEntriesRequest {
  return {
    delegatorAddress: ""
  };
}
export const QueryAllDelegatorUnbondingEpochEntriesRequest = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllDelegatorUnbondingEpochEntriesRequest",
  encode(message: QueryAllDelegatorUnbondingEpochEntriesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllDelegatorUnbondingEpochEntriesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDelegatorUnbondingEpochEntriesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllDelegatorUnbondingEpochEntriesRequest>): QueryAllDelegatorUnbondingEpochEntriesRequest {
    const message = createBaseQueryAllDelegatorUnbondingEpochEntriesRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
  fromAmino(object: QueryAllDelegatorUnbondingEpochEntriesRequestAmino): QueryAllDelegatorUnbondingEpochEntriesRequest {
    const message = createBaseQueryAllDelegatorUnbondingEpochEntriesRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    return message;
  },
  toAmino(message: QueryAllDelegatorUnbondingEpochEntriesRequest, useInterfaces: boolean = false): QueryAllDelegatorUnbondingEpochEntriesRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
    return obj;
  },
  fromAminoMsg(object: QueryAllDelegatorUnbondingEpochEntriesRequestAminoMsg): QueryAllDelegatorUnbondingEpochEntriesRequest {
    return QueryAllDelegatorUnbondingEpochEntriesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllDelegatorUnbondingEpochEntriesRequestProtoMsg, useInterfaces: boolean = false): QueryAllDelegatorUnbondingEpochEntriesRequest {
    return QueryAllDelegatorUnbondingEpochEntriesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllDelegatorUnbondingEpochEntriesRequest): Uint8Array {
    return QueryAllDelegatorUnbondingEpochEntriesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllDelegatorUnbondingEpochEntriesRequest): QueryAllDelegatorUnbondingEpochEntriesRequestProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryAllDelegatorUnbondingEpochEntriesRequest",
      value: QueryAllDelegatorUnbondingEpochEntriesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllDelegatorUnbondingEpochEntriesResponse(): QueryAllDelegatorUnbondingEpochEntriesResponse {
  return {
    delegatorUnbondingEpochEntries: []
  };
}
export const QueryAllDelegatorUnbondingEpochEntriesResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.QueryAllDelegatorUnbondingEpochEntriesResponse",
  encode(message: QueryAllDelegatorUnbondingEpochEntriesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.delegatorUnbondingEpochEntries) {
      DelegatorUnbondingEpochEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllDelegatorUnbondingEpochEntriesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDelegatorUnbondingEpochEntriesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorUnbondingEpochEntries.push(DelegatorUnbondingEpochEntry.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllDelegatorUnbondingEpochEntriesResponse>): QueryAllDelegatorUnbondingEpochEntriesResponse {
    const message = createBaseQueryAllDelegatorUnbondingEpochEntriesResponse();
    message.delegatorUnbondingEpochEntries = object.delegatorUnbondingEpochEntries?.map(e => DelegatorUnbondingEpochEntry.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllDelegatorUnbondingEpochEntriesResponseAmino): QueryAllDelegatorUnbondingEpochEntriesResponse {
    const message = createBaseQueryAllDelegatorUnbondingEpochEntriesResponse();
    message.delegatorUnbondingEpochEntries = object.delegator_unbonding_epoch_entries?.map(e => DelegatorUnbondingEpochEntry.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllDelegatorUnbondingEpochEntriesResponse, useInterfaces: boolean = false): QueryAllDelegatorUnbondingEpochEntriesResponseAmino {
    const obj: any = {};
    if (message.delegatorUnbondingEpochEntries) {
      obj.delegator_unbonding_epoch_entries = message.delegatorUnbondingEpochEntries.map(e => e ? DelegatorUnbondingEpochEntry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.delegator_unbonding_epoch_entries = message.delegatorUnbondingEpochEntries;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllDelegatorUnbondingEpochEntriesResponseAminoMsg): QueryAllDelegatorUnbondingEpochEntriesResponse {
    return QueryAllDelegatorUnbondingEpochEntriesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllDelegatorUnbondingEpochEntriesResponseProtoMsg, useInterfaces: boolean = false): QueryAllDelegatorUnbondingEpochEntriesResponse {
    return QueryAllDelegatorUnbondingEpochEntriesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllDelegatorUnbondingEpochEntriesResponse): Uint8Array {
    return QueryAllDelegatorUnbondingEpochEntriesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllDelegatorUnbondingEpochEntriesResponse): QueryAllDelegatorUnbondingEpochEntriesResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.QueryAllDelegatorUnbondingEpochEntriesResponse",
      value: QueryAllDelegatorUnbondingEpochEntriesResponse.encode(message).finish()
    };
  }
};