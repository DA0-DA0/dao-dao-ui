//@ts-nocheck
import { FeeToken, FeeTokenAmino, FeeTokenSDKType } from "./feetoken";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** ===================== MsgSetFeeTokens */
export interface MsgSetFeeTokens {
  feeTokens: FeeToken[];
  sender: string;
}
export interface MsgSetFeeTokensProtoMsg {
  typeUrl: "/osmosis.txfees.v1beta1.MsgSetFeeTokens";
  value: Uint8Array;
}
/** ===================== MsgSetFeeTokens */
export interface MsgSetFeeTokensAmino {
  fee_tokens?: FeeTokenAmino[];
  sender?: string;
}
export interface MsgSetFeeTokensAminoMsg {
  type: "osmosis/set-fee-tokens";
  value: MsgSetFeeTokensAmino;
}
/** ===================== MsgSetFeeTokens */
export interface MsgSetFeeTokensSDKType {
  fee_tokens: FeeTokenSDKType[];
  sender: string;
}
export interface MsgSetFeeTokensResponse {}
export interface MsgSetFeeTokensResponseProtoMsg {
  typeUrl: "/osmosis.txfees.v1beta1.MsgSetFeeTokensResponse";
  value: Uint8Array;
}
export interface MsgSetFeeTokensResponseAmino {}
export interface MsgSetFeeTokensResponseAminoMsg {
  type: "osmosis/txfees/set-fee-tokens-response";
  value: MsgSetFeeTokensResponseAmino;
}
export interface MsgSetFeeTokensResponseSDKType {}
function createBaseMsgSetFeeTokens(): MsgSetFeeTokens {
  return {
    feeTokens: [],
    sender: ""
  };
}
export const MsgSetFeeTokens = {
  typeUrl: "/osmosis.txfees.v1beta1.MsgSetFeeTokens",
  encode(message: MsgSetFeeTokens, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.feeTokens) {
      FeeToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetFeeTokens {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetFeeTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.feeTokens.push(FeeToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetFeeTokens>): MsgSetFeeTokens {
    const message = createBaseMsgSetFeeTokens();
    message.feeTokens = object.feeTokens?.map(e => FeeToken.fromPartial(e)) || [];
    message.sender = object.sender ?? "";
    return message;
  },
  fromAmino(object: MsgSetFeeTokensAmino): MsgSetFeeTokens {
    const message = createBaseMsgSetFeeTokens();
    message.feeTokens = object.fee_tokens?.map(e => FeeToken.fromAmino(e)) || [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    return message;
  },
  toAmino(message: MsgSetFeeTokens, useInterfaces: boolean = false): MsgSetFeeTokensAmino {
    const obj: any = {};
    if (message.feeTokens) {
      obj.fee_tokens = message.feeTokens.map(e => e ? FeeToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.fee_tokens = message.feeTokens;
    }
    obj.sender = message.sender === "" ? undefined : message.sender;
    return obj;
  },
  fromAminoMsg(object: MsgSetFeeTokensAminoMsg): MsgSetFeeTokens {
    return MsgSetFeeTokens.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetFeeTokens, useInterfaces: boolean = false): MsgSetFeeTokensAminoMsg {
    return {
      type: "osmosis/set-fee-tokens",
      value: MsgSetFeeTokens.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetFeeTokensProtoMsg, useInterfaces: boolean = false): MsgSetFeeTokens {
    return MsgSetFeeTokens.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetFeeTokens): Uint8Array {
    return MsgSetFeeTokens.encode(message).finish();
  },
  toProtoMsg(message: MsgSetFeeTokens): MsgSetFeeTokensProtoMsg {
    return {
      typeUrl: "/osmosis.txfees.v1beta1.MsgSetFeeTokens",
      value: MsgSetFeeTokens.encode(message).finish()
    };
  }
};
function createBaseMsgSetFeeTokensResponse(): MsgSetFeeTokensResponse {
  return {};
}
export const MsgSetFeeTokensResponse = {
  typeUrl: "/osmosis.txfees.v1beta1.MsgSetFeeTokensResponse",
  encode(_: MsgSetFeeTokensResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetFeeTokensResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetFeeTokensResponse();
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
  fromPartial(_: Partial<MsgSetFeeTokensResponse>): MsgSetFeeTokensResponse {
    const message = createBaseMsgSetFeeTokensResponse();
    return message;
  },
  fromAmino(_: MsgSetFeeTokensResponseAmino): MsgSetFeeTokensResponse {
    const message = createBaseMsgSetFeeTokensResponse();
    return message;
  },
  toAmino(_: MsgSetFeeTokensResponse, useInterfaces: boolean = false): MsgSetFeeTokensResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetFeeTokensResponseAminoMsg): MsgSetFeeTokensResponse {
    return MsgSetFeeTokensResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetFeeTokensResponse, useInterfaces: boolean = false): MsgSetFeeTokensResponseAminoMsg {
    return {
      type: "osmosis/txfees/set-fee-tokens-response",
      value: MsgSetFeeTokensResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetFeeTokensResponseProtoMsg, useInterfaces: boolean = false): MsgSetFeeTokensResponse {
    return MsgSetFeeTokensResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetFeeTokensResponse): Uint8Array {
    return MsgSetFeeTokensResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetFeeTokensResponse): MsgSetFeeTokensResponseProtoMsg {
    return {
      typeUrl: "/osmosis.txfees.v1beta1.MsgSetFeeTokensResponse",
      value: MsgSetFeeTokensResponse.encode(message).finish()
    };
  }
};