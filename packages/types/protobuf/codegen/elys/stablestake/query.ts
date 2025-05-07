//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { AmmPool, AmmPoolAmino, AmmPoolSDKType } from "./pool";
import { Debt, DebtAmino, DebtSDKType } from "./debt";
import { InterestBlock, InterestBlockAmino, InterestBlockSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/elys.stablestake.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/elys.stablestake.QueryParamsRequest";
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
  typeUrl: "/elys.stablestake.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/elys.stablestake.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryAmmPoolRequest {
  id: bigint;
}
export interface QueryAmmPoolRequestProtoMsg {
  typeUrl: "/elys.stablestake.QueryAmmPoolRequest";
  value: Uint8Array;
}
export interface QueryAmmPoolRequestAmino {
  id?: string;
}
export interface QueryAmmPoolRequestAminoMsg {
  type: "/elys.stablestake.QueryAmmPoolRequest";
  value: QueryAmmPoolRequestAmino;
}
export interface QueryAmmPoolRequestSDKType {
  id: bigint;
}
export interface QueryAmmPoolResponse {
  ammPool: AmmPool | undefined;
}
export interface QueryAmmPoolResponseProtoMsg {
  typeUrl: "/elys.stablestake.QueryAmmPoolResponse";
  value: Uint8Array;
}
export interface QueryAmmPoolResponseAmino {
  amm_pool?: AmmPoolAmino | undefined;
}
export interface QueryAmmPoolResponseAminoMsg {
  type: "/elys.stablestake.QueryAmmPoolResponse";
  value: QueryAmmPoolResponseAmino;
}
export interface QueryAmmPoolResponseSDKType {
  amm_pool: AmmPoolSDKType | undefined;
}
export interface QueryAllAmmPoolsRequest {}
export interface QueryAllAmmPoolsRequestProtoMsg {
  typeUrl: "/elys.stablestake.QueryAllAmmPoolsRequest";
  value: Uint8Array;
}
export interface QueryAllAmmPoolsRequestAmino {}
export interface QueryAllAmmPoolsRequestAminoMsg {
  type: "/elys.stablestake.QueryAllAmmPoolsRequest";
  value: QueryAllAmmPoolsRequestAmino;
}
export interface QueryAllAmmPoolsRequestSDKType {}
export interface QueryAllAmmPoolsResponse {
  ammPools: AmmPool[];
}
export interface QueryAllAmmPoolsResponseProtoMsg {
  typeUrl: "/elys.stablestake.QueryAllAmmPoolsResponse";
  value: Uint8Array;
}
export interface QueryAllAmmPoolsResponseAmino {
  amm_pools?: AmmPoolAmino[];
}
export interface QueryAllAmmPoolsResponseAminoMsg {
  type: "/elys.stablestake.QueryAllAmmPoolsResponse";
  value: QueryAllAmmPoolsResponseAmino;
}
export interface QueryAllAmmPoolsResponseSDKType {
  amm_pools: AmmPoolSDKType[];
}
/** QueryBorrowRatioRequest is request type for the Query/BorrowRatio RPC method. */
export interface QueryBorrowRatioRequest {
  poolId: bigint;
}
export interface QueryBorrowRatioRequestProtoMsg {
  typeUrl: "/elys.stablestake.QueryBorrowRatioRequest";
  value: Uint8Array;
}
/** QueryBorrowRatioRequest is request type for the Query/BorrowRatio RPC method. */
export interface QueryBorrowRatioRequestAmino {
  pool_id?: string;
}
export interface QueryBorrowRatioRequestAminoMsg {
  type: "/elys.stablestake.QueryBorrowRatioRequest";
  value: QueryBorrowRatioRequestAmino;
}
/** QueryBorrowRatioRequest is request type for the Query/BorrowRatio RPC method. */
export interface QueryBorrowRatioRequestSDKType {
  pool_id: bigint;
}
/**
 * QueryBorrowRatioResponse is response type for the Query/BorrowRatio RPC
 * method.
 */
export interface QueryBorrowRatioResponse {
  netAmount: string;
  totalBorrow: string;
  borrowRatio: string;
}
export interface QueryBorrowRatioResponseProtoMsg {
  typeUrl: "/elys.stablestake.QueryBorrowRatioResponse";
  value: Uint8Array;
}
/**
 * QueryBorrowRatioResponse is response type for the Query/BorrowRatio RPC
 * method.
 */
export interface QueryBorrowRatioResponseAmino {
  net_amount?: string;
  total_borrow?: string;
  borrow_ratio?: string;
}
export interface QueryBorrowRatioResponseAminoMsg {
  type: "/elys.stablestake.QueryBorrowRatioResponse";
  value: QueryBorrowRatioResponseAmino;
}
/**
 * QueryBorrowRatioResponse is response type for the Query/BorrowRatio RPC
 * method.
 */
