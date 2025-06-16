import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface AssetPoolState {
  assetId: string;
  bondedAmount: string;
  globalIndex: string;
}
export interface AssetPoolStateProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.AssetPoolState";
  value: Uint8Array;
}
export interface AssetPoolStateAmino {
  asset_id?: string;
  bonded_amount?: string;
  global_index?: string;
}
export interface AssetPoolStateAminoMsg {
  type: "/pryzm.ystaking.v1.AssetPoolState";
  value: AssetPoolStateAmino;
}
export interface AssetPoolStateSDKType {
  asset_id: string;
  bonded_amount: string;
  global_index: string;
}
export interface AssetMaturityPoolState {
  assetId: string;
  maturitySymbol: string;
  active: boolean;
  bondedAmount: string;
  globalIndex?: string;
}
export interface AssetMaturityPoolStateProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.AssetMaturityPoolState";
  value: Uint8Array;
}
export interface AssetMaturityPoolStateAmino {
  asset_id?: string;
  maturity_symbol?: string;
  active?: boolean;
  bonded_amount?: string;
  global_index?: string;
}
export interface AssetMaturityPoolStateAminoMsg {
  type: "/pryzm.ystaking.v1.AssetMaturityPoolState";
  value: AssetMaturityPoolStateAmino;
}
export interface AssetMaturityPoolStateSDKType {
  asset_id: string;
  maturity_symbol: string;
  active: boolean;
  bonded_amount: string;
  global_index?: string;
}
function createBaseAssetPoolState(): AssetPoolState {
  return {
    assetId: "",
    bondedAmount: "",
    globalIndex: ""
  };
}
export const AssetPoolState = {
  typeUrl: "/pryzm.ystaking.v1.AssetPoolState",
  encode(message: AssetPoolState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    if (message.bondedAmount !== "") {
      writer.uint32(18).string(message.bondedAmount);
    }
    if (message.globalIndex !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.globalIndex, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AssetPoolState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetPoolState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        case 2:
          message.bondedAmount = reader.string();
          break;
        case 3:
          message.globalIndex = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetPoolState>): AssetPoolState {
    const message = createBaseAssetPoolState();
    message.assetId = object.assetId ?? "";
    message.bondedAmount = object.bondedAmount ?? "";
    message.globalIndex = object.globalIndex ?? "";
    return message;
  },
  fromAmino(object: AssetPoolStateAmino): AssetPoolState {
    const message = createBaseAssetPoolState();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.bonded_amount !== undefined && object.bonded_amount !== null) {
      message.bondedAmount = object.bonded_amount;
    }
    if (object.global_index !== undefined && object.global_index !== null) {
      message.globalIndex = object.global_index;
    }
    return message;
  },
  toAmino(message: AssetPoolState, useInterfaces: boolean = false): AssetPoolStateAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.bonded_amount = message.bondedAmount === "" ? undefined : message.bondedAmount;
    obj.global_index = message.globalIndex === "" ? undefined : message.globalIndex;
    return obj;
  },
  fromAminoMsg(object: AssetPoolStateAminoMsg): AssetPoolState {
    return AssetPoolState.fromAmino(object.value);
  },
  fromProtoMsg(message: AssetPoolStateProtoMsg, useInterfaces: boolean = false): AssetPoolState {
    return AssetPoolState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AssetPoolState): Uint8Array {
    return AssetPoolState.encode(message).finish();
  },
  toProtoMsg(message: AssetPoolState): AssetPoolStateProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.AssetPoolState",
      value: AssetPoolState.encode(message).finish()
    };
  }
};
function createBaseAssetMaturityPoolState(): AssetMaturityPoolState {
  return {
    assetId: "",
    maturitySymbol: "",
    active: false,
    bondedAmount: "",
    globalIndex: undefined
  };
}
export const AssetMaturityPoolState = {
  typeUrl: "/pryzm.ystaking.v1.AssetMaturityPoolState",
  encode(message: AssetMaturityPoolState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    if (message.maturitySymbol !== "") {
      writer.uint32(18).string(message.maturitySymbol);
    }
    if (message.active === true) {
      writer.uint32(24).bool(message.active);
    }
    if (message.bondedAmount !== "") {
      writer.uint32(34).string(message.bondedAmount);
    }
    if (message.globalIndex !== undefined) {
      writer.uint32(42).string(Decimal.fromUserInput(message.globalIndex, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AssetMaturityPoolState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetMaturityPoolState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        case 2:
          message.maturitySymbol = reader.string();
          break;
        case 3:
          message.active = reader.bool();
          break;
        case 4:
          message.bondedAmount = reader.string();
          break;
        case 5:
          message.globalIndex = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetMaturityPoolState>): AssetMaturityPoolState {
    const message = createBaseAssetMaturityPoolState();
    message.assetId = object.assetId ?? "";
    message.maturitySymbol = object.maturitySymbol ?? "";
    message.active = object.active ?? false;
    message.bondedAmount = object.bondedAmount ?? "";
    message.globalIndex = object.globalIndex ?? undefined;
    return message;
  },
  fromAmino(object: AssetMaturityPoolStateAmino): AssetMaturityPoolState {
    const message = createBaseAssetMaturityPoolState();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.maturity_symbol !== undefined && object.maturity_symbol !== null) {
      message.maturitySymbol = object.maturity_symbol;
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active;
    }
    if (object.bonded_amount !== undefined && object.bonded_amount !== null) {
      message.bondedAmount = object.bonded_amount;
    }
    if (object.global_index !== undefined && object.global_index !== null) {
      message.globalIndex = object.global_index;
    }
    return message;
  },
  toAmino(message: AssetMaturityPoolState, useInterfaces: boolean = false): AssetMaturityPoolStateAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.maturity_symbol = message.maturitySymbol === "" ? undefined : message.maturitySymbol;
    obj.active = message.active === false ? undefined : message.active;
    obj.bonded_amount = message.bondedAmount === "" ? undefined : message.bondedAmount;
    obj.global_index = message.globalIndex === null ? undefined : message.globalIndex;
    return obj;
  },
  fromAminoMsg(object: AssetMaturityPoolStateAminoMsg): AssetMaturityPoolState {
    return AssetMaturityPoolState.fromAmino(object.value);
  },
  fromProtoMsg(message: AssetMaturityPoolStateProtoMsg, useInterfaces: boolean = false): AssetMaturityPoolState {
    return AssetMaturityPoolState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AssetMaturityPoolState): Uint8Array {
    return AssetMaturityPoolState.encode(message).finish();
  },
  toProtoMsg(message: AssetMaturityPoolState): AssetMaturityPoolStateProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.AssetMaturityPoolState",
      value: AssetMaturityPoolState.encode(message).finish()
    };
  }
};