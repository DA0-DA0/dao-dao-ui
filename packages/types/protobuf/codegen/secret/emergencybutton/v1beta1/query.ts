//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequest {}
export interface ParamsRequestProtoMsg {
  typeUrl: "/secret.emergencybutton.v1beta1.ParamsRequest";
  value: Uint8Array;
}
/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequestAmino {}
export interface ParamsRequestAminoMsg {
  type: "/secret.emergencybutton.v1beta1.ParamsRequest";
  value: ParamsRequestAmino;
}
/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequestSDKType {}
/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}
export interface ParamsResponseProtoMsg {
  typeUrl: "/secret.emergencybutton.v1beta1.ParamsResponse";
  value: Uint8Array;
}
/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponseAmino {
  /** params defines the parameters of the module. */
  params?: ParamsAmino | undefined;
}
export interface ParamsResponseAminoMsg {
  type: "/secret.emergencybutton.v1beta1.ParamsResponse";
  value: ParamsResponseAmino;
}
/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
function createBaseParamsRequest(): ParamsRequest {
  return {};
}
export const ParamsRequest = {
  typeUrl: "/secret.emergencybutton.v1beta1.ParamsRequest",
  encode(_: ParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
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
  fromPartial(_: Partial<ParamsRequest>): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
  fromAmino(_: ParamsRequestAmino): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
  toAmino(_: ParamsRequest, useInterfaces: boolean = false): ParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: ParamsRequestAminoMsg): ParamsRequest {
    return ParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsRequestProtoMsg, useInterfaces: boolean = false): ParamsRequest {
    return ParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ParamsRequest): Uint8Array {
    return ParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: ParamsRequest): ParamsRequestProtoMsg {
    return {
      typeUrl: "/secret.emergencybutton.v1beta1.ParamsRequest",
      value: ParamsRequest.encode(message).finish()
    };
  }
};
function createBaseParamsResponse(): ParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const ParamsResponse = {
  typeUrl: "/secret.emergencybutton.v1beta1.ParamsResponse",
  encode(message: ParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
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
  fromPartial(object: Partial<ParamsResponse>): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: ParamsResponseAmino): ParamsResponse {
    const message = createBaseParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: ParamsResponse, useInterfaces: boolean = false): ParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsResponseAminoMsg): ParamsResponse {
    return ParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsResponseProtoMsg, useInterfaces: boolean = false): ParamsResponse {
    return ParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ParamsResponse): Uint8Array {
    return ParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: ParamsResponse): ParamsResponseProtoMsg {
    return {
      typeUrl: "/secret.emergencybutton.v1beta1.ParamsResponse",
      value: ParamsResponse.encode(message).finish()
    };
  }
};