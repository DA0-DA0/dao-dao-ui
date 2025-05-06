//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Request type for the Msg/UpdateParams RPC method. */
export interface MsgUpdateParams {
  /** The address of the authority of the module. */
  authority: string;
  /** The new parameters of the module. All parameters must be supplied. */
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/neutron.revenue.MsgUpdateParams";
  value: Uint8Array;
}
/** Request type for the Msg/UpdateParams RPC method. */
export interface MsgUpdateParamsAmino {
  /** The address of the authority of the module. */
  authority?: string;
  /** The new parameters of the module. All parameters must be supplied. */
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "revenue/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** Request type for the Msg/UpdateParams RPC method. */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
/** Response type for the Msg/UpdateParams RPC method. */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/neutron.revenue.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/** Response type for the Msg/UpdateParams RPC method. */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/neutron.revenue.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/** Response type for the Msg/UpdateParams RPC method. */
export interface MsgUpdateParamsResponseSDKType {}
/** Request type for the Msg/FundTreasury RPC method. */
export interface MsgFundTreasury {
  /** The signer of the message. */
  sender: string;
  /** The amount of coins to fund the revenue treasury pool with. Must match the reward asset denom. */
  amount: Coin[];
}
export interface MsgFundTreasuryProtoMsg {
  typeUrl: "/neutron.revenue.MsgFundTreasury";
  value: Uint8Array;
}
/** Request type for the Msg/FundTreasury RPC method. */
export interface MsgFundTreasuryAmino {
  /** The signer of the message. */
  sender?: string;
  /** The amount of coins to fund the revenue treasury pool with. Must match the reward asset denom. */
  amount: CoinAmino[];
}
export interface MsgFundTreasuryAminoMsg {
  type: "revenue/MsgFundTreasury";
  value: MsgFundTreasuryAmino;
}
/** Request type for the Msg/FundTreasury RPC method. */
export interface MsgFundTreasurySDKType {
  sender: string;
  amount: CoinSDKType[];
}
/** Response type for the Msg/FundTreasury RPC method. */
export interface MsgFundTreasuryResponse {}
export interface MsgFundTreasuryResponseProtoMsg {
  typeUrl: "/neutron.revenue.MsgFundTreasuryResponse";
  value: Uint8Array;
}
/** Response type for the Msg/FundTreasury RPC method. */
export interface MsgFundTreasuryResponseAmino {}
export interface MsgFundTreasuryResponseAminoMsg {
  type: "/neutron.revenue.MsgFundTreasuryResponse";
  value: MsgFundTreasuryResponseAmino;
}
/** Response type for the Msg/FundTreasury RPC method. */
export interface MsgFundTreasuryResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/neutron.revenue.MsgUpdateParams",
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
      type: "revenue/MsgUpdateParams",
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
      typeUrl: "/neutron.revenue.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/neutron.revenue.MsgUpdateParamsResponse",
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
      typeUrl: "/neutron.revenue.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgFundTreasury(): MsgFundTreasury {
  return {
    sender: "",
    amount: []
  };
}
export const MsgFundTreasury = {
  typeUrl: "/neutron.revenue.MsgFundTreasury",
  encode(message: MsgFundTreasury, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgFundTreasury {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundTreasury();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgFundTreasury>): MsgFundTreasury {
    const message = createBaseMsgFundTreasury();
    message.sender = object.sender ?? "";
    message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgFundTreasuryAmino): MsgFundTreasury {
    const message = createBaseMsgFundTreasury();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgFundTreasury, useInterfaces: boolean = false): MsgFundTreasuryAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.amount) {
      obj.amount = message.amount.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amount = message.amount;
    }
    return obj;
  },
  fromAminoMsg(object: MsgFundTreasuryAminoMsg): MsgFundTreasury {
    return MsgFundTreasury.fromAmino(object.value);
  },
  toAminoMsg(message: MsgFundTreasury, useInterfaces: boolean = false): MsgFundTreasuryAminoMsg {
    return {
      type: "revenue/MsgFundTreasury",
      value: MsgFundTreasury.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgFundTreasuryProtoMsg, useInterfaces: boolean = false): MsgFundTreasury {
    return MsgFundTreasury.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgFundTreasury): Uint8Array {
    return MsgFundTreasury.encode(message).finish();
  },
  toProtoMsg(message: MsgFundTreasury): MsgFundTreasuryProtoMsg {
    return {
      typeUrl: "/neutron.revenue.MsgFundTreasury",
      value: MsgFundTreasury.encode(message).finish()
    };
  }
};
function createBaseMsgFundTreasuryResponse(): MsgFundTreasuryResponse {
  return {};
}
export const MsgFundTreasuryResponse = {
  typeUrl: "/neutron.revenue.MsgFundTreasuryResponse",
  encode(_: MsgFundTreasuryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgFundTreasuryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundTreasuryResponse();
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
  fromPartial(_: Partial<MsgFundTreasuryResponse>): MsgFundTreasuryResponse {
    const message = createBaseMsgFundTreasuryResponse();
    return message;
  },
  fromAmino(_: MsgFundTreasuryResponseAmino): MsgFundTreasuryResponse {
    const message = createBaseMsgFundTreasuryResponse();
    return message;
  },
  toAmino(_: MsgFundTreasuryResponse, useInterfaces: boolean = false): MsgFundTreasuryResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgFundTreasuryResponseAminoMsg): MsgFundTreasuryResponse {
    return MsgFundTreasuryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFundTreasuryResponseProtoMsg, useInterfaces: boolean = false): MsgFundTreasuryResponse {
    return MsgFundTreasuryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgFundTreasuryResponse): Uint8Array {
    return MsgFundTreasuryResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgFundTreasuryResponse): MsgFundTreasuryResponseProtoMsg {
    return {
      typeUrl: "/neutron.revenue.MsgFundTreasuryResponse",
      value: MsgFundTreasuryResponse.encode(message).finish()
    };
  }
};