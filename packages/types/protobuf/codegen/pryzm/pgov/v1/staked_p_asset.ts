import { BinaryReader, BinaryWriter } from "../../../binary";
/** StakedPAsset stores the amount of pAssets staked for an account */
export interface StakedPAsset {
  /** the address of owner */
  account: string;
  /** pAsset denom */
  pAsset: string;
  /** staked amount */
  amount: string;
}
export interface StakedPAssetProtoMsg {
  typeUrl: "/pryzm.pgov.v1.StakedPAsset";
  value: Uint8Array;
}
/** StakedPAsset stores the amount of pAssets staked for an account */
export interface StakedPAssetAmino {
  /** the address of owner */
  account?: string;
  /** pAsset denom */
  p_asset?: string;
  /** staked amount */
  amount?: string;
}
export interface StakedPAssetAminoMsg {
  type: "/pryzm.pgov.v1.StakedPAsset";
  value: StakedPAssetAmino;
}
/** StakedPAsset stores the amount of pAssets staked for an account */
export interface StakedPAssetSDKType {
  account: string;
  p_asset: string;
  amount: string;
}
export interface TotalStakedPAsset {
  /** the address of owner */
  account: string;
  /** asset denom */
  asset: string;
  /** staked amount */
  amount: string;
}
export interface TotalStakedPAssetProtoMsg {
  typeUrl: "/pryzm.pgov.v1.TotalStakedPAsset";
  value: Uint8Array;
}
export interface TotalStakedPAssetAmino {
  /** the address of owner */
  account?: string;
  /** asset denom */
  asset?: string;
  /** staked amount */
  amount?: string;
}
export interface TotalStakedPAssetAminoMsg {
  type: "/pryzm.pgov.v1.TotalStakedPAsset";
  value: TotalStakedPAssetAmino;
}
export interface TotalStakedPAssetSDKType {
  account: string;
  asset: string;
  amount: string;
}
function createBaseStakedPAsset(): StakedPAsset {
  return {
    account: "",
    pAsset: "",
    amount: ""
  };
}
export const StakedPAsset = {
  typeUrl: "/pryzm.pgov.v1.StakedPAsset",
  encode(message: StakedPAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.pAsset !== "") {
      writer.uint32(18).string(message.pAsset);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): StakedPAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakedPAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.pAsset = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<StakedPAsset>): StakedPAsset {
    const message = createBaseStakedPAsset();
    message.account = object.account ?? "";
    message.pAsset = object.pAsset ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: StakedPAssetAmino): StakedPAsset {
    const message = createBaseStakedPAsset();
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    }
    if (object.p_asset !== undefined && object.p_asset !== null) {
      message.pAsset = object.p_asset;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: StakedPAsset, useInterfaces: boolean = false): StakedPAssetAmino {
    const obj: any = {};
    obj.account = message.account === "" ? undefined : message.account;
    obj.p_asset = message.pAsset === "" ? undefined : message.pAsset;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: StakedPAssetAminoMsg): StakedPAsset {
    return StakedPAsset.fromAmino(object.value);
  },
  fromProtoMsg(message: StakedPAssetProtoMsg, useInterfaces: boolean = false): StakedPAsset {
    return StakedPAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: StakedPAsset): Uint8Array {
    return StakedPAsset.encode(message).finish();
  },
  toProtoMsg(message: StakedPAsset): StakedPAssetProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.StakedPAsset",
      value: StakedPAsset.encode(message).finish()
    };
  }
};
function createBaseTotalStakedPAsset(): TotalStakedPAsset {
  return {
    account: "",
    asset: "",
    amount: ""
  };
}
export const TotalStakedPAsset = {
  typeUrl: "/pryzm.pgov.v1.TotalStakedPAsset",
  encode(message: TotalStakedPAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalStakedPAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalStakedPAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.asset = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TotalStakedPAsset>): TotalStakedPAsset {
    const message = createBaseTotalStakedPAsset();
    message.account = object.account ?? "";
    message.asset = object.asset ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: TotalStakedPAssetAmino): TotalStakedPAsset {
    const message = createBaseTotalStakedPAsset();
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: TotalStakedPAsset, useInterfaces: boolean = false): TotalStakedPAssetAmino {
    const obj: any = {};
    obj.account = message.account === "" ? undefined : message.account;
    obj.asset = message.asset === "" ? undefined : message.asset;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: TotalStakedPAssetAminoMsg): TotalStakedPAsset {
    return TotalStakedPAsset.fromAmino(object.value);
  },
  fromProtoMsg(message: TotalStakedPAssetProtoMsg, useInterfaces: boolean = false): TotalStakedPAsset {
    return TotalStakedPAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalStakedPAsset): Uint8Array {
    return TotalStakedPAsset.encode(message).finish();
  },
  toProtoMsg(message: TotalStakedPAsset): TotalStakedPAssetProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.TotalStakedPAsset",
      value: TotalStakedPAsset.encode(message).finish()
    };
  }
};