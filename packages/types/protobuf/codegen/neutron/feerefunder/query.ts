//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { FeeInfo, FeeInfoAmino, FeeInfoSDKType } from "./genesis";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/neutron.feerefunder.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/neutron.feerefunder.QueryParamsRequest";
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
  typeUrl: "/neutron.feerefunder.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/neutron.feerefunder.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface FeeInfoRequest {
  channelId: string;
  portId: string;
  sequence: bigint;
}
export interface FeeInfoRequestProtoMsg {
  typeUrl: "/neutron.feerefunder.FeeInfoRequest";
  value: Uint8Array;
}
export interface FeeInfoRequestAmino {
  channel_id?: string;
  port_id?: string;
  sequence?: string;
}
export interface FeeInfoRequestAminoMsg {
  type: "/neutron.feerefunder.FeeInfoRequest";
  value: FeeInfoRequestAmino;
}
export interface FeeInfoRequestSDKType {
  channel_id: string;
  port_id: string;
  sequence: bigint;
}
export interface FeeInfoResponse {
  feeInfo?: FeeInfo | undefined;
}
export interface FeeInfoResponseProtoMsg {
  typeUrl: "/neutron.feerefunder.FeeInfoResponse";
  value: Uint8Array;
}
export interface FeeInfoResponseAmino {
  fee_info?: FeeInfoAmino | undefined;
}
export interface FeeInfoResponseAminoMsg {
  type: "/neutron.feerefunder.FeeInfoResponse";
  value: FeeInfoResponseAmino;
}
export interface FeeInfoResponseSDKType {
  fee_info?: FeeInfoSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/neutron.feerefunder.QueryParamsRequest",
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
      typeUrl: "/neutron.feerefunder.QueryParamsRequest",
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
  typeUrl: "/neutron.feerefunder.QueryParamsResponse",
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
      typeUrl: "/neutron.feerefunder.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseFeeInfoRequest(): FeeInfoRequest {
  return {
    channelId: "",
    portId: "",
    sequence: BigInt(0)
  };
}
export const FeeInfoRequest = {
  typeUrl: "/neutron.feerefunder.FeeInfoRequest",
  encode(message: FeeInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FeeInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.string();
          break;
        case 2:
          message.portId = reader.string();
          break;
        case 3:
          message.sequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FeeInfoRequest>): FeeInfoRequest {
    const message = createBaseFeeInfoRequest();
    message.channelId = object.channelId ?? "";
    message.portId = object.portId ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: FeeInfoRequestAmino): FeeInfoRequest {
    const message = createBaseFeeInfoRequest();
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.portId = object.port_id;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    return message;
  },
  toAmino(message: FeeInfoRequest, useInterfaces: boolean = false): FeeInfoRequestAmino {
    const obj: any = {};
    obj.channel_id = message.channelId === "" ? undefined : message.channelId;
    obj.port_id = message.portId === "" ? undefined : message.portId;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: FeeInfoRequestAminoMsg): FeeInfoRequest {
    return FeeInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: FeeInfoRequestProtoMsg, useInterfaces: boolean = false): FeeInfoRequest {
    return FeeInfoRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FeeInfoRequest): Uint8Array {
    return FeeInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: FeeInfoRequest): FeeInfoRequestProtoMsg {
    return {
      typeUrl: "/neutron.feerefunder.FeeInfoRequest",
      value: FeeInfoRequest.encode(message).finish()
    };
  }
};
function createBaseFeeInfoResponse(): FeeInfoResponse {
  return {
    feeInfo: undefined
  };
}
export const FeeInfoResponse = {
  typeUrl: "/neutron.feerefunder.FeeInfoResponse",
  encode(message: FeeInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.feeInfo !== undefined) {
      FeeInfo.encode(message.feeInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FeeInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.feeInfo = FeeInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FeeInfoResponse>): FeeInfoResponse {
    const message = createBaseFeeInfoResponse();
    message.feeInfo = object.feeInfo !== undefined && object.feeInfo !== null ? FeeInfo.fromPartial(object.feeInfo) : undefined;
    return message;
  },
  fromAmino(object: FeeInfoResponseAmino): FeeInfoResponse {
    const message = createBaseFeeInfoResponse();
    if (object.fee_info !== undefined && object.fee_info !== null) {
      message.feeInfo = FeeInfo.fromAmino(object.fee_info);
    }
    return message;
  },
  toAmino(message: FeeInfoResponse, useInterfaces: boolean = false): FeeInfoResponseAmino {
    const obj: any = {};
    obj.fee_info = message.feeInfo ? FeeInfo.toAmino(message.feeInfo, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: FeeInfoResponseAminoMsg): FeeInfoResponse {
    return FeeInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: FeeInfoResponseProtoMsg, useInterfaces: boolean = false): FeeInfoResponse {
    return FeeInfoResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FeeInfoResponse): Uint8Array {
    return FeeInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: FeeInfoResponse): FeeInfoResponseProtoMsg {
    return {
      typeUrl: "/neutron.feerefunder.FeeInfoResponse",
      value: FeeInfoResponse.encode(message).finish()
    };
  }
};