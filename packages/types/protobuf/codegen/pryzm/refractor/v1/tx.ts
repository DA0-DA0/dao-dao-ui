//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface MsgRefract {
  creator: string;
  amount: Coin | undefined;
  maturity: string;
}
export interface MsgRefractProtoMsg {
  typeUrl: "/pryzm.refractor.v1.MsgRefract";
  value: Uint8Array;
}
export interface MsgRefractAmino {
  creator?: string;
  amount?: CoinAmino | undefined;
  maturity?: string;
}
export interface MsgRefractAminoMsg {
  type: "pryzm/refractor/v1/Refract";
  value: MsgRefractAmino;
}
export interface MsgRefractSDKType {
  creator: string;
  amount: CoinSDKType | undefined;
  maturity: string;
}
export interface MsgRefractResponse {
  pAmount: Coin | undefined;
  yAmount: Coin | undefined;
  fee: Coin | undefined;
}
export interface MsgRefractResponseProtoMsg {
  typeUrl: "/pryzm.refractor.v1.MsgRefractResponse";
  value: Uint8Array;
}
export interface MsgRefractResponseAmino {
  p_amount?: CoinAmino | undefined;
  y_amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface MsgRefractResponseAminoMsg {
  type: "/pryzm.refractor.v1.MsgRefractResponse";
  value: MsgRefractResponseAmino;
}
export interface MsgRefractResponseSDKType {
  p_amount: CoinSDKType | undefined;
  y_amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface MsgRedeem {
  creator: string;
  pAmount: Coin | undefined;
  yAmount?: Coin | undefined;
}
export interface MsgRedeemProtoMsg {
  typeUrl: "/pryzm.refractor.v1.MsgRedeem";
  value: Uint8Array;
}
export interface MsgRedeemAmino {
  creator?: string;
  p_amount?: CoinAmino | undefined;
  y_amount?: CoinAmino | undefined;
}
export interface MsgRedeemAminoMsg {
  type: "pryzm/refractor/v1/Redeem";
  value: MsgRedeemAmino;
}
export interface MsgRedeemSDKType {
  creator: string;
  p_amount: CoinSDKType | undefined;
  y_amount?: CoinSDKType | undefined;
}
export interface MsgRedeemResponse {
  cAmount: Coin | undefined;
  fee: Coin | undefined;
}
export interface MsgRedeemResponseProtoMsg {
  typeUrl: "/pryzm.refractor.v1.MsgRedeemResponse";
  value: Uint8Array;
}
export interface MsgRedeemResponseAmino {
  c_amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface MsgRedeemResponseAminoMsg {
  type: "/pryzm.refractor.v1.MsgRedeemResponse";
  value: MsgRedeemResponseAmino;
}
export interface MsgRedeemResponseSDKType {
  c_amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface MsgUpdateParams {
  authority: string;
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/pryzm.refractor.v1.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  authority?: string;
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "pryzm/refractor/v1/UpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/pryzm.refractor.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/pryzm.refractor.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgDepositCAsset {
  creator: string;
  cAmount: Coin[];
}
export interface MsgDepositCAssetProtoMsg {
  typeUrl: "/pryzm.refractor.v1.MsgDepositCAsset";
  value: Uint8Array;
}
export interface MsgDepositCAssetAmino {
  creator?: string;
  c_amount?: CoinAmino[];
}
export interface MsgDepositCAssetAminoMsg {
  type: "pryzm/refractor/v1/DepositCAsset";
  value: MsgDepositCAssetAmino;
}
export interface MsgDepositCAssetSDKType {
  creator: string;
  c_amount: CoinSDKType[];
}
export interface MsgDepositCAssetResponse {}
export interface MsgDepositCAssetResponseProtoMsg {
  typeUrl: "/pryzm.refractor.v1.MsgDepositCAssetResponse";
  value: Uint8Array;
}
export interface MsgDepositCAssetResponseAmino {}
export interface MsgDepositCAssetResponseAminoMsg {
  type: "/pryzm.refractor.v1.MsgDepositCAssetResponse";
  value: MsgDepositCAssetResponseAmino;
}
export interface MsgDepositCAssetResponseSDKType {}
function createBaseMsgRefract(): MsgRefract {
  return {
    creator: "",
    amount: Coin.fromPartial({}),
    maturity: ""
  };
}
export const MsgRefract = {
  typeUrl: "/pryzm.refractor.v1.MsgRefract",
  encode(message: MsgRefract, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.maturity !== "") {
      writer.uint32(26).string(message.maturity);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRefract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRefract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.maturity = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRefract>): MsgRefract {
    const message = createBaseMsgRefract();
    message.creator = object.creator ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.maturity = object.maturity ?? "";
    return message;
  },
  fromAmino(object: MsgRefractAmino): MsgRefract {
    const message = createBaseMsgRefract();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.maturity !== undefined && object.maturity !== null) {
      message.maturity = object.maturity;
    }
    return message;
  },
  toAmino(message: MsgRefract, useInterfaces: boolean = false): MsgRefractAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.maturity = message.maturity === "" ? undefined : message.maturity;
    return obj;
  },
  fromAminoMsg(object: MsgRefractAminoMsg): MsgRefract {
    return MsgRefract.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRefract, useInterfaces: boolean = false): MsgRefractAminoMsg {
    return {
      type: "pryzm/refractor/v1/Refract",
      value: MsgRefract.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRefractProtoMsg, useInterfaces: boolean = false): MsgRefract {
    return MsgRefract.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRefract): Uint8Array {
    return MsgRefract.encode(message).finish();
  },
  toProtoMsg(message: MsgRefract): MsgRefractProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.MsgRefract",
      value: MsgRefract.encode(message).finish()
    };
  }
};
function createBaseMsgRefractResponse(): MsgRefractResponse {
  return {
    pAmount: Coin.fromPartial({}),
    yAmount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const MsgRefractResponse = {
  typeUrl: "/pryzm.refractor.v1.MsgRefractResponse",
  encode(message: MsgRefractResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pAmount !== undefined) {
      Coin.encode(message.pAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.yAmount !== undefined) {
      Coin.encode(message.yAmount, writer.uint32(18).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRefractResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRefractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.yAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRefractResponse>): MsgRefractResponse {
    const message = createBaseMsgRefractResponse();
    message.pAmount = object.pAmount !== undefined && object.pAmount !== null ? Coin.fromPartial(object.pAmount) : undefined;
    message.yAmount = object.yAmount !== undefined && object.yAmount !== null ? Coin.fromPartial(object.yAmount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgRefractResponseAmino): MsgRefractResponse {
    const message = createBaseMsgRefractResponse();
    if (object.p_amount !== undefined && object.p_amount !== null) {
      message.pAmount = Coin.fromAmino(object.p_amount);
    }
    if (object.y_amount !== undefined && object.y_amount !== null) {
      message.yAmount = Coin.fromAmino(object.y_amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgRefractResponse, useInterfaces: boolean = false): MsgRefractResponseAmino {
    const obj: any = {};
    obj.p_amount = message.pAmount ? Coin.toAmino(message.pAmount, useInterfaces) : undefined;
    obj.y_amount = message.yAmount ? Coin.toAmino(message.yAmount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRefractResponseAminoMsg): MsgRefractResponse {
    return MsgRefractResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRefractResponseProtoMsg, useInterfaces: boolean = false): MsgRefractResponse {
    return MsgRefractResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRefractResponse): Uint8Array {
    return MsgRefractResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRefractResponse): MsgRefractResponseProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.MsgRefractResponse",
      value: MsgRefractResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRedeem(): MsgRedeem {
  return {
    creator: "",
    pAmount: Coin.fromPartial({}),
    yAmount: undefined
  };
}
export const MsgRedeem = {
  typeUrl: "/pryzm.refractor.v1.MsgRedeem",
  encode(message: MsgRedeem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.pAmount !== undefined) {
      Coin.encode(message.pAmount, writer.uint32(18).fork()).ldelim();
    }
    if (message.yAmount !== undefined) {
      Coin.encode(message.yAmount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedeem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.pAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.yAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRedeem>): MsgRedeem {
    const message = createBaseMsgRedeem();
    message.creator = object.creator ?? "";
    message.pAmount = object.pAmount !== undefined && object.pAmount !== null ? Coin.fromPartial(object.pAmount) : undefined;
    message.yAmount = object.yAmount !== undefined && object.yAmount !== null ? Coin.fromPartial(object.yAmount) : undefined;
    return message;
  },
  fromAmino(object: MsgRedeemAmino): MsgRedeem {
    const message = createBaseMsgRedeem();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.p_amount !== undefined && object.p_amount !== null) {
      message.pAmount = Coin.fromAmino(object.p_amount);
    }
    if (object.y_amount !== undefined && object.y_amount !== null) {
      message.yAmount = Coin.fromAmino(object.y_amount);
    }
    return message;
  },
  toAmino(message: MsgRedeem, useInterfaces: boolean = false): MsgRedeemAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.p_amount = message.pAmount ? Coin.toAmino(message.pAmount, useInterfaces) : undefined;
    obj.y_amount = message.yAmount ? Coin.toAmino(message.yAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRedeemAminoMsg): MsgRedeem {
    return MsgRedeem.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRedeem, useInterfaces: boolean = false): MsgRedeemAminoMsg {
    return {
      type: "pryzm/refractor/v1/Redeem",
      value: MsgRedeem.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRedeemProtoMsg, useInterfaces: boolean = false): MsgRedeem {
    return MsgRedeem.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedeem): Uint8Array {
    return MsgRedeem.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeem): MsgRedeemProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.MsgRedeem",
      value: MsgRedeem.encode(message).finish()
    };
  }
};
function createBaseMsgRedeemResponse(): MsgRedeemResponse {
  return {
    cAmount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const MsgRedeemResponse = {
  typeUrl: "/pryzm.refractor.v1.MsgRedeemResponse",
  encode(message: MsgRedeemResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cAmount !== undefined) {
      Coin.encode(message.cAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedeemResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeemResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRedeemResponse>): MsgRedeemResponse {
    const message = createBaseMsgRedeemResponse();
    message.cAmount = object.cAmount !== undefined && object.cAmount !== null ? Coin.fromPartial(object.cAmount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgRedeemResponseAmino): MsgRedeemResponse {
    const message = createBaseMsgRedeemResponse();
    if (object.c_amount !== undefined && object.c_amount !== null) {
      message.cAmount = Coin.fromAmino(object.c_amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgRedeemResponse, useInterfaces: boolean = false): MsgRedeemResponseAmino {
    const obj: any = {};
    obj.c_amount = message.cAmount ? Coin.toAmino(message.cAmount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRedeemResponseAminoMsg): MsgRedeemResponse {
    return MsgRedeemResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRedeemResponseProtoMsg, useInterfaces: boolean = false): MsgRedeemResponse {
    return MsgRedeemResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedeemResponse): Uint8Array {
    return MsgRedeemResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeemResponse): MsgRedeemResponseProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.MsgRedeemResponse",
      value: MsgRedeemResponse.encode(message).finish()
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
  typeUrl: "/pryzm.refractor.v1.MsgUpdateParams",
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
      type: "pryzm/refractor/v1/UpdateParams",
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
      typeUrl: "/pryzm.refractor.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/pryzm.refractor.v1.MsgUpdateParamsResponse",
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
      typeUrl: "/pryzm.refractor.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDepositCAsset(): MsgDepositCAsset {
  return {
    creator: "",
    cAmount: []
  };
}
export const MsgDepositCAsset = {
  typeUrl: "/pryzm.refractor.v1.MsgDepositCAsset",
  encode(message: MsgDepositCAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.cAmount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDepositCAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositCAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.cAmount.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDepositCAsset>): MsgDepositCAsset {
    const message = createBaseMsgDepositCAsset();
    message.creator = object.creator ?? "";
    message.cAmount = object.cAmount?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgDepositCAssetAmino): MsgDepositCAsset {
    const message = createBaseMsgDepositCAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    message.cAmount = object.c_amount?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgDepositCAsset, useInterfaces: boolean = false): MsgDepositCAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    if (message.cAmount) {
      obj.c_amount = message.cAmount.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.c_amount = message.cAmount;
    }
    return obj;
  },
  fromAminoMsg(object: MsgDepositCAssetAminoMsg): MsgDepositCAsset {
    return MsgDepositCAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDepositCAsset, useInterfaces: boolean = false): MsgDepositCAssetAminoMsg {
    return {
      type: "pryzm/refractor/v1/DepositCAsset",
      value: MsgDepositCAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgDepositCAssetProtoMsg, useInterfaces: boolean = false): MsgDepositCAsset {
    return MsgDepositCAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDepositCAsset): Uint8Array {
    return MsgDepositCAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositCAsset): MsgDepositCAssetProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.MsgDepositCAsset",
      value: MsgDepositCAsset.encode(message).finish()
    };
  }
};
function createBaseMsgDepositCAssetResponse(): MsgDepositCAssetResponse {
  return {};
}
export const MsgDepositCAssetResponse = {
  typeUrl: "/pryzm.refractor.v1.MsgDepositCAssetResponse",
  encode(_: MsgDepositCAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDepositCAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositCAssetResponse();
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
  fromPartial(_: Partial<MsgDepositCAssetResponse>): MsgDepositCAssetResponse {
    const message = createBaseMsgDepositCAssetResponse();
    return message;
  },
  fromAmino(_: MsgDepositCAssetResponseAmino): MsgDepositCAssetResponse {
    const message = createBaseMsgDepositCAssetResponse();
    return message;
  },
  toAmino(_: MsgDepositCAssetResponse, useInterfaces: boolean = false): MsgDepositCAssetResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDepositCAssetResponseAminoMsg): MsgDepositCAssetResponse {
    return MsgDepositCAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositCAssetResponseProtoMsg, useInterfaces: boolean = false): MsgDepositCAssetResponse {
    return MsgDepositCAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDepositCAssetResponse): Uint8Array {
    return MsgDepositCAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositCAssetResponse): MsgDepositCAssetResponseProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.MsgDepositCAssetResponse",
      value: MsgDepositCAssetResponse.encode(message).finish()
    };
  }
};