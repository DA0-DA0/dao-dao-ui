//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Gauge, GaugeAmino, GaugeSDKType } from "./gauge";
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface ModuleToDistributeCoinsRequest {}
export interface ModuleToDistributeCoinsRequestProtoMsg {
  typeUrl: "/osmosis.incentives.ModuleToDistributeCoinsRequest";
  value: Uint8Array;
}
export interface ModuleToDistributeCoinsRequestAmino {}
export interface ModuleToDistributeCoinsRequestAminoMsg {
  type: "osmosis/incentives/module-to-distribute-coins-request";
  value: ModuleToDistributeCoinsRequestAmino;
}
export interface ModuleToDistributeCoinsRequestSDKType {}
export interface ModuleToDistributeCoinsResponse {
  /** Coins that have yet to be distributed */
  coins: Coin[];
}
export interface ModuleToDistributeCoinsResponseProtoMsg {
  typeUrl: "/osmosis.incentives.ModuleToDistributeCoinsResponse";
  value: Uint8Array;
}
export interface ModuleToDistributeCoinsResponseAmino {
  /** Coins that have yet to be distributed */
  coins: CoinAmino[];
}
export interface ModuleToDistributeCoinsResponseAminoMsg {
  type: "osmosis/incentives/module-to-distribute-coins-response";
  value: ModuleToDistributeCoinsResponseAmino;
}
export interface ModuleToDistributeCoinsResponseSDKType {
  coins: CoinSDKType[];
}
export interface GaugeByIDRequest {
  /** Gague ID being queried */
  id: bigint;
}
export interface GaugeByIDRequestProtoMsg {
  typeUrl: "/osmosis.incentives.GaugeByIDRequest";
  value: Uint8Array;
}
export interface GaugeByIDRequestAmino {
  /** Gague ID being queried */
  id: string;
}
export interface GaugeByIDRequestAminoMsg {
  type: "osmosis/incentives/gauge-by-id-request";
  value: GaugeByIDRequestAmino;
}
export interface GaugeByIDRequestSDKType {
  id: bigint;
}
export interface GaugeByIDResponse {
  /** Gauge that corresponds to provided gague ID */
  gauge?: Gauge | undefined;
}
export interface GaugeByIDResponseProtoMsg {
  typeUrl: "/osmosis.incentives.GaugeByIDResponse";
  value: Uint8Array;
}
export interface GaugeByIDResponseAmino {
  /** Gauge that corresponds to provided gague ID */
  gauge?: GaugeAmino | undefined;
}
export interface GaugeByIDResponseAminoMsg {
  type: "osmosis/incentives/gauge-by-id-response";
  value: GaugeByIDResponseAmino;
}
export interface GaugeByIDResponseSDKType {
  gauge?: GaugeSDKType | undefined;
}
export interface GaugesRequest {
  /** Pagination defines pagination for the request */
  pagination?: PageRequest | undefined;
}
export interface GaugesRequestProtoMsg {
  typeUrl: "/osmosis.incentives.GaugesRequest";
  value: Uint8Array;
}
export interface GaugesRequestAmino {
  /** Pagination defines pagination for the request */
  pagination?: PageRequestAmino | undefined;
}
export interface GaugesRequestAminoMsg {
  type: "osmosis/incentives/gauges-request";
  value: GaugesRequestAmino;
}
export interface GaugesRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface GaugesResponse {
  /** Upcoming and active gauges */
  data: Gauge[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponse | undefined;
}
export interface GaugesResponseProtoMsg {
  typeUrl: "/osmosis.incentives.GaugesResponse";
  value: Uint8Array;
}
export interface GaugesResponseAmino {
  /** Upcoming and active gauges */
  data: GaugeAmino[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponseAmino | undefined;
}
export interface GaugesResponseAminoMsg {
  type: "osmosis/incentives/gauges-response";
  value: GaugesResponseAmino;
}
export interface GaugesResponseSDKType {
  data: GaugeSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface ActiveGaugesRequest {
  /** Pagination defines pagination for the request */
  pagination?: PageRequest | undefined;
}
export interface ActiveGaugesRequestProtoMsg {
  typeUrl: "/osmosis.incentives.ActiveGaugesRequest";
  value: Uint8Array;
}
export interface ActiveGaugesRequestAmino {
  /** Pagination defines pagination for the request */
  pagination?: PageRequestAmino | undefined;
}
export interface ActiveGaugesRequestAminoMsg {
  type: "osmosis/incentives/active-gauges-request";
  value: ActiveGaugesRequestAmino;
}
export interface ActiveGaugesRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface ActiveGaugesResponse {
  /** Active gagues only */
  data: Gauge[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponse | undefined;
}
export interface ActiveGaugesResponseProtoMsg {
  typeUrl: "/osmosis.incentives.ActiveGaugesResponse";
  value: Uint8Array;
}
export interface ActiveGaugesResponseAmino {
  /** Active gagues only */
  data: GaugeAmino[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponseAmino | undefined;
}
export interface ActiveGaugesResponseAminoMsg {
  type: "osmosis/incentives/active-gauges-response";
  value: ActiveGaugesResponseAmino;
}
export interface ActiveGaugesResponseSDKType {
  data: GaugeSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface ActiveGaugesPerDenomRequest {
  /** Desired denom when querying active gagues */
  denom: string;
  /** Pagination defines pagination for the request */
  pagination?: PageRequest | undefined;
}
export interface ActiveGaugesPerDenomRequestProtoMsg {
  typeUrl: "/osmosis.incentives.ActiveGaugesPerDenomRequest";
  value: Uint8Array;
}
export interface ActiveGaugesPerDenomRequestAmino {
  /** Desired denom when querying active gagues */
  denom: string;
  /** Pagination defines pagination for the request */
  pagination?: PageRequestAmino | undefined;
}
export interface ActiveGaugesPerDenomRequestAminoMsg {
  type: "osmosis/incentives/active-gauges-per-denom-request";
  value: ActiveGaugesPerDenomRequestAmino;
}
export interface ActiveGaugesPerDenomRequestSDKType {
  denom: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface ActiveGaugesPerDenomResponse {
  /** Active gagues that match denom in query */
  data: Gauge[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponse | undefined;
}
export interface ActiveGaugesPerDenomResponseProtoMsg {
  typeUrl: "/osmosis.incentives.ActiveGaugesPerDenomResponse";
  value: Uint8Array;
}
export interface ActiveGaugesPerDenomResponseAmino {
  /** Active gagues that match denom in query */
  data: GaugeAmino[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponseAmino | undefined;
}
export interface ActiveGaugesPerDenomResponseAminoMsg {
  type: "osmosis/incentives/active-gauges-per-denom-response";
  value: ActiveGaugesPerDenomResponseAmino;
}
export interface ActiveGaugesPerDenomResponseSDKType {
  data: GaugeSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface UpcomingGaugesRequest {
  /** Pagination defines pagination for the request */
  pagination?: PageRequest | undefined;
}
export interface UpcomingGaugesRequestProtoMsg {
  typeUrl: "/osmosis.incentives.UpcomingGaugesRequest";
  value: Uint8Array;
}
export interface UpcomingGaugesRequestAmino {
  /** Pagination defines pagination for the request */
  pagination?: PageRequestAmino | undefined;
}
export interface UpcomingGaugesRequestAminoMsg {
  type: "osmosis/incentives/upcoming-gauges-request";
  value: UpcomingGaugesRequestAmino;
}
export interface UpcomingGaugesRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface UpcomingGaugesResponse {
  /** Gauges whose distribution is upcoming */
  data: Gauge[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponse | undefined;
}
export interface UpcomingGaugesResponseProtoMsg {
  typeUrl: "/osmosis.incentives.UpcomingGaugesResponse";
  value: Uint8Array;
}
export interface UpcomingGaugesResponseAmino {
  /** Gauges whose distribution is upcoming */
  data: GaugeAmino[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponseAmino | undefined;
}
export interface UpcomingGaugesResponseAminoMsg {
  type: "osmosis/incentives/upcoming-gauges-response";
  value: UpcomingGaugesResponseAmino;
}
export interface UpcomingGaugesResponseSDKType {
  data: GaugeSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface UpcomingGaugesPerDenomRequest {
  /** Filter for upcoming gagues that match specific denom */
  denom: string;
  /** Pagination defines pagination for the request */
  pagination?: PageRequest | undefined;
}
export interface UpcomingGaugesPerDenomRequestProtoMsg {
  typeUrl: "/osmosis.incentives.UpcomingGaugesPerDenomRequest";
  value: Uint8Array;
}
export interface UpcomingGaugesPerDenomRequestAmino {
  /** Filter for upcoming gagues that match specific denom */
  denom: string;
  /** Pagination defines pagination for the request */
  pagination?: PageRequestAmino | undefined;
}
export interface UpcomingGaugesPerDenomRequestAminoMsg {
  type: "osmosis/incentives/upcoming-gauges-per-denom-request";
  value: UpcomingGaugesPerDenomRequestAmino;
}
export interface UpcomingGaugesPerDenomRequestSDKType {
  denom: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface UpcomingGaugesPerDenomResponse {
  /** Upcoming gagues that match denom in query */
  upcomingGauges: Gauge[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponse | undefined;
}
export interface UpcomingGaugesPerDenomResponseProtoMsg {
  typeUrl: "/osmosis.incentives.UpcomingGaugesPerDenomResponse";
  value: Uint8Array;
}
export interface UpcomingGaugesPerDenomResponseAmino {
  /** Upcoming gagues that match denom in query */
  upcoming_gauges: GaugeAmino[];
  /** Pagination defines pagination for the response */
  pagination?: PageResponseAmino | undefined;
}
export interface UpcomingGaugesPerDenomResponseAminoMsg {
  type: "osmosis/incentives/upcoming-gauges-per-denom-response";
  value: UpcomingGaugesPerDenomResponseAmino;
}
export interface UpcomingGaugesPerDenomResponseSDKType {
  upcoming_gauges: GaugeSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface RewardsEstRequest {
  /** Address that is being queried for future estimated rewards */
  owner: string;
  /** Lock IDs included in future reward estimation */
  lockIds: bigint[];
  /**
   * Upper time limit of reward estimation
   * Lower limit is current epoch
   */
  endEpoch: bigint;
}
export interface RewardsEstRequestProtoMsg {
  typeUrl: "/osmosis.incentives.RewardsEstRequest";
  value: Uint8Array;
}
export interface RewardsEstRequestAmino {
  /** Address that is being queried for future estimated rewards */
  owner: string;
  /** Lock IDs included in future reward estimation */
  lock_ids: string[];
  /**
   * Upper time limit of reward estimation
   * Lower limit is current epoch
   */
  end_epoch: string;
}
export interface RewardsEstRequestAminoMsg {
  type: "osmosis/incentives/rewards-est-request";
  value: RewardsEstRequestAmino;
}
export interface RewardsEstRequestSDKType {
  owner: string;
  lock_ids: bigint[];
  end_epoch: bigint;
}
export interface RewardsEstResponse {
  /**
   * Estimated coin rewards that will be recieved at provided address
   * from specified locks between current time and end epoch
   */
  coins: Coin[];
}
export interface RewardsEstResponseProtoMsg {
  typeUrl: "/osmosis.incentives.RewardsEstResponse";
  value: Uint8Array;
}
export interface RewardsEstResponseAmino {
  /**
   * Estimated coin rewards that will be recieved at provided address
   * from specified locks between current time and end epoch
   */
  coins: CoinAmino[];
}
export interface RewardsEstResponseAminoMsg {
  type: "osmosis/incentives/rewards-est-response";
  value: RewardsEstResponseAmino;
}
export interface RewardsEstResponseSDKType {
  coins: CoinSDKType[];
}
export interface QueryLockableDurationsRequest {}
export interface QueryLockableDurationsRequestProtoMsg {
  typeUrl: "/osmosis.incentives.QueryLockableDurationsRequest";
  value: Uint8Array;
}
export interface QueryLockableDurationsRequestAmino {}
export interface QueryLockableDurationsRequestAminoMsg {
  type: "osmosis/incentives/query-lockable-durations-request";
  value: QueryLockableDurationsRequestAmino;
}
export interface QueryLockableDurationsRequestSDKType {}
export interface QueryLockableDurationsResponse {
  /** Time durations that users can lock coins for in order to recieve rewards */
  lockableDurations: Duration[];
}
export interface QueryLockableDurationsResponseProtoMsg {
  typeUrl: "/osmosis.incentives.QueryLockableDurationsResponse";
  value: Uint8Array;
}
export interface QueryLockableDurationsResponseAmino {
  /** Time durations that users can lock coins for in order to recieve rewards */
  lockable_durations: DurationAmino[];
}
export interface QueryLockableDurationsResponseAminoMsg {
  type: "osmosis/incentives/query-lockable-durations-response";
  value: QueryLockableDurationsResponseAmino;
}
export interface QueryLockableDurationsResponseSDKType {
  lockable_durations: DurationSDKType[];
}
function createBaseModuleToDistributeCoinsRequest(): ModuleToDistributeCoinsRequest {
  return {};
}
export const ModuleToDistributeCoinsRequest = {
  typeUrl: "/osmosis.incentives.ModuleToDistributeCoinsRequest",
  encode(_: ModuleToDistributeCoinsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ModuleToDistributeCoinsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleToDistributeCoinsRequest();
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
  fromPartial(_: Partial<ModuleToDistributeCoinsRequest>): ModuleToDistributeCoinsRequest {
    const message = createBaseModuleToDistributeCoinsRequest();
    return message;
  },
  fromAmino(_: ModuleToDistributeCoinsRequestAmino): ModuleToDistributeCoinsRequest {
    return {};
  },
  toAmino(_: ModuleToDistributeCoinsRequest, useInterfaces: boolean = false): ModuleToDistributeCoinsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: ModuleToDistributeCoinsRequestAminoMsg): ModuleToDistributeCoinsRequest {
    return ModuleToDistributeCoinsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: ModuleToDistributeCoinsRequest, useInterfaces: boolean = false): ModuleToDistributeCoinsRequestAminoMsg {
    return {
      type: "osmosis/incentives/module-to-distribute-coins-request",
      value: ModuleToDistributeCoinsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ModuleToDistributeCoinsRequestProtoMsg, useInterfaces: boolean = false): ModuleToDistributeCoinsRequest {
    return ModuleToDistributeCoinsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ModuleToDistributeCoinsRequest): Uint8Array {
    return ModuleToDistributeCoinsRequest.encode(message).finish();
  },
  toProtoMsg(message: ModuleToDistributeCoinsRequest): ModuleToDistributeCoinsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.ModuleToDistributeCoinsRequest",
      value: ModuleToDistributeCoinsRequest.encode(message).finish()
    };
  }
};
function createBaseModuleToDistributeCoinsResponse(): ModuleToDistributeCoinsResponse {
  return {
    coins: []
  };
}
export const ModuleToDistributeCoinsResponse = {
  typeUrl: "/osmosis.incentives.ModuleToDistributeCoinsResponse",
  encode(message: ModuleToDistributeCoinsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ModuleToDistributeCoinsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleToDistributeCoinsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ModuleToDistributeCoinsResponse>): ModuleToDistributeCoinsResponse {
    const message = createBaseModuleToDistributeCoinsResponse();
    message.coins = object.coins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ModuleToDistributeCoinsResponseAmino): ModuleToDistributeCoinsResponse {
    return {
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromAmino(e)) : []
    };
  },
  toAmino(message: ModuleToDistributeCoinsResponse, useInterfaces: boolean = false): ModuleToDistributeCoinsResponseAmino {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.coins = [];
    }
    return obj;
  },
  fromAminoMsg(object: ModuleToDistributeCoinsResponseAminoMsg): ModuleToDistributeCoinsResponse {
    return ModuleToDistributeCoinsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: ModuleToDistributeCoinsResponse, useInterfaces: boolean = false): ModuleToDistributeCoinsResponseAminoMsg {
    return {
      type: "osmosis/incentives/module-to-distribute-coins-response",
      value: ModuleToDistributeCoinsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ModuleToDistributeCoinsResponseProtoMsg, useInterfaces: boolean = false): ModuleToDistributeCoinsResponse {
    return ModuleToDistributeCoinsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ModuleToDistributeCoinsResponse): Uint8Array {
    return ModuleToDistributeCoinsResponse.encode(message).finish();
  },
  toProtoMsg(message: ModuleToDistributeCoinsResponse): ModuleToDistributeCoinsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.ModuleToDistributeCoinsResponse",
      value: ModuleToDistributeCoinsResponse.encode(message).finish()
    };
  }
};
function createBaseGaugeByIDRequest(): GaugeByIDRequest {
  return {
    id: BigInt(0)
  };
}
export const GaugeByIDRequest = {
  typeUrl: "/osmosis.incentives.GaugeByIDRequest",
  encode(message: GaugeByIDRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GaugeByIDRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugeByIDRequest();
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
  fromPartial(object: Partial<GaugeByIDRequest>): GaugeByIDRequest {
    const message = createBaseGaugeByIDRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GaugeByIDRequestAmino): GaugeByIDRequest {
    return {
      id: BigInt(object.id)
    };
  },
  toAmino(message: GaugeByIDRequest, useInterfaces: boolean = false): GaugeByIDRequestAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: GaugeByIDRequestAminoMsg): GaugeByIDRequest {
    return GaugeByIDRequest.fromAmino(object.value);
  },
  toAminoMsg(message: GaugeByIDRequest, useInterfaces: boolean = false): GaugeByIDRequestAminoMsg {
    return {
      type: "osmosis/incentives/gauge-by-id-request",
      value: GaugeByIDRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GaugeByIDRequestProtoMsg, useInterfaces: boolean = false): GaugeByIDRequest {
    return GaugeByIDRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GaugeByIDRequest): Uint8Array {
    return GaugeByIDRequest.encode(message).finish();
  },
  toProtoMsg(message: GaugeByIDRequest): GaugeByIDRequestProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.GaugeByIDRequest",
      value: GaugeByIDRequest.encode(message).finish()
    };
  }
};
function createBaseGaugeByIDResponse(): GaugeByIDResponse {
  return {
    gauge: undefined
  };
}
export const GaugeByIDResponse = {
  typeUrl: "/osmosis.incentives.GaugeByIDResponse",
  encode(message: GaugeByIDResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.gauge !== undefined) {
      Gauge.encode(message.gauge, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GaugeByIDResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugeByIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gauge = Gauge.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GaugeByIDResponse>): GaugeByIDResponse {
    const message = createBaseGaugeByIDResponse();
    message.gauge = object.gauge !== undefined && object.gauge !== null ? Gauge.fromPartial(object.gauge) : undefined;
    return message;
  },
  fromAmino(object: GaugeByIDResponseAmino): GaugeByIDResponse {
    return {
      gauge: object?.gauge ? Gauge.fromAmino(object.gauge) : undefined
    };
  },
  toAmino(message: GaugeByIDResponse, useInterfaces: boolean = false): GaugeByIDResponseAmino {
    const obj: any = {};
    obj.gauge = message.gauge ? Gauge.toAmino(message.gauge, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: GaugeByIDResponseAminoMsg): GaugeByIDResponse {
    return GaugeByIDResponse.fromAmino(object.value);
  },
  toAminoMsg(message: GaugeByIDResponse, useInterfaces: boolean = false): GaugeByIDResponseAminoMsg {
    return {
      type: "osmosis/incentives/gauge-by-id-response",
      value: GaugeByIDResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GaugeByIDResponseProtoMsg, useInterfaces: boolean = false): GaugeByIDResponse {
    return GaugeByIDResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GaugeByIDResponse): Uint8Array {
    return GaugeByIDResponse.encode(message).finish();
  },
  toProtoMsg(message: GaugeByIDResponse): GaugeByIDResponseProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.GaugeByIDResponse",
      value: GaugeByIDResponse.encode(message).finish()
    };
  }
};
function createBaseGaugesRequest(): GaugesRequest {
  return {
    pagination: undefined
  };
}
export const GaugesRequest = {
  typeUrl: "/osmosis.incentives.GaugesRequest",
  encode(message: GaugesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GaugesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugesRequest();
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
  fromPartial(object: Partial<GaugesRequest>): GaugesRequest {
    const message = createBaseGaugesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: GaugesRequestAmino): GaugesRequest {
    return {
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: GaugesRequest, useInterfaces: boolean = false): GaugesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: GaugesRequestAminoMsg): GaugesRequest {
    return GaugesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: GaugesRequest, useInterfaces: boolean = false): GaugesRequestAminoMsg {
    return {
      type: "osmosis/incentives/gauges-request",
      value: GaugesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GaugesRequestProtoMsg, useInterfaces: boolean = false): GaugesRequest {
    return GaugesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GaugesRequest): Uint8Array {
    return GaugesRequest.encode(message).finish();
  },
  toProtoMsg(message: GaugesRequest): GaugesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.GaugesRequest",
      value: GaugesRequest.encode(message).finish()
    };
  }
};
function createBaseGaugesResponse(): GaugesResponse {
  return {
    data: [],
    pagination: undefined
  };
}
export const GaugesResponse = {
  typeUrl: "/osmosis.incentives.GaugesResponse",
  encode(message: GaugesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GaugesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<GaugesResponse>): GaugesResponse {
    const message = createBaseGaugesResponse();
    message.data = object.data?.map(e => Gauge.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: GaugesResponseAmino): GaugesResponse {
    return {
      data: Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: GaugesResponse, useInterfaces: boolean = false): GaugesResponseAmino {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map(e => e ? Gauge.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.data = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: GaugesResponseAminoMsg): GaugesResponse {
    return GaugesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: GaugesResponse, useInterfaces: boolean = false): GaugesResponseAminoMsg {
    return {
      type: "osmosis/incentives/gauges-response",
      value: GaugesResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GaugesResponseProtoMsg, useInterfaces: boolean = false): GaugesResponse {
    return GaugesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GaugesResponse): Uint8Array {
    return GaugesResponse.encode(message).finish();
  },
  toProtoMsg(message: GaugesResponse): GaugesResponseProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.GaugesResponse",
      value: GaugesResponse.encode(message).finish()
    };
  }
};
function createBaseActiveGaugesRequest(): ActiveGaugesRequest {
  return {
    pagination: undefined
  };
}
export const ActiveGaugesRequest = {
  typeUrl: "/osmosis.incentives.ActiveGaugesRequest",
  encode(message: ActiveGaugesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ActiveGaugesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesRequest();
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
  fromPartial(object: Partial<ActiveGaugesRequest>): ActiveGaugesRequest {
    const message = createBaseActiveGaugesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: ActiveGaugesRequestAmino): ActiveGaugesRequest {
    return {
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: ActiveGaugesRequest, useInterfaces: boolean = false): ActiveGaugesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ActiveGaugesRequestAminoMsg): ActiveGaugesRequest {
    return ActiveGaugesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: ActiveGaugesRequest, useInterfaces: boolean = false): ActiveGaugesRequestAminoMsg {
    return {
      type: "osmosis/incentives/active-gauges-request",
      value: ActiveGaugesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ActiveGaugesRequestProtoMsg, useInterfaces: boolean = false): ActiveGaugesRequest {
    return ActiveGaugesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ActiveGaugesRequest): Uint8Array {
    return ActiveGaugesRequest.encode(message).finish();
  },
  toProtoMsg(message: ActiveGaugesRequest): ActiveGaugesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.ActiveGaugesRequest",
      value: ActiveGaugesRequest.encode(message).finish()
    };
  }
};
function createBaseActiveGaugesResponse(): ActiveGaugesResponse {
  return {
    data: [],
    pagination: undefined
  };
}
export const ActiveGaugesResponse = {
  typeUrl: "/osmosis.incentives.ActiveGaugesResponse",
  encode(message: ActiveGaugesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ActiveGaugesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<ActiveGaugesResponse>): ActiveGaugesResponse {
    const message = createBaseActiveGaugesResponse();
    message.data = object.data?.map(e => Gauge.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: ActiveGaugesResponseAmino): ActiveGaugesResponse {
    return {
      data: Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: ActiveGaugesResponse, useInterfaces: boolean = false): ActiveGaugesResponseAmino {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map(e => e ? Gauge.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.data = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ActiveGaugesResponseAminoMsg): ActiveGaugesResponse {
    return ActiveGaugesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: ActiveGaugesResponse, useInterfaces: boolean = false): ActiveGaugesResponseAminoMsg {
    return {
      type: "osmosis/incentives/active-gauges-response",
      value: ActiveGaugesResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ActiveGaugesResponseProtoMsg, useInterfaces: boolean = false): ActiveGaugesResponse {
    return ActiveGaugesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ActiveGaugesResponse): Uint8Array {
    return ActiveGaugesResponse.encode(message).finish();
  },
  toProtoMsg(message: ActiveGaugesResponse): ActiveGaugesResponseProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.ActiveGaugesResponse",
      value: ActiveGaugesResponse.encode(message).finish()
    };
  }
};
function createBaseActiveGaugesPerDenomRequest(): ActiveGaugesPerDenomRequest {
  return {
    denom: "",
    pagination: undefined
  };
}
export const ActiveGaugesPerDenomRequest = {
  typeUrl: "/osmosis.incentives.ActiveGaugesPerDenomRequest",
  encode(message: ActiveGaugesPerDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ActiveGaugesPerDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesPerDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
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
  fromPartial(object: Partial<ActiveGaugesPerDenomRequest>): ActiveGaugesPerDenomRequest {
    const message = createBaseActiveGaugesPerDenomRequest();
    message.denom = object.denom ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: ActiveGaugesPerDenomRequestAmino): ActiveGaugesPerDenomRequest {
    return {
      denom: object.denom,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: ActiveGaugesPerDenomRequest, useInterfaces: boolean = false): ActiveGaugesPerDenomRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ActiveGaugesPerDenomRequestAminoMsg): ActiveGaugesPerDenomRequest {
    return ActiveGaugesPerDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: ActiveGaugesPerDenomRequest, useInterfaces: boolean = false): ActiveGaugesPerDenomRequestAminoMsg {
    return {
      type: "osmosis/incentives/active-gauges-per-denom-request",
      value: ActiveGaugesPerDenomRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ActiveGaugesPerDenomRequestProtoMsg, useInterfaces: boolean = false): ActiveGaugesPerDenomRequest {
    return ActiveGaugesPerDenomRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ActiveGaugesPerDenomRequest): Uint8Array {
    return ActiveGaugesPerDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: ActiveGaugesPerDenomRequest): ActiveGaugesPerDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.ActiveGaugesPerDenomRequest",
      value: ActiveGaugesPerDenomRequest.encode(message).finish()
    };
  }
};
function createBaseActiveGaugesPerDenomResponse(): ActiveGaugesPerDenomResponse {
  return {
    data: [],
    pagination: undefined
  };
}
export const ActiveGaugesPerDenomResponse = {
  typeUrl: "/osmosis.incentives.ActiveGaugesPerDenomResponse",
  encode(message: ActiveGaugesPerDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ActiveGaugesPerDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesPerDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<ActiveGaugesPerDenomResponse>): ActiveGaugesPerDenomResponse {
    const message = createBaseActiveGaugesPerDenomResponse();
    message.data = object.data?.map(e => Gauge.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: ActiveGaugesPerDenomResponseAmino): ActiveGaugesPerDenomResponse {
    return {
      data: Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: ActiveGaugesPerDenomResponse, useInterfaces: boolean = false): ActiveGaugesPerDenomResponseAmino {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map(e => e ? Gauge.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.data = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ActiveGaugesPerDenomResponseAminoMsg): ActiveGaugesPerDenomResponse {
    return ActiveGaugesPerDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: ActiveGaugesPerDenomResponse, useInterfaces: boolean = false): ActiveGaugesPerDenomResponseAminoMsg {
    return {
      type: "osmosis/incentives/active-gauges-per-denom-response",
      value: ActiveGaugesPerDenomResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ActiveGaugesPerDenomResponseProtoMsg, useInterfaces: boolean = false): ActiveGaugesPerDenomResponse {
    return ActiveGaugesPerDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ActiveGaugesPerDenomResponse): Uint8Array {
    return ActiveGaugesPerDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: ActiveGaugesPerDenomResponse): ActiveGaugesPerDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.ActiveGaugesPerDenomResponse",
      value: ActiveGaugesPerDenomResponse.encode(message).finish()
    };
  }
};
function createBaseUpcomingGaugesRequest(): UpcomingGaugesRequest {
  return {
    pagination: undefined
  };
}
export const UpcomingGaugesRequest = {
  typeUrl: "/osmosis.incentives.UpcomingGaugesRequest",
  encode(message: UpcomingGaugesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpcomingGaugesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesRequest();
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
  fromPartial(object: Partial<UpcomingGaugesRequest>): UpcomingGaugesRequest {
    const message = createBaseUpcomingGaugesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: UpcomingGaugesRequestAmino): UpcomingGaugesRequest {
    return {
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: UpcomingGaugesRequest, useInterfaces: boolean = false): UpcomingGaugesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: UpcomingGaugesRequestAminoMsg): UpcomingGaugesRequest {
    return UpcomingGaugesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: UpcomingGaugesRequest, useInterfaces: boolean = false): UpcomingGaugesRequestAminoMsg {
    return {
      type: "osmosis/incentives/upcoming-gauges-request",
      value: UpcomingGaugesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: UpcomingGaugesRequestProtoMsg, useInterfaces: boolean = false): UpcomingGaugesRequest {
    return UpcomingGaugesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpcomingGaugesRequest): Uint8Array {
    return UpcomingGaugesRequest.encode(message).finish();
  },
  toProtoMsg(message: UpcomingGaugesRequest): UpcomingGaugesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.UpcomingGaugesRequest",
      value: UpcomingGaugesRequest.encode(message).finish()
    };
  }
};
function createBaseUpcomingGaugesResponse(): UpcomingGaugesResponse {
  return {
    data: [],
    pagination: undefined
  };
}
export const UpcomingGaugesResponse = {
  typeUrl: "/osmosis.incentives.UpcomingGaugesResponse",
  encode(message: UpcomingGaugesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpcomingGaugesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<UpcomingGaugesResponse>): UpcomingGaugesResponse {
    const message = createBaseUpcomingGaugesResponse();
    message.data = object.data?.map(e => Gauge.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: UpcomingGaugesResponseAmino): UpcomingGaugesResponse {
    return {
      data: Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: UpcomingGaugesResponse, useInterfaces: boolean = false): UpcomingGaugesResponseAmino {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map(e => e ? Gauge.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.data = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: UpcomingGaugesResponseAminoMsg): UpcomingGaugesResponse {
    return UpcomingGaugesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: UpcomingGaugesResponse, useInterfaces: boolean = false): UpcomingGaugesResponseAminoMsg {
    return {
      type: "osmosis/incentives/upcoming-gauges-response",
      value: UpcomingGaugesResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: UpcomingGaugesResponseProtoMsg, useInterfaces: boolean = false): UpcomingGaugesResponse {
    return UpcomingGaugesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpcomingGaugesResponse): Uint8Array {
    return UpcomingGaugesResponse.encode(message).finish();
  },
  toProtoMsg(message: UpcomingGaugesResponse): UpcomingGaugesResponseProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.UpcomingGaugesResponse",
      value: UpcomingGaugesResponse.encode(message).finish()
    };
  }
};
function createBaseUpcomingGaugesPerDenomRequest(): UpcomingGaugesPerDenomRequest {
  return {
    denom: "",
    pagination: undefined
  };
}
export const UpcomingGaugesPerDenomRequest = {
  typeUrl: "/osmosis.incentives.UpcomingGaugesPerDenomRequest",
  encode(message: UpcomingGaugesPerDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpcomingGaugesPerDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesPerDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
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
  fromPartial(object: Partial<UpcomingGaugesPerDenomRequest>): UpcomingGaugesPerDenomRequest {
    const message = createBaseUpcomingGaugesPerDenomRequest();
    message.denom = object.denom ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: UpcomingGaugesPerDenomRequestAmino): UpcomingGaugesPerDenomRequest {
    return {
      denom: object.denom,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: UpcomingGaugesPerDenomRequest, useInterfaces: boolean = false): UpcomingGaugesPerDenomRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: UpcomingGaugesPerDenomRequestAminoMsg): UpcomingGaugesPerDenomRequest {
    return UpcomingGaugesPerDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: UpcomingGaugesPerDenomRequest, useInterfaces: boolean = false): UpcomingGaugesPerDenomRequestAminoMsg {
    return {
      type: "osmosis/incentives/upcoming-gauges-per-denom-request",
      value: UpcomingGaugesPerDenomRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: UpcomingGaugesPerDenomRequestProtoMsg, useInterfaces: boolean = false): UpcomingGaugesPerDenomRequest {
    return UpcomingGaugesPerDenomRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpcomingGaugesPerDenomRequest): Uint8Array {
    return UpcomingGaugesPerDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: UpcomingGaugesPerDenomRequest): UpcomingGaugesPerDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.UpcomingGaugesPerDenomRequest",
      value: UpcomingGaugesPerDenomRequest.encode(message).finish()
    };
  }
};
function createBaseUpcomingGaugesPerDenomResponse(): UpcomingGaugesPerDenomResponse {
  return {
    upcomingGauges: [],
    pagination: undefined
  };
}
export const UpcomingGaugesPerDenomResponse = {
  typeUrl: "/osmosis.incentives.UpcomingGaugesPerDenomResponse",
  encode(message: UpcomingGaugesPerDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.upcomingGauges) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpcomingGaugesPerDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesPerDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upcomingGauges.push(Gauge.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<UpcomingGaugesPerDenomResponse>): UpcomingGaugesPerDenomResponse {
    const message = createBaseUpcomingGaugesPerDenomResponse();
    message.upcomingGauges = object.upcomingGauges?.map(e => Gauge.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: UpcomingGaugesPerDenomResponseAmino): UpcomingGaugesPerDenomResponse {
    return {
      upcomingGauges: Array.isArray(object?.upcoming_gauges) ? object.upcoming_gauges.map((e: any) => Gauge.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: UpcomingGaugesPerDenomResponse, useInterfaces: boolean = false): UpcomingGaugesPerDenomResponseAmino {
    const obj: any = {};
    if (message.upcomingGauges) {
      obj.upcoming_gauges = message.upcomingGauges.map(e => e ? Gauge.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.upcoming_gauges = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: UpcomingGaugesPerDenomResponseAminoMsg): UpcomingGaugesPerDenomResponse {
    return UpcomingGaugesPerDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: UpcomingGaugesPerDenomResponse, useInterfaces: boolean = false): UpcomingGaugesPerDenomResponseAminoMsg {
    return {
      type: "osmosis/incentives/upcoming-gauges-per-denom-response",
      value: UpcomingGaugesPerDenomResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: UpcomingGaugesPerDenomResponseProtoMsg, useInterfaces: boolean = false): UpcomingGaugesPerDenomResponse {
    return UpcomingGaugesPerDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpcomingGaugesPerDenomResponse): Uint8Array {
    return UpcomingGaugesPerDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: UpcomingGaugesPerDenomResponse): UpcomingGaugesPerDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.UpcomingGaugesPerDenomResponse",
      value: UpcomingGaugesPerDenomResponse.encode(message).finish()
    };
  }
};
function createBaseRewardsEstRequest(): RewardsEstRequest {
  return {
    owner: "",
    lockIds: [],
    endEpoch: BigInt(0)
  };
}
export const RewardsEstRequest = {
  typeUrl: "/osmosis.incentives.RewardsEstRequest",
  encode(message: RewardsEstRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    writer.uint32(18).fork();
    for (const v of message.lockIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.endEpoch !== BigInt(0)) {
      writer.uint32(24).int64(message.endEpoch);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RewardsEstRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardsEstRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.lockIds.push(reader.uint64());
            }
          } else {
            message.lockIds.push(reader.uint64());
          }
          break;
        case 3:
          message.endEpoch = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardsEstRequest>): RewardsEstRequest {
    const message = createBaseRewardsEstRequest();
    message.owner = object.owner ?? "";
    message.lockIds = object.lockIds?.map(e => BigInt(e.toString())) || [];
    message.endEpoch = object.endEpoch !== undefined && object.endEpoch !== null ? BigInt(object.endEpoch.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: RewardsEstRequestAmino): RewardsEstRequest {
    return {
      owner: object.owner,
      lockIds: Array.isArray(object?.lock_ids) ? object.lock_ids.map((e: any) => BigInt(e)) : [],
      endEpoch: BigInt(object.end_epoch)
    };
  },
  toAmino(message: RewardsEstRequest, useInterfaces: boolean = false): RewardsEstRequestAmino {
    const obj: any = {};
    obj.owner = message.owner;
    if (message.lockIds) {
      obj.lock_ids = message.lockIds.map(e => e.toString());
    } else {
      obj.lock_ids = [];
    }
    obj.end_epoch = message.endEpoch ? message.endEpoch.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: RewardsEstRequestAminoMsg): RewardsEstRequest {
    return RewardsEstRequest.fromAmino(object.value);
  },
  toAminoMsg(message: RewardsEstRequest, useInterfaces: boolean = false): RewardsEstRequestAminoMsg {
    return {
      type: "osmosis/incentives/rewards-est-request",
      value: RewardsEstRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: RewardsEstRequestProtoMsg, useInterfaces: boolean = false): RewardsEstRequest {
    return RewardsEstRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RewardsEstRequest): Uint8Array {
    return RewardsEstRequest.encode(message).finish();
  },
  toProtoMsg(message: RewardsEstRequest): RewardsEstRequestProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.RewardsEstRequest",
      value: RewardsEstRequest.encode(message).finish()
    };
  }
};
function createBaseRewardsEstResponse(): RewardsEstResponse {
  return {
    coins: []
  };
}
export const RewardsEstResponse = {
  typeUrl: "/osmosis.incentives.RewardsEstResponse",
  encode(message: RewardsEstResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RewardsEstResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardsEstResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardsEstResponse>): RewardsEstResponse {
    const message = createBaseRewardsEstResponse();
    message.coins = object.coins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: RewardsEstResponseAmino): RewardsEstResponse {
    return {
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromAmino(e)) : []
    };
  },
  toAmino(message: RewardsEstResponse, useInterfaces: boolean = false): RewardsEstResponseAmino {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.coins = [];
    }
    return obj;
  },
  fromAminoMsg(object: RewardsEstResponseAminoMsg): RewardsEstResponse {
    return RewardsEstResponse.fromAmino(object.value);
  },
  toAminoMsg(message: RewardsEstResponse, useInterfaces: boolean = false): RewardsEstResponseAminoMsg {
    return {
      type: "osmosis/incentives/rewards-est-response",
      value: RewardsEstResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: RewardsEstResponseProtoMsg, useInterfaces: boolean = false): RewardsEstResponse {
    return RewardsEstResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RewardsEstResponse): Uint8Array {
    return RewardsEstResponse.encode(message).finish();
  },
  toProtoMsg(message: RewardsEstResponse): RewardsEstResponseProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.RewardsEstResponse",
      value: RewardsEstResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLockableDurationsRequest(): QueryLockableDurationsRequest {
  return {};
}
export const QueryLockableDurationsRequest = {
  typeUrl: "/osmosis.incentives.QueryLockableDurationsRequest",
  encode(_: QueryLockableDurationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLockableDurationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLockableDurationsRequest();
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
  fromPartial(_: Partial<QueryLockableDurationsRequest>): QueryLockableDurationsRequest {
    const message = createBaseQueryLockableDurationsRequest();
    return message;
  },
  fromAmino(_: QueryLockableDurationsRequestAmino): QueryLockableDurationsRequest {
    return {};
  },
  toAmino(_: QueryLockableDurationsRequest, useInterfaces: boolean = false): QueryLockableDurationsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryLockableDurationsRequestAminoMsg): QueryLockableDurationsRequest {
    return QueryLockableDurationsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryLockableDurationsRequest, useInterfaces: boolean = false): QueryLockableDurationsRequestAminoMsg {
    return {
      type: "osmosis/incentives/query-lockable-durations-request",
      value: QueryLockableDurationsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryLockableDurationsRequestProtoMsg, useInterfaces: boolean = false): QueryLockableDurationsRequest {
    return QueryLockableDurationsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLockableDurationsRequest): Uint8Array {
    return QueryLockableDurationsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLockableDurationsRequest): QueryLockableDurationsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.QueryLockableDurationsRequest",
      value: QueryLockableDurationsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLockableDurationsResponse(): QueryLockableDurationsResponse {
  return {
    lockableDurations: []
  };
}
export const QueryLockableDurationsResponse = {
  typeUrl: "/osmosis.incentives.QueryLockableDurationsResponse",
  encode(message: QueryLockableDurationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.lockableDurations) {
      Duration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLockableDurationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLockableDurationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lockableDurations.push(Duration.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLockableDurationsResponse>): QueryLockableDurationsResponse {
    const message = createBaseQueryLockableDurationsResponse();
    message.lockableDurations = object.lockableDurations?.map(e => Duration.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryLockableDurationsResponseAmino): QueryLockableDurationsResponse {
    return {
      lockableDurations: Array.isArray(object?.lockable_durations) ? object.lockable_durations.map((e: any) => Duration.fromAmino(e)) : []
    };
  },
  toAmino(message: QueryLockableDurationsResponse, useInterfaces: boolean = false): QueryLockableDurationsResponseAmino {
    const obj: any = {};
    if (message.lockableDurations) {
      obj.lockable_durations = message.lockableDurations.map(e => e ? Duration.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.lockable_durations = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryLockableDurationsResponseAminoMsg): QueryLockableDurationsResponse {
    return QueryLockableDurationsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryLockableDurationsResponse, useInterfaces: boolean = false): QueryLockableDurationsResponseAminoMsg {
    return {
      type: "osmosis/incentives/query-lockable-durations-response",
      value: QueryLockableDurationsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryLockableDurationsResponseProtoMsg, useInterfaces: boolean = false): QueryLockableDurationsResponse {
    return QueryLockableDurationsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLockableDurationsResponse): Uint8Array {
    return QueryLockableDurationsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLockableDurationsResponse): QueryLockableDurationsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.QueryLockableDurationsResponse",
      value: QueryLockableDurationsResponse.encode(message).finish()
    };
  }
};