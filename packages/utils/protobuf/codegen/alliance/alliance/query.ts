//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { AllianceAsset, AllianceAssetAmino, AllianceAssetSDKType } from "./alliance";
import { Delegation, DelegationAmino, DelegationSDKType } from "./delegations";
import { Coin, CoinAmino, CoinSDKType, DecCoin, DecCoinAmino, DecCoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { UnbondingDelegation, UnbondingDelegationAmino, UnbondingDelegationSDKType } from "./unbonding";
import { RedelegationEntry, RedelegationEntryAmino, RedelegationEntrySDKType } from "./redelegations";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryParamsRequest";
  value: Uint8Array;
}
/** Params */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/alliance.alliance.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** Params */
export interface QueryParamsRequestSDKType {}
export interface QueryParamsResponse {
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryParamsResponse";
  value: Uint8Array;
}
export interface QueryParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/alliance.alliance.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/** Alliances */
export interface QueryAlliancesRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAlliancesRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAlliancesRequest";
  value: Uint8Array;
}
/** Alliances */
export interface QueryAlliancesRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAlliancesRequestAminoMsg {
  type: "/alliance.alliance.QueryAlliancesRequest";
  value: QueryAlliancesRequestAmino;
}
/** Alliances */
export interface QueryAlliancesRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAlliancesResponse {
  alliances: AllianceAsset[];
  pagination?: PageResponse | undefined;
}
export interface QueryAlliancesResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAlliancesResponse";
  value: Uint8Array;
}
export interface QueryAlliancesResponseAmino {
  alliances?: AllianceAssetAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAlliancesResponseAminoMsg {
  type: "/alliance.alliance.QueryAlliancesResponse";
  value: QueryAlliancesResponseAmino;
}
export interface QueryAlliancesResponseSDKType {
  alliances: AllianceAssetSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/** Alliance */
export interface QueryAllianceRequest {
  denom: string;
}
export interface QueryAllianceRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceRequest";
  value: Uint8Array;
}
/** Alliance */
export interface QueryAllianceRequestAmino {
  denom?: string;
}
export interface QueryAllianceRequestAminoMsg {
  type: "/alliance.alliance.QueryAllianceRequest";
  value: QueryAllianceRequestAmino;
}
/** Alliance */
export interface QueryAllianceRequestSDKType {
  denom: string;
}
export interface QueryAllianceResponse {
  alliance?: AllianceAsset | undefined;
}
export interface QueryAllianceResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceResponse";
  value: Uint8Array;
}
export interface QueryAllianceResponseAmino {
  alliance?: AllianceAssetAmino | undefined;
}
export interface QueryAllianceResponseAminoMsg {
  type: "/alliance.alliance.QueryAllianceResponse";
  value: QueryAllianceResponseAmino;
}
export interface QueryAllianceResponseSDKType {
  alliance?: AllianceAssetSDKType | undefined;
}
/** @deprecated */
export interface QueryIBCAllianceRequest {
  hash: string;
}
export interface QueryIBCAllianceRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryIBCAllianceRequest";
  value: Uint8Array;
}
/** @deprecated */
export interface QueryIBCAllianceRequestAmino {
  hash?: string;
}
export interface QueryIBCAllianceRequestAminoMsg {
  type: "/alliance.alliance.QueryIBCAllianceRequest";
  value: QueryIBCAllianceRequestAmino;
}
/** @deprecated */
export interface QueryIBCAllianceRequestSDKType {
  hash: string;
}
export interface QueryAllianceValidatorRequest {
  validatorAddr: string;
}
export interface QueryAllianceValidatorRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceValidatorRequest";
  value: Uint8Array;
}
export interface QueryAllianceValidatorRequestAmino {
  validator_addr?: string;
}
export interface QueryAllianceValidatorRequestAminoMsg {
  type: "/alliance.alliance.QueryAllianceValidatorRequest";
  value: QueryAllianceValidatorRequestAmino;
}
export interface QueryAllianceValidatorRequestSDKType {
  validator_addr: string;
}
export interface QueryAllAllianceValidatorsRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllAllianceValidatorsRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllAllianceValidatorsRequest";
  value: Uint8Array;
}
export interface QueryAllAllianceValidatorsRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllAllianceValidatorsRequestAminoMsg {
  type: "/alliance.alliance.QueryAllAllianceValidatorsRequest";
  value: QueryAllAllianceValidatorsRequestAmino;
}
export interface QueryAllAllianceValidatorsRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllAlliancesDelegationsRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllAlliancesDelegationsRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllAlliancesDelegationsRequest";
  value: Uint8Array;
}
export interface QueryAllAlliancesDelegationsRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllAlliancesDelegationsRequestAminoMsg {
  type: "/alliance.alliance.QueryAllAlliancesDelegationsRequest";
  value: QueryAllAlliancesDelegationsRequestAmino;
}
export interface QueryAllAlliancesDelegationsRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
/** AlliancesDelegation */
export interface QueryAlliancesDelegationsRequest {
  delegatorAddr: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAlliancesDelegationsRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAlliancesDelegationsRequest";
  value: Uint8Array;
}
/** AlliancesDelegation */
export interface QueryAlliancesDelegationsRequestAmino {
  delegator_addr?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAlliancesDelegationsRequestAminoMsg {
  type: "/alliance.alliance.QueryAlliancesDelegationsRequest";
  value: QueryAlliancesDelegationsRequestAmino;
}
/** AlliancesDelegation */
export interface QueryAlliancesDelegationsRequestSDKType {
  delegator_addr: string;
  pagination?: PageRequestSDKType | undefined;
}
/** AlliancesDelegationByValidator */
export interface QueryAlliancesDelegationByValidatorRequest {
  delegatorAddr: string;
  validatorAddr: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAlliancesDelegationByValidatorRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAlliancesDelegationByValidatorRequest";
  value: Uint8Array;
}
/** AlliancesDelegationByValidator */
export interface QueryAlliancesDelegationByValidatorRequestAmino {
  delegator_addr?: string;
  validator_addr?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAlliancesDelegationByValidatorRequestAminoMsg {
  type: "/alliance.alliance.QueryAlliancesDelegationByValidatorRequest";
  value: QueryAlliancesDelegationByValidatorRequestAmino;
}
/** AlliancesDelegationByValidator */
export interface QueryAlliancesDelegationByValidatorRequestSDKType {
  delegator_addr: string;
  validator_addr: string;
  pagination?: PageRequestSDKType | undefined;
}
/**
 * DelegationResponse is equivalent to Delegation except that it contains a
 * balance in addition to shares which is more suitable for client responses.
 */
export interface DelegationResponse {
  delegation: Delegation | undefined;
  balance: Coin | undefined;
}
export interface DelegationResponseProtoMsg {
  typeUrl: "/alliance.alliance.DelegationResponse";
  value: Uint8Array;
}
/**
 * DelegationResponse is equivalent to Delegation except that it contains a
 * balance in addition to shares which is more suitable for client responses.
 */
export interface DelegationResponseAmino {
  delegation?: DelegationAmino | undefined;
  balance?: CoinAmino | undefined;
}
export interface DelegationResponseAminoMsg {
  type: "/alliance.alliance.DelegationResponse";
  value: DelegationResponseAmino;
}
/**
 * DelegationResponse is equivalent to Delegation except that it contains a
 * balance in addition to shares which is more suitable for client responses.
 */
export interface DelegationResponseSDKType {
  delegation: DelegationSDKType | undefined;
  balance: CoinSDKType | undefined;
}
export interface QueryAlliancesDelegationsResponse {
  delegations: DelegationResponse[];
  pagination?: PageResponse | undefined;
}
export interface QueryAlliancesDelegationsResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAlliancesDelegationsResponse";
  value: Uint8Array;
}
export interface QueryAlliancesDelegationsResponseAmino {
  delegations?: DelegationResponseAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAlliancesDelegationsResponseAminoMsg {
  type: "/alliance.alliance.QueryAlliancesDelegationsResponse";
  value: QueryAlliancesDelegationsResponseAmino;
}
export interface QueryAlliancesDelegationsResponseSDKType {
  delegations: DelegationResponseSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/** AllianceDelegation */
export interface QueryAllianceDelegationRequest {
  delegatorAddr: string;
  validatorAddr: string;
  denom: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAllianceDelegationRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceDelegationRequest";
  value: Uint8Array;
}
/** AllianceDelegation */
export interface QueryAllianceDelegationRequestAmino {
  delegator_addr?: string;
  validator_addr?: string;
  denom?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllianceDelegationRequestAminoMsg {
  type: "/alliance.alliance.QueryAllianceDelegationRequest";
  value: QueryAllianceDelegationRequestAmino;
}
/** AllianceDelegation */
export interface QueryAllianceDelegationRequestSDKType {
  delegator_addr: string;
  validator_addr: string;
  denom: string;
  pagination?: PageRequestSDKType | undefined;
}
/** @deprecated */
export interface QueryIBCAllianceDelegationRequest {
  delegatorAddr: string;
  validatorAddr: string;
  hash: string;
  pagination?: PageRequest | undefined;
}
export interface QueryIBCAllianceDelegationRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryIBCAllianceDelegationRequest";
  value: Uint8Array;
}
/** @deprecated */
export interface QueryIBCAllianceDelegationRequestAmino {
  delegator_addr?: string;
  validator_addr?: string;
  hash?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryIBCAllianceDelegationRequestAminoMsg {
  type: "/alliance.alliance.QueryIBCAllianceDelegationRequest";
  value: QueryIBCAllianceDelegationRequestAmino;
}
/** @deprecated */
export interface QueryIBCAllianceDelegationRequestSDKType {
  delegator_addr: string;
  validator_addr: string;
  hash: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllianceDelegationResponse {
  delegation: DelegationResponse | undefined;
}
export interface QueryAllianceDelegationResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceDelegationResponse";
  value: Uint8Array;
}
export interface QueryAllianceDelegationResponseAmino {
  delegation?: DelegationResponseAmino | undefined;
}
export interface QueryAllianceDelegationResponseAminoMsg {
  type: "/alliance.alliance.QueryAllianceDelegationResponse";
  value: QueryAllianceDelegationResponseAmino;
}
export interface QueryAllianceDelegationResponseSDKType {
  delegation: DelegationResponseSDKType | undefined;
}
/** AllianceDelegation */
export interface QueryAllianceDelegationRewardsRequest {
  delegatorAddr: string;
  validatorAddr: string;
  denom: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAllianceDelegationRewardsRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceDelegationRewardsRequest";
  value: Uint8Array;
}
/** AllianceDelegation */
export interface QueryAllianceDelegationRewardsRequestAmino {
  delegator_addr?: string;
  validator_addr?: string;
  denom?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllianceDelegationRewardsRequestAminoMsg {
  type: "/alliance.alliance.QueryAllianceDelegationRewardsRequest";
  value: QueryAllianceDelegationRewardsRequestAmino;
}
/** AllianceDelegation */
export interface QueryAllianceDelegationRewardsRequestSDKType {
  delegator_addr: string;
  validator_addr: string;
  denom: string;
  pagination?: PageRequestSDKType | undefined;
}
/** @deprecated */
export interface QueryIBCAllianceDelegationRewardsRequest {
  delegatorAddr: string;
  validatorAddr: string;
  hash: string;
  pagination?: PageRequest | undefined;
}
export interface QueryIBCAllianceDelegationRewardsRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryIBCAllianceDelegationRewardsRequest";
  value: Uint8Array;
}
/** @deprecated */
export interface QueryIBCAllianceDelegationRewardsRequestAmino {
  delegator_addr?: string;
  validator_addr?: string;
  hash?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryIBCAllianceDelegationRewardsRequestAminoMsg {
  type: "/alliance.alliance.QueryIBCAllianceDelegationRewardsRequest";
  value: QueryIBCAllianceDelegationRewardsRequestAmino;
}
/** @deprecated */
export interface QueryIBCAllianceDelegationRewardsRequestSDKType {
  delegator_addr: string;
  validator_addr: string;
  hash: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllianceDelegationRewardsResponse {
  rewards: Coin[];
}
export interface QueryAllianceDelegationRewardsResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceDelegationRewardsResponse";
  value: Uint8Array;
}
export interface QueryAllianceDelegationRewardsResponseAmino {
  rewards?: CoinAmino[];
}
export interface QueryAllianceDelegationRewardsResponseAminoMsg {
  type: "/alliance.alliance.QueryAllianceDelegationRewardsResponse";
  value: QueryAllianceDelegationRewardsResponseAmino;
}
export interface QueryAllianceDelegationRewardsResponseSDKType {
  rewards: CoinSDKType[];
}
export interface QueryAllianceValidatorResponse {
  validatorAddr: string;
  totalDelegationShares: DecCoin[];
  validatorShares: DecCoin[];
  totalStaked: DecCoin[];
}
export interface QueryAllianceValidatorResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceValidatorResponse";
  value: Uint8Array;
}
export interface QueryAllianceValidatorResponseAmino {
  validator_addr?: string;
  total_delegation_shares?: DecCoinAmino[];
  validator_shares?: DecCoinAmino[];
  total_staked?: DecCoinAmino[];
}
export interface QueryAllianceValidatorResponseAminoMsg {
  type: "/alliance.alliance.QueryAllianceValidatorResponse";
  value: QueryAllianceValidatorResponseAmino;
}
export interface QueryAllianceValidatorResponseSDKType {
  validator_addr: string;
  total_delegation_shares: DecCoinSDKType[];
  validator_shares: DecCoinSDKType[];
  total_staked: DecCoinSDKType[];
}
export interface QueryAllianceValidatorsResponse {
  validators: QueryAllianceValidatorResponse[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllianceValidatorsResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceValidatorsResponse";
  value: Uint8Array;
}
export interface QueryAllianceValidatorsResponseAmino {
  validators?: QueryAllianceValidatorResponseAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllianceValidatorsResponseAminoMsg {
  type: "/alliance.alliance.QueryAllianceValidatorsResponse";
  value: QueryAllianceValidatorsResponseAmino;
}
export interface QueryAllianceValidatorsResponseSDKType {
  validators: QueryAllianceValidatorResponseSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/** AllianceDelegation */
export interface QueryAllianceUnbondingsByDenomAndDelegatorRequest {
  denom: string;
  delegatorAddr: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAllianceUnbondingsByDenomAndDelegatorRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceUnbondingsByDenomAndDelegatorRequest";
  value: Uint8Array;
}
/** AllianceDelegation */
export interface QueryAllianceUnbondingsByDenomAndDelegatorRequestAmino {
  denom?: string;
  delegator_addr?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllianceUnbondingsByDenomAndDelegatorRequestAminoMsg {
  type: "/alliance.alliance.QueryAllianceUnbondingsByDenomAndDelegatorRequest";
  value: QueryAllianceUnbondingsByDenomAndDelegatorRequestAmino;
}
/** AllianceDelegation */
export interface QueryAllianceUnbondingsByDenomAndDelegatorRequestSDKType {
  denom: string;
  delegator_addr: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllianceUnbondingsByDenomAndDelegatorResponse {
  unbondings: UnbondingDelegation[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllianceUnbondingsByDenomAndDelegatorResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceUnbondingsByDenomAndDelegatorResponse";
  value: Uint8Array;
}
export interface QueryAllianceUnbondingsByDenomAndDelegatorResponseAmino {
  unbondings?: UnbondingDelegationAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllianceUnbondingsByDenomAndDelegatorResponseAminoMsg {
  type: "/alliance.alliance.QueryAllianceUnbondingsByDenomAndDelegatorResponse";
  value: QueryAllianceUnbondingsByDenomAndDelegatorResponseAmino;
}
export interface QueryAllianceUnbondingsByDenomAndDelegatorResponseSDKType {
  unbondings: UnbondingDelegationSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryAllianceUnbondingsRequest {
  denom: string;
  delegatorAddr: string;
  validatorAddr: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAllianceUnbondingsRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceUnbondingsRequest";
  value: Uint8Array;
}
export interface QueryAllianceUnbondingsRequestAmino {
  denom?: string;
  delegator_addr?: string;
  validator_addr?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllianceUnbondingsRequestAminoMsg {
  type: "/alliance.alliance.QueryAllianceUnbondingsRequest";
  value: QueryAllianceUnbondingsRequestAmino;
}
export interface QueryAllianceUnbondingsRequestSDKType {
  denom: string;
  delegator_addr: string;
  validator_addr: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllianceUnbondingsResponse {
  unbondings: UnbondingDelegation[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllianceUnbondingsResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceUnbondingsResponse";
  value: Uint8Array;
}
export interface QueryAllianceUnbondingsResponseAmino {
  unbondings?: UnbondingDelegationAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllianceUnbondingsResponseAminoMsg {
  type: "/alliance.alliance.QueryAllianceUnbondingsResponse";
  value: QueryAllianceUnbondingsResponseAmino;
}
export interface QueryAllianceUnbondingsResponseSDKType {
  unbondings: UnbondingDelegationSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
/** Redelegations */
export interface QueryAllianceRedelegationsRequest {
  denom: string;
  delegatorAddr: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAllianceRedelegationsRequestProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceRedelegationsRequest";
  value: Uint8Array;
}
/** Redelegations */
export interface QueryAllianceRedelegationsRequestAmino {
  denom?: string;
  delegator_addr?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllianceRedelegationsRequestAminoMsg {
  type: "/alliance.alliance.QueryAllianceRedelegationsRequest";
  value: QueryAllianceRedelegationsRequestAmino;
}
/** Redelegations */
export interface QueryAllianceRedelegationsRequestSDKType {
  denom: string;
  delegator_addr: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllianceRedelegationsResponse {
  redelegations: RedelegationEntry[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllianceRedelegationsResponseProtoMsg {
  typeUrl: "/alliance.alliance.QueryAllianceRedelegationsResponse";
  value: Uint8Array;
}
export interface QueryAllianceRedelegationsResponseAmino {
  redelegations?: RedelegationEntryAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllianceRedelegationsResponseAminoMsg {
  type: "/alliance.alliance.QueryAllianceRedelegationsResponse";
  value: QueryAllianceRedelegationsResponseAmino;
}
export interface QueryAllianceRedelegationsResponseSDKType {
  redelegations: RedelegationEntrySDKType[];
  pagination?: PageResponseSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/alliance.alliance.QueryParamsRequest",
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
      typeUrl: "/alliance.alliance.QueryParamsRequest",
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
  typeUrl: "/alliance.alliance.QueryParamsResponse",
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
      typeUrl: "/alliance.alliance.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAlliancesRequest(): QueryAlliancesRequest {
  return {
    pagination: undefined
  };
}
export const QueryAlliancesRequest = {
  typeUrl: "/alliance.alliance.QueryAlliancesRequest",
  encode(message: QueryAlliancesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAlliancesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAlliancesRequest();
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
  fromPartial(object: Partial<QueryAlliancesRequest>): QueryAlliancesRequest {
    const message = createBaseQueryAlliancesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAlliancesRequestAmino): QueryAlliancesRequest {
    const message = createBaseQueryAlliancesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAlliancesRequest, useInterfaces: boolean = false): QueryAlliancesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAlliancesRequestAminoMsg): QueryAlliancesRequest {
    return QueryAlliancesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAlliancesRequestProtoMsg, useInterfaces: boolean = false): QueryAlliancesRequest {
    return QueryAlliancesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAlliancesRequest): Uint8Array {
    return QueryAlliancesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAlliancesRequest): QueryAlliancesRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAlliancesRequest",
      value: QueryAlliancesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAlliancesResponse(): QueryAlliancesResponse {
  return {
    alliances: [],
    pagination: undefined
  };
}
export const QueryAlliancesResponse = {
  typeUrl: "/alliance.alliance.QueryAlliancesResponse",
  encode(message: QueryAlliancesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.alliances) {
      AllianceAsset.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAlliancesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAlliancesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alliances.push(AllianceAsset.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAlliancesResponse>): QueryAlliancesResponse {
    const message = createBaseQueryAlliancesResponse();
    message.alliances = object.alliances?.map(e => AllianceAsset.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAlliancesResponseAmino): QueryAlliancesResponse {
    const message = createBaseQueryAlliancesResponse();
    message.alliances = object.alliances?.map(e => AllianceAsset.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAlliancesResponse, useInterfaces: boolean = false): QueryAlliancesResponseAmino {
    const obj: any = {};
    if (message.alliances) {
      obj.alliances = message.alliances.map(e => e ? AllianceAsset.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.alliances = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAlliancesResponseAminoMsg): QueryAlliancesResponse {
    return QueryAlliancesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAlliancesResponseProtoMsg, useInterfaces: boolean = false): QueryAlliancesResponse {
    return QueryAlliancesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAlliancesResponse): Uint8Array {
    return QueryAlliancesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAlliancesResponse): QueryAlliancesResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAlliancesResponse",
      value: QueryAlliancesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceRequest(): QueryAllianceRequest {
  return {
    denom: ""
  };
}
export const QueryAllianceRequest = {
  typeUrl: "/alliance.alliance.QueryAllianceRequest",
  encode(message: QueryAllianceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllianceRequest>): QueryAllianceRequest {
    const message = createBaseQueryAllianceRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryAllianceRequestAmino): QueryAllianceRequest {
    const message = createBaseQueryAllianceRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryAllianceRequest, useInterfaces: boolean = false): QueryAllianceRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceRequestAminoMsg): QueryAllianceRequest {
    return QueryAllianceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceRequestProtoMsg, useInterfaces: boolean = false): QueryAllianceRequest {
    return QueryAllianceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceRequest): Uint8Array {
    return QueryAllianceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceRequest): QueryAllianceRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceRequest",
      value: QueryAllianceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceResponse(): QueryAllianceResponse {
  return {
    alliance: undefined
  };
}
export const QueryAllianceResponse = {
  typeUrl: "/alliance.alliance.QueryAllianceResponse",
  encode(message: QueryAllianceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.alliance !== undefined) {
      AllianceAsset.encode(message.alliance, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.alliance = AllianceAsset.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllianceResponse>): QueryAllianceResponse {
    const message = createBaseQueryAllianceResponse();
    message.alliance = object.alliance !== undefined && object.alliance !== null ? AllianceAsset.fromPartial(object.alliance) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceResponseAmino): QueryAllianceResponse {
    const message = createBaseQueryAllianceResponse();
    if (object.alliance !== undefined && object.alliance !== null) {
      message.alliance = AllianceAsset.fromAmino(object.alliance);
    }
    return message;
  },
  toAmino(message: QueryAllianceResponse, useInterfaces: boolean = false): QueryAllianceResponseAmino {
    const obj: any = {};
    obj.alliance = message.alliance ? AllianceAsset.toAmino(message.alliance, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceResponseAminoMsg): QueryAllianceResponse {
    return QueryAllianceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceResponseProtoMsg, useInterfaces: boolean = false): QueryAllianceResponse {
    return QueryAllianceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceResponse): Uint8Array {
    return QueryAllianceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceResponse): QueryAllianceResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceResponse",
      value: QueryAllianceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryIBCAllianceRequest(): QueryIBCAllianceRequest {
  return {
    hash: ""
  };
}
export const QueryIBCAllianceRequest = {
  typeUrl: "/alliance.alliance.QueryIBCAllianceRequest",
  encode(message: QueryIBCAllianceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryIBCAllianceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIBCAllianceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryIBCAllianceRequest>): QueryIBCAllianceRequest {
    const message = createBaseQueryIBCAllianceRequest();
    message.hash = object.hash ?? "";
    return message;
  },
  fromAmino(object: QueryIBCAllianceRequestAmino): QueryIBCAllianceRequest {
    const message = createBaseQueryIBCAllianceRequest();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    return message;
  },
  toAmino(message: QueryIBCAllianceRequest, useInterfaces: boolean = false): QueryIBCAllianceRequestAmino {
    const obj: any = {};
    obj.hash = message.hash;
    return obj;
  },
  fromAminoMsg(object: QueryIBCAllianceRequestAminoMsg): QueryIBCAllianceRequest {
    return QueryIBCAllianceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIBCAllianceRequestProtoMsg, useInterfaces: boolean = false): QueryIBCAllianceRequest {
    return QueryIBCAllianceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryIBCAllianceRequest): Uint8Array {
    return QueryIBCAllianceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryIBCAllianceRequest): QueryIBCAllianceRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryIBCAllianceRequest",
      value: QueryIBCAllianceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceValidatorRequest(): QueryAllianceValidatorRequest {
  return {
    validatorAddr: ""
  };
}
export const QueryAllianceValidatorRequest = {
  typeUrl: "/alliance.alliance.QueryAllianceValidatorRequest",
  encode(message: QueryAllianceValidatorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceValidatorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllianceValidatorRequest>): QueryAllianceValidatorRequest {
    const message = createBaseQueryAllianceValidatorRequest();
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
  fromAmino(object: QueryAllianceValidatorRequestAmino): QueryAllianceValidatorRequest {
    const message = createBaseQueryAllianceValidatorRequest();
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    return message;
  },
  toAmino(message: QueryAllianceValidatorRequest, useInterfaces: boolean = false): QueryAllianceValidatorRequestAmino {
    const obj: any = {};
    obj.validator_addr = message.validatorAddr;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceValidatorRequestAminoMsg): QueryAllianceValidatorRequest {
    return QueryAllianceValidatorRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceValidatorRequestProtoMsg, useInterfaces: boolean = false): QueryAllianceValidatorRequest {
    return QueryAllianceValidatorRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceValidatorRequest): Uint8Array {
    return QueryAllianceValidatorRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceValidatorRequest): QueryAllianceValidatorRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceValidatorRequest",
      value: QueryAllianceValidatorRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllAllianceValidatorsRequest(): QueryAllAllianceValidatorsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllAllianceValidatorsRequest = {
  typeUrl: "/alliance.alliance.QueryAllAllianceValidatorsRequest",
  encode(message: QueryAllAllianceValidatorsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllAllianceValidatorsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAllianceValidatorsRequest();
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
  fromPartial(object: Partial<QueryAllAllianceValidatorsRequest>): QueryAllAllianceValidatorsRequest {
    const message = createBaseQueryAllAllianceValidatorsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllAllianceValidatorsRequestAmino): QueryAllAllianceValidatorsRequest {
    const message = createBaseQueryAllAllianceValidatorsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllAllianceValidatorsRequest, useInterfaces: boolean = false): QueryAllAllianceValidatorsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllAllianceValidatorsRequestAminoMsg): QueryAllAllianceValidatorsRequest {
    return QueryAllAllianceValidatorsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllAllianceValidatorsRequestProtoMsg, useInterfaces: boolean = false): QueryAllAllianceValidatorsRequest {
    return QueryAllAllianceValidatorsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllAllianceValidatorsRequest): Uint8Array {
    return QueryAllAllianceValidatorsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllAllianceValidatorsRequest): QueryAllAllianceValidatorsRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllAllianceValidatorsRequest",
      value: QueryAllAllianceValidatorsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllAlliancesDelegationsRequest(): QueryAllAlliancesDelegationsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllAlliancesDelegationsRequest = {
  typeUrl: "/alliance.alliance.QueryAllAlliancesDelegationsRequest",
  encode(message: QueryAllAlliancesDelegationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllAlliancesDelegationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAlliancesDelegationsRequest();
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
  fromPartial(object: Partial<QueryAllAlliancesDelegationsRequest>): QueryAllAlliancesDelegationsRequest {
    const message = createBaseQueryAllAlliancesDelegationsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllAlliancesDelegationsRequestAmino): QueryAllAlliancesDelegationsRequest {
    const message = createBaseQueryAllAlliancesDelegationsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllAlliancesDelegationsRequest, useInterfaces: boolean = false): QueryAllAlliancesDelegationsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllAlliancesDelegationsRequestAminoMsg): QueryAllAlliancesDelegationsRequest {
    return QueryAllAlliancesDelegationsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllAlliancesDelegationsRequestProtoMsg, useInterfaces: boolean = false): QueryAllAlliancesDelegationsRequest {
    return QueryAllAlliancesDelegationsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllAlliancesDelegationsRequest): Uint8Array {
    return QueryAllAlliancesDelegationsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllAlliancesDelegationsRequest): QueryAllAlliancesDelegationsRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllAlliancesDelegationsRequest",
      value: QueryAllAlliancesDelegationsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAlliancesDelegationsRequest(): QueryAlliancesDelegationsRequest {
  return {
    delegatorAddr: "",
    pagination: undefined
  };
}
export const QueryAlliancesDelegationsRequest = {
  typeUrl: "/alliance.alliance.QueryAlliancesDelegationsRequest",
  encode(message: QueryAlliancesDelegationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAlliancesDelegationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAlliancesDelegationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddr = reader.string();
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
  fromPartial(object: Partial<QueryAlliancesDelegationsRequest>): QueryAlliancesDelegationsRequest {
    const message = createBaseQueryAlliancesDelegationsRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAlliancesDelegationsRequestAmino): QueryAlliancesDelegationsRequest {
    const message = createBaseQueryAlliancesDelegationsRequest();
    if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
      message.delegatorAddr = object.delegator_addr;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAlliancesDelegationsRequest, useInterfaces: boolean = false): QueryAlliancesDelegationsRequestAmino {
    const obj: any = {};
    obj.delegator_addr = message.delegatorAddr;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAlliancesDelegationsRequestAminoMsg): QueryAlliancesDelegationsRequest {
    return QueryAlliancesDelegationsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAlliancesDelegationsRequestProtoMsg, useInterfaces: boolean = false): QueryAlliancesDelegationsRequest {
    return QueryAlliancesDelegationsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAlliancesDelegationsRequest): Uint8Array {
    return QueryAlliancesDelegationsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAlliancesDelegationsRequest): QueryAlliancesDelegationsRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAlliancesDelegationsRequest",
      value: QueryAlliancesDelegationsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAlliancesDelegationByValidatorRequest(): QueryAlliancesDelegationByValidatorRequest {
  return {
    delegatorAddr: "",
    validatorAddr: "",
    pagination: undefined
  };
}
export const QueryAlliancesDelegationByValidatorRequest = {
  typeUrl: "/alliance.alliance.QueryAlliancesDelegationByValidatorRequest",
  encode(message: QueryAlliancesDelegationByValidatorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.validatorAddr !== "") {
      writer.uint32(18).string(message.validatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAlliancesDelegationByValidatorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAlliancesDelegationByValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddr = reader.string();
          break;
        case 2:
          message.validatorAddr = reader.string();
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
  fromPartial(object: Partial<QueryAlliancesDelegationByValidatorRequest>): QueryAlliancesDelegationByValidatorRequest {
    const message = createBaseQueryAlliancesDelegationByValidatorRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.validatorAddr = object.validatorAddr ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAlliancesDelegationByValidatorRequestAmino): QueryAlliancesDelegationByValidatorRequest {
    const message = createBaseQueryAlliancesDelegationByValidatorRequest();
    if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
      message.delegatorAddr = object.delegator_addr;
    }
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAlliancesDelegationByValidatorRequest, useInterfaces: boolean = false): QueryAlliancesDelegationByValidatorRequestAmino {
    const obj: any = {};
    obj.delegator_addr = message.delegatorAddr;
    obj.validator_addr = message.validatorAddr;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAlliancesDelegationByValidatorRequestAminoMsg): QueryAlliancesDelegationByValidatorRequest {
    return QueryAlliancesDelegationByValidatorRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAlliancesDelegationByValidatorRequestProtoMsg, useInterfaces: boolean = false): QueryAlliancesDelegationByValidatorRequest {
    return QueryAlliancesDelegationByValidatorRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAlliancesDelegationByValidatorRequest): Uint8Array {
    return QueryAlliancesDelegationByValidatorRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAlliancesDelegationByValidatorRequest): QueryAlliancesDelegationByValidatorRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAlliancesDelegationByValidatorRequest",
      value: QueryAlliancesDelegationByValidatorRequest.encode(message).finish()
    };
  }
};
function createBaseDelegationResponse(): DelegationResponse {
  return {
    delegation: Delegation.fromPartial({}),
    balance: Coin.fromPartial({})
  };
}
export const DelegationResponse = {
  typeUrl: "/alliance.alliance.DelegationResponse",
  encode(message: DelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegation !== undefined) {
      Delegation.encode(message.delegation, writer.uint32(10).fork()).ldelim();
    }
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegation = Delegation.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.balance = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DelegationResponse>): DelegationResponse {
    const message = createBaseDelegationResponse();
    message.delegation = object.delegation !== undefined && object.delegation !== null ? Delegation.fromPartial(object.delegation) : undefined;
    message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
    return message;
  },
  fromAmino(object: DelegationResponseAmino): DelegationResponse {
    const message = createBaseDelegationResponse();
    if (object.delegation !== undefined && object.delegation !== null) {
      message.delegation = Delegation.fromAmino(object.delegation);
    }
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = Coin.fromAmino(object.balance);
    }
    return message;
  },
  toAmino(message: DelegationResponse, useInterfaces: boolean = false): DelegationResponseAmino {
    const obj: any = {};
    obj.delegation = message.delegation ? Delegation.toAmino(message.delegation, useInterfaces) : undefined;
    obj.balance = message.balance ? Coin.toAmino(message.balance, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: DelegationResponseAminoMsg): DelegationResponse {
    return DelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegationResponseProtoMsg, useInterfaces: boolean = false): DelegationResponse {
    return DelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegationResponse): Uint8Array {
    return DelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: DelegationResponse): DelegationResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.DelegationResponse",
      value: DelegationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAlliancesDelegationsResponse(): QueryAlliancesDelegationsResponse {
  return {
    delegations: [],
    pagination: undefined
  };
}
export const QueryAlliancesDelegationsResponse = {
  typeUrl: "/alliance.alliance.QueryAlliancesDelegationsResponse",
  encode(message: QueryAlliancesDelegationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.delegations) {
      DelegationResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAlliancesDelegationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAlliancesDelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegations.push(DelegationResponse.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAlliancesDelegationsResponse>): QueryAlliancesDelegationsResponse {
    const message = createBaseQueryAlliancesDelegationsResponse();
    message.delegations = object.delegations?.map(e => DelegationResponse.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAlliancesDelegationsResponseAmino): QueryAlliancesDelegationsResponse {
    const message = createBaseQueryAlliancesDelegationsResponse();
    message.delegations = object.delegations?.map(e => DelegationResponse.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAlliancesDelegationsResponse, useInterfaces: boolean = false): QueryAlliancesDelegationsResponseAmino {
    const obj: any = {};
    if (message.delegations) {
      obj.delegations = message.delegations.map(e => e ? DelegationResponse.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.delegations = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAlliancesDelegationsResponseAminoMsg): QueryAlliancesDelegationsResponse {
    return QueryAlliancesDelegationsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAlliancesDelegationsResponseProtoMsg, useInterfaces: boolean = false): QueryAlliancesDelegationsResponse {
    return QueryAlliancesDelegationsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAlliancesDelegationsResponse): Uint8Array {
    return QueryAlliancesDelegationsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAlliancesDelegationsResponse): QueryAlliancesDelegationsResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAlliancesDelegationsResponse",
      value: QueryAlliancesDelegationsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceDelegationRequest(): QueryAllianceDelegationRequest {
  return {
    delegatorAddr: "",
    validatorAddr: "",
    denom: "",
    pagination: undefined
  };
}
export const QueryAllianceDelegationRequest = {
  typeUrl: "/alliance.alliance.QueryAllianceDelegationRequest",
  encode(message: QueryAllianceDelegationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.validatorAddr !== "") {
      writer.uint32(18).string(message.validatorAddr);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceDelegationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceDelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddr = reader.string();
          break;
        case 2:
          message.validatorAddr = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        case 4:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllianceDelegationRequest>): QueryAllianceDelegationRequest {
    const message = createBaseQueryAllianceDelegationRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.validatorAddr = object.validatorAddr ?? "";
    message.denom = object.denom ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceDelegationRequestAmino): QueryAllianceDelegationRequest {
    const message = createBaseQueryAllianceDelegationRequest();
    if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
      message.delegatorAddr = object.delegator_addr;
    }
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllianceDelegationRequest, useInterfaces: boolean = false): QueryAllianceDelegationRequestAmino {
    const obj: any = {};
    obj.delegator_addr = message.delegatorAddr;
    obj.validator_addr = message.validatorAddr;
    obj.denom = message.denom;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceDelegationRequestAminoMsg): QueryAllianceDelegationRequest {
    return QueryAllianceDelegationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceDelegationRequestProtoMsg, useInterfaces: boolean = false): QueryAllianceDelegationRequest {
    return QueryAllianceDelegationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceDelegationRequest): Uint8Array {
    return QueryAllianceDelegationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceDelegationRequest): QueryAllianceDelegationRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceDelegationRequest",
      value: QueryAllianceDelegationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryIBCAllianceDelegationRequest(): QueryIBCAllianceDelegationRequest {
  return {
    delegatorAddr: "",
    validatorAddr: "",
    hash: "",
    pagination: undefined
  };
}
export const QueryIBCAllianceDelegationRequest = {
  typeUrl: "/alliance.alliance.QueryIBCAllianceDelegationRequest",
  encode(message: QueryIBCAllianceDelegationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.validatorAddr !== "") {
      writer.uint32(18).string(message.validatorAddr);
    }
    if (message.hash !== "") {
      writer.uint32(26).string(message.hash);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryIBCAllianceDelegationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIBCAllianceDelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddr = reader.string();
          break;
        case 2:
          message.validatorAddr = reader.string();
          break;
        case 3:
          message.hash = reader.string();
          break;
        case 4:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryIBCAllianceDelegationRequest>): QueryIBCAllianceDelegationRequest {
    const message = createBaseQueryIBCAllianceDelegationRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.validatorAddr = object.validatorAddr ?? "";
    message.hash = object.hash ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryIBCAllianceDelegationRequestAmino): QueryIBCAllianceDelegationRequest {
    const message = createBaseQueryIBCAllianceDelegationRequest();
    if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
      message.delegatorAddr = object.delegator_addr;
    }
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryIBCAllianceDelegationRequest, useInterfaces: boolean = false): QueryIBCAllianceDelegationRequestAmino {
    const obj: any = {};
    obj.delegator_addr = message.delegatorAddr;
    obj.validator_addr = message.validatorAddr;
    obj.hash = message.hash;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryIBCAllianceDelegationRequestAminoMsg): QueryIBCAllianceDelegationRequest {
    return QueryIBCAllianceDelegationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIBCAllianceDelegationRequestProtoMsg, useInterfaces: boolean = false): QueryIBCAllianceDelegationRequest {
    return QueryIBCAllianceDelegationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryIBCAllianceDelegationRequest): Uint8Array {
    return QueryIBCAllianceDelegationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryIBCAllianceDelegationRequest): QueryIBCAllianceDelegationRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryIBCAllianceDelegationRequest",
      value: QueryIBCAllianceDelegationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceDelegationResponse(): QueryAllianceDelegationResponse {
  return {
    delegation: DelegationResponse.fromPartial({})
  };
}
export const QueryAllianceDelegationResponse = {
  typeUrl: "/alliance.alliance.QueryAllianceDelegationResponse",
  encode(message: QueryAllianceDelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegation !== undefined) {
      DelegationResponse.encode(message.delegation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceDelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceDelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegation = DelegationResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllianceDelegationResponse>): QueryAllianceDelegationResponse {
    const message = createBaseQueryAllianceDelegationResponse();
    message.delegation = object.delegation !== undefined && object.delegation !== null ? DelegationResponse.fromPartial(object.delegation) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceDelegationResponseAmino): QueryAllianceDelegationResponse {
    const message = createBaseQueryAllianceDelegationResponse();
    if (object.delegation !== undefined && object.delegation !== null) {
      message.delegation = DelegationResponse.fromAmino(object.delegation);
    }
    return message;
  },
  toAmino(message: QueryAllianceDelegationResponse, useInterfaces: boolean = false): QueryAllianceDelegationResponseAmino {
    const obj: any = {};
    obj.delegation = message.delegation ? DelegationResponse.toAmino(message.delegation, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceDelegationResponseAminoMsg): QueryAllianceDelegationResponse {
    return QueryAllianceDelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceDelegationResponseProtoMsg, useInterfaces: boolean = false): QueryAllianceDelegationResponse {
    return QueryAllianceDelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceDelegationResponse): Uint8Array {
    return QueryAllianceDelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceDelegationResponse): QueryAllianceDelegationResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceDelegationResponse",
      value: QueryAllianceDelegationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceDelegationRewardsRequest(): QueryAllianceDelegationRewardsRequest {
  return {
    delegatorAddr: "",
    validatorAddr: "",
    denom: "",
    pagination: undefined
  };
}
export const QueryAllianceDelegationRewardsRequest = {
  typeUrl: "/alliance.alliance.QueryAllianceDelegationRewardsRequest",
  encode(message: QueryAllianceDelegationRewardsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.validatorAddr !== "") {
      writer.uint32(18).string(message.validatorAddr);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceDelegationRewardsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceDelegationRewardsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddr = reader.string();
          break;
        case 2:
          message.validatorAddr = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        case 4:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllianceDelegationRewardsRequest>): QueryAllianceDelegationRewardsRequest {
    const message = createBaseQueryAllianceDelegationRewardsRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.validatorAddr = object.validatorAddr ?? "";
    message.denom = object.denom ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceDelegationRewardsRequestAmino): QueryAllianceDelegationRewardsRequest {
    const message = createBaseQueryAllianceDelegationRewardsRequest();
    if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
      message.delegatorAddr = object.delegator_addr;
    }
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllianceDelegationRewardsRequest, useInterfaces: boolean = false): QueryAllianceDelegationRewardsRequestAmino {
    const obj: any = {};
    obj.delegator_addr = message.delegatorAddr;
    obj.validator_addr = message.validatorAddr;
    obj.denom = message.denom;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceDelegationRewardsRequestAminoMsg): QueryAllianceDelegationRewardsRequest {
    return QueryAllianceDelegationRewardsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceDelegationRewardsRequestProtoMsg, useInterfaces: boolean = false): QueryAllianceDelegationRewardsRequest {
    return QueryAllianceDelegationRewardsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceDelegationRewardsRequest): Uint8Array {
    return QueryAllianceDelegationRewardsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceDelegationRewardsRequest): QueryAllianceDelegationRewardsRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceDelegationRewardsRequest",
      value: QueryAllianceDelegationRewardsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryIBCAllianceDelegationRewardsRequest(): QueryIBCAllianceDelegationRewardsRequest {
  return {
    delegatorAddr: "",
    validatorAddr: "",
    hash: "",
    pagination: undefined
  };
}
export const QueryIBCAllianceDelegationRewardsRequest = {
  typeUrl: "/alliance.alliance.QueryIBCAllianceDelegationRewardsRequest",
  encode(message: QueryIBCAllianceDelegationRewardsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddr !== "") {
      writer.uint32(10).string(message.delegatorAddr);
    }
    if (message.validatorAddr !== "") {
      writer.uint32(18).string(message.validatorAddr);
    }
    if (message.hash !== "") {
      writer.uint32(26).string(message.hash);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryIBCAllianceDelegationRewardsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIBCAllianceDelegationRewardsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddr = reader.string();
          break;
        case 2:
          message.validatorAddr = reader.string();
          break;
        case 3:
          message.hash = reader.string();
          break;
        case 4:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryIBCAllianceDelegationRewardsRequest>): QueryIBCAllianceDelegationRewardsRequest {
    const message = createBaseQueryIBCAllianceDelegationRewardsRequest();
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.validatorAddr = object.validatorAddr ?? "";
    message.hash = object.hash ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryIBCAllianceDelegationRewardsRequestAmino): QueryIBCAllianceDelegationRewardsRequest {
    const message = createBaseQueryIBCAllianceDelegationRewardsRequest();
    if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
      message.delegatorAddr = object.delegator_addr;
    }
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryIBCAllianceDelegationRewardsRequest, useInterfaces: boolean = false): QueryIBCAllianceDelegationRewardsRequestAmino {
    const obj: any = {};
    obj.delegator_addr = message.delegatorAddr;
    obj.validator_addr = message.validatorAddr;
    obj.hash = message.hash;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryIBCAllianceDelegationRewardsRequestAminoMsg): QueryIBCAllianceDelegationRewardsRequest {
    return QueryIBCAllianceDelegationRewardsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryIBCAllianceDelegationRewardsRequestProtoMsg, useInterfaces: boolean = false): QueryIBCAllianceDelegationRewardsRequest {
    return QueryIBCAllianceDelegationRewardsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryIBCAllianceDelegationRewardsRequest): Uint8Array {
    return QueryIBCAllianceDelegationRewardsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryIBCAllianceDelegationRewardsRequest): QueryIBCAllianceDelegationRewardsRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryIBCAllianceDelegationRewardsRequest",
      value: QueryIBCAllianceDelegationRewardsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceDelegationRewardsResponse(): QueryAllianceDelegationRewardsResponse {
  return {
    rewards: []
  };
}
export const QueryAllianceDelegationRewardsResponse = {
  typeUrl: "/alliance.alliance.QueryAllianceDelegationRewardsResponse",
  encode(message: QueryAllianceDelegationRewardsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.rewards) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceDelegationRewardsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceDelegationRewardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewards.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllianceDelegationRewardsResponse>): QueryAllianceDelegationRewardsResponse {
    const message = createBaseQueryAllianceDelegationRewardsResponse();
    message.rewards = object.rewards?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllianceDelegationRewardsResponseAmino): QueryAllianceDelegationRewardsResponse {
    const message = createBaseQueryAllianceDelegationRewardsResponse();
    message.rewards = object.rewards?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllianceDelegationRewardsResponse, useInterfaces: boolean = false): QueryAllianceDelegationRewardsResponseAmino {
    const obj: any = {};
    if (message.rewards) {
      obj.rewards = message.rewards.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.rewards = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllianceDelegationRewardsResponseAminoMsg): QueryAllianceDelegationRewardsResponse {
    return QueryAllianceDelegationRewardsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceDelegationRewardsResponseProtoMsg, useInterfaces: boolean = false): QueryAllianceDelegationRewardsResponse {
    return QueryAllianceDelegationRewardsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceDelegationRewardsResponse): Uint8Array {
    return QueryAllianceDelegationRewardsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceDelegationRewardsResponse): QueryAllianceDelegationRewardsResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceDelegationRewardsResponse",
      value: QueryAllianceDelegationRewardsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceValidatorResponse(): QueryAllianceValidatorResponse {
  return {
    validatorAddr: "",
    totalDelegationShares: [],
    validatorShares: [],
    totalStaked: []
  };
}
export const QueryAllianceValidatorResponse = {
  typeUrl: "/alliance.alliance.QueryAllianceValidatorResponse",
  encode(message: QueryAllianceValidatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    for (const v of message.totalDelegationShares) {
      DecCoin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.validatorShares) {
      DecCoin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.totalStaked) {
      DecCoin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceValidatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        case 2:
          message.totalDelegationShares.push(DecCoin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.validatorShares.push(DecCoin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.totalStaked.push(DecCoin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllianceValidatorResponse>): QueryAllianceValidatorResponse {
    const message = createBaseQueryAllianceValidatorResponse();
    message.validatorAddr = object.validatorAddr ?? "";
    message.totalDelegationShares = object.totalDelegationShares?.map(e => DecCoin.fromPartial(e)) || [];
    message.validatorShares = object.validatorShares?.map(e => DecCoin.fromPartial(e)) || [];
    message.totalStaked = object.totalStaked?.map(e => DecCoin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllianceValidatorResponseAmino): QueryAllianceValidatorResponse {
    const message = createBaseQueryAllianceValidatorResponse();
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    message.totalDelegationShares = object.total_delegation_shares?.map(e => DecCoin.fromAmino(e)) || [];
    message.validatorShares = object.validator_shares?.map(e => DecCoin.fromAmino(e)) || [];
    message.totalStaked = object.total_staked?.map(e => DecCoin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllianceValidatorResponse, useInterfaces: boolean = false): QueryAllianceValidatorResponseAmino {
    const obj: any = {};
    obj.validator_addr = message.validatorAddr;
    if (message.totalDelegationShares) {
      obj.total_delegation_shares = message.totalDelegationShares.map(e => e ? DecCoin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.total_delegation_shares = [];
    }
    if (message.validatorShares) {
      obj.validator_shares = message.validatorShares.map(e => e ? DecCoin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validator_shares = [];
    }
    if (message.totalStaked) {
      obj.total_staked = message.totalStaked.map(e => e ? DecCoin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.total_staked = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllianceValidatorResponseAminoMsg): QueryAllianceValidatorResponse {
    return QueryAllianceValidatorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceValidatorResponseProtoMsg, useInterfaces: boolean = false): QueryAllianceValidatorResponse {
    return QueryAllianceValidatorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceValidatorResponse): Uint8Array {
    return QueryAllianceValidatorResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceValidatorResponse): QueryAllianceValidatorResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceValidatorResponse",
      value: QueryAllianceValidatorResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceValidatorsResponse(): QueryAllianceValidatorsResponse {
  return {
    validators: [],
    pagination: undefined
  };
}
export const QueryAllianceValidatorsResponse = {
  typeUrl: "/alliance.alliance.QueryAllianceValidatorsResponse",
  encode(message: QueryAllianceValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.validators) {
      QueryAllianceValidatorResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validators.push(QueryAllianceValidatorResponse.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllianceValidatorsResponse>): QueryAllianceValidatorsResponse {
    const message = createBaseQueryAllianceValidatorsResponse();
    message.validators = object.validators?.map(e => QueryAllianceValidatorResponse.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceValidatorsResponseAmino): QueryAllianceValidatorsResponse {
    const message = createBaseQueryAllianceValidatorsResponse();
    message.validators = object.validators?.map(e => QueryAllianceValidatorResponse.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllianceValidatorsResponse, useInterfaces: boolean = false): QueryAllianceValidatorsResponseAmino {
    const obj: any = {};
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? QueryAllianceValidatorResponse.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceValidatorsResponseAminoMsg): QueryAllianceValidatorsResponse {
    return QueryAllianceValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceValidatorsResponseProtoMsg, useInterfaces: boolean = false): QueryAllianceValidatorsResponse {
    return QueryAllianceValidatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceValidatorsResponse): Uint8Array {
    return QueryAllianceValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceValidatorsResponse): QueryAllianceValidatorsResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceValidatorsResponse",
      value: QueryAllianceValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceUnbondingsByDenomAndDelegatorRequest(): QueryAllianceUnbondingsByDenomAndDelegatorRequest {
  return {
    denom: "",
    delegatorAddr: "",
    pagination: undefined
  };
}
export const QueryAllianceUnbondingsByDenomAndDelegatorRequest = {
  typeUrl: "/alliance.alliance.QueryAllianceUnbondingsByDenomAndDelegatorRequest",
  encode(message: QueryAllianceUnbondingsByDenomAndDelegatorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.delegatorAddr !== "") {
      writer.uint32(18).string(message.delegatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceUnbondingsByDenomAndDelegatorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceUnbondingsByDenomAndDelegatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.delegatorAddr = reader.string();
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
  fromPartial(object: Partial<QueryAllianceUnbondingsByDenomAndDelegatorRequest>): QueryAllianceUnbondingsByDenomAndDelegatorRequest {
    const message = createBaseQueryAllianceUnbondingsByDenomAndDelegatorRequest();
    message.denom = object.denom ?? "";
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceUnbondingsByDenomAndDelegatorRequestAmino): QueryAllianceUnbondingsByDenomAndDelegatorRequest {
    const message = createBaseQueryAllianceUnbondingsByDenomAndDelegatorRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
      message.delegatorAddr = object.delegator_addr;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllianceUnbondingsByDenomAndDelegatorRequest, useInterfaces: boolean = false): QueryAllianceUnbondingsByDenomAndDelegatorRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.delegator_addr = message.delegatorAddr;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceUnbondingsByDenomAndDelegatorRequestAminoMsg): QueryAllianceUnbondingsByDenomAndDelegatorRequest {
    return QueryAllianceUnbondingsByDenomAndDelegatorRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceUnbondingsByDenomAndDelegatorRequestProtoMsg, useInterfaces: boolean = false): QueryAllianceUnbondingsByDenomAndDelegatorRequest {
    return QueryAllianceUnbondingsByDenomAndDelegatorRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceUnbondingsByDenomAndDelegatorRequest): Uint8Array {
    return QueryAllianceUnbondingsByDenomAndDelegatorRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceUnbondingsByDenomAndDelegatorRequest): QueryAllianceUnbondingsByDenomAndDelegatorRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceUnbondingsByDenomAndDelegatorRequest",
      value: QueryAllianceUnbondingsByDenomAndDelegatorRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceUnbondingsByDenomAndDelegatorResponse(): QueryAllianceUnbondingsByDenomAndDelegatorResponse {
  return {
    unbondings: [],
    pagination: undefined
  };
}
export const QueryAllianceUnbondingsByDenomAndDelegatorResponse = {
  typeUrl: "/alliance.alliance.QueryAllianceUnbondingsByDenomAndDelegatorResponse",
  encode(message: QueryAllianceUnbondingsByDenomAndDelegatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.unbondings) {
      UnbondingDelegation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceUnbondingsByDenomAndDelegatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceUnbondingsByDenomAndDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbondings.push(UnbondingDelegation.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllianceUnbondingsByDenomAndDelegatorResponse>): QueryAllianceUnbondingsByDenomAndDelegatorResponse {
    const message = createBaseQueryAllianceUnbondingsByDenomAndDelegatorResponse();
    message.unbondings = object.unbondings?.map(e => UnbondingDelegation.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceUnbondingsByDenomAndDelegatorResponseAmino): QueryAllianceUnbondingsByDenomAndDelegatorResponse {
    const message = createBaseQueryAllianceUnbondingsByDenomAndDelegatorResponse();
    message.unbondings = object.unbondings?.map(e => UnbondingDelegation.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllianceUnbondingsByDenomAndDelegatorResponse, useInterfaces: boolean = false): QueryAllianceUnbondingsByDenomAndDelegatorResponseAmino {
    const obj: any = {};
    if (message.unbondings) {
      obj.unbondings = message.unbondings.map(e => e ? UnbondingDelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.unbondings = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceUnbondingsByDenomAndDelegatorResponseAminoMsg): QueryAllianceUnbondingsByDenomAndDelegatorResponse {
    return QueryAllianceUnbondingsByDenomAndDelegatorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceUnbondingsByDenomAndDelegatorResponseProtoMsg, useInterfaces: boolean = false): QueryAllianceUnbondingsByDenomAndDelegatorResponse {
    return QueryAllianceUnbondingsByDenomAndDelegatorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceUnbondingsByDenomAndDelegatorResponse): Uint8Array {
    return QueryAllianceUnbondingsByDenomAndDelegatorResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceUnbondingsByDenomAndDelegatorResponse): QueryAllianceUnbondingsByDenomAndDelegatorResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceUnbondingsByDenomAndDelegatorResponse",
      value: QueryAllianceUnbondingsByDenomAndDelegatorResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceUnbondingsRequest(): QueryAllianceUnbondingsRequest {
  return {
    denom: "",
    delegatorAddr: "",
    validatorAddr: "",
    pagination: undefined
  };
}
export const QueryAllianceUnbondingsRequest = {
  typeUrl: "/alliance.alliance.QueryAllianceUnbondingsRequest",
  encode(message: QueryAllianceUnbondingsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.delegatorAddr !== "") {
      writer.uint32(18).string(message.delegatorAddr);
    }
    if (message.validatorAddr !== "") {
      writer.uint32(26).string(message.validatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceUnbondingsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceUnbondingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.delegatorAddr = reader.string();
          break;
        case 3:
          message.validatorAddr = reader.string();
          break;
        case 4:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllianceUnbondingsRequest>): QueryAllianceUnbondingsRequest {
    const message = createBaseQueryAllianceUnbondingsRequest();
    message.denom = object.denom ?? "";
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.validatorAddr = object.validatorAddr ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceUnbondingsRequestAmino): QueryAllianceUnbondingsRequest {
    const message = createBaseQueryAllianceUnbondingsRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
      message.delegatorAddr = object.delegator_addr;
    }
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllianceUnbondingsRequest, useInterfaces: boolean = false): QueryAllianceUnbondingsRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.delegator_addr = message.delegatorAddr;
    obj.validator_addr = message.validatorAddr;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceUnbondingsRequestAminoMsg): QueryAllianceUnbondingsRequest {
    return QueryAllianceUnbondingsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceUnbondingsRequestProtoMsg, useInterfaces: boolean = false): QueryAllianceUnbondingsRequest {
    return QueryAllianceUnbondingsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceUnbondingsRequest): Uint8Array {
    return QueryAllianceUnbondingsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceUnbondingsRequest): QueryAllianceUnbondingsRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceUnbondingsRequest",
      value: QueryAllianceUnbondingsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceUnbondingsResponse(): QueryAllianceUnbondingsResponse {
  return {
    unbondings: [],
    pagination: undefined
  };
}
export const QueryAllianceUnbondingsResponse = {
  typeUrl: "/alliance.alliance.QueryAllianceUnbondingsResponse",
  encode(message: QueryAllianceUnbondingsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.unbondings) {
      UnbondingDelegation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceUnbondingsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceUnbondingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbondings.push(UnbondingDelegation.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllianceUnbondingsResponse>): QueryAllianceUnbondingsResponse {
    const message = createBaseQueryAllianceUnbondingsResponse();
    message.unbondings = object.unbondings?.map(e => UnbondingDelegation.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceUnbondingsResponseAmino): QueryAllianceUnbondingsResponse {
    const message = createBaseQueryAllianceUnbondingsResponse();
    message.unbondings = object.unbondings?.map(e => UnbondingDelegation.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllianceUnbondingsResponse, useInterfaces: boolean = false): QueryAllianceUnbondingsResponseAmino {
    const obj: any = {};
    if (message.unbondings) {
      obj.unbondings = message.unbondings.map(e => e ? UnbondingDelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.unbondings = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceUnbondingsResponseAminoMsg): QueryAllianceUnbondingsResponse {
    return QueryAllianceUnbondingsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceUnbondingsResponseProtoMsg, useInterfaces: boolean = false): QueryAllianceUnbondingsResponse {
    return QueryAllianceUnbondingsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceUnbondingsResponse): Uint8Array {
    return QueryAllianceUnbondingsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceUnbondingsResponse): QueryAllianceUnbondingsResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceUnbondingsResponse",
      value: QueryAllianceUnbondingsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceRedelegationsRequest(): QueryAllianceRedelegationsRequest {
  return {
    denom: "",
    delegatorAddr: "",
    pagination: undefined
  };
}
export const QueryAllianceRedelegationsRequest = {
  typeUrl: "/alliance.alliance.QueryAllianceRedelegationsRequest",
  encode(message: QueryAllianceRedelegationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.delegatorAddr !== "") {
      writer.uint32(18).string(message.delegatorAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceRedelegationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceRedelegationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.delegatorAddr = reader.string();
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
  fromPartial(object: Partial<QueryAllianceRedelegationsRequest>): QueryAllianceRedelegationsRequest {
    const message = createBaseQueryAllianceRedelegationsRequest();
    message.denom = object.denom ?? "";
    message.delegatorAddr = object.delegatorAddr ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceRedelegationsRequestAmino): QueryAllianceRedelegationsRequest {
    const message = createBaseQueryAllianceRedelegationsRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.delegator_addr !== undefined && object.delegator_addr !== null) {
      message.delegatorAddr = object.delegator_addr;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllianceRedelegationsRequest, useInterfaces: boolean = false): QueryAllianceRedelegationsRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.delegator_addr = message.delegatorAddr;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceRedelegationsRequestAminoMsg): QueryAllianceRedelegationsRequest {
    return QueryAllianceRedelegationsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceRedelegationsRequestProtoMsg, useInterfaces: boolean = false): QueryAllianceRedelegationsRequest {
    return QueryAllianceRedelegationsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceRedelegationsRequest): Uint8Array {
    return QueryAllianceRedelegationsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceRedelegationsRequest): QueryAllianceRedelegationsRequestProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceRedelegationsRequest",
      value: QueryAllianceRedelegationsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllianceRedelegationsResponse(): QueryAllianceRedelegationsResponse {
  return {
    redelegations: [],
    pagination: undefined
  };
}
export const QueryAllianceRedelegationsResponse = {
  typeUrl: "/alliance.alliance.QueryAllianceRedelegationsResponse",
  encode(message: QueryAllianceRedelegationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.redelegations) {
      RedelegationEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllianceRedelegationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllianceRedelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redelegations.push(RedelegationEntry.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllianceRedelegationsResponse>): QueryAllianceRedelegationsResponse {
    const message = createBaseQueryAllianceRedelegationsResponse();
    message.redelegations = object.redelegations?.map(e => RedelegationEntry.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllianceRedelegationsResponseAmino): QueryAllianceRedelegationsResponse {
    const message = createBaseQueryAllianceRedelegationsResponse();
    message.redelegations = object.redelegations?.map(e => RedelegationEntry.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllianceRedelegationsResponse, useInterfaces: boolean = false): QueryAllianceRedelegationsResponseAmino {
    const obj: any = {};
    if (message.redelegations) {
      obj.redelegations = message.redelegations.map(e => e ? RedelegationEntry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.redelegations = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllianceRedelegationsResponseAminoMsg): QueryAllianceRedelegationsResponse {
    return QueryAllianceRedelegationsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllianceRedelegationsResponseProtoMsg, useInterfaces: boolean = false): QueryAllianceRedelegationsResponse {
    return QueryAllianceRedelegationsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllianceRedelegationsResponse): Uint8Array {
    return QueryAllianceRedelegationsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllianceRedelegationsResponse): QueryAllianceRedelegationsResponseProtoMsg {
    return {
      typeUrl: "/alliance.alliance.QueryAllianceRedelegationsResponse",
      value: QueryAllianceRedelegationsResponse.encode(message).finish()
    };
  }
};