export interface QueryBorrowRatioResponseSDKType {
  net_amount: string;
  total_borrow: string;
  borrow_ratio: string;
}
export interface QueryGetPoolRequest {
  poolId: bigint;
}
export interface QueryGetPoolRequestProtoMsg {
  typeUrl: "/elys.stablestake.QueryGetPoolRequest";
  value: Uint8Array;
}
export interface QueryGetPoolRequestAmino {
  pool_id?: string;
}
export interface QueryGetPoolRequestAminoMsg {
  type: "/elys.stablestake.QueryGetPoolRequest";
  value: QueryGetPoolRequestAmino;
}
export interface QueryGetPoolRequestSDKType {
  pool_id: bigint;
}
export interface QueryGetPoolResponse {
  pool: PoolResponse | undefined;
}
export interface QueryGetPoolResponseProtoMsg {
  typeUrl: "/elys.stablestake.QueryGetPoolResponse";
  value: Uint8Array;
}
export interface QueryGetPoolResponseAmino {
  pool?: PoolResponseAmino | undefined;
}
export interface QueryGetPoolResponseAminoMsg {
  type: "/elys.stablestake.QueryGetPoolResponse";
  value: QueryGetPoolResponseAmino;
}
export interface QueryGetPoolResponseSDKType {
  pool: PoolResponseSDKType | undefined;
}
export interface QueryAllPoolRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAllPoolRequestProtoMsg {
  typeUrl: "/elys.stablestake.QueryAllPoolRequest";
  value: Uint8Array;
}
export interface QueryAllPoolRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAllPoolRequestAminoMsg {
  type: "/elys.stablestake.QueryAllPoolRequest";
  value: QueryAllPoolRequestAmino;
}
export interface QueryAllPoolRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAllPoolResponse {
  pools: PoolResponse[];
  pagination?: PageResponse | undefined;
}
export interface QueryAllPoolResponseProtoMsg {
  typeUrl: "/elys.stablestake.QueryAllPoolResponse";
  value: Uint8Array;
}
export interface QueryAllPoolResponseAmino {
  pools?: PoolResponseAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAllPoolResponseAminoMsg {
  type: "/elys.stablestake.QueryAllPoolResponse";
  value: QueryAllPoolResponseAmino;
}
export interface QueryAllPoolResponseSDKType {
  pools: PoolResponseSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface PoolResponse {
  depositDenom: string;
  redemptionRate: string;
  interestRate: string;
  interestRateMax: string;
  interestRateMin: string;
  interestRateIncrease: string;
  interestRateDecrease: string;
  healthGainFactor: string;
  totalValue: string;
  maxLeverageRatio: string;
  poolId: bigint;
  netAmount: string;
  totalBorrow: string;
  borrowRatio: string;
  maxWithdrawRatio: string;
}
export interface PoolResponseProtoMsg {
  typeUrl: "/elys.stablestake.PoolResponse";
  value: Uint8Array;
}
export interface PoolResponseAmino {
  deposit_denom?: string;
  redemption_rate?: string;
  interest_rate?: string;
  interest_rate_max?: string;
  interest_rate_min?: string;
  interest_rate_increase?: string;
  interest_rate_decrease?: string;
  health_gain_factor?: string;
  total_value?: string;
  max_leverage_ratio?: string;
  pool_id?: string;
  net_amount?: string;
  total_borrow?: string;
  borrow_ratio?: string;
  max_withdraw_ratio?: string;
}
export interface PoolResponseAminoMsg {
  type: "/elys.stablestake.PoolResponse";
  value: PoolResponseAmino;
}
export interface PoolResponseSDKType {
  deposit_denom: string;
  redemption_rate: string;
  interest_rate: string;
  interest_rate_max: string;
  interest_rate_min: string;
  interest_rate_increase: string;
  interest_rate_decrease: string;
  health_gain_factor: string;
  total_value: string;
  max_leverage_ratio: string;
  pool_id: bigint;
  net_amount: string;
  total_borrow: string;
  borrow_ratio: string;
  max_withdraw_ratio: string;
}
export interface QueryDebtRequest {
  poolId: bigint;
  address: string;
}
export interface QueryDebtRequestProtoMsg {
  typeUrl: "/elys.stablestake.QueryDebtRequest";
  value: Uint8Array;
}
export interface QueryDebtRequestAmino {
  pool_id?: string;
  address?: string;
}
export interface QueryDebtRequestAminoMsg {
  type: "/elys.stablestake.QueryDebtRequest";
  value: QueryDebtRequestAmino;
}
export interface QueryDebtRequestSDKType {
  pool_id: bigint;
  address: string;
}
export interface QueryDebtResponse {
  debt: Debt | undefined;
}
export interface QueryDebtResponseProtoMsg {
  typeUrl: "/elys.stablestake.QueryDebtResponse";
  value: Uint8Array;
}
export interface QueryDebtResponseAmino {
  debt?: DebtAmino | undefined;
}
export interface QueryDebtResponseAminoMsg {
  type: "/elys.stablestake.QueryDebtResponse";
  value: QueryDebtResponseAmino;
}
export interface QueryDebtResponseSDKType {
  debt: DebtSDKType | undefined;
}
export interface QueryGetInterestRequest {
  poolId: bigint;
  blockHeight: bigint;
}
export interface QueryGetInterestRequestProtoMsg {
  typeUrl: "/elys.stablestake.QueryGetInterestRequest";
  value: Uint8Array;
}
export interface QueryGetInterestRequestAmino {
  pool_id?: string;
  block_height?: string;
}
export interface QueryGetInterestRequestAminoMsg {
  type: "/elys.stablestake.QueryGetInterestRequest";
  value: QueryGetInterestRequestAmino;
}
export interface QueryGetInterestRequestSDKType {
  pool_id: bigint;
  block_height: bigint;
}
export interface QueryGetInterestResponse {
  interestBlock: InterestBlock | undefined;
}
export interface QueryGetInterestResponseProtoMsg {
  typeUrl: "/elys.stablestake.QueryGetInterestResponse";
  value: Uint8Array;
}
export interface QueryGetInterestResponseAmino {
  interest_block?: InterestBlockAmino | undefined;
}
export interface QueryGetInterestResponseAminoMsg {
  type: "/elys.stablestake.QueryGetInterestResponse";
  value: QueryGetInterestResponseAmino;
}
export interface QueryGetInterestResponseSDKType {
  interest_block: InterestBlockSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/elys.stablestake.QueryParamsRequest",
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
      typeUrl: "/elys.stablestake.QueryParamsRequest",
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
  typeUrl: "/elys.stablestake.QueryParamsResponse",
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
      typeUrl: "/elys.stablestake.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAmmPoolRequest(): QueryAmmPoolRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryAmmPoolRequest = {
  typeUrl: "/elys.stablestake.QueryAmmPoolRequest",
  encode(message: QueryAmmPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAmmPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAmmPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAmmPoolRequest>): QueryAmmPoolRequest {
    const message = createBaseQueryAmmPoolRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryAmmPoolRequestAmino): QueryAmmPoolRequest {
    const message = createBaseQueryAmmPoolRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryAmmPoolRequest, useInterfaces: boolean = false): QueryAmmPoolRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAmmPoolRequestAminoMsg): QueryAmmPoolRequest {
    return QueryAmmPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAmmPoolRequestProtoMsg, useInterfaces: boolean = false): QueryAmmPoolRequest {
    return QueryAmmPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAmmPoolRequest): Uint8Array {
    return QueryAmmPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAmmPoolRequest): QueryAmmPoolRequestProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryAmmPoolRequest",
      value: QueryAmmPoolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAmmPoolResponse(): QueryAmmPoolResponse {
  return {
    ammPool: AmmPool.fromPartial({})
  };
}
export const QueryAmmPoolResponse = {
  typeUrl: "/elys.stablestake.QueryAmmPoolResponse",
  encode(message: QueryAmmPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.ammPool !== undefined) {
      AmmPool.encode(message.ammPool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAmmPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAmmPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ammPool = AmmPool.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAmmPoolResponse>): QueryAmmPoolResponse {
    const message = createBaseQueryAmmPoolResponse();
    message.ammPool = object.ammPool !== undefined && object.ammPool !== null ? AmmPool.fromPartial(object.ammPool) : undefined;
    return message;
  },
  fromAmino(object: QueryAmmPoolResponseAmino): QueryAmmPoolResponse {
    const message = createBaseQueryAmmPoolResponse();
    if (object.amm_pool !== undefined && object.amm_pool !== null) {
      message.ammPool = AmmPool.fromAmino(object.amm_pool);
    }
    return message;
  },
  toAmino(message: QueryAmmPoolResponse, useInterfaces: boolean = false): QueryAmmPoolResponseAmino {
    const obj: any = {};
    obj.amm_pool = message.ammPool ? AmmPool.toAmino(message.ammPool, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAmmPoolResponseAminoMsg): QueryAmmPoolResponse {
    return QueryAmmPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAmmPoolResponseProtoMsg, useInterfaces: boolean = false): QueryAmmPoolResponse {
    return QueryAmmPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAmmPoolResponse): Uint8Array {
    return QueryAmmPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAmmPoolResponse): QueryAmmPoolResponseProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryAmmPoolResponse",
      value: QueryAmmPoolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllAmmPoolsRequest(): QueryAllAmmPoolsRequest {
  return {};
}
export const QueryAllAmmPoolsRequest = {
  typeUrl: "/elys.stablestake.QueryAllAmmPoolsRequest",
  encode(_: QueryAllAmmPoolsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllAmmPoolsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAmmPoolsRequest();
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
  fromPartial(_: Partial<QueryAllAmmPoolsRequest>): QueryAllAmmPoolsRequest {
    const message = createBaseQueryAllAmmPoolsRequest();
    return message;
  },
  fromAmino(_: QueryAllAmmPoolsRequestAmino): QueryAllAmmPoolsRequest {
    const message = createBaseQueryAllAmmPoolsRequest();
    return message;
  },
  toAmino(_: QueryAllAmmPoolsRequest, useInterfaces: boolean = false): QueryAllAmmPoolsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAllAmmPoolsRequestAminoMsg): QueryAllAmmPoolsRequest {
    return QueryAllAmmPoolsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllAmmPoolsRequestProtoMsg, useInterfaces: boolean = false): QueryAllAmmPoolsRequest {
    return QueryAllAmmPoolsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllAmmPoolsRequest): Uint8Array {
    return QueryAllAmmPoolsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllAmmPoolsRequest): QueryAllAmmPoolsRequestProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryAllAmmPoolsRequest",
      value: QueryAllAmmPoolsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllAmmPoolsResponse(): QueryAllAmmPoolsResponse {
  return {
    ammPools: []
  };
}
export const QueryAllAmmPoolsResponse = {
  typeUrl: "/elys.stablestake.QueryAllAmmPoolsResponse",
  encode(message: QueryAllAmmPoolsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.ammPools) {
      AmmPool.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllAmmPoolsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAmmPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ammPools.push(AmmPool.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllAmmPoolsResponse>): QueryAllAmmPoolsResponse {
    const message = createBaseQueryAllAmmPoolsResponse();
    message.ammPools = object.ammPools?.map(e => AmmPool.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllAmmPoolsResponseAmino): QueryAllAmmPoolsResponse {
    const message = createBaseQueryAllAmmPoolsResponse();
    message.ammPools = object.amm_pools?.map(e => AmmPool.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllAmmPoolsResponse, useInterfaces: boolean = false): QueryAllAmmPoolsResponseAmino {
    const obj: any = {};
    if (message.ammPools) {
      obj.amm_pools = message.ammPools.map(e => e ? AmmPool.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amm_pools = message.ammPools;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllAmmPoolsResponseAminoMsg): QueryAllAmmPoolsResponse {
    return QueryAllAmmPoolsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllAmmPoolsResponseProtoMsg, useInterfaces: boolean = false): QueryAllAmmPoolsResponse {
    return QueryAllAmmPoolsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllAmmPoolsResponse): Uint8Array {
    return QueryAllAmmPoolsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllAmmPoolsResponse): QueryAllAmmPoolsResponseProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryAllAmmPoolsResponse",
      value: QueryAllAmmPoolsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBorrowRatioRequest(): QueryBorrowRatioRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryBorrowRatioRequest = {
  typeUrl: "/elys.stablestake.QueryBorrowRatioRequest",
  encode(message: QueryBorrowRatioRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryBorrowRatioRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBorrowRatioRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBorrowRatioRequest>): QueryBorrowRatioRequest {
    const message = createBaseQueryBorrowRatioRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryBorrowRatioRequestAmino): QueryBorrowRatioRequest {
    const message = createBaseQueryBorrowRatioRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryBorrowRatioRequest, useInterfaces: boolean = false): QueryBorrowRatioRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBorrowRatioRequestAminoMsg): QueryBorrowRatioRequest {
    return QueryBorrowRatioRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBorrowRatioRequestProtoMsg, useInterfaces: boolean = false): QueryBorrowRatioRequest {
    return QueryBorrowRatioRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryBorrowRatioRequest): Uint8Array {
    return QueryBorrowRatioRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBorrowRatioRequest): QueryBorrowRatioRequestProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryBorrowRatioRequest",
      value: QueryBorrowRatioRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBorrowRatioResponse(): QueryBorrowRatioResponse {
  return {
    netAmount: "",
    totalBorrow: "",
    borrowRatio: ""
  };
}
export const QueryBorrowRatioResponse = {
  typeUrl: "/elys.stablestake.QueryBorrowRatioResponse",
  encode(message: QueryBorrowRatioResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.netAmount !== "") {
      writer.uint32(10).string(message.netAmount);
    }
    if (message.totalBorrow !== "") {
      writer.uint32(18).string(message.totalBorrow);
    }
    if (message.borrowRatio !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.borrowRatio, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryBorrowRatioResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBorrowRatioResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.netAmount = reader.string();
          break;
        case 2:
          message.totalBorrow = reader.string();
          break;
        case 3:
          message.borrowRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBorrowRatioResponse>): QueryBorrowRatioResponse {
    const message = createBaseQueryBorrowRatioResponse();
    message.netAmount = object.netAmount ?? "";
    message.totalBorrow = object.totalBorrow ?? "";
    message.borrowRatio = object.borrowRatio ?? "";
    return message;
  },
  fromAmino(object: QueryBorrowRatioResponseAmino): QueryBorrowRatioResponse {
    const message = createBaseQueryBorrowRatioResponse();
    if (object.net_amount !== undefined && object.net_amount !== null) {
      message.netAmount = object.net_amount;
    }
    if (object.total_borrow !== undefined && object.total_borrow !== null) {
      message.totalBorrow = object.total_borrow;
    }
    if (object.borrow_ratio !== undefined && object.borrow_ratio !== null) {
      message.borrowRatio = object.borrow_ratio;
    }
    return message;
  },
  toAmino(message: QueryBorrowRatioResponse, useInterfaces: boolean = false): QueryBorrowRatioResponseAmino {
    const obj: any = {};
    obj.net_amount = message.netAmount === "" ? undefined : message.netAmount;
    obj.total_borrow = message.totalBorrow === "" ? undefined : message.totalBorrow;
    obj.borrow_ratio = message.borrowRatio === "" ? undefined : message.borrowRatio;
    return obj;
  },
  fromAminoMsg(object: QueryBorrowRatioResponseAminoMsg): QueryBorrowRatioResponse {
    return QueryBorrowRatioResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBorrowRatioResponseProtoMsg, useInterfaces: boolean = false): QueryBorrowRatioResponse {
    return QueryBorrowRatioResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryBorrowRatioResponse): Uint8Array {
    return QueryBorrowRatioResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBorrowRatioResponse): QueryBorrowRatioResponseProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryBorrowRatioResponse",
      value: QueryBorrowRatioResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolRequest(): QueryGetPoolRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryGetPoolRequest = {
  typeUrl: "/elys.stablestake.QueryGetPoolRequest",
  encode(message: QueryGetPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPoolRequest>): QueryGetPoolRequest {
    const message = createBaseQueryGetPoolRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetPoolRequestAmino): QueryGetPoolRequest {
    const message = createBaseQueryGetPoolRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryGetPoolRequest, useInterfaces: boolean = false): QueryGetPoolRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolRequestAminoMsg): QueryGetPoolRequest {
    return QueryGetPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolRequestProtoMsg, useInterfaces: boolean = false): QueryGetPoolRequest {
    return QueryGetPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolRequest): Uint8Array {
    return QueryGetPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolRequest): QueryGetPoolRequestProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryGetPoolRequest",
      value: QueryGetPoolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetPoolResponse(): QueryGetPoolResponse {
  return {
    pool: PoolResponse.fromPartial({})
  };
}
export const QueryGetPoolResponse = {
  typeUrl: "/elys.stablestake.QueryGetPoolResponse",
  encode(message: QueryGetPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pool !== undefined) {
      PoolResponse.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = PoolResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPoolResponse>): QueryGetPoolResponse {
    const message = createBaseQueryGetPoolResponse();
    message.pool = object.pool !== undefined && object.pool !== null ? PoolResponse.fromPartial(object.pool) : undefined;
    return message;
  },
  fromAmino(object: QueryGetPoolResponseAmino): QueryGetPoolResponse {
    const message = createBaseQueryGetPoolResponse();
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = PoolResponse.fromAmino(object.pool);
    }
    return message;
  },
  toAmino(message: QueryGetPoolResponse, useInterfaces: boolean = false): QueryGetPoolResponseAmino {
    const obj: any = {};
    obj.pool = message.pool ? PoolResponse.toAmino(message.pool, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetPoolResponseAminoMsg): QueryGetPoolResponse {
    return QueryGetPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPoolResponseProtoMsg, useInterfaces: boolean = false): QueryGetPoolResponse {
    return QueryGetPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetPoolResponse): Uint8Array {
    return QueryGetPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPoolResponse): QueryGetPoolResponseProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryGetPoolResponse",
      value: QueryGetPoolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolRequest(): QueryAllPoolRequest {
  return {
    pagination: undefined
  };
}
export const QueryAllPoolRequest = {
  typeUrl: "/elys.stablestake.QueryAllPoolRequest",
  encode(message: QueryAllPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolRequest();
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
  fromPartial(object: Partial<QueryAllPoolRequest>): QueryAllPoolRequest {
    const message = createBaseQueryAllPoolRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPoolRequestAmino): QueryAllPoolRequest {
    const message = createBaseQueryAllPoolRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPoolRequest, useInterfaces: boolean = false): QueryAllPoolRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolRequestAminoMsg): QueryAllPoolRequest {
    return QueryAllPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolRequestProtoMsg, useInterfaces: boolean = false): QueryAllPoolRequest {
    return QueryAllPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolRequest): Uint8Array {
    return QueryAllPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolRequest): QueryAllPoolRequestProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryAllPoolRequest",
      value: QueryAllPoolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPoolResponse(): QueryAllPoolResponse {
  return {
    pools: [],
    pagination: undefined
  };
}
export const QueryAllPoolResponse = {
  typeUrl: "/elys.stablestake.QueryAllPoolResponse",
  encode(message: QueryAllPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pools) {
      PoolResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pools.push(PoolResponse.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAllPoolResponse>): QueryAllPoolResponse {
    const message = createBaseQueryAllPoolResponse();
    message.pools = object.pools?.map(e => PoolResponse.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAllPoolResponseAmino): QueryAllPoolResponse {
    const message = createBaseQueryAllPoolResponse();
    message.pools = object.pools?.map(e => PoolResponse.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAllPoolResponse, useInterfaces: boolean = false): QueryAllPoolResponseAmino {
    const obj: any = {};
    if (message.pools) {
      obj.pools = message.pools.map(e => e ? PoolResponse.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pools = message.pools;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAllPoolResponseAminoMsg): QueryAllPoolResponse {
    return QueryAllPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPoolResponseProtoMsg, useInterfaces: boolean = false): QueryAllPoolResponse {
    return QueryAllPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPoolResponse): Uint8Array {
    return QueryAllPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPoolResponse): QueryAllPoolResponseProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryAllPoolResponse",
      value: QueryAllPoolResponse.encode(message).finish()
    };
  }
};
function createBasePoolResponse(): PoolResponse {
  return {
    depositDenom: "",
    redemptionRate: "",
    interestRate: "",
    interestRateMax: "",
    interestRateMin: "",
    interestRateIncrease: "",
    interestRateDecrease: "",
    healthGainFactor: "",
    totalValue: "",
    maxLeverageRatio: "",
    poolId: BigInt(0),
    netAmount: "",
    totalBorrow: "",
    borrowRatio: "",
    maxWithdrawRatio: ""
  };
}
export const PoolResponse = {
  typeUrl: "/elys.stablestake.PoolResponse",
  encode(message: PoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.depositDenom !== "") {
      writer.uint32(10).string(message.depositDenom);
    }
    if (message.redemptionRate !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.redemptionRate, 18).atomics);
    }
    if (message.interestRate !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.interestRate, 18).atomics);
    }
    if (message.interestRateMax !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.interestRateMax, 18).atomics);
    }
    if (message.interestRateMin !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.interestRateMin, 18).atomics);
    }
    if (message.interestRateIncrease !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.interestRateIncrease, 18).atomics);
    }
    if (message.interestRateDecrease !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.interestRateDecrease, 18).atomics);
    }
    if (message.healthGainFactor !== "") {
      writer.uint32(66).string(Decimal.fromUserInput(message.healthGainFactor, 18).atomics);
    }
    if (message.totalValue !== "") {
      writer.uint32(74).string(Decimal.fromUserInput(message.totalValue, 18).atomics);
    }
    if (message.maxLeverageRatio !== "") {
      writer.uint32(82).string(Decimal.fromUserInput(message.maxLeverageRatio, 18).atomics);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(88).uint64(message.poolId);
    }
    if (message.netAmount !== "") {
      writer.uint32(98).string(message.netAmount);
    }
    if (message.totalBorrow !== "") {
      writer.uint32(106).string(message.totalBorrow);
    }
    if (message.borrowRatio !== "") {
      writer.uint32(114).string(Decimal.fromUserInput(message.borrowRatio, 18).atomics);
    }
    if (message.maxWithdrawRatio !== "") {
      writer.uint32(122).string(Decimal.fromUserInput(message.maxWithdrawRatio, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositDenom = reader.string();
          break;
        case 2:
          message.redemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.interestRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.interestRateMax = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.interestRateMin = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.interestRateIncrease = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.interestRateDecrease = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.healthGainFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 9:
          message.totalValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 10:
          message.maxLeverageRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 11:
          message.poolId = reader.uint64();
          break;
        case 12:
          message.netAmount = reader.string();
          break;
        case 13:
          message.totalBorrow = reader.string();
          break;
        case 14:
          message.borrowRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 15:
          message.maxWithdrawRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolResponse>): PoolResponse {
    const message = createBasePoolResponse();
    message.depositDenom = object.depositDenom ?? "";
    message.redemptionRate = object.redemptionRate ?? "";
    message.interestRate = object.interestRate ?? "";
    message.interestRateMax = object.interestRateMax ?? "";
    message.interestRateMin = object.interestRateMin ?? "";
    message.interestRateIncrease = object.interestRateIncrease ?? "";
    message.interestRateDecrease = object.interestRateDecrease ?? "";
    message.healthGainFactor = object.healthGainFactor ?? "";
    message.totalValue = object.totalValue ?? "";
    message.maxLeverageRatio = object.maxLeverageRatio ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.netAmount = object.netAmount ?? "";
    message.totalBorrow = object.totalBorrow ?? "";
    message.borrowRatio = object.borrowRatio ?? "";
    message.maxWithdrawRatio = object.maxWithdrawRatio ?? "";
    return message;
  },
  fromAmino(object: PoolResponseAmino): PoolResponse {
    const message = createBasePoolResponse();
    if (object.deposit_denom !== undefined && object.deposit_denom !== null) {
      message.depositDenom = object.deposit_denom;
    }
    if (object.redemption_rate !== undefined && object.redemption_rate !== null) {
      message.redemptionRate = object.redemption_rate;
    }
    if (object.interest_rate !== undefined && object.interest_rate !== null) {
      message.interestRate = object.interest_rate;
    }
    if (object.interest_rate_max !== undefined && object.interest_rate_max !== null) {
      message.interestRateMax = object.interest_rate_max;
    }
    if (object.interest_rate_min !== undefined && object.interest_rate_min !== null) {
      message.interestRateMin = object.interest_rate_min;
    }
    if (object.interest_rate_increase !== undefined && object.interest_rate_increase !== null) {
      message.interestRateIncrease = object.interest_rate_increase;
    }
    if (object.interest_rate_decrease !== undefined && object.interest_rate_decrease !== null) {
      message.interestRateDecrease = object.interest_rate_decrease;
    }
    if (object.health_gain_factor !== undefined && object.health_gain_factor !== null) {
      message.healthGainFactor = object.health_gain_factor;
    }
    if (object.total_value !== undefined && object.total_value !== null) {
      message.totalValue = object.total_value;
    }
    if (object.max_leverage_ratio !== undefined && object.max_leverage_ratio !== null) {
      message.maxLeverageRatio = object.max_leverage_ratio;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.net_amount !== undefined && object.net_amount !== null) {
      message.netAmount = object.net_amount;
    }
    if (object.total_borrow !== undefined && object.total_borrow !== null) {
      message.totalBorrow = object.total_borrow;
    }
    if (object.borrow_ratio !== undefined && object.borrow_ratio !== null) {
      message.borrowRatio = object.borrow_ratio;
    }
    if (object.max_withdraw_ratio !== undefined && object.max_withdraw_ratio !== null) {
      message.maxWithdrawRatio = object.max_withdraw_ratio;
    }
    return message;
  },
  toAmino(message: PoolResponse, useInterfaces: boolean = false): PoolResponseAmino {
    const obj: any = {};
    obj.deposit_denom = message.depositDenom === "" ? undefined : message.depositDenom;
    obj.redemption_rate = message.redemptionRate === "" ? undefined : message.redemptionRate;
    obj.interest_rate = message.interestRate === "" ? undefined : message.interestRate;
    obj.interest_rate_max = message.interestRateMax === "" ? undefined : message.interestRateMax;
    obj.interest_rate_min = message.interestRateMin === "" ? undefined : message.interestRateMin;
    obj.interest_rate_increase = message.interestRateIncrease === "" ? undefined : message.interestRateIncrease;
    obj.interest_rate_decrease = message.interestRateDecrease === "" ? undefined : message.interestRateDecrease;
    obj.health_gain_factor = message.healthGainFactor === "" ? undefined : message.healthGainFactor;
    obj.total_value = message.totalValue === "" ? undefined : message.totalValue;
    obj.max_leverage_ratio = message.maxLeverageRatio === "" ? undefined : message.maxLeverageRatio;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.net_amount = message.netAmount === "" ? undefined : message.netAmount;
    obj.total_borrow = message.totalBorrow === "" ? undefined : message.totalBorrow;
    obj.borrow_ratio = message.borrowRatio === "" ? undefined : message.borrowRatio;
    obj.max_withdraw_ratio = message.maxWithdrawRatio === "" ? undefined : message.maxWithdrawRatio;
    return obj;
  },
  fromAminoMsg(object: PoolResponseAminoMsg): PoolResponse {
    return PoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolResponseProtoMsg, useInterfaces: boolean = false): PoolResponse {
    return PoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolResponse): Uint8Array {
    return PoolResponse.encode(message).finish();
  },
  toProtoMsg(message: PoolResponse): PoolResponseProtoMsg {
    return {
      typeUrl: "/elys.stablestake.PoolResponse",
      value: PoolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDebtRequest(): QueryDebtRequest {
  return {
    poolId: BigInt(0),
    address: ""
  };
}
export const QueryDebtRequest = {
  typeUrl: "/elys.stablestake.QueryDebtRequest",
  encode(message: QueryDebtRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDebtRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDebtRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDebtRequest>): QueryDebtRequest {
    const message = createBaseQueryDebtRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryDebtRequestAmino): QueryDebtRequest {
    const message = createBaseQueryDebtRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryDebtRequest, useInterfaces: boolean = false): QueryDebtRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryDebtRequestAminoMsg): QueryDebtRequest {
    return QueryDebtRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDebtRequestProtoMsg, useInterfaces: boolean = false): QueryDebtRequest {
    return QueryDebtRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDebtRequest): Uint8Array {
    return QueryDebtRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDebtRequest): QueryDebtRequestProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryDebtRequest",
      value: QueryDebtRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDebtResponse(): QueryDebtResponse {
  return {
    debt: Debt.fromPartial({})
  };
}
export const QueryDebtResponse = {
  typeUrl: "/elys.stablestake.QueryDebtResponse",
  encode(message: QueryDebtResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.debt !== undefined) {
      Debt.encode(message.debt, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDebtResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDebtResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.debt = Debt.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDebtResponse>): QueryDebtResponse {
    const message = createBaseQueryDebtResponse();
    message.debt = object.debt !== undefined && object.debt !== null ? Debt.fromPartial(object.debt) : undefined;
    return message;
  },
  fromAmino(object: QueryDebtResponseAmino): QueryDebtResponse {
    const message = createBaseQueryDebtResponse();
    if (object.debt !== undefined && object.debt !== null) {
      message.debt = Debt.fromAmino(object.debt);
    }
    return message;
  },
  toAmino(message: QueryDebtResponse, useInterfaces: boolean = false): QueryDebtResponseAmino {
    const obj: any = {};
    obj.debt = message.debt ? Debt.toAmino(message.debt, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDebtResponseAminoMsg): QueryDebtResponse {
    return QueryDebtResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDebtResponseProtoMsg, useInterfaces: boolean = false): QueryDebtResponse {
    return QueryDebtResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDebtResponse): Uint8Array {
    return QueryDebtResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDebtResponse): QueryDebtResponseProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryDebtResponse",
      value: QueryDebtResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetInterestRequest(): QueryGetInterestRequest {
  return {
    poolId: BigInt(0),
    blockHeight: BigInt(0)
  };
}
export const QueryGetInterestRequest = {
  typeUrl: "/elys.stablestake.QueryGetInterestRequest",
  encode(message: QueryGetInterestRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.blockHeight !== BigInt(0)) {
      writer.uint32(16).uint64(message.blockHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetInterestRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetInterestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.blockHeight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetInterestRequest>): QueryGetInterestRequest {
    const message = createBaseQueryGetInterestRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetInterestRequestAmino): QueryGetInterestRequest {
    const message = createBaseQueryGetInterestRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = BigInt(object.block_height);
    }
    return message;
  },
  toAmino(message: QueryGetInterestRequest, useInterfaces: boolean = false): QueryGetInterestRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.block_height = message.blockHeight !== BigInt(0) ? message.blockHeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetInterestRequestAminoMsg): QueryGetInterestRequest {
    return QueryGetInterestRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetInterestRequestProtoMsg, useInterfaces: boolean = false): QueryGetInterestRequest {
    return QueryGetInterestRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetInterestRequest): Uint8Array {
    return QueryGetInterestRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetInterestRequest): QueryGetInterestRequestProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryGetInterestRequest",
      value: QueryGetInterestRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetInterestResponse(): QueryGetInterestResponse {
  return {
    interestBlock: InterestBlock.fromPartial({})
  };
}
export const QueryGetInterestResponse = {
  typeUrl: "/elys.stablestake.QueryGetInterestResponse",
  encode(message: QueryGetInterestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.interestBlock !== undefined) {
      InterestBlock.encode(message.interestBlock, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetInterestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetInterestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interestBlock = InterestBlock.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetInterestResponse>): QueryGetInterestResponse {
    const message = createBaseQueryGetInterestResponse();
    message.interestBlock = object.interestBlock !== undefined && object.interestBlock !== null ? InterestBlock.fromPartial(object.interestBlock) : undefined;
    return message;
  },
  fromAmino(object: QueryGetInterestResponseAmino): QueryGetInterestResponse {
    const message = createBaseQueryGetInterestResponse();
    if (object.interest_block !== undefined && object.interest_block !== null) {
      message.interestBlock = InterestBlock.fromAmino(object.interest_block);
    }
    return message;
  },
  toAmino(message: QueryGetInterestResponse, useInterfaces: boolean = false): QueryGetInterestResponseAmino {
    const obj: any = {};
    obj.interest_block = message.interestBlock ? InterestBlock.toAmino(message.interestBlock, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetInterestResponseAminoMsg): QueryGetInterestResponse {
    return QueryGetInterestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetInterestResponseProtoMsg, useInterfaces: boolean = false): QueryGetInterestResponse {
    return QueryGetInterestResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetInterestResponse): Uint8Array {
    return QueryGetInterestResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetInterestResponse): QueryGetInterestResponseProtoMsg {
    return {
      typeUrl: "/elys.stablestake.QueryGetInterestResponse",
      value: QueryGetInterestResponse.encode(message).finish()
    };
  }
};