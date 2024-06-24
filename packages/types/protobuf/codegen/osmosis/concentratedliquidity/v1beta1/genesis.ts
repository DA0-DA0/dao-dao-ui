//@ts-nocheck
import { TickInfo, TickInfoAmino, TickInfoSDKType } from "./tickInfo";
import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { IncentiveRecord, IncentiveRecordAmino, IncentiveRecordSDKType } from "./incentive_record";
import { Position, PositionAmino, PositionSDKType } from "./position";
import { Record, RecordAmino, RecordSDKType, AccumulatorContent, AccumulatorContentAmino, AccumulatorContentSDKType } from "../../accum/v1beta1/accum";
import { Params, ParamsAmino, ParamsSDKType } from "../params";
import { Pool as Pool1 } from "./pool";
import { PoolProtoMsg as Pool1ProtoMsg } from "./pool";
import { PoolSDKType as Pool1SDKType } from "./pool";
import { CosmWasmPool, CosmWasmPoolProtoMsg, CosmWasmPoolSDKType } from "../../cosmwasmpool/v1beta1/model/pool";
import { Pool as Pool2 } from "../../gamm/pool-models/balancer/balancerPool";
import { PoolProtoMsg as Pool2ProtoMsg } from "../../gamm/pool-models/balancer/balancerPool";
import { PoolSDKType as Pool2SDKType } from "../../gamm/pool-models/balancer/balancerPool";
import { Pool as Pool3 } from "../../gamm/pool-models/stableswap/stableswap_pool";
import { PoolProtoMsg as Pool3ProtoMsg } from "../../gamm/pool-models/stableswap/stableswap_pool";
import { PoolSDKType as Pool3SDKType } from "../../gamm/pool-models/stableswap/stableswap_pool";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * FullTick contains tick index and pool id along with other tick model
 * information.
 */
export interface FullTick {
  /** pool id associated with the tick. */
  poolId: bigint;
  /** tick's index. */
  tickIndex: bigint;
  /** tick's info. */
  info: TickInfo | undefined;
}
export interface FullTickProtoMsg {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.FullTick";
  value: Uint8Array;
}
/**
 * FullTick contains tick index and pool id along with other tick model
 * information.
 */
export interface FullTickAmino {
  /** pool id associated with the tick. */
  pool_id?: string;
  /** tick's index. */
  tick_index?: string;
  /** tick's info. */
  info?: TickInfoAmino | undefined;
}
export interface FullTickAminoMsg {
  type: "osmosis/concentratedliquidity/full-tick";
  value: FullTickAmino;
}
/**
 * FullTick contains tick index and pool id along with other tick model
 * information.
 */
export interface FullTickSDKType {
  pool_id: bigint;
  tick_index: bigint;
  info: TickInfoSDKType | undefined;
}
/**
 * PoolData represents a serialized pool along with its ticks
 * for genesis state.
 */
export interface PoolData {
  /** pool struct */
  pool?: (Pool1 & CosmWasmPool & Pool2 & Pool3 & Any) | undefined;
  /** pool's ticks */
  ticks: FullTick[];
  spreadRewardAccumulator: AccumObject | undefined;
  incentivesAccumulators: AccumObject[];
  /** incentive records to be set */
  incentiveRecords: IncentiveRecord[];
}
export interface PoolDataProtoMsg {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.PoolData";
  value: Uint8Array;
}
export type PoolDataEncoded = Omit<PoolData, "pool"> & {
  /** pool struct */pool?: Pool1ProtoMsg | CosmWasmPoolProtoMsg | Pool2ProtoMsg | Pool3ProtoMsg | AnyProtoMsg | undefined;
};
/**
 * PoolData represents a serialized pool along with its ticks
 * for genesis state.
 */
