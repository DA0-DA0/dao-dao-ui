import { BinaryReader, BinaryWriter } from "../../binary";
export interface FeeInfo {
  gasLp: string;
  gasStakers: string;
  gasProtocol: string;
  dexLp: string;
  dexStakers: string;
  dexProtocol: string;
  perpLp: string;
  perpStakers: string;
  perpProtocol: string;
  edenLp: string;
}
export interface FeeInfoProtoMsg {
  typeUrl: "/elys.masterchef.FeeInfo";
  value: Uint8Array;
}
export interface FeeInfoAmino {
  gas_lp?: string;
  gas_stakers?: string;
  gas_protocol?: string;
  dex_lp?: string;
  dex_stakers?: string;
  dex_protocol?: string;
  perp_lp?: string;
  perp_stakers?: string;
  perp_protocol?: string;
  eden_lp?: string;
}
export interface FeeInfoAminoMsg {
  type: "/elys.masterchef.FeeInfo";
  value: FeeInfoAmino;
}
export interface FeeInfoSDKType {
  gas_lp: string;
  gas_stakers: string;
  gas_protocol: string;
  dex_lp: string;
  dex_stakers: string;
  dex_protocol: string;
  perp_lp: string;
  perp_stakers: string;
  perp_protocol: string;
  eden_lp: string;
}
function createBaseFeeInfo(): FeeInfo {
  return {
    gasLp: "",
    gasStakers: "",
    gasProtocol: "",
    dexLp: "",
    dexStakers: "",
    dexProtocol: "",
    perpLp: "",
    perpStakers: "",
    perpProtocol: "",
    edenLp: ""
  };
}
export const FeeInfo = {
  typeUrl: "/elys.masterchef.FeeInfo",
  encode(message: FeeInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.gasLp !== "") {
      writer.uint32(10).string(message.gasLp);
    }
    if (message.gasStakers !== "") {
      writer.uint32(18).string(message.gasStakers);
    }
    if (message.gasProtocol !== "") {
      writer.uint32(26).string(message.gasProtocol);
    }
    if (message.dexLp !== "") {
      writer.uint32(34).string(message.dexLp);
    }
    if (message.dexStakers !== "") {
      writer.uint32(42).string(message.dexStakers);
    }
    if (message.dexProtocol !== "") {
      writer.uint32(50).string(message.dexProtocol);
    }
    if (message.perpLp !== "") {
      writer.uint32(58).string(message.perpLp);
    }
    if (message.perpStakers !== "") {
      writer.uint32(66).string(message.perpStakers);
    }
    if (message.perpProtocol !== "") {
      writer.uint32(74).string(message.perpProtocol);
    }
    if (message.edenLp !== "") {
      writer.uint32(82).string(message.edenLp);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FeeInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gasLp = reader.string();
          break;
        case 2:
          message.gasStakers = reader.string();
          break;
        case 3:
          message.gasProtocol = reader.string();
          break;
        case 4:
          message.dexLp = reader.string();
          break;
        case 5:
          message.dexStakers = reader.string();
          break;
        case 6:
          message.dexProtocol = reader.string();
          break;
        case 7:
          message.perpLp = reader.string();
          break;
        case 8:
          message.perpStakers = reader.string();
          break;
        case 9:
          message.perpProtocol = reader.string();
          break;
        case 10:
          message.edenLp = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FeeInfo>): FeeInfo {
    const message = createBaseFeeInfo();
    message.gasLp = object.gasLp ?? "";
    message.gasStakers = object.gasStakers ?? "";
    message.gasProtocol = object.gasProtocol ?? "";
    message.dexLp = object.dexLp ?? "";
    message.dexStakers = object.dexStakers ?? "";
    message.dexProtocol = object.dexProtocol ?? "";
    message.perpLp = object.perpLp ?? "";
    message.perpStakers = object.perpStakers ?? "";
    message.perpProtocol = object.perpProtocol ?? "";
    message.edenLp = object.edenLp ?? "";
    return message;
  },
  fromAmino(object: FeeInfoAmino): FeeInfo {
    const message = createBaseFeeInfo();
    if (object.gas_lp !== undefined && object.gas_lp !== null) {
      message.gasLp = object.gas_lp;
    }
    if (object.gas_stakers !== undefined && object.gas_stakers !== null) {
      message.gasStakers = object.gas_stakers;
    }
    if (object.gas_protocol !== undefined && object.gas_protocol !== null) {
      message.gasProtocol = object.gas_protocol;
    }
    if (object.dex_lp !== undefined && object.dex_lp !== null) {
      message.dexLp = object.dex_lp;
    }
    if (object.dex_stakers !== undefined && object.dex_stakers !== null) {
      message.dexStakers = object.dex_stakers;
    }
    if (object.dex_protocol !== undefined && object.dex_protocol !== null) {
      message.dexProtocol = object.dex_protocol;
    }
    if (object.perp_lp !== undefined && object.perp_lp !== null) {
      message.perpLp = object.perp_lp;
    }
    if (object.perp_stakers !== undefined && object.perp_stakers !== null) {
      message.perpStakers = object.perp_stakers;
    }
    if (object.perp_protocol !== undefined && object.perp_protocol !== null) {
      message.perpProtocol = object.perp_protocol;
    }
    if (object.eden_lp !== undefined && object.eden_lp !== null) {
      message.edenLp = object.eden_lp;
    }
    return message;
  },
  toAmino(message: FeeInfo, useInterfaces: boolean = false): FeeInfoAmino {
    const obj: any = {};
    obj.gas_lp = message.gasLp === "" ? undefined : message.gasLp;
    obj.gas_stakers = message.gasStakers === "" ? undefined : message.gasStakers;
    obj.gas_protocol = message.gasProtocol === "" ? undefined : message.gasProtocol;
    obj.dex_lp = message.dexLp === "" ? undefined : message.dexLp;
    obj.dex_stakers = message.dexStakers === "" ? undefined : message.dexStakers;
    obj.dex_protocol = message.dexProtocol === "" ? undefined : message.dexProtocol;
    obj.perp_lp = message.perpLp === "" ? undefined : message.perpLp;
    obj.perp_stakers = message.perpStakers === "" ? undefined : message.perpStakers;
    obj.perp_protocol = message.perpProtocol === "" ? undefined : message.perpProtocol;
    obj.eden_lp = message.edenLp === "" ? undefined : message.edenLp;
    return obj;
  },
  fromAminoMsg(object: FeeInfoAminoMsg): FeeInfo {
    return FeeInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: FeeInfoProtoMsg, useInterfaces: boolean = false): FeeInfo {
    return FeeInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FeeInfo): Uint8Array {
    return FeeInfo.encode(message).finish();
  },
  toProtoMsg(message: FeeInfo): FeeInfoProtoMsg {
    return {
      typeUrl: "/elys.masterchef.FeeInfo",
      value: FeeInfo.encode(message).finish()
    };
  }
};