import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** PoolType enumerates the valid types for pool_type. */
export enum PoolType {
  POOL_TYPE_WEIGHTED = 0,
  POOL_TYPE_YAMM = 1,
  UNRECOGNIZED = -1,
}
export const PoolTypeSDKType = PoolType;
export const PoolTypeAmino = PoolType;
export function poolTypeFromJSON(object: any): PoolType {
  switch (object) {
    case 0:
    case "POOL_TYPE_WEIGHTED":
      return PoolType.POOL_TYPE_WEIGHTED;
    case 1:
    case "POOL_TYPE_YAMM":
      return PoolType.POOL_TYPE_YAMM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PoolType.UNRECOGNIZED;
  }
}
export function poolTypeToJSON(object: PoolType): string {
  switch (object) {
    case PoolType.POOL_TYPE_WEIGHTED:
      return "POOL_TYPE_WEIGHTED";
    case PoolType.POOL_TYPE_YAMM:
      return "POOL_TYPE_YAMM";
    case PoolType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface PoolPauseWindow {
  pauseWindowEndUnixMillis: bigint;
  bufferPeriodEndUnixMillis: bigint;
}
export interface PoolPauseWindowProtoMsg {
  typeUrl: "/pryzm.amm.v1.PoolPauseWindow";
  value: Uint8Array;
}
export interface PoolPauseWindowAmino {
  pause_window_end_unix_millis: string;
  buffer_period_end_unix_millis: string;
}
export interface PoolPauseWindowAminoMsg {
  type: "/pryzm.amm.v1.PoolPauseWindow";
  value: PoolPauseWindowAmino;
}
export interface PoolPauseWindowSDKType {
  pause_window_end_unix_millis: bigint;
  buffer_period_end_unix_millis: bigint;
}
export interface SwapFeeUpdateParams {
  end: string;
  startUnixMillis: bigint;
  endUnixMillis: bigint;
}
export interface SwapFeeUpdateParamsProtoMsg {
  typeUrl: "/pryzm.amm.v1.SwapFeeUpdateParams";
  value: Uint8Array;
}
export interface SwapFeeUpdateParamsAmino {
  end?: string;
  start_unix_millis?: string;
  end_unix_millis?: string;
}
export interface SwapFeeUpdateParamsAminoMsg {
  type: "/pryzm.amm.v1.SwapFeeUpdateParams";
  value: SwapFeeUpdateParamsAmino;
}
export interface SwapFeeUpdateParamsSDKType {
  end: string;
  start_unix_millis: bigint;
  end_unix_millis: bigint;
}
export interface Pool {
  id: bigint;
  name: string;
  /**
   * this is the constant swap fee ratio, for dynamic swap fees other pools might have other parameters.
   * for example, check yamm configuration.
   * if update params is nil, this is the actual swap fee, o.w. you need to apply gradual update between this start and the end in params.
   */
  startSwapFeeRatio: string;
  poolType: PoolType;
  creator: string;
  recoveryMode: boolean;
  pausedByGov: boolean;
  pausedByOwner: boolean;
  ownerPauseWindowTiming?: PoolPauseWindow | undefined;
  /** if protocol fee parameters are nil, then the values are read from treasury module parameters */
  swapProtocolFeeRatio?: string;
  joinExitProtocolFeeRatio?: string;
  /** if not empty, only these addresses can initialize the pool */
  initializationAllowList: string[];
  /**
   * these have the same permissions as the creator, except for
   * updating the admins list and pausing the pool
   */
  admins: string[];
  pauseAllowList: string[];
  swapFeeUpdateParams?: SwapFeeUpdateParams | undefined;
  joinBlocked: boolean;
}
export interface PoolProtoMsg {
  typeUrl: "/pryzm.amm.v1.Pool";
  value: Uint8Array;
}
export interface PoolAmino {
  id?: string;
  name?: string;
  /**
   * this is the constant swap fee ratio, for dynamic swap fees other pools might have other parameters.
   * for example, check yamm configuration.
   * if update params is nil, this is the actual swap fee, o.w. you need to apply gradual update between this start and the end in params.
   */
  start_swap_fee_ratio?: string;
  pool_type?: PoolType;
  creator?: string;
  recovery_mode?: boolean;
  paused_by_gov?: boolean;
  paused_by_owner?: boolean;
  owner_pause_window_timing?: PoolPauseWindowAmino | undefined;
  /** if protocol fee parameters are nil, then the values are read from treasury module parameters */
  swap_protocol_fee_ratio?: string;
  join_exit_protocol_fee_ratio?: string;
  /** if not empty, only these addresses can initialize the pool */
  initialization_allow_list?: string[];
  /**
   * these have the same permissions as the creator, except for
   * updating the admins list and pausing the pool
   */
  admins?: string[];
  pause_allow_list?: string[];
  swap_fee_update_params?: SwapFeeUpdateParamsAmino | undefined;
  join_blocked?: boolean;
}
export interface PoolAminoMsg {
  type: "/pryzm.amm.v1.Pool";
  value: PoolAmino;
}
export interface PoolSDKType {
  id: bigint;
  name: string;
  start_swap_fee_ratio: string;
  pool_type: PoolType;
  creator: string;
  recovery_mode: boolean;
  paused_by_gov: boolean;
  paused_by_owner: boolean;
  owner_pause_window_timing?: PoolPauseWindowSDKType | undefined;
  swap_protocol_fee_ratio?: string;
  join_exit_protocol_fee_ratio?: string;
  initialization_allow_list: string[];
  admins: string[];
  pause_allow_list: string[];
  swap_fee_update_params?: SwapFeeUpdateParamsSDKType | undefined;
  join_blocked: boolean;
}
function createBasePoolPauseWindow(): PoolPauseWindow {
  return {
    pauseWindowEndUnixMillis: BigInt(0),
    bufferPeriodEndUnixMillis: BigInt(0)
  };
}
export const PoolPauseWindow = {
  typeUrl: "/pryzm.amm.v1.PoolPauseWindow",
  encode(message: PoolPauseWindow, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pauseWindowEndUnixMillis !== BigInt(0)) {
      writer.uint32(8).int64(message.pauseWindowEndUnixMillis);
    }
    if (message.bufferPeriodEndUnixMillis !== BigInt(0)) {
      writer.uint32(16).int64(message.bufferPeriodEndUnixMillis);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolPauseWindow {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolPauseWindow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pauseWindowEndUnixMillis = reader.int64();
          break;
        case 2:
          message.bufferPeriodEndUnixMillis = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolPauseWindow>): PoolPauseWindow {
    const message = createBasePoolPauseWindow();
    message.pauseWindowEndUnixMillis = object.pauseWindowEndUnixMillis !== undefined && object.pauseWindowEndUnixMillis !== null ? BigInt(object.pauseWindowEndUnixMillis.toString()) : BigInt(0);
    message.bufferPeriodEndUnixMillis = object.bufferPeriodEndUnixMillis !== undefined && object.bufferPeriodEndUnixMillis !== null ? BigInt(object.bufferPeriodEndUnixMillis.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: PoolPauseWindowAmino): PoolPauseWindow {
    const message = createBasePoolPauseWindow();
    if (object.pause_window_end_unix_millis !== undefined && object.pause_window_end_unix_millis !== null) {
      message.pauseWindowEndUnixMillis = BigInt(object.pause_window_end_unix_millis);
    }
    if (object.buffer_period_end_unix_millis !== undefined && object.buffer_period_end_unix_millis !== null) {
      message.bufferPeriodEndUnixMillis = BigInt(object.buffer_period_end_unix_millis);
    }
    return message;
  },
  toAmino(message: PoolPauseWindow, useInterfaces: boolean = false): PoolPauseWindowAmino {
    const obj: any = {};
    obj.pause_window_end_unix_millis = message.pauseWindowEndUnixMillis ? message.pauseWindowEndUnixMillis.toString() : "0";
    obj.buffer_period_end_unix_millis = message.bufferPeriodEndUnixMillis ? message.bufferPeriodEndUnixMillis.toString() : "0";
    return obj;
  },
  fromAminoMsg(object: PoolPauseWindowAminoMsg): PoolPauseWindow {
    return PoolPauseWindow.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolPauseWindowProtoMsg, useInterfaces: boolean = false): PoolPauseWindow {
    return PoolPauseWindow.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolPauseWindow): Uint8Array {
    return PoolPauseWindow.encode(message).finish();
  },
  toProtoMsg(message: PoolPauseWindow): PoolPauseWindowProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.PoolPauseWindow",
      value: PoolPauseWindow.encode(message).finish()
    };
  }
};
function createBaseSwapFeeUpdateParams(): SwapFeeUpdateParams {
  return {
    end: "",
    startUnixMillis: BigInt(0),
    endUnixMillis: BigInt(0)
  };
}
export const SwapFeeUpdateParams = {
  typeUrl: "/pryzm.amm.v1.SwapFeeUpdateParams",
  encode(message: SwapFeeUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.end !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.end, 18).atomics);
    }
    if (message.startUnixMillis !== BigInt(0)) {
      writer.uint32(16).int64(message.startUnixMillis);
    }
    if (message.endUnixMillis !== BigInt(0)) {
      writer.uint32(24).int64(message.endUnixMillis);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SwapFeeUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapFeeUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.end = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.startUnixMillis = reader.int64();
          break;
        case 3:
          message.endUnixMillis = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SwapFeeUpdateParams>): SwapFeeUpdateParams {
    const message = createBaseSwapFeeUpdateParams();
    message.end = object.end ?? "";
    message.startUnixMillis = object.startUnixMillis !== undefined && object.startUnixMillis !== null ? BigInt(object.startUnixMillis.toString()) : BigInt(0);
    message.endUnixMillis = object.endUnixMillis !== undefined && object.endUnixMillis !== null ? BigInt(object.endUnixMillis.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SwapFeeUpdateParamsAmino): SwapFeeUpdateParams {
    const message = createBaseSwapFeeUpdateParams();
    if (object.end !== undefined && object.end !== null) {
      message.end = object.end;
    }
    if (object.start_unix_millis !== undefined && object.start_unix_millis !== null) {
      message.startUnixMillis = BigInt(object.start_unix_millis);
    }
    if (object.end_unix_millis !== undefined && object.end_unix_millis !== null) {
      message.endUnixMillis = BigInt(object.end_unix_millis);
    }
    return message;
  },
  toAmino(message: SwapFeeUpdateParams, useInterfaces: boolean = false): SwapFeeUpdateParamsAmino {
    const obj: any = {};
    obj.end = message.end === "" ? undefined : message.end;
    obj.start_unix_millis = message.startUnixMillis !== BigInt(0) ? message.startUnixMillis.toString() : undefined;
    obj.end_unix_millis = message.endUnixMillis !== BigInt(0) ? message.endUnixMillis.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SwapFeeUpdateParamsAminoMsg): SwapFeeUpdateParams {
    return SwapFeeUpdateParams.fromAmino(object.value);
  },
  fromProtoMsg(message: SwapFeeUpdateParamsProtoMsg, useInterfaces: boolean = false): SwapFeeUpdateParams {
    return SwapFeeUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SwapFeeUpdateParams): Uint8Array {
    return SwapFeeUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: SwapFeeUpdateParams): SwapFeeUpdateParamsProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.SwapFeeUpdateParams",
      value: SwapFeeUpdateParams.encode(message).finish()
    };
  }
};
function createBasePool(): Pool {
  return {
    id: BigInt(0),
    name: "",
    startSwapFeeRatio: "",
    poolType: 0,
    creator: "",
    recoveryMode: false,
    pausedByGov: false,
    pausedByOwner: false,
    ownerPauseWindowTiming: undefined,
    swapProtocolFeeRatio: undefined,
    joinExitProtocolFeeRatio: undefined,
    initializationAllowList: [],
    admins: [],
    pauseAllowList: [],
    swapFeeUpdateParams: undefined,
    joinBlocked: false
  };
}
export const Pool = {
  typeUrl: "/pryzm.amm.v1.Pool",
  encode(message: Pool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.startSwapFeeRatio !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.startSwapFeeRatio, 18).atomics);
    }
    if (message.poolType !== 0) {
      writer.uint32(32).int32(message.poolType);
    }
    if (message.creator !== "") {
      writer.uint32(42).string(message.creator);
    }
    if (message.recoveryMode === true) {
      writer.uint32(48).bool(message.recoveryMode);
    }
    if (message.pausedByGov === true) {
      writer.uint32(56).bool(message.pausedByGov);
    }
    if (message.pausedByOwner === true) {
      writer.uint32(64).bool(message.pausedByOwner);
    }
    if (message.ownerPauseWindowTiming !== undefined) {
      PoolPauseWindow.encode(message.ownerPauseWindowTiming, writer.uint32(74).fork()).ldelim();
    }
    if (message.swapProtocolFeeRatio !== undefined) {
      writer.uint32(82).string(Decimal.fromUserInput(message.swapProtocolFeeRatio, 18).atomics);
    }
    if (message.joinExitProtocolFeeRatio !== undefined) {
      writer.uint32(90).string(Decimal.fromUserInput(message.joinExitProtocolFeeRatio, 18).atomics);
    }
    for (const v of message.initializationAllowList) {
      writer.uint32(98).string(v!);
    }
    for (const v of message.admins) {
      writer.uint32(106).string(v!);
    }
    for (const v of message.pauseAllowList) {
      writer.uint32(114).string(v!);
    }
    if (message.swapFeeUpdateParams !== undefined) {
      SwapFeeUpdateParams.encode(message.swapFeeUpdateParams, writer.uint32(122).fork()).ldelim();
    }
    if (message.joinBlocked === true) {
      writer.uint32(128).bool(message.joinBlocked);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Pool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.startSwapFeeRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.poolType = (reader.int32() as any);
          break;
        case 5:
          message.creator = reader.string();
          break;
        case 6:
          message.recoveryMode = reader.bool();
          break;
        case 7:
          message.pausedByGov = reader.bool();
          break;
        case 8:
          message.pausedByOwner = reader.bool();
          break;
        case 9:
          message.ownerPauseWindowTiming = PoolPauseWindow.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 10:
          message.swapProtocolFeeRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 11:
          message.joinExitProtocolFeeRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 12:
          message.initializationAllowList.push(reader.string());
          break;
        case 13:
          message.admins.push(reader.string());
          break;
        case 14:
          message.pauseAllowList.push(reader.string());
          break;
        case 15:
          message.swapFeeUpdateParams = SwapFeeUpdateParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 16:
          message.joinBlocked = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Pool>): Pool {
    const message = createBasePool();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.name = object.name ?? "";
    message.startSwapFeeRatio = object.startSwapFeeRatio ?? "";
    message.poolType = object.poolType ?? 0;
    message.creator = object.creator ?? "";
    message.recoveryMode = object.recoveryMode ?? false;
    message.pausedByGov = object.pausedByGov ?? false;
    message.pausedByOwner = object.pausedByOwner ?? false;
    message.ownerPauseWindowTiming = object.ownerPauseWindowTiming !== undefined && object.ownerPauseWindowTiming !== null ? PoolPauseWindow.fromPartial(object.ownerPauseWindowTiming) : undefined;
    message.swapProtocolFeeRatio = object.swapProtocolFeeRatio ?? undefined;
    message.joinExitProtocolFeeRatio = object.joinExitProtocolFeeRatio ?? undefined;
    message.initializationAllowList = object.initializationAllowList?.map(e => e) || [];
    message.admins = object.admins?.map(e => e) || [];
    message.pauseAllowList = object.pauseAllowList?.map(e => e) || [];
    message.swapFeeUpdateParams = object.swapFeeUpdateParams !== undefined && object.swapFeeUpdateParams !== null ? SwapFeeUpdateParams.fromPartial(object.swapFeeUpdateParams) : undefined;
    message.joinBlocked = object.joinBlocked ?? false;
    return message;
  },
  fromAmino(object: PoolAmino): Pool {
    const message = createBasePool();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.start_swap_fee_ratio !== undefined && object.start_swap_fee_ratio !== null) {
      message.startSwapFeeRatio = object.start_swap_fee_ratio;
    }
    if (object.pool_type !== undefined && object.pool_type !== null) {
      message.poolType = object.pool_type;
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.recovery_mode !== undefined && object.recovery_mode !== null) {
      message.recoveryMode = object.recovery_mode;
    }
    if (object.paused_by_gov !== undefined && object.paused_by_gov !== null) {
      message.pausedByGov = object.paused_by_gov;
    }
    if (object.paused_by_owner !== undefined && object.paused_by_owner !== null) {
      message.pausedByOwner = object.paused_by_owner;
    }
    if (object.owner_pause_window_timing !== undefined && object.owner_pause_window_timing !== null) {
      message.ownerPauseWindowTiming = PoolPauseWindow.fromAmino(object.owner_pause_window_timing);
    }
    if (object.swap_protocol_fee_ratio !== undefined && object.swap_protocol_fee_ratio !== null) {
      message.swapProtocolFeeRatio = object.swap_protocol_fee_ratio;
    }
    if (object.join_exit_protocol_fee_ratio !== undefined && object.join_exit_protocol_fee_ratio !== null) {
      message.joinExitProtocolFeeRatio = object.join_exit_protocol_fee_ratio;
    }
    message.initializationAllowList = object.initialization_allow_list?.map(e => e) || [];
    message.admins = object.admins?.map(e => e) || [];
    message.pauseAllowList = object.pause_allow_list?.map(e => e) || [];
    if (object.swap_fee_update_params !== undefined && object.swap_fee_update_params !== null) {
      message.swapFeeUpdateParams = SwapFeeUpdateParams.fromAmino(object.swap_fee_update_params);
    }
    if (object.join_blocked !== undefined && object.join_blocked !== null) {
      message.joinBlocked = object.join_blocked;
    }
    return message;
  },
  toAmino(message: Pool, useInterfaces: boolean = false): PoolAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.name = message.name === "" ? undefined : message.name;
    obj.start_swap_fee_ratio = message.startSwapFeeRatio === "" ? undefined : message.startSwapFeeRatio;
    obj.pool_type = message.poolType === 0 ? undefined : message.poolType;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.recovery_mode = message.recoveryMode === false ? undefined : message.recoveryMode;
    obj.paused_by_gov = message.pausedByGov === false ? undefined : message.pausedByGov;
    obj.paused_by_owner = message.pausedByOwner === false ? undefined : message.pausedByOwner;
    obj.owner_pause_window_timing = message.ownerPauseWindowTiming ? PoolPauseWindow.toAmino(message.ownerPauseWindowTiming, useInterfaces) : undefined;
    obj.swap_protocol_fee_ratio = message.swapProtocolFeeRatio === null ? undefined : message.swapProtocolFeeRatio;
    obj.join_exit_protocol_fee_ratio = message.joinExitProtocolFeeRatio === null ? undefined : message.joinExitProtocolFeeRatio;
    if (message.initializationAllowList) {
      obj.initialization_allow_list = message.initializationAllowList.map(e => e);
    } else {
      obj.initialization_allow_list = message.initializationAllowList;
    }
    if (message.admins) {
      obj.admins = message.admins.map(e => e);
    } else {
      obj.admins = message.admins;
    }
    if (message.pauseAllowList) {
      obj.pause_allow_list = message.pauseAllowList.map(e => e);
    } else {
      obj.pause_allow_list = message.pauseAllowList;
    }
    obj.swap_fee_update_params = message.swapFeeUpdateParams ? SwapFeeUpdateParams.toAmino(message.swapFeeUpdateParams, useInterfaces) : undefined;
    obj.join_blocked = message.joinBlocked === false ? undefined : message.joinBlocked;
    return obj;
  },
  fromAminoMsg(object: PoolAminoMsg): Pool {
    return Pool.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolProtoMsg, useInterfaces: boolean = false): Pool {
    return Pool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Pool): Uint8Array {
    return Pool.encode(message).finish();
  },
  toProtoMsg(message: Pool): PoolProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.Pool",
      value: Pool.encode(message).finish()
    };
  }
};