export interface PoolDataAmino {
  /** pool struct */
  pool?: AnyAmino | undefined;
  /** pool's ticks */
  ticks?: FullTickAmino[];
  spread_reward_accumulator?: AccumObjectAmino | undefined;
  incentives_accumulators?: AccumObjectAmino[];
  /** incentive records to be set */
  incentive_records?: IncentiveRecordAmino[];
}
export interface PoolDataAminoMsg {
  type: "osmosis/concentratedliquidity/pool-data";
  value: PoolDataAmino;
}
/**
 * PoolData represents a serialized pool along with its ticks
 * for genesis state.
 */
export interface PoolDataSDKType {
  pool?: Pool1SDKType | CosmWasmPoolSDKType | Pool2SDKType | Pool3SDKType | AnySDKType | undefined;
  ticks: FullTickSDKType[];
  spread_reward_accumulator: AccumObjectSDKType | undefined;
  incentives_accumulators: AccumObjectSDKType[];
  incentive_records: IncentiveRecordSDKType[];
}
export interface PositionData {
  position?: Position | undefined;
  lockId: bigint;
  spreadRewardAccumRecord: Record | undefined;
  uptimeAccumRecords: Record[];
}
export interface PositionDataProtoMsg {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.PositionData";
  value: Uint8Array;
}
export interface PositionDataAmino {
  position?: PositionAmino | undefined;
  lock_id?: string;
  spread_reward_accum_record?: RecordAmino | undefined;
  uptime_accum_records?: RecordAmino[];
}
export interface PositionDataAminoMsg {
  type: "osmosis/concentratedliquidity/position-data";
  value: PositionDataAmino;
}
export interface PositionDataSDKType {
  position?: PositionSDKType | undefined;
  lock_id: bigint;
  spread_reward_accum_record: RecordSDKType | undefined;
  uptime_accum_records: RecordSDKType[];
}
/** GenesisState defines the concentrated liquidity module's genesis state. */
export interface GenesisState {
  /** params are all the parameters of the module */
  params: Params | undefined;
  /** pool data containing serialized pool struct and ticks. */
  poolData: PoolData[];
  positionData: PositionData[];
  nextPositionId: bigint;
  nextIncentiveRecordId: bigint;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the concentrated liquidity module's genesis state. */
export interface GenesisStateAmino {
  /** params are all the parameters of the module */
  params?: ParamsAmino | undefined;
  /** pool data containing serialized pool struct and ticks. */
  pool_data?: PoolDataAmino[];
  position_data?: PositionDataAmino[];
  next_position_id?: string;
  next_incentive_record_id?: string;
}
export interface GenesisStateAminoMsg {
  type: "osmosis/concentratedliquidity/genesis-state";
  value: GenesisStateAmino;
}
/** GenesisState defines the concentrated liquidity module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  pool_data: PoolDataSDKType[];
  position_data: PositionDataSDKType[];
  next_position_id: bigint;
  next_incentive_record_id: bigint;
}
export interface AccumObject {
  /** Accumulator's name (pulled from AccumulatorContent) */
  name: string;
  accumContent?: AccumulatorContent | undefined;
}
export interface AccumObjectProtoMsg {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.AccumObject";
  value: Uint8Array;
}
export interface AccumObjectAmino {
  /** Accumulator's name (pulled from AccumulatorContent) */
  name?: string;
  accum_content?: AccumulatorContentAmino | undefined;
}
export interface AccumObjectAminoMsg {
  type: "osmosis/concentratedliquidity/accum-object";
  value: AccumObjectAmino;
}
export interface AccumObjectSDKType {
  name: string;
  accum_content?: AccumulatorContentSDKType | undefined;
}
function createBaseFullTick(): FullTick {
  return {
    poolId: BigInt(0),
    tickIndex: BigInt(0),
    info: TickInfo.fromPartial({})
  };
}
export const FullTick = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.FullTick",
  encode(message: FullTick, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tickIndex !== BigInt(0)) {
      writer.uint32(16).int64(message.tickIndex);
    }
    if (message.info !== undefined) {
      TickInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FullTick {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullTick();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.tickIndex = reader.int64();
          break;
        case 3:
          message.info = TickInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FullTick>): FullTick {
    const message = createBaseFullTick();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tickIndex = object.tickIndex !== undefined && object.tickIndex !== null ? BigInt(object.tickIndex.toString()) : BigInt(0);
    message.info = object.info !== undefined && object.info !== null ? TickInfo.fromPartial(object.info) : undefined;
    return message;
  },
  fromAmino(object: FullTickAmino): FullTick {
    const message = createBaseFullTick();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.tick_index !== undefined && object.tick_index !== null) {
      message.tickIndex = BigInt(object.tick_index);
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = TickInfo.fromAmino(object.info);
    }
    return message;
  },
  toAmino(message: FullTick, useInterfaces: boolean = false): FullTickAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.tick_index = message.tickIndex !== BigInt(0) ? message.tickIndex.toString() : undefined;
    obj.info = message.info ? TickInfo.toAmino(message.info, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: FullTickAminoMsg): FullTick {
    return FullTick.fromAmino(object.value);
  },
  toAminoMsg(message: FullTick, useInterfaces: boolean = false): FullTickAminoMsg {
    return {
      type: "osmosis/concentratedliquidity/full-tick",
      value: FullTick.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: FullTickProtoMsg, useInterfaces: boolean = false): FullTick {
    return FullTick.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FullTick): Uint8Array {
    return FullTick.encode(message).finish();
  },
  toProtoMsg(message: FullTick): FullTickProtoMsg {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.FullTick",
      value: FullTick.encode(message).finish()
    };
  }
};
function createBasePoolData(): PoolData {
  return {
    pool: undefined,
    ticks: [],
    spreadRewardAccumulator: AccumObject.fromPartial({}),
    incentivesAccumulators: [],
    incentiveRecords: []
  };
}
export const PoolData = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.PoolData",
  encode(message: PoolData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pool !== undefined) {
      Any.encode((message.pool as Any), writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.ticks) {
      FullTick.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.spreadRewardAccumulator !== undefined) {
      AccumObject.encode(message.spreadRewardAccumulator, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.incentivesAccumulators) {
      AccumObject.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.incentiveRecords) {
      IncentiveRecord.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = useInterfaces ? (PoolI_InterfaceDecoder(reader) as Any) : Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.ticks.push(FullTick.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.spreadRewardAccumulator = AccumObject.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.incentivesAccumulators.push(AccumObject.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.incentiveRecords.push(IncentiveRecord.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolData>): PoolData {
    const message = createBasePoolData();
    message.pool = object.pool !== undefined && object.pool !== null ? Any.fromPartial(object.pool) : undefined;
    message.ticks = object.ticks?.map(e => FullTick.fromPartial(e)) || [];
    message.spreadRewardAccumulator = object.spreadRewardAccumulator !== undefined && object.spreadRewardAccumulator !== null ? AccumObject.fromPartial(object.spreadRewardAccumulator) : undefined;
    message.incentivesAccumulators = object.incentivesAccumulators?.map(e => AccumObject.fromPartial(e)) || [];
    message.incentiveRecords = object.incentiveRecords?.map(e => IncentiveRecord.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: PoolDataAmino): PoolData {
    const message = createBasePoolData();
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = PoolI_FromAmino(object.pool);
    }
    message.ticks = object.ticks?.map(e => FullTick.fromAmino(e)) || [];
    if (object.spread_reward_accumulator !== undefined && object.spread_reward_accumulator !== null) {
      message.spreadRewardAccumulator = AccumObject.fromAmino(object.spread_reward_accumulator);
    }
    message.incentivesAccumulators = object.incentives_accumulators?.map(e => AccumObject.fromAmino(e)) || [];
    message.incentiveRecords = object.incentive_records?.map(e => IncentiveRecord.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: PoolData, useInterfaces: boolean = false): PoolDataAmino {
    const obj: any = {};
    obj.pool = message.pool ? PoolI_ToAmino((message.pool as Any), useInterfaces) : undefined;
    if (message.ticks) {
      obj.ticks = message.ticks.map(e => e ? FullTick.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.ticks = message.ticks;
    }
    obj.spread_reward_accumulator = message.spreadRewardAccumulator ? AccumObject.toAmino(message.spreadRewardAccumulator, useInterfaces) : undefined;
    if (message.incentivesAccumulators) {
      obj.incentives_accumulators = message.incentivesAccumulators.map(e => e ? AccumObject.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.incentives_accumulators = message.incentivesAccumulators;
    }
    if (message.incentiveRecords) {
      obj.incentive_records = message.incentiveRecords.map(e => e ? IncentiveRecord.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.incentive_records = message.incentiveRecords;
    }
    return obj;
  },
  fromAminoMsg(object: PoolDataAminoMsg): PoolData {
    return PoolData.fromAmino(object.value);
  },
  toAminoMsg(message: PoolData, useInterfaces: boolean = false): PoolDataAminoMsg {
    return {
      type: "osmosis/concentratedliquidity/pool-data",
      value: PoolData.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: PoolDataProtoMsg, useInterfaces: boolean = false): PoolData {
    return PoolData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolData): Uint8Array {
    return PoolData.encode(message).finish();
  },
  toProtoMsg(message: PoolData): PoolDataProtoMsg {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.PoolData",
      value: PoolData.encode(message).finish()
    };
  }
};
function createBasePositionData(): PositionData {
  return {
    position: undefined,
    lockId: BigInt(0),
    spreadRewardAccumRecord: Record.fromPartial({}),
    uptimeAccumRecords: []
  };
}
export const PositionData = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.PositionData",
  encode(message: PositionData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.position !== undefined) {
      Position.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.lockId !== BigInt(0)) {
      writer.uint32(16).uint64(message.lockId);
    }
    if (message.spreadRewardAccumRecord !== undefined) {
      Record.encode(message.spreadRewardAccumRecord, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.uptimeAccumRecords) {
      Record.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PositionData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositionData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.position = Position.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.lockId = reader.uint64();
          break;
        case 3:
          message.spreadRewardAccumRecord = Record.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.uptimeAccumRecords.push(Record.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PositionData>): PositionData {
    const message = createBasePositionData();
    message.position = object.position !== undefined && object.position !== null ? Position.fromPartial(object.position) : undefined;
    message.lockId = object.lockId !== undefined && object.lockId !== null ? BigInt(object.lockId.toString()) : BigInt(0);
    message.spreadRewardAccumRecord = object.spreadRewardAccumRecord !== undefined && object.spreadRewardAccumRecord !== null ? Record.fromPartial(object.spreadRewardAccumRecord) : undefined;
    message.uptimeAccumRecords = object.uptimeAccumRecords?.map(e => Record.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: PositionDataAmino): PositionData {
    const message = createBasePositionData();
    if (object.position !== undefined && object.position !== null) {
      message.position = Position.fromAmino(object.position);
    }
    if (object.lock_id !== undefined && object.lock_id !== null) {
      message.lockId = BigInt(object.lock_id);
    }
    if (object.spread_reward_accum_record !== undefined && object.spread_reward_accum_record !== null) {
      message.spreadRewardAccumRecord = Record.fromAmino(object.spread_reward_accum_record);
    }
    message.uptimeAccumRecords = object.uptime_accum_records?.map(e => Record.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: PositionData, useInterfaces: boolean = false): PositionDataAmino {
    const obj: any = {};
    obj.position = message.position ? Position.toAmino(message.position, useInterfaces) : undefined;
    obj.lock_id = message.lockId !== BigInt(0) ? message.lockId.toString() : undefined;
    obj.spread_reward_accum_record = message.spreadRewardAccumRecord ? Record.toAmino(message.spreadRewardAccumRecord, useInterfaces) : undefined;
    if (message.uptimeAccumRecords) {
      obj.uptime_accum_records = message.uptimeAccumRecords.map(e => e ? Record.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.uptime_accum_records = message.uptimeAccumRecords;
    }
    return obj;
  },
  fromAminoMsg(object: PositionDataAminoMsg): PositionData {
    return PositionData.fromAmino(object.value);
  },
  toAminoMsg(message: PositionData, useInterfaces: boolean = false): PositionDataAminoMsg {
    return {
      type: "osmosis/concentratedliquidity/position-data",
      value: PositionData.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: PositionDataProtoMsg, useInterfaces: boolean = false): PositionData {
    return PositionData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PositionData): Uint8Array {
    return PositionData.encode(message).finish();
  },
  toProtoMsg(message: PositionData): PositionDataProtoMsg {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.PositionData",
      value: PositionData.encode(message).finish()
    };
  }
};
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    poolData: [],
    positionData: [],
    nextPositionId: BigInt(0),
    nextIncentiveRecordId: BigInt(0)
  };
}
export const GenesisState = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.poolData) {
      PoolData.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.positionData) {
      PositionData.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.nextPositionId !== BigInt(0)) {
      writer.uint32(32).uint64(message.nextPositionId);
    }
    if (message.nextIncentiveRecordId !== BigInt(0)) {
      writer.uint32(40).uint64(message.nextIncentiveRecordId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.poolData.push(PoolData.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.positionData.push(PositionData.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.nextPositionId = reader.uint64();
          break;
        case 5:
          message.nextIncentiveRecordId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.poolData = object.poolData?.map(e => PoolData.fromPartial(e)) || [];
    message.positionData = object.positionData?.map(e => PositionData.fromPartial(e)) || [];
    message.nextPositionId = object.nextPositionId !== undefined && object.nextPositionId !== null ? BigInt(object.nextPositionId.toString()) : BigInt(0);
    message.nextIncentiveRecordId = object.nextIncentiveRecordId !== undefined && object.nextIncentiveRecordId !== null ? BigInt(object.nextIncentiveRecordId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.poolData = object.pool_data?.map(e => PoolData.fromAmino(e)) || [];
    message.positionData = object.position_data?.map(e => PositionData.fromAmino(e)) || [];
    if (object.next_position_id !== undefined && object.next_position_id !== null) {
      message.nextPositionId = BigInt(object.next_position_id);
    }
    if (object.next_incentive_record_id !== undefined && object.next_incentive_record_id !== null) {
      message.nextIncentiveRecordId = BigInt(object.next_incentive_record_id);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.poolData) {
      obj.pool_data = message.poolData.map(e => e ? PoolData.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_data = message.poolData;
    }
    if (message.positionData) {
      obj.position_data = message.positionData.map(e => e ? PositionData.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.position_data = message.positionData;
    }
    obj.next_position_id = message.nextPositionId !== BigInt(0) ? message.nextPositionId.toString() : undefined;
    obj.next_incentive_record_id = message.nextIncentiveRecordId !== BigInt(0) ? message.nextIncentiveRecordId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  toAminoMsg(message: GenesisState, useInterfaces: boolean = false): GenesisStateAminoMsg {
    return {
      type: "osmosis/concentratedliquidity/genesis-state",
      value: GenesisState.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseAccumObject(): AccumObject {
  return {
    name: "",
    accumContent: undefined
  };
}
export const AccumObject = {
  typeUrl: "/osmosis.concentratedliquidity.v1beta1.AccumObject",
  encode(message: AccumObject, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.accumContent !== undefined) {
      AccumulatorContent.encode(message.accumContent, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AccumObject {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccumObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.accumContent = AccumulatorContent.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AccumObject>): AccumObject {
    const message = createBaseAccumObject();
    message.name = object.name ?? "";
    message.accumContent = object.accumContent !== undefined && object.accumContent !== null ? AccumulatorContent.fromPartial(object.accumContent) : undefined;
    return message;
  },
  fromAmino(object: AccumObjectAmino): AccumObject {
    const message = createBaseAccumObject();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.accum_content !== undefined && object.accum_content !== null) {
      message.accumContent = AccumulatorContent.fromAmino(object.accum_content);
    }
    return message;
  },
  toAmino(message: AccumObject, useInterfaces: boolean = false): AccumObjectAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    obj.accum_content = message.accumContent ? AccumulatorContent.toAmino(message.accumContent, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: AccumObjectAminoMsg): AccumObject {
    return AccumObject.fromAmino(object.value);
  },
  toAminoMsg(message: AccumObject, useInterfaces: boolean = false): AccumObjectAminoMsg {
    return {
      type: "osmosis/concentratedliquidity/accum-object",
      value: AccumObject.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AccumObjectProtoMsg, useInterfaces: boolean = false): AccumObject {
    return AccumObject.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AccumObject): Uint8Array {
    return AccumObject.encode(message).finish();
  },
  toProtoMsg(message: AccumObject): AccumObjectProtoMsg {
    return {
      typeUrl: "/osmosis.concentratedliquidity.v1beta1.AccumObject",
      value: AccumObject.encode(message).finish()
    };
  }
};
export const PoolI_InterfaceDecoder = (input: BinaryReader | Uint8Array): Pool1 | CosmWasmPool | Pool2 | Pool3 | Any => {
  const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
  const data = Any.decode(reader, reader.uint32(), true);
  switch (data.typeUrl) {
    case "/osmosis.concentratedliquidity.v1beta1.Pool":
      return Pool1.decode(data.value, undefined, true);
    case "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool":
      return CosmWasmPool.decode(data.value, undefined, true);
    case "/osmosis.gamm.v1beta1.Pool":
      return Pool2.decode(data.value, undefined, true);
    case "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool":
      return Pool3.decode(data.value, undefined, true);
    default:
      return data;
  }
};
export const PoolI_FromAmino = (content: AnyAmino): Any => {
  switch (content.type) {
    case "osmosis/concentratedliquidity/pool":
      return Any.fromPartial({
        typeUrl: "/osmosis.concentratedliquidity.v1beta1.Pool",
        value: Pool1.encode(Pool1.fromPartial(Pool1.fromAmino(content.value))).finish()
      });
    case "osmosis/cosmwasmpool/cosm-wasm-pool":
      return Any.fromPartial({
        typeUrl: "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool",
        value: CosmWasmPool.encode(CosmWasmPool.fromPartial(CosmWasmPool.fromAmino(content.value))).finish()
      });
    case "osmosis/gamm/BalancerPool":
      return Any.fromPartial({
        typeUrl: "/osmosis.gamm.v1beta1.Pool",
        value: Pool2.encode(Pool2.fromPartial(Pool2.fromAmino(content.value))).finish()
      });
    case "osmosis/gamm/StableswapPool":
      return Any.fromPartial({
        typeUrl: "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool",
        value: Pool3.encode(Pool3.fromPartial(Pool3.fromAmino(content.value))).finish()
      });
    default:
      return Any.fromAmino(content);
  }
};
export const PoolI_ToAmino = (content: Any, useInterfaces: boolean = false) => {
  switch (content.typeUrl) {
    case "/osmosis.concentratedliquidity.v1beta1.Pool":
      return {
        type: "osmosis/concentratedliquidity/pool",
        value: Pool1.toAmino(Pool1.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    case "/osmosis.cosmwasmpool.v1beta1.CosmWasmPool":
      return {
        type: "osmosis/cosmwasmpool/cosm-wasm-pool",
        value: CosmWasmPool.toAmino(CosmWasmPool.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    case "/osmosis.gamm.v1beta1.Pool":
      return {
        type: "osmosis/gamm/BalancerPool",
        value: Pool2.toAmino(Pool2.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    case "/osmosis.gamm.poolmodels.stableswap.v1beta1.Pool":
      return {
        type: "osmosis/gamm/StableswapPool",
        value: Pool3.toAmino(Pool3.decode(content.value, undefined, useInterfaces), useInterfaces)
      };
    default:
      return Any.toAmino(content, useInterfaces);
  }
};