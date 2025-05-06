//@ts-nocheck
import { MsgExecuteContract, MsgExecuteContractAmino, MsgExecuteContractSDKType, ExecutionStage } from "./schedule";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** The MsgAddSchedule request type. */
export interface MsgAddSchedule {
  /** The address of the governance account. */
  authority: string;
  /** Name of the schedule */
  name: string;
  /** Period in blocks */
  period: bigint;
  /** Msgs that will be executed every certain number of blocks, specified in the `period` field */
  msgs: MsgExecuteContract[];
  /** Stage when messages will be executed */
  executionStage: ExecutionStage;
}
export interface MsgAddScheduleProtoMsg {
  typeUrl: "/neutron.cron.MsgAddSchedule";
  value: Uint8Array;
}
/** The MsgAddSchedule request type. */
export interface MsgAddScheduleAmino {
  /** The address of the governance account. */
  authority?: string;
  /** Name of the schedule */
  name?: string;
  /** Period in blocks */
  period?: string;
  /** Msgs that will be executed every certain number of blocks, specified in the `period` field */
  msgs?: MsgExecuteContractAmino[];
  /** Stage when messages will be executed */
  execution_stage?: ExecutionStage;
}
export interface MsgAddScheduleAminoMsg {
  type: "cron/MsgAddSchedule";
  value: MsgAddScheduleAmino;
}
/** The MsgAddSchedule request type. */
export interface MsgAddScheduleSDKType {
  authority: string;
  name: string;
  period: bigint;
  msgs: MsgExecuteContractSDKType[];
  execution_stage: ExecutionStage;
}
/** Defines the response structure for executing a MsgAddSchedule message. */
export interface MsgAddScheduleResponse {}
export interface MsgAddScheduleResponseProtoMsg {
  typeUrl: "/neutron.cron.MsgAddScheduleResponse";
  value: Uint8Array;
}
/** Defines the response structure for executing a MsgAddSchedule message. */
export interface MsgAddScheduleResponseAmino {}
export interface MsgAddScheduleResponseAminoMsg {
  type: "/neutron.cron.MsgAddScheduleResponse";
  value: MsgAddScheduleResponseAmino;
}
/** Defines the response structure for executing a MsgAddSchedule message. */
export interface MsgAddScheduleResponseSDKType {}
/** The MsgRemoveSchedule request type. */
export interface MsgRemoveSchedule {
  /** The address of the governance account. */
  authority: string;
  /** Name of the schedule */
  name: string;
}
export interface MsgRemoveScheduleProtoMsg {
  typeUrl: "/neutron.cron.MsgRemoveSchedule";
  value: Uint8Array;
}
/** The MsgRemoveSchedule request type. */
export interface MsgRemoveScheduleAmino {
  /** The address of the governance account. */
  authority?: string;
  /** Name of the schedule */
  name?: string;
}
export interface MsgRemoveScheduleAminoMsg {
  type: "cron/MsgRemoveSchedule";
  value: MsgRemoveScheduleAmino;
}
/** The MsgRemoveSchedule request type. */
export interface MsgRemoveScheduleSDKType {
  authority: string;
  name: string;
}
/** Defines the response structure for executing a MsgRemoveSchedule message. */
export interface MsgRemoveScheduleResponse {}
export interface MsgRemoveScheduleResponseProtoMsg {
  typeUrl: "/neutron.cron.MsgRemoveScheduleResponse";
  value: Uint8Array;
}
/** Defines the response structure for executing a MsgRemoveSchedule message. */
export interface MsgRemoveScheduleResponseAmino {}
export interface MsgRemoveScheduleResponseAminoMsg {
  type: "/neutron.cron.MsgRemoveScheduleResponse";
  value: MsgRemoveScheduleResponseAmino;
}
/** Defines the response structure for executing a MsgRemoveSchedule message. */
export interface MsgRemoveScheduleResponseSDKType {}
/**
 * The MsgUpdateParams request type.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParams {
  /** The address of the governance account. */
  authority: string;
  /**
   * Defines the x/cron parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/neutron.cron.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * The MsgUpdateParams request type.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsAmino {
  /** The address of the governance account. */
  authority?: string;
  /**
   * Defines the x/cron parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "cron/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * The MsgUpdateParams request type.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
/**
 * Defines the response structure for executing a MsgUpdateParams message.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/neutron.cron.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * Defines the response structure for executing a MsgUpdateParams message.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/neutron.cron.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * Defines the response structure for executing a MsgUpdateParams message.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgAddSchedule(): MsgAddSchedule {
  return {
    authority: "",
    name: "",
    period: BigInt(0),
    msgs: [],
    executionStage: 0
  };
}
export const MsgAddSchedule = {
  typeUrl: "/neutron.cron.MsgAddSchedule",
  encode(message: MsgAddSchedule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.period !== BigInt(0)) {
      writer.uint32(24).uint64(message.period);
    }
    for (const v of message.msgs) {
      MsgExecuteContract.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.executionStage !== 0) {
      writer.uint32(40).int32(message.executionStage);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddSchedule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddSchedule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.period = reader.uint64();
          break;
        case 4:
          message.msgs.push(MsgExecuteContract.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.executionStage = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddSchedule>): MsgAddSchedule {
    const message = createBaseMsgAddSchedule();
    message.authority = object.authority ?? "";
    message.name = object.name ?? "";
    message.period = object.period !== undefined && object.period !== null ? BigInt(object.period.toString()) : BigInt(0);
    message.msgs = object.msgs?.map(e => MsgExecuteContract.fromPartial(e)) || [];
    message.executionStage = object.executionStage ?? 0;
    return message;
  },
  fromAmino(object: MsgAddScheduleAmino): MsgAddSchedule {
    const message = createBaseMsgAddSchedule();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = BigInt(object.period);
    }
    message.msgs = object.msgs?.map(e => MsgExecuteContract.fromAmino(e)) || [];
    if (object.execution_stage !== undefined && object.execution_stage !== null) {
      message.executionStage = object.execution_stage;
    }
    return message;
  },
  toAmino(message: MsgAddSchedule, useInterfaces: boolean = false): MsgAddScheduleAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.name = message.name === "" ? undefined : message.name;
    obj.period = message.period !== BigInt(0) ? message.period.toString() : undefined;
    if (message.msgs) {
      obj.msgs = message.msgs.map(e => e ? MsgExecuteContract.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.msgs = message.msgs;
    }
    obj.execution_stage = message.executionStage === 0 ? undefined : message.executionStage;
    return obj;
  },
  fromAminoMsg(object: MsgAddScheduleAminoMsg): MsgAddSchedule {
    return MsgAddSchedule.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAddSchedule, useInterfaces: boolean = false): MsgAddScheduleAminoMsg {
    return {
      type: "cron/MsgAddSchedule",
      value: MsgAddSchedule.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAddScheduleProtoMsg, useInterfaces: boolean = false): MsgAddSchedule {
    return MsgAddSchedule.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddSchedule): Uint8Array {
    return MsgAddSchedule.encode(message).finish();
  },
  toProtoMsg(message: MsgAddSchedule): MsgAddScheduleProtoMsg {
    return {
      typeUrl: "/neutron.cron.MsgAddSchedule",
      value: MsgAddSchedule.encode(message).finish()
    };
  }
};
function createBaseMsgAddScheduleResponse(): MsgAddScheduleResponse {
  return {};
}
export const MsgAddScheduleResponse = {
  typeUrl: "/neutron.cron.MsgAddScheduleResponse",
  encode(_: MsgAddScheduleResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddScheduleResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddScheduleResponse();
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
  fromPartial(_: Partial<MsgAddScheduleResponse>): MsgAddScheduleResponse {
    const message = createBaseMsgAddScheduleResponse();
    return message;
  },
  fromAmino(_: MsgAddScheduleResponseAmino): MsgAddScheduleResponse {
    const message = createBaseMsgAddScheduleResponse();
    return message;
  },
  toAmino(_: MsgAddScheduleResponse, useInterfaces: boolean = false): MsgAddScheduleResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddScheduleResponseAminoMsg): MsgAddScheduleResponse {
    return MsgAddScheduleResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddScheduleResponseProtoMsg, useInterfaces: boolean = false): MsgAddScheduleResponse {
    return MsgAddScheduleResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddScheduleResponse): Uint8Array {
    return MsgAddScheduleResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddScheduleResponse): MsgAddScheduleResponseProtoMsg {
    return {
      typeUrl: "/neutron.cron.MsgAddScheduleResponse",
      value: MsgAddScheduleResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveSchedule(): MsgRemoveSchedule {
  return {
    authority: "",
    name: ""
  };
}
export const MsgRemoveSchedule = {
  typeUrl: "/neutron.cron.MsgRemoveSchedule",
  encode(message: MsgRemoveSchedule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveSchedule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveSchedule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveSchedule>): MsgRemoveSchedule {
    const message = createBaseMsgRemoveSchedule();
    message.authority = object.authority ?? "";
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveScheduleAmino): MsgRemoveSchedule {
    const message = createBaseMsgRemoveSchedule();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    return message;
  },
  toAmino(message: MsgRemoveSchedule, useInterfaces: boolean = false): MsgRemoveScheduleAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.name = message.name === "" ? undefined : message.name;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveScheduleAminoMsg): MsgRemoveSchedule {
    return MsgRemoveSchedule.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRemoveSchedule, useInterfaces: boolean = false): MsgRemoveScheduleAminoMsg {
    return {
      type: "cron/MsgRemoveSchedule",
      value: MsgRemoveSchedule.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRemoveScheduleProtoMsg, useInterfaces: boolean = false): MsgRemoveSchedule {
    return MsgRemoveSchedule.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveSchedule): Uint8Array {
    return MsgRemoveSchedule.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveSchedule): MsgRemoveScheduleProtoMsg {
    return {
      typeUrl: "/neutron.cron.MsgRemoveSchedule",
      value: MsgRemoveSchedule.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveScheduleResponse(): MsgRemoveScheduleResponse {
  return {};
}
export const MsgRemoveScheduleResponse = {
  typeUrl: "/neutron.cron.MsgRemoveScheduleResponse",
  encode(_: MsgRemoveScheduleResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveScheduleResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveScheduleResponse();
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
  fromPartial(_: Partial<MsgRemoveScheduleResponse>): MsgRemoveScheduleResponse {
    const message = createBaseMsgRemoveScheduleResponse();
    return message;
  },
  fromAmino(_: MsgRemoveScheduleResponseAmino): MsgRemoveScheduleResponse {
    const message = createBaseMsgRemoveScheduleResponse();
    return message;
  },
  toAmino(_: MsgRemoveScheduleResponse, useInterfaces: boolean = false): MsgRemoveScheduleResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveScheduleResponseAminoMsg): MsgRemoveScheduleResponse {
    return MsgRemoveScheduleResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveScheduleResponseProtoMsg, useInterfaces: boolean = false): MsgRemoveScheduleResponse {
    return MsgRemoveScheduleResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveScheduleResponse): Uint8Array {
    return MsgRemoveScheduleResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveScheduleResponse): MsgRemoveScheduleResponseProtoMsg {
    return {
      typeUrl: "/neutron.cron.MsgRemoveScheduleResponse",
      value: MsgRemoveScheduleResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/neutron.cron.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "cron/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/neutron.cron.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/neutron.cron.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/neutron.cron.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};