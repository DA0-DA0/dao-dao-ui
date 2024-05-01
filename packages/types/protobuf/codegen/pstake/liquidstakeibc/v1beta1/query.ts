//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { HostChain, HostChainAmino, HostChainSDKType, Deposit, DepositAmino, DepositSDKType, LSMDeposit, LSMDepositAmino, LSMDepositSDKType, Unbonding, UnbondingAmino, UnbondingSDKType, UserUnbonding, UserUnbondingAmino, UserUnbondingSDKType, ValidatorUnbonding, ValidatorUnbondingAmino, ValidatorUnbondingSDKType, Redelegations, RedelegationsAmino, RedelegationsSDKType, RedelegateTx, RedelegateTxAmino, RedelegateTxSDKType } from "./liquidstakeibc";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
export interface QueryParamsRequestSDKType {}
export interface QueryParamsResponse {
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
export interface QueryParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryHostChainRequest {
  chainId: string;
}
export interface QueryHostChainRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainRequest";
  value: Uint8Array;
}
export interface QueryHostChainRequestAmino {
  chain_id?: string;
}
export interface QueryHostChainRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryHostChainRequest";
  value: QueryHostChainRequestAmino;
}
export interface QueryHostChainRequestSDKType {
  chain_id: string;
}
export interface QueryHostChainResponse {
  hostChain: HostChain | undefined;
}
export interface QueryHostChainResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainResponse";
  value: Uint8Array;
}
export interface QueryHostChainResponseAmino {
  host_chain?: HostChainAmino | undefined;
}
export interface QueryHostChainResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryHostChainResponse";
  value: QueryHostChainResponseAmino;
}
export interface QueryHostChainResponseSDKType {
  host_chain: HostChainSDKType | undefined;
}
export interface QueryHostChainsRequest {}
export interface QueryHostChainsRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainsRequest";
  value: Uint8Array;
}
export interface QueryHostChainsRequestAmino {}
export interface QueryHostChainsRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryHostChainsRequest";
  value: QueryHostChainsRequestAmino;
}
export interface QueryHostChainsRequestSDKType {}
export interface QueryHostChainsResponse {
  hostChains: HostChain[];
}
export interface QueryHostChainsResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainsResponse";
  value: Uint8Array;
}
export interface QueryHostChainsResponseAmino {
  host_chains?: HostChainAmino[];
}
export interface QueryHostChainsResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryHostChainsResponse";
  value: QueryHostChainsResponseAmino;
}
export interface QueryHostChainsResponseSDKType {
  host_chains: HostChainSDKType[];
}
export interface QueryDepositsRequest {
  chainId: string;
}
export interface QueryDepositsRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositsRequest";
  value: Uint8Array;
}
export interface QueryDepositsRequestAmino {
  chain_id?: string;
}
export interface QueryDepositsRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryDepositsRequest";
  value: QueryDepositsRequestAmino;
}
export interface QueryDepositsRequestSDKType {
  chain_id: string;
}
export interface QueryDepositsResponse {
  deposits: Deposit[];
}
export interface QueryDepositsResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositsResponse";
  value: Uint8Array;
}
export interface QueryDepositsResponseAmino {
  deposits?: DepositAmino[];
}
export interface QueryDepositsResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryDepositsResponse";
  value: QueryDepositsResponseAmino;
}
export interface QueryDepositsResponseSDKType {
  deposits: DepositSDKType[];
}
export interface QueryLSMDepositsRequest {
  chainId: string;
}
export interface QueryLSMDepositsRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryLSMDepositsRequest";
  value: Uint8Array;
}
export interface QueryLSMDepositsRequestAmino {
  chain_id?: string;
}
export interface QueryLSMDepositsRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryLSMDepositsRequest";
  value: QueryLSMDepositsRequestAmino;
}
export interface QueryLSMDepositsRequestSDKType {
  chain_id: string;
}
export interface QueryLSMDepositsResponse {
  deposits: LSMDeposit[];
}
export interface QueryLSMDepositsResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryLSMDepositsResponse";
  value: Uint8Array;
}
export interface QueryLSMDepositsResponseAmino {
  deposits?: LSMDepositAmino[];
}
export interface QueryLSMDepositsResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryLSMDepositsResponse";
  value: QueryLSMDepositsResponseAmino;
}
export interface QueryLSMDepositsResponseSDKType {
  deposits: LSMDepositSDKType[];
}
export interface QueryUnbondingsRequest {
  chainId: string;
}
export interface QueryUnbondingsRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingsRequest";
  value: Uint8Array;
}
export interface QueryUnbondingsRequestAmino {
  chain_id?: string;
}
export interface QueryUnbondingsRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingsRequest";
  value: QueryUnbondingsRequestAmino;
}
export interface QueryUnbondingsRequestSDKType {
  chain_id: string;
}
export interface QueryUnbondingsResponse {
  unbondings: Unbonding[];
}
export interface QueryUnbondingsResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingsResponse";
  value: Uint8Array;
}
export interface QueryUnbondingsResponseAmino {
  unbondings?: UnbondingAmino[];
}
export interface QueryUnbondingsResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingsResponse";
  value: QueryUnbondingsResponseAmino;
}
export interface QueryUnbondingsResponseSDKType {
  unbondings: UnbondingSDKType[];
}
export interface QueryUnbondingRequest {
  chainId: string;
  epoch: bigint;
}
export interface QueryUnbondingRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingRequest";
  value: Uint8Array;
}
export interface QueryUnbondingRequestAmino {
  chain_id?: string;
  epoch?: string;
}
export interface QueryUnbondingRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingRequest";
  value: QueryUnbondingRequestAmino;
}
export interface QueryUnbondingRequestSDKType {
  chain_id: string;
  epoch: bigint;
}
export interface QueryUnbondingResponse {
  unbonding?: Unbonding | undefined;
}
export interface QueryUnbondingResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingResponse";
  value: Uint8Array;
}
export interface QueryUnbondingResponseAmino {
  unbonding?: UnbondingAmino | undefined;
}
export interface QueryUnbondingResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingResponse";
  value: QueryUnbondingResponseAmino;
}
export interface QueryUnbondingResponseSDKType {
  unbonding?: UnbondingSDKType | undefined;
}
export interface QueryUserUnbondingsRequest {
  address: string;
}
export interface QueryUserUnbondingsRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUserUnbondingsRequest";
  value: Uint8Array;
}
export interface QueryUserUnbondingsRequestAmino {
  address?: string;
}
export interface QueryUserUnbondingsRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryUserUnbondingsRequest";
  value: QueryUserUnbondingsRequestAmino;
}
export interface QueryUserUnbondingsRequestSDKType {
  address: string;
}
export interface QueryUserUnbondingsResponse {
  userUnbondings: UserUnbonding[];
}
export interface QueryUserUnbondingsResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUserUnbondingsResponse";
  value: Uint8Array;
}
export interface QueryUserUnbondingsResponseAmino {
  user_unbondings?: UserUnbondingAmino[];
}
export interface QueryUserUnbondingsResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryUserUnbondingsResponse";
  value: QueryUserUnbondingsResponseAmino;
}
export interface QueryUserUnbondingsResponseSDKType {
  user_unbondings: UserUnbondingSDKType[];
}
export interface QueryHostChainUserUnbondingsRequest {
  chainId: string;
  pagination?: PageRequest | undefined;
}
export interface QueryHostChainUserUnbondingsRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainUserUnbondingsRequest";
  value: Uint8Array;
}
export interface QueryHostChainUserUnbondingsRequestAmino {
  chain_id?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryHostChainUserUnbondingsRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryHostChainUserUnbondingsRequest";
  value: QueryHostChainUserUnbondingsRequestAmino;
}
export interface QueryHostChainUserUnbondingsRequestSDKType {
  chain_id: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryHostChainUserUnbondingsResponse {
  userUnbondings: UserUnbonding[];
  pagination?: PageResponse | undefined;
}
export interface QueryHostChainUserUnbondingsResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainUserUnbondingsResponse";
  value: Uint8Array;
}
export interface QueryHostChainUserUnbondingsResponseAmino {
  user_unbondings?: UserUnbondingAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryHostChainUserUnbondingsResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryHostChainUserUnbondingsResponse";
  value: QueryHostChainUserUnbondingsResponseAmino;
}
export interface QueryHostChainUserUnbondingsResponseSDKType {
  user_unbondings: UserUnbondingSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryValidatorUnbondingRequest {
  chainId: string;
}
export interface QueryValidatorUnbondingRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryValidatorUnbondingRequest";
  value: Uint8Array;
}
export interface QueryValidatorUnbondingRequestAmino {
  chain_id?: string;
}
export interface QueryValidatorUnbondingRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryValidatorUnbondingRequest";
  value: QueryValidatorUnbondingRequestAmino;
}
export interface QueryValidatorUnbondingRequestSDKType {
  chain_id: string;
}
export interface QueryValidatorUnbondingResponse {
  validatorUnbondings: ValidatorUnbonding[];
}
export interface QueryValidatorUnbondingResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryValidatorUnbondingResponse";
  value: Uint8Array;
}
export interface QueryValidatorUnbondingResponseAmino {
  validator_unbondings?: ValidatorUnbondingAmino[];
}
export interface QueryValidatorUnbondingResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryValidatorUnbondingResponse";
  value: QueryValidatorUnbondingResponseAmino;
}
export interface QueryValidatorUnbondingResponseSDKType {
  validator_unbondings: ValidatorUnbondingSDKType[];
}
export interface QueryDepositAccountBalanceRequest {
  chainId: string;
}
export interface QueryDepositAccountBalanceRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositAccountBalanceRequest";
  value: Uint8Array;
}
export interface QueryDepositAccountBalanceRequestAmino {
  chain_id?: string;
}
export interface QueryDepositAccountBalanceRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryDepositAccountBalanceRequest";
  value: QueryDepositAccountBalanceRequestAmino;
}
export interface QueryDepositAccountBalanceRequestSDKType {
  chain_id: string;
}
export interface QueryDepositAccountBalanceResponse {
  balance: Coin | undefined;
}
export interface QueryDepositAccountBalanceResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositAccountBalanceResponse";
  value: Uint8Array;
}
export interface QueryDepositAccountBalanceResponseAmino {
  balance?: CoinAmino | undefined;
}
export interface QueryDepositAccountBalanceResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryDepositAccountBalanceResponse";
  value: QueryDepositAccountBalanceResponseAmino;
}
export interface QueryDepositAccountBalanceResponseSDKType {
  balance: CoinSDKType | undefined;
}
export interface QueryExchangeRateRequest {
  chainId: string;
}
export interface QueryExchangeRateRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryExchangeRateRequest";
  value: Uint8Array;
}
export interface QueryExchangeRateRequestAmino {
  chain_id?: string;
}
export interface QueryExchangeRateRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryExchangeRateRequest";
  value: QueryExchangeRateRequestAmino;
}
export interface QueryExchangeRateRequestSDKType {
  chain_id: string;
}
export interface QueryExchangeRateResponse {
  rate: string;
}
export interface QueryExchangeRateResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryExchangeRateResponse";
  value: Uint8Array;
}
export interface QueryExchangeRateResponseAmino {
  rate?: string;
}
export interface QueryExchangeRateResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryExchangeRateResponse";
  value: QueryExchangeRateResponseAmino;
}
export interface QueryExchangeRateResponseSDKType {
  rate: string;
}
export interface QueryRedelegationsRequest {
  chainId: string;
}
export interface QueryRedelegationsRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationsRequest";
  value: Uint8Array;
}
export interface QueryRedelegationsRequestAmino {
  chain_id?: string;
}
export interface QueryRedelegationsRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationsRequest";
  value: QueryRedelegationsRequestAmino;
}
export interface QueryRedelegationsRequestSDKType {
  chain_id: string;
}
export interface QueryRedelegationsResponse {
  redelegations?: Redelegations | undefined;
}
export interface QueryRedelegationsResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationsResponse";
  value: Uint8Array;
}
export interface QueryRedelegationsResponseAmino {
  redelegations?: RedelegationsAmino | undefined;
}
export interface QueryRedelegationsResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationsResponse";
  value: QueryRedelegationsResponseAmino;
}
export interface QueryRedelegationsResponseSDKType {
  redelegations?: RedelegationsSDKType | undefined;
}
export interface QueryRedelegationTxRequest {
  chainId: string;
}
export interface QueryRedelegationTxRequestProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationTxRequest";
  value: Uint8Array;
}
export interface QueryRedelegationTxRequestAmino {
  chain_id?: string;
}
export interface QueryRedelegationTxRequestAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationTxRequest";
  value: QueryRedelegationTxRequestAmino;
}
export interface QueryRedelegationTxRequestSDKType {
  chain_id: string;
}
export interface QueryRedelegationTxResponse {
  redelegationTx: RedelegateTx[];
}
export interface QueryRedelegationTxResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationTxResponse";
  value: Uint8Array;
}
export interface QueryRedelegationTxResponseAmino {
  redelegation_tx?: RedelegateTxAmino[];
}
export interface QueryRedelegationTxResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationTxResponse";
  value: QueryRedelegationTxResponseAmino;
}
export interface QueryRedelegationTxResponseSDKType {
  redelegation_tx: RedelegateTxSDKType[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryParamsRequest",
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
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryParamsRequest",
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
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryParamsResponse",
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
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryHostChainRequest(): QueryHostChainRequest {
  return {
    chainId: ""
  };
}
export const QueryHostChainRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainRequest",
  encode(message: QueryHostChainRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostChainRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostChainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryHostChainRequest>): QueryHostChainRequest {
    const message = createBaseQueryHostChainRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryHostChainRequestAmino): QueryHostChainRequest {
    const message = createBaseQueryHostChainRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryHostChainRequest, useInterfaces: boolean = false): QueryHostChainRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryHostChainRequestAminoMsg): QueryHostChainRequest {
    return QueryHostChainRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostChainRequestProtoMsg, useInterfaces: boolean = false): QueryHostChainRequest {
    return QueryHostChainRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostChainRequest): Uint8Array {
    return QueryHostChainRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryHostChainRequest): QueryHostChainRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainRequest",
      value: QueryHostChainRequest.encode(message).finish()
    };
  }
};
function createBaseQueryHostChainResponse(): QueryHostChainResponse {
  return {
    hostChain: HostChain.fromPartial({})
  };
}
export const QueryHostChainResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainResponse",
  encode(message: QueryHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== undefined) {
      HostChain.encode(message.hostChain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostChainResponse();
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
  fromPartial(object: Partial<QueryHostChainResponse>): QueryHostChainResponse {
    const message = createBaseQueryHostChainResponse();
    message.hostChain = object.hostChain !== undefined && object.hostChain !== null ? HostChain.fromPartial(object.hostChain) : undefined;
    return message;
  },
  fromAmino(object: QueryHostChainResponseAmino): QueryHostChainResponse {
    const message = createBaseQueryHostChainResponse();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = HostChain.fromAmino(object.host_chain);
    }
    return message;
  },
  toAmino(message: QueryHostChainResponse, useInterfaces: boolean = false): QueryHostChainResponseAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain ? HostChain.toAmino(message.hostChain, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryHostChainResponseAminoMsg): QueryHostChainResponse {
    return QueryHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostChainResponseProtoMsg, useInterfaces: boolean = false): QueryHostChainResponse {
    return QueryHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostChainResponse): Uint8Array {
    return QueryHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryHostChainResponse): QueryHostChainResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainResponse",
      value: QueryHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseQueryHostChainsRequest(): QueryHostChainsRequest {
  return {};
}
export const QueryHostChainsRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainsRequest",
  encode(_: QueryHostChainsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostChainsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostChainsRequest();
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
  fromPartial(_: Partial<QueryHostChainsRequest>): QueryHostChainsRequest {
    const message = createBaseQueryHostChainsRequest();
    return message;
  },
  fromAmino(_: QueryHostChainsRequestAmino): QueryHostChainsRequest {
    const message = createBaseQueryHostChainsRequest();
    return message;
  },
  toAmino(_: QueryHostChainsRequest, useInterfaces: boolean = false): QueryHostChainsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryHostChainsRequestAminoMsg): QueryHostChainsRequest {
    return QueryHostChainsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostChainsRequestProtoMsg, useInterfaces: boolean = false): QueryHostChainsRequest {
    return QueryHostChainsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostChainsRequest): Uint8Array {
    return QueryHostChainsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryHostChainsRequest): QueryHostChainsRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainsRequest",
      value: QueryHostChainsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryHostChainsResponse(): QueryHostChainsResponse {
  return {
    hostChains: []
  };
}
export const QueryHostChainsResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainsResponse",
  encode(message: QueryHostChainsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.hostChains) {
      HostChain.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostChainsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostChainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChains.push(HostChain.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryHostChainsResponse>): QueryHostChainsResponse {
    const message = createBaseQueryHostChainsResponse();
    message.hostChains = object.hostChains?.map(e => HostChain.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryHostChainsResponseAmino): QueryHostChainsResponse {
    const message = createBaseQueryHostChainsResponse();
    message.hostChains = object.host_chains?.map(e => HostChain.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryHostChainsResponse, useInterfaces: boolean = false): QueryHostChainsResponseAmino {
    const obj: any = {};
    if (message.hostChains) {
      obj.host_chains = message.hostChains.map(e => e ? HostChain.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_chains = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryHostChainsResponseAminoMsg): QueryHostChainsResponse {
    return QueryHostChainsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostChainsResponseProtoMsg, useInterfaces: boolean = false): QueryHostChainsResponse {
    return QueryHostChainsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostChainsResponse): Uint8Array {
    return QueryHostChainsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryHostChainsResponse): QueryHostChainsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainsResponse",
      value: QueryHostChainsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDepositsRequest(): QueryDepositsRequest {
  return {
    chainId: ""
  };
}
export const QueryDepositsRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositsRequest",
  encode(message: QueryDepositsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDepositsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDepositsRequest>): QueryDepositsRequest {
    const message = createBaseQueryDepositsRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryDepositsRequestAmino): QueryDepositsRequest {
    const message = createBaseQueryDepositsRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryDepositsRequest, useInterfaces: boolean = false): QueryDepositsRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryDepositsRequestAminoMsg): QueryDepositsRequest {
    return QueryDepositsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDepositsRequestProtoMsg, useInterfaces: boolean = false): QueryDepositsRequest {
    return QueryDepositsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDepositsRequest): Uint8Array {
    return QueryDepositsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDepositsRequest): QueryDepositsRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositsRequest",
      value: QueryDepositsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDepositsResponse(): QueryDepositsResponse {
  return {
    deposits: []
  };
}
export const QueryDepositsResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositsResponse",
  encode(message: QueryDepositsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.deposits) {
      Deposit.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDepositsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposits.push(Deposit.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDepositsResponse>): QueryDepositsResponse {
    const message = createBaseQueryDepositsResponse();
    message.deposits = object.deposits?.map(e => Deposit.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryDepositsResponseAmino): QueryDepositsResponse {
    const message = createBaseQueryDepositsResponse();
    message.deposits = object.deposits?.map(e => Deposit.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryDepositsResponse, useInterfaces: boolean = false): QueryDepositsResponseAmino {
    const obj: any = {};
    if (message.deposits) {
      obj.deposits = message.deposits.map(e => e ? Deposit.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.deposits = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryDepositsResponseAminoMsg): QueryDepositsResponse {
    return QueryDepositsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDepositsResponseProtoMsg, useInterfaces: boolean = false): QueryDepositsResponse {
    return QueryDepositsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDepositsResponse): Uint8Array {
    return QueryDepositsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDepositsResponse): QueryDepositsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositsResponse",
      value: QueryDepositsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLSMDepositsRequest(): QueryLSMDepositsRequest {
  return {
    chainId: ""
  };
}
export const QueryLSMDepositsRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryLSMDepositsRequest",
  encode(message: QueryLSMDepositsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLSMDepositsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLSMDepositsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLSMDepositsRequest>): QueryLSMDepositsRequest {
    const message = createBaseQueryLSMDepositsRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryLSMDepositsRequestAmino): QueryLSMDepositsRequest {
    const message = createBaseQueryLSMDepositsRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryLSMDepositsRequest, useInterfaces: boolean = false): QueryLSMDepositsRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryLSMDepositsRequestAminoMsg): QueryLSMDepositsRequest {
    return QueryLSMDepositsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLSMDepositsRequestProtoMsg, useInterfaces: boolean = false): QueryLSMDepositsRequest {
    return QueryLSMDepositsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLSMDepositsRequest): Uint8Array {
    return QueryLSMDepositsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLSMDepositsRequest): QueryLSMDepositsRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryLSMDepositsRequest",
      value: QueryLSMDepositsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLSMDepositsResponse(): QueryLSMDepositsResponse {
  return {
    deposits: []
  };
}
export const QueryLSMDepositsResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryLSMDepositsResponse",
  encode(message: QueryLSMDepositsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.deposits) {
      LSMDeposit.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLSMDepositsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLSMDepositsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposits.push(LSMDeposit.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLSMDepositsResponse>): QueryLSMDepositsResponse {
    const message = createBaseQueryLSMDepositsResponse();
    message.deposits = object.deposits?.map(e => LSMDeposit.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryLSMDepositsResponseAmino): QueryLSMDepositsResponse {
    const message = createBaseQueryLSMDepositsResponse();
    message.deposits = object.deposits?.map(e => LSMDeposit.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryLSMDepositsResponse, useInterfaces: boolean = false): QueryLSMDepositsResponseAmino {
    const obj: any = {};
    if (message.deposits) {
      obj.deposits = message.deposits.map(e => e ? LSMDeposit.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.deposits = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryLSMDepositsResponseAminoMsg): QueryLSMDepositsResponse {
    return QueryLSMDepositsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLSMDepositsResponseProtoMsg, useInterfaces: boolean = false): QueryLSMDepositsResponse {
    return QueryLSMDepositsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLSMDepositsResponse): Uint8Array {
    return QueryLSMDepositsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLSMDepositsResponse): QueryLSMDepositsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryLSMDepositsResponse",
      value: QueryLSMDepositsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUnbondingsRequest(): QueryUnbondingsRequest {
  return {
    chainId: ""
  };
}
export const QueryUnbondingsRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingsRequest",
  encode(message: QueryUnbondingsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnbondingsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnbondingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUnbondingsRequest>): QueryUnbondingsRequest {
    const message = createBaseQueryUnbondingsRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryUnbondingsRequestAmino): QueryUnbondingsRequest {
    const message = createBaseQueryUnbondingsRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryUnbondingsRequest, useInterfaces: boolean = false): QueryUnbondingsRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryUnbondingsRequestAminoMsg): QueryUnbondingsRequest {
    return QueryUnbondingsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUnbondingsRequestProtoMsg, useInterfaces: boolean = false): QueryUnbondingsRequest {
    return QueryUnbondingsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnbondingsRequest): Uint8Array {
    return QueryUnbondingsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUnbondingsRequest): QueryUnbondingsRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingsRequest",
      value: QueryUnbondingsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUnbondingsResponse(): QueryUnbondingsResponse {
  return {
    unbondings: []
  };
}
export const QueryUnbondingsResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingsResponse",
  encode(message: QueryUnbondingsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.unbondings) {
      Unbonding.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnbondingsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnbondingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbondings.push(Unbonding.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUnbondingsResponse>): QueryUnbondingsResponse {
    const message = createBaseQueryUnbondingsResponse();
    message.unbondings = object.unbondings?.map(e => Unbonding.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryUnbondingsResponseAmino): QueryUnbondingsResponse {
    const message = createBaseQueryUnbondingsResponse();
    message.unbondings = object.unbondings?.map(e => Unbonding.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryUnbondingsResponse, useInterfaces: boolean = false): QueryUnbondingsResponseAmino {
    const obj: any = {};
    if (message.unbondings) {
      obj.unbondings = message.unbondings.map(e => e ? Unbonding.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.unbondings = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryUnbondingsResponseAminoMsg): QueryUnbondingsResponse {
    return QueryUnbondingsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUnbondingsResponseProtoMsg, useInterfaces: boolean = false): QueryUnbondingsResponse {
    return QueryUnbondingsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnbondingsResponse): Uint8Array {
    return QueryUnbondingsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUnbondingsResponse): QueryUnbondingsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingsResponse",
      value: QueryUnbondingsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUnbondingRequest(): QueryUnbondingRequest {
  return {
    chainId: "",
    epoch: BigInt(0)
  };
}
export const QueryUnbondingRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingRequest",
  encode(message: QueryUnbondingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.epoch !== BigInt(0)) {
      writer.uint32(16).int64(message.epoch);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnbondingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnbondingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.epoch = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUnbondingRequest>): QueryUnbondingRequest {
    const message = createBaseQueryUnbondingRequest();
    message.chainId = object.chainId ?? "";
    message.epoch = object.epoch !== undefined && object.epoch !== null ? BigInt(object.epoch.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryUnbondingRequestAmino): QueryUnbondingRequest {
    const message = createBaseQueryUnbondingRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.epoch !== undefined && object.epoch !== null) {
      message.epoch = BigInt(object.epoch);
    }
    return message;
  },
  toAmino(message: QueryUnbondingRequest, useInterfaces: boolean = false): QueryUnbondingRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.epoch = message.epoch ? message.epoch.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryUnbondingRequestAminoMsg): QueryUnbondingRequest {
    return QueryUnbondingRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUnbondingRequestProtoMsg, useInterfaces: boolean = false): QueryUnbondingRequest {
    return QueryUnbondingRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnbondingRequest): Uint8Array {
    return QueryUnbondingRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUnbondingRequest): QueryUnbondingRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingRequest",
      value: QueryUnbondingRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUnbondingResponse(): QueryUnbondingResponse {
  return {
    unbonding: undefined
  };
}
export const QueryUnbondingResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingResponse",
  encode(message: QueryUnbondingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.unbonding !== undefined) {
      Unbonding.encode(message.unbonding, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnbondingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnbondingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbonding = Unbonding.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUnbondingResponse>): QueryUnbondingResponse {
    const message = createBaseQueryUnbondingResponse();
    message.unbonding = object.unbonding !== undefined && object.unbonding !== null ? Unbonding.fromPartial(object.unbonding) : undefined;
    return message;
  },
  fromAmino(object: QueryUnbondingResponseAmino): QueryUnbondingResponse {
    const message = createBaseQueryUnbondingResponse();
    if (object.unbonding !== undefined && object.unbonding !== null) {
      message.unbonding = Unbonding.fromAmino(object.unbonding);
    }
    return message;
  },
  toAmino(message: QueryUnbondingResponse, useInterfaces: boolean = false): QueryUnbondingResponseAmino {
    const obj: any = {};
    obj.unbonding = message.unbonding ? Unbonding.toAmino(message.unbonding, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryUnbondingResponseAminoMsg): QueryUnbondingResponse {
    return QueryUnbondingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUnbondingResponseProtoMsg, useInterfaces: boolean = false): QueryUnbondingResponse {
    return QueryUnbondingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnbondingResponse): Uint8Array {
    return QueryUnbondingResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUnbondingResponse): QueryUnbondingResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUnbondingResponse",
      value: QueryUnbondingResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUserUnbondingsRequest(): QueryUserUnbondingsRequest {
  return {
    address: ""
  };
}
export const QueryUserUnbondingsRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUserUnbondingsRequest",
  encode(message: QueryUserUnbondingsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUserUnbondingsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUserUnbondingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUserUnbondingsRequest>): QueryUserUnbondingsRequest {
    const message = createBaseQueryUserUnbondingsRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryUserUnbondingsRequestAmino): QueryUserUnbondingsRequest {
    const message = createBaseQueryUserUnbondingsRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryUserUnbondingsRequest, useInterfaces: boolean = false): QueryUserUnbondingsRequestAmino {
    const obj: any = {};
    obj.address = message.address;
    return obj;
  },
  fromAminoMsg(object: QueryUserUnbondingsRequestAminoMsg): QueryUserUnbondingsRequest {
    return QueryUserUnbondingsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUserUnbondingsRequestProtoMsg, useInterfaces: boolean = false): QueryUserUnbondingsRequest {
    return QueryUserUnbondingsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUserUnbondingsRequest): Uint8Array {
    return QueryUserUnbondingsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUserUnbondingsRequest): QueryUserUnbondingsRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUserUnbondingsRequest",
      value: QueryUserUnbondingsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUserUnbondingsResponse(): QueryUserUnbondingsResponse {
  return {
    userUnbondings: []
  };
}
export const QueryUserUnbondingsResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUserUnbondingsResponse",
  encode(message: QueryUserUnbondingsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.userUnbondings) {
      UserUnbonding.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUserUnbondingsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUserUnbondingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userUnbondings.push(UserUnbonding.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUserUnbondingsResponse>): QueryUserUnbondingsResponse {
    const message = createBaseQueryUserUnbondingsResponse();
    message.userUnbondings = object.userUnbondings?.map(e => UserUnbonding.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryUserUnbondingsResponseAmino): QueryUserUnbondingsResponse {
    const message = createBaseQueryUserUnbondingsResponse();
    message.userUnbondings = object.user_unbondings?.map(e => UserUnbonding.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryUserUnbondingsResponse, useInterfaces: boolean = false): QueryUserUnbondingsResponseAmino {
    const obj: any = {};
    if (message.userUnbondings) {
      obj.user_unbondings = message.userUnbondings.map(e => e ? UserUnbonding.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.user_unbondings = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryUserUnbondingsResponseAminoMsg): QueryUserUnbondingsResponse {
    return QueryUserUnbondingsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUserUnbondingsResponseProtoMsg, useInterfaces: boolean = false): QueryUserUnbondingsResponse {
    return QueryUserUnbondingsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUserUnbondingsResponse): Uint8Array {
    return QueryUserUnbondingsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUserUnbondingsResponse): QueryUserUnbondingsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryUserUnbondingsResponse",
      value: QueryUserUnbondingsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryHostChainUserUnbondingsRequest(): QueryHostChainUserUnbondingsRequest {
  return {
    chainId: "",
    pagination: undefined
  };
}
export const QueryHostChainUserUnbondingsRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainUserUnbondingsRequest",
  encode(message: QueryHostChainUserUnbondingsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostChainUserUnbondingsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostChainUserUnbondingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
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
  fromPartial(object: Partial<QueryHostChainUserUnbondingsRequest>): QueryHostChainUserUnbondingsRequest {
    const message = createBaseQueryHostChainUserUnbondingsRequest();
    message.chainId = object.chainId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryHostChainUserUnbondingsRequestAmino): QueryHostChainUserUnbondingsRequest {
    const message = createBaseQueryHostChainUserUnbondingsRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryHostChainUserUnbondingsRequest, useInterfaces: boolean = false): QueryHostChainUserUnbondingsRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryHostChainUserUnbondingsRequestAminoMsg): QueryHostChainUserUnbondingsRequest {
    return QueryHostChainUserUnbondingsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostChainUserUnbondingsRequestProtoMsg, useInterfaces: boolean = false): QueryHostChainUserUnbondingsRequest {
    return QueryHostChainUserUnbondingsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostChainUserUnbondingsRequest): Uint8Array {
    return QueryHostChainUserUnbondingsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryHostChainUserUnbondingsRequest): QueryHostChainUserUnbondingsRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainUserUnbondingsRequest",
      value: QueryHostChainUserUnbondingsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryHostChainUserUnbondingsResponse(): QueryHostChainUserUnbondingsResponse {
  return {
    userUnbondings: [],
    pagination: undefined
  };
}
export const QueryHostChainUserUnbondingsResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainUserUnbondingsResponse",
  encode(message: QueryHostChainUserUnbondingsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.userUnbondings) {
      UserUnbonding.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHostChainUserUnbondingsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHostChainUserUnbondingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userUnbondings.push(UserUnbonding.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryHostChainUserUnbondingsResponse>): QueryHostChainUserUnbondingsResponse {
    const message = createBaseQueryHostChainUserUnbondingsResponse();
    message.userUnbondings = object.userUnbondings?.map(e => UserUnbonding.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryHostChainUserUnbondingsResponseAmino): QueryHostChainUserUnbondingsResponse {
    const message = createBaseQueryHostChainUserUnbondingsResponse();
    message.userUnbondings = object.user_unbondings?.map(e => UserUnbonding.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryHostChainUserUnbondingsResponse, useInterfaces: boolean = false): QueryHostChainUserUnbondingsResponseAmino {
    const obj: any = {};
    if (message.userUnbondings) {
      obj.user_unbondings = message.userUnbondings.map(e => e ? UserUnbonding.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.user_unbondings = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryHostChainUserUnbondingsResponseAminoMsg): QueryHostChainUserUnbondingsResponse {
    return QueryHostChainUserUnbondingsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHostChainUserUnbondingsResponseProtoMsg, useInterfaces: boolean = false): QueryHostChainUserUnbondingsResponse {
    return QueryHostChainUserUnbondingsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHostChainUserUnbondingsResponse): Uint8Array {
    return QueryHostChainUserUnbondingsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryHostChainUserUnbondingsResponse): QueryHostChainUserUnbondingsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryHostChainUserUnbondingsResponse",
      value: QueryHostChainUserUnbondingsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorUnbondingRequest(): QueryValidatorUnbondingRequest {
  return {
    chainId: ""
  };
}
export const QueryValidatorUnbondingRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryValidatorUnbondingRequest",
  encode(message: QueryValidatorUnbondingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorUnbondingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorUnbondingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorUnbondingRequest>): QueryValidatorUnbondingRequest {
    const message = createBaseQueryValidatorUnbondingRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorUnbondingRequestAmino): QueryValidatorUnbondingRequest {
    const message = createBaseQueryValidatorUnbondingRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryValidatorUnbondingRequest, useInterfaces: boolean = false): QueryValidatorUnbondingRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorUnbondingRequestAminoMsg): QueryValidatorUnbondingRequest {
    return QueryValidatorUnbondingRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorUnbondingRequestProtoMsg, useInterfaces: boolean = false): QueryValidatorUnbondingRequest {
    return QueryValidatorUnbondingRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorUnbondingRequest): Uint8Array {
    return QueryValidatorUnbondingRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorUnbondingRequest): QueryValidatorUnbondingRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryValidatorUnbondingRequest",
      value: QueryValidatorUnbondingRequest.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorUnbondingResponse(): QueryValidatorUnbondingResponse {
  return {
    validatorUnbondings: []
  };
}
export const QueryValidatorUnbondingResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryValidatorUnbondingResponse",
  encode(message: QueryValidatorUnbondingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.validatorUnbondings) {
      ValidatorUnbonding.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorUnbondingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorUnbondingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorUnbondings.push(ValidatorUnbonding.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorUnbondingResponse>): QueryValidatorUnbondingResponse {
    const message = createBaseQueryValidatorUnbondingResponse();
    message.validatorUnbondings = object.validatorUnbondings?.map(e => ValidatorUnbonding.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryValidatorUnbondingResponseAmino): QueryValidatorUnbondingResponse {
    const message = createBaseQueryValidatorUnbondingResponse();
    message.validatorUnbondings = object.validator_unbondings?.map(e => ValidatorUnbonding.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryValidatorUnbondingResponse, useInterfaces: boolean = false): QueryValidatorUnbondingResponseAmino {
    const obj: any = {};
    if (message.validatorUnbondings) {
      obj.validator_unbondings = message.validatorUnbondings.map(e => e ? ValidatorUnbonding.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validator_unbondings = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryValidatorUnbondingResponseAminoMsg): QueryValidatorUnbondingResponse {
    return QueryValidatorUnbondingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorUnbondingResponseProtoMsg, useInterfaces: boolean = false): QueryValidatorUnbondingResponse {
    return QueryValidatorUnbondingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorUnbondingResponse): Uint8Array {
    return QueryValidatorUnbondingResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorUnbondingResponse): QueryValidatorUnbondingResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryValidatorUnbondingResponse",
      value: QueryValidatorUnbondingResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDepositAccountBalanceRequest(): QueryDepositAccountBalanceRequest {
  return {
    chainId: ""
  };
}
export const QueryDepositAccountBalanceRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositAccountBalanceRequest",
  encode(message: QueryDepositAccountBalanceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDepositAccountBalanceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositAccountBalanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDepositAccountBalanceRequest>): QueryDepositAccountBalanceRequest {
    const message = createBaseQueryDepositAccountBalanceRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryDepositAccountBalanceRequestAmino): QueryDepositAccountBalanceRequest {
    const message = createBaseQueryDepositAccountBalanceRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryDepositAccountBalanceRequest, useInterfaces: boolean = false): QueryDepositAccountBalanceRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryDepositAccountBalanceRequestAminoMsg): QueryDepositAccountBalanceRequest {
    return QueryDepositAccountBalanceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDepositAccountBalanceRequestProtoMsg, useInterfaces: boolean = false): QueryDepositAccountBalanceRequest {
    return QueryDepositAccountBalanceRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDepositAccountBalanceRequest): Uint8Array {
    return QueryDepositAccountBalanceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDepositAccountBalanceRequest): QueryDepositAccountBalanceRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositAccountBalanceRequest",
      value: QueryDepositAccountBalanceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDepositAccountBalanceResponse(): QueryDepositAccountBalanceResponse {
  return {
    balance: Coin.fromPartial({})
  };
}
export const QueryDepositAccountBalanceResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositAccountBalanceResponse",
  encode(message: QueryDepositAccountBalanceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDepositAccountBalanceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositAccountBalanceResponse();
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
  fromPartial(object: Partial<QueryDepositAccountBalanceResponse>): QueryDepositAccountBalanceResponse {
    const message = createBaseQueryDepositAccountBalanceResponse();
    message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
    return message;
  },
  fromAmino(object: QueryDepositAccountBalanceResponseAmino): QueryDepositAccountBalanceResponse {
    const message = createBaseQueryDepositAccountBalanceResponse();
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = Coin.fromAmino(object.balance);
    }
    return message;
  },
  toAmino(message: QueryDepositAccountBalanceResponse, useInterfaces: boolean = false): QueryDepositAccountBalanceResponseAmino {
    const obj: any = {};
    obj.balance = message.balance ? Coin.toAmino(message.balance, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDepositAccountBalanceResponseAminoMsg): QueryDepositAccountBalanceResponse {
    return QueryDepositAccountBalanceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDepositAccountBalanceResponseProtoMsg, useInterfaces: boolean = false): QueryDepositAccountBalanceResponse {
    return QueryDepositAccountBalanceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDepositAccountBalanceResponse): Uint8Array {
    return QueryDepositAccountBalanceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDepositAccountBalanceResponse): QueryDepositAccountBalanceResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryDepositAccountBalanceResponse",
      value: QueryDepositAccountBalanceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryExchangeRateRequest(): QueryExchangeRateRequest {
  return {
    chainId: ""
  };
}
export const QueryExchangeRateRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryExchangeRateRequest",
  encode(message: QueryExchangeRateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryExchangeRateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExchangeRateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryExchangeRateRequest>): QueryExchangeRateRequest {
    const message = createBaseQueryExchangeRateRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryExchangeRateRequestAmino): QueryExchangeRateRequest {
    const message = createBaseQueryExchangeRateRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryExchangeRateRequest, useInterfaces: boolean = false): QueryExchangeRateRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryExchangeRateRequestAminoMsg): QueryExchangeRateRequest {
    return QueryExchangeRateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryExchangeRateRequestProtoMsg, useInterfaces: boolean = false): QueryExchangeRateRequest {
    return QueryExchangeRateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryExchangeRateRequest): Uint8Array {
    return QueryExchangeRateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryExchangeRateRequest): QueryExchangeRateRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryExchangeRateRequest",
      value: QueryExchangeRateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryExchangeRateResponse(): QueryExchangeRateResponse {
  return {
    rate: ""
  };
}
export const QueryExchangeRateResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryExchangeRateResponse",
  encode(message: QueryExchangeRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rate !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.rate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryExchangeRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExchangeRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryExchangeRateResponse>): QueryExchangeRateResponse {
    const message = createBaseQueryExchangeRateResponse();
    message.rate = object.rate ?? "";
    return message;
  },
  fromAmino(object: QueryExchangeRateResponseAmino): QueryExchangeRateResponse {
    const message = createBaseQueryExchangeRateResponse();
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = object.rate;
    }
    return message;
  },
  toAmino(message: QueryExchangeRateResponse, useInterfaces: boolean = false): QueryExchangeRateResponseAmino {
    const obj: any = {};
    obj.rate = message.rate;
    return obj;
  },
  fromAminoMsg(object: QueryExchangeRateResponseAminoMsg): QueryExchangeRateResponse {
    return QueryExchangeRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryExchangeRateResponseProtoMsg, useInterfaces: boolean = false): QueryExchangeRateResponse {
    return QueryExchangeRateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryExchangeRateResponse): Uint8Array {
    return QueryExchangeRateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryExchangeRateResponse): QueryExchangeRateResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryExchangeRateResponse",
      value: QueryExchangeRateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRedelegationsRequest(): QueryRedelegationsRequest {
  return {
    chainId: ""
  };
}
export const QueryRedelegationsRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationsRequest",
  encode(message: QueryRedelegationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRedelegationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRedelegationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRedelegationsRequest>): QueryRedelegationsRequest {
    const message = createBaseQueryRedelegationsRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryRedelegationsRequestAmino): QueryRedelegationsRequest {
    const message = createBaseQueryRedelegationsRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryRedelegationsRequest, useInterfaces: boolean = false): QueryRedelegationsRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryRedelegationsRequestAminoMsg): QueryRedelegationsRequest {
    return QueryRedelegationsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRedelegationsRequestProtoMsg, useInterfaces: boolean = false): QueryRedelegationsRequest {
    return QueryRedelegationsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRedelegationsRequest): Uint8Array {
    return QueryRedelegationsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRedelegationsRequest): QueryRedelegationsRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationsRequest",
      value: QueryRedelegationsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRedelegationsResponse(): QueryRedelegationsResponse {
  return {
    redelegations: undefined
  };
}
export const QueryRedelegationsResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationsResponse",
  encode(message: QueryRedelegationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.redelegations !== undefined) {
      Redelegations.encode(message.redelegations, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRedelegationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRedelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redelegations = Redelegations.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRedelegationsResponse>): QueryRedelegationsResponse {
    const message = createBaseQueryRedelegationsResponse();
    message.redelegations = object.redelegations !== undefined && object.redelegations !== null ? Redelegations.fromPartial(object.redelegations) : undefined;
    return message;
  },
  fromAmino(object: QueryRedelegationsResponseAmino): QueryRedelegationsResponse {
    const message = createBaseQueryRedelegationsResponse();
    if (object.redelegations !== undefined && object.redelegations !== null) {
      message.redelegations = Redelegations.fromAmino(object.redelegations);
    }
    return message;
  },
  toAmino(message: QueryRedelegationsResponse, useInterfaces: boolean = false): QueryRedelegationsResponseAmino {
    const obj: any = {};
    obj.redelegations = message.redelegations ? Redelegations.toAmino(message.redelegations, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRedelegationsResponseAminoMsg): QueryRedelegationsResponse {
    return QueryRedelegationsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRedelegationsResponseProtoMsg, useInterfaces: boolean = false): QueryRedelegationsResponse {
    return QueryRedelegationsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRedelegationsResponse): Uint8Array {
    return QueryRedelegationsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRedelegationsResponse): QueryRedelegationsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationsResponse",
      value: QueryRedelegationsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRedelegationTxRequest(): QueryRedelegationTxRequest {
  return {
    chainId: ""
  };
}
export const QueryRedelegationTxRequest = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationTxRequest",
  encode(message: QueryRedelegationTxRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRedelegationTxRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRedelegationTxRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRedelegationTxRequest>): QueryRedelegationTxRequest {
    const message = createBaseQueryRedelegationTxRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: QueryRedelegationTxRequestAmino): QueryRedelegationTxRequest {
    const message = createBaseQueryRedelegationTxRequest();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: QueryRedelegationTxRequest, useInterfaces: boolean = false): QueryRedelegationTxRequestAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    return obj;
  },
  fromAminoMsg(object: QueryRedelegationTxRequestAminoMsg): QueryRedelegationTxRequest {
    return QueryRedelegationTxRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRedelegationTxRequestProtoMsg, useInterfaces: boolean = false): QueryRedelegationTxRequest {
    return QueryRedelegationTxRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRedelegationTxRequest): Uint8Array {
    return QueryRedelegationTxRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRedelegationTxRequest): QueryRedelegationTxRequestProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationTxRequest",
      value: QueryRedelegationTxRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRedelegationTxResponse(): QueryRedelegationTxResponse {
  return {
    redelegationTx: []
  };
}
export const QueryRedelegationTxResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationTxResponse",
  encode(message: QueryRedelegationTxResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.redelegationTx) {
      RedelegateTx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRedelegationTxResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRedelegationTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redelegationTx.push(RedelegateTx.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRedelegationTxResponse>): QueryRedelegationTxResponse {
    const message = createBaseQueryRedelegationTxResponse();
    message.redelegationTx = object.redelegationTx?.map(e => RedelegateTx.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryRedelegationTxResponseAmino): QueryRedelegationTxResponse {
    const message = createBaseQueryRedelegationTxResponse();
    message.redelegationTx = object.redelegation_tx?.map(e => RedelegateTx.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryRedelegationTxResponse, useInterfaces: boolean = false): QueryRedelegationTxResponseAmino {
    const obj: any = {};
    if (message.redelegationTx) {
      obj.redelegation_tx = message.redelegationTx.map(e => e ? RedelegateTx.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.redelegation_tx = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryRedelegationTxResponseAminoMsg): QueryRedelegationTxResponse {
    return QueryRedelegationTxResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRedelegationTxResponseProtoMsg, useInterfaces: boolean = false): QueryRedelegationTxResponse {
    return QueryRedelegationTxResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRedelegationTxResponse): Uint8Array {
    return QueryRedelegationTxResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRedelegationTxResponse): QueryRedelegationTxResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.QueryRedelegationTxResponse",
      value: QueryRedelegationTxResponse.encode(message).finish()
    };
  }
};