//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface MsgUpdateParams {
  authority: string;
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/pryzm.mint.v1.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  authority?: string;
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "pryzm/mint/v1/UpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/pryzm.mint.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/pryzm.mint.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgDappAccountSpend {
  authority: string;
  title: string;
  description: string;
  recipient: string;
  amount: Coin[];
}
export interface MsgDappAccountSpendProtoMsg {
  typeUrl: "/pryzm.mint.v1.MsgDappAccountSpend";
  value: Uint8Array;
}
export interface MsgDappAccountSpendAmino {
  authority?: string;
  title: string;
  description: string;
  recipient?: string;
  amount: CoinAmino[];
}
export interface MsgDappAccountSpendAminoMsg {
  type: "pryzm/mint/v1/DappAccountSpend";
  value: MsgDappAccountSpendAmino;
}
export interface MsgDappAccountSpendSDKType {
  authority: string;
  title: string;
  description: string;
  recipient: string;
  amount: CoinSDKType[];
}
export interface MsgDappAccountSpendResponse {}
export interface MsgDappAccountSpendResponseProtoMsg {
  typeUrl: "/pryzm.mint.v1.MsgDappAccountSpendResponse";
  value: Uint8Array;
}
export interface MsgDappAccountSpendResponseAmino {}
export interface MsgDappAccountSpendResponseAminoMsg {
  type: "/pryzm.mint.v1.MsgDappAccountSpendResponse";
  value: MsgDappAccountSpendResponseAmino;
}
export interface MsgDappAccountSpendResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/pryzm.mint.v1.MsgUpdateParams",
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
      type: "pryzm/mint/v1/UpdateParams",
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
      typeUrl: "/pryzm.mint.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/pryzm.mint.v1.MsgUpdateParamsResponse",
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
      typeUrl: "/pryzm.mint.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDappAccountSpend(): MsgDappAccountSpend {
  return {
    authority: "",
    title: "",
    description: "",
    recipient: "",
    amount: []
  };
}
export const MsgDappAccountSpend = {
  typeUrl: "/pryzm.mint.v1.MsgDappAccountSpend",
  encode(message: MsgDappAccountSpend, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.recipient !== "") {
      writer.uint32(34).string(message.recipient);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDappAccountSpend {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDappAccountSpend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.recipient = reader.string();
          break;
        case 5:
          message.amount.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDappAccountSpend>): MsgDappAccountSpend {
    const message = createBaseMsgDappAccountSpend();
    message.authority = object.authority ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.recipient = object.recipient ?? "";
    message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgDappAccountSpendAmino): MsgDappAccountSpend {
    const message = createBaseMsgDappAccountSpend();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    }
    message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgDappAccountSpend, useInterfaces: boolean = false): MsgDappAccountSpendAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.title = message.title ?? "";
    obj.description = message.description ?? "";
    obj.recipient = message.recipient === "" ? undefined : message.recipient;
    if (message.amount) {
      obj.amount = message.amount.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amount = message.amount;
    }
    return obj;
  },
  fromAminoMsg(object: MsgDappAccountSpendAminoMsg): MsgDappAccountSpend {
    return MsgDappAccountSpend.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDappAccountSpend, useInterfaces: boolean = false): MsgDappAccountSpendAminoMsg {
    return {
      type: "pryzm/mint/v1/DappAccountSpend",
      value: MsgDappAccountSpend.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgDappAccountSpendProtoMsg, useInterfaces: boolean = false): MsgDappAccountSpend {
    return MsgDappAccountSpend.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDappAccountSpend): Uint8Array {
    return MsgDappAccountSpend.encode(message).finish();
  },
  toProtoMsg(message: MsgDappAccountSpend): MsgDappAccountSpendProtoMsg {
    return {
      typeUrl: "/pryzm.mint.v1.MsgDappAccountSpend",
      value: MsgDappAccountSpend.encode(message).finish()
    };
  }
};
function createBaseMsgDappAccountSpendResponse(): MsgDappAccountSpendResponse {
  return {};
}
export const MsgDappAccountSpendResponse = {
  typeUrl: "/pryzm.mint.v1.MsgDappAccountSpendResponse",
  encode(_: MsgDappAccountSpendResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDappAccountSpendResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDappAccountSpendResponse();
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
  fromPartial(_: Partial<MsgDappAccountSpendResponse>): MsgDappAccountSpendResponse {
    const message = createBaseMsgDappAccountSpendResponse();
    return message;
  },
  fromAmino(_: MsgDappAccountSpendResponseAmino): MsgDappAccountSpendResponse {
    const message = createBaseMsgDappAccountSpendResponse();
    return message;
  },
  toAmino(_: MsgDappAccountSpendResponse, useInterfaces: boolean = false): MsgDappAccountSpendResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDappAccountSpendResponseAminoMsg): MsgDappAccountSpendResponse {
    return MsgDappAccountSpendResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDappAccountSpendResponseProtoMsg, useInterfaces: boolean = false): MsgDappAccountSpendResponse {
    return MsgDappAccountSpendResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDappAccountSpendResponse): Uint8Array {
    return MsgDappAccountSpendResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDappAccountSpendResponse): MsgDappAccountSpendResponseProtoMsg {
    return {
      typeUrl: "/pryzm.mint.v1.MsgDappAccountSpendResponse",
      value: MsgDappAccountSpendResponse.encode(message).finish()
    };
  }
};