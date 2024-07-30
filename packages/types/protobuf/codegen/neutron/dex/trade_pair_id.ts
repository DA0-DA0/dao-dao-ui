import { BinaryReader, BinaryWriter } from "../../binary";
export interface TradePairID {
  makerDenom: string;
  takerDenom: string;
}
export interface TradePairIDProtoMsg {
  typeUrl: "/neutron.dex.TradePairID";
  value: Uint8Array;
}
export interface TradePairIDAmino {
  maker_denom?: string;
  taker_denom?: string;
}
export interface TradePairIDAminoMsg {
  type: "/neutron.dex.TradePairID";
  value: TradePairIDAmino;
}
export interface TradePairIDSDKType {
  maker_denom: string;
  taker_denom: string;
}
function createBaseTradePairID(): TradePairID {
  return {
    makerDenom: "",
    takerDenom: ""
  };
}
export const TradePairID = {
  typeUrl: "/neutron.dex.TradePairID",
  encode(message: TradePairID, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.makerDenom !== "") {
      writer.uint32(18).string(message.makerDenom);
    }
    if (message.takerDenom !== "") {
      writer.uint32(26).string(message.takerDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TradePairID {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradePairID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.makerDenom = reader.string();
          break;
        case 3:
          message.takerDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TradePairID>): TradePairID {
    const message = createBaseTradePairID();
    message.makerDenom = object.makerDenom ?? "";
    message.takerDenom = object.takerDenom ?? "";
    return message;
  },
  fromAmino(object: TradePairIDAmino): TradePairID {
    const message = createBaseTradePairID();
    if (object.maker_denom !== undefined && object.maker_denom !== null) {
      message.makerDenom = object.maker_denom;
    }
    if (object.taker_denom !== undefined && object.taker_denom !== null) {
      message.takerDenom = object.taker_denom;
    }
    return message;
  },
  toAmino(message: TradePairID, useInterfaces: boolean = false): TradePairIDAmino {
    const obj: any = {};
    obj.maker_denom = message.makerDenom === "" ? undefined : message.makerDenom;
    obj.taker_denom = message.takerDenom === "" ? undefined : message.takerDenom;
    return obj;
  },
  fromAminoMsg(object: TradePairIDAminoMsg): TradePairID {
    return TradePairID.fromAmino(object.value);
  },
  fromProtoMsg(message: TradePairIDProtoMsg, useInterfaces: boolean = false): TradePairID {
    return TradePairID.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TradePairID): Uint8Array {
    return TradePairID.encode(message).finish();
  },
  toProtoMsg(message: TradePairID): TradePairIDProtoMsg {
    return {
      typeUrl: "/neutron.dex.TradePairID",
      value: TradePairID.encode(message).finish()
    };
  }
};