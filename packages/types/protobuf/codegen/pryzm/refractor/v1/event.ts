import { AssetState, AssetStateAmino, AssetStateSDKType } from "./asset_state";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface EventRefract {
  creator: string;
  cAmount: string;
  maturity: string;
  refractedPAmount: string;
  refractedYAmount: string;
  fee: string;
}
export interface EventRefractProtoMsg {
  typeUrl: "/pryzm.refractor.v1.EventRefract";
  value: Uint8Array;
}
export interface EventRefractAmino {
  creator?: string;
  c_amount?: string;
  maturity?: string;
  refracted_p_amount?: string;
  refracted_y_amount?: string;
  fee?: string;
}
export interface EventRefractAminoMsg {
  type: "/pryzm.refractor.v1.EventRefract";
  value: EventRefractAmino;
}
export interface EventRefractSDKType {
  creator: string;
  c_amount: string;
  maturity: string;
  refracted_p_amount: string;
  refracted_y_amount: string;
  fee: string;
}
export interface EventRedeem {
  creator: string;
  pAmount: string;
  yAmount: string;
  maturity: string;
  redeemedCAmount: string;
  fee: string;
}
export interface EventRedeemProtoMsg {
  typeUrl: "/pryzm.refractor.v1.EventRedeem";
  value: Uint8Array;
}
export interface EventRedeemAmino {
  creator?: string;
  p_amount?: string;
  y_amount?: string;
  maturity?: string;
  redeemed_c_amount?: string;
  fee?: string;
}
export interface EventRedeemAminoMsg {
  type: "/pryzm.refractor.v1.EventRedeem";
  value: EventRedeemAmino;
}
export interface EventRedeemSDKType {
  creator: string;
  p_amount: string;
  y_amount: string;
  maturity: string;
  redeemed_c_amount: string;
  fee: string;
}
export interface EventRefractorYieldDistribution {
  assetId: string;
  totalYield: string;
  protocolFee: string;
  stakeYield: string;
  excessYield: string;
}
export interface EventRefractorYieldDistributionProtoMsg {
  typeUrl: "/pryzm.refractor.v1.EventRefractorYieldDistribution";
  value: Uint8Array;
}
export interface EventRefractorYieldDistributionAmino {
  asset_id?: string;
  total_yield?: string;
  protocol_fee?: string;
  stake_yield?: string;
  excess_yield?: string;
}
export interface EventRefractorYieldDistributionAminoMsg {
  type: "/pryzm.refractor.v1.EventRefractorYieldDistribution";
  value: EventRefractorYieldDistributionAmino;
}
export interface EventRefractorYieldDistributionSDKType {
  asset_id: string;
  total_yield: string;
  protocol_fee: string;
  stake_yield: string;
  excess_yield: string;
}
export interface EventSetAssetState {
  assetState: AssetState | undefined;
}
export interface EventSetAssetStateProtoMsg {
  typeUrl: "/pryzm.refractor.v1.EventSetAssetState";
  value: Uint8Array;
}
export interface EventSetAssetStateAmino {
  asset_state?: AssetStateAmino | undefined;
}
export interface EventSetAssetStateAminoMsg {
  type: "/pryzm.refractor.v1.EventSetAssetState";
  value: EventSetAssetStateAmino;
}
export interface EventSetAssetStateSDKType {
  asset_state: AssetStateSDKType | undefined;
}
export interface EventSetParams {
  params: Params | undefined;
}
export interface EventSetParamsProtoMsg {
  typeUrl: "/pryzm.refractor.v1.EventSetParams";
  value: Uint8Array;
}
export interface EventSetParamsAmino {
  params?: ParamsAmino | undefined;
}
export interface EventSetParamsAminoMsg {
  type: "/pryzm.refractor.v1.EventSetParams";
  value: EventSetParamsAmino;
}
export interface EventSetParamsSDKType {
  params: ParamsSDKType | undefined;
}
function createBaseEventRefract(): EventRefract {
  return {
    creator: "",
    cAmount: "",
    maturity: "",
    refractedPAmount: "",
    refractedYAmount: "",
    fee: ""
  };
}
export const EventRefract = {
  typeUrl: "/pryzm.refractor.v1.EventRefract",
  encode(message: EventRefract, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.cAmount !== "") {
      writer.uint32(18).string(message.cAmount);
    }
    if (message.maturity !== "") {
      writer.uint32(26).string(message.maturity);
    }
    if (message.refractedPAmount !== "") {
      writer.uint32(34).string(message.refractedPAmount);
    }
    if (message.refractedYAmount !== "") {
      writer.uint32(42).string(message.refractedYAmount);
    }
    if (message.fee !== "") {
      writer.uint32(50).string(message.fee);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRefract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRefract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.cAmount = reader.string();
          break;
        case 3:
          message.maturity = reader.string();
          break;
        case 4:
          message.refractedPAmount = reader.string();
          break;
        case 5:
          message.refractedYAmount = reader.string();
          break;
        case 6:
          message.fee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRefract>): EventRefract {
    const message = createBaseEventRefract();
    message.creator = object.creator ?? "";
    message.cAmount = object.cAmount ?? "";
    message.maturity = object.maturity ?? "";
    message.refractedPAmount = object.refractedPAmount ?? "";
    message.refractedYAmount = object.refractedYAmount ?? "";
    message.fee = object.fee ?? "";
    return message;
  },
  fromAmino(object: EventRefractAmino): EventRefract {
    const message = createBaseEventRefract();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.c_amount !== undefined && object.c_amount !== null) {
      message.cAmount = object.c_amount;
    }
    if (object.maturity !== undefined && object.maturity !== null) {
      message.maturity = object.maturity;
    }
    if (object.refracted_p_amount !== undefined && object.refracted_p_amount !== null) {
      message.refractedPAmount = object.refracted_p_amount;
    }
    if (object.refracted_y_amount !== undefined && object.refracted_y_amount !== null) {
      message.refractedYAmount = object.refracted_y_amount;
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = object.fee;
    }
    return message;
  },
  toAmino(message: EventRefract, useInterfaces: boolean = false): EventRefractAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.c_amount = message.cAmount === "" ? undefined : message.cAmount;
    obj.maturity = message.maturity === "" ? undefined : message.maturity;
    obj.refracted_p_amount = message.refractedPAmount === "" ? undefined : message.refractedPAmount;
    obj.refracted_y_amount = message.refractedYAmount === "" ? undefined : message.refractedYAmount;
    obj.fee = message.fee === "" ? undefined : message.fee;
    return obj;
  },
  fromAminoMsg(object: EventRefractAminoMsg): EventRefract {
    return EventRefract.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRefractProtoMsg, useInterfaces: boolean = false): EventRefract {
    return EventRefract.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRefract): Uint8Array {
    return EventRefract.encode(message).finish();
  },
  toProtoMsg(message: EventRefract): EventRefractProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.EventRefract",
      value: EventRefract.encode(message).finish()
    };
  }
};
function createBaseEventRedeem(): EventRedeem {
  return {
    creator: "",
    pAmount: "",
    yAmount: "",
    maturity: "",
    redeemedCAmount: "",
    fee: ""
  };
}
export const EventRedeem = {
  typeUrl: "/pryzm.refractor.v1.EventRedeem",
  encode(message: EventRedeem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.pAmount !== "") {
      writer.uint32(18).string(message.pAmount);
    }
    if (message.yAmount !== "") {
      writer.uint32(26).string(message.yAmount);
    }
    if (message.maturity !== "") {
      writer.uint32(34).string(message.maturity);
    }
    if (message.redeemedCAmount !== "") {
      writer.uint32(42).string(message.redeemedCAmount);
    }
    if (message.fee !== "") {
      writer.uint32(50).string(message.fee);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRedeem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRedeem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.pAmount = reader.string();
          break;
        case 3:
          message.yAmount = reader.string();
          break;
        case 4:
          message.maturity = reader.string();
          break;
        case 5:
          message.redeemedCAmount = reader.string();
          break;
        case 6:
          message.fee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRedeem>): EventRedeem {
    const message = createBaseEventRedeem();
    message.creator = object.creator ?? "";
    message.pAmount = object.pAmount ?? "";
    message.yAmount = object.yAmount ?? "";
    message.maturity = object.maturity ?? "";
    message.redeemedCAmount = object.redeemedCAmount ?? "";
    message.fee = object.fee ?? "";
    return message;
  },
  fromAmino(object: EventRedeemAmino): EventRedeem {
    const message = createBaseEventRedeem();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.p_amount !== undefined && object.p_amount !== null) {
      message.pAmount = object.p_amount;
    }
    if (object.y_amount !== undefined && object.y_amount !== null) {
      message.yAmount = object.y_amount;
    }
    if (object.maturity !== undefined && object.maturity !== null) {
      message.maturity = object.maturity;
    }
    if (object.redeemed_c_amount !== undefined && object.redeemed_c_amount !== null) {
      message.redeemedCAmount = object.redeemed_c_amount;
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = object.fee;
    }
    return message;
  },
  toAmino(message: EventRedeem, useInterfaces: boolean = false): EventRedeemAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.p_amount = message.pAmount === "" ? undefined : message.pAmount;
    obj.y_amount = message.yAmount === "" ? undefined : message.yAmount;
    obj.maturity = message.maturity === "" ? undefined : message.maturity;
    obj.redeemed_c_amount = message.redeemedCAmount === "" ? undefined : message.redeemedCAmount;
    obj.fee = message.fee === "" ? undefined : message.fee;
    return obj;
  },
  fromAminoMsg(object: EventRedeemAminoMsg): EventRedeem {
    return EventRedeem.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRedeemProtoMsg, useInterfaces: boolean = false): EventRedeem {
    return EventRedeem.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRedeem): Uint8Array {
    return EventRedeem.encode(message).finish();
  },
  toProtoMsg(message: EventRedeem): EventRedeemProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.EventRedeem",
      value: EventRedeem.encode(message).finish()
    };
  }
};
function createBaseEventRefractorYieldDistribution(): EventRefractorYieldDistribution {
  return {
    assetId: "",
    totalYield: "",
    protocolFee: "",
    stakeYield: "",
    excessYield: ""
  };
}
export const EventRefractorYieldDistribution = {
  typeUrl: "/pryzm.refractor.v1.EventRefractorYieldDistribution",
  encode(message: EventRefractorYieldDistribution, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    if (message.totalYield !== "") {
      writer.uint32(18).string(message.totalYield);
    }
    if (message.protocolFee !== "") {
      writer.uint32(26).string(message.protocolFee);
    }
    if (message.stakeYield !== "") {
      writer.uint32(34).string(message.stakeYield);
    }
    if (message.excessYield !== "") {
      writer.uint32(42).string(message.excessYield);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRefractorYieldDistribution {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRefractorYieldDistribution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        case 2:
          message.totalYield = reader.string();
          break;
        case 3:
          message.protocolFee = reader.string();
          break;
        case 4:
          message.stakeYield = reader.string();
          break;
        case 5:
          message.excessYield = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRefractorYieldDistribution>): EventRefractorYieldDistribution {
    const message = createBaseEventRefractorYieldDistribution();
    message.assetId = object.assetId ?? "";
    message.totalYield = object.totalYield ?? "";
    message.protocolFee = object.protocolFee ?? "";
    message.stakeYield = object.stakeYield ?? "";
    message.excessYield = object.excessYield ?? "";
    return message;
  },
  fromAmino(object: EventRefractorYieldDistributionAmino): EventRefractorYieldDistribution {
    const message = createBaseEventRefractorYieldDistribution();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.total_yield !== undefined && object.total_yield !== null) {
      message.totalYield = object.total_yield;
    }
    if (object.protocol_fee !== undefined && object.protocol_fee !== null) {
      message.protocolFee = object.protocol_fee;
    }
    if (object.stake_yield !== undefined && object.stake_yield !== null) {
      message.stakeYield = object.stake_yield;
    }
    if (object.excess_yield !== undefined && object.excess_yield !== null) {
      message.excessYield = object.excess_yield;
    }
    return message;
  },
  toAmino(message: EventRefractorYieldDistribution, useInterfaces: boolean = false): EventRefractorYieldDistributionAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.total_yield = message.totalYield === "" ? undefined : message.totalYield;
    obj.protocol_fee = message.protocolFee === "" ? undefined : message.protocolFee;
    obj.stake_yield = message.stakeYield === "" ? undefined : message.stakeYield;
    obj.excess_yield = message.excessYield === "" ? undefined : message.excessYield;
    return obj;
  },
  fromAminoMsg(object: EventRefractorYieldDistributionAminoMsg): EventRefractorYieldDistribution {
    return EventRefractorYieldDistribution.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRefractorYieldDistributionProtoMsg, useInterfaces: boolean = false): EventRefractorYieldDistribution {
    return EventRefractorYieldDistribution.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRefractorYieldDistribution): Uint8Array {
    return EventRefractorYieldDistribution.encode(message).finish();
  },
  toProtoMsg(message: EventRefractorYieldDistribution): EventRefractorYieldDistributionProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.EventRefractorYieldDistribution",
      value: EventRefractorYieldDistribution.encode(message).finish()
    };
  }
};
function createBaseEventSetAssetState(): EventSetAssetState {
  return {
    assetState: AssetState.fromPartial({})
  };
}
export const EventSetAssetState = {
  typeUrl: "/pryzm.refractor.v1.EventSetAssetState",
  encode(message: EventSetAssetState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetState !== undefined) {
      AssetState.encode(message.assetState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetAssetState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetAssetState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetState = AssetState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetAssetState>): EventSetAssetState {
    const message = createBaseEventSetAssetState();
    message.assetState = object.assetState !== undefined && object.assetState !== null ? AssetState.fromPartial(object.assetState) : undefined;
    return message;
  },
  fromAmino(object: EventSetAssetStateAmino): EventSetAssetState {
    const message = createBaseEventSetAssetState();
    if (object.asset_state !== undefined && object.asset_state !== null) {
      message.assetState = AssetState.fromAmino(object.asset_state);
    }
    return message;
  },
  toAmino(message: EventSetAssetState, useInterfaces: boolean = false): EventSetAssetStateAmino {
    const obj: any = {};
    obj.asset_state = message.assetState ? AssetState.toAmino(message.assetState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetAssetStateAminoMsg): EventSetAssetState {
    return EventSetAssetState.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetAssetStateProtoMsg, useInterfaces: boolean = false): EventSetAssetState {
    return EventSetAssetState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetAssetState): Uint8Array {
    return EventSetAssetState.encode(message).finish();
  },
  toProtoMsg(message: EventSetAssetState): EventSetAssetStateProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.EventSetAssetState",
      value: EventSetAssetState.encode(message).finish()
    };
  }
};
function createBaseEventSetParams(): EventSetParams {
  return {
    params: Params.fromPartial({})
  };
}
export const EventSetParams = {
  typeUrl: "/pryzm.refractor.v1.EventSetParams",
  encode(message: EventSetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetParams();
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
  fromPartial(object: Partial<EventSetParams>): EventSetParams {
    const message = createBaseEventSetParams();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: EventSetParamsAmino): EventSetParams {
    const message = createBaseEventSetParams();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: EventSetParams, useInterfaces: boolean = false): EventSetParamsAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetParamsAminoMsg): EventSetParams {
    return EventSetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetParamsProtoMsg, useInterfaces: boolean = false): EventSetParams {
    return EventSetParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetParams): Uint8Array {
    return EventSetParams.encode(message).finish();
  },
  toProtoMsg(message: EventSetParams): EventSetParamsProtoMsg {
    return {
      typeUrl: "/pryzm.refractor.v1.EventSetParams",
      value: EventSetParams.encode(message).finish()
    };
  }
};