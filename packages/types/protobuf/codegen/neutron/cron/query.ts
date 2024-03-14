//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Schedule, ScheduleAmino, ScheduleSDKType } from "./schedule";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/neutron.cron.QueryParamsRequest";
  value: Uint8Array;
}
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/neutron.cron.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
export interface QueryParamsRequestSDKType {}
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/neutron.cron.QueryParamsResponse";
  value: Uint8Array;
}
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/neutron.cron.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryGetScheduleRequest {
  name: string;
}
export interface QueryGetScheduleRequestProtoMsg {
  typeUrl: "/neutron.cron.QueryGetScheduleRequest";
  value: Uint8Array;
}
export interface QueryGetScheduleRequestAmino {
  name?: string;
}
export interface QueryGetScheduleRequestAminoMsg {
  type: "/neutron.cron.QueryGetScheduleRequest";
  value: QueryGetScheduleRequestAmino;
}
export interface QueryGetScheduleRequestSDKType {
  name: string;
}
export interface QueryGetScheduleResponse {
  schedule: Schedule | undefined;
}
export interface QueryGetScheduleResponseProtoMsg {
  typeUrl: "/neutron.cron.QueryGetScheduleResponse";
  value: Uint8Array;
}
export interface QueryGetScheduleResponseAmino {
  schedule?: ScheduleAmino | undefined;
}
export interface QueryGetScheduleResponseAminoMsg {
  type: "/neutron.cron.QueryGetScheduleResponse";
  value: QueryGetScheduleResponseAmino;
}
export interface QueryGetScheduleResponseSDKType {
  schedule: ScheduleSDKType | undefined;
}
export interface QuerySchedulesRequest {
  pagination?: PageRequest | undefined;
}
export interface QuerySchedulesRequestProtoMsg {
  typeUrl: "/neutron.cron.QuerySchedulesRequest";
  value: Uint8Array;
}
export interface QuerySchedulesRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QuerySchedulesRequestAminoMsg {
  type: "/neutron.cron.QuerySchedulesRequest";
  value: QuerySchedulesRequestAmino;
}
export interface QuerySchedulesRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QuerySchedulesResponse {
  schedules: Schedule[];
  pagination?: PageResponse | undefined;
}
export interface QuerySchedulesResponseProtoMsg {
  typeUrl: "/neutron.cron.QuerySchedulesResponse";
  value: Uint8Array;
}
export interface QuerySchedulesResponseAmino {
  schedules?: ScheduleAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QuerySchedulesResponseAminoMsg {
  type: "/neutron.cron.QuerySchedulesResponse";
  value: QuerySchedulesResponseAmino;
}
export interface QuerySchedulesResponseSDKType {
  schedules: ScheduleSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/neutron.cron.QueryParamsRequest",
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
      typeUrl: "/neutron.cron.QueryParamsRequest",
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
  typeUrl: "/neutron.cron.QueryParamsResponse",
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
      typeUrl: "/neutron.cron.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetScheduleRequest(): QueryGetScheduleRequest {
  return {
    name: ""
  };
}
export const QueryGetScheduleRequest = {
  typeUrl: "/neutron.cron.QueryGetScheduleRequest",
  encode(message: QueryGetScheduleRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetScheduleRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetScheduleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetScheduleRequest>): QueryGetScheduleRequest {
    const message = createBaseQueryGetScheduleRequest();
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: QueryGetScheduleRequestAmino): QueryGetScheduleRequest {
    const message = createBaseQueryGetScheduleRequest();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    return message;
  },
  toAmino(message: QueryGetScheduleRequest, useInterfaces: boolean = false): QueryGetScheduleRequestAmino {
    const obj: any = {};
    obj.name = message.name;
    return obj;
  },
  fromAminoMsg(object: QueryGetScheduleRequestAminoMsg): QueryGetScheduleRequest {
    return QueryGetScheduleRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetScheduleRequestProtoMsg, useInterfaces: boolean = false): QueryGetScheduleRequest {
    return QueryGetScheduleRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetScheduleRequest): Uint8Array {
    return QueryGetScheduleRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetScheduleRequest): QueryGetScheduleRequestProtoMsg {
    return {
      typeUrl: "/neutron.cron.QueryGetScheduleRequest",
      value: QueryGetScheduleRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetScheduleResponse(): QueryGetScheduleResponse {
  return {
    schedule: Schedule.fromPartial({})
  };
}
export const QueryGetScheduleResponse = {
  typeUrl: "/neutron.cron.QueryGetScheduleResponse",
  encode(message: QueryGetScheduleResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.schedule !== undefined) {
      Schedule.encode(message.schedule, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetScheduleResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetScheduleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schedule = Schedule.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetScheduleResponse>): QueryGetScheduleResponse {
    const message = createBaseQueryGetScheduleResponse();
    message.schedule = object.schedule !== undefined && object.schedule !== null ? Schedule.fromPartial(object.schedule) : undefined;
    return message;
  },
  fromAmino(object: QueryGetScheduleResponseAmino): QueryGetScheduleResponse {
    const message = createBaseQueryGetScheduleResponse();
    if (object.schedule !== undefined && object.schedule !== null) {
      message.schedule = Schedule.fromAmino(object.schedule);
    }
    return message;
  },
  toAmino(message: QueryGetScheduleResponse, useInterfaces: boolean = false): QueryGetScheduleResponseAmino {
    const obj: any = {};
    obj.schedule = message.schedule ? Schedule.toAmino(message.schedule, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetScheduleResponseAminoMsg): QueryGetScheduleResponse {
    return QueryGetScheduleResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetScheduleResponseProtoMsg, useInterfaces: boolean = false): QueryGetScheduleResponse {
    return QueryGetScheduleResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetScheduleResponse): Uint8Array {
    return QueryGetScheduleResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetScheduleResponse): QueryGetScheduleResponseProtoMsg {
    return {
      typeUrl: "/neutron.cron.QueryGetScheduleResponse",
      value: QueryGetScheduleResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySchedulesRequest(): QuerySchedulesRequest {
  return {
    pagination: undefined
  };
}
export const QuerySchedulesRequest = {
  typeUrl: "/neutron.cron.QuerySchedulesRequest",
  encode(message: QuerySchedulesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySchedulesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySchedulesRequest();
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
  fromPartial(object: Partial<QuerySchedulesRequest>): QuerySchedulesRequest {
    const message = createBaseQuerySchedulesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySchedulesRequestAmino): QuerySchedulesRequest {
    const message = createBaseQuerySchedulesRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySchedulesRequest, useInterfaces: boolean = false): QuerySchedulesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySchedulesRequestAminoMsg): QuerySchedulesRequest {
    return QuerySchedulesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySchedulesRequestProtoMsg, useInterfaces: boolean = false): QuerySchedulesRequest {
    return QuerySchedulesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySchedulesRequest): Uint8Array {
    return QuerySchedulesRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySchedulesRequest): QuerySchedulesRequestProtoMsg {
    return {
      typeUrl: "/neutron.cron.QuerySchedulesRequest",
      value: QuerySchedulesRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySchedulesResponse(): QuerySchedulesResponse {
  return {
    schedules: [],
    pagination: undefined
  };
}
export const QuerySchedulesResponse = {
  typeUrl: "/neutron.cron.QuerySchedulesResponse",
  encode(message: QuerySchedulesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.schedules) {
      Schedule.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySchedulesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySchedulesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schedules.push(Schedule.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QuerySchedulesResponse>): QuerySchedulesResponse {
    const message = createBaseQuerySchedulesResponse();
    message.schedules = object.schedules?.map(e => Schedule.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySchedulesResponseAmino): QuerySchedulesResponse {
    const message = createBaseQuerySchedulesResponse();
    message.schedules = object.schedules?.map(e => Schedule.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySchedulesResponse, useInterfaces: boolean = false): QuerySchedulesResponseAmino {
    const obj: any = {};
    if (message.schedules) {
      obj.schedules = message.schedules.map(e => e ? Schedule.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.schedules = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySchedulesResponseAminoMsg): QuerySchedulesResponse {
    return QuerySchedulesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySchedulesResponseProtoMsg, useInterfaces: boolean = false): QuerySchedulesResponse {
    return QuerySchedulesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySchedulesResponse): Uint8Array {
    return QuerySchedulesResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySchedulesResponse): QuerySchedulesResponseProtoMsg {
    return {
      typeUrl: "/neutron.cron.QuerySchedulesResponse",
      value: QuerySchedulesResponse.encode(message).finish()
    };
  }